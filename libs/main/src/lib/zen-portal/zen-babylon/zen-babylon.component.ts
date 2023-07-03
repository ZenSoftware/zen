// Side-effects only imports allowing the standard material to be used as default.
import '@babylonjs/core/Materials/standardMaterial';
// Side-effects only imports allowing Mesh to create default shapes (to enhance tree shaking, the construction methods on mesh are not available if the meshbuilder has not been imported).
import '@babylonjs/core/Meshes/Builders/sphereBuilder';
import '@babylonjs/core/Meshes/Builders/boxBuilder';
import '@babylonjs/core/Meshes/Builders/groundBuilder';
// Side-effects only imports for ray support.
import '@babylonjs/core/Culling/ray';

import { AfterViewInit, Component, ElementRef, NgZone, OnDestroy, ViewChild } from '@angular/core';
import { ArcRotateCamera } from '@babylonjs/core/Cameras/arcRotateCamera';
import { Engine } from '@babylonjs/core/Engines/engine';
import { PointerEventTypes } from '@babylonjs/core/Events/pointerEvents';
import { HemisphericLight } from '@babylonjs/core/Lights/hemisphericLight';
import { StandardMaterial } from '@babylonjs/core/Materials/standardMaterial';
import { Color3, Vector3 } from '@babylonjs/core/Maths/math';
import { MeshBuilder } from '@babylonjs/core/Meshes/meshBuilder';
import { Scene } from '@babylonjs/core/scene';
import { token } from '@zen/auth';
import { Client, Room } from 'colyseus.js';
import { Subscription, debounce, fromEvent, interval } from 'rxjs';

@Component({
  selector: 'zen-babylon',
  templateUrl: 'zen-babylon.component.html',
  styleUrls: ['zen-babylon.component.scss'],
  standalone: true,
})
export class ZenBabylonComponent implements AfterViewInit, OnDestroy {
  @ViewChild('stubDiv') stubDiv!: ElementRef<HTMLDivElement>; // Used to calculate width
  @ViewChild('canvasElement') canvasElement!: ElementRef<HTMLCanvasElement>;
  #subs: Subscription[] = [];
  playerEntities: Record<string, any> = {};
  playerNextPosition: Record<string, any> = {};
  engine!: Engine;
  room!: Room;

  constructor(private ngZone: NgZone) {}

  ngAfterViewInit() {
    // Update canvas dimensions on resize
    const sub = fromEvent(window, 'resize')
      .pipe(debounce(() => interval(200)))
      .subscribe(() => {
        this.updateDimensions();
      });
    this.#subs.push(sub);

    setTimeout(() => this.updateDimensions());

    this.ngZone.runOutsideAngular(async () => {
      this.engine = new Engine(this.canvasElement.nativeElement);
      const scene = await this.createScene(this.engine);

      this.engine.runRenderLoop(() => {
        scene.render();
      });
    });
  }

  async createScene(engine: any) {
    const scene = new Scene(engine);

    const camera = new ArcRotateCamera('camera', Math.PI / 2, 1.0, 550, Vector3.Zero(), scene);
    camera.setTarget(Vector3.Zero());

    const light = new HemisphericLight('light', new Vector3(0, 1, 0), scene);
    light.intensity = 0.7;

    const ground = MeshBuilder.CreatePlane('ground', { size: 500 }, scene);
    ground.position.y = -15;
    ground.rotation.x = Math.PI / 2;

    const colyseusSDK = new Client('ws://localhost:7080');

    this.room = await colyseusSDK.joinOrCreate<any>('MainRoom', { token: token() });
    console.log(`Connected to roomId: ${this.room.roomId}`);

    this.room.state.players.onAdd((player: any, sessionId: string) => {
      console.log('player added');

      const isCurrentPlayer = sessionId === this.room.sessionId;

      // create player Sphere
      const sphere = MeshBuilder.CreateSphere(`player-${sessionId}`, {
        segments: 8,
        diameter: 40,
      });

      // set player spawning position
      sphere.position.set(player.x, player.y, player.z);

      sphere.material = new StandardMaterial(`player-material-${sessionId}`);

      if (isCurrentPlayer) {
        (<StandardMaterial>sphere.material).emissiveColor = Color3.FromHexString('#ff9900');
      } else {
        (<StandardMaterial>sphere.material).emissiveColor = Color3.Gray();
      }

      this.playerEntities[sessionId] = sphere;
      this.playerNextPosition[sessionId] = sphere.position.clone();

      // listen for individual player changes
      player.onChange(() => {
        this.playerNextPosition[sessionId].set(player.x, player.y, player.z);
      });
    });

    this.room.state.players.onRemove((player: any, sessionId: string) => {
      this.playerEntities[sessionId].dispose();
      delete this.playerEntities[sessionId];
      delete this.playerNextPosition[sessionId];
    });

    scene.onPointerObservable.add(pointerInfo => {
      if (pointerInfo.type === PointerEventTypes.POINTERDOWN && pointerInfo.pickInfo?.hit) {
        const targetPosition = (<Vector3>pointerInfo.pickInfo.pickedPoint).clone();

        // Position adjustments for the current play ground.
        targetPosition.y = -1;
        if (targetPosition.x > 245) targetPosition.x = 245;
        else if (targetPosition.x < -245) targetPosition.x = -245;
        if (targetPosition.z > 245) targetPosition.z = 245;
        else if (targetPosition.z < -245) targetPosition.z = -245;

        // set current player's next position immediatelly
        this.playerNextPosition[this.room.sessionId] = targetPosition;

        // Send position update to the server
        this.room.send('updatePosition', {
          x: targetPosition.x,
          y: targetPosition.y,
          z: targetPosition.z,
        });
      }
    });

    scene.registerBeforeRender(() => {
      for (const sessionId in this.playerEntities) {
        const entity = this.playerEntities[sessionId];
        const targetPosition = this.playerNextPosition[sessionId];
        entity.position = Vector3.Lerp(entity.position, targetPosition, 0.05);
      }
    });

    return scene;
  }

  getWidth = () => this.stubDiv.nativeElement.offsetWidth;
  getHeight = () => window.innerHeight - this.stubDiv.nativeElement.getBoundingClientRect().y - 15;

  updateDimensions() {
    this.canvasElement.nativeElement.width = this.getWidth();
    this.canvasElement.nativeElement.height = this.getHeight();

    this.engine.resize();
  }

  ngOnDestroy() {
    this.#subs.forEach(sub => sub.unsubscribe());
    this.room?.leave();
  }
}

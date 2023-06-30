// Side-effects only imports allowing the standard material to be used as default.
import '@babylonjs/core/Materials/standardMaterial';
// Side-effects only imports allowing Mesh to create default shapes (to enhance tree shaking, the construction methods on mesh are not available if the meshbuilder has not been imported).
import '@babylonjs/core/Meshes/Builders/sphereBuilder';
import '@babylonjs/core/Meshes/Builders/boxBuilder';
import '@babylonjs/core/Meshes/Builders/groundBuilder';

import { AfterViewInit, Component, ElementRef, NgZone, OnDestroy, ViewChild } from '@angular/core';
import { FreeCamera } from '@babylonjs/core/Cameras/freeCamera';
import { Engine } from '@babylonjs/core/Engines/engine';
import { HemisphericLight } from '@babylonjs/core/Lights/hemisphericLight';
import { StandardMaterial } from '@babylonjs/core/Materials/standardMaterial';
import { Color3, Vector3 } from '@babylonjs/core/Maths/math';
import { MeshBuilder } from '@babylonjs/core/Meshes/meshBuilder';
import { Scene } from '@babylonjs/core/scene';
import { MapSchema } from '@colyseus/schema';
import { token } from '@zen/auth';
import { Client } from 'colyseus.js';
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

    this.ngZone.runOutsideAngular(() => {
      const engine = new Engine(this.canvasElement.nativeElement);
      const scene = this.createScene(engine, this.canvasElement.nativeElement);

      engine.runRenderLoop(() => {
        scene.render();
      });
    });
  }

  createScene(engine: any, canvas: any) {
    // This creates a basic Babylon Scene object (non-mesh)
    const scene = new Scene(engine);

    // This creates and positions a free camera (non-mesh)
    const camera = new FreeCamera('camera1', new Vector3(0, 5, -10), scene);

    // This targets the camera to scene origin
    camera.setTarget(Vector3.Zero());

    // This attaches the camera to the canvas
    camera.attachControl(canvas, true);

    // This creates a light, aiming 0,1,0 - to the sky (non-mesh)
    const light = new HemisphericLight('light', new Vector3(0, 1, 0), scene);

    // Default intensity is 1. Let's dim the light a small amount
    light.intensity = 0.7;

    // Our built-in 'sphere' shape.
    const sphere = MeshBuilder.CreateSphere('sphere', { diameter: 1, segments: 32 }, scene);
    sphere.position.y = -9;
    sphere.material = new StandardMaterial('kaka-material', scene);
    (<StandardMaterial>sphere.material).emissiveColor = Color3.FromHexString('#ff9900');

    // Our built-in 'ground' shape.
    const ground = MeshBuilder.CreatePlane('ground', { size: 500 }, scene);
    ground.position.y = -17;
    ground.rotation.x = Math.PI / 2;

    const colyseusSDK = new Client('ws://localhost:7080');

    colyseusSDK.joinOrCreate('MainRoom', { token: token() }).then(room => {
      console.log(`Connected to roomId: ${room.roomId}`);

      room.onStateChange((state: any) => {
        console.log(`${room.name} new state:`, state.players.values());
        // this.playerEntities = state.players;
      });

      const players = (<any>room.state).players as MapSchema<any>;
      console.log('players', players.values());
      players.onAdd((player: any, sessionId: string) => {
        console.log('player added', player);
        const isCurrentPlayer = sessionId === room.sessionId;

        // create player Sphere
        const sphere = MeshBuilder.CreateSphere(
          `player-${sessionId}`,
          {
            segments: 8,
            diameter: 40,
          },
          scene
        );

        // set player spawning position
        sphere.position.set(player.x, player.y, player.z);

        // set material to differentiate CURRENT player and OTHER players
        sphere.material = new StandardMaterial(`player-material-${sessionId}`);

        if (isCurrentPlayer) {
          // highlight current player
          (<StandardMaterial>sphere.material).emissiveColor = Color3.FromHexString('#ff9900');
        } else {
          // other players are gray colored
          (<StandardMaterial>sphere.material).emissiveColor = Color3.Gray();
        }

        player.onChange(() => {
          // this.playerEntities[sessionId].position.set(player.x, player.y, player.z);
        });

        console.log(`created player (${player.x}, ${player.y}, ${player.z})`);
      });

      (<any>room.state).players.onRemove((player: any, sessionId: string) => {
        this.playerEntities[sessionId].dispose();
        delete this.playerEntities[sessionId];
      });

      scene.onPointerDown = (event, pointer) => {
        if (event.button == 0) {
          // const targetPosition = (<Vector3>pointer.pickedPoint)?.clone();

          // // Position adjustments for the current play ground.
          // // Prevent spheres from moving all around the screen other than on the ground mesh.
          // targetPosition.y = -1;
          // if (targetPosition.x > 245) targetPosition.x = 245;
          // else if (targetPosition.x < -245) targetPosition.x = -245;
          // if (targetPosition.z > 245) targetPosition.z = 245;
          // else if (targetPosition.z < -245) targetPosition.z = -245;

          // console.log('sending new position');
          // // Send position update to the server
          // room.send('updatePosition', {
          //   x: targetPosition.x,
          //   y: targetPosition.y,
          //   z: targetPosition.z,
          // });

          console.log('sending new position');
          room.send('updatePosition', {
            x: 1,
            y: -1,
            z: 2,
          });
        }
      };
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
  }

  ngOnDestroy() {
    this.#subs.forEach(sub => sub.unsubscribe());
  }
}

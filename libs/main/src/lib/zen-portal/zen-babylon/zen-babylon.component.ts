// Side-effects only imports allowing the standard material to be used as default.
import '@babylonjs/core/Materials/standardMaterial';
// Side-effects only imports allowing Mesh to create default shapes (to enhance tree shaking, the construction methods on mesh are not available if the meshbuilder has not been imported).
import '@babylonjs/core/Meshes/Builders/sphereBuilder';
import '@babylonjs/core/Meshes/Builders/boxBuilder';
import '@babylonjs/core/Meshes/Builders/groundBuilder';
// Side-effects only imports for ray support.
import '@babylonjs/core/Culling/ray';
// Side-effects only imports for WebGPU extensions.
import '@babylonjs/core/Engines/WebGPU/Extensions/engine.uniformBuffer';
import '@babylonjs/core/Physics/physicsEngineComponent';
import '@babylonjs/core/Helpers/sceneHelpers';

import { NgIf } from '@angular/common';
import { AfterViewInit, Component, ElementRef, NgZone, OnDestroy, ViewChild } from '@angular/core';
import { KeyboardEventTypes, Mesh, WebGPUEngine } from '@babylonjs/core';
import { FollowCamera } from '@babylonjs/core/Cameras/followCamera';
import { Engine } from '@babylonjs/core/Engines/engine';
import { HemisphericLight } from '@babylonjs/core/Lights/hemisphericLight';
import { StandardMaterial } from '@babylonjs/core/Materials/standardMaterial';
import { Color3, Quaternion, Vector3 } from '@babylonjs/core/Maths/math';
import { MeshBuilder } from '@babylonjs/core/Meshes/meshBuilder';
import { PhysicsHelper } from '@babylonjs/core/Physics/physicsHelper';
import { PhysicsShapeType } from '@babylonjs/core/Physics/v2/IPhysicsEnginePlugin';
import { PhysicsAggregate } from '@babylonjs/core/Physics/v2/physicsAggregate';
import { HavokPlugin } from '@babylonjs/core/Physics/v2/Plugins/havokPlugin';
import { Scene } from '@babylonjs/core/scene';
// import HavokPhysics from '@babylonjs/havok';
import { token } from '@zen/auth';
import { MyRoomState, Player } from '@zen/common';
import { ZenLoadingComponent } from '@zen/components';
import { Client, Room } from 'colyseus.js';
import { Subscription, debounce, fromEvent, interval } from 'rxjs';

declare const HavokPhysics: () => Promise<unknown>;

@Component({
  selector: 'zen-babylon',
  templateUrl: 'zen-babylon.component.html',
  styleUrls: ['zen-babylon.component.scss'],
  standalone: true,
  imports: [ZenLoadingComponent, NgIf],
})
export class ZenBabylonComponent implements AfterViewInit, OnDestroy {
  @ViewChild('stubDiv') stubDiv!: ElementRef<HTMLDivElement>; // Used to calculate width
  @ViewChild('canvasElement') canvasElement!: ElementRef<HTMLCanvasElement>;
  #subs: Subscription[] = [];
  engine?: WebGPUEngine | Engine;
  room!: Room<MyRoomState>;
  loading = true;
  physicsHelper!: PhysicsHelper;

  constructor(private ngZone: NgZone) {}

  ngAfterViewInit() {
    // Update canvas dimensions on resize
    const sub = fromEvent(window, 'resize')
      .pipe(debounce(() => interval(200)))
      .subscribe(() => this.updateDimensions());
    this.#subs.push(sub);

    setTimeout(() => this.updateDimensions());

    this.ngZone.runOutsideAngular(async () => {
      const webGPUSupported = await WebGPUEngine.IsSupportedAsync;

      if (webGPUSupported) {
        this.engine = new WebGPUEngine(this.canvasElement.nativeElement, { antialias: true });
        await (<WebGPUEngine>this.engine).initAsync();
      } else {
        this.engine = new Engine(this.canvasElement.nativeElement, true);
      }

      const scene = await this.createScene(this.engine);
      this.ngZone.run(() => {
        this.loading = false;
      });

      this.engine!.runRenderLoop(() => {
        scene.render();
      });
    });
  }

  async createScene(engine: any) {
    const scene = new Scene(engine);

    const havokInterface = await HavokPhysics();

    const plugin = new HavokPlugin(
      undefined /* or the value that fits your usecase */,
      havokInterface
    );

    scene.enablePhysics(new Vector3(0, -9.81, 0), plugin);

    // this.physicsHelper = new PhysicsHelper(scene);
    // const vortexOrigin = new Vector3(0, -5, 0);
    // const vortexEvent = this.physicsHelper.vortex(vortexOrigin, 5, 40, 30);

    // console.log('Enabling Vortex', vortexEvent);
    // vortexEvent?.enable();

    // const cylinder = MeshBuilder.CreateCylinder('debug', {
    //   height: 30,
    //   diameter: 10,
    // });

    // cylinder.position = vortexOrigin.add(new Vector3(0, 15, 0));

    // const cylinderMaterial = new StandardMaterial('cylinderMaterial', scene);
    // cylinderMaterial.alpha = 0.5;
    // cylinder.material = cylinderMaterial;

    const camera = new FollowCamera('camera1', new Vector3(0, 5, -10), scene);

    // This targets the camera to scene origin
    camera.setTarget(Vector3.Zero());

    // This attaches the camera to the canvas
    camera.attachControl(true);

    const light = new HemisphericLight('light', new Vector3(0, 1, 0), scene);
    light.intensity = 0.7;

    const ground = MeshBuilder.CreateGround(
      'ground1',
      {
        width: 160,
        height: 160,
        subdivisions: 2,
      },
      scene
    );
    ground.position.y = -5;

    const groundAggregate = new PhysicsAggregate(
      ground,
      PhysicsShapeType.BOX,
      { mass: 0, friction: 0.5, restitution: 0.7 },
      scene
    );

    const box = MeshBuilder.CreateBox('box', { size: 2 }, scene);
    box.position.y = 1;

    const boxPhysicsAgg = new PhysicsAggregate(
      box,
      PhysicsShapeType.BOX,
      { mass: 1, restitution: 0.9 },
      scene
    );
    box.material = new StandardMaterial('s-mat', scene);
    (<StandardMaterial>box.material)['diffuseColor'] = new Color3(0, 0, 1);

    const colyseusSDK = new Client('ws://localhost:7080');

    let sessionId: string;

    let isUpdateBox = false;

    this.room = await colyseusSDK.joinOrCreate<any>('MainRoom', { token: token() });
    console.log(`Connected to roomId: ${this.room.roomId}`);

    const playerViews: { [id: string]: Mesh } = {};

    this.room.state.players.onAdd((player: Player, key: string) => {
      playerViews[key] = MeshBuilder.CreateSphere('sphere1', { segments: 16, diameter: 2 }, scene);
      console.log('player added', playerViews[key]);

      player.position.onChange(() => {
        if (key != this.room.sessionId) {
          // Prevent jitter caused by linear speed
          if (
            Math.abs(playerViews[key].position.x) < 0.2 &&
            Math.abs(playerViews[key].position.y) < 0.5
            // Math.abs(playerViews[key].position.z) < 0.2
          ) {
            playerViews[key].position = new Vector3(
              player.position.x,
              player.position.y,
              player.position.z
            );
            console.log('LOCK', playerViews[key]);
          } else {
            const VELOCITY = 10;
            playerViews[key].physicsBody!.setLinearVelocity(
              new Vector3(
                (player.position.x - playerViews[key].position.x) * VELOCITY,
                (player.position.y - playerViews[key].position.y) * VELOCITY,
                (player.position.z - playerViews[key].position.z) * VELOCITY
              )
            );
            playerViews[key].rotationQuaternion = Quaternion.Slerp(
              playerViews[key].rotationQuaternion!,
              new Quaternion(
                player.quaternion.x,
                player.quaternion.y,
                player.quaternion.z,
                player.quaternion.w
              ),
              0.4
            );
          }
        }
      });

      // Set camera to follow current player
      if (key === this.room.sessionId) {
        sessionId = key;
        playerViews[key].position = new Vector3(4 * Math.random(), 0, 3 * Math.random());
        const playerViewPhysicsAgg = new PhysicsAggregate(
          playerViews[key],
          PhysicsShapeType.SPHERE,
          { mass: 1, restitution: 0.9 },
          scene
        );
        // playerViews[key].physicsImpostor!.physicsBody.setActivationState(4);
        playerViews[key].material = new StandardMaterial('s-mat', scene);
        (<StandardMaterial>playerViews[key].material)['diffuseColor'] = new Color3(1, 0, 0);

        box.physicsBody?.setCollisionCallbackEnabled(true);

        box.physicsBody?.getCollisionObservable().add(ev => {
          this.room.send('boxUpdate', {
            targetId: sessionId,
            position: { x: box.position.x, y: box.position.y, z: box.position.z },
            quaternion: {
              x: box.rotationQuaternion!.x,
              y: box.rotationQuaternion!.y,
              z: box.rotationQuaternion!.z,
              w: box.rotationQuaternion!.w,
            },
          });
        });
      } else {
        playerViews[key].position = new Vector3(0, 0, 0);
        const playerViewPhysicsAgg = new PhysicsAggregate(
          playerViews[key],
          PhysicsShapeType.SPHERE,
          { mass: 1, restitution: 0 },
          scene
        );
        // playerViews[key].physicsImpostor!.physicsBody.setActivationState(4);
        playerViews[key].material = new StandardMaterial('s-mat', scene);
        (<StandardMaterial>playerViews[key].material)['diffuseColor'] = new Color3(0, 1, 0);
      }
    });

    this.room.onMessage('boxUpdate', message => {
      if (message.targetId == null || message.targetId == sessionId) {
        isUpdateBox = true;
        (<StandardMaterial>box.material)['diffuseColor'] = new Color3(1, 0, 0);
      } else {
        isUpdateBox = false;
        (<StandardMaterial>box.material)['diffuseColor'] = new Color3(0, 1, 0);
        box.position = Vector3.Lerp(
          box.position,
          new Vector3(message.position.x, message.position.y, message.position.z),
          0.5
        );
        box.rotationQuaternion = Quaternion.Slerp(
          box.rotationQuaternion as Quaternion,
          new Quaternion(
            message.quaternion.x,
            message.quaternion.y,
            message.quaternion.z,
            message.quaternion.w
          ),
          0.4
        );
      }
    });

    scene.onKeyboardObservable.add(keyboardInfo => {
      const keyboard = { x: 0, y: 0 };

      if (keyboardInfo.type === KeyboardEventTypes.KEYDOWN) {
        switch (keyboardInfo.event.code) {
          case 'ArrowLeft':
            keyboard.x = -10;
            break;
          case 'ArrowRight':
            keyboard.x = 10;
            break;
          case 'ArrowUp':
            keyboard.y = 10;
            break;
          case 'ArrowDown':
            keyboard.y = -10;
            break;
        }

        playerViews[sessionId].physicsBody!.setLinearVelocity(
          new Vector3(keyboard.x, 0, keyboard.y)
        );
      } else if (keyboardInfo.type === KeyboardEventTypes.KEYUP) {
        switch (keyboardInfo.event.code) {
          case 'ArrowLeft':
            keyboard.x = 0;
            break;
          case 'ArrowRight':
            keyboard.x = 0;
            break;
          case 'ArrowUp':
            keyboard.y = 0;
            break;
          case 'ArrowDown':
            keyboard.y = 0;
            break;
        }

        playerViews[sessionId].physicsBody!.setLinearVelocity(new Vector3());
      }
    });

    this.room.state.players.onRemove((player: Player, key: string) => {
      console.log('player removed');
      scene.removeMesh(playerViews[key]);
      delete playerViews[key];
    });

    engine.runRenderLoop(() => {
      if (this.room && playerViews[sessionId]) {
        // camera.setTarget(playerViews[sessionId].position);
        this.room.send('playData', {
          position: {
            x: playerViews[sessionId].position.x,
            y: playerViews[sessionId].position.y,
            z: playerViews[sessionId].position.z,
          },
          quaternion: {
            x: playerViews[sessionId].rotationQuaternion!.x,
            y: playerViews[sessionId].rotationQuaternion!.y,
            z: playerViews[sessionId].rotationQuaternion!.z,
            w: playerViews[sessionId].rotationQuaternion!.w,
          },
        });

        if (isUpdateBox) {
          this.room.send('boxUpdate', {
            targetId: sessionId,
            position: { x: box.position.x, y: box.position.y, z: box.position.z },
            quaternion: {
              x: box.rotationQuaternion!.x,
              y: box.rotationQuaternion!.y,
              z: box.rotationQuaternion!.z,
              w: box.rotationQuaternion!.w,
            },
          });
        }
      }
    });

    return scene;
  }

  getWidth = () => this.stubDiv.nativeElement.offsetWidth;
  getHeight = () => window.innerHeight - this.stubDiv.nativeElement.getBoundingClientRect().y - 15;

  updateDimensions() {
    this.canvasElement.nativeElement.width = this.getWidth();
    this.canvasElement.nativeElement.height = this.getHeight();
    this.engine?.resize(true);
  }

  ngOnDestroy() {
    this.engine?.stopRenderLoop();
    this.room?.leave();
    this.#subs.forEach(sub => sub.unsubscribe());
  }
}

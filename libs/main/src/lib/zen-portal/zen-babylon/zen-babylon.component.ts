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
import { Vector3 } from '@babylonjs/core/Maths/math';
import { MeshBuilder } from '@babylonjs/core/Meshes/meshBuilder';
import { Scene } from '@babylonjs/core/scene';
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
    const sphere = MeshBuilder.CreateSphere('sphere', { diameter: 2, segments: 32 }, scene);

    // Move the sphere upward 1/2 its height
    sphere.position.y = 1;

    // Our built-in 'ground' shape.
    const ground = MeshBuilder.CreateGround('ground', { width: 6, height: 6 }, scene);

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

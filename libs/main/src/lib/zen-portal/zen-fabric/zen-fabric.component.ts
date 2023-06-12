import { AfterViewInit, Component, ElementRef, OnDestroy, ViewChild } from '@angular/core';
import { fabric } from 'fabric';
import { Subscription, debounce, fromEvent, interval } from 'rxjs';

import { ZenContextmenuComponent } from './zen-contextmenu/zen-contextmenu.component';

@Component({
  selector: 'zen-fabric',
  templateUrl: 'zen-fabric.component.html',
  styleUrls: ['zen-fabric.component.scss'],
  standalone: true,
  imports: [ZenContextmenuComponent],
})
export class ZenFabricComponent implements AfterViewInit, OnDestroy {
  @ViewChild('stubDiv') stubDiv!: ElementRef<HTMLDivElement>; // Used to calculate width
  @ViewChild('canvasElement') canvasElement!: ElementRef<HTMLCanvasElement>;
  @ViewChild('contextMenu') contextMenu!: ZenContextmenuComponent;
  canvas!: fabric.Canvas;
  #subs: Subscription[] = [];

  ngAfterViewInit() {
    // Create the Fabric canvas
    this.canvas = new fabric.Canvas(this.canvasElement.nativeElement, {
      width: this.getWidth(),
      height: this.getHeight(),
      stopContextMenu: true,
      fireRightClick: true,
      preserveObjectStacking: true,
    });

    // Wait for the canvas to be rendered before updating dimensions
    setTimeout(() => {
      this.updateDimensions();
    });

    // Update canvas dimensions on resize
    const sub = fromEvent(window, 'resize')
      .pipe(debounce(() => interval(200)))
      .subscribe(() => {
        this.updateDimensions();
      });
    this.#subs.push(sub);

    // Define contextmenu items
    this.contextMenu.menuItems = [
      {
        label: 'Reset position',
        action: (obj: fabric.Object) => {
          obj.set({ left: 0, top: 0 });
          this.canvas.renderAll();
        },
      },
      {
        label: 'Bring forward',
        action: (obj: fabric.Object) => {
          obj.bringForward();
          this.canvas.renderAll();
        },
      },
      {
        label: 'Bring to front',
        action: (obj: fabric.Object) => {
          obj.bringToFront();
          this.canvas.renderAll();
        },
      },
      {
        label: 'Send to back',
        action: (obj: fabric.Object) => {
          obj.sendToBack();
          this.canvas.renderAll();
        },
      },
      {
        label: 'Send backwards',
        action: (obj: fabric.Object) => {
          obj.sendBackwards();
          this.canvas.renderAll();
        },
      },
    ];

    // Open contextmenu on right click
    this.canvas.on('mouse:down', ev => {
      if (ev.button === 3 && ev.target) {
        this.contextMenu.open(ev.e, ev.target);
      }
    });

    // Log selection
    this.canvas.on('selection:created', ev => {
      const selection = this.canvas.getActiveObject();
      console.log('selection', selection);
    });

    this.addSamples();
  }

  getWidth = () => this.stubDiv.nativeElement.offsetWidth;
  getHeight = () => window.innerHeight - this.stubDiv.nativeElement.getBoundingClientRect().y - 10;

  updateDimensions() {
    this.canvas.setDimensions({
      width: this.getWidth(),
      height: this.getHeight(),
    });
  }

  addSamples() {
    fabric.Image.fromURL('assets/take_in_the_sky_by_yuumei-dar9m8b.jpg', img => {
      this.canvas.add(img);
    });

    this.canvas.add(
      new fabric.Rect({
        left: 100,
        top: 100,
        fill: '#e83e8c',
        width: 50,
        height: 50,
      })
    );
  }

  ngOnDestroy() {
    this.#subs.forEach(sub => sub.unsubscribe());
  }
}

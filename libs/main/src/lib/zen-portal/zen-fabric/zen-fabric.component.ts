import { AfterViewInit, Component, ElementRef, OnDestroy, ViewChild } from '@angular/core';
import { fabric } from 'fabric';
import { Subscription, debounce, fromEvent, interval } from 'rxjs';

import { ZenContextmenuComponent, ZenMenuItem } from './zen-contextmenu';
import { ZenToolbarTextComponent } from './zen-toolbar-text';

@Component({
  selector: 'zen-fabric',
  templateUrl: 'zen-fabric.component.html',
  styleUrls: ['zen-fabric.component.scss'],
  standalone: true,
  imports: [ZenContextmenuComponent, ZenToolbarTextComponent],
})
export class ZenFabricComponent implements AfterViewInit, OnDestroy {
  @ViewChild('stubDiv') stubDiv!: ElementRef<HTMLDivElement>; // Used to calculate width
  @ViewChild('canvasElement') canvasElement!: ElementRef<HTMLCanvasElement>;
  @ViewChild('contextMenu') contextMenu!: ZenContextmenuComponent;
  @ViewChild('toolbarText') toolbarText!: ZenToolbarTextComponent;
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

    // Set the canvas on for the toolbar
    this.toolbarText.canvas = this.canvas;

    // Wait for the app to be rendered before updating dimensions
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
    const menu: ZenMenuItem[] = [
      {
        label: 'Reset position',
        action: obj => obj.set({ left: 0, top: 0 }),
      },
      {
        type: 'divider',
      },
      {
        label: 'Bring to front',
        action: obj => obj.bringToFront(),
      },
      {
        label: 'Bring forward',
        action: obj => obj.bringForward(),
      },
      {
        label: 'Send backwards',
        action: obj => obj.sendBackwards(),
      },
      {
        label: 'Send to back',
        action: obj => obj.sendToBack(),
      },
    ];
    this.contextMenu.setMenu(menu, this.canvas);

    // Open contextmenu on right click
    this.canvas.on('mouse:down', ev => {
      if (ev.button === 3 && ev.target) {
        this.contextMenu.open(ev.e, ev.target);
        this.canvas.setActiveObject(ev.target);
        this.canvas.renderAll();
      }
    });

    // Log selection
    this.canvas.on('selection:created', ev => {
      const selection = this.canvas.getActiveObject();
      console.log('selection:created', selection);
    });

    this.canvas.on('selection:updated', ev => {
      const selection = this.canvas.getActiveObject();
      console.log('selection:updated', selection);
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
    const chatText = new fabric.Textbox('Sample text', {
      left: 250,
      top: 300,
      width: 300,
      fontFamily: 'zen-default',
      editable: true,
      textAlign: 'center',
      // isEditing: true,
    });
    this.canvas.add(chatText);

    fabric.Image.fromURL('assets/chat-bubble.svg', img => {
      this.canvas.add(img);
      img.moveTo(100);
      chatText.moveTo(200);
    });

    fabric.Image.fromURL('assets/take_in_the_sky_by_yuumei-dar9m8b.jpg', img => {
      this.canvas.add(img);
      img.sendToBack();
    });
  }

  ngOnDestroy() {
    this.#subs.forEach(sub => sub.unsubscribe());
  }
}

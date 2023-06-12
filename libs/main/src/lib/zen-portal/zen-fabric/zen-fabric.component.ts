import { NgFor } from '@angular/common';
import { AfterViewInit, Component, ElementRef, OnDestroy, ViewChild } from '@angular/core';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule, MatMenuTrigger } from '@angular/material/menu';
import { fabric } from 'fabric';
import { Subscription, debounce, fromEvent, interval } from 'rxjs';

@Component({
  selector: 'zen-fabric',
  templateUrl: 'zen-fabric.component.html',
  styleUrls: ['zen-fabric.component.scss'],
  standalone: true,
  imports: [MatListModule, MatMenuModule, NgFor],
})
export class ZenFabricComponent implements AfterViewInit, OnDestroy {
  @ViewChild('stubDiv') stubDiv!: ElementRef<HTMLDivElement>; // Used to calculate width
  @ViewChild('canvasElement') canvasElement!: ElementRef<HTMLCanvasElement>;
  canvas!: fabric.Canvas;
  #subs: Subscription[] = [];

  @ViewChild(MatMenuTrigger) contextMenu!: MatMenuTrigger;
  contextMenuPosition = { x: '0px', y: '0px' };

  onContextMenu(event: MouseEvent, item: any) {
    event.preventDefault();
    this.contextMenuPosition.x = event.clientX + 'px';
    this.contextMenuPosition.y = event.clientY + 'px';
    this.contextMenu.menuData = { item: item };
    this.contextMenu.menu?.focusFirstItem('mouse');
    this.contextMenu.openMenu();
  }

  onContextMenuAction1(obj: fabric.Object) {
    obj.set({ left: 50, top: 50 });
    this.canvas.renderAll();
  }

  onContextMenuAction2(obj: fabric.Object) {
    alert(`Click on Action 2 for ${obj}`);
  }

  ngAfterViewInit() {
    document.addEventListener('contextmenu', event => {
      const eventTarget = event?.target as HTMLElement;
      eventTarget?.className?.includes('cdk-overlay') && event.preventDefault();
    });

    this.canvas = new fabric.Canvas(this.canvasElement.nativeElement, {
      width: this.getWidth(),
      height: this.getHeight(),
      stopContextMenu: true,
      fireRightClick: true,
    });

    this.canvas.on('mouse:down', ev => {
      if (ev.button === 3 && ev.target) {
        this.onContextMenu(ev.e, ev.target);
      }
    });

    setTimeout(() => {
      this.updateDimensions();
    });

    const sub = fromEvent(window, 'resize')
      .pipe(debounce(() => interval(200)))
      .subscribe(() => {
        this.updateDimensions();
      });
    this.#subs.push(sub);

    this.addSampleSquare();
  }

  getWidth = () => this.stubDiv.nativeElement.offsetWidth;
  getHeight = () => window.innerHeight - this.stubDiv.nativeElement.getBoundingClientRect().y - 10;

  updateDimensions() {
    this.canvas.setDimensions({
      width: this.getWidth(),
      height: this.getHeight(),
    });
  }

  addSampleSquare() {
    fabric.Image.fromURL('assets/take_in_the_sky_by_yuumei-dar9m8b.jpg', img => {
      this.canvas.add(img);
    });

    const rect = new fabric.Rect({
      left: 100,
      top: 100,
      fill: '#e83e8c',
      width: 50,
      height: 50,
    });

    this.canvas.add(rect);
  }

  ngOnDestroy() {
    this.#subs.forEach(sub => sub.unsubscribe());
  }
}

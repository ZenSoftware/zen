import { AfterViewInit, Component, ElementRef, OnDestroy, ViewChild } from '@angular/core';
import { fabric } from 'fabric';
import { Subscription, debounce, fromEvent, interval } from 'rxjs';

const ASPECT_RATIO = 20 / 9;

@Component({
  selector: 'zen-fabric',
  templateUrl: 'zen-fabric.component.html',
  styleUrls: ['zen-fabric.component.scss'],
  standalone: true,
})
export class ZenFabricComponent implements AfterViewInit, OnDestroy {
  @ViewChild('stubDiv') stubDiv!: ElementRef<HTMLDivElement>;
  @ViewChild('canvasElement') canvasElement!: ElementRef<HTMLCanvasElement>;
  canvas!: fabric.Canvas;
  #subs: Subscription[] = [];

  getWidth = () => this.stubDiv.nativeElement.offsetWidth;
  getHeight = () => this.getWidth() / ASPECT_RATIO;

  updateDimensions() {
    this.canvas.setDimensions({
      width: this.getWidth(),
      height: this.getHeight(),
    });
  }

  ngAfterViewInit() {
    this.canvas = new fabric.Canvas(this.canvasElement.nativeElement);
    this.updateDimensions();

    const sub = fromEvent(window, 'resize')
      .pipe(debounce(() => interval(300)))
      .subscribe(() => {
        this.updateDimensions();
      });
    this.#subs.push(sub);

    this.addSampleSquare();
  }

  addSampleSquare() {
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

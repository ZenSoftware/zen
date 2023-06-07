import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { fabric } from 'fabric';
import { debounce, fromEvent, interval } from 'rxjs';

const ASPECT_RATIO = 16 / 9;

@Component({
  selector: 'zen-fabric',
  templateUrl: 'zen-fabric.component.html',
  styleUrls: ['zen-fabric.component.scss'],
  standalone: true,
})
export class ZenFabricComponent implements AfterViewInit {
  @ViewChild('stubDiv') stubDiv!: ElementRef<HTMLDivElement>;
  @ViewChild('canvasElement') canvasElement!: ElementRef<HTMLCanvasElement>;
  canvas!: fabric.Canvas;

  getWidth = () => this.stubDiv.nativeElement.clientWidth;
  getHeight = () => this.stubDiv.nativeElement.clientWidth / ASPECT_RATIO;

  ngAfterViewInit() {
    this.canvasElement.nativeElement.width = this.getWidth();
    this.canvasElement.nativeElement.height = this.getHeight();
    this.canvas = new fabric.Canvas(this.canvasElement.nativeElement);

    fromEvent(window, 'resize')
      .pipe(debounce(() => interval(300)))
      .subscribe(() => {
        this.canvas.setDimensions({
          width: this.getWidth(),
          height: this.getHeight(),
        });
      });

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
}

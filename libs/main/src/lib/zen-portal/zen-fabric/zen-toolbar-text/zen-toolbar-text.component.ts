import { Component, Input } from '@angular/core';
import { MatSelectModule } from '@angular/material/select';
import { ColorPickerModule } from '@progress/kendo-angular-inputs';
import FontFaceObserver from 'fontfaceobserver';

@Component({
  selector: 'zen-toolbar-text',
  templateUrl: 'zen-toolbar-text.component.html',
  styleUrls: ['zen-toolbar-text.component.scss'],
  standalone: true,
  imports: [ColorPickerModule, MatSelectModule],
})
export class ZenToolbarTextComponent {
  @Input() canvas!: fabric.Canvas;
  fill = '#000000';
  fonts = ['Pacifico', 'zen-default', 'zen-heading'];

  fillClosed() {
    const textbox = this.canvas.getActiveObject() as fabric.Textbox;

    if (textbox?.type === 'textbox' && textbox.isEditing) {
      textbox.hiddenTextarea!.focus();
    }
  }

  setFill(value: string) {
    for (const obj of this.canvas.getActiveObjects()) {
      if (obj.type === 'textbox') {
        this.setTextStyle(obj as fabric.Textbox, 'fill', value);
      }
    }

    this.canvas.renderAll();
  }

  setTextStyle(object: fabric.IText & Record<string, any>, styleName: string, value: any) {
    if (object.setSelectionStyles && object.isEditing) {
      const style: Record<string, any> = {};
      style[styleName] = value;
      object.setSelectionStyles(style).setCoords();
    } else {
      object.set({ [styleName]: value });
    }
  }

  getTextStyle(object: fabric.IText & Record<string, any>, styleName: string) {
    if (object.getSelectionStyles && object.isEditing) {
      const styles = object.getSelectionStyles().map((x: any) => x[styleName]);
      for (let i = 1; i < styles.length; i++) {
        if (styles[i] !== styles[0]) {
          return undefined;
        }
      }
      if (styles.length > 0) return styles[0];
      else return undefined;
    } else {
      return object.get(styleName);
    }
  }

  setFont(font: string) {
    for (const obj of this.canvas.getActiveObjects()) {
      if (obj.type === 'textbox') {
        const myfont = new FontFaceObserver(font);
        myfont
          .load()
          .then(() => {
            this.setTextStyle(obj as fabric.Textbox, 'fontFamily', font);
            this.canvas.requestRenderAll();
          })
          .catch(function (e) {
            console.error(`font loading failed ${font}`, e);
          });
      }
    }
  }
}

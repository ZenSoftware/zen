import { Component, Input } from '@angular/core';

@Component({
  selector: 'zen-toolbar-text',
  templateUrl: 'zen-toolbar-text.component.html',
  standalone: true,
  imports: [],
})
export class ZenToolbarTextComponent {
  @Input() canvas!: fabric.Canvas;

  setFontColor(value: string) {
    const textbox = this.canvas.getActiveObject() as fabric.Textbox;

    if (textbox?.type === 'textbox') {
      this.setTextStyle(textbox, 'fill', value);
      this.canvas.renderAll();

      if (textbox.isEditing) {
        textbox.hiddenTextarea?.focus();
      }
    }
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
}

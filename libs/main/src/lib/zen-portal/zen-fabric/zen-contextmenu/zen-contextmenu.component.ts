import { NgFor, NgIf } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule, MatMenuTrigger } from '@angular/material/menu';

document.addEventListener('contextmenu', event => {
  const eventTarget = event?.target as HTMLElement;
  eventTarget?.className?.includes('cdk-overlay') && event.preventDefault();
});

export interface ZenMenuItem {
  type?: 'divider';
  label?: string;
  action?: (obj: fabric.Object) => void;
}

@Component({
  selector: 'zen-contextmenu',
  templateUrl: 'zen-contextmenu.component.html',
  standalone: true,
  imports: [MatListModule, MatMenuModule, NgFor, NgIf],
})
export class ZenContextmenuComponent {
  @ViewChild(MatMenuTrigger) contextMenu!: MatMenuTrigger;
  canvas!: fabric.Canvas;
  menuItems: ZenMenuItem[] = [];
  contextMenuPosition = { x: '0px', y: '0px' };

  open(event: MouseEvent, data: any) {
    event.preventDefault();
    this.contextMenuPosition.x = event.clientX + 'px';
    this.contextMenuPosition.y = event.clientY + 'px';
    this.contextMenu.menuData = { data };
    this.contextMenu.menu?.focusFirstItem('mouse');
    this.contextMenu.openMenu();
  }

  setMenu(menuItems: ZenMenuItem[], canvas: fabric.Canvas) {
    this.canvas = canvas;
    this.menuItems = menuItems;
  }

  action(menuItem: ZenMenuItem, data: any) {
    (<any>menuItem).action?.(data);
    this.canvas.renderAll();
  }
}

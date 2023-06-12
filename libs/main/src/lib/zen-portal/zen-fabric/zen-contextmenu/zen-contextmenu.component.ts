import { NgFor } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule, MatMenuTrigger } from '@angular/material/menu';

document.addEventListener('contextmenu', event => {
  const eventTarget = event?.target as HTMLElement;
  eventTarget?.className?.includes('cdk-overlay') && event.preventDefault();
});

export interface ZenMenuItem {
  label: string;
  action?: (data: any) => void;
}

@Component({
  selector: 'zen-contextmenu',
  templateUrl: 'zen-contextmenu.component.html',
  standalone: true,
  imports: [MatListModule, MatMenuModule, NgFor],
})
export class ZenContextmenuComponent {
  @ViewChild(MatMenuTrigger) contextMenu!: MatMenuTrigger;
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

  action(menuItem: ZenMenuItem, data: any) {
    menuItem.action?.(data);
  }
}

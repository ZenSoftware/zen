import { Component } from '@angular/core';
import { Role } from '@zen/graphql';

@Component({
  selector: 'zen-portal',
  templateUrl: 'zen-portal-main.component.html',
  styleUrls: ['zen-portal-main.component.scss'],
})
export class ZenPortalMainComponent {
  Role = Role;
}

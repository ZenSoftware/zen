import { Component } from '@angular/core';
import { Role } from '@zen/graphql';

@Component({
  selector: 'zen-portal',
  templateUrl: 'zen-portal.component.html',
  styleUrls: ['zen-portal.component.scss'],
})
export class ZenPortalComponent {
  Role = Role;
}

import { Component } from '@angular/core';
import { Role } from '@zen/graphql';

@Component({
  selector: 'zen-main',
  templateUrl: 'zen-main.component.html',
  styleUrls: ['zen-main.component.scss'],
})
export class ZenMainComponent {
  Role = Role;
}

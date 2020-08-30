import { Component } from '@angular/core';
import { FindOneUserQueryGQL } from '@zen/graphql';

@Component({
  selector: 'portal-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  apolloQuery$ = this.findOneUserQueryGQL.watch().valueChanges;

  constructor(private findOneUserQueryGQL: FindOneUserQueryGQL) {}
}

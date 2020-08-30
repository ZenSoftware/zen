import { Component } from '@angular/core';
import { FindOneUserQueryGQL } from '@zen/graphql';
import { Observable } from 'rxjs';

@Component({
  selector: 'portal-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  apolloQuery$: Observable<any>;

  constructor(private query: FindOneUserQueryGQL) {
    this.apolloQuery$ = query.watch().valueChanges;
  }
}

import { Component } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { Observable } from 'rxjs';

@Component({
  selector: 'portal-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  apolloQuery$: Observable<any>;

  constructor(private apollo: Apollo) {
    this.apolloQuery$ = this.apollo.watchQuery({
      query: gql`
        query {
          findOneUser(where: { id: 1 }) {
            id
            email
            password
            posts {
              id
            }
          }
        }
      `,
    }).valueChanges;
  }
}

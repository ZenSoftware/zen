import { Component } from '@angular/core';
import { FindOneUserGQL } from '@zen/graphql';
import { map } from 'rxjs/operators';

@Component({
  selector: 'portal-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  findOneUserGQL$ = this.findOneUserGQL.watch().valueChanges.pipe(map(r => r.data.findOneUser));

  constructor(private findOneUserGQL: FindOneUserGQL) {}
}

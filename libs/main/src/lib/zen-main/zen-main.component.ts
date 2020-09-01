import { Component } from '@angular/core';
import { FindOneUserGQL } from '@zen/graphql';
import { map } from 'rxjs/operators';

@Component({
  selector: 'zen-main',
  templateUrl: 'zen-main.component.html',
})
export class ZenMainComponent {
  findOneUser$ = this.findOneUserGQL.watch().valueChanges.pipe(map(r => r.data?.findOneUser));

  constructor(private findOneUserGQL: FindOneUserGQL) {}
}

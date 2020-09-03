import { Component } from '@angular/core';
import { FindManyUserGQL, FindOneUserGQL, SortOrder } from '@zen/graphql';
import { map } from 'rxjs/operators';

@Component({
  selector: 'zen-main',
  templateUrl: 'zen-main.component.html',
})
export class ZenMainComponent {
  findOneUser$ = this.findOneUserGQL
    .watch({
      where: {
        id: 1,
      },
    })
    .valueChanges.pipe(map(r => r.data?.findOneUser));

  findManyUserGQL$ = this.findManyUserGQL
    .watch({
      orderBy: [{ name: SortOrder.Asc }],
    })
    .valueChanges.pipe(map(r => r.data?.findManyUser));

  constructor(private findOneUserGQL: FindOneUserGQL, private findManyUserGQL: FindManyUserGQL) {}
}

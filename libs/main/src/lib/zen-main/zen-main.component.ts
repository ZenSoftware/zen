import { Component } from '@angular/core';
import { FindManyUserGQL, FindOneUserGQL, SortOrder } from '@zen/graphql';
import { map } from 'rxjs/operators';

@Component({
  selector: 'zen-main',
  templateUrl: 'zen-main.component.html',
})
export class ZenMainComponent {
  constructor(private findOneUserGQL: FindOneUserGQL, private findManyUserGQL: FindManyUserGQL) {}

  user$ = this.findOneUserGQL
    .watch({
      where: {
        id: 1,
      },
    })
    .valueChanges.pipe(map(r => r.data?.findOneUser));

  manyUser$ = this.findManyUserGQL
    .watch({
      orderBy: [{ name: SortOrder.Asc }],
      cursor: { id: 1 },
    })
    .valueChanges.pipe(map(r => r.data?.findManyUser));
}

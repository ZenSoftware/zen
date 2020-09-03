import { Component } from '@angular/core';
import { FindManyUserGQL, FindOneUserGQL, SortOrder } from '@zen/graphql';
import { map, shareReplay } from 'rxjs/operators';

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
    .valueChanges.pipe(
      map(r => r.data?.findOneUser),
      shareReplay(1)
    );

  users$ = this.findManyUserGQL
    .watch({
      orderBy: [{ name: SortOrder.Asc }],
      cursor: { id: 1 },
    })
    .valueChanges.pipe(
      map(r => r.data?.findManyUser),
      shareReplay(1)
    );
}

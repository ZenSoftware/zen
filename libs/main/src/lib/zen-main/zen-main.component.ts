import { Component } from '@angular/core';
import {
  FindManyUserGQL,
  FindOneUserGQL,
  SortOrder,
  UpdateOneUserGQL,
  UpdateOneUserMutationVariables,
} from '@zen/graphql';
import { map, shareReplay } from 'rxjs/operators';

@Component({
  selector: 'zen-main',
  templateUrl: 'zen-main.component.html',
})
export class ZenMainComponent {
  userUpdateInput: UpdateOneUserMutationVariables['data'] = {};

  constructor(private findOneUserGQL: FindOneUserGQL, private updateOneUserGQL: UpdateOneUserGQL) {
    this.userUpdateInput.comments = {
      connect: [{ id: 1 }],
    };
  }

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

  test() {
    this.updateOneUserGQL.mutate({ where: { id: 1 }, data: this.userUpdateInput });
  }
}

import { Component } from '@angular/core';
import {
  FindOneUserGQL,
  UpdateOneUserGQL,
  UpdateOneUserMutationVariables,
  connectMany,
  connectOne,
  set,
} from '@zen/graphql';
import { map, shareReplay } from 'rxjs/operators';

@Component({
  selector: 'zen-main',
  templateUrl: 'zen-main.component.html',
})
export class ZenMainComponent {
  constructor(private findOneUserGQL: FindOneUserGQL, private updateOneUserGQL: UpdateOneUserGQL) {}

  userInput: UpdateOneUserMutationVariables['data'] = {
    comments: set([{ id: 3 }]),
    group: connectOne(7),
    posts: connectMany([1]),
  };

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
    this.updateOneUserGQL.mutate({ where: { id: 1 }, data: this.userInput });
  }
}

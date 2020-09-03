import { Component } from '@angular/core';
import {
  FindOneUserGQL,
  UpdateOneUserGQL,
  UpdateOneUserMutationVariables,
  connectOverMany,
  connectOverOne,
} from '@zen/graphql';
import { map, shareReplay } from 'rxjs/operators';

@Component({
  selector: 'zen-main',
  templateUrl: 'zen-main.component.html',
})
export class ZenMainComponent {
  userInput: UpdateOneUserMutationVariables['data'];

  constructor(private findOneUserGQL: FindOneUserGQL, private updateOneUserGQL: UpdateOneUserGQL) {
    this.userInput = {
      comments: { ...connectOverMany([{ id: 1, example: '' }]) },
      group: { ...connectOverOne({ id: 1, example: '' }) },
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
    this.updateOneUserGQL.mutate({ where: { id: 1 }, data: this.userInput });
  }
}

import { Component } from '@angular/core';
import { FindOneUserGQL, UpdateOneUserVariables, selectMany, selectOne } from '@zen/graphql';
import { map, shareReplay } from 'rxjs/operators';

@Component({
  selector: 'zen-main',
  templateUrl: 'zen-main.component.html',
})
export class ZenMainComponent {
  constructor(private findOneUserGQL: FindOneUserGQL) {}

  userInput: UpdateOneUserVariables['data'] = {
    comments: { delete: selectMany([{ id: 1 }]) },
    group: { connect: selectOne({ id: 1 }) },
    posts: { set: selectMany([1, 2, 3]) },
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
    const manyTestList = [
      { id: undefined },
      { id: null },
      { id: '' },
      undefined,
      null,
      { id: '1' },
      { id: '2', ex: '' },
      { id: '3', ex: '' },
    ];

    console.log('selectMany:', selectMany(manyTestList));
    console.log(`selectOne:`, selectOne({ id: 77, junk: 'sdsds' }));
  }
}

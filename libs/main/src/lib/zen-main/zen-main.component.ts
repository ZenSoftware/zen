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
    comments: { delete: selectMany([{ id: 1, example: '' }]) },
    posts: { set: selectMany([1, 2, 3]) },
    group: { connect: selectOne({ id: 1 }) },
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

  example() {
    const exampleList = [
      { id: '1' },
      { id: '2', ex: 'a' },
      { id: '3', ex: 'b' },
      { id: undefined },
      { id: null },
      { id: -1 },
      { id: '' },
      undefined,
      null,
    ];

    console.log(`selectMany(manyTestList)`, selectMany(exampleList));

    console.log(`selectMany(manyTestList, 'ex', 'out')`, selectMany(exampleList, 'ex', 'out'));

    console.log(
      `selectOne({ id: 7, ex: 'example' }, 'ex')`,
      selectOne({ id: 7, ex: 'example' }, 'ex')
    );
  }
}

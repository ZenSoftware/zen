import { Component } from '@angular/core';
import {
  FindManyUserGQL,
  FindOneUserGQL,
  UpdateOneUserVariables,
  selectMany,
  selectOne,
} from '@zen/graphql';
import { map, shareReplay } from 'rxjs/operators';

@Component({
  selector: 'zen-main',
  templateUrl: 'zen-main.component.html',
})
export class ZenMainComponent {
  constructor(private findOneUserGQL: FindOneUserGQL, private findManyUserGQL: FindManyUserGQL) {}

  userInput: UpdateOneUserVariables['data'] = {
    comments: { delete: selectMany([{ id: 1, example: '' }]) },
    posts: { set: selectMany([1, 2, 3]) },
    group: { connect: selectOne({ id: 1 }) },
  };

  user$ = this.findOneUserGQL
    .watch({
      where: selectOne('', 'email'),
    })
    .valueChanges.pipe(
      map(r => r.data?.findOneUser),
      shareReplay(1)
    );

  users$ = this.findManyUserGQL
    .watch({
      where: {
        name: {},
      },
    })
    .valueChanges.pipe(map(r => r.data?.findManyUser));

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

    console.log(`selectMany(exampleList)`, selectMany(exampleList));
    console.log(`selectMany(exampleList, 'out', 'ex')`, selectMany(exampleList, 'out', 'ex'));
    console.log(`selectOne({ id: 7, ex: 'abc' }, 'ex')`, selectOne({ id: 7, ex: 'abc' }, 'ex'));
  }
}

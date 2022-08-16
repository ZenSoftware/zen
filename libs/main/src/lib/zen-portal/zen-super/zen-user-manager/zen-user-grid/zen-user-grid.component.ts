import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Ability } from '@casl/ability';
import { Action } from '@zen/auth';
import {
  DeleteOneUserGQL,
  FindManyUserCountGQL,
  FindManyUserGQL,
  Role,
  UserFields,
} from '@zen/graphql';
import { GridMode, KendoGridSettings, ZenGridSettings } from '@zen/grid';

import { DialogData, ZenUserInputComponent } from '../zen-user-input/zen-user-input.component';

const DEFAULT_SETTINGS: KendoGridSettings<UserFields> = {
  rowColorStyles: [
    {
      condition: row => row.roles.includes(Role.Super),
      hexColor: '#003333',
    },
  ],
  columnsConfig: [
    {
      field: 'id',
      title: 'ID',
      filter: 'numeric',
      hidden: true,
    },
    {
      field: 'username',
      title: 'Username',
    },
    {
      field: 'email',
      title: 'Email',
    },
    {
      field: 'createdAt',
      title: 'Created At',
      filter: 'date',
    },
  ],
};

@Component({
  selector: 'zen-user-grid',
  templateUrl: 'zen-user-grid.component.html',
})
export class ZenUserGridComponent {
  @Input() mode = GridMode.Default;
  @Input() selection: Array<UserFields['id']> = [];
  @Input() showAdd: boolean;
  @Input() showEdit: boolean | ((row: UserFields) => boolean);
  @Input() showDelete: boolean | ((row: UserFields) => boolean);
  settings: ZenGridSettings<UserFields>;

  constructor(
    ability: Ability,
    findManyUserGQL: FindManyUserGQL,
    findManyUserCountGQL: FindManyUserCountGQL,
    deleteOneUserGQL: DeleteOneUserGQL,
    private dialog: MatDialog
  ) {
    const typename = 'User';

    // Casl subject detection is set to `object => object['__typename']`
    // consequently GraphQL results are accepted as Casl subjects
    this.showAdd = ability.can(Action.create, typename);
    this.showEdit = row => ability.can(Action.update, row);
    this.showDelete = row => ability.can(Action.delete, row);

    this.settings = {
      typename,
      findManyGQL: findManyUserGQL,
      findManyCountGQL: findManyUserCountGQL,
      deleteOneGQL: deleteOneUserGQL,
      defaultSettings: DEFAULT_SETTINGS,
    };
  }

  addHandler() {
    this.inputDialog({ action: 'new' });
  }

  editHandler({ dataItem }: { dataItem: UserFields }) {
    this.inputDialog({ action: 'edit', item: structuredClone(dataItem) });
  }

  inputDialog(data: DialogData) {
    this.dialog.open(ZenUserInputComponent, {
      data,
      disableClose: true,
      width: '100%',
    });
  }
}

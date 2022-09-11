import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Ability } from '@casl/ability';
import { DeleteOneUserGQL, FindManyUserCountGQL, FindManyUserGQL, UserFields } from '@zen/graphql';
import { GridMode, KendoGridSettings, ZenGridSettings } from '@zen/grid';

import { DialogData, ZenUserInputComponent } from '../zen-user-input/zen-user-input.component';

const DEFAULT_SETTINGS: KendoGridSettings<UserFields> = {
  rowColorStyles: [
    {
      condition: row => row.roles.includes('Super'),
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
  settings: ZenGridSettings<UserFields>;

  constructor(
    findManyUserGQL: FindManyUserGQL,
    findManyUserCountGQL: FindManyUserCountGQL,
    deleteOneUserGQL: DeleteOneUserGQL,
    ability: Ability,
    private dialog: MatDialog
  ) {
    this.settings = {
      typename: 'User',
      findManyGQL: findManyUserGQL,
      findManyCountGQL: findManyUserCountGQL,
      deleteOneGQL: deleteOneUserGQL,
      defaultSettings: DEFAULT_SETTINGS,
      ability: ability,
    };
  }

  addHandler() {
    this.inputDialog({ action: 'create' });
  }

  editHandler({ dataItem }: { dataItem: UserFields }) {
    this.inputDialog({ action: 'update', item: structuredClone(dataItem) });
  }

  inputDialog(data: DialogData) {
    this.dialog.open(ZenUserInputComponent, {
      data,
      disableClose: true,
      width: '100%',
    });
  }
}

import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from '@zen/auth';
import {
  DeleteOneUserGQL,
  FindManyUserCountGQL,
  FindManyUserGQL,
  Role,
  UserFields,
} from '@zen/graphql';
import { GridMode, KendoGridSettings, ZenGridSettings } from '@zen/grid';
import { cloneDeep } from 'lodash-es';

import { DialogData, ZenUserInputComponent } from '../zen-user-input/zen-user-input.component';

const DEFAULT_SETTINGS: KendoGridSettings<UserFields> = {
  rowColorStyles: [
    {
      condition: item => item.roles.includes(Role.Super),
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
  @Input() showAdd = true;
  @Input() showEdit = true;
  @Input() showDelete = true;
  settings: ZenGridSettings<UserFields>;

  constructor(
    private dialog: MatDialog,
    auth: AuthService,
    findManyUserGQL: FindManyUserGQL,
    findManyUserCountGQL: FindManyUserCountGQL,
    deleteOneUserGQL: DeleteOneUserGQL
  ) {
    const isSuper = auth.userHasRole(Role.Super);
    this.showAdd = isSuper;
    this.showEdit = isSuper;
    this.showDelete = isSuper;

    this.settings = {
      typename: 'User',
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
    this.inputDialog({ action: 'edit', item: cloneDeep(dataItem) });
  }

  inputDialog(data: DialogData) {
    this.dialog.open(ZenUserInputComponent, {
      data,
      disableClose: true,
      width: '100%',
    });
  }
}

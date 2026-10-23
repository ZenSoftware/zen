import { Component, Input, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatDialogModule } from '@angular/material/dialog';
import { Ability } from '@casl/ability';
import { DeleteOneUserGQL, FindManyUserCountGQL, FindManyUserGQL, UserFields } from '@zen/graphql';
import { GridMode, KendoGridSettings, ZenGridComponent, ZenGridSettings } from '@zen/grid';

import { DialogData, ZenUserInputComponent } from '../zen-user-input';

const DEFAULT_SETTINGS: KendoGridSettings<UserFields> = {
  // Note: Using the row color syles is buggy as the background color does not apply to alternate rows
  // rowColorStyles: [
  //   {
  //     condition: row => row.roles.includes('Super'),
  //     hexColor: '#003333',
  //   },
  // ],
  columnsConfig: [
    {
      field: 'id',
      title: 'ID',
      hidden: true,
    },
    {
      field: 'username',
      title: 'Username',
      custom: {
        /** @comment set this to true when fields are nullable as defined within the Prisma schema */
        nullable: true,
      },
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
    {
      field: 'roles',
      title: 'Roles',
      filterable: false,
      sortable: false,
    },
  ],
};

@Component({
  selector: 'zen-user-grid',
  templateUrl: 'zen-user-grid.component.html',
  standalone: true,
  imports: [MatDialogModule, ZenGridComponent],
})
export class ZenUserGridComponent {
  @Input() mode = GridMode.Default;
  @Input() selection: Array<UserFields['id']> = [];
  settings: ZenGridSettings<UserFields>;

  findManyUserGQL = inject(FindManyUserGQL);
  findManyUserCountGQL = inject(FindManyUserCountGQL);
  deleteOneUserGQL = inject(DeleteOneUserGQL);
  ability = inject(Ability);
  private dialog = inject(MatDialog);

  constructor() {
    this.settings = {
      typename: 'User',
      findManyGQL: this.findManyUserGQL,
      findManyCountGQL: this.findManyUserCountGQL,
      deleteOneGQL: this.deleteOneUserGQL,
      defaultSettings: DEFAULT_SETTINGS,
      ability: this.ability,
    };
  }

  addHandler() {
    this.inputDialog({ action: 'create' });
  }

  editHandler({ dataItem }: { dataItem: UserFields }) {
    this.inputDialog({ action: 'edit', item: structuredClone(dataItem) });
  }

  inputDialog(data: DialogData) {
    this.dialog.open(ZenUserInputComponent, {
      data,
      disableClose: true,
    });
  }
}

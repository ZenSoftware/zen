# Zen Grid

`<zen-grid>` is a component that wraps Kendo Grid and implements a data source adapter to interface with the code generated GraphQL module `@zen/graphql`.  With minimal configuration, `<zen-grid>` will render a fully featured data grid over any Prisma model within the project.  Intelligent default implementations for the varying Kendo grid features have all been implemented.  By converting the Kendo Grid state object into valid Prisma queries that will be made via the code generated GraphQL API gateway, sophisticated queries over Prisma models can be simply designed utilizing Kendo Grid's robust filter UIs.  There is heavy utilization of Apollo's InMemoryCache to only incur network requests when necessary.  Also, the grid implements an efficient, scalable, server-side pagination strategy, giving you pagination for free.  

Configuration is made simple by providing GQL documents generated via `@zen/graphql` and listing them within the grid `settings`.

*zen-user-grid.component.ts*
```ts
this.settings = {
  typename: 'User',
  findManyGQL: findManyUserGQL,
  findManyCountGQL: findManyUserCountGQL,
  deleteOneGQL: deleteOneUserGQL,
  defaultSettings: DEFAULT_SETTINGS,
};
```

*zen-user-grid.component.html*
```html
<zen-grid
  [mode]="mode"
  [settings]="settings"
  [selection]="selection"
  [showAdd]="showAdd"
  [showEdit]="showEdit"
  [showDelete]="showDelete"
  (add)="addHandler()" 
  (edit)="editHandler($event)">
</zen-grid>
```

One of the best features is that the grid provides end-to-end type safety for its configuration, from the Prisma data type to the client-side type that is generated from the grid's GraphQL query.  Define the columns of the grid utilizing the property `columnsConfig` under `KendoGridSettings<T>`, where `T` is the type containing the fields on the Prisma object being selected for within the grid's GraphQL request.  Sensibly, a column can only be added if its field exists within the GraphQL query made for the grid.  For usage of `<zen-grid>`, view the `<zen-user-grid>` component as a template for a complete solution.

`zen-user-grid.component.ts`
```ts
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
```
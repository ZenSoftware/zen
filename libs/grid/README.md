# Zen Grid

`<zen-grid>` is a component that wraps [Kendo Angular Grid](https://www.telerik.com/kendo-angular-ui/components/grid/) and implements a data source adapter to interface with the code generated GraphQL module `@zen/graphql`.  With minimal configuration, `<zen-grid>` will render a fully featured data grid over any Prisma model within the project.  Intelligent default implementations for the varying Kendo grid features have all been implemented.  By converting the Kendo Grid state object into valid Prisma queries that will be made via the code generated GraphQL API gateway, sophisticated queries over Prisma models can be simply designed utilizing Kendo Grid's robust filter UIs.  The grid leverages Apollo InMemoryCache to only incurs network requests when necessary.  Also, the grid implements an efficient, scalable, server-side pagination strategy, giving you pagination for free.

Configuration is made simple by providing the GQL documents generated via `@zen/graphql` and listing them within the grid `settings`.

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

The grid provides end-to-end type safety for its configuration, from the Prisma data type to the client-side type that is generated from the grid's GraphQL query.  Define the columns of the grid utilizing the property `columnsConfig` under `KendoGridSettings<T>`, where `T` is the type containing the fields on the Prisma object being selected for within the grid's GraphQL request.  Sensibly, a column can only be added if its field exists within the GraphQL query made for the grid.  For usage of `<zen-grid>`, view the `<zen-user-grid>` component as a template for a complete solution.

`zen-user-grid.component.ts`
```ts
import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Ability } from '@casl/ability';
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
    this.showAdd = ability.can('create', typename);
    this.showEdit = row => ability.can('update', row);
    this.showDelete = row => ability.can('delete', row);

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
```

### Detail Row Template

The master details template row item can be accessed via `zenGridDetailTemplate` which imitates  [kendoGridDetailTemplate](https://www.telerik.com/kendo-angular-ui/components/grid/master-detail/detail-template/).  For usage, please view the following code.

```html
<zen-grid [settings]="settings">
  <ng-template zenGridDetailTemplate let-dataItem [zenGridDetailTemplateShowIf]="showDetails">
    id: {{dataItem.id}}
  </ng-template>
</zen-grid>
```
import { CommonModule } from '@angular/common';
import { Component, HostListener, Inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { InputsModule } from '@progress/kendo-angular-inputs';
import { FloatingLabelModule } from '@progress/kendo-angular-label';
import { ZenRegisterFormComponent, emailValidator } from '@zen/auth';
import { trimObjectStrings } from '@zen/common';
import { ZenLoadingComponent, ZenSnackbarError, ZenSnackbarModule } from '@zen/components';
import { UpdateOneUserGQL, UserFields, UserUpdateInput } from '@zen/graphql';
import { Apollo } from 'apollo-angular';

import { ZenUserRolesInputComponent } from './zen-user-roles-input';

export type DialogData =
  | {
      action: 'edit';
      item: UserFields;
    }
  | {
      action: 'create';
    };

interface FormType {
  username: FormControl<UserFields['username']>;
  email: FormControl<UserFields['email']>;
  roles: FormControl<UserFields['roles']>;
}

@Component({
  selector: 'zen-user-input',
  templateUrl: 'zen-user-input.component.html',
  standalone: true,
  imports: [
    CommonModule,
    FloatingLabelModule,
    InputsModule,
    MatButtonModule,
    MatDialogModule,
    MatSnackBarModule,
    ReactiveFormsModule,
    ZenLoadingComponent,
    ZenRegisterFormComponent,
    ZenSnackbarModule,
    ZenUserRolesInputComponent,
  ],
})
export class ZenUserInputComponent {
  loading = false;
  form = new FormGroup<FormType>({
    username: new FormControl('', {
      nonNullable: true,
    }),
    email: new FormControl('', {
      validators: [Validators.required, emailValidator()],
      nonNullable: true,
    }),
    roles: new FormControl([], {
      nonNullable: true,
    }),
  });

  @HostListener('keydown.escape')
  handleKeyDown() {
    this.dialogRef.close();
  }

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    public dialogRef: MatDialogRef<ZenUserInputComponent>,
    private apollo: Apollo,
    private snackBar: MatSnackBar,
    private snackBarError: ZenSnackbarError,
    private updateOneUserGQL: UpdateOneUserGQL
  ) {
    if (data.action === 'edit') {
      this.username.setValue(data.item.username);
      this.email.setValue(data.item.email);
      this.roles.setValue(data.item.roles);
    }
  }

  onSubmit() {
    if (!this.loading) {
      this.loading = true;

      if (this.data.action === 'edit') {
        const updateInput: UserUpdateInput = {
          username: this.username.value,
          email: this.email.value,
          roles: this.roles.value,
        };

        trimObjectStrings(updateInput);

        this.updateOneUserGQL
          .mutate({
            where: { id: this.data.item.id },
            data: updateInput,
          })
          .subscribe({
            next: () => {
              this.loading = false;
              this.apollo.client.cache.evict({ fieldName: `findManyUser` });
              this.snackBar.open('Updated', '', { duration: 1500 });
              this.dialogRef.close();
            },
            error: e => {
              this.snackBarError.open(e);
              this.loading = false;
            },
          });
      }
    }
  }

  registered() {
    this.loading = false;
    this.apollo.client.cache.evict({ fieldName: `findManyUser` });
    this.apollo.client.cache.evict({ fieldName: `findManyUserCount` });
    this.snackBar.open('Created', '', { duration: 1500 });
    this.dialogRef.close();
  }

  get username() {
    return this.form.get('username') as FormType['username'];
  }

  get email() {
    return this.form.get('email') as FormType['email'];
  }

  get roles() {
    return this.form.get('roles') as FormType['roles'];
  }
}

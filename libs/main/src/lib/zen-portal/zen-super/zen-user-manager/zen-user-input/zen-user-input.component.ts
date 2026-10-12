import { CommonModule } from '@angular/common';
import { Component, HostListener, Inject, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import {
  ZenEmailInputComponent,
  ZenRegisterFormComponent,
  ZenRolesInputComponent,
  ZenUsernameInputComponent,
} from '@zen/auth';
import { trimObjectStrings } from '@zen/common';
import { ZenLoadingComponent, ZenSnackbarError, ZenSnackbarModule } from '@zen/components';
import { UpdateOneUserGQL, UserFields, UserUpdateInput } from '@zen/graphql';
import { Apollo } from 'apollo-angular';

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
    MatButtonModule,
    MatDialogModule,
    MatSnackBarModule,
    ReactiveFormsModule,
    ZenEmailInputComponent,
    ZenLoadingComponent,
    ZenRegisterFormComponent,
    ZenRolesInputComponent,
    ZenSnackbarModule,
    ZenUsernameInputComponent,
  ],
})
export class ZenUserInputComponent {
  loading = false;
  form = new FormGroup<FormType>({
    username: new FormControl(),
    email: new FormControl(),
    roles: new FormControl(),
  });

  @HostListener('keydown.escape')
  handleKeyDown() {
    this.dialogRef.close();
  }

  data: DialogData = inject(MAT_DIALOG_DATA);
  dialogRef = inject(MatDialogRef<ZenUserInputComponent>);
  private apollo = inject(Apollo);
  private snackBar = inject(MatSnackBar);
  private snackBarError = inject(ZenSnackbarError);
  private updateOneUserGQL = inject(UpdateOneUserGQL);

  constructor() {
    if (this.data.action === 'edit') {
      this.username.setValue(this.data.item.username);
      this.email.setValue(this.data.item.email);
      this.roles.setValue(this.data.item.roles);
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
            variables: {
              where: { id: this.data.item.id },
              data: updateInput,
            },
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

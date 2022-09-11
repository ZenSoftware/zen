import { Component, HostListener, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { emailValidator, usernameValidator } from '@zen/auth';
import { trimObjectStrings } from '@zen/common';
import { ZenSnackbarErrorService } from '@zen/components';
import { UpdateOneUserGQL, UserFields, UserUpdateInput } from '@zen/graphql';
import { Apollo } from 'apollo-angular';

export interface DialogData {
  action: 'create' | 'update';
  item?: UserFields;
}

interface FormType {
  username: FormControl<UserFields['username']>;
  email: FormControl<UserFields['email']>;
}

@Component({
  selector: 'zen-user-input',
  templateUrl: 'zen-user-input.component.html',
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
    private snackBarError: ZenSnackbarErrorService,
    private updateOneUserGQL: UpdateOneUserGQL
  ) {
    if (data.action === 'update') {
      this.username.setValue(data.item?.username);
      this.email.setValue(data.item?.email as string);
    }
  }

  onSubmit() {
    if (!this.loading) {
      this.loading = true;

      if (this.data.action === 'update') {
        const updateInput: UserUpdateInput = {
          username: this.username.value,
          email: this.email.value,
        };

        trimObjectStrings(updateInput);

        this.updateOneUserGQL
          .mutate({
            where: { id: this.data.item?.id },
            data: updateInput,
          })
          .subscribe({
            next: () => {
              this.loading = false;
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
}

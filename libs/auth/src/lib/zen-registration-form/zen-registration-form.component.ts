import { Component, EventEmitter, Output } from '@angular/core';
import { AuthService } from '@zen/auth';
import { AuthRegister, AuthRegisterGQL, AuthRegisterInput } from '@zen/graphql';

@Component({
  selector: 'zen-registration-form',
  templateUrl: 'zen-registration-form.component.html',
})
export class ZenRegistrationFormComponent {
  @Output()
  registerd = new EventEmitter();

  constructor(private auth: AuthService, private authRegisterGQL: AuthRegisterGQL) {}

  register(input: AuthRegisterInput) {
    this.authRegisterGQL
      .mutate({
        data: input,
      })
      .subscribe(({ data }) => {
        this.auth.setSession((<AuthRegister>data).authRegister);
        this.registerd.emit();
      });
  }
}

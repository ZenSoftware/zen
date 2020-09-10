import { Injectable } from '@angular/core';
import { AuthLoginGQL, AuthLoginInput } from '@zen/graphql';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private authLoginGQL: AuthLoginGQL) {}

  login(input: AuthLoginInput) {
    this.authLoginGQL
      .fetch({ data: input })
      .subscribe(({ data: { authLogin } }) => console.log(authLogin));
  }
}

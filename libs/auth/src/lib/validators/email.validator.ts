import { ValidatorFn } from '@angular/forms';

const emailRegex = /\S+@\S+\.\S+/;
const isEmail = (email: string) => emailRegex.test(String(email).toLowerCase());

export function emailValidator(): ValidatorFn {
  return control => {
    if (control.value) {
      const notEmail = !isEmail(control.value);
      return notEmail ? { email: control.value } : null;
    }
    return null;
  };
}

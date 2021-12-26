import { ValidatorFn } from '@angular/forms';

const isEmail = (email: string) => {
  const re = /\S+@\S+\.\S+/;
  return re.test(String(email).toLowerCase());
};

export function emailValidator(): ValidatorFn {
  return control => {
    const notEmail = !isEmail(control.value);
    return notEmail ? { email: control.value } : null;
  };
}

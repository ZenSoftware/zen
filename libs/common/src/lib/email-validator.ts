import { ValidatorFn } from '@angular/forms';

const isEmail = (email: string) => {
  // Taken from https://emailregex.com/
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
};

export function emailValidator(): ValidatorFn {
  return control => {
    const notEmail = !isEmail(control.value);
    return notEmail && control.value ? { email: { value: control.value } } : null;
  };
}

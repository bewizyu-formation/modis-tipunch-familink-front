import { FormGroup } from '@angular/forms';

export const PASSWORD_VALIDATOR = '^(?=.*\\d)(?=.*[a-z])(?=.*[A-Z])(\\S).{5,}$';

export const passwordMatchValidator = (g: FormGroup) => {
  return g.get('password').value === g.get('passwordConfirm').value ? null : {'mismatch': true};
};

import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function booleanValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;
    return (value === true || value === false) ? null : { invalidBoolean: true };
  };
}

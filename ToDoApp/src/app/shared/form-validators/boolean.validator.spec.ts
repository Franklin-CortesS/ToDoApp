import { FormControl } from '@angular/forms';
import { booleanValidator } from './boolean.validator';

describe('booleanValidator', () => {
  const validatorFn = booleanValidator();

  it('should return null for true', () => {
    const control = new FormControl(true);
    expect(validatorFn(control)).toBeNull();
  });

  it('should return null for false', () => {
    const control = new FormControl(false);
    expect(validatorFn(control)).toBeNull();
  });

  it('should return error object for string "true"', () => {
    const control = new FormControl('true');
    expect(validatorFn(control)).toEqual({ invalidBoolean: true });
  });

  it('should return error object for null', () => {
    const control = new FormControl(null);
    expect(validatorFn(control)).toEqual({ invalidBoolean: true });
  });

  it('should return error object for undefined', () => {
    const control = new FormControl(undefined);
    expect(validatorFn(control)).toEqual({ invalidBoolean: true });
  });

  it('should return error object for number 0', () => {
    const control = new FormControl(0);
    expect(validatorFn(control)).toEqual({ invalidBoolean: true });
  });
});

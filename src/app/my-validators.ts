import { Validator, AbstractControl, ValidationErrors, AsyncValidatorFn } from "@angular/forms";
//import 'rxjs/add/observable/timer';
//import 'rxjs/add/operator/map';
//import 'rxjs/add/operator/do';

import {  map } from 'rxjs/operators';
import { pipe, timer } from 'rxjs';

export function notStringValidator(value: string): AsyncValidatorFn {
    return (c: AbstractControl) => {
        return timer(3000).pipe(map(t=> value == c.value ? { notstring: value } : null));
 }
}

export class MyValidators {
      public static notstring: (value: string) => AsyncValidatorFn = notStringValidator;
}

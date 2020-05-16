import { FormGroup, FormControl, ValidatorFn, FormArray } from "@angular/forms";
import * as _ from "lodash";

export default {
  validateAllFormFields(formGroup: FormGroup, ignoredControls?: string[]) {
    Object.keys(formGroup.controls).forEach((field) => {
      const control = formGroup.get(field);
      if (_.indexOf(ignoredControls, field) === -1 || !ignoredControls) {
        if (control instanceof FormControl) {
          control.markAsTouched({
            onlySelf: true,
          });
        } else if (control instanceof FormArray) {
          control.controls.forEach((element) => {
            if (element instanceof FormGroup) {
              this.validateAllFormFields(element);
            }
          });
        } else if (control instanceof FormGroup) {
          this.validateAllFormFields(control);
        }
      } else if (_.indexOf(ignoredControls, field) !== -1) {
        if (control instanceof FormControl) {
          control.markAsUntouched({
            onlySelf: true,
          });
        }
      }
    });
  },

  mustMatch(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup): ValidatorFn => {
      const control = formGroup.controls[controlName];
      const matchingControl = formGroup.controls[matchingControlName];

      if (matchingControl.errors && !matchingControl.errors.mustMatch) {
        // return if another validator has already found an error on the matchingControl
        return;
      }

      // set error on matchingControl if validation fails
      if (control.value !== matchingControl.value) {
        matchingControl.setErrors({ mustMatch: true });
      } else {
        matchingControl.setErrors(null);
      }
    };
  },
};

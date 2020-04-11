import { FormGroup, FormControl } from "@angular/forms";
import * as _ from "lodash";

export default {
  validateAllFormFields(formGroup: FormGroup, ignoredControls?: string[]) {
    Object.keys(formGroup.controls).forEach(field => {
      const control = formGroup.get(field);
      if (_.indexOf(ignoredControls, field) === -1 || !ignoredControls) {
        if (control instanceof FormControl) {
          control.markAsTouched({
            onlySelf: true
          });
        } else if (control instanceof FormGroup) {
          this.validateAllFormFields(control);
        }
      } else if (_.indexOf(ignoredControls, field) !== -1) {
        if (control instanceof FormControl) {
          control.markAsUntouched({
            onlySelf: true
          });
        }
      }
    });
  }
};

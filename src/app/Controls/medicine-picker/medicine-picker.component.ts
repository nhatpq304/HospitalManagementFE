import { Component, OnInit, Input, OnChanges } from "@angular/core";
import { FormGroup, FormArray, FormControl, Validators } from "@angular/forms";
import formConfig from "./formConfig";
@Component({
  selector: "medicine-picker",
  templateUrl: "./medicine-picker.component.html",
  styleUrls: ["./medicine-picker.component.scss"],
})
export class MedicinePickerComponent implements OnInit {
  @Input() config;
  @Input() resource;
  @Input() parentForm: FormGroup;
  formConfig = formConfig;
  value;
  constructor() {}

  ngOnInit(): void {
    this.array.push(
      new FormGroup({
        medicineId: new FormControl("", []),
        medicineName: new FormControl("", []),
        amount: new FormControl("", []),
        remark: new FormControl("", []),
      })
    );
  }

  onAddClick() {
    this.array.enabled &&
      this.array.push(
        new FormGroup({
          medicineId: new FormControl("", []),
          medicineName: new FormControl("", []),
          amount: new FormControl("", []),
          remark: new FormControl("", []),
        })
      );
  }

  onSearchApply($event) {
    let form = this.getFormGroup($event.controlId);
    form.get("medicineName").updateValueAndValidity();
    form.get("medicineId").setValue($event.data.id);
  }

  onSearchRemove($event) {
    this.array.enabled && this.getFormGroup($event.controlId).reset();
  }

  onDeleteRow(index) {
    this.array.enabled && this.array.removeAt(index);
  }

  getFormGroup(index) {
    return this.array.controls[index];
  }
  get array() {
    return this.parentForm.get(this.config.controlName) as FormArray;
  }
}

import { Component, OnInit, Input, OnChanges } from "@angular/core";
import { FormGroup, FormArray, FormControl, Validators } from "@angular/forms";
import formConfig from "./formConfig";
@Component({
  selector: "medicine-picker",
  templateUrl: "./medicine-picker.component.html",
  styleUrls: ["./medicine-picker.component.scss"],
})
export class MedicinePickerComponent implements OnInit, OnChanges {
  @Input() value;
  @Input() config;
  @Input() resource;
  @Input() parentForm: FormGroup;
  formConfig = formConfig;

  constructor() {}
  ngOnChanges(changeObj) {
    if (changeObj?.value?.currentValue) {
      if (this.value.length) {
        for (let i = 0; i < this.value.length - 1; i++) {
          this.array.push(this.newFormGroup());
        }
      } else {
        this.array.push(this.newFormGroup());
      }
      this.array.patchValue(this.value);
    }
  }

  ngOnInit(): void {}

  onAddClick() {
    this.array.enabled && this.array.push(this.newFormGroup());
  }

  newFormGroup(): FormGroup {
    return new FormGroup({
      medicineId: new FormControl("", []),
      medicineName: new FormControl("", [Validators.required]),
      amount: new FormControl("", [Validators.required]),
      remark: new FormControl("", []),
    });
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

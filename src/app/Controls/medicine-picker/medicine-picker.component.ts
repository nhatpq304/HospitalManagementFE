import { Component, OnInit, Input, OnChanges } from "@angular/core";
import { FormGroup, FormArray, FormControl } from "@angular/forms";
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
  constructor() {}

  ngOnInit(): void {}

  onAddClick() {
    this.array.push(
      new FormGroup({
        medicineName: new FormControl("para", []),
        amount: new FormControl("1", []),
        remark: new FormControl("para", []),
      })
    );
  }

  getFormGroup(index) {
    return this.array.controls[index];
  }
  get array() {
    return this.parentForm.get(this.config.controlName) as FormArray;
  }
}

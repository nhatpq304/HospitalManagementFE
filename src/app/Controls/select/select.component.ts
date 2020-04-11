import { Component, OnInit, Input, OnChanges } from "@angular/core";
import { FormGroup } from "@angular/forms";
import * as _ from "lodash";

@Component({
  selector: "select-box",
  templateUrl: "./select.component.html",
  styleUrls: ["./select.component.scss"]
})
export class SelectComponent implements OnInit, OnChanges {
  @Input() config;
  @Input() parentForm: FormGroup;
  isSelected: boolean;
  constructor() {}

  ngOnChanges(changesObj) {
    if (changesObj?.config.currentValue) {
      this.config.options = this.selectDefaultOption(this.config.options);
    }
  }

  ngOnInit(): void {}

  private selectDefaultOption(options) {
    return _.map(options, option => {
      option.selected =
        option.value ===
        this.parentForm.controls[this.config.controlName].value + "";
      this.isSelected !== true && (this.isSelected = option.selected);
      return option;
    });
  }
}

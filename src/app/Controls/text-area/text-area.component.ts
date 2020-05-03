import { Component, OnInit, Input } from "@angular/core";
import { FormGroup } from "@angular/forms";

@Component({
  selector: "text-area",
  templateUrl: "./text-area.component.html",
  styleUrls: ["./text-area.component.scss"],
})
export class TextAreaComponent implements OnInit {
  @Input() config;
  @Input() resource;
  @Input() parentForm: FormGroup;
  constructor() {}

  ngOnInit(): void {}

  get property() {
    return this.parentForm.get(this.config.controlName);
  }
}

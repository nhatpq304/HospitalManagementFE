import { Component, OnInit, EventEmitter, Output, Input } from "@angular/core";
import { FormGroup } from "@angular/forms";

@Component({
  selector: "text-input",
  templateUrl: "./text-input.component.html",
  styleUrls: ["./text-input.component.scss"]
})
export class TextInputComponent implements OnInit {
  @Input() config;
  @Input() parentForm: FormGroup;
  constructor() {}

  ngOnInit(): void {}
}

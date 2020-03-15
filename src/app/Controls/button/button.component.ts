import { Component, OnInit, Input } from "@angular/core";

@Component({
  selector: "controls-button",
  templateUrl: "./button.component.html",
  styleUrls: ["./button.component.scss"]
})
export class ButtonComponent implements OnInit {
  constructor() {}
  @Input() text: String;
  ngOnInit(): void {}
}

import { Component, OnInit } from "@angular/core";

@Component({
  selector: "calendar-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.scss"],
})
export class CalendarDashboardComponent implements OnInit {
  resource;
  constructor() {}

  ngOnInit(): void {
    this.initResource();
  }

  initResource() {
    this.resource = {
      stateTitle: "Lịch",
    };
  }
}

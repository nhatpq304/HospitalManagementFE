import { Component, OnInit } from "@angular/core";

@Component({
  selector: "medicines-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.scss"],
})
export class MedicinesDashboardComponent implements OnInit {
  resource;
  constructor() {}

  ngOnInit(): void {
    this.initResource();
    // this.initGridConfig();
    // this.loadData();
  }

  private initResource() {
    this.resource = {
      stateTitle: "Quản lý thuốc",
    };
  }
}

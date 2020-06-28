import { Component, OnInit } from "@angular/core";
import { BaseComponent } from "src/app/commonClass/baseComponent";
import { AuthService } from "src/app/Services/Auth/auth.service";
import { Router } from "@angular/router";

@Component({
  selector: "calendar-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.scss"],
})
export class CalendarDashboardComponent extends BaseComponent {
  resource;
  constructor(public router: Router, public authService: AuthService) {
    super(
      { router: router, authService: authService },
      { name: "APPOINTMENT" }
    );
  }

  async afterOnInit(permissions) {
    this.initResource();
  }

  initResource() {
    this.resource = {
      stateTitle: "Lịch",
    };
  }
}

import { Component, OnInit } from "@angular/core";
import { AuthService } from "./Services/Auth/auth.service";
import { Router } from "@angular/router";
import { LocalStorageService } from "./Services/LocalStorage/local-storage.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent implements OnInit {
  title = "hospitalfe";
  constructor(
    public router: Router,
    public authService: AuthService,
    public localStorage: LocalStorageService
  ) {}

  ngOnInit() {
    this.checkIfLogged();
  }

  getBackground() {
    return this.router.url === "/" ? "login__background" : "";
  }

  private checkIfLogged() {
    if (this.localStorage.getItem("token")) {
      this.router.navigate(["default"]);
    } else {
      this.router.navigate([""]);
    }
  }
}

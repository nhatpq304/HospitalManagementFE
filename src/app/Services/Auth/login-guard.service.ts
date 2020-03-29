import { Injectable } from "@angular/core";
import { CanActivate, Router } from "@angular/router";
import { LocalStorageService } from "../LocalStorage/local-storage.service";

@Injectable({
  providedIn: "root"
})
export class LoginGuardService implements CanActivate {
  constructor(
    public router: Router,
    public localStorageService: LocalStorageService
  ) {}

  canActivate() {
    if (this.localStorageService.getItem("token")) {
      this.router.navigate(["default"]);
      return false;
    } else return true;
  }
}

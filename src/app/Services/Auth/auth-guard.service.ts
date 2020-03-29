import { Injectable } from "@angular/core";
import { CanActivate, Router } from "@angular/router";
import { AuthService } from "./auth.service";
import { LocalStorageService } from "../LocalStorage/local-storage.service";

@Injectable({
  providedIn: "root"
})
export class AuthGuardService implements CanActivate {
  constructor(
    public router: Router,
    public localStorageService: LocalStorageService,
    public authService: AuthService
  ) {}

  canActivate() {
    return this.authService
      .getLoggedUser()
      .then(() => {
        return true;
      })
      .catch(error => {
        this.localStorageService.removeItem("token");
        this.router.navigate(["login"]);
        return false;
      });
  }
}

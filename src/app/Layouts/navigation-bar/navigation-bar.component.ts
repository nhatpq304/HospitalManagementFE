import { Component, OnInit } from "@angular/core";
import { FormControl, Validators } from "@angular/forms";
import { AuthService } from "src/app/Services/Auth/auth.service";
import { AuthModel } from "src/app/Models/Auth/auth.model";
@Component({
  selector: "layouts-navigation-bar",
  templateUrl: "./navigation-bar.component.html",
  styleUrls: ["./navigation-bar.component.scss"]
})
export class NavigationBarComponent implements OnInit {
  resource;

  email = new FormControl("", [Validators.required, Validators.email]);
  password = new FormControl("", [
    Validators.required,
    Validators.minLength(6)
  ]);

  constructor(public authService: AuthService) {}

  ngOnInit(): void {
    this.initResource();
  }

  onLoginClick($event) {
    let authData = new AuthModel();
    authData.email = this.email.value;
    authData.password = this.password.value;

    this.authService.userLogin(authData);
  }

  private initResource() {
    this.resource = {
      loginModalId: "loginModal",
      modalTitle: "Đăng nhập",
      modalEmail: "Email",
      modalPassword: "Mật khẩu"
    };
  }
}

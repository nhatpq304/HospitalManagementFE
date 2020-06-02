import { Component, OnInit } from "@angular/core";
import { FormControl, Validators, FormGroup } from "@angular/forms";
import { AuthModel } from "../Models/Auth/auth.model";
import { AuthService } from "../Services/Auth/auth.service";
import { Router } from "@angular/router";
import { LocalStorageService } from "../Services/LocalStorage/local-storage.service";
import formUtil from "../../util/form.util";
@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
})
export class LoginComponent implements OnInit {
  loginForm = new FormGroup({
    email: new FormControl("", [Validators.required, Validators.email]),
    password: new FormControl("", [
      Validators.required,
      Validators.minLength(6),
    ]),
  });
  resource;
  isLogPromisePending: boolean;
  isLoggingFailed: boolean;
  constructor(
    public router: Router,
    public authService: AuthService,
    public localStorageService: LocalStorageService
  ) {}

  ngOnInit(): void {
    this.initResource();
  }

  async onLoginClick() {
    this.isLoggingFailed = false;
    formUtil.validateAllFormFields(this.loginForm);

    if (this.loginForm.valid) {
      let authData = new AuthModel();
      authData.email = this.loginForm.controls.email.value;
      authData.password = this.loginForm.controls.password.value;
      this.isLogPromisePending = true;

      try {
        let data = await this.authService.loginUser(authData);
        this.localStorageService.setItem("token", data.token);

        return this.onLoginSuccess();
      } catch (error) {
        this.isLoggingFailed = true;
      }
      this.isLogPromisePending = false;
    }
  }

  get email() {
    return this.loginForm.get("email");
  }

  get password() {
    return this.loginForm.get("password");
  }

  private onLoginSuccess() {
    return this.router.navigate(["default"]);
  }

  private initResource() {
    this.resource = {
      title: "Đăng nhập",
      email: "Email",
      loginFail: "Đăng nhập thất bại",
      password: "Mật khẩu",
      invalidEmail: "Email không đúng định dạng.",
      requiredEmail: "Vui lòng điền email.",
      minLengthPassword: "Mật khẩu có độ dài tối thiểu 6 ký tự.",
      requiredPassword: "Vui lòng điền mật khẩu.",
    };
  }
}

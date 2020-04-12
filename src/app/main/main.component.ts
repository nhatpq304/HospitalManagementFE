import { Component, OnInit } from "@angular/core";
import { AuthService } from "../Services/Auth/auth.service";
import { LocalStorageService } from "../Services/LocalStorage/local-storage.service";
import UserModel from "../Models/user.model";

@Component({
  selector: "app-main",
  templateUrl: "./main.component.html",
  styleUrls: ["./main.component.scss"],
})
export class MainComponent implements OnInit {
  user = new UserModel();

  constructor(
    public authService: AuthService,
    public localStorage: LocalStorageService
  ) {}

  ngOnInit(): void {
    this.getLoggedUser();
  }

  getLoggedUser() {
    this.authService.getLoggedUser().then((response) => {
      let responseData = response.user;

      this.user.email = responseData.email;
      this.user.name = responseData.name;
      this.user.birthday = responseData.birthday;
      this.user.address = responseData.address;
      this.user.phone = responseData.phone;

      this.localStorage.setItem("user", responseData);
    });
  }
}

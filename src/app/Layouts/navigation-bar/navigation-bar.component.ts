import { Component, OnInit, Input } from "@angular/core";
import { LocalStorageService } from "src/app/Services/LocalStorage/local-storage.service";
import { Router } from "@angular/router";
@Component({
  selector: "layouts-navigation-bar",
  templateUrl: "./navigation-bar.component.html",
  styleUrls: ["./navigation-bar.component.scss"]
})
export class NavigationBarComponent implements OnInit {
  @Input() username: string;

  resource;
  constructor(
    public router: Router,
    public localStorage: LocalStorageService
  ) {}

  ngOnInit(): void {
    this.initResource();
  }

  onLogOutClick() {
    this.localStorage.removeItem("token");
    this.localStorage.removeItem("user");

    return this.router.navigate(["/"]);
  }

  private initResource() {
    this.resource = {
      accountMenu: "Xin chào",
      logOut: "Đăng xuất"
    };
  }
}

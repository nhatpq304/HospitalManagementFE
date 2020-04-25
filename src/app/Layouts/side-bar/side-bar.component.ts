import { Component, OnInit } from "@angular/core";

@Component({
  selector: "layouts-side-bar",
  templateUrl: "./side-bar.component.html",
  styleUrls: ["./side-bar.component.scss"],
})
export class SideBarComponent implements OnInit {
  resource;
  defaultLink = "/default";
  constructor() {}

  ngOnInit(): void {
    this.initResource();
  }

  private initResource() {
    this.resource = {
      menu: [
        {
          title: "Người",
          iconCss: "fas fa-user",
          routerLink: `${this.defaultLink}/users`,
        },
        {
          title: "Kết quả khám",
          iconCss: "fas fa-file-medical-alt",
          routerLink: `${this.defaultLink}/examinations`,
        },
      ],
    };
  }
}

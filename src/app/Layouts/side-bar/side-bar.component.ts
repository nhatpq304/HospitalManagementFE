import { Component, OnInit, Input, OnChanges } from "@angular/core";
import * as _ from "lodash";

@Component({
  selector: "layouts-side-bar",
  templateUrl: "./side-bar.component.html",
  styleUrls: ["./side-bar.component.scss"],
})
export class SideBarComponent implements OnChanges {
  resource;
  defaultLink = "/default";
  @Input() permissions: DynamicObject[];

  constructor() {}

  ngOnChanges(changeObj) {
    if (changeObj?.permissions?.currentValue) {
      this.initResource(this.permissions);
    }
  }

  private checkPermissionRequired(permissionType, permissions): boolean {
    return (
      _.some(permissions, { type: "ADMIN" }) ||
      _.some(permissions, { type: permissionType })
    );
  }

  private initResource(permissions) {
    this.resource = {
      menu: [
        {
          title: "Người",
          iconCss: "fas fa-user",
          routerLink: `${this.defaultLink}/users`,
          active: this.checkPermissionRequired("USER", permissions),
        },
        {
          title: "Kết quả khám",
          iconCss: "fas fa-file-medical-alt",
          routerLink: `${this.defaultLink}/examinations`,
          active: this.checkPermissionRequired("RESULT", permissions),
        },
        {
          title: "Lịch hẹn",
          iconCss: "fas fa-calendar",
          routerLink: `${this.defaultLink}/calendar`,
          active: this.checkPermissionRequired("APPOINTMENT", permissions),
        },
        {
          title: "Thuốc",
          iconCss: "fas fa-pills",
          routerLink: `${this.defaultLink}/medicines`,
          active: this.checkPermissionRequired("MEDICINE", permissions),
        },
      ],
    };
  }
}

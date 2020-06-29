import { OnInit } from "@angular/core";
import * as _ from "lodash";

export class BaseComponent implements OnInit {
  permissionType;
  permissions;
  constructor(public services, public module) {}

  async ngOnInit() {
    const permissions = await this.beforeOnInit();

    await this.afterOnInit(permissions);
  }

  async beforeOnInit() {
    try {
      const {
        permissions,
      } = await this.services.authService.getLoggedUserPermissions();
      const permissionType = this.getModulePermission(this.module.name);
      const permissionNames = this.checkPermission(permissions, permissionType);

      this.permissions = permissionNames;
      if (permissionNames?.length) {
        return permissionNames;
      } else {
        return this.services.router.navigate(["default"]);
      }
    } catch {
      this.services.router.navigate(["default"]);
    }
  }

  async afterOnInit(permissions) {}

  checkPermission(permissions, permissionType): DynamicObject[] {
    return _.filter(permissions, (permission) => {
      return permission.type === permissionType || permission.type === "ADMIN";
    });
  }

  getModulePermission(name) {
    const module = [
      {
        name: "USER",
        permission: "USER",
      },
      { name: "EXAMINATION", permission: "RESULT" },
      { name: "APPOINTMENT", permission: "APPOINTMENT" },
      { name: "MEDICINES", permission: "MEDICINE" },
    ];

    return _.find(module, { name: name })?.permission;
  }

  checkPermissionRequired(permissionName): boolean {
    return (
      this.checkAdminPermission() ||
      _.some(this.permissions, { name: permissionName })
    );
  }

  checkAdminPermission(): boolean {
    return _.some(this.permissions, { name: "ADMIN" });
  }
}

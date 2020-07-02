import { Component, OnInit } from "@angular/core";
import MedicineModel from "src/app/Models/medicine.model";
import { MedicinesService } from "src/app/Services/Medicines/medicines.service";
import { BaseComponent } from "src/app/commonClass/baseComponent";
import { Router } from "@angular/router";
import { AuthService } from "src/app/Services/Auth/auth.service";
import ToastService from "src/app/Services/Common/toast.service";

@Component({
  selector: "medicines-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.scss"],
})
export class MedicinesDashboardComponent extends BaseComponent {
  resource;
  datatableData: MedicineModel[];
  datatableConfig;
  writePermission;
  constructor(
    public router: Router,
    public authService: AuthService,
    public toastService: ToastService,
    public medicinesService: MedicinesService
  ) {
    super({ router: router, authService: authService }, { name: "MEDICINES" });
  }

  async afterOnInit(permission) {
    this.getPermissions();
    this.initResource();
    this.initGridConfig();
    this.loadData();
  }

  async onUploadComplete(event) {
    const value = event.value;

    if (value) {
      await this.toastService.show({
        text: this.resource.saveSuccess,
        type: "success",
      });

      this.reloadComponent();
    } else {
      this.toastService.show({
        text: this.resource.saveFail,
        type: "error",
      });
    }
  }

  reloadComponent() {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = "reload";
    this.router.navigate(["/default/medicines"]);
  }

  private async loadData() {
    this.datatableData = await this.medicinesService.getMedicines();
  }

  private initGridConfig() {
    this.datatableConfig = {
      id: "medicines",
      columns: [
        { data: "name", title: "Tên thuốc", type: "string" },
        { data: "unit", title: "Đơn vị", type: "string" },
        { data: "remark", title: "Ghi chú", type: "string" },
      ],
    };
  }

  private initResource() {
    this.resource = {
      stateTitle: "Quản lý thuốc",
      saveFail: "Lưu thất bại",
      saveSuccess: "Lưu thành công",
    };
  }

  private getPermissions() {
    this.writePermission = this.checkPermissionRequired("WRITE");
  }
}

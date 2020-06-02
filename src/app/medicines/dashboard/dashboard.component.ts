import { Component, OnInit } from "@angular/core";
import MedicineModel from "src/app/Models/medicine.model";
import { MedicinesService } from "src/app/Services/Medicines/medicines.service";

@Component({
  selector: "medicines-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.scss"],
})
export class MedicinesDashboardComponent implements OnInit {
  resource;
  datatableData: MedicineModel[];
  datatableConfig;
  
  constructor(public medicinesService: MedicinesService) {}

  ngOnInit(): void {
    this.initResource();
    this.initGridConfig();
    this.loadData();
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
    };
  }
}

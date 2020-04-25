import { Component, OnInit } from "@angular/core";

@Component({
  selector: "examinations-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.scss"],
})
export class ExaminationDashboardComponent implements OnInit {
  resource;
  datatableConfig;
  constructor() {}

  ngOnInit(): void {
    this.initResource();
    this.initGridConfig();
    this.loadData();
  }

  private initResource() {
    this.resource = {
      stateTitle: "Quản lý kết quả khám",
      addButton: {
        title: "Thêm kết quả khám",
        routerLink: "../examinations/add",
      },
      editRouterLink: "default/examinations/{id}/edit",
    };
  }

  private loadData() {}

  private initGridConfig() {
    this.datatableConfig = {
      id: "resultDatatableId",
      columns: [
        // { data: "email", title: "Email", type: "string" },
        // { data: "name", title: "Tên", type: "string" },
        // { data: "address", title: "Địa chỉ", type: "string" },
        // { data: "birthday", title: "Ngày sinh", type: "Date" },
        // { data: "id_card_number", title: "CMND", type: "string" },
        // { data: "medical_card_number", title: "Số BHYT", type: "string" },
        // {
        //   data: "id",
        //   title: "Sửa",
        // },
      ],
      drawCallback: () => {},
    };
  }
}

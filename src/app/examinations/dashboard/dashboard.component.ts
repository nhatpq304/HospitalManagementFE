import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { ExaminationsService } from "src/app/Services/Examinations/examinations.service";
import * as moment from "moment";

@Component({
  selector: "examinations-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.scss"],
})
export class ExaminationDashboardComponent implements OnInit {
  resource;
  datatableConfig;
  datatableData;
  constructor(
    public router: Router,
    public examinationService: ExaminationsService
  ) {}

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

  private loadData() {
    this.examinationService.getAllExaminations().subscribe(
      (response) => {
        this.datatableData = response;
      },
      (error) => {},
      () => {}
    );
  }

  private initGridConfig() {
    this.datatableConfig = {
      id: "resultDatatableId",
      order: [[4, "desc"]],
      columnDefs: [
        {
          targets: 4,
          render: function (data) {
            return moment(data).format("DD/MM/YYYY");
          },
        },
      ],
      columns: [
        { data: "patientName", title: "Tên bệnh nhân", type: "string" },
        { data: "idCardNumber", title: "CMND", type: "string" },
        { data: "medicalCardNumber", title: "Số BHYT", type: "string" },
        { data: "doctorName", title: "Tên bác sĩ", type: "string" },
        { data: "createdDate", title: "Ngày tạo", type: "date" },

        {
          data: "id",
          title: "Sửa",
          render: (id) => {
            return `
            <div class="d-flex justify-content-center">
            <button type="button" class="btn btn-link" id="editButton" data-id= "${id}">
            <i class="fas fa-edit text-primary"></i>
            </button>
            </div>`;
          },
        },
      ],
      drawCallback: () => {
        $(".btn-link").on("click", ($event) => {
          let id = $event.currentTarget.dataset.id;
          let routerLink = this.resource.editRouterLink.replace("{id}", id);
          this.router.navigateByUrl(routerLink);
        });
      },
    };
  }
}

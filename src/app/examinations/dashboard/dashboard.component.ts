import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { ExaminationsService } from "src/app/Services/Examinations/examinations.service";
import * as moment from "moment";
import { BaseComponent } from "src/app/commonClass/baseComponent";
import { AuthService } from "src/app/Services/Auth/auth.service";
import { LocalStorageService } from "src/app/Services/LocalStorage/local-storage.service";
import * as _ from "lodash";
@Component({
  selector: "examinations-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.scss"],
})
export class ExaminationDashboardComponent extends BaseComponent {
  resource;
  datatableConfig;
  datatableData;
  updateResultPermission;
  adminPermission;
  userId;

  constructor(
    public router: Router,
    public authService: AuthService,
    public localStorage: LocalStorageService,
    public examinationService: ExaminationsService
  ) {
    super(
      { router: router, authService: authService },
      { name: "EXAMINATION" }
    );
    this.userId = JSON.parse(this.localStorage.getItem("user"))?.id;
  }

  async afterOnInit(permissions) {
    this.getPermissions();
    this.initResource();
    this.initGridConfig();
    this.loadData();
  }

  onAddClick(isDisabled: boolean) {
    if (isDisabled) {
      return;
    }

    this.router.navigate([this.resource.addButton.routerLink]);
  }

  private getPermissions() {
    this.updateResultPermission = this.checkPermissionRequired("WRITE");
    this.adminPermission = this.checkAdminPermission();
  }

  private initResource() {
    this.resource = {
      stateTitle: "Quản lý kết quả khám",
      addButton: {
        title: "Thêm kết quả khám",
        routerLink: "default/examinations/add",
        disabled: !this.updateResultPermission,
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
    let self = this;
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
            let updatePermission =
              self.adminPermission ||
              (self.updateResultPermission &&
                self.userId ===
                  _.find(self.datatableData, { id: id })?.doctorId);

            return `
            <div class="d-flex justify-content-center">
            <button type="button" class="btn btn-link" id="editButton" data-id= "${id}">
            <i class="fas fa-edit ${
              !updatePermission ? "text-light" : "text-primary"
            }"></i>
            </button>
            </div>`;
          },
        },
      ],
      drawCallback: () => {
        $(".btn-link").on("click", ($event) => {
          let id = $event.currentTarget.dataset.id;
          let updatePermission =
            self.adminPermission ||
            (self.updateResultPermission &&
              self.userId ===
                _.find(self.datatableData, { id: +id })?.doctorId);
          if (!updatePermission) {
            return;
          }

          let routerLink = this.resource.editRouterLink.replace("{id}", id);
          this.router.navigateByUrl(routerLink);
        });
      },
    };
  }
}

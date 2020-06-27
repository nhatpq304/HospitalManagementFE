import { Component, OnInit } from "@angular/core";
import UsersService from "src/app/Services/Users/users.service";
import { Router } from "@angular/router";
import { BaseComponent } from "src/app/commonClass/baseComponent";
import { AuthService } from "src/app/Services/Auth/auth.service";

@Component({
  selector: "user-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.scss"],
})
export class UserDashboardComponent extends BaseComponent {
  datatableConfig;
  datatableData;
  resource;
  updateUserPermission;
  constructor(
    public usersService: UsersService,
    public router: Router,
    public authService: AuthService
  ) {
    super({ router: router, authService: authService }, { name: "USER" });
  }

  async afterOnInit(permissions) {
    this.getPermissions();
    this.initResource(permissions);
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
    this.updateUserPermission = this.checkPermissionRequired("WRITE");
  }

  private initResource(permissions) {
    this.resource = {
      stateTitle: "Quản lý người",
      addButton: {
        title: "Thêm người",
        routerLink: "default/users/add",
        disabled: !this.updateUserPermission,
      },
      editRouterLink: "default/users/{id}/edit",
    };
  }

  private loadData() {
    this.usersService.getAllUsers().subscribe(
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
      id: "userDatatableId",
      columns: [
        { data: "name", title: "Tên", type: "string" },
        { data: "email", title: "Email", type: "string" },
        { data: "address", title: "Địa chỉ", type: "string" },
        { data: "birthday", title: "Ngày sinh", type: "string" },
        { data: "idCard", title: "CMND", type: "string" },
        { data: "medicalCard", title: "Số BHYT", type: "string" },
        {
          data: "id",
          title: "Sửa",
          render: (id) => {
            return `
            <div class="d-flex justify-content-center">
            <button type="button" class="btn btn-link" id="editButton" data-id= "${id}">
            <i class="fas fa-edit  ${
              !this.updateUserPermission ? "text-light" : "text-primary"
            }"></i>
            </button>
            </div>`;
          },
        },
      ],
      drawCallback: () => {
        $(".btn-link").on("click", ($event) => {
          if (!self.updateUserPermission) {
            return;
          }
          let id = $event.currentTarget.dataset.id;
          let routerLink = this.resource.editRouterLink.replace("{id}", id);
          this.router.navigateByUrl(routerLink);
        });
      },
    };
  }
}

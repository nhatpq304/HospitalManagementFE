import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import formConfig from "./formConfig";
import formUtil from "src/util/form.util";
import UsersService from "src/app/Services/Users/users.service";
import { Location } from "@angular/common";
import ToastService from "src/app/Services/Common/toast.service";
import UserModel from "src/app/Models/user.model";

@Component({
  selector: "user-edit",
  templateUrl: "./edit.component.html",
  styleUrls: ["./edit.component.scss"],
})
export class UserEditComponent implements OnInit {
  resource;
  formConfig = formConfig;
  userForm: FormGroup;
  userId = this.route.snapshot.paramMap.get("id");
  state = this.userId ? "EDIT" : "ADD";
  originalData: UserModel;
  avatar: string;

  constructor(
    public router: Router,
    public route: ActivatedRoute,
    public location: Location,
    public toastService: ToastService,
    public usersService: UsersService
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.initResource();
    this.getUserData();
  }

  getUserData() {
    if (this.userId) {
      this.usersService.getUser(this.userId).then((data: UserModel) => {
        this.originalData = data;
        this.avatar = data.avatar?.path;

        this.userForm.patchValue({
          name: data.name,
          gender: data.gender,
          idCard: data.idCard,
          medicalCard: data.medicalCard,
          address: data.address,
          phone: data.phone,
          birthday: data.birthday,
          department: data.department,
          email: data.email,
        });
      });
    }
  }

  initForm() {
    this.userForm = new FormGroup(
      {
        name: new FormControl("", [Validators.required]),
        gender: new FormControl(0, [Validators.required]),
        idCard: new FormControl("", [
          Validators.required,
          Validators.pattern("^[0-9]*$"),
        ]),
        medicalCard: new FormControl("", [Validators.pattern("^[0-9]*$")]),
        address: new FormControl("", []),
        phone: new FormControl("", [Validators.pattern("^[0-9]*$")]),
        birthday: new FormControl("", []),
        department: new FormControl("", []),
        email: new FormControl("", [Validators.email]),
        password: new FormControl({ value: "", disabled: true }, [
          Validators.minLength(6),
        ]),
        confirmPassword: new FormControl({
          value: "",
          disabled: true,
        }),
        avatar: new FormControl(""),
      },
      formUtil.mustMatch("password", "confirmPassword")
    );
  }

  initResource() {
    this.resource = {
      stateTitle: this.state === "ADD" ? "Thêm người" : "Sửa thông tin người",
      cardTitle: "Thông tin cá nhân",
      loginInfoTitle: "Thông tin đăng nhập",
      saveButton: "Lưu",
      saveError: "Thông tin nhập không chính xác",
      saveSuccess: "Lưu người dùng thành công",
      saveFail: "Lưu người dùng không thành công",
      validationErrors: {
        email: "Email không đúng định dạng",
        required: "Không thể để trống ",
        pattern: "không đúng định dạng",
        mustMatch: "không chính xác",
      },
    };
  }

  onSubmitClick() {
    if (this.userForm.valid) {
      this.disableForm(true);

      let data = this.userForm.value;
      if (this.state === "ADD") {
        this.onSaveClick(data);
      } else {
        this.onUpdateClick(data);
      }
    } else {
      this.toastService.show({ text: this.resource.saveError, type: "error" });

      formUtil.validateAllFormFields(this.userForm);
    }
  }

  async onUpdateClick(data: any) {
    try {
      await this.updateUser(data, this.originalData);

      this.toastService.show({
        text: this.resource.saveSuccess,
        type: "success",
      });

      this.location.back();
    } catch {
      this.toastService.show({
        text: this.resource.saveFail,
        type: "error",
      });

      this.disableForm(false);
    }
  }

  async onSaveClick(data: any) {
    try {
      await this.saveUser(data);

      this.toastService.show({
        text: this.resource.saveSuccess,
        type: "success",
      });

      this.location.back();
    } catch {
      this.toastService.show({
        text: this.resource.saveFail,
        type: "error",
      });

      this.disableForm(false);
    }
  }

  onDataChange(param) {
    this.userForm.controls[param.controlName].setValue(param.data);
    this.handleEnablePassword(param);
  }

  onImageChanged($event) {
    $("#preview_image").attr("src", $event.data);
    this.userForm.get("avatar").setValue($event.data);
  }

  private saveUser(data: any) {
    return this.usersService.saveUser(data);
  }

  private updateUser(data: any, originalData: UserModel) {
    return this.usersService.updateUser(data, originalData);
  }

  private disableForm(value: boolean) {
    if (value) {
      return this.userForm.disable();
    }

    return this.userForm.enable();
  }

  private handleEnablePassword(param) {
    if (param.controlName === "department") {
      let isDisabled = param.data === "undefined";
      let password = this.userForm.get("password");
      let confirmPassword = this.userForm.get("confirmPassword");

      if (isDisabled) {
        password.disable();
        confirmPassword.disable();
      } else {
        password.enable();
        confirmPassword.enable();
      }
    }
  }
}

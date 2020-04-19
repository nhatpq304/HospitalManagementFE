import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import {
  FormGroup,
  FormControl,
  Validators,
  ValidatorFn,
} from "@angular/forms";
import formConfig from "./formConfig";
import formUtil from "src/util/form.util";
import UsersService from "src/app/Services/Users/users.service";
import { Location } from "@angular/common";
import ToastService from "src/app/Services/Common/toast.service";

@Component({
  selector: "user-edit",
  templateUrl: "./edit.component.html",
  styleUrls: ["./edit.component.scss"],
})
export class UserEditComponent implements OnInit {
  resource;
  formConfig = formConfig;
  state = this.router.url === "/default/users/add" ? "ADD" : "EDIT";
  userForm: FormGroup;

  constructor(
    public router: Router,
    public location: Location,
    public toastService: ToastService,
    public usersService: UsersService
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.initResource();
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
      stateTitle: this.state === "ADD" ? "Thêm người" : "Sửa thông tin",
      cardTitle: "Thông tin cá nhân",
      loginInfoTitle: "Thông tin đăng nhập",
      saveButton: "Lưu",
      saveError: "Thông tin nhập không chính xác",
      saveSuccess: "Lưu người dùng thành công",
      validationErrors: {
        email: "Email không đúng định dạng",
        required: "Không thể để trống ",
        pattern: "không đúng định dạng",
        mustMatch: "không chính xác",
      },
    };
  }

  async onSubmitClick() {
    if (this.userForm.valid) {
      this.disableForm(true);

      let data = this.userForm.value;
      try {
        await this.saveUser(data);

        this.toastService.show({
          text: this.resource.saveSuccess,
          type: "success",
        });

        this.location.back();
      } catch {
        this.disableForm(false);
      }
    } else {
      this.toastService.show({ text: this.resource.saveError, type: "error" });

      formUtil.validateAllFormFields(this.userForm);
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

  private saveUser(data) {
    return this.usersService.saveUser(data);
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

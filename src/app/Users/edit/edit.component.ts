import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import formConfig from "./formConfig";
import formUtil from "src/util/form.util";

@Component({
  selector: "user-edit",
  templateUrl: "./edit.component.html",
  styleUrls: ["./edit.component.scss"]
})
export class UserEditComponent implements OnInit {
  resource;
  formConfig = formConfig;
  hasLoginData: boolean;
  state = this.router.url === "/default/users/add" ? "ADD" : "EDIT";
  userForm: FormGroup;

  constructor(public router: Router) {}

  ngOnInit(): void {
    this.initForm();
    this.initResource();
  }

  initForm() {
    this.userForm = new FormGroup({
      name: new FormControl("", [Validators.required]),
      gender: new FormControl("", [Validators.required]),
      idCard: new FormControl("", [Validators.pattern("^[0-9]*$")]),
      medicalCard: new FormControl("", [Validators.pattern("^[0-9]*$")]),
      address: new FormControl("", []),
      phone: new FormControl("", [Validators.pattern("^[0-9]*$")]),
      birthday: new FormControl("", []),
      department: new FormControl("", []),
      email: new FormControl("", [Validators.email]),
      password: new FormControl("", [Validators.minLength(6)])
    });
  }

  initResource() {
    this.resource = {
      stateTitle: this.state === "ADD" ? "Thêm người" : "Sửa thông tin",
      cardTitle: "Thông tin cá nhân",
      loginInfoTitle: "Thông tin đăng nhập"
    };
  }

  onLoginAccordionClick() {
    // this runs before 'show' rendered
    this.hasLoginData = !$("#loginAccordionCollapse").hasClass("show");
  }

  onSubmitClick() {
    formUtil.validateAllFormFields(
      this.userForm,
      this.hasLoginData ? null : ["email", "password"]
    );
    if (this.userForm.valid) {
    }
  }

  onDataChange(param) {
    this.userForm.controls[param.controlName].setValue(param.data);
  }
}

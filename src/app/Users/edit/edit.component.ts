import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import formConfig from "./formConfig";
import * as moment from "moment";
@Component({
  selector: "user-edit",
  templateUrl: "./edit.component.html",
  styleUrls: ["./edit.component.scss"]
})
export class UserEditComponent implements OnInit {
  resource;
  formConfig = formConfig;
  state = this.router.url === "/default/users/add" ? "ADD" : "EDIT";

  userForm = new FormGroup({
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
  constructor(public router: Router) {}

  ngOnInit(): void {
    this.initResource();
  }

  initResource() {
    this.resource = {
      stateTitle: this.state === "ADD" ? "Thêm người" : "Sửa thông tin",
      cardTitle: "Thông tin cá nhân",
      loginInfoTitle: "Thông tin đăng nhập"
    };
  }

  onSubmitClick() {}

  onDataChange(param) {
    this.userForm.controls[param.controlName].setValue(param.data);
  }
}

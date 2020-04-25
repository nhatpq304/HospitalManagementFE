import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import ToastService from "src/app/Services/Common/toast.service";
import { Location } from "@angular/common";
import { FormControl, Validators, FormGroup } from "@angular/forms";
import formConfig from "./formConfig";
import MediaModel from 'src/app/Models/media.model';
@Component({
  selector: "examination-edit",
  templateUrl: "./edit.component.html",
  styleUrls: ["./edit.component.scss"],
})
export class ExaminationEditComponent implements OnInit {
  resource;
  examId = this.route.snapshot.paramMap.get("id");
  state = this.examId ? "EDIT" : "ADD";
  examForm: FormGroup;
  formConfig = formConfig;
  constructor(
    public router: Router,
    public route: ActivatedRoute,
    public location: Location,
    public toastService: ToastService
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.initResource();
  }

  initResource() {
    this.resource = {
      stateTitle:
        this.state === "ADD" ? "Thêm kết quả khám" : "Sửa kết quả khám",
      patientInfo: "Thông tin bệnh nhân",
      saveButton: "Lưu",
      saveError: "Thông tin nhập không chính xác",
      saveSuccess: "Lưu kết quả khám thành công",
      saveFail: "Lưu kết quả khám không thành công",
      validationErrors: {
        email: "Email không đúng định dạng",
        required: "Không thể để trống ",
        pattern: "không đúng định dạng",
        mustMatch: "không chính xác",
      },
    };
  }

  initForm() {
    this.examForm = new FormGroup({
      name: new FormControl({ value: "", disabled: true }, []),
      gender: new FormControl({ value: 1, disabled: true }, []),
      idCard: new FormControl({ value: "", disabled: true }, []),
      medicalCard: new FormControl({ value: "", disabled: true }, []),
      address: new FormControl({ value: "", disabled: true }, []),
      phone: new FormControl({ value: "", disabled: true }, []),
      birthday: new FormControl({ value: "", disabled: true }, []),
      department: new FormControl({ value: "", disabled: true }, []),
      email: new FormControl({ value: "", disabled: true }, []),
      avatar: new FormControl(""),
    });
  }

  onSubmitClick() {}

  onSearchApply($event) {
    this.examForm.patchValue($event.data);
  }

  get avatar(): MediaModel {
    return this.examForm.get("avatar").value;
  }
}

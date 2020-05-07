import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import ToastService from "src/app/Services/Common/toast.service";
import { Location } from "@angular/common";
import {
  FormControl,
  Validators,
  FormGroup,
  AbstractControl,
  FormArray,
} from "@angular/forms";
import formConfig from "./formConfig";
import MediaModel from "src/app/Models/media.model";
import * as _ from "lodash";
import UserModel from "src/app/Models/user.model";
import { AuthService } from "src/app/Services/Auth/auth.service";
import * as moment from "moment";
import formUtil from "src/util/form.util";

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
  patientData: UserModel;
  constructor(
    public router: Router,
    public route: ActivatedRoute,
    public location: Location,
    public toastService: ToastService,
    public authService: AuthService
  ) {}

  ngOnInit(): void {
    this.getAccountData();
    this.initForm();
    this.initResource();
  }

  getAccountData() {
    if (this.state === "ADD") {
      this.authService.getLoggedUser().then((data) => {
        this.examForm.get("doctorName").setValue(data.user.name);
        this.examForm.get("department").setValue(data.user.department);
        this.examForm.get("createDate").setValue(moment().format("DD/MM/YYYY"));
      });
    }
  }

  initResource() {
    this.resource = {
      stateTitle:
        this.state === "ADD" ? "Thêm kết quả khám" : "Sửa kết quả khám",
      patientInfo: "Thông tin bệnh nhân",
      examInfo: "Thông tin chung",
      generalHealthInfo: "Tình trạng sức khỏe",
      examResult: "Chẩn đoán",
      medicine: "Đơn thuốc",
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
      gender: new FormControl({ value: "", disabled: true }, []),
      idCard: new FormControl({ value: "", disabled: true }, []),
      medicalCard: new FormControl({ value: "", disabled: true }, []),
      address: new FormControl({ value: "", disabled: true }, []),
      phone: new FormControl({ value: "", disabled: true }, []),
      birthday: new FormControl({ value: "", disabled: true }, []),
      email: new FormControl({ value: "", disabled: true }, []),
      avatar: new FormControl(""),
      search: new FormControl("", [
        Validators.required,
        this.hasDataValidator.bind(this),
      ]),

      doctorName: new FormControl("", [Validators.required]),
      department: new FormControl("", [Validators.required]),
      createDate: new FormControl("", [Validators.required]),

      bloodPresure: new FormControl("", []),
      height: new FormControl("", []),
      weight: new FormControl("", []),
      bodyTemp: new FormControl("", []),
      examResult: new FormControl("", []),

      medicine: new FormArray([]),
    });
  }

  onSubmitClick() {}

  onSearchApply($event) {
    this.patientData = $event.data;
    this.examForm.get("search").updateValueAndValidity();
    _.forOwn(this.patientData, (value, key) => {
      this.examForm.get(key)?.setValue(value);
    });
  }

  onSearchRemove() {
    this.patientData = null;
    this.examForm.reset();
    this.examForm.get("gender").setValue("");
  }

  onSubmit() {
    if (this.examForm.valid) {
      this.disableForm(true);
      let data = this.examForm.value;
      console.log(data);

      if (this.state === "ADD") {
        // this.onSaveClick(data);
      } else {
        // this.onUpdateClick(data);
      }
    } else {
      this.toastService.show({
        text: this.resource.saveError,
        type: "error",
      });

      formUtil.validateAllFormFields(this.examForm);
    }
  }

  get avatar(): MediaModel {
    return this.examForm.get("avatar").value;
  }

  get value() {
    let a = this.examForm.get("medicine").value;
    console.log(a);
    return a;
  }

  private disableForm(value: boolean) {
    if (value) {
      return this.examForm.disable();
    }

    return this.examForm.enable();
  }

  private hasDataValidator(
    control: AbstractControl
  ): { [key: string]: any } | null {
    return !!this.patientData ? null : { requireData: { valid: true } };
  }
}

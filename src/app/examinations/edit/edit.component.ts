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
import { ExaminationsService } from "src/app/Services/Examinations/examinations.service";

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
  medicines = [];

  constructor(
    public router: Router,
    public route: ActivatedRoute,
    public location: Location,
    public toastService: ToastService,
    public authService: AuthService,
    public examinationsService: ExaminationsService
  ) {}

  ngOnInit(): void {
    this.getAccountData();
    this.initForm();
    this.initResource();
    this.loadData();
  }

  getAccountData() {
    if (this.state === "ADD") {
      this.authService.getLoggedUser().then((data) => {
        this.examForm.get("doctorName").setValue(data.user.name);
        this.examForm.get("doctorDept").setValue(data.user.department);
        this.examForm.get("createDate").setValue(moment().format("DD/MM/YYYY"));
      });
    }
  }

  loadData() {
    if (this.state === "EDIT") {
      this.examinationsService.getExamination(this.examId).then((data) => {
        this.medicines = data.medicine;
        this.examForm.patchValue(data);
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
      id: new FormControl({ value: "" }, []),

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
      patientId: new FormControl("", []),

      doctorName: new FormControl({ value: "", disabled: true }, [
        Validators.required,
      ]),
      doctorDept: new FormControl({ value: "", disabled: true }, [
        Validators.required,
      ]),
      createDate: new FormControl({ value: "", disabled: true }, [
        Validators.required,
      ]),

      bloodPressure: new FormControl("", []),
      height: new FormControl("", []),
      weight: new FormControl("", []),
      bodyTemp: new FormControl("", []),
      examResult: new FormControl("", []),
      reminders: new FormControl("", []),
      reexaminationDate: new FormControl("", []),
      dayCount: new FormControl({ value: 0, disabled: true }, []),

      medicine: new FormArray([]),
    });
  }

  onSearchApply($event) {
    this.examForm.get("patientId").setValue($event.data.id);
    this.examForm.get("search").setValue($event.data.name);
    this.examForm.get("search").updateValueAndValidity();
    _.forOwn($event.data, (value, key) => {
      this.examForm.get(key)?.setValue(value);
    });
  }

  onSearchRemove() {
    this.examForm.get("search").reset();
    this.examForm.get("patientId").reset();
    this.examForm.get("name").reset();
    this.examForm.get("gender").reset();
    this.examForm.get("idCard").reset();
    this.examForm.get("address").reset();
    this.examForm.get("medicalCard").reset();
    this.examForm.get("phone").reset();
    this.examForm.get("birthday").reset();
    this.examForm.get("email").reset();
    this.examForm.get("avatar").reset();
    this.examForm.get("gender").setValue("");
  }

  onSubmit() {
    if (this.examForm.disabled) {
      return;
    }
    formUtil.validateAllFormFields(this.examForm);

    if (this.examForm.valid) {
      this.disableForm(true);

      let data = this.examForm.value;

      if (this.state === "ADD") {
        this.onSaveClick(data);
      } else {
        this.onUpdateClick(data);
      }
    } else {
      this.toastService.show({
        text: this.resource.saveError,
        type: "error",
      });
    }
  }

  onDataChange(param) {
    this.examForm.controls[param.controlName].setValue(param.data);
    if (param.controlName === formConfig.reexaminationDate.controlName) {
      let diffDays = param.data.diff(moment().startOf("day"), "days");
      this.examForm.controls[formConfig.dayCount.controlName].setValue(
        diffDays > 0 ? diffDays : 0
      );
    }
  }

  async onSaveClick(data: any) {
    try {
      await this.saveExam(data);
      await this.toastService.show({
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

  async onUpdateClick(data: any) {
    try {
      await this.updateExam(data);
      await this.toastService.show({
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

  get avatar(): MediaModel {
    return this.examForm.get("avatar").value;
  }

  get patientName(): string {
    return this.examForm.get("search").value;
  }

  private saveExam(data: any) {
    return this.examinationsService.saveExamination(data);
  }

  private updateExam(data: any) {
    return this.examinationsService.updateExamination(data);
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
    return !!this.examForm?.get("patientId").value
      ? null
      : { requireData: { valid: true } };
  }
}

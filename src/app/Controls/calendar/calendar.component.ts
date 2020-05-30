import { Component, OnInit, ViewChild, AfterViewInit } from "@angular/core";
import dayGridPlugin from "@fullcalendar/daygrid";
import { FullCalendarComponent } from "@fullcalendar/angular";
import { EventInput } from "@fullcalendar/core";
import timeGrigPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import viLocale from "@fullcalendar/core/locales/vi";
import {
  FormGroup,
  FormControl,
  Validators,
  AbstractControl,
} from "@angular/forms";
import formConfig from "./formConfig";
import { AppointmentsService } from "src/app/Services/Appointments/appointments.service";
import * as moment from "moment";
import formUtil from "src/util/form.util";
import ToastService from "src/app/Services/Common/toast.service";
import * as _ from "lodash";

@Component({
  selector: "calendar",
  templateUrl: "./calendar.component.html",
  styleUrls: ["./calendar.component.scss"],
})
export class CalendarComponent implements OnInit, AfterViewInit {
  @ViewChild("calendar") calendarComponent: FullCalendarComponent;
  calendarPlugins = [dayGridPlugin, timeGrigPlugin, interactionPlugin];
  calendarEvents: EventInput[] = [];
  locales: [viLocale];
  appointmentForm: FormGroup;
  resource;
  formConfig = formConfig;

  constructor(
    public appointmentService: AppointmentsService,
    public toastService: ToastService
  ) {}

  ngOnInit(): void {
    this.initResource();
    this.initForm();
  }

  ngAfterViewInit() {
    this.loadData();
  }

  initForm() {
    this.appointmentForm = new FormGroup({
      id: new FormControl("", []),
      searchDoctor: new FormControl("", [
        this.hasDoctorDataValidator.bind(this),
      ]),
      doctorId: new FormControl("", []),
      date: new FormControl("", [Validators.required]),
      from: new FormControl("", [Validators.required]),
      to: new FormControl("", [Validators.required]),
      searchPatient: new FormControl("", [
        this.hasPatientDataValidator.bind(this),
      ]),
      patientId: new FormControl("", []),
      remark: new FormControl("", []),
    });
  }

  initResource() {
    this.resource = {
      modalTitle: "Tạo cuộc hẹn",
      modalCancel: "Hủy",
      modalApply: "Xác nhận",
      modalConfirmTitle: "Xác nhận",
      modalNo: "Không",
      modalYes: "Đồng ý",
      saveError: "Thông tin nhập không chính xác",
      saveSuccess: "Lưu cuộc hẹn thành công",
      modalConfirmContent: "Bạn có đồng ý xóa đối tượng không?",
      deleteSuccess: "Xóa cuộc hẹn thành công",
      deleteFail: "Xóa cuộc hẹn không thành công",
      saveFail: "Lưu cuộc hẹn không thành công",
      validationErrors: {
        email: "Email không đúng định dạng",
        required: "Không thể để trống ",
        pattern: "không đúng định dạng",
        mustMatch: "không chính xác",
      },
    };
  }

  async loadData() {
    let data = await this.appointmentService.getAppointments();
    this.addCalendarEvents(data);
  }

  addCalendarEvents(data: any[], isDeleted?: boolean) {
    this.calendarEvents = _.filter(this.calendarEvents, (event) => {
      return !(event.id === data[0]?.id);
    });

    if (isDeleted) {
      return;
    }

    this.calendarEvents = [...this.calendarEvents, ...data];
  }

  onSubmit() {
    if (this.appointmentForm.disabled) {
      return;
    }

    if (this.appointmentForm.valid) {
      this.disableForm(true);

      let data = this.appointmentForm.value;
      if (!this.appointmentForm.get("id")?.value) {
        this.onSaveClick(data);
      } else {
        this.onUpdateClick(data);
      }
    } else {
      this.toastService.show({ text: this.resource.saveError, type: "error" });

      formUtil.validateAllFormFields(this.appointmentForm);
    }
  }

  onDataChange(param) {
    this.appointmentForm.controls[param.controlName].setValue(param.data);
  }

  onSearchApply($event) {
    this.appointmentForm.get("patientId").setValue($event.data.id);
    this.appointmentForm.get("searchPatient").setValue($event.data.name);
    this.appointmentForm.get("searchPatient").updateValueAndValidity();
  }

  onSearchRemove() {
    this.appointmentForm.get("searchPatient").reset();
    this.appointmentForm.get("patientId").reset();
  }

  onSearchDoctorApply($event) {
    this.appointmentForm.get("doctorId").setValue($event.data.id);
    this.appointmentForm.get("searchDoctor").setValue($event.data.name);
    this.appointmentForm.get("searchDoctor").updateValueAndValidity();
  }

  onSearchDoctorRemove() {
    this.appointmentForm.get("searchDoctor").reset();
    this.appointmentForm.get("doctorId").reset();
  }

  handleDateClick(arg) {
    this.appointmentForm.reset();
    this.appointmentForm
      .get("date")
      .setValue(moment(arg.date).format("DD/MM/YYYY"));
    this.appointmentForm.get("from").setValue(moment().format("HH:mm"));
    this.appointmentForm
      .get("to")
      .setValue(moment().add(30, "minute").format("HH:mm"));
    this.toggleModal();
  }

  handleEventClick(arg) {
    this.appointmentForm.reset();
    this.appointmentForm.patchValue(arg.event.extendedProps);
    this.toggleModal();
  }

  onDelete() {
    ($(`#confirmModalId`) as any).modal("toggle");
  }

  async onRemoveConfirm() {
    ($(`#confirmModalId`) as any).modal("toggle");

    this.disableForm(true);

    let data = { id: this.id, active: false };
    try {
      let appointments = await this.deleteAppointment(data);
      await this.toastService.show({
        text: this.resource.deleteSuccess,
        type: "success",
      });
      this.addCalendarEvents(appointments, true);
      this.toggleModal();
      this.disableForm(false);
    } catch {
      this.toastService.show({
        text: this.resource.deleteFail,
        type: "error",
      });
      this.disableForm(false);
    }
  }

  async onSaveClick(data: any) {
    try {
      let appointments = await this.saveAppointment(data);
      await this.toastService.show({
        text: this.resource.saveSuccess,
        type: "success",
      });
      this.addCalendarEvents(appointments);
      this.toggleModal();
    } catch {
      this.toastService.show({
        text: this.resource.saveFail,
        type: "error",
      });
    }
    this.disableForm(false);
  }

  async onUpdateClick(data: any) {
    try {
      let appointments = await this.updateAppointment(data);
      await this.toastService.show({
        text: this.resource.saveSuccess,
        type: "success",
      });
      this.addCalendarEvents(appointments);
      this.toggleModal();
    } catch {
      this.toastService.show({
        text: this.resource.saveFail,
        type: "error",
      });
    }
    this.disableForm(false);
  }

  get patientName(): string {
    return this.appointmentForm.get("searchPatient").value;
  }

  get doctorName(): string {
    return this.appointmentForm.get("searchDoctor").value;
  }

  get id(): string {
    return this.appointmentForm.get("id").value;
  }

  get filterRange(): any {
    let from = this.appointmentForm.get("from").value;
    let to = this.appointmentForm.get("to").value;
    let date = this.appointmentForm.get("date").value;
    let id = this.appointmentForm.get("id").value;

    let start_time =
      moment(date, "DD/MM/YYYY").format("YYYY-MM-DD") +
      "T" +
      moment(from, "HH:mm").format("HH:mm:ssZ");
    let end_time =
      moment(date, "DD/MM/YYYY").format("YYYY-MM-DD") +
      "T" +
      moment(to, "HH:mm").format("HH:mm:ssZ");

    return {
      from: new Date(start_time).getTime(),
      to: new Date(end_time).getTime(),
      id: id || "",
    };
  }

  private saveAppointment(data: any) {
    return this.appointmentService.saveAppointment(data);
  }

  private updateAppointment(data: any) {
    return this.appointmentService.updateAppointment(data);
  }

  private deleteAppointment(data: any) {
    return this.appointmentService.deleteAppointment(data);
  }

  private disableForm(value: boolean) {
    if (value) {
      return this.appointmentForm.disable();
    }

    return this.appointmentForm.enable();
  }

  private toggleModal() {
    ($(`#calendarModalId`) as any).modal("toggle");
  }

  private hasPatientDataValidator(
    control: AbstractControl
  ): { [key: string]: any } | null {
    return !!this.appointmentForm?.get("patientId").value
      ? null
      : { requireData: { valid: true } };
  }

  private hasDoctorDataValidator(
    control: AbstractControl
  ): { [key: string]: any } | null {
    return !!this.appointmentForm?.get("doctorId").value
      ? null
      : { requireData: { valid: true } };
  }
}

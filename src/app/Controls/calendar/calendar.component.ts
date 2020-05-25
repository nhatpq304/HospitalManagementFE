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
      saveError: "Thông tin nhập không chính xác",
      saveSuccess: "Lưu cuộc hẹn thành công",
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

  addCalendarEvents(data: any[]) {
    _.remove(this.calendarEvents, { id: data[0]?.id });

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
    this.toggleModal();
  }

  handleEventClick(arg) {
    this.appointmentForm.reset();
    this.appointmentForm.patchValue(arg.event.extendedProps);
    this.toggleModal();
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

  private saveAppointment(data: any) {
    return this.appointmentService.saveAppointment(data);
  }

  private updateAppointment(data: any) {
    return this.appointmentService.updateAppointment(data);
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

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

@Component({
  selector: "calendar",
  templateUrl: "./calendar.component.html",
  styleUrls: ["./calendar.component.scss"],
})
export class CalendarComponent implements OnInit, AfterViewInit {
  @ViewChild("calendar") calendarComponent: FullCalendarComponent;
  calendarPlugins = [dayGridPlugin, timeGrigPlugin, interactionPlugin];
  calendarEvents: EventInput[] = [{ title: "Event Now", start: new Date() }];
  locales: [viLocale];
  appointmentForm: FormGroup;
  resource;
  formConfig = formConfig;

  constructor(public appointmentService: AppointmentsService) {}

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
      searchDoctor: new FormControl("", [Validators.required]),
      doctorId: new FormControl("", []),
      date: new FormControl("", [Validators.required]),
      from: new FormControl("", [Validators.required]),
      to: new FormControl("", [Validators.required]),
      searchPatient: new FormControl("", [this.hasDataValidator.bind(this)]),
      patientId: new FormControl("", []),
      remark: new FormControl("", []),
    });
  }

  initResource() {
    this.resource = {
      modalTitle: "Tạo cuộc hẹn",
      modalCancel: "Hủy",
      modalApply: "Xác nhận",
      validationErrors: {},
    };
  }

  async loadData() {
    let data = await this.appointmentService.getAppoinments();
    this.calendarEvents = [...data];
  }

  onSubmit() {
    console.log(this.appointmentForm.value);
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
    this.toggleModal();
  }

  handleEventClick(arg) {
    this.appointmentForm.reset();
    this.appointmentForm.patchValue(arg.event.extendedProps);
    this.toggleModal();
  }

  get patientName(): string {
    return this.appointmentForm.get("searchPatient").value;
  }

  get doctorName(): string {
    return this.appointmentForm.get("searchDoctor").value;
  }

  private toggleModal() {
    ($(`#calendarModalId`) as any).modal("toggle");
  }

  private hasDataValidator(
    control: AbstractControl
  ): { [key: string]: any } | null {
    return !!this.appointmentForm?.get("patientId").value
      ? null
      : { requireData: { valid: true } };
  }
}

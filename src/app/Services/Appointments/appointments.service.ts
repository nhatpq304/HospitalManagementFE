import { Injectable } from "@angular/core";
import apis from "../api.routes";
import { RestfulService } from "../restful.service";
import { AppointmentsMappingService } from "./appointments.mapping.service";
import Appointment from "src/app/Models/appointment.model";

@Injectable({
  providedIn: "root",
})
export class AppointmentsService {
  constructor(
    public restfulService: RestfulService,
    public appointmentMappingService: AppointmentsMappingService
  ) {}

  getAppointments(): Promise<any[]> {
    const api = apis.getAppointments;

    return this.restfulService
      .get(api)
      .toPromise()
      .then((result) => {
        return this.appointmentMappingService.mapAppointment(result.data);
      });
  }

  saveAppointment(data) {
    const api = apis.saveAppointment;
    const dataBody = this.appointmentMappingService.mapSaveAppointment(data);

    return this.restfulService
      .post(api, dataBody)
      .toPromise()
      .then((result) => {
        return this.appointmentMappingService.mapAppointment([result.data]);
      });
  }

  updateAppointment(data) {
    const api = apis.updateAppointment.replace("{id}", data.id);
    const dataBody = this.appointmentMappingService.mapSaveAppointment(data);

    return this.restfulService
      .put(api, dataBody)
      .toPromise()
      .then((result) => {
        return this.appointmentMappingService.mapAppointment([result.data]);
      });
  }
}

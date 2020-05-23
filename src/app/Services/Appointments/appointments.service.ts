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

  getAppoinments(): Promise<Appointment[]> {
    const api = apis.getAppointments;

    return this.restfulService
      .get(api)
      .toPromise()
      .then((result) => {
        return this.appointmentMappingService.mapAppointment(result.data);
      });
  }
}

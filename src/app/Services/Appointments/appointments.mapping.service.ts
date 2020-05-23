import { Injectable } from "@angular/core";
import Appointment from "src/app/Models/appointment.model";

@Injectable({
  providedIn: "root",
})
export class AppointmentsMappingService {
  constructor() {}

  mapAppointment(data): Appointment[] {
    console.log(data);

    return data.map((appointment) => {
      let app = new Appointment();

      app.id = appointment.id;
      app.start = appointment.start_time;
      app.end = appointment.end_time;
      app.title = [appointment.doctor.name, appointment.patient.name].join("-");
      app.extendedProps = {
        doctorId: appointment.doctor.id,
        patientId: appointment.patient.id,
        remark: appointment.remark,
      };

      return app;
    });
  }
}

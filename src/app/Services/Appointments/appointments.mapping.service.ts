import { Injectable } from "@angular/core";
import Appointment from "src/app/Models/appointment.model";
import * as moment from "moment";

@Injectable({
  providedIn: "root",
})
export class AppointmentsMappingService {
  constructor() {}

  mapAppointment(data): any[] {
    return data.map((appointment) => {
      let appointmentObj = new Appointment();

      appointmentObj = {
        date:
          (appointment.start_time &&
            moment(appointment.start_time).format("DD/MM/YYYY")) ||
          "",
        from:
          (appointment.start_time &&
            moment(appointment.start_time).format("HH:mm")) ||
          "",
        to:
          (appointment.end_time &&
            moment(appointment.end_time).format("HH:mm")) ||
          "",
        doctorId: appointment.doctor.id,
        patientId: appointment.patient.id,
        remark: appointment.remark,
        searchDoctor: appointment.doctor.name,
        searchPatient: appointment.patient.name,
      };

      let app = {} as any;

      app.id = appointment.id;
      app.start = appointment.start_time;
      app.end = appointment.end_time;
      app.title = [appointment.doctor.name, appointment.patient.name].join("-");
      app.extendedProps = appointmentObj;

      return app;
    });
  }
}

import { Injectable } from "@angular/core";
import AppointmentModel from "src/app/Models/appointment.model";
import AppointmentSaveModel from "src/app/Models/appointmentSave.model";

import * as moment from "moment";

@Injectable({
  providedIn: "root",
})
export class AppointmentsMappingService {
  constructor() {}

  mapAppointment(data): any[] {
    return data.map((appointment) => {
      let appointmentObj = new AppointmentModel();

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

  mapSaveAppointment(data): AppointmentSaveModel {
    let appointment = new AppointmentSaveModel();

    appointment = {
      start_time:
        moment(data.date, "DD/MM/YYYY").format("YYYY-MM-DD") +
        "T" +
        data.from.format("HH:mm:ssZ"),
      end_time:
        moment(data.date, "DD/MM/YYYY").format("YYYY-MM-DD") +
        "T" +
        data.to.format("HH:mm:ssZ"),
      remark: data.remark,
      patient_id: data.patientId,
      doctor_id: data.doctorId,
    };

    return appointment;
  }
}

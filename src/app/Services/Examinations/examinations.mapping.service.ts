import { Injectable } from "@angular/core";
import ExaminationSaveModel from "src/app/Models/examinationSave.model";
import { LocalStorageService } from "src/app/Services/LocalStorage/local-storage.service";
import * as _ from "lodash";
import * as moment from "moment";
import ExaminationModel from "src/app/Models/examination.model";
import ExaminationSearchModel from "src/app/Models/examinationSearch.model";

@Injectable({
  providedIn: "root",
})
export class ExaminationsMappingService {
  constructor(public localStorageService: LocalStorageService) {}

  mappingSearchExamination(data): ExaminationSearchModel {
    let exam = new ExaminationSearchModel();
    exam.id = data.id;
    exam.doctorName = data.doctor.name;
    exam.patientName = data.patient.name;
    exam.idCardNumber = data.patient.id_card_number;
    exam.medicalCardNumber = data.patient.medical_card_number;
    exam.createdDate = data.created_date;
    return exam;
  }

  mappingExamination(data): ExaminationModel {
    let exam = new ExaminationModel();

    exam.id = data.id;
    exam.doctorName = data.doctor.name;
    exam.doctorDept = data.department;
    exam.createDate =
      (data.created_date && moment(data.created_date).format("DD/MM/YYYY")) ||
      "";
    exam.patientId = data.patient_id;
    exam.bodyTemp = data.body_temp;
    exam.height = data.body_height;
    exam.weight = data.body_weight;
    exam.bloodPressure = data.blood_pressure;
    exam.examResult = data.result;

    exam.search = data.patient.name;
    exam.name = data.patient.name;
    exam.email = data.patient.email;
    exam.idCard = data.patient.id_card_number;
    exam.medicalCard = data.patient.medical_card_number;
    exam.gender = data.patient.gender;
    exam.address = data.patient.address;
    exam.phone = data.patient.phone;
    exam.reminders = data.reminders;
    exam.reexaminationDate =
      (data.reexamination_date &&
        moment(data.reexamination_date).format("DD/MM/YYYY")) ||
      "";
    exam.birthday =
      (data.patient.birthday &&
        moment(data.patient.birthday).format("DD/MM/YYYY")) ||
      "";
    let diff = moment(data.reexamination_date).diff(
      moment().startOf("day"),
      "days"
    );

    exam.dayCount = diff > 0 ? diff : 0;

    exam.medicine = _.map(data.medicines, (med) => {
      return {
        medicineId: med.id,
        medicineName: med.brand_name,
        amount: med.pivot.amount,
        remark: med.pivot.remark,
      };
    });

    return exam;
  }

  mappingSaveExamination(data): ExaminationSaveModel {
    let exam = new ExaminationSaveModel();
    let user = this.localStorageService.getItem("user");
    exam.doctor_id = user && JSON.parse(user).id;
    exam.patient_id = data.patientId;
    exam.created_date =
      (data.createDate &&
        moment(data.createDate, "DD/MM/YYYY").format(
          "YYYY-MM-DD[T]HH:mm:ss.SSSZZ"
        )) ||
      null;
    exam.reexamination_date =
      (data.reexaminationDate &&
        moment(data.reexaminationDate, "DD/MM/YYYY").format(
          "YYYY-MM-DD[T]HH:mm:ss.SSSZZ"
        )) ||
      null;
    exam.reminders = data.reminders;
    exam.department = data.doctorDept;
    exam.body_temp = data.bodyTemp;
    exam.blood_pressure = data.bloodPressure;
    exam.body_weight = data.weight;
    exam.body_height = data.height;
    exam.result = data.examResult;
    exam.medicines = _.chain(data.medicine)
      .filter("medicineId")
      .map((med) => {
        return {
          id: med.medicineId,
          amount: med.amount,
          remark: med.remark,
        };
      })
      .value();

    return exam;
  }
}

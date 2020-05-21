export default class ExaminationModel {
  id: string = "";

  doctorName: string = "";
  doctorDept: string = "";
  bodyTemp: string = "";
  weight: string = "";
  height: string = "";
  bloodPressure: string = "";
  examResult: string = "";
  medicine: string[] = [];
  patientId: string = "";
  createDate: string = "";

  //patient
  name: string = "";
  gender: boolean = false;
  idCard: string = "";
  medicalCard: string = "";
  address: string = "";
  phone: string = "";
  birthday: string = "";
  email: string = "";
  avatar: string = "";
  search: string = "";

  reminders: string = "";
  reexaminationDate: string = "";
  dayCount: number = 0;
}

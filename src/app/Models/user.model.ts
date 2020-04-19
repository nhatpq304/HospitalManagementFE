import MediaModel from "./media.model";

export default class UserModel {
  id: string;
  email: string;
  name: string;
  address: string;
  birthday: string;
  phone: string;
  idCard: string;
  medicalCard: string;
  department: string;
  gender: string;
  avatar: MediaModel;
}

import { Injectable } from "@angular/core";
import UserModel from "src/app/Models/user.model";

@Injectable({
  providedIn: "root",
})
export default class UsersMappingService {
  constructor() {}

  mapNewUserData(data: any): UserModel {
    let user = new UserModel();

    user.name = data.name;
    user.email = data.email;
    user.birthday = data.birthday;
    user.phone = data.phone;
    user.idCard = data.idCard;
    user.medicalCard = data.medicalCard;
    user.address = data.address;
    user.gender = data.gender;
    user.department = data.department;
    user.password = data.department ? data.password : null;

    return user;
  }
}

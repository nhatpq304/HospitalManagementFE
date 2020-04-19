import { Injectable } from "@angular/core";
import UserSaveModel from "src/app/Models/userSave.model";
import AvatarSaveModel from "src/app/Models/avatarSave.model";

@Injectable({
  providedIn: "root",
})
export default class UsersMappingService {
  constructor() {}

  mapNewUserData(data: any): UserSaveModel {
    let user = new UserSaveModel();

    user.name = data.name;
    user.email = data.email;
    user.birthday = data.birthday;
    user.phone = data.phone;
    user.id_card_number = data.idCard;
    user.medical_card_number = data.medicalCard;
    user.address = data.address;
    user.gender = data.gender;
    user.department = data.department;
    user.password = data.department ? data.password : null;
    user.avatar_image = data.avatar;

    return user;
  }

  mapNewAvatarData(base64: string, userId: string) {
    let media = new AvatarSaveModel();
    media.file = base64;
    media.media_type = "AVATAR";
    media.user_id = userId;

    return media;
  }
}

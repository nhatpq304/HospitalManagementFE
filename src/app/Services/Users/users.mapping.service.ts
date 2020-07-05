import { Injectable } from "@angular/core";
import UserSaveModel from "src/app/Models/userSave.model";
import AvatarSaveModel from "src/app/Models/avatarSave.model";
import UserModel from "src/app/Models/user.model";
import * as moment from "moment";
import MediaModel from "src/app/Models/media.model";

@Injectable({
  providedIn: "root",
})
export default class UsersMappingService {
  constructor() {}

  mapUserData(data: any): UserModel {
    let user = new UserModel();

    user.id = data.id;
    user.name = data.name;
    user.email = data.email;
    user.birthday =
      (data.birthday && moment(data.birthday).format("DD/MM/YYYY")) || "";
    user.phone = data.phone;
    user.idCard = data.id_card_number;
    user.medicalCard = data.medical_card_number;
    user.address = data.address;
    user.gender = data.gender;
    user.department = data.department;
    user.avatar = data.avatar_image && this.mapMedia(data.avatar_image);

    return user;
  }

  mapMedia(data: any): MediaModel {
    let media = new MediaModel();
    media.id = data.id;
    media.path = data.media_link;
    media.type = data.media_type;

    return media;
  }

  mapSaveUserData(data: any): UserSaveModel {
    let user = new UserSaveModel();

    user.name = data.name;
    user.email = data.email;
    user.birthday =
      (data.birthday &&
        moment(data.birthday, "DD/MM/YYYY").format(
          "YYYY-MM-DD[T]HH:mm:ss.SSSZZ"
        )) ||
      null;
    user.phone = data.phone;
    user.id_card_number = data.idCard;
    user.medical_card_number = data.medicalCard;
    user.address = data.address;
    user.gender = data.gender;
    user.department = data.department;
    user.password = data.department ? data.password : null;
    user.avatar_image = data.avatar;

    if (!user.password) {
      delete user.password;
    }
    return user;
  }
}

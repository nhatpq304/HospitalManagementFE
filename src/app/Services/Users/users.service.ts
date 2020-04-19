import { Injectable } from "@angular/core";
import apis from "../api.routes";
import { RestfulService } from "../restful.service";
import UsersMappingService from "./users.mapping.service";

@Injectable({
  providedIn: "root",
})
export default class UsersService {
  constructor(
    public restfulService: RestfulService,
    public usersMappingService: UsersMappingService
  ) {}

  getAllUsers() {
    const api = apis.getAllUsers;

    return this.restfulService.get(api);
  }

  saveAvatar(base64: string, userId: string) {
    const api = apis.saveMedia;
    const dataBody = this.usersMappingService.mapNewAvatarData(base64, userId);

    return this.restfulService.post(api, dataBody).toPromise();
  }

  saveUser(data: any) {
    const api = apis.saveUser;
    const dataBody = this.usersMappingService.mapNewUserData(data);

    return this.restfulService
      .post(api, dataBody)
      .toPromise()
      .then((response) => {
        if (response?.user?.id) {
          return this.saveAvatar(dataBody.avatar_image, response?.user?.id);
        }
        return response;
      });
  }
}

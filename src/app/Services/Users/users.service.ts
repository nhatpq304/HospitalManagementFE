import { Injectable } from "@angular/core";
import apis from "../api.routes";
import { RestfulService } from "../restful.service";
import UsersMappingService from "./users.mapping.service";
import UserModel from "src/app/Models/user.model";
import { MediaService } from "../Media/media.service";
import { map } from "rxjs/operators";
import * as _ from "lodash";
@Injectable({
  providedIn: "root",
})
export default class UsersService {
  constructor(
    public restfulService: RestfulService,
    public usersMappingService: UsersMappingService,
    public mediaService: MediaService
  ) {}

  getAllUsers() {
    const api = apis.getAllUsers;

    return this.restfulService
      .get(api)
      .pipe(
        map((res) =>
          _.map(res.user, (user) => this.usersMappingService.mapUserData(user))
        )
      );
  }

  saveUser(data: any) {
    const api = apis.saveUser;
    const dataBody = this.usersMappingService.mapSaveUserData(data);

    return this.restfulService
      .post(api, dataBody)
      .toPromise()
      .then((response) => {
        if (response?.user?.id && dataBody.avatar_image) {
          return this.mediaService.saveAvatar(
            dataBody.avatar_image,
            response?.user?.id
          );
        }
        return response;
      });
  }

  updateUser(data: any, originalData: UserModel) {
    const api = apis.updateUser.replace("{id}", originalData.id);
    const dataBody = this.usersMappingService.mapSaveUserData(data);
    let queue = [];

    if (dataBody.avatar_image) {
      if (originalData.avatar) {
        queue.push(this.mediaService.deleteAvatar(originalData.avatar));
      }
      queue.push(
        this.mediaService.saveAvatar(dataBody.avatar_image, originalData.id)
      );
    }

    queue.push(this.restfulService.put(api, dataBody).toPromise());

    return Promise.all(queue);
  }

  getUser(id: string) {
    const api = apis.getUser.replace("{id}", id);

    return this.restfulService
      .get(api)
      .toPromise()
      .then((data) => {
        return this.usersMappingService.mapUserData(data.user);
      });
  }
}

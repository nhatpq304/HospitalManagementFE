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

  saveUser(data: any) {
    const api = apis.saveUser;
    const dataBody = this.usersMappingService.mapNewUserData(data);
    
    return this.restfulService.post(api, dataBody);
  }
}

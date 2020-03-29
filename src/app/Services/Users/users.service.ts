import { Injectable } from "@angular/core";
import apis from "../api.routes";
import { RestfulService } from "../restful.service";

@Injectable({
  providedIn: "root"
})
export class UsersService {
  constructor(public restfulService: RestfulService) {}

  getAllUsers() {
    const api = apis.getAllUsers;

    return this.restfulService.get(api);
  }
}

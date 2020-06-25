import { Injectable } from "@angular/core";
import { RestfulService } from "../restful.service";
import { AuthModel } from "src/app/Models/Auth/auth.model";
import { LocalStorageService } from "../LocalStorage/local-storage.service";
import apis from "../api.routes";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  constructor(
    public restfulService: RestfulService,
    public localStorageService: LocalStorageService
  ) {}

  loginUser(authData: AuthModel) {
    const api = apis.login;

    return this.restfulService.post(api, authData).toPromise();
  }

  getLoggedUser() {
    const api = apis.getLoggedAccount;

    return this.restfulService.get(api).toPromise();
  }

  getLoggedUserPermissions() {
    const api = apis.getLoggedUserPermissions;

    return this.restfulService.get(api).toPromise();
  }
}

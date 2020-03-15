import { Injectable } from "@angular/core";
import { RestfulService } from "../restful.service";
import { AuthModel } from "src/app/Models/Auth/auth.model";

@Injectable({
  providedIn: "root"
})
export class AuthService {
  constructor(public restfulService: RestfulService) {}

  userLogin(authData: AuthModel) {
    const api = "https://hospital-myn-be.herokuapp.com/api/auth/login";
    return this.restfulService
      .post(api, authData)
      .subscribe(data => console.log(data));
  }
}

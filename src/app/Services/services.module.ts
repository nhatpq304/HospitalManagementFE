import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RestfulService } from "./restful.service";
import { AuthService } from "./Auth/auth.service";
import { LocalStorageService } from "./LocalStorage/local-storage.service";
import { AuthGuardService } from "./Auth/auth-guard.service";

@NgModule({
  declarations: [
    RestfulService,
    AuthService,
    LocalStorageService,
    AuthGuardService
  ],
  imports: [CommonModule],
  exports: [RestfulService, AuthService, AuthGuardService]
})
export class ServicesModule {}

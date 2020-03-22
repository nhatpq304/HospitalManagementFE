import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RestfulService } from "./restful.service";
import { AuthService } from "./Auth/auth.service";
import { LocalStorageService } from "./LocalStorage/local-storage.service";

@NgModule({
  declarations: [RestfulService, AuthService, LocalStorageService],
  imports: [CommonModule],
  exports: [RestfulService, AuthService]
})
export class ServicesModule {}

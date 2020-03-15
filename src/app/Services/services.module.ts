import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RestfulService } from "./restful.service";
import { AuthService } from "./Auth/auth.service";

@NgModule({
  declarations: [RestfulService, AuthService],
  imports: [CommonModule],
  exports: [RestfulService, AuthService]
})
export class ServicesModule {}

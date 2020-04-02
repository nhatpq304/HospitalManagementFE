import { BrowserModule } from "@angular/platform-browser";
import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { MDBBootstrapModule } from "angular-bootstrap-md";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { MainModule } from "./main/main.module";
import { MainRoutingModule } from "./main/main-routing.module";
import { LoginModule } from "./login/login.module";
import { AuthGuardService } from "./Services/Auth/auth-guard.service";
import { LoginGuardService } from "./Services/Auth/login-guard.service";
import * as $ from "jquery";
@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    MDBBootstrapModule.forRoot(),
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    MainModule,
    AppRoutingModule,
    MainRoutingModule,
    LoginModule
  ],
  providers: [AuthGuardService, LoginGuardService],
  bootstrap: [AppComponent],
  schemas: [NO_ERRORS_SCHEMA]
})
export class AppModule {}

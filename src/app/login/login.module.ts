import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { LoginComponent } from "./login.component";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { MDBBootstrapModule } from "angular-bootstrap-md";
import { BrowserModule } from "@angular/platform-browser";

@NgModule({
  declarations: [LoginComponent],
  imports: [
    MDBBootstrapModule,
    BrowserModule,
    CommonModule,
    ReactiveFormsModule,
    FormsModule
  ],
  exports: [LoginComponent]
})
export class LoginModule {}

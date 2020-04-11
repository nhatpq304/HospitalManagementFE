import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { UserDashboardComponent } from "./dashboard/dashboard.component";
import { ControlsModule } from "../Controls/controls.module";
import { UserEditComponent } from "./edit/edit.component";
import { RouterModule } from "@angular/router";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";
import { MDBBootstrapModule } from "angular-bootstrap-md";

@NgModule({
  declarations: [UserDashboardComponent, UserEditComponent],
  imports: [
    CommonModule,
    ControlsModule,
    RouterModule,
    ReactiveFormsModule,
    FormsModule,
    MDBBootstrapModule,
    BrowserModule,
  ]
})
export class UsersModule {}

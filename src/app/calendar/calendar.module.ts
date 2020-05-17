import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { CalendarDashboardComponent } from "./dashboard/dashboard.component";
import { ControlsModule } from "../Controls/controls.module";
import { RouterModule } from "@angular/router";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { MDBBootstrapModule } from "angular-bootstrap-md";
import { BrowserModule } from "@angular/platform-browser";

@NgModule({
  declarations: [CalendarDashboardComponent],
  imports: [
    CommonModule,
    ControlsModule,
    RouterModule,
    ReactiveFormsModule,
    FormsModule,
    MDBBootstrapModule,
    BrowserModule,
  ],
  exports: [CalendarDashboardComponent],
})
export class CalendarModule {}

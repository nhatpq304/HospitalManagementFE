import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ControlsModule } from "../Controls/controls.module";
import { RouterModule } from "@angular/router";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { MDBBootstrapModule } from "angular-bootstrap-md";
import { BrowserModule } from "@angular/platform-browser";
import { ExaminationDashboardComponent } from "./dashboard/dashboard.component";
import { ExaminationEditComponent } from "./edit/edit.component";
@NgModule({
  declarations: [ExaminationDashboardComponent, ExaminationEditComponent],
  imports: [
    CommonModule,
    ControlsModule,
    RouterModule,
    ReactiveFormsModule,
    FormsModule,
    MDBBootstrapModule,
    BrowserModule,
  ],
})
export class ExaminationsModule {}

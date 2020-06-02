import { NgModule } from "@angular/core";
import { MedicinesDashboardComponent } from "./dashboard/dashboard.component";
import { ControlsModule } from "../Controls/controls.module";
import { RouterModule } from "@angular/router";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { MDBBootstrapModule } from "angular-bootstrap-md";
import { BrowserModule } from "@angular/platform-browser";
import { CommonModule } from "@angular/common";

@NgModule({
  declarations: [MedicinesDashboardComponent],
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
export class MedicinesModule {}

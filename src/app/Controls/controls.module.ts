import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ButtonComponent } from "./button/button.component";
import { DatatableComponent } from "./datatable/datatable.component";
import { MDBBootstrapModule } from "angular-bootstrap-md";
import { DatepickerComponent } from "./datepicker/datepicker.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";
import { TextInputComponent } from "./text-input/text-input.component";
import { SelectComponent } from "./select/select.component";
@NgModule({
  declarations: [
    ButtonComponent,
    DatatableComponent,
    DatepickerComponent,
    TextInputComponent,
    SelectComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MDBBootstrapModule,
    FormsModule,
    BrowserModule
  ],
  exports: [
    ButtonComponent,
    DatatableComponent,
    DatepickerComponent,
    TextInputComponent,
    SelectComponent
  ]
})
export class ControlsModule {}

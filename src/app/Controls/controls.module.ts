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
import { ImageUploaderComponent } from "./image-uploader/image-uploader.component";
import { SearchBarComponent } from "./search-bar/search-bar.component";
import { TextAreaComponent } from "./text-area/text-area.component";
@NgModule({
  declarations: [
    ButtonComponent,
    DatatableComponent,
    DatepickerComponent,
    TextInputComponent,
    SelectComponent,
    ImageUploaderComponent,
    SearchBarComponent,
    TextAreaComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MDBBootstrapModule,
    FormsModule,
    BrowserModule,
  ],
  exports: [
    ButtonComponent,
    DatatableComponent,
    DatepickerComponent,
    TextInputComponent,
    SelectComponent,
    ImageUploaderComponent,
    SearchBarComponent,
    TextAreaComponent,
  ],
})
export class ControlsModule {}

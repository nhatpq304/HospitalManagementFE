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
import { MedicinePickerComponent } from "./medicine-picker/medicine-picker.component";
import { MedicineSearchComponent } from "./medicine-search/medicine-search.component";
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
    MedicinePickerComponent,
    MedicineSearchComponent,
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
    MedicinePickerComponent,
    MedicineSearchComponent,
  ],
})
export class ControlsModule {}

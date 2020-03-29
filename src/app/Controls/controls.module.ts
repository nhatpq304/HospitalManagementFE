import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ButtonComponent } from "./button/button.component";
import { DatatableComponent } from "./datatable/datatable.component";
import { MDBBootstrapModule } from "angular-bootstrap-md";

@NgModule({
  declarations: [ButtonComponent, DatatableComponent],
  imports: [CommonModule, MDBBootstrapModule],
  exports: [ButtonComponent, DatatableComponent]
})
export class ControlsModule {}

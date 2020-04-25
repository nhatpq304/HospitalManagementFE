import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MainComponent } from "./main.component";
import { UsersModule } from "../Users/users.module";
import { LayoutsModule } from "../Layouts/layouts.module";
import { ControlsModule } from "../Controls/controls.module";
import { RouterModule } from "@angular/router";
import { ExaminationsModule } from "../examinations/examinations.module";

@NgModule({
  declarations: [MainComponent],
  imports: [
    CommonModule,
    UsersModule,
    LayoutsModule,
    ControlsModule,
    RouterModule,
    ExaminationsModule,
  ],
  exports: [MainComponent],
})
export class MainModule {}

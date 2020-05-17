import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MainComponent } from "./main.component";
import { UsersModule } from "../Users/users.module";
import { LayoutsModule } from "../Layouts/layouts.module";
import { ControlsModule } from "../Controls/controls.module";
import { RouterModule } from "@angular/router";
import { ExaminationsModule } from "../examinations/examinations.module";
import { CalendarModule } from "../calendar/calendar.module";

@NgModule({
  declarations: [MainComponent],
  imports: [
    CommonModule,
    UsersModule,
    LayoutsModule,
    ControlsModule,
    RouterModule,
    ExaminationsModule,
    CalendarModule,
  ],
  exports: [MainComponent],
})
export class MainModule {}

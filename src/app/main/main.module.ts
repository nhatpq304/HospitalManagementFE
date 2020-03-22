import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MainComponent } from "./main.component";
import { UsersModule } from "../Users/users.module";
import { LayoutsModule } from "../Layouts/layouts.module";
import { ControlsModule } from "../Controls/controls.module";
import { RouterModule } from "@angular/router";

@NgModule({
  declarations: [MainComponent],
  imports: [
    CommonModule,
    UsersModule,
    LayoutsModule,
    ControlsModule,
    RouterModule
  ],
  exports: [MainComponent]
})
export class MainModule {}

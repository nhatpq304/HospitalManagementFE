import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { UserDashboardComponent } from "./dashboard/dashboard.component";
import { ControlsModule } from "../Controls/controls.module";
import { UserEditComponent } from "./edit/edit.component";
import { RouterModule } from "@angular/router";

@NgModule({
  declarations: [UserDashboardComponent, UserEditComponent],
  imports: [CommonModule, ControlsModule, RouterModule]
})
export class UsersModule {}

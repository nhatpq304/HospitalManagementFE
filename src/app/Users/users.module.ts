import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { UserDashboardComponent } from "./dashboard/dashboard.component";
import { ControlsModule } from '../Controls/controls.module';

@NgModule({
  declarations: [UserDashboardComponent],
  imports: [CommonModule, ControlsModule]
})
export class UsersModule {}

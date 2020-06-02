import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { UserDashboardComponent } from "../Users/dashboard/dashboard.component";
import { MainComponent } from "./main.component";
import { UserEditComponent } from "../Users/edit/edit.component";
import { ExaminationDashboardComponent } from "../examinations/dashboard/dashboard.component";
import { ExaminationEditComponent } from "../examinations/edit/edit.component";
import { CalendarDashboardComponent } from "../calendar/dashboard/dashboard.component";
import { MedicinesDashboardComponent } from "../medicines/dashboard/dashboard.component";

const routes: Routes = [
  {
    path: "default",
    component: MainComponent,
    children: [
      { path: "users", component: UserDashboardComponent },
      { path: "users/add", component: UserEditComponent },
      { path: "users/:id/edit", component: UserEditComponent },
      { path: "examinations", component: ExaminationDashboardComponent },
      { path: "examinations/add", component: ExaminationEditComponent },
      {
        path: "examinations/:id/edit",
        component: ExaminationEditComponent,
      },
      { path: "calendar", component: CalendarDashboardComponent },
      { path: "medicines", component: MedicinesDashboardComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MainRoutingModule {}

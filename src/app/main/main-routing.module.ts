import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { UserDashboardComponent } from "../Users/dashboard/dashboard.component";
import { MainComponent } from "./main.component";

const routes: Routes = [
  {
    path: "default",
    component: MainComponent,
    children: [{ path: "users", component: UserDashboardComponent }]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule {}

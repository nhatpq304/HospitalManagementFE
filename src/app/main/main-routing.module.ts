import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { DashboardComponent } from "../Users/dashboard/dashboard.component";
import { MainComponent } from "./main.component";

const routes: Routes = [
  {
    path: "default",
    component: MainComponent,
    children: [{ path: "users", component: DashboardComponent }]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule {}

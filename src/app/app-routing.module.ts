import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { LoginComponent } from "./login/login.component";
import { MainComponent } from "./main/main.component";
import { AuthGuardService } from "./Services/Auth/auth-guard.service";
import { LoginGuardService } from "./Services/Auth/login-guard.service";

const routes: Routes = [
  { path: "**", redirectTo: "/default", pathMatch: "full" },
  {
    path: "",
    pathMatch: "full",
    redirectTo: "default",
  },
  {
    path: "login",
    component: LoginComponent,
    canActivate: [LoginGuardService],
  },
  {
    path: "default",
    component: MainComponent,
    canActivate: [AuthGuardService],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

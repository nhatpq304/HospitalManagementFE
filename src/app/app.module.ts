import { BrowserModule } from "@angular/platform-browser";
import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { MDBBootstrapModule } from "angular-bootstrap-md";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { UsersModule } from "./Users/users.module";
import { LayoutsModule } from "./Layouts/layouts.module";
import { ControlsModule } from "./Controls/controls.module";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MDBBootstrapModule.forRoot(),
    UsersModule,
    LayoutsModule,
    ControlsModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [NO_ERRORS_SCHEMA]
})
export class AppModule {}

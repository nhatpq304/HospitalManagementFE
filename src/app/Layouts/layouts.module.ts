import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { NavigationBarComponent } from "./navigation-bar/navigation-bar.component";
import { SideBarComponent } from "./side-bar/side-bar.component";
import { HeaderComponent } from "./header/header.component";

@NgModule({
  declarations: [NavigationBarComponent, SideBarComponent, HeaderComponent],
  imports: [CommonModule],
  exports: [HeaderComponent]
})
export class LayoutsModule {}

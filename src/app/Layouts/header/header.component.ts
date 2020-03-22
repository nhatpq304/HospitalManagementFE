import { Component, OnInit, Input } from "@angular/core";
import { UserModel } from 'src/app/Models/user.model';

@Component({
  selector: "layouts-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.scss"]
})
export class HeaderComponent implements OnInit {
  @Input() userData: UserModel;
  constructor() {}

  ngOnInit(): void {}
}

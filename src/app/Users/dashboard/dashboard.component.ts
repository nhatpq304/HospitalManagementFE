import { Component, OnInit } from "@angular/core";
import { UsersService } from "src/app/Services/Users/users.service";

@Component({
  selector: "user-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.scss"]
})
export class UserDashboardComponent implements OnInit {
  datatableConfig;
  datatableData;
  constructor(public usersService: UsersService) {}

  ngOnInit(): void {
    this.datatableConfig = {
      id: "userDatatableId",
      columns: [
        { data: "email", title: "Email", type: "string" },
        { data: "name", title: "Tên", type: "string" },
        { data: "address", title: "Địa chỉ", type: "string" },
        { data: "birthday", title: "Ngày sinh", type: "Date" },
        { data: "id_card_number", title: "CMND", type: "string" },
        { data: "medical_card_number", title: "Số BHYT", type: "string" }
      ]
    };

    this.usersService.getAllUsers().subscribe(
      response => {
        console.log(response.user);
        this.datatableData = response.user;
      },
      error => {},
      () => {}
    );
  }
}

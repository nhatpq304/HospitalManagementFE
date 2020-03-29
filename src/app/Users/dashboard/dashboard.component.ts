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
        { id: "email", header: "email", type: "string" },
        { id: "name", header: "Tên", type: "string" },
        { id: "address", header: "Địa chỉ", type: "string" },
        { id: "birthday", header: "Ngày sinh", type: "Date" },
        { id: "id_card_number", header: "CMND", type: "string" },
        { id: "medical_card_number", header: "Số BHYT", type: "string" }
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

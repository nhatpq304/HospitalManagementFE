import { Component, OnInit, EventEmitter, Output } from "@angular/core";
import { FormGroup, FormControl } from "@angular/forms";
import UsersService from "src/app/Services/Users/users.service";

@Component({
  selector: "search-bar",
  templateUrl: "./search-bar.component.html",
  styleUrls: ["./search-bar.component.scss"],
})
export class SearchBarComponent implements OnInit {
  searchForm: FormGroup;
  resource;
  datatableConfig;
  datatableData;
  searchText: string;
  @Output() onSearchApply = new EventEmitter();

  constructor(public usersService: UsersService) {}

  ngOnInit(): void {
    this.loadData();
    this.initGridConfig();
    this.initForm();
    this.initResource();
  }

  initResource() {
    this.resource = {
      placeholder: "Tìm người bệnh",
    };
  }

  initForm() {
    this.searchForm = new FormGroup({
      searchText: new FormControl("", []),
    });
  }

  private initGridConfig() {
    this.datatableConfig = {
      id: "userDatatableModalId",
      columns: [
        { data: "name", title: "Tên", type: "string" },
        { data: "birthday", title: "Ngày sinh", type: "string" },
        { data: "address", title: "Địa chỉ", type: "string" },
        {
          data: "gender",
          title: "Giới tính",
          type: "string",
          render: (obj) => (obj === "1" ? "Nam" : "Nữ"),
        },
        { data: "idCard", title: "CMND", type: "string" },
        { data: "medicalCard", title: "Số BHYT", type: "string" },
      ],
    };
  }

  onSearchClick() {
    this.toggleModal();
    this.searchText = this.searchForm.get("searchText").value;
  }

  onSearchComplete() {
    let table = ($(`#${this.datatableConfig.id}`) as any).DataTable();
    let data = table.rows({ selected: true }).data()[0];

    this.onSearchApply.emit({ data: data });
    this.toggleModal();
  }

  private toggleModal() {
    ($(`#searchModal`) as any).modal("toggle");
  }

  private loadData() {
    this.usersService.getAllUsers().subscribe(
      (response) => {
        this.datatableData = response;
      },
      (error) => {},
      () => {}
    );
  }
}

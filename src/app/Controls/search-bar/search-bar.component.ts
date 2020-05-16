import {
  Component,
  OnInit,
  EventEmitter,
  Output,
  Input,
  OnChanges,
} from "@angular/core";
import { FormGroup } from "@angular/forms";
import UsersService from "src/app/Services/Users/users.service";

@Component({
  selector: "search-bar",
  templateUrl: "./search-bar.component.html",
  styleUrls: ["./search-bar.component.scss"],
})
export class SearchBarComponent implements OnInit, OnChanges {
  @Input() value;
  @Input() config;
  @Input() parentForm: FormGroup;
  @Output() onSearchApply = new EventEmitter();
  @Output() onRemove = new EventEmitter();

  resource;
  datatableConfig;
  datatableData;
  searchText: string;
  isReadOnly: boolean;
  constructor(public usersService: UsersService) {}
  ngOnChanges(changeObj) {
    if (changeObj?.value?.currentValue) {
      this.setText(this.value);
    }
  }
  ngOnInit(): void {
    this.loadData();
    this.initGridConfig();
    this.initResource();
  }

  initResource() {
    this.resource = {
      placeholder: `Tìm bệnh nhân${this.config.required && "*"}`,
      modalTitle: "Tìm bệnh nhân",
      modalCancel: "Hủy",
      modalApply: "Xác nhận",
    };
  }

  private initGridConfig() {
    this.datatableConfig = {
      id: "userDatatableModalId",
      pageLength: 5,
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
    this.searchText = this.parentForm.get(this.config.controlName).value || "";
  }

  onSearchComplete() {
    let table = ($(`#${this.datatableConfig.id}`) as any).DataTable();
    let data = table.rows({ selected: true }).data()[0];

    this.onSearchApply.emit({ data: data });
    this.toggleModal();
  }

  onSearchRemove() {
    this.onRemove.emit();
  }

  setText(data) {
    this.isReadOnly = !this.isReadOnly;
    this.parentForm.get(this.config.controlName).setValue(data);
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

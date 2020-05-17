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
  modalId: string;
  constructor(public usersService: UsersService) {}
  ngOnChanges(changeObj) {
    if (changeObj?.value?.currentValue) {
      this.setText(this.value);
    }
  }
  ngOnInit(): void {
    this.loadData(this.config.searchDoctor);
    this.initResource();
    this.initGridConfig();
  }

  initResource() {
    if (this.config.searchDoctor) {
      this.resource = {
        modalTitle: "Tìm bác sĩ",
        modalCancel: "Hủy",
        modalApply: "Xác nhận",
      };
    } else {
      this.resource = {
        modalTitle: "Tìm bệnh nhân",
        modalCancel: "Hủy",
        modalApply: "Xác nhận",
      };
    }

    this.resource.placeholder = `${this.resource.modalTitle}${
      this.config.required && "*"
    }`;

    this.modalId = `${this.config.controlName}_modalId`;
  }

  private initGridConfig() {
    // if (this.config.searchDoctor) {
    //   this.datatableConfig = {
    //     id: "doctorDatatableModalId",
    //     pageLength: 5,
    //     columns: [
    //       { data: "name", title: "Tên", type: "string" },
    //       { data: "phone", title: "SĐT", type: "string" },
    //       { data: "address", title: "Địa chỉ", type: "string" },
    //       { data: "department", title: "Khoa", type: "string" },
    //       {
    //         data: "gender",
    //         title: "Giới tính",
    //         type: "string",
    //         render: (obj) => (obj === "1" ? "Nam" : "Nữ"),
    //       },
    //     ],
    //   };
    // } else {
    this.datatableConfig = {
      id: "userDatatableModalId" + this.modalId,
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
    // }
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
    this.parentForm.get(this.config.controlName).setValue(data);
  }

  private toggleModal() {
    ($(`#${this.modalId}`) as any).modal("toggle");
  }

  private loadData(isSearchDoctor?: boolean) {
    this.usersService.getAllUsers(isSearchDoctor).subscribe(
      (response) => {
        this.datatableData = response;
      },
      (error) => {},
      () => {}
    );
  }
}

import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  OnChanges,
} from "@angular/core";
import { FormGroup } from "@angular/forms";
import * as _ from "lodash";

@Component({
  selector: "medicine-search",
  templateUrl: "./medicine-search.component.html",
  styleUrls: ["./medicine-search.component.scss"],
})
export class MedicineSearchComponent implements OnInit, OnChanges {
  @Input() id;
  @Input() config;
  @Input() value;
  @Input() parentForm: FormGroup;
  @Output() onSearchApply = new EventEmitter();
  @Output() onRemove = new EventEmitter();

  resource;
  datatableConfig;
  datatableData;
  searchText: string;
  modalId: string;
  constructor() {}

  ngOnInit(): void {
    this.loadData();
    this.initGridConfig();
    this.initResource();
  }

  ngOnChanges(obj) {
    if (obj?.value?.currentValue) {
      this.setText(this.value.name);
    }
  }

  initResource() {
    this.modalId = `searchMedicineModal_${this.id}`;
    this.resource = {
      placeholder: `Chọn thuốc${this.config?.required ? "*" : ""}`,
      modalTitle: "Tìm thuốc",
      modalCancel: "Hủy",
      modalApply: "Xác nhận",
    };
  }

  private initGridConfig() {
    this.datatableConfig = {
      id: "medicineModalId" + this.id,
      pageLength: 5,
      columns: [
        { data: "name", title: "Tên thuốc", type: "string" },
        { data: "amount", title: "Số lượng", type: "string" },
        { data: "remark", title: "Ghi chú", type: "string" },
      ],
    };
  }

  onSearchClick() {
    this.parentForm.get(this.config.controlName).enabled && this.toggleModal();
  }

  onSearchComplete() {
    let table = ($(`#${this.datatableConfig.id}`) as any).DataTable();
    let data = table.rows({ selected: true }).data()[0];
    this.setText(data.name);

    this.onSearchApply.emit({ data: data, controlId: this.id });
    this.toggleModal();
  }

  onSearchRemove() {
    if (!this.parentForm.get(this.config.controlName).enabled) {
      return;
    }
    this.setText(null);
    this.onRemove.emit({ controlId: this.id });
  }

  setText(data) {
    this.parentForm.get(this.config.controlName).setValue(data);
  }

  get searchValue() {
    return this.parentForm.get(this.config.controlName).value;
  }

  private toggleModal() {
    ($(`#${this.modalId}`) as any).modal("toggle");
  }

  private loadData() {
    setTimeout(() => {
      this.datatableData = [
        {
          id: "1",
          name: "Para",
          amount: 4,
          remark: "ghi chú",
        },
        {
          id: "2",
          name: "Paracetamol",
          amount: 4,
          remark: "ghi chú",
        },
      ];
    });
  }
}

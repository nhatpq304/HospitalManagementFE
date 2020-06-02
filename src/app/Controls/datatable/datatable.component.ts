import { Component, OnInit, Input, OnChanges } from "@angular/core";
import _ from "lodash";
import * as moment from "moment";

@Component({
  selector: "datatable",
  templateUrl: "./datatable.component.html",
  styleUrls: ["./datatable.component.scss"],
})
export class DatatableComponent implements OnInit, OnChanges {
  @Input() searchText: string;
  @Input() config: datatableConfig;
  @Input() data: Object[];
  table;
  constructor() {}

  ngOnInit(): void {}

  ngOnChanges(changeObj) {
    if (this.table) {
      this.table.clear().search("").draw();
    }
    if (changeObj?.data?.currentValue) {
      this.initGrid();
    }
  }

  private initGrid() {
    if (!this.table) {
      this.table = ($(`#${this.config.id}`) as any).DataTable({
        columnDefs: this.config.columnDefs,
        order: this.config.order,
        data: this.data,
        columns: this.config.columns,
        select: this.config.select ?? true,
        searching: this.config.searching ?? true,
        paging: this.config.paging ?? true,
        info: this.config.info ?? true,
        lengthChange: this.config.lengthChange ?? true,
        language: {
          info: "Hiển thị _PAGE_ trên _PAGES_ trang",
          zeroRecords: "Không tồn tại bản ghi nào phù hợp",
          sSearch: "Tìm kiếm",
          infoEmpty: "Không tồn tại bản ghi nào",
          infoFiltered: " - lọc từ _MAX_ bản ghi",
          lengthMenu: `Hiển thị _MENU_ bản ghi`,

          paginate: {
            previous: "Trước",
            next: "Sau",
          },
        },
        lengthMenu: [
          [5, 10, 20, -1],
          [5, 10, 20, "Tất cả"],
        ],
        pageLength: this.config.pageLength || 10,
        drawCallback: this.config.drawCallback,
      });
    } else {
      this.table.clear();
      this.table.rows.add(this.data);
      this.table.draw();
    }
  }
}

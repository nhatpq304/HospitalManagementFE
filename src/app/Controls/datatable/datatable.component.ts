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
    if (changeObj?.config?.currentValue) {
      this.setGridRenderFunction();
    }

    if (changeObj?.data?.currentValue) {
      this.initGrid();
    }

    if (changeObj?.searchText) {
      this.table?.search(this.searchText);
      this.table?.draw(false);
    }
  }

  private initGrid() {
    this.table = ($(`#${this.config.id}`) as any).DataTable({
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
  }

  private setGridRenderFunction() {
    if (this.config.columns) {
      this.config.columns = _.map(this.config.columns, (column) => {
        if (!column.render && column.type === "Date") {
          column.render = (obj) => {
            if (obj) {
              return moment(obj).format("DD/MM/YYYY");
            }
            return "";
          };
        }
        return column;
      });
    }
  }
}

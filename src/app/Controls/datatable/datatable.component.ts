import { Component, OnInit, Input, OnChanges } from "@angular/core";
import datetimeUtil from "../../../util/datetime.util";
import _ from "lodash";
import * as moment from "moment";

interface datatableConfig {
  id: string;
  columns: Object[];
  drawCallback: Function;
}

@Component({
  selector: "datatable",
  templateUrl: "./datatable.component.html",
  styleUrls: ["./datatable.component.scss"],
})
export class DatatableComponent implements OnInit, OnChanges {
  @Input() config: datatableConfig;
  @Input() data: Object[];
  constructor() {}

  ngOnInit(): void {}

  ngOnChanges(changeObj) {
    if (changeObj?.config?.currentValue) {
      this.setGridRenderFunction();
    }

    if (changeObj?.data?.currentValue) {
      this.initGrid();
    }
  }

  private initGrid() {
    ($(`#${this.config.id}`) as any).dataTable({
      data: this.data,
      columns: this.config.columns,
      language: {
        info: "Hiển thị _PAGE_ trên _PAGES_ trang",
        zeroRecords: "Không tồn tại bản ghi nào phù hợp",
        sSearch: "Tìm kiếm",
        infoEmpty: "Không tồn tại bản ghi nào",
        infoFiltered: " - lọc từ _MAX_ bản ghi",
        lengthMenu: `Hiển thị <select> 
			            <option value="10">10</option> 
			            <option value="20">20</option>
			             <option value="-1">Tất cả</option>
                  </select> bản ghi`,
        paginate: {
          previous: "Trước",
          next: "Sau",
        },
      },
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

import { Component, OnInit, Input, OnChanges } from "@angular/core";
import datetimeUtil from "../../../util/datetime.util";
interface datatableConfig {
  id: string;
  columns: Object[];
  isReady: boolean;
}

@Component({
  selector: "datatable",
  templateUrl: "./datatable.component.html",
  styleUrls: ["./datatable.component.scss"]
})
export class DatatableComponent implements OnInit, OnChanges {
  @Input() config: datatableConfig;
  @Input() data: Object[];
  constructor() {}

  ngOnInit(): void {}

  ngOnChanges(changeObj) {
    if (changeObj?.config?.currentValue) {
    }
  }

  transformData(data, col) {
    switch (col.type) {
      case "string":
        return data[col.id];
      case "Date":
        return datetimeUtil.formatDateString(new Date(data[col.id]));
    }
  }
}

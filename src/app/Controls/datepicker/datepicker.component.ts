import {
  Component,
  OnInit,
  OnChanges,
  Input,
  Output,
  EventEmitter,
  AfterViewInit,
} from "@angular/core";
import * as moment from "moment";
import { FormGroup } from "@angular/forms";
@Component({
  selector: "datepicker",
  templateUrl: "./datepicker.component.html",
  styleUrls: ["./datepicker.component.scss"],
})
export class DatepickerComponent implements OnInit, OnChanges, AfterViewInit {
  @Input() config: any;
  @Input() parentForm: FormGroup;
  @Output() onDataChange = new EventEmitter();

  constructor() {}
  ngOnChanges() {}
  ngOnInit(): void {}
  ngAfterViewInit() {
    this.initDatePick();
  }

  private initDatePick() {
    let self = this;
    let config = this.config.isTimePicker
      ? this.getTimePickerConfig()
      : this.getDatePickerConfig();

    let calendar = ($(
      "input[id=" + this.config.controlName + "]"
    ) as any).daterangepicker(config, function (start, end, label) {
      self.onDataChanged(start);
    });

    this.config.isTimePicker &&
      calendar.on("show.daterangepicker", function (ev, picker) {
        picker.container.find(".calendar-table").hide();
      });
  }
  private getTimePickerConfig() {
    return {
      singleDatePicker: true,
      timePicker: true,
      timePicker24Hour: true,
      timePickerIncrement: 1,
      locale: {
        format: "HH:mm",
      },
    };
  }
  private getDatePickerConfig() {
    return {
      singleDatePicker: true,
      showDropdowns: this.config?.showDropdowns || true,
      minYear: this.config?.minYear || 1901,
      maxYear: this.config?.maxYear || parseInt(moment().format("YYYY")),
      locale: {
        format: "DD/MM/YYYY",
      },
    };
  }

  private onDataChanged(param) {
    this.onDataChange.emit({
      data: param,
      controlName: this.config.controlName,
    });
  }
}

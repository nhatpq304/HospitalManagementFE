import { Component, OnInit, ViewChild } from "@angular/core";
import dayGridPlugin from "@fullcalendar/daygrid";
import { FullCalendarComponent } from "@fullcalendar/angular";
import { EventInput } from "@fullcalendar/core";
import interactionPlugin from "@fullcalendar/interaction";
@Component({
  selector: "calendar",
  templateUrl: "./calendar.component.html",
  styleUrls: ["./calendar.component.scss"],
})
export class CalendarComponent implements OnInit {
  @ViewChild("calendar") calendarComponent: FullCalendarComponent;
  calendarPlugins = [dayGridPlugin, interactionPlugin];
  calendarEvents: EventInput[] = [{ title: "Event Now", start: new Date() }];
  constructor() {}

  ngOnInit(): void {}

  handleDateClick(arg) {}
}

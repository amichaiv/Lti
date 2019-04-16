import { Component, OnInit, Input } from "@angular/core";
import { ClassroomService } from "src/app/services/classroom.service";

@Component({
  selector: "app-classroom-stats",
  templateUrl: "./classroom-stats.component.html",
  styleUrls: ["./classroom-stats.component.css"]
})
export class ClassroomStatsComponent implements OnInit {
  @Input() allStudentsCount: number;
  @Input() noOfTeachingAssistants: number;
  @Input() noOfProjectGroups: number;
  @Input() totalSpendings: number;
  constructor() { }

  ngOnInit() {

  }
}

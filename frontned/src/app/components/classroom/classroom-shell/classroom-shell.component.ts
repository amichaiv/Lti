import { Component, OnInit } from "@angular/core";
import { ClassroomService } from 'src/app/services/classroom.service';

import { Assignment } from 'src/app/models/student-assignment.model';
import { Select } from '@ngxs/store';
import { AssignmentsStateSelectors } from 'src/app/store/assignments/assignments.selectors';
import { Observable } from 'rxjs';
import { AssignmentsService } from 'src/app/services/assigments.service';

@Component({
  selector: "app-classroom-shell",
  templateUrl: "./classroom-shell.component.html",
  styleUrls: ["./classroom-shell.component.scss"]
})
export class ClassroomShellComponent implements OnInit {
  students: Assignment[];
  allStudentsCount: number;
  noOfTeachingAssistants: number;
  noOfProjectGroups: number;
  totalSpendings: number;
  assignments: Assignment[];
  @Select(AssignmentsStateSelectors.getAssignments) assignments$: Observable<Assignment[]>;
  constructor(private assignmentService: AssignmentsService) { }

  ngOnInit() {
    this.assignmentService.getAllStudentsCount().subscribe(data => this.allStudentsCount = data);
    this.assignmentService.getNoOfProjectGroups().subscribe(data => this.noOfProjectGroups = data);
    this.assignmentService.getNoOfTeachingAssistants().subscribe(data => this.noOfTeachingAssistants = data);
    this.assignmentService.getTotalSpendings().subscribe(data => this.totalSpendings = data);

  }
}

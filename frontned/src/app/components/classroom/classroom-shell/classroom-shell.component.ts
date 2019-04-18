import { Component, OnInit } from "@angular/core";
import { ClassroomService } from 'src/app/services/classroom.service';
import { StudentsTableElement } from '../models/students-table.model';
import { Observable } from 'rxjs';
import { StudentAssignment } from 'src/app/models/student-assignment.model';

@Component({
  selector: "app-classroom-shell",
  templateUrl: "./classroom-shell.component.html",
  styleUrls: ["./classroom-shell.component.scss"]
})
export class ClassroomShellComponent implements OnInit {
  students: StudentAssignment[];
  allStudentsCount: number;
  noOfTeachingAssistants: number;
  noOfProjectGroups: number;
  totalSpendings: number;
  constructor(private service: ClassroomService) { }

  ngOnInit() {
    this.service.getStudents().subscribe(data => this.students = data);
    this.service.getAllStudentsCount().subscribe(data => this.allStudentsCount = data);
    this.service.getNoOfProjectGroups().subscribe(data => this.noOfProjectGroups = data);
    this.service.getNoOfTeachingAssistants().subscribe(data => this.noOfTeachingAssistants = data);
    this.service.getTotalSpendings().subscribe(data => this.totalSpendings = data);

  }
}

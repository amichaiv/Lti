import { Component, OnInit } from '@angular/core';
import { dropdownElement } from '../models/dropdownElement.model';
import { SelectItem } from 'primeng/api';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { StudentsAssignmentsDataSource } from '../models/students-assignments-data-source';
import { ClassroomService } from 'src/app/services/classroom.service';
interface wordItem {
  name: string,
  code: string,

}
@Component({
  selector: 'app-submission-shell',
  templateUrl: './submission-shell.component.html',
  styleUrls: ['./submission-shell.component.css']
})
export class SubmissionShellComponent implements OnInit {
  nameFilter: string = "";
  selectedStatusFilter: string;
  statuses: wordItem[];
  dataSource: StudentsAssignmentsDataSource;
  displayedColumns = ["student", "group", "timeStamp", "status", "grade", "progressValue", "isCheating"];
  constructor(private localStorageService: LocalStorageService, private classroomService: ClassroomService) {
    this.statuses = [{ name: "Any Status", code: "" }, { name: "Done", code: "Submission" }, { name: "Pending", code: "Pending" }];
  }

  ngOnInit() {
    this.dataSource = new StudentsAssignmentsDataSource(this.classroomService);
    this.dataSource.loadStudentsAssignments();
    // this.statuses.forEach(item => item.name = this.localStorageService.getItem("lang") === "en" ? item.enName : item.heName)
  }
  filterByStatus(event) {
    this.dataSource.loadStudentsAssignments(this.nameFilter, event.value.code);
  }
  searchStudents(value: string) {
    this.nameFilter = value;
    this.dataSource.loadStudentsAssignments(value);
  }
  onRowClicked(row) {
    console.log('Row clicked: ', row);
  }

}

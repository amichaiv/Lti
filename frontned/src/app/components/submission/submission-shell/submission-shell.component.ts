import { Component, OnInit, Input } from '@angular/core';


import { Assignment } from 'src/app/models/student-assignment.model';
import { MatTableDataSource } from '@angular/material';
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
  @Input() assignments: Assignment[];
  nameFilter: string = "";
  selectedStatusFilter: string;
  statuses: wordItem[];
  dataSource = new MatTableDataSource<Assignment>(this.assignments);
  displayedColumns = ["name", "group", "submissionTime", "status", "grade", "progressValue", "isCheated"];
  constructor() {
    this.statuses = [{ name: "Any Status", code: "" }, { name: "Done", code: "Submission" }, { name: "Pending", code: "Pending" }];
  }

  ngOnInit() {
    this.dataSource = new MatTableDataSource<Assignment>(this.assignments);

    // this.statuses.forEach(item => item.name = this.localStorageService.getItem("lang") === "en" ? item.enName : item.heName)
  }
  filterByStatus(event) {
    this.dataSource.data.filter(item => item.status === event.value.code)
  }
  searchStudents(value: string) {
    this.dataSource.filter = value.trim().toLowerCase();
  }
  onRowClicked(row) {
    console.log('Row clicked: ', row);
  }

}

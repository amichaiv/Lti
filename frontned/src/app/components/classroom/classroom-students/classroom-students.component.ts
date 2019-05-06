import { Component, OnInit, Input } from "@angular/core";
import { MatTableDataSource } from "@angular/material";
import { SelectionModel } from "@angular/cdk/collections";


import { Assignment } from 'src/app/models/student-assignment.model';
import { Store } from '@ngxs/store';

import { AssignmentsService } from 'src/app/services/assigments.service';

@Component({
  selector: "app-classroom-students",
  templateUrl: "./classroom-students.component.html",
  styleUrls: ["./classroom-students.component.css"]
})
export class ClassroomStudentsComponent implements OnInit {
  @Input() assignments: Assignment[];
  displayedColumns: string[] = ["select", "name", "budget", "consumed", "status"];
  selectedAssignemnts: Assignment[] = [];

  selection = new SelectionModel<Assignment>(
    true,
    this.selectedAssignemnts
  );
  dataSource;
  constructor(private service: AssignmentsService, private store: Store) {


  }

  ngOnInit() {

    this.dataSource = new MatTableDataSource<Assignment>(this.assignments);
  }

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected()
      ? this.selection.clear()
      : this.dataSource.data.forEach(row => this.selection.select(row));
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: Assignment): string {
    if (!row) {
      return `${this.isAllSelected() ? "select" : "deselect"} all`;
    }
    return `${
      this.selection.isSelected(row) ? "deselect" : "select"
      } row ${row.id + 1}`;
  }
}

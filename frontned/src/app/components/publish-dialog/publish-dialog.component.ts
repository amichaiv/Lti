import { Component, OnInit, Inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";

import { MatTableDataSource } from "@angular/material";

import { SelectionModel } from "@angular/cdk/collections";
import { TableElemant } from "../preferences/models/assignment-table.model";
import { Assignment } from 'src/app/models/student-assignment.model';

@Component({
  selector: "app-publish-dialog",
  templateUrl: "./publish-dialog.component.html",
  styleUrls: ["./publish-dialog.component.scss"]
})
export class PublishDialogComponent implements OnInit {


  isAssignmentsSelected: boolean;
  displayedColumns: string[] = ["select", "name", "email", "budget"];
  selectedAssignemnts: Assignment[] = [];
  selection = new SelectionModel<Assignment>(true, this.selectedAssignemnts);
  dataSource = new MatTableDataSource<Assignment>(
    this.data.assignments
  );

  constructor(public dialogRef: MatDialogRef<PublishDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
    this.isAssignmentsSelected = false;
  }

  close() {
    this.dialogRef.close();
  }

  handleAfterSelectStudents(value: boolean) {
    this.isAssignmentsSelected = value;
  }

  highlight(element: TableElemant) {
    element.highlighted = !element.highlighted;
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

}

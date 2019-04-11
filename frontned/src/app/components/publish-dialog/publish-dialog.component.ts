import { Component, OnInit, ViewChild } from "@angular/core";
import { MatDialogRef } from "@angular/material";
import { MenuItem } from "primeng/api";
import { MatPaginator, MatTableDataSource } from "@angular/material";
import { ELEMENT_DATA } from "src/app/mock-data";
import { SelectionModel } from "@angular/cdk/collections";

export interface TableElemant {
  name: string;
  student: string;
  email: string;
  budget: number;
  position: number;
  highlighted?: boolean;
  hovered?: boolean;
}

@Component({
  selector: "app-publish-dialog",
  templateUrl: "./publish-dialog.component.html",
  styleUrls: ["./publish-dialog.component.scss"]
})
export class PublishDialogComponent implements OnInit {
  isAssignmentsSelected: boolean;
  displayedColumns: string[] = ["select", "name", "student", "email", "budget"];
  selectedAssignemnts: TableElemant[] = [];
  selection = new SelectionModel<TableElemant>(true, this.selectedAssignemnts);
  dataSource = new MatTableDataSource<TableElemant>(ELEMENT_DATA);
  @ViewChild(MatPaginator) paginator: MatPaginator;
  constructor(public dialogRef: MatDialogRef<PublishDialogComponent>) {}

  ngOnInit() {
    this.isAssignmentsSelected = false;
    this.dataSource.paginator = this.paginator;
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
  checkboxLabel(row?: TableElemant): string {
    if (!row) {
      return `${this.isAllSelected() ? "select" : "deselect"} all`;
    }
    return `${
      this.selection.isSelected(row) ? "deselect" : "select"
    } row ${row.position + 1}`;
  }
}

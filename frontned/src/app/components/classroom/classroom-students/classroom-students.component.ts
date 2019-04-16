import { Component, OnInit, Input } from "@angular/core";
import { MatPaginator, MatTableDataSource } from "@angular/material";
import { SelectionModel } from "@angular/cdk/collections";
import { ClassroomService } from "src/app/services/classroom.service";
import { StudentsTableElement } from "../models/students-table.model";
import { Observable } from 'rxjs';
@Component({
  selector: "app-classroom-students",
  templateUrl: "./classroom-students.component.html",
  styleUrls: ["./classroom-students.component.css"]
})
export class ClassroomStudentsComponent implements OnInit {
  @Input() students: StudentsTableElement[];
  displayedColumns: string[] = ["select", "name", "budget", "consumed", "status"];
  selectedAssignemnts: StudentsTableElement[] = [];
  selection = new SelectionModel<StudentsTableElement>(
    true,
    this.selectedAssignemnts
  );
  dataSource;
  constructor(private service: ClassroomService) {
    this.service.getStudents().subscribe(data => this.dataSource = new MatTableDataSource<StudentsTableElement>(data))
  }

  ngOnInit() {

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
  checkboxLabel(row?: StudentsTableElement): string {
    if (!row) {
      return `${this.isAllSelected() ? "select" : "deselect"} all`;
    }
    return `${
      this.selection.isSelected(row) ? "deselect" : "select"
      } row ${row.position + 1}`;
  }
}

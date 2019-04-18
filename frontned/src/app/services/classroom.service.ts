import { Injectable } from "@angular/core";
import { TableElemant } from "../components/preferences/models/assignment-table.model";
import { StudentsTableElement } from "../components/classroom/models/students-table.model";
import { of, Observable } from 'rxjs';
import { debug } from 'util';
import { StudentAssignment } from '../models/student-assignment.model';
import { studentsAssignments } from '../models/mock-data';

const allStudents: number = 152;
const noOfTeachingAssistants: number = 0;
const noOfProjectGroups: number = 0;
const totalSpendings: number = 0;



@Injectable({
  providedIn: "root"
})
export class ClassroomService {
  students: StudentAssignment[] = studentsAssignments;
  constructor() { }

  getAllStudentsCount(): Observable<number> {
    return of(this.students.length
    );
  }

  getNoOfTeachingAssistants(): Observable<number> {
    return of(noOfTeachingAssistants);
  }

  getNoOfProjectGroups(): Observable<number> {
    return of(noOfProjectGroups);
  }

  getTotalSpendings(): Observable<number> {
    return of(totalSpendings);
  }

  getStudents(): Observable<StudentAssignment[]> {
    return of(this.students);
  }
}

import { Injectable } from "@angular/core";
import { TableElemant } from "../components/preferences/models/assignment-table.model";
import { StudentsTableElement } from "../components/classroom/models/students-table.model";
import { of, Observable } from 'rxjs';
import { debug } from 'util';
const allStudents: number = 152;
const noOfTeachingAssistants: number = 0;
const noOfProjectGroups: number = 0;
const totalSpendings: number = 0;
const students: StudentsTableElement[] = [
  {
    name: "Itay Yaffe",
    position: 1,
    budget: 150,
    consumed: 30,
    status: "Done",
    statusIcon: ""
  },
  {
    name: "Alex Pshul",
    position: 2,
    budget: 150,
    consumed: 67.58,
    status: "Done",
    statusIcon: ""
  },

  {
    name: "Amichai Vaknin",
    position: 3,
    budget: 150,
    consumed: 38,
    status: "Pending Acceptance",
    statusIcon: ""
  },
  {
    name: "Amir Segal",
    position: 4,
    budget: 150,
    consumed: 0,
    status: "Done",
    statusIcon: ""
  },
  {
    name: "Moti Hadash",
    position: 5,
    budget: 150,
    consumed: 47,
    status: "Pending Acceptance",
    statusIcon: ""
  }
];

@Injectable({
  providedIn: "root"
})
export class ClassroomService {
  constructor() { }

  getAllStudentsCount(): Observable<number> {
    return of(allStudents);
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

  getStudents(): Observable<StudentsTableElement[]> {
    return of(students);
  }
}

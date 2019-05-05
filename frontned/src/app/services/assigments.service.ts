import { Injectable } from '@angular/core';
import { Assignment } from '../models/student-assignment.model';

import { of, Observable } from 'rxjs';
import { HttpClient } from "@angular/common/http";
import { Store } from '@ngxs/store';

const noOfTeachingAssistants: number = 0;
const noOfProjectGroups: number = 0;
const totalSpendings: number = 0;

@Injectable({
  providedIn: 'root'
})
export class AssignmentsService {

  constructor(private http: HttpClient, private store: Store) { }
  getAssignmentData(assignmentGuid: string) {
    return this.http.get<any>("https://assignmentsmanager.azurewebsites.net/api/assignments/" + assignmentGuid);
  }

  getAllStudentsCount(): Observable<number> {
    return of(55);
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

}

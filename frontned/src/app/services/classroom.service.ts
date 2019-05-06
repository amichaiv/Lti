import { Injectable } from "@angular/core";

import { of, Observable } from 'rxjs';



const allStudents: number = 152;
const noOfTeachingAssistants: number = 0;
const noOfProjectGroups: number = 0;
const totalSpendings: number = 0;



@Injectable({
  providedIn: "root"
})
export class ClassroomService {

  constructor() { }



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

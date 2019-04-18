import { CollectionViewer, DataSource } from "@angular/cdk/collections";
import { StudentAssignment } from 'src/app/models/student-assignment.model';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { ClassroomService } from 'src/app/services/classroom.service';
import { catchError, finalize, map, tap } from 'rxjs/operators';
import { studentsAssignments } from 'src/app/models/mock-data';

export class StudentsAssignmentsDataSource implements DataSource<StudentAssignment>{
    private studentsSubject = new BehaviorSubject<StudentAssignment[]>([]);
    private loadingSubject = new BehaviorSubject<boolean>(false);
    private students: BehaviorSubject<StudentAssignment[]>;
    public loading$ = this.loadingSubject.asObservable();

    constructor(private classroomService: ClassroomService) { }

    connect(collectionViewer: CollectionViewer): Observable<StudentAssignment[]> {
        this.students = this.studentsSubject;
        return this.students.asObservable();
    }
    disconnect(collectionViewer: CollectionViewer): void {
        this.studentsSubject.complete();
        this.loadingSubject.complete();
    }

    loadStudentsAssignments(nameFilter: string = "", statusFilter: string = "") {

        this.loadingSubject.next(true);

        this.classroomService.getStudents().pipe(
            map((items: StudentAssignment[]) => items.filter(x => (x.name.toLowerCase().includes(nameFilter) && x.status.includes(statusFilter)))),
            catchError(() => of([])),
            finalize(() => this.loadingSubject.next(false))
        )
            .subscribe(students => this.studentsSubject.next(students))

    }
    searchStudents(name: string) {
        this.students.pipe(
            map((items: StudentAssignment[]) => items.filter(x => x.name.includes(name)))
        )
    }

}
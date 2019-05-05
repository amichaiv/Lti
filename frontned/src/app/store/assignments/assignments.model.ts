import { Assignment } from 'src/app/models/student-assignment.model';

export class AssignmentsStateModel {
    assignments: Assignment[];
    error: string;
    noOfStudents: number;
    totalConsumed: number;
    noOfTeachingAssistants: number;
    noOfProjectGroups: number;
}
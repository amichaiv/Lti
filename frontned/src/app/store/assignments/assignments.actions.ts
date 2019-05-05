import { Action } from '@ngxs/store';
import { Assignment } from 'src/app/models/student-assignment.model';


export class SetMembers {
    static readonly type = "[Assignemtns] Set Members";
    constructor(public payload: Assignment[]) { }

}

export class SetNoOfStudents {
    static readonly type = "[Assigments] Set Number Of Students";
    constructor(public payload: number) { }
}

export class SetTotalConsumed {
    static readonly type = "[Assigments] Set Total Consumed";
    constructor(public payload: number) { }
}

export class SetNoOfTeachingAssistants {
    static readonly type = "[Assigments] Set Number Of Teaching Assistants";
    constructor(public payload: number) { }
}

export class SetNoOfProjectGroups {
    static readonly type = "[Assigments] Set Number Of Project Groups";
    constructor(public payload: number) { }
}
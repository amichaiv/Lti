export class GetCourseName {
    static readonly type = "[App Start] Get Course Name";
    constructor(public payload: string) { }
}

export class SetUsername {
    static readonly type = "[App Start] Get User Name";
    constructor(public payload: string) { }
}

export class GetAssignmentInitialData {
    static readonly type = "[App Start] Get Assignment Initial Data";
}

export class SetUserType {
    static readonly type = "[App Start] Set User Type";
    constructor(public payload: number) { }
}
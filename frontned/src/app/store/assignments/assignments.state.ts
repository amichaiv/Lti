import { AssignmentsStateModel } from "./assignments.model";
import { State, Action, StateContext } from '@ngxs/store';
import { SetMembers, SetNoOfStudents } from './assignments.actions';
import { AssignmentsService } from 'src/app/services/assigments.service';

@State<AssignmentsStateModel>({
    name: "assignments",
    defaults: {
        assignments: [],
        error: "",
        noOfProjectGroups: 0,
        noOfStudents: 0,
        noOfTeachingAssistants: 0,
        totalConsumed: 0
    }
})

export class AssignmentsState {
    constructor(private service: AssignmentsService) { }

    @Action(SetMembers)
    loadAssignments(ctx: StateContext<AssignmentsStateModel>, { payload }: SetMembers) {
        ctx.patchState({
            assignments: payload
        });

    }
    @Action(SetNoOfStudents)
    SetNoOfStudents(ctx: StateContext<AssignmentsStateModel>, { payload }: SetNoOfStudents) {
        ctx.patchState({
            noOfStudents: payload
        });

    }



}


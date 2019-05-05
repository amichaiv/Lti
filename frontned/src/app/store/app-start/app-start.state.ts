import { AppStartStateModel } from "./app-start.model";
import { State, Action, StateContext, Selector, Store } from '@ngxs/store';
import { GetCourseName, GetUsername, GetAssignmentInitialData } from './app-start.actions';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { AssignmentsService } from 'src/app/services/assigments.service';
import { tap, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { SetMembers, SetNoOfStudents, SetNoOfTeachingAssistants, SetNoOfProjectGroups, SetTotalConsumed } from '../assignments/assignments.actions';

@State<AppStartStateModel>({
    name: "AppStart",
    defaults: {
        courseName: "",
        username: "",
        error: "",
        assignmentData: null
    }
})
export class AppStartState {
    constructor(private localStorageService: LocalStorageService, private assignmentsService: AssignmentsService, private store: Store) { }
    @Action(GetAssignmentInitialData)
    getAssignmentInitialData(ctx: StateContext<AppStartStateModel>) {
        return this.assignmentsService.getAssignmentData(this.localStorageService.getItem("assignmentGuid")).pipe(
            tap(data => {
                this.store.dispatch(new GetCourseName(data.name));
            }),
            catchError(err =>
                of(ctx.patchState({ error: err }))
            )
        )
    }

    @Action(GetCourseName)
    getCourseName(
        { patchState }: StateContext<AppStartStateModel>,
        { payload }: GetCourseName
    ) {
        patchState({
            courseName: payload
        });
    }

    @Action(GetUsername)
    getUserName(
        { patchState }: StateContext<AppStartStateModel>,
        { payload }: GetUsername
    ) {
        patchState({
            username: payload
        });
    }
}


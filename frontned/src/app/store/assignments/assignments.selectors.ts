import { Selector } from '@ngxs/store';
import { AssignmentsStateModel } from './assignments.model';
import { AssignmentsState } from './assignments.state';

export class AssignmentsStateSelectors {
    @Selector([AssignmentsState])
    static getAssignments(state: AssignmentsStateModel) {
        return state.assignments;
    }
    @Selector([AssignmentsState])
    static getError(state: AssignmentsStateModel) {
        return state.error;
    }
}
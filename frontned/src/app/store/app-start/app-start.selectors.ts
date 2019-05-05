import { AppStartStateModel } from './app-start.model';
import { Selector } from '@ngxs/store';
import { AppStartState } from './app-start.state';

export class AppStartStateSelectors {
    @Selector([AppStartState])
    static getUsername(state: AppStartStateModel) {
        return state.username;
    }

    @Selector([AppStartState])
    static getCourseName(state: AppStartStateModel) {
        return state.courseName;
    }
}
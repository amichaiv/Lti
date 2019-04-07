import { Selector, Action, StateContext, State } from "@ngxs/store";
import { SetCourseName, SetUserName } from "../actions/app.actions";

export class AppStateModel {
  courseName: string;
  username: string;
}

@State<AppStateModel>({
  name: "app",
  defaults: {
    courseName: "",
    username: ""
  }
})
export class AppState {
  @Selector()
  static getUsername(state: AppStateModel) {
    return state.username;
  }
  @Selector()
  static getCourseName(state: AppStateModel) {
    return state.courseName;
  }

  @Action(SetCourseName)
  setCourseName(
    { getState, patchState }: StateContext<AppStateModel>,
    { payload }: SetCourseName
  ) {
    const state = getState();
    patchState({
      courseName: payload
    });
  }

  @Action(SetUserName)
  setUserName(
    { getState, patchState }: StateContext<AppStateModel>,
    { payload }: SetUserName
  ) {
    const state = getState();
    patchState({
      username: payload
    });
  }
}

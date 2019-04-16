import { Selector, Action, StateContext, State } from "@ngxs/store";
import { SetCourseName, SetUserName } from "../actions/app.actions";
import { LocalStorageService } from "src/app/services/local-storage.service";

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
    { patchState }: StateContext<AppStateModel>,
    { payload }: SetCourseName
  ) {
    patchState({
      courseName: payload
    });
  }

  @Action(SetUserName)
  setUserName(
    { patchState }: StateContext<AppStateModel>,
    { payload }: SetUserName
  ) {
    patchState({
      username: payload
    });
  }
}

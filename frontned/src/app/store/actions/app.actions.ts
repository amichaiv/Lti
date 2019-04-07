export class SetUserName {
  static readonly type = "[App] Set Username";
  constructor(public payload: string) {}
}

export class SetCourseName {
  static readonly type = "[TUTORIAL] Set Course Name";
  constructor(public payload: string) {}
}

import { Component, OnInit } from "@angular/core";
import { Select, Store } from "@ngxs/store";
import { AppStateModel, AppState } from "src/app/store/state/app.state";
import { Observable } from "rxjs";
import { MatDialogRef, MatDialog } from "@angular/material";
import { PublishDialogComponent } from "../publish-dialog/publish-dialog.component";
import { LocalStorageService } from "src/app/services/local-storage.service";
import { SetCourseName, SetUserName } from "src/app/store/actions/app.actions";
import { Route } from "@angular/compiler/src/core";
import { Router } from "@angular/router";

@Component({
  selector: "app-app-header",
  templateUrl: "./app-header.component.html",
  styleUrls: ["./app-header.component.css"]
})
export class AppHeaderComponent implements OnInit {
  constructor(
    private store: Store,
    private localStorageService: LocalStorageService,
    private router: Router
  ) {}
  tabs: string[] = ["Preferences", "Dashboard", "Classroom"];

  @Select(AppState.getCourseName) courseName$: Observable<string>;
  @Select(AppState.getUsername) username$: Observable<string>;

  ngOnInit() {
    this.store.dispatch(
      new SetCourseName(this.localStorageService.getItem("coursename"))
    );
    this.store.dispatch(
      new SetUserName(this.localStorageService.getItem("username"))
    );
  }

  onTabChanges(e) {
    this.router.navigate(["/" + this.tabs[e.index]]);
  }
}

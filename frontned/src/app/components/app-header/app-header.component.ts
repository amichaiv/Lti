import { Component, OnInit } from "@angular/core";
import { Select, Store } from "@ngxs/store";

import { Observable } from "rxjs";

import { LocalStorageService } from "src/app/services/local-storage.service";


import { Router } from "@angular/router";

import { AppStartStateSelectors } from 'src/app/store/app-start/app-start.selectors';
import { GetCourseName, GetUsername, GetAssignmentInitialData } from 'src/app/store/app-start/app-start.actions';

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
  ) { }
  tabs: string[] = ["Preferences", "Dashboard", "Classroom"];

  @Select(AppStartStateSelectors.getCourseName) courseName$: Observable<string>;
  @Select(AppStartStateSelectors.getUsername) username$: Observable<string>;

  ngOnInit() {
    this.store.dispatch(
      new GetCourseName(this.localStorageService.getItem("coursename"))
    );
    this.store.dispatch(
      new GetUsername(this.localStorageService.getItem("username"))
    );
    this.store.dispatch(new GetAssignmentInitialData())
  }



}

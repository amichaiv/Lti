import {
  Resolve,
  ActivatedRouteSnapshot,
  ActivatedRoute,
  Router
} from "@angular/router";
import { Injectable } from "@angular/core";
import { Store } from "@ngxs/store";
import { SetUserName, SetCourseName } from "./store/actions/app.actions";

@Injectable()
export class AppResolver implements Resolve<any> {
  constructor(private router: Router, private store: Store) {}
  resolve(route: ActivatedRouteSnapshot) {
    this.store.dispatch(
      new SetCourseName(route.queryParamMap.get("coursename"))
    );
    this.store.dispatch(new SetUserName(route.queryParamMap.get("username")));
    this.router.navigate([""]);
  }
}

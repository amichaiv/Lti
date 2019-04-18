import { Injectable } from "@angular/core";
import {
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router,
  Params
} from "@angular/router";
import { Observable } from "rxjs";
import { CanActivate } from "@angular/router";
import { Store } from "@ngxs/store";
import { SetCourseName, SetUserName } from "./store/actions/app.actions";
import { LocalStorageService } from "./services/local-storage.service";
import { TranslateService } from './services/translate.service';

@Injectable({
  providedIn: "root"
})
export class AppGuard implements CanActivate {
  coursename: string;
  username: string;
  constructor(
    private store: Store,
    private localStorageService: LocalStorageService,
    private router: Router,
    private translate: TranslateService
  ) { }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    if (route.queryParamMap.get("coursename")) {
      //when we go to production change this to paramMap
      this.translate.use(route.queryParamMap.get("lang")).then(() => console.log(this.translate.data))
      this.localStorageService.setItem(
        "coursename",
        route.queryParamMap.get("coursename")
      );
      this.localStorageService.setItem(
        "lang",
        route.queryParamMap.get("lang")
      );
      this.localStorageService.setItem(
        "username",
        route.queryParamMap.get("username")
      );
      this.router.navigateByUrl("");
    }
    return true;
  }
}

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

import { LocalStorageService } from "./services/local-storage.service";
import { TranslateService } from './services/translate.service';

@Injectable({
  providedIn: "root"
})
export class AppGuard implements CanActivate {
  coursename: string;
  username: string;
  constructor(private localStorageService: LocalStorageService, private router: Router, private translate: TranslateService) { }
  canActivate(route: ActivatedRouteSnapshot): boolean {
    if (route.queryParamMap.get("assignmentGuid")) {
      //when we go to production change this to paramMap
      this.translate.use("en");
      this.localStorageService.setItem(
        "assignmentGuid",
        route.queryParamMap.get("assignmentGuid")
      );
      this.localStorageService.setItem(
        "userId",
        route.queryParamMap.get("userId")
      );

      this.router.navigateByUrl("");
    }
    return true;
  }
}

import { Component } from "@angular/core";
import { Select } from "@ngxs/store";
import { AppStateModel, AppState } from "src/app/store/state/app.state";
import { Observable } from "rxjs";

@Component({
  selector: "app-app-header",
  templateUrl: "./app-header.component.html",
  styleUrls: ["./app-header.component.css"]
})
export class AppHeaderComponent {
  @Select(AppState.getCourseName) courseName$: Observable<string>;

  handlePublishClick() {
    console.log("publish clicked");
  }
}

import { Component } from "@angular/core";
import { Select } from "@ngxs/store";
import { AppStateModel, AppState } from "src/app/store/state/app.state";
import { Observable } from "rxjs";
import { MatDialogRef, MatDialog } from "@angular/material";
import { PublishDialogComponent } from "../publish-dialog/publish-dialog.component";

@Component({
  selector: "app-app-header",
  templateUrl: "./app-header.component.html",
  styleUrls: ["./app-header.component.css"]
})
export class AppHeaderComponent {
  constructor(private dialog: MatDialog) {}
  publishDialogRef: MatDialogRef<PublishDialogComponent>;
  @Select(AppState.getCourseName) courseName$: Observable<string>;

  handlePublishClick() {
    console.log("publish clicked");
  }

  openPublishDialog() {
    this.publishDialogRef = this.dialog.open(PublishDialogComponent);
    this.publishDialogRef.afterClosed().subscribe();
  }
}

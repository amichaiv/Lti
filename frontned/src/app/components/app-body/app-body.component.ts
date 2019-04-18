import { Component, OnInit } from "@angular/core";
import { MatDialogRef, MatDialog } from "@angular/material";
import { PublishDialogComponent } from "../publish-dialog/publish-dialog.component";
import { TranslateService } from 'src/app/services/translate.service';

@Component({
  selector: "app-app-body",
  templateUrl: "./app-body.component.html",
  styleUrls: ["./app-body.component.css"]
})
export class AppBodyComponent implements OnInit {
  publishDialogRef: MatDialogRef<PublishDialogComponent>;
  constructor(private dialog: MatDialog, private translate: TranslateService) { }

  ngOnInit() { }
  openPublishDialog() {
    this.publishDialogRef = this.dialog.open(PublishDialogComponent);
    this.publishDialogRef.afterClosed().subscribe();
  }
  handlePreviewClick() {
    this.translate.use('he').then(() => {
      console.log(this.translate.data);
    });
  }
}

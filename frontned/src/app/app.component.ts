import { Component } from "@angular/core";
import { TranslateService } from "./services/translate.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent {
  appDirectionIsRtl: boolean = false;
  constructor(private translate: TranslateService) {}

  setLang(lang: string) {
    lang === "he"
      ? (this.appDirectionIsRtl = true)
      : (this.appDirectionIsRtl = false);
    this.translate.use(lang);
  }

  isRtl() {
    return true;
  }
}

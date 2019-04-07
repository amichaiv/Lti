import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

@Component({
  selector: "app-preferences-shell",
  templateUrl: "./preferences-shell.component.html",
  styleUrls: ["./preferences-shell.component.css"]
})
export class PreferencesShellComponent implements OnInit {
  menuItems: string[] = ["General", "Add_File", "Resources"];
  constructor(private router: Router) {}

  ngOnInit() {}

  onTabOpen(e) {
    this.router.navigate([this.menuItems[e.index]]);
  }
}

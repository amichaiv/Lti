import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

interface menuItem {
  value: string;
  key: string;
}
@Component({
  selector: "app-preferences-shell",
  templateUrl: "./preferences-shell.component.html",
  styleUrls: ["./preferences-shell.component.css"]
})
export class PreferencesShellComponent implements OnInit {
  menuItems: menuItem[] = [];
  test: string;
  constructor(private router: Router) {}

  ngOnInit() {}
}

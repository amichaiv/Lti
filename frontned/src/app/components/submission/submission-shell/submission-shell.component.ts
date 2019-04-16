import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-submission-shell',
  templateUrl: './submission-shell.component.html',
  styleUrls: ['./submission-shell.component.css']
})
export class SubmissionShellComponent implements OnInit {
  statusFilter: string = "any";
  constructor() { }

  ngOnInit() {
  }

  filterByStatus(value) {
    console.log(value);
  }

}

import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard-shell',
  templateUrl: './dashboard-shell.component.html',
  styleUrls: ['./dashboard-shell.component.css']
})
export class DashboardShellComponent implements OnInit {
  totalSubmissions: number;
  totalStudents: number;
  submissionPercentage: number;
  totalConsumed: number;
  totalBudget: number;
  consumedPercentage: number;
  noOfActiveGroups: number;
  noOfPendingGroups: number;
  totalStarted: number;

  constructor() {

  }

  ngOnInit() {
    this.totalStudents = 35;
    this.totalSubmissions = 12;
    this.submissionPercentage = this.totalSubmissions / this.totalStudents;
    this.totalConsumed = 300;
    this.totalBudget = 1000;
    this.consumedPercentage = this.totalConsumed / this.totalBudget;
    this.noOfActiveGroups = 10;
    this.noOfPendingGroups = 2;
    this.totalStarted = 4;

  }

}

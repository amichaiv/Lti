import { Component, OnInit, Input } from '@angular/core';


@Component({
  selector: 'app-doughnut-chart',
  templateUrl: './doughnut-chart.component.html',
  styleUrls: ['./doughnut-chart.component.css']
})
export class DoughnutChartComponent implements OnInit {
  data: any;
  @Input() totalSubmissions: number;
  @Input() totalStudents: number;
  @Input() totalStarted: number;
  constructor() {

  }

  ngOnInit() {
    this.data = {
      labels: ['Submitted', 'Started', 'Not Started'],
      datasets: [
        {
          data: [this.totalSubmissions, this.totalStarted, this.totalStudents - this.totalSubmissions - this.totalStarted],
          backgroundColor: [
            "#cadcf8",
            "#eac16f",
            "#98e2c8"
          ],
          hoverBackgroundColor: [
            "#cadcf8",
            "#eac16f",
            "#98e2c8"
          ]
        }]
    };
  }



}

import { Component, ElementRef, Input, OnDestroy, OnInit } from '@angular/core';
import { DataService } from '../../data.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-block-chart',
  templateUrl: './block-chart.component.html',
  styleUrls: ['./block-chart.component.css']
})
export class BlockChartComponent implements OnInit, OnDestroy {

  @Input() dataSource: string;

  private subscription = new Subject();

  chart: any;

  constructor(private dataService: DataService, private elRef: ElementRef) { }

  ngOnInit() {
    this.dataService.getValue(this.dataSource)
      .pipe(takeUntil(this.subscription))
      .subscribe((val) => {
        if (this.chart) {
          this.chart.data.labels.push(val.timestamp);
          this.chart.data.datasets[0].data.push(val.value);
          this.chart.update();
        }
      });

    this.chart = new Chart('canvas', {
      type: 'line',
      data: {
        labels: [],
        datasets: [
          {
            data: [],
            borderColor: '#3cba9f',
            fill: false
          }
        ]
      },
      options: {
        legend: { display: false },
        scales: {
          xAxes: [{ display: true }],
          yAxes: [{ display: true }],
        }
      }
    });
  }

  ngOnDestroy() {
    this.subscription.next();
    this.subscription.complete();
    this.chart.destroy();
  }

}

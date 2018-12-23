import { Component, ElementRef, Input, OnDestroy, OnInit } from '@angular/core';
import { DataService } from '../../data.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-block-table',
  templateUrl: './block-table.component.html',
  styleUrls: ['./block-table.component.css'],
})
export class BlockTableComponent implements OnInit, OnDestroy {

  @Input() dataSource: string;

  private internalValues: any[] = [];
  private subscription = new Subject();

  constructor(private dataService: DataService, private elRef: ElementRef) { }

  ngOnInit() {
    this.dataService.getValue(this.dataSource)
      .pipe(takeUntil(this.subscription))
      .subscribe((val) => {
        this.internalValues.push(val);
        if (this.internalValues.length > 10) {
          this.internalValues.shift();
        }
      });
  }

  ngOnDestroy() {
    this.subscription.next();
    this.subscription.complete();
  }

}

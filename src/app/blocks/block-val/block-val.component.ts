import { Component, ElementRef, Input, OnDestroy, OnInit } from '@angular/core';
import { DataService } from '../../data.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-block-val',
  templateUrl: './block-val.component.html',
  styleUrls: ['./block-val.component.css'],
})
export class BlockValComponent implements OnInit, OnDestroy {

  @Input() dataSource: string;

  private value = { timestamp: 0, value: 0 };
  private subscription = new Subject();

  constructor(private dataService: DataService, private elRef: ElementRef) { }

  ngOnInit() {
    this.dataService.getValue(this.dataSource)
      .pipe(takeUntil(this.subscription))
      .subscribe(val => this.value = val);
  }

  ngOnDestroy() {
    this.subscription.next();
    this.subscription.complete();
  }

}

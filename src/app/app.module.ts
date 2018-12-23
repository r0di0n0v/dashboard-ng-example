import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

// @ts-ignore
import { WebsocketModule } from 'wsmodule/websocket.module';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BlockValComponent } from './blocks/block-val/block-val.component';
import { BlockTableComponent } from './blocks/block-table/block-table.component';
import { BlockChartComponent } from './blocks/block-chart/block-chart.component';
import { TwoSlotTmplComponent } from './templates/two-slot-tmpl/two-slot-tmpl.component';
import { ThreeSlotTmplComponent } from './templates/three-slot-tmpl/three-slot-tmpl.component';
import { MainComponent } from './pages/main/main.component';
import { AdminComponent } from './pages/admin/admin.component';

@NgModule({
  declarations: [
    AppComponent,
    BlockValComponent,
    BlockTableComponent,
    BlockChartComponent,
    TwoSlotTmplComponent,
    ThreeSlotTmplComponent,
    MainComponent,
    AdminComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    WebsocketModule.config({
      url: 'ws://127.0.0.1:8080',
    }),
  ],
  entryComponents: [
    BlockValComponent,
    BlockTableComponent,
    BlockChartComponent,
    TwoSlotTmplComponent,
    ThreeSlotTmplComponent,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

import { Injectable } from '@angular/core';
// @ts-ignore
import { WebsocketService } from 'wsmodule/websocket.service';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  /**
   * Список всех доступных источников данных
   */
  dataSourceList = DataSourceList.dataSources;

  /**
   * Список активных источников данных
   */
  activeDataSources = {};

  constructor(private wsService: WebsocketService) { }

  getValue(dataSourceName: string): Observable<IMessage> {
    return this.initDataSource(dataSourceName);
  }

  /**
   * Получение источника данных
   * и инициализация при его отсутствии
   */
  initDataSource(dataSourceName: string): Observable<IMessage> {
    if (typeof this.activeDataSources[dataSourceName] === 'undefined') {
      this.activeDataSources[dataSourceName] = {
        emitter: setInterval(() => {
          this.wsService.send(dataSourceName, this.dataSourceList[dataSourceName].value());
        }, 3000),
        receiver: this.wsService.on<IMessage[]>(dataSourceName),
      };
    }
    return this.activeDataSources[dataSourceName].receiver;
  }

}

/**
 * Сообщение
 */
export interface IMessage {
  timestamp: number;
  value: number;
}

/**
 * Список всех доступных источников данных
 */
export class DataSourceList {
  static dataSources = {
    'ds1': {
      id: 'ds1',
      label: 'Источник 1 (дробные)',
      value: () => {
        return {
          value: parseFloat(Math.random().toFixed(2)),
          timestamp: (new Date().getTime()),
        };
      },
    },
    'ds2':  {
      id: 'ds2',
      label: 'Источник 2 (max 10000)',
      value: () => {
        return {
          value: Math.round(Math.random() * 10000),
          timestamp: (new Date().getTime()),
        };
      },
    },
    'ds3':  {
      id: 'ds3',
      label: 'Источник 3 (max 100)',
      value: () => {
        return {
          value: parseFloat((Math.random() * 100).toFixed(2)),
          timestamp: (new Date().getTime()),
        };
      },
    },
  };
}

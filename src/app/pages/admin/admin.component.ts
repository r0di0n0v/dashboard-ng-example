import { Component, ViewChild, ViewContainerRef } from '@angular/core';
import TemplateList from '../../templates/template-list.component';
import BlockList from '../../blocks/block-list.component';
import { DataSourceList } from '../../data.service';


@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent {

  /**
   * Активный дашборд
   */
  activeDash = -1;

  /**
   * Список дашбордов
   */
  dashList: DashCfg[] = [];

  /**
   * Ошибка
   */
  error: string;

  /**
   * Редактируемый шаблон
   */
  dashEditIndex: number;

  /**
   * Название дашборда
   */
  dashLabel: string;

  /**
   * Шаблон дашборда
   */
  dashTmpl: string;

  /**
   * Выбраный блок
   */
  dashBlockVal = {};

  /**
   * Выбраный источник данных
   */
  dashSourceVal = {};

  /**
   * Список шаблонов
   */
  dashTmplList = Object.values(TemplateList);
  dashTmplObj = TemplateList;

  /**
   * Список слотов шаблона
   */
  dashTmplSlots = [];

  /**
   * Список блоков
   */
  dashBlockList = Object.values(BlockList);

  /**
   * Список источников данных
   */
  dashSourceList = Object.values(DataSourceList.dataSources);

  @ViewChild('blocksConfigSlot', { read: ViewContainerRef }) container;

  constructor() {
    // load dash list
    try {
      const list = JSON.parse(localStorage.getItem('dashList'));
      if (Array.isArray(list)) {
        this.dashList = list;
      }
    } catch (e) {
      console.error(e);
    }
    // load active dash
    try {
      const active = JSON.parse(localStorage.getItem('activeDash'));
      if (typeof active === 'number' && typeof this.dashList[active] === 'object') {
        this.activeDash = active;
      }
    } catch (e) {
      console.error(e);
    }
  }

  /**
   * Сохранение активного дашборда
   */
  saveActiveDash() {
    localStorage.setItem('activeDash', JSON.stringify(this.activeDash));
  }

  /**
   * Сохранение списка дашбордов
   */
  saveDashList() {
    localStorage.setItem('dashList', JSON.stringify(this.dashList));
  }

  /**
   * Удаление дашборда из списка
   */
  rmDash(index: number) {
    this.dashList.splice(index, 1);
    this.saveDashList();
    if (this.activeDash === index) {
      this.activeDash = -1;
      this.saveActiveDash();
    }
  }

  /**
   * Сохраниение дашборда
   */
  addDash() {
    const newDash = new DashCfg();
    newDash.label = this.dashLabel;
    newDash.tmpl = this.dashTmpl;
    newDash.blocks = {};

    let count = 0;
    for (const slot of this.dashTmplSlots) {
      if (
        typeof this.dashSourceVal[slot] !== 'undefined'
        && typeof this.dashBlockVal[slot] !== 'undefined'
      ) {
        newDash.blocks[slot] = new BlockCfg();
        newDash.blocks[slot].blockType = this.dashBlockVal[slot];
        newDash.blocks[slot].dataSource = this.dashSourceVal[slot];
        count += 1;
      }
    }

    if (count > 0 && typeof newDash.label === 'string' && newDash.label.length > 0) {
      if (this.dashEditIndex >= 0) {
        this.dashList[this.dashEditIndex] = newDash;
      } else {
        this.dashList.push(newDash);
      }
      this.saveDashList();
    } else if (typeof newDash.label !== 'string' || newDash.label.length === 0) {
      this.error = 'Введите название шаблона';
    } else if (count === 0) {
      this.error = 'Ни один слот не сконфигурирован полностью';
    }
  }

  /**
   * Редактирование дашборда
   */
  editDash(index: number) {
    this.clearDash();
    this.dashEditIndex = index;
    const dash = this.dashList[index];
    this.dashLabel = dash.label;
    this.dashTmpl = dash.tmpl;
    this.changeTemplate(dash.tmpl);
    for (const slot of this.dashTmplSlots) {
      if (dash.blocks[slot]) {
        this.dashBlockVal[slot] = dash.blocks[slot].blockType;
        this.dashSourceVal[slot] = dash.blocks[slot].dataSource;
      }
    }
  }

  /**
   * Очистка формы редактирования дашборда
   */
  clearDash() {
    this.dashLabel = null;
    this.dashTmpl = null;
    this.dashSourceVal = {};
    this.dashBlockVal = {};
    this.changeTemplate(null);
    this.dashEditIndex = null;
  }

  /**
   * Установка активного дашборда
   */
  setActiveDash(index: number) {
    this.activeDash = index;
    this.saveActiveDash();
  }

  /**
   * Получение списка слотов выбранного шаблона
   */
  changeTemplate(tmpl: string) {
    const templateObj = TemplateList[tmpl];
    const slots = templateObj ? TemplateList[tmpl].component.getSlots() : [];
    this.dashTmplSlots = slots;
  }
}

class DashCfg {
  label: string;
  tmpl: string;
  blocks: {[key: string]: BlockCfg};
}

class BlockCfg {
  blockType: string;
  dataSource: string;
}

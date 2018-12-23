import {
  Component,
  ComponentFactoryResolver,
  OnInit,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import TemplateList from '../../templates/template-list.component';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  @ViewChild('tmplSlot', { read: ViewContainerRef }) container;

  /**
   * Шаблон в дашборде
   */
  currentTemplate = 'tmpl1';

  /**
   * Название дашборда
   */
  currentDashLabel = '';

  /**
   * Список дашбордов
   */
  dashList = [];

  /**
   * Активный дашборда
   */
  activeDash: number;

  /**
   * Ошибка
   */
  error: string;

  initTemplate() {
    const dash = this.dashList[this.activeDash];
    this.currentTemplate = dash.tmpl;
    this.currentDashLabel = dash.label;

    this.container.clear();
    const currentTemplateComponent = TemplateList[this.currentTemplate].component;

    const componentFactory = this.resolver.resolveComponentFactory(currentTemplateComponent);
    const componentRef = this.container.createComponent(componentFactory);
    componentRef.instance.config = dash.blocks;
  }

  constructor(private resolver: ComponentFactoryResolver) {
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

  ngOnInit() {
    if (typeof this.dashList[this.activeDash] === 'undefined') {
      this.error = 'Нет активных дашбордов';
    } else {
      this.error = null;
    }

    if (!this.error) {
      this.initTemplate();
    }
  }

}

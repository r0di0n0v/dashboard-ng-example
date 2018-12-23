import {
  Component,
  ComponentFactoryResolver,
  Input,
  OnInit,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import BlockList from '../../blocks/block-list.component';

@Component({
  selector: 'app-two-slot-tmpl',
  templateUrl: './two-slot-tmpl.component.html',
  styleUrls: ['./two-slot-tmpl.component.css']
})
export class TwoSlotTmplComponent implements OnInit {

  /**
   * Конфигурация слотов в шаблоне
   */
  @Input() config;

  /**
   * Слоты
   */
  @ViewChild('slot_1', { read: ViewContainerRef }) slot_1;
  @ViewChild('slot_2', { read: ViewContainerRef }) slot_2;

  constructor(private resolver: ComponentFactoryResolver) { }

  /**
   * Получение списка слотов в шаблоне
   */
  public static getSlots() {
    return [
      'slot_1',
      'slot_2',
    ];
  }

  /**
   * Инициализация слотов
   */
  initBlocks() {
    if (typeof this.config === 'object' && this.config !== null) {
      for (const slot in this.config) {
        const {blockType, dataSource} = this.config[slot];
        this[slot].clear();
        const blockComponent = BlockList[blockType].component;

        const componentFactory = this.resolver.resolveComponentFactory(blockComponent);
        const componentRef = this[slot].createComponent(componentFactory);
        componentRef.instance.dataSource = dataSource;
      }
    }
  }

  ngOnInit() {
    this.initBlocks();
  }
}

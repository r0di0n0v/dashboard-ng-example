import {
  Component,
  ComponentFactoryResolver,
  Input,
  OnInit,
  Renderer2,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import BlockList from '../../blocks/block-list.component';

@Component({
  selector: 'app-three-slot-tmpl',
  templateUrl: './three-slot-tmpl.component.html',
  styleUrls: ['./three-slot-tmpl.component.css']
})
export class ThreeSlotTmplComponent implements OnInit {

  /**
   * Конфигурация слотов в шаблоне
   */
  @Input() config;

  /**
   * Слоты
   */
  @ViewChild('slot_1', { read: ViewContainerRef }) slot_1;
  @ViewChild('slot_2', { read: ViewContainerRef }) slot_2;
  @ViewChild('slot_3', { read: ViewContainerRef }) slot_3;

  constructor(private resolver: ComponentFactoryResolver, private renderer: Renderer2) { }

  /**
   * Получение списка слотов в шаблоне
   */
  public static getSlots() {
    return [
      'slot_1',
      'slot_2',
      'slot_3',
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

        this.renderer.appendChild(
          this[slot].element.nativeElement,
          componentRef.injector.get(blockComponent).elRef.nativeElement
        );
      }
    }
  }

  ngOnInit() {
    this.initBlocks();
  }

}

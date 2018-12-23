
import { BlockValComponent } from './block-val/block-val.component';
import { BlockTableComponent } from './block-table/block-table.component';
import { BlockChartComponent } from './block-chart/block-chart.component';

export default {
    'BlockVal': {
        id: 'BlockVal',
        label: 'Число',
        component: BlockValComponent,
    },
    'BlockTable': {
        id: 'BlockTable',
        label: 'Таблица',
        component: BlockTableComponent,
    },
    'BlockChart': {
        id: 'BlockChart',
        label: 'График',
        component: BlockChartComponent,
    },
};



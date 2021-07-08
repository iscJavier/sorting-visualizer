import Sorter from './types';
import * as bubble from './bubble';
import * as counting from './counting';

const sorters: Sorter[] = [
  {
    name: 'Counting Sort',
    columnColor: counting.columnColor,
    stepSort: counting.stepSort,
  },
  {
    name: 'Bubble Sort',
    columnColor: bubble.columnColor,
    stepSort: bubble.stepSort,
  },
];

export default sorters;

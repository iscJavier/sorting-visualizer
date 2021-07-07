import Sorter, { ColumnColorGetter, StepSort } from './types';
import { SortingColors, SortingVisualizerState } from '../types';
import sleep from '../../../Utils/sleep';

const columnColor: ColumnColorGetter = (
  state: SortingVisualizerState,
  columnIndex: number,
  colors: SortingColors
) => {
  const [array, limit, current, next] = [
    state.arr,
    state.i,
    state.j,
    state.j + 1,
  ];
  if (columnIndex >= limit) {
    return colors.Completed;
  }
  if (
    (columnIndex === current && array[current] > array[next]) ||
    (columnIndex === next && array[next] > array[current])
  ) {
    return colors.Max;
  }
  if (columnIndex === current || columnIndex === next) {
    return colors.Current;
  }
  return colors.Unsorted;
};

const stepSort: StepSort = async (state: SortingVisualizerState) => {
  const { arr, i, j, id } = state;
  if (i < 1) {
    return new Promise<SortingVisualizerState>((_) => ({ arr, i, j, id }));
  }
  if (arr[j] > arr[j + 1]) {
    const tmp = arr[j];
    arr[j] = arr[j + 1];
    arr[j + 1] = tmp;
  }

  let newI = i;
  let newJ = j;
  if (j + 1 >= i - 1) {
    newJ = 0;
    newI--;
  } else {
    newJ++;
  }

  await sleep();
  return Promise.resolve<SortingVisualizerState>({
    arr,
    i: newI,
    j: newJ,
    id,
  });
};

const name = "Bubble Sort";

const bubbleSort: Sorter = { stepSort, columnColor, name};

export default bubbleSort;

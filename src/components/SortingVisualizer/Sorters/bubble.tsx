import { ColumnColorGetter, StepSort } from './types';
import { SortingColors, SortingVisualizerState } from '../types';

export const columnColor: ColumnColorGetter = (
  state: SortingVisualizerState,
  columnIndex: number,
  colors: SortingColors
) => {
  const { array, limit, current } = state;
  const next = current + 1;
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

export const stepSort: StepSort = (state: SortingVisualizerState) => {
  console.log('sorting');
  const { array, limit, current, id } = state;
  const next = current + 1;

  if (limit < 1) {
    return { array, limit, current, id, finished: true };
  }
  if (array[current] > array[next]) {
    const tmp = array[current];
    array[current] = array[next];
    array[next] = tmp;
  }

  let newLimit = limit;
  let newCurrent = current;
  if (next >= limit - 1) {
    newCurrent = 0;
    newLimit--;
  } else {
    newCurrent++;
  }

  return { array, limit: newLimit, current: newCurrent, id, finished: false };
};

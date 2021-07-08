import { ColumnColorGetter, StepSort } from './types';
import { SortingColors, SortingVisualizerState } from '../types';

let max: { value: number; found: boolean };
let count: { array: number[]; finished: boolean };
let sorted: number[];
let prevId: number;

const reset = () => {
  max = { value: 0, found: false };
  count = { array: [], finished: false };
};

const isNewSorter = (sorterId: number) => {
  return prevId !== sorterId;
};

reset();

export const columnColor: ColumnColorGetter = (
  state: SortingVisualizerState,
  columnIndex: number,
  colors: SortingColors
) => {
  const { array, current } = state;
  const value = array[columnIndex];

  if (!max.found) {
    return columnIndex === current
      ? value >= max.value
        ? colors.Max
        : colors.Current
      : colors.Unsorted;
  }

  if (!count.finished) {
    return columnIndex === current ? colors.Current : colors.Unsorted;
  }

  return columnIndex <= current ? colors.Completed : colors.Unsorted;
};

export const stepSort: StepSort = (state: SortingVisualizerState) => {
  const { array, limit, current, id } = state;
  const next = current + 1;

  if (isNewSorter(id)) {
    prevId = id;
    reset();
  }
  if (state.finished) {
    return { array, limit, current, id, finished: true };
  } else if (!max.found) {
    max.value = max.value > array[current] ? max.value : array[current];
    let newCurrent = next;
    if (current === limit - 1) {
      max.found = true;
      count = {
        array: Array.from({ length: max.value + 1 }, () => 0),
        finished: false,
      };
      sorted = Array.from({ length: array.length }, () => 0);
      newCurrent = 0;
    }
    return { array, limit, current: newCurrent, id, finished: false };
  } else if (!count.finished) {
    const value = array[current];
    count.array[value] += 1;
    let newCurrent = next;
    if (current === limit - 1) {
      count.finished = true;
      newCurrent = 0;
      for (let i = 1; i < count.array.length; i++) {
        count.array[i] += count.array[i - 1];
      }
      for (let i = array.length - 1; i >= 0; i--) {
        sorted[count.array[array[i]] - 1] = array[i];
        count.array[array[i]] -= 1;
      }
    }
    return { array, limit, current: newCurrent, id, finished: false };
  } else {
    array[current] = sorted[current];

    const finished = max.found && count.finished && current === limit - 1;

    return { array, limit, current: finished ? current : next, id, finished };
  }
};

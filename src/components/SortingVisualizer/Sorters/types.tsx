import { SortingColors, SortingVisualizerState } from '../types';

export type StepSort = (state: SortingVisualizerState) => SortingVisualizerState;

export type ColumnColorGetter = (
  state: SortingVisualizerState,
  columnIndex: number,
  colors: SortingColors
) => string;

type Sorter = {
  stepSort: StepSort;
  columnColor: ColumnColorGetter;
  name: string;
};

export default Sorter;

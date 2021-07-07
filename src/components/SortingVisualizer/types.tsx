import Sorter from './Sorters/types';

export type SortingVisualizerProps = {
  sorter: Sorter;
};

export type SortingVisualizerState = {
  arr: number[];
  i: number;
  j: number;
  id: number;
};

export type SortingColors = {
  Current: string;
  Max: string;
  Completed: string;
  Unsorted: string;
};

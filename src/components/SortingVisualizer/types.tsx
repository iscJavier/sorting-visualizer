import Sorter from './Sorters/types';

export type SortingVisualizerProps = {
  sorter: Sorter;
};

export type SortingVisualizerState = {
  array: number[];
  limit: number;
  current: number;
  id: number;
  finished: boolean;
};

export type SortingColors = {
  Current: string;
  Max: string;
  Completed: string;
  Unsorted: string;
};

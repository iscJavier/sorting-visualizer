import React, { useEffect, useState } from 'react';
import { randomIntArray } from '../../Utils/random';
import Sorter from './Sorters/types';
import styles from './sortingVisualizer.module.scss';
import {
  SortingVisualizerProps,
  SortingColors,
  SortingVisualizerState,
} from './types';

const sortingColors: SortingColors = {
  Current: 'dodgerblue',
  Max: 'navy',
  Completed: 'aquamarine',
  Unsorted: 'lightskyblue',
};

let previousSorter: Sorter;
let previousId: number;

const initialState: () => SortingVisualizerState = () => {
  const ARR_LENGTH = 50;
  const id = Math.random();
  previousId = id;
  return {
    arr: randomIntArray(ARR_LENGTH),
    i: ARR_LENGTH,
    j: 0,
    id,
  };
};

const SortingVisualizer = (props: SortingVisualizerProps) => {
  const [state, setState] = useState(() => {
    return initialState();
  });

  useEffect(() => {
    if (previousSorter !== undefined) {
      setState(initialState());
    }
    previousSorter = props.sorter;
  }, [props.sorter]);

  useEffect(() => {
    const asyncStepSort = async () => {
      const newState = await props.sorter.stepSort(state);
      if (newState.id === previousId) {
        setState(newState);
      }
    };
    asyncStepSort();
  }, [state, props.sorter]);

  const columnWidth = `calc(${100 / state.arr.length}% - 2px)`;
  const columns = state.arr.map((x, columnIndex) => {
    const columnHeight = `calc(${x}% - 2px)`;
    const bgColor = props.sorter.columnColor(state, columnIndex, sortingColors);
    const columnStyle = {
      width: columnWidth,
      height: columnHeight,
      backgroundColor: bgColor,
    };
    return (
      <div key={columnIndex} className={styles.column} style={columnStyle} />
    );
  });

  return (
    <div>
      <div>
        <p>{props.sorter.name}</p>
      </div>
      <div className={styles.sortingVisualizer}>{columns}</div>
    </div>
  );
};

export default SortingVisualizer;

import React, { useEffect, useState } from 'react';
import { randomIntArray } from '../../Utils/random';
import sleep from '../../Utils/sleep';
import styles from './sortingVisualizer.module.scss';
import {
  SortingVisualizerProps,
  SortingColors,
  SortingVisualizerState,
} from './types';

const sortingColors: SortingColors = {
  Current: 'dodgerblue',
  Max: 'darkblue',
  Completed: 'aquamarine',
  Unsorted: 'lightskyblue',
};

let previousSorter: string;
let previousId: number;

const initialState: () => SortingVisualizerState = () => {
  const ARR_LENGTH = 50;
  const id = Math.random();
  const state = {
    array: randomIntArray(ARR_LENGTH),
    limit: ARR_LENGTH,
    current: 0,
    id,
    finished: false,
  };
  return state;
};

const SortingVisualizer = (props: SortingVisualizerProps) => {
  const [state, setState] = useState(() => {
    const init = initialState();
    previousId = init.id;
    return init;
  });

  useEffect(() => {
    if (previousSorter !== undefined) {
      const init = initialState();
      previousId = init.id;
      setState(init);
    }
    previousSorter = props.sorter.name;
  }, [props.sorter]);

  useEffect(() => {
    if (!state.finished) {
      const sleepSort = async () => {
        const newState = props.sorter.stepSort(state);
        if (newState.id === previousId) {
          await sleep();
          setState(newState);
        }
      };
      sleepSort();
    }
  }, [state, props.sorter]);

  const columnWidth = `calc(${100 / state.array.length}% - 2px)`;
  const columns = state.array.map((x, columnIndex) => {
    const columnHeight = `calc(${x}% - 2px)`;
    const bgColor = props.sorter.columnColor(state, columnIndex, sortingColors);
    const columnStyle = {
      width: columnWidth,
      height: columnHeight,
      backgroundColor: bgColor,
    };
    return (
      <div key={columnIndex} className={styles.column} style={columnStyle}>
        <span>{x}</span>
      </div>
    );
  });

  return (
    <div className={styles.sortingVisualizerContainer}>
      <div className={styles.sortingName}>
        <p>{props.sorter.name}</p>
      </div>
      <div className={styles.sortingVisualizer}>{columns}</div>
    </div>
  );
};

export default SortingVisualizer;

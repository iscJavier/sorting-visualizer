import React, { useState, useEffect } from 'react';
import styles from './Visualizer.module.scss';

type visualizerProps = {
  sort(state: visualizerState): Promise<visualizerState>;
  columnColor(
    state: visualizerState,
    columnIndex: number,
    colors: any
  ): string;
};

export type visualizerState = {
  arr: number[];
  i: number;
  j: number;
};

const randomIntArr = (length: number = 20) => {
  const min = 5;
  const max = 100;
  return Array.from({ length: length }, (v, k) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
  });
};
const ARR_LENGTH = 50;
enum Colors {
  Current = 'dodgerblue',
  NewMax = 'navy',
  Completed = 'aquamarine',
  Unsorted = 'lightskyblue',
}

const Visualizer = (props: visualizerProps) => {
  const [state, setState] = useState(() => {
    const initialState: visualizerState = {
      arr: randomIntArr(ARR_LENGTH),
      i: ARR_LENGTH,
      j: 0,
    };
    return initialState;
  });

  useEffect(() => {
    const asyncSort = async () => {
      const newState = await props.sort(state);
      if (newState.arr !== state.arr) {
        setState(newState);
      }
    };
    asyncSort();
  }, [state, props]);

  const columnWidth = `calc(${100 / state.arr.length}% - 2px)`;
  const columns = state.arr.map((x, columnIndex) => {
    const columnHeight = `calc(${x}% - 2px)`;
    const bgColor = props.columnColor(state, columnIndex, Colors);
    const columnStyle = {
      width: columnWidth,
      height: columnHeight,
      backgroundColor: bgColor,
    };
    return (
      <div key={columnIndex} className={styles.column} style={columnStyle} />
    );
  });

  return <div className={styles.visualizer}>{columns}</div>;
};

export default Visualizer;

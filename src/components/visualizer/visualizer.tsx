import React from 'react';
import styles from './visualizer.module.scss';

type visualizerProps = {};

const randomIntArr = (
  length: number = 20,
  min: number = 5,
  max: number = 100
) => {
  return Array.from({ length: length }, (v, k) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
  });
};

const visualizer = (props: visualizerProps) => {
  //TODO: dinamically set correct column width and height
  const arr = randomIntArr();
  const columnWidth = `calc(${100 / arr.length}% - 2px)`;
  const columns = arr.map((x, columnIndex) => {
    const columnHeight = `calc(${x}% - 2px)`;
    const columnStyle = {
      width: columnWidth,
      height: columnHeight,
    };
    return (
      <div key={columnIndex} className={styles.column} style={columnStyle}>
        {x}
      </div>
    );
  });

  return <div className={styles.visualizer}>{columns}</div>;
};

export default visualizer;

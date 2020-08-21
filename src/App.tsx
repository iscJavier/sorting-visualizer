import React from 'react';
import styles from './App.module.scss';
import Visualizer from './Components/Visualizer/Visualizer';
import bubbleSort, {
  bubbleSortColumnColor,
} from './Components/Visualizer/Sorters/bubbleSort';

function App() {
  return (
    <div className={styles.App}>
      <Visualizer sort={bubbleSort} columnColor={bubbleSortColumnColor} />
    </div>
  );
}

export default App;

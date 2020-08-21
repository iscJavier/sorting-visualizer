import React from 'react';
import styles from './App.module.scss';
import Visualizer from './components/visualizer/visualizer';

function App() {
  return (
    <div className={styles.App}>
      <Visualizer />
    </div>
  );
}

export default App;

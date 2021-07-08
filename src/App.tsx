import React, { useState } from 'react';
import style from './App.module.scss';

import bubbleSort from './Components/SortingVisualizer/Sorters/bubble';
import Sorter from './Components/SortingVisualizer/Sorters/types';
import SortingVisualizer from './Components/SortingVisualizer/sortingVisualizer';

function App() {
  const [selectedSorter, setSelectedSorter] = useState(bubbleSort);
  const sorters: Sorter[] = [bubbleSort];

  const sortersButtons = sorters.map((sorter, index) => (
    <button key={index} onClick={() => setSelectedSorter({ ...sorter })}>
      {sorter.name}
    </button>
  ));

  return (
    <div className={style.App}>
      <header className={style.AppHeader}>
        <p>Sorting Algorithms.</p>
        {sortersButtons}
      </header>
      <div className={style.AppBody}>
        <SortingVisualizer sorter={selectedSorter} />
      </div>
    </div>
  );
}

export default App;

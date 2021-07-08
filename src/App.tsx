import React, { useState } from 'react';
import style from './App.module.scss';

import sorters from './Components/SortingVisualizer/Sorters/all';
import SortingVisualizer from './Components/SortingVisualizer/sortingVisualizer';

function App() {
  const [selectedSorter, setSelectedSorter] = useState(sorters[0]);

  const sortersButtons = sorters.map((sorter, index) => (
    <button key={index} onClick={() => setSelectedSorter({ ...sorter })}>
      {sorter.name}
    </button>
  ));

  return (
    <div className={style.App}>
      <header className={style.AppHeader}>
        <div>Sorting Algorithms.</div>
        <div className={style.sorterButtons}>{sortersButtons}</div>
      </header>
      <div className={style.AppBody}>
        <SortingVisualizer sorter={selectedSorter} />
      </div>
    </div>
  );
}

export default App;

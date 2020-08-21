import { visualizerState } from '../Visualizer';
import sleep from '../../../Utils/sleep';

const debug_mult = 1;

export const bubbleSortColumnColor = (
  state: visualizerState,
  cIdx: number,
  Colors: any
) => {
  const [arr, limit, current, next] = [
    state.arr,
    state.i,
    state.j,
    state.j + 1,
  ];
  if (cIdx >= limit) return Colors.Completed;
  if (
    (cIdx === current && arr[current] > arr[next]) ||
    (cIdx === next && arr[next] > arr[current])
  )
    return Colors.NewMax;
  if (cIdx === current || cIdx === next) return Colors.Current;
  return Colors.Unsorted;
};

const bubbleSort = async (props: visualizerState) => {
  const [arr, i, j] = [props.arr, props.i, props.j];
  if (props.i < 1)
    return new Promise<visualizerState>((_) => ({
      arr: arr,
      i: i,
      j: j,
    }));

  if (arr[j] > arr[j + 1]) {
    const tmp = arr[j];
    arr[j] = arr[j + 1];
    arr[j + 1] = tmp;
  }

  let newI = i;
  let newJ = j;
  if (j + 1 >= i - 1) {
    newJ = 0;
    newI--;
  } else {
    newJ++;
  }

  await sleep(debug_mult * 100);
  return Promise.resolve<visualizerState>({
    arr: arr.slice(),
    i: newI,
    j: newJ,
  });
};

export default bubbleSort;

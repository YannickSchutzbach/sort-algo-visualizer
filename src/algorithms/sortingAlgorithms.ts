import { type Bar } from "../types";
import { sleep } from "../utils/helpers";

// Hilfsfunktion: Balken am Ende nacheinander grün färben
export const colorizeSortedBars = async (
  arr: Bar[],
  setArray: (bars: Bar[]) => void,
  speed: number,
  stopSignal: React.MutableRefObject<boolean>
) => {
  const newArray = [...arr];
  for (let i = 0; i < newArray.length; i++) {
    if (stopSignal.current) return;
    newArray[i].color = "bg-green-500";
    setArray([...newArray]);
    await sleep(speed / 5);
  }
};

// === BUBBLE SORT ===
export const bubbleSort = async (
  array: Bar[],
  setArray: (bars: Bar[]) => void,
  speed: number,
  isPaused: React.MutableRefObject<boolean>,
  stopSignal: React.MutableRefObject<boolean>,
  onCompare: () => void,
  onSwap: () => void
) => {
  let arr = [...array];
  for (let i = 0; i < arr.length - 1; i++) {
    for (let j = 0; j < arr.length - i - 1; j++) {
      if (stopSignal.current) return;
      while (isPaused.current) await sleep(50);

      onCompare();
      arr[j].color = "bg-yellow-500";
      arr[j + 1].color = "bg-yellow-500";
      setArray([...arr]);
      await sleep(speed);

      if (arr[j].value > arr[j + 1].value) {
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
        onSwap();
      }

      arr[j].color = "bg-blue-500";
      arr[j + 1].color = "bg-blue-500";
    }
  }
  await colorizeSortedBars(arr, setArray, speed, stopSignal);
};

// === INSERTION SORT ===
export const insertionSort = async (
  array: Bar[],
  setArray: (bars: Bar[]) => void,
  speed: number,
  isPaused: React.MutableRefObject<boolean>,
  stopSignal: React.MutableRefObject<boolean>,
  onCompare: () => void,
  onSwap: () => void
) => {
  let arr = [...array];
  
  for (let i = 1; i < arr.length; i++) {
    let j = i;
    
    // Wir wandern mit dem Element so lange nach links, bis es an der richtigen Stelle ist
    while (j > 0 && arr[j - 1].value > arr[j].value) {
      if (stopSignal.current) return;
      while (isPaused.current) await sleep(50);

      onCompare();
      // Markiere die beiden Balken, die verglichen/getauscht werden
      arr[j].color = "bg-yellow-500";
      arr[j - 1].color = "bg-yellow-500";
      setArray([...arr]);
      await sleep(speed);

      // WICHTIG: Echter Swap statt Überschreiben, um die IDs eindeutig zu halten
      [arr[j], arr[j - 1]] = [arr[j - 1], arr[j]];
      onSwap();

      // Farben zurücksetzen
      arr[j].color = "bg-blue-500";
      arr[j - 1].color = "bg-blue-500";
      
      setArray([...arr]);
      j--;
    }
  }
  
  // Am Ende alles grün färben
  await colorizeSortedBars(arr, setArray, speed, stopSignal);
};

// === SELECTION SORT ===
export const selectionSort = async (
  array: Bar[],
  setArray: (bars: Bar[]) => void,
  speed: number,
  isPaused: React.MutableRefObject<boolean>,
  stopSignal: React.MutableRefObject<boolean>,
  onCompare: () => void,
  onSwap: () => void
) => {
  let arr = [...array];
  for (let i = 0; i < arr.length; i++) {
    let minIdx = i;
    for (let j = i + 1; j < arr.length; j++) {
      if (stopSignal.current) return;
      while (isPaused.current) await sleep(50);

      onCompare();
      arr[j].color = "bg-yellow-500";
      arr[minIdx].color = "bg-yellow-500";
      setArray([...arr]);
      await sleep(speed);

      if (arr[j].value < arr[minIdx].value) {
        arr[minIdx].color = "bg-blue-500";
        minIdx = j;
      } else {
        arr[j].color = "bg-blue-500";
      }
    }
    [arr[i], arr[minIdx]] = [arr[minIdx], arr[i]];
    onSwap();
    setArray([...arr]);
  }
  await colorizeSortedBars(arr, setArray, speed, stopSignal);
};

// === QUICK SORT ===
export const quickSort = async (
  array: Bar[],
  setArray: (bars: Bar[]) => void,
  speed: number,
  isPaused: React.MutableRefObject<boolean>,
  stopSignal: React.MutableRefObject<boolean>,
  onCompare: () => void,
  onSwap: () => void
) => {
  let arr = [...array];

  const partition = async (low: number, high: number) => {
    let pivot = arr[high].value;
    arr[high].color = "bg-red-500"; // Pivot markieren
    let i = low - 1;

    for (let j = low; j < high; j++) {
      if (stopSignal.current) return -1;
      while (isPaused.current) await sleep(50);

      onCompare();
      arr[j].color = "bg-yellow-500";
      setArray([...arr]);
      await sleep(speed);

      if (arr[j].value < pivot) {
        i++;
        [arr[i], arr[j]] = [arr[j], arr[i]];
        onSwap();
      }
      arr[j].color = "bg-blue-500";
    }
    [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
    onSwap();
    arr[i + 1].color = "bg-blue-500";
    setArray([...arr]);
    return i + 1;
  };

  const sort = async (low: number, high: number) => {
    if (low < high) {
      let pi = await partition(low, high);
      if (pi === -1) return;
      await sort(low, pi - 1);
      await sort(pi + 1, high);
    }
  };

  await sort(0, arr.length - 1);
  await colorizeSortedBars(arr, setArray, speed, stopSignal);
};

// === HEAP SORT ===
export const heapSort = async (
  array: Bar[],
  setArray: (bars: Bar[]) => void,
  speed: number,
  isPaused: React.MutableRefObject<boolean>,
  stopSignal: React.MutableRefObject<boolean>,
  onCompare: () => void,
  onSwap: () => void
) => {
  let arr = [...array];
  let n = arr.length;

  const heapify = async (size: number, i: number) => {
    let largest = i;
    let l = 2 * i + 1;
    let r = 2 * i + 2;

    if (l < size && arr[l].value > arr[largest].value) largest = l;
    if (r < size && arr[r].value > arr[largest].value) largest = r;

    if (largest !== i) {
      if (stopSignal.current) return;
      while (isPaused.current) await sleep(50);

      onCompare();
      arr[i].color = "bg-yellow-500";
      arr[largest].color = "bg-yellow-500";
      setArray([...arr]);
      await sleep(speed);

      [arr[i], arr[largest]] = [arr[largest], arr[i]];
      onSwap();
      arr[i].color = "bg-blue-500";
      arr[largest].color = "bg-blue-500";
      
      await heapify(size, largest);
    }
  };

  for (let i = Math.floor(n / 2) - 1; i >= 0; i--) await heapify(n, i);
  for (let i = n - 1; i > 0; i--) {
    [arr[0], arr[i]] = [arr[i], arr[0]];
    onSwap();
    setArray([...arr]);
    await sleep(speed);
    await heapify(i, 0);
  }
  await colorizeSortedBars(arr, setArray, speed, stopSignal);
};

// === MERGE SORT ===
export const mergeSort = async (
  array: Bar[],
  setArray: (bars: Bar[]) => void,
  speed: number,
  isPaused: React.MutableRefObject<boolean>,
  stopSignal: React.MutableRefObject<boolean>,
  onCompare: () => void,
  onSwap: () => void
) => {
  let arr = [...array];

  const merge = async (start: number, mid: number, end: number) => {
    let left = arr.slice(start, mid + 1);
    let right = arr.slice(mid + 1, end + 1);
    let i = 0, j = 0, k = start;

    while (i < left.length && j < right.length) {
      if (stopSignal.current) return;
      while (isPaused.current) await sleep(50);

      onCompare();
      arr[k].color = "bg-yellow-500";
      if (left[i].value <= right[j].value) {
        arr[k] = { ...left[i], color: "bg-yellow-500" };
        i++;
      } else {
        arr[k] = { ...right[j], color: "bg-yellow-500" };
        j++;
      }
      onSwap();
      setArray([...arr]);
      await sleep(speed);
      arr[k].color = "bg-blue-500";
      k++;
    }

    while (i < left.length) {
      arr[k] = { ...left[i], color: "bg-blue-500" };
      setArray([...arr]);
      await sleep(speed);
      i++; k++;
      onSwap();
    }
    while (j < right.length) {
      arr[k] = { ...right[j], color: "bg-blue-500" };
      setArray([...arr]);
      await sleep(speed);
      j++; k++;
      onSwap();
    }
  };

  const sort = async (start: number, end: number) => {
    if (start < end) {
      let mid = Math.floor((start + end) / 2);
      await sort(start, mid);
      await sort(mid + 1, end);
      await merge(start, mid, end);
    }
  };

  await sort(0, arr.length - 1);
  await colorizeSortedBars(arr, setArray, speed, stopSignal);
};
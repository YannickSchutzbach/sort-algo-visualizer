import React, { useState, useEffect, useRef } from "react";
import { type Bar, type AlgorithmType } from "../types";
import { Visualizer } from "./Visualizer";
import * as Algos from "../algorithms/sortingAlgorithms";

interface Props {
  initialArray: Bar[];
  algorithm: AlgorithmType;
  speed: number;
  runTrigger: boolean;
  isPaused: React.MutableRefObject<boolean>;
  stopSignal: React.MutableRefObject<boolean>;
  onAlgoChange: (algo: AlgorithmType) => void;
  onRemove: () => void;
  showRemove: boolean;
}

export const SortInstance: React.FC<Props & {isCompact?:boolean}> = (props) => {
  const { initialArray, algorithm, speed, runTrigger, isPaused, stopSignal, onAlgoChange, onRemove, showRemove } = props;
  const { isCompact, ...rest } = props
  const [array, setArray] = useState<Bar[]>([]);
  const [stats, setStats] = useState({ comparisons: 0, swaps: 0, time: 0 });
  const timerRef = useRef<number>(0);

  // Jedes Mal, wenn ein neues Set an Werten generiert wird, kopieren wir es
  useEffect(() => {
    setArray(JSON.parse(JSON.stringify(initialArray)));
    setStats({ comparisons: 0, swaps: 0, time: 0});
  }, [initialArray]);

  // Start-Signal abfangen
  useEffect(() => {
    if (runTrigger) startSorting();
  }, [runTrigger]);

const startSorting = async () => {

  const startTime = performance.now();
  let arrCopy = [...array];
  setStats({ comparisons: 0, swaps: 0,time: 0});

  const incComp = () => setStats(s => ({ ...s, comparisons: s.comparisons + 1 }));
  const incSwap = () => setStats(s => ({ ...s, swaps: s.swaps + 1 }));

  // Explizites Mapping statt dynamischem String-Basteln
  const algoMapping: Record<AlgorithmType, any> = {
    "Bubble Sort": Algos.bubbleSort,
    "Insertion Sort": Algos.insertionSort,
    "Quick Sort": Algos.quickSort,
    "Merge Sort": Algos.mergeSort,
    "Selection Sort": Algos.selectionSort,
    "Heap Sort": Algos.heapSort
  };

  const sortFn = algoMapping[algorithm];

  if (sortFn) {
    await sortFn(
      arrCopy, 
      setArray, 
      speed, 
      isPaused, 
      stopSignal, 
      incComp, 
      incSwap
    );
  };

  const endTime = performance.now();
  const totalTime = Math.round(endTime - startTime);
  setStats(s =>({...s, time: totalTime}));
};

  return (
    <div className={`relative flex flex-col bg-gray-800/40 border border-gray-700 rounded-3xl shadow-xl transition-all overflow-hidden ${
      isCompact ? "h-[300px] p-3" : "h-[450px] p-6"
    }`}>

      <div className="flex justify-between items-center mb-4 shrink-0">
        <select 
          value={algorithm} 
          onChange={(e) => onAlgoChange(e.target.value as AlgorithmType)}
          className={`bg-transparent text-blue-400 font-bold outline-none cursor-pointer border-b border-transparent hover:border-blue-500 ${
            isCompact ? "text-sm" : "text-lg"
          }`}
        >
          <option value="Bubble Sort">Bubble Sort</option>
          <option value="Quick Sort">Quick Sort</option>
          <option value="Merge Sort">Merge Sort</option>
          <option value="Insertion Sort">Insertion Sort</option>
          <option value="Selection Sort">Selection Sort</option>
          <option value="Heap Sort">Heap Sort</option>
        </select>

        <div className={`flex gap-3 font-mono text-gray-400 bg-black/30 px-3 py-1 rounded-full ${
          isCompact ? "text-[10px]" : "text-xs"
        }`}>
          <span>Comparisions: <b className="text-blue-300">{stats.comparisons}</b></span>
          <span>Swaps: <b className="text-purple-300">{stats.swaps}</b></span>
          <span>Time: <b className="text-orange-300">{stats.time} ms</b></span>
        </div>

        {showRemove && (
          <button 
            onClick={onRemove} 
            className={`shrink-0 bg-red-500/10 hover:bg-red-600/20 text-red-500 border border-red-500/20 rounded-xl flex items-center justify-center transition-all shadow-sm ${
              isCompact ? "w-8 h-8 text-xs" : "w-10 h-10 text-base"
            }`}
            title="Instanz entfernen"
          >
            ✕
          </button>
        )}
        </div>

      <div className="flex-1 w-full min-h-0 relative">
        <Visualizer array={array} />
      </div>


    </div>
  );
};
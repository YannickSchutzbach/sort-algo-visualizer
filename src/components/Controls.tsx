/*import React from "react";
import { type AlgorithmType } from "../types";

interface Props {
  algorithm: AlgorithmType;
  setAlgorithm: (val: AlgorithmType) => void;
  size: number;
  setSize: (val: number) => void;
  speed: number;
  setSpeed: (val: number) => void;
  onStart: () => void;
  onReset: () => void;
  onPause: () => void;
  onStop: () => void;
  isPaused: boolean;
  isRunning: boolean;
}

export const Controls: React.FC<Props> = (props) => {
  const { algorithm, setAlgorithm, size, setSize, speed, setSpeed, onStart, onReset, onPause, onStop, isPaused, isRunning } = props;

  return (
    <div className="bg-gray-800/50 backdrop-blur-md p-6 rounded-3xl border border-gray-700 flex flex-wrap gap-8 justify-center items-end mb-10 shadow-2xl">
      <div className="flex flex-col gap-2">
        <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">Algorithmus</label>
        <select 
          disabled={isRunning}
          value={algorithm} 
          onChange={(e) => setAlgorithm(e.target.value as AlgorithmType)}
          className="bg-gray-900 text-white p-2 rounded-xl border border-gray-600 focus:ring-2 ring-blue-500 outline-none"
        >
          <option>Bubble Sort</option>
          <option>Insertion Sort</option>
          <option>Selection Sort</option>
          <option>Quick Sort</option>
          <option>Heap Sort</option>
          <option>Merge Sort</option>
        </select>
      </div>

      <div className="flex flex-col gap-2">
        <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">Balken: {size}</label>
        <input disabled={isRunning} type="range" min="10" max="80" value={size} onChange={(e) => setSize(+e.target.value)} className="accent-blue-500" />
      </div>

      <div className="flex flex-col gap-2">
        <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">Speed: {speed}ms</label>
        <input type="range" min="5" max="400" value={speed} onChange={(e) => setSpeed(+e.target.value)} className="accent-blue-500" />
      </div>

      <div className="flex gap-2">
        <button onClick={onReset} className="p-3 bg-gray-700 hover:bg-gray-600 rounded-xl transition-all active:scale-95">Neu</button>
        <button onClick={onStart} disabled={isRunning} className="px-6 py-3 bg-blue-600 hover:bg-blue-500 rounded-xl font-bold transition-all disabled:opacity-50 active:scale-95">Start</button>
<button onClick={onPause} className="p-3 bg-yellow-600 hover:bg-yellow-500 text-white rounded-xl font-bold transition-all active:scale-95 shadow-md">{isPaused ? "Play" : "Pause"}</button>
        <button onClick={onStop} className="p-3 bg-red-600 hover:bg-red-500 rounded-xl transition-all active:scale-95">Stop</button>
      </div>
    </div>
  );
};*/

import React from "react";

interface Props {
  size: number;
  setSize: (val: number) => void;
  speed: number;
  setSpeed: (val: number) => void;
  onStart: () => void;
  onReset: () => void;
  onPause: () => void;
  onStop: () => void;
  isPaused: boolean;
  isRunning: boolean;
}

export const Controls: React.FC<Props> = (props) => {
  const { 
    size, setSize, speed, setSpeed, 
    onStart, onReset, onPause, onStop, isPaused, isRunning 
  } = props;

  return (
    <div className="bg-gray-800/50 backdrop-blur-md p-6 rounded-3xl border border-gray-700 flex flex-wrap gap-8 justify-center items-end mb-10 shadow-2xl">
      
      {/* Slider für die Anzahl der Balken */}
      <div className="flex flex-col gap-2">
        <label className="text-xs font-bold text-gray-400 uppercase tracking-widest text-center">Beams: {size}</label>
        <input 
          disabled={isRunning} 
          type="range" min="10" max="50" 
          value={size} 
          onChange={(e) => setSize(+e.target.value)} 
          className="accent-blue-500 cursor-pointer w-32" 
        />
      </div>

      {/* Slider für die Geschwindigkeit */}
      <div className="flex flex-col gap-2">
        <label className="text-xs font-bold text-gray-400 uppercase tracking-widest text-center" title="Sleeptimer">Speed: {speed}ms</label>
        <input 
          type="range" min="1" max="400" 
          value={speed} 
          onChange={(e) => setSpeed(+e.target.value)} 
          className="accent-emerald-500 cursor-pointer w-32" 
        />
      </div>

      {/* Aktions-Buttons */}
      <div className="flex gap-2">
        <button onClick={onReset} className="px-4 py-3 bg-gray-700 hover:bg-gray-600 text-white rounded-xl font-bold transition-all active:scale-95 shadow-md">
          New
        </button>
        <button 
          onClick={onStart} 
          disabled={isRunning} 
          className="px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-bold transition-all disabled:opacity-40 disabled:cursor-not-allowed active:scale-95 shadow-md"
        >
          Start All
        </button>
        <button 
          onClick={onPause} 
          className="px-4 py-3 bg-yellow-600 hover:bg-yellow-500 text-white rounded-xl font-bold transition-all active:scale-95 shadow-md"
        >
          {isPaused ? "Play" : "Pause"}
        </button>
        <button 
          onClick={onStop} 
          className="px-4 py-3 bg-red-600 hover:bg-red-500 text-white rounded-xl font-bold transition-all active:scale-95 shadow-md"
        >
          Stop
        </button>
      </div>
    </div>
  );
};
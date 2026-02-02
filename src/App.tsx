/*import { useState, useEffect, useRef } from "react";
import Confetti from "react-confetti";
import type { Bar, AlgorithmType } from "./types";
import { generateShuffledBars } from "./utils/helpers";
import { 
  bubbleSort, 
  insertionSort, 
  selectionSort, 
  quickSort, 
  heapSort, 
  mergeSort 
} from "./algorithms/sortingAlgorithms";
import { Visualizer } from "./components/Visualizer";
import { Controls } from "./components/Controls";

export default function App() {
  const [array, setArray] = useState<Bar[]>([]);
  const [size, setSize] = useState(30);
  const [speed, setSpeed] = useState(50);
  const [algorithm, setAlgorithm] = useState<AlgorithmType>("Bubble Sort");
  const [isRunning, setIsRunning] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [pausedState, setPausedState] = useState(false);
  const [status, setStatus] = useState<"unsorted" | "sorting" | "sorted">("unsorted");
  const [comparisons, setComparisons] = useState(0);
  const isPaused = useRef(false);
  const stopSignal = useRef(false);

  const incrementComparisons = () => setComparisons((prev) => prev + 1);

  const handleReset = () => {
    stopSignal.current = true;
    setIsRunning(false);
    setArray(generateShuffledBars(size));
    setShowConfetti(false);
    setStatus("unsorted"); // Status auf Rot / Unsortiert
    setComparisons(0);     // Zähler zurücksetzen
  };

const handleStart = async () => {
  stopSignal.current = false;
  setIsRunning(true);
  setStatus("sorting"); // Status auf Gelb / Sortiert...
  setComparisons(0);
  const args = [array, setArray, speed, isPaused, stopSignal, incrementComparisons] as const;
  
  switch (algorithm) {
    case "Bubble Sort":
      await bubbleSort(...args);
      break;
    case "Insertion Sort":
      await insertionSort(...args);
      break;
    case "Selection Sort":
      await selectionSort(...args);
      break;
    case "Quick Sort":
      await quickSort(...args);
      break;
    case "Heap Sort":
      await heapSort(...args);
      break;
    case "Merge Sort":
      await mergeSort(...args);
      break;
  }

  if (!stopSignal.current) {
    setStatus("sorted"); // Status auf Grün / Fertig
    setShowConfetti(true);
    setTimeout(() => setShowConfetti(false), 4000);
  }
  setIsRunning(false);
};

  useEffect(() => { handleReset(); }, [size]);

  return (
    <div className="min-h-screen w-full bg-[#0f172a] text-slate-100 flex flex-col items-center p-10 font-sans">
      {showConfetti && <Confetti recycle={false} numberOfPieces={400} />}
      
      <header className="mb-12 text-center">
        <h1 className="text-5xl font-black bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent">
          SORT VISUALIZER
        </h1>
        <p className="text-gray-400 mt-2 font-medium tracking-widest uppercase text-xs">Algorithm Sandbox</p>
      </header>

      <Controls 
        algorithm={algorithm} setAlgorithm={setAlgorithm}
        size={size} setSize={setSize}
        speed={speed} setSpeed={setSpeed}
        onStart={handleStart} onReset={handleReset}
        onPause={() => { isPaused.current = !isPaused.current; setPausedState(isPaused.current); }}
        onStop={() => { stopSignal.current = true; setIsRunning(false); }}
        isPaused={pausedState} isRunning={isRunning}
      />

      // STATISTIK ANZEIGE 
      <div className="flex gap-10 mb-8 items-center bg-gray-800/30 px-8 py-4 rounded-2xl border border-gray-700 shadow-inner">
        <div className="flex flex-col items-center">
          <span className="text-xs uppercase tracking-tighter text-gray-500 font-bold">Status</span>
          {status === "unsorted" && <span className="text-red-500 font-black animate-pulse">UNSORTIERT</span>}
          {status === "sorting" && <span className="text-yellow-500 font-black animate-bounce">SORTIERUNG LÄUFT...</span>}
          {status === "sorted" && <span className="text-green-400 font-black">SORTIERT!</span>}
        </div>

        <div className="w-[1px] h-10 bg-gray-700"></div>

        <div className="flex flex-col items-center">
          <span className="text-xs uppercase tracking-tighter text-gray-500 font-bold">Vergleiche</span>
          <span className="text-2xl font-mono font-bold text-blue-400">
            {comparisons.toLocaleString()}
          </span>
        </div>
      </div>

      <Visualizer array={array} />
    </div>
  );
}*/
import { useState, useEffect, useRef } from "react";
import Confetti from "react-confetti";
import { type Bar, type AlgorithmType } from "./types";
import { generateShuffledBars } from "./utils/helpers";
import { Controls } from "./components/Controls";
import { SortInstance } from "./components/SortInstance";

interface SortingInstance {
  id: number;
  algo: AlgorithmType;
}

export default function App() {
  // --- States ---
  const [baseArray, setBaseArray] = useState<Bar[]>([]);
  const [instances, setInstances] = useState<SortingInstance[]>([
    { id: Date.now(), algo: "Bubble Sort" }
  ]);
  const [size, setSize] = useState(30);
  const [speed, setSpeed] = useState(50);
  const [isRunning, setIsRunning] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  
  // Signale für die Kinder-Komponenten
  const [runTrigger, setRunTrigger] = useState(false);
  const isPaused = useRef(false);
  const stopSignal = useRef(false);
  const [pausedState, setPausedState] = useState(false);

  // --- Initialisierung & Reset ---
  useEffect(() => {
    handleReset();
  }, [size]);

  const handleReset = () => {
    stopSignal.current = true;
    isPaused.current = false;
    setPausedState(false);
    setIsRunning(false);
    setRunTrigger(false);
    setShowConfetti(false);
    // Generiert das "Master-Array", das an alle Instanzen verteilt wird
    setBaseArray(generateShuffledBars(size));
  };

  // --- Instanzen-Management ---
  const addInstance = () => {
    if (instances.length < 6) {
      setInstances([
        ...instances,
        { id: Date.now(), algo: "Quick Sort" }
      ]);
    }
  };

  const removeInstance = (id: number) => {
    if (instances.length > 1) {
      setInstances(instances.filter((inst) => inst.id !== id));
    }
  };

  const updateAlgoForInstance = (id: number, newAlgo: AlgorithmType) => {
    setInstances(
      instances.map((inst) => (inst.id === id ? { ...inst, algo: newAlgo } : inst))
    );
  };

  // --- Controls ---
  const handleStart = () => {
    stopSignal.current = false;
    isPaused.current = false;
    setPausedState(false);
    setIsRunning(true);
    setRunTrigger(true);
    // Trigger kurz danach zurücksetzen, damit er beim nächsten Klick wieder feuern kann
    setTimeout(() => setRunTrigger(false), 100);
  };

  const handlePause = () => {
    isPaused.current = !isPaused.current;
    setPausedState(isPaused.current);
  };

  const handleStop = () => {
    stopSignal.current = true;
    setIsRunning(false);
    setRunTrigger(false);
  };

  return (
    <div className="w-full min-h-screen bg-[#0f172a] text-slate-100 flex flex-col items-center p-4 sm:p-10 font-sans overflow-x-hidden">
      {showConfetti && <Confetti recycle={false} numberOfPieces={400} />}

      <header className="mb-8 text-center">
        <h1 className="text-5xl font-black bg-gradient-to-r from-blue-400 via-emerald-400 to-purple-500 bg-clip-text text-transparent italic tracking-tighter">
          SORT LAB
        </h1>
        <p className="text-gray-500 text-xs uppercase tracking-[0.2em] mt-2">Algorithm Sandbox & Comparison Tool</p>
      </header>

      {/* Hauptsteuerung */}
      <Controls
        //algorithm={instances[0]?.algo || "Bubble Sort"} // Dummy für Typ-Kompatibilität
        //setAlgorithm={() => {}} // Deaktiviert in App, da in Instanz gewählt wird
        size={size}
        setSize={setSize}
        speed={speed}
        setSpeed={setSpeed}
        onStart={handleStart}
        onReset={handleReset}
        onPause={handlePause}
        onStop={handleStop}
        isPaused={pausedState}
        isRunning={isRunning}
      />

      {/* Dynamisches Grid für die Vergleiche */}
      <div
        className={`w-full max-w-[1600px] grid gap-4 transition-all duration-500 ${
          instances.length === 1 ? "grid-cols-1" : 
          instances.length === 2 ? "grid-cols-1 lg:grid-cols-2" : 
          "grid-cols-1 md:grid-cols-2 xl:grid-cols-3"
        }`}
      >
        {instances.map((inst) => (
          <div key={inst.id} className={`${instances.length > 2 ? "scale-95" : "scale-100"} transition-transform`}>
            <SortInstance
              key={inst.id}
              initialArray={baseArray}
              algorithm={inst.algo}
              speed={speed}
              runTrigger={runTrigger}
              isPaused={isPaused}
              stopSignal={stopSignal}
              onAlgoChange={(newAlgo) => updateAlgoForInstance(inst.id, newAlgo)}
              onRemove={() => removeInstance(inst.id)}
              showRemove={instances.length > 1}
              isCompact={instances.length > 2} // Neue Prop für kleineres Design
            />
          </div>
        ))}
      </div>

      {/* Button zum Hinzufügen weiterer Boxen */}
      {instances.length < 6 && (
        <button
          onClick={addInstance}
          disabled={isRunning}
          className="mt-12 px-8 py-4 bg-gray-800 hover:bg-gray-700 border border-gray-600 hover:border-emerald-500/50 text-emerald-400 rounded-2xl font-bold flex items-center gap-3 transition-all shadow-xl active:scale-95 disabled:opacity-30 disabled:cursor-not-allowed group"
        >
          <span className="text-2xl group-hover:rotate-90 transition-transform inline-block">+</span>
          Add algorithm to compare
        </button>
      )}

      {/* Footer / Info */}
      <footer className="mt-auto pt-20 pb-4 text-gray-600 text-[10px] uppercase tracking-widest">
        Sorting Visualizer v2.0 — Dynamic Grid Mode
      </footer>
    </div>
  );
}
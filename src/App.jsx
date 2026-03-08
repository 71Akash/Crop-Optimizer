import { useState } from 'react';
import './App.css'
import InputPanel from './components/InputPanel';
import { knapsackDP } from './algorithms/knapsackDP';
import { getSelectedCrops } from './utils/backtrack';
import { getBacktrackPath } from './algorithms/backtrack';
import DPVisualizer from './components/DPVisualiser';
import {greedySelection} from './algorithms/greedy';
import ComparisonChart from './components/ComparisonChart';
import LandPieChart from './components/LandPieChart';
import AlgorithmRace from './components/AlgorithmRace';


function App() {

  const [result, setResult] = useState(null);

  const runOptimization = (crops, capacity) => {
    const dp = knapsackDP(crops, capacity);
    const selected = getSelectedCrops(dp, crops, capacity);
    const maxProfit = dp[crops.length][capacity];
    const greedy = greedySelection(crops, capacity);
    const usedLand = selected.reduce((sum, crop) => sum + crop.land, 0);
    const path = getBacktrackPath(dp, crops, capacity);
    setResult({
      dp,
      selected,
      maxProfit,
      greedyProfit: greedy.totalProfit,
      usedLand,
      totalLand: capacity,
      crops,
      path
    });
  };

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col items-center justify-center px-4 md:px-8 py-6">
      <div className="w-full max-w-6xl flex flex-col items-center">
          <h1 className="text-2xl md:text-4xl font-bold mb-6 text-blue-600 text-center">
        Optimal Crop Selection Planner
      </h1>
      <InputPanel onRun={runOptimization} />
      {result && 
        <DPVisualizer 
          dp={result.dp}
          crops={result.crops}
          path={result.path} 
          selected = {result.selected}
          maxProfit={result.maxProfit}
          usedLand={result.usedLand} 
          totalLand={result.totalLand}
        />
      }
      {result && (
        <ComparisonChart
          greedyProfit={result.greedyProfit}
          dpProfit={result.maxProfit}
        />
      )}
      {result && (
        <LandPieChart
          usedLand={result.usedLand}
          totalLand={result.totalLand}
        />
      )}
      {/* {result && 
        <AlgorithmRace 
          result={result}
          crops={result?.crops}
          capacity={result?.totalLand}
          dpResult={result?.dp}
          greedyResult={result?.greedyProfit}
          />} */}
      </div>
    </div>
  );
}

export default App;
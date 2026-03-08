import { useState } from "react";

function AlgorithmRace({ result }) {

  // Extract values safely
  const crops = result?.crops || [];
  const capacity = result?.totalLand || 0;
  const dpProfit = result?.maxProfit || 0;
  const greedyProfit = result?.greedyProfit || 0;

  const n = crops.length;

  // Real algorithm workloads
  const bruteOperations = Math.pow(2, n);
  const greedyOperations = n;
  const dpOperations = n * capacity;

  // Progress states
  const [bruteProgress, setBruteProgress] = useState(0);
  const [greedyProgress, setGreedyProgress] = useState(0);
  const [dpProgress, setDpProgress] = useState(0);

  // Counters
  const [combosChecked, setCombosChecked] = useState(0);
  const [greedySteps, setGreedySteps] = useState(0);
  const [cellsComputed, setCellsComputed] = useState(0);

  const [raceFinished, setRaceFinished] = useState(false);
  const [winner, setWinner] = useState("");

  const startRace = () => {

    if (!result) return;

    // reset
    setBruteProgress(0);
    setGreedyProgress(0);
    setDpProgress(0);

    setCombosChecked(0);
    setGreedySteps(0);
    setCellsComputed(0);
    setRaceFinished(false);
    setWinner("");


    /* ---------- BRUTE FORCE ---------- */

    let bruteCount = 0;

    const bruteInterval = setInterval(() => {

      bruteCount++;

      const progress = (bruteCount / bruteOperations) * 100;

      setCombosChecked(bruteCount);
      setBruteProgress(progress);

      if (bruteCount >= bruteOperations) {
        clearInterval(bruteInterval);

        if(!raceFinished) {
          setRaceFinished(true);
          setWinner("Brute Force");
        }
      }

    }, 120);



    /* ---------- GREEDY ---------- */

    let greedyCount = 0;

    const greedyInterval = setInterval(() => {

      greedyCount++;

      const progress = (greedyCount / greedyOperations) * 100;

      setGreedySteps(greedyCount);
      setGreedyProgress(progress);

      if (greedyCount >= greedyOperations) {
        clearInterval(greedyInterval);

        if(!raceFinished) {
          setRaceFinished(true);
          setWinner("Greedy");
        }
      }

    }, 80);


    /* ---------- DYNAMIC PROGRAMMING ---------- */

    let dpCount = 0;

    const dpInterval = setInterval(() => {

      dpCount++;

      const progress = (dpCount / dpOperations) * 100;

      setCellsComputed(dpCount);
      setDpProgress(progress);

      if (dpCount >= dpOperations) {
        clearInterval(dpInterval);

        if(!raceFinished) {
          setRaceFinished(true);
          setWinner("Dynamic Programming");
        }
      }

    }, 100);

  };



  return (

    <div className="mt-10 bg-white shadow-lg rounded-xl p-6 w-full max-w-6xl">

      <h2 className="text-2xl font-bold text-blue-600 mb-3 text-center">
        Interactive Algorithm Race
      </h2>

      <div className="text-sm text-gray-600 text-center mb-6">
        Using {n} crops | Capacity = {capacity}
      </div>



      {/* Start Button */}

      <div className="flex justify-center mb-6">

        <button
          onClick={startRace}
          className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
        >
          Start Race
        </button>

      </div>



      {/* Race Lanes */}

      <div className="grid grid-cols-3 gap-6">

        {/* BRUTE FORCE */}

        <div className="bg-gray-50 rounded-lg p-4 shadow-inner">

          <h3 className="font-bold text-lg mb-3 text-center">
            Brute Force
          </h3>

          <div className="text-sm text-gray-600 mb-2">
            Exploring all combinations
          </div>

          <div className="w-full bg-gray-200 rounded h-3 mb-2">

            <div
              className="bg-red-500 h-3 rounded"
              style={{ width: `${bruteProgress}%` }}
            ></div>

          </div>

          <div className="text-xs text-gray-500">
            Combinations Checked: {combosChecked} / {bruteOperations}
          </div>

        </div>



        {/* GREEDY */}

        <div className="bg-gray-50 rounded-lg p-4 shadow-inner">

          <h3 className="font-bold text-lg mb-3 text-center">
            Greedy
          </h3>

          <div className="text-sm text-gray-600 mb-2">
            Selecting highest profit crops
          </div>

          <div className="w-full bg-gray-200 rounded h-3 mb-2">

            <div
              className="bg-green-500 h-3 rounded"
              style={{ width: `${greedyProgress}%` }}
            ></div>

          </div>

          <div className="text-xs text-gray-500">
            Steps Completed: {greedySteps} / {greedyOperations}
          </div>

          <div className="text-xs text-gray-700 mt-2">
            Profit Found: {greedyProfit}
          </div>

        </div>



        {/* DYNAMIC PROGRAMMING */}

        <div className="bg-gray-50 rounded-lg p-4 shadow-inner">

          <h3 className="font-bold text-lg mb-3 text-center">
            Dynamic Programming
          </h3>

          <div className="text-sm text-gray-600 mb-2">
            Filling DP table
          </div>

          <div className="w-full bg-gray-200 rounded h-3 mb-2">

            <div
              className="bg-purple-500 h-3 rounded"
              style={{ width: `${dpProgress}%` }}
            ></div>

          </div>

          <div className="text-xs text-gray-500">
            Cells Computed: {cellsComputed} / {dpOperations}
          </div>

          <div className="text-xs text-gray-700 mt-2">
            Optimal Profit: {dpProfit}
          </div>

        </div>

      </div>



      {/* Result Summary */}

      {result && (

        <div className="mt-8 text-center text-sm text-gray-700">

          <p>
            Greedy Profit: <strong>{greedyProfit}</strong>
          </p>

          <p>
            Dynamic Programming Profit: <strong>{dpProfit}</strong>
          </p>

          <p className="mt-2 text-green-600 font-semibold">
            Dynamic Programming guarantees the optimal solution.
          </p>

        </div>

      )}

      {raceFinished && (

        <div className="mt-8 text-center">

        <div className="text-3xl font-bold text-green-600 mb-2">

        🏁 Race Finished!

        </div>

        <div className="text-lg font-semibold text-blue-700">

        ⚡ Fastest Algorithm: {winner}

        </div>

        <div className="mt-3 text-sm text-gray-700">

        <p>🎯 Optimal Algorithm: Dynamic Programming</p>

        <p>🐢 Exhaustive Search: Brute Force</p>

        </div>

        </div>

      )}

    </div>

  );

}

export default AlgorithmRace;
import { useEffect, useState } from "react";

function DPVisualizer({ dp , crops, path, selected, maxProfit, usedLand, totalLand}) {

  const [displayDP, setDisplayDP] = useState([]);
  const [currentCell, setCurrentCell] = useState({ i: 0, j: 0 });
  const [explanation, setExplanation] = useState("");
  const [selectedCell, setSelectedCell] = useState(null);
  const [pathIndex, setPathIndex] = useState(-1);
  const [isAnimating, setIsAnimating] = useState(true);
  const maxValue = dp ? Math.max(...dp.flat()) : 1;
  
  const getHeatColor = (value) => {
    if (value === "" || value === null) return "";
    const intensity = value / maxValue;
    const blue = Math.floor(255 - intensity * 120);
    return `rgb(${blue}, ${blue+20}, 255)`;
  };

  const getExplanation = () => {
    if (!selectedCell || !dp || !crops) return null;

    const { i, j } = selectedCell;

    if (i === 0) {
      return `Base Case:
      No crops considered → dp[0][${j}] = 0`;
    }

    const crop = crops[i - 1];

    const exclude = dp[i - 1][j];

    if (crop.land > j) {
      return `
      Crop "${crop.name}" cannot fit.

      Required land: ${crop.land}
      Available land: ${j}

      Therefore:

      dp[${i}][${j}] = dp[${i-1}][${j}] = ${exclude}
      `;
    }

    const include = crop.profit + dp[i - 1][j - crop.land];

    return `
        dp[${i}][${j}] = max(

      exclude = dp[${i-1}][${j}] = ${exclude}

      include = profit(${crop.name}) + dp[${i-1}][${j-crop.land}]
              = ${crop.profit} + ${dp[i - 1][j - crop.land]}
              = ${include}
      )
      Result = ${dp[i][j]}
      `;

  };

  useEffect(() => {

    if (!path || path.length === 0) return;

    let index = 0;

    const interval = setInterval(() => {
      
      setPathIndex(index);
      
      index++;
      
      if(index >= path.length) {
        clearInterval(interval);
      }

    },600);

    return () => clearInterval(interval);

  }, [path]);

  useEffect(() => {

    if (!dp) return;

    setIsAnimating(true);

    const rows = dp.length;
    const cols = dp[0].length;

    const temp = Array(rows)
      .fill()
      .map(() => Array(cols).fill(""));

    setDisplayDP(temp);

    let i = 0;
    let j = 0;

    const interval = setInterval(() => {

      temp[i][j] = dp[i][j];

      setDisplayDP(temp.map(row => [...row]));
      setCurrentCell({ i, j });

      // Generate recurrence explanation
      if (i > 0) {

        const exclude = dp[i - 1][j];

        let includeText = "N/A";

        if (j >= 0 && j < cols) {

          const includeCandidate = dp[i][j];

          includeText = includeCandidate;
        }

        setExplanation(
          `dp[${i}][${j}] = max(
          exclude = dp[${i-1}][${j}] = ${exclude},
          include candidate = ${includeText}
        )`
        );

      }

      j++;

      if (j === cols) {
        j = 0;
        i++;
      }

      if (i === rows) {
        clearInterval(interval);
        setIsAnimating(false);
      }

    }, 200);

    return () => clearInterval(interval);

  }, [dp]);

  if (!displayDP.length) return null;

  return (
    <div className="mt-6 bg-white shadow-lg rounded-xl p-4 md:p-6 w-full max-w-5xl">

      <h2 className="text-xl md:text-2xl font-bold mb-4 text-blue-600 border-b pb-2">
        Dynamic Programming Visualization
      </h2>

      {/* DP Table */}

      <div className="overflow-x-auto mb-6">
        <p className="text-sm text-gray-600 mb-3">Click any cell to inspect recurrence explanation</p>
        <table className="border-collapse border border-gray-300 w-full text-center">
          <thead>
            <tr className="bg-gray-100">

              <th className="border p-1 md:p-2 text-xs md:text-sm font-semibold">
                Crops ↓ / Capacity →
              </th>

              {displayDP[0].map((_, j) => (
                <th
                  key={j}
                  className="border p-1 md:p-2 text-xs md:text-sm font-semibold"
                >
                  {j}
                </th>
              ))}

            </tr>
          </thead>
          <tbody>
            {displayDP.map((row, i) => (
            <tr key={i}>

            <th className="border p-1 md:p-2 text-xs md:text-sm font-semibold bg-gray-100">

              {i === 0 ? "No crops" : crops[i - 1]?.name}

            </th>

            {row.map((cell, j) => {

            const isCurrent =
              currentCell.i === i && currentCell.j === j;

            const isCurrentRow = isAnimating &&currentCell.i === i;
            const isCurrentCol = isAnimating && currentCell.j === j;

            const isFilled =
              displayDP[i] && displayDP[i][j] !== "";

            const isPath =
              isFilled &&
              path &&
              pathIndex >= 0 &&
              path.slice(0, pathIndex + 1)
                  .some(p => p.i === i && p.j === j);

            const heatColor =
              isFilled ? getHeatColor(displayDP[i][j]) : "";

            let backgroundColor = heatColor;
            
            
            if (isCurrentRow) {
              backgroundColor = "#e0f2fe";   // light blue
            }
            if (isCurrentCol) {
              backgroundColor = "#dcfce7";   // light green
            }
            
            if (isCurrent) {
              backgroundColor = "#facc15";   // yellow
            }

            if (selectedCell?.i === i && selectedCell?.j === j) {
              backgroundColor = "#22c55e";   // green
            }

            if (isPath) {
              backgroundColor = "#7c3aed";   // purple
            }

            return (

            <td
              key={j}
              onClick={() => setSelectedCell({ i, j })}
              style={{ backgroundColor }}
              className="border p-2 font-semibold text-sm transition-all duration-200 hover:scale-105 cursor-pointer"
            >
            {cell}

            </td>

            );

            })}

            </tr>
            ))}

          </tbody>
        </table>
        <div className="flex flex-col items-center mt-5">

          <div className="text-sm font-semibold mb-1 text-gray-700">
          DP Value Heatmap
          </div>

          <div className="flex items-center gap-3">

          <span className="text-sm text-gray-600">
          Low ({0})
          </span>

          <div className="w-32 md:w-48 h-4 rounded bg-gradient-to-r from-blue-50 to-blue-600 shadow-inner"></div>

          <span className="text-sm text-gray-600">
          High ({(maxValue)})
          </span>

          </div>

        </div>
      </div>
      {/* changes */}
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">

        {/* Optimized Result */}

        <div className="bg-white shadow-lg rounded-lg p-4">

        <h3 className="font-bold text-lg mb-2">
        🏆 Optimized Result
        </h3>

        <p>Maximum Profit: <strong>{maxProfit}</strong></p>
        <p>Land Used: {usedLand} / {totalLand}</p>

        </div>

        {/* Recurrence Explanation */}

        <div className="bg-white shadow-lg rounded-lg p-4">

        <h3 className="font-bold text-lg mb-2">
        🧮 Recurrence Explanation
        </h3>

        <pre className="text-xs md:text-sm overflow-x-auto whitespace-pre-wrap">
        {selectedCell ? getExplanation() : "Click a cell to inspect recurrence"}
        </pre>

        </div>

        {/* Selection Explanation */}

        <div className="bg-white shadow-lg rounded-lg p-4">

        <h3 className="font-bold text-lg mb-2">
        🌱 Selection Explanation
        </h3>

        <div className="space-y-1 text-sm">

        {selected?.map((crop,i)=>(
        <div key={i}>
        {crop.name} → Land {crop.land}, Profit {crop.profit}
        </div>
        ))}

        </div>

        </div>

        {/* Backtracking Path */}

        <div className="bg-white shadow-lg rounded-lg p-4">

        <h3 className="font-bold text-lg mb-2">
        🔁 Backtracking Path
        </h3>

        <div className="flex flex-col items-center text-xs md:text-sm">

        {path?.map((cell,index)=>(

          <div key={index} className="flex flex-col items-center">

            {/* DP Cell */}

            <div className="px-3 py-1 bg-purple-100 text-purple-700 rounded font-mono">
              dp[{cell.i}][{cell.j}]
            </div>

            {/* Action Explanation */}

            {cell.crop && (

              <div className="text-xs text-gray-600 mt-1">

                {cell.action === "select"
                  ? `Select ${cell.crop.name} (land ${cell.crop.land}, profit ${cell.crop.profit})`
                  : `Skip ${cell.crop.name}`
                }

              </div>

            )}

            {/* Arrow */}

            {index !== path.length-1 && (
              <div className="text-purple-500 text-lg mt-1">
                ↓
              </div>
            )}

          </div>

        ))}

        </div>

        </div>

        </div>
      </div>
    </div>
  );

}

export default DPVisualizer;


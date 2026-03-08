import {
  Pie
} from "react-chartjs-2";

import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend
} from "chart.js";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend
);

function LandPieChart({ usedLand, totalLand }) {

  const remaining = Math.max(totalLand - usedLand, 0);

  const data = {
    labels: ["Used Land", "Remaining Land"],
    datasets: [
      {
        data: [usedLand, remaining],
        backgroundColor: [
          "rgba(75,192,192,0.8)",
          "rgba(255,205,86,0.8)"
        ],
        borderColor: "white",
        borderWidth: 3
      }
    ]
  };

  const options = {

    plugins: {
      legend: {
        position: "bottom"
      }
    }

  };

  return (

    <div className="mt-6 bg-white shadow-lg rounded-xl p-6 w-full max-w-3xl">

      <h2 className="text-2xl font-bold mb-4 text-blue-600">
        Land Utilization
      </h2>

      <Pie data={data} options={options} />

      <div className="mt-3 text-sm text-gray-600 text-center">

        Used: {usedLand} | Remaining: {remaining}

      </div>

    </div>

  );

}

export default LandPieChart;
import { useState } from "react";
import { Bar } from "react-chartjs-2";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip
);

// plugin to draw values inside bars
const valuePlugin = {
  id: "valuePlugin",
  afterDatasetsDraw(chart) {

    const { ctx } = chart;

    chart.data.datasets.forEach((dataset, i) => {

      const meta = chart.getDatasetMeta(i);

      meta.data.forEach((bar, index) => {

        const value = dataset.data[index];

        ctx.fillStyle = "white";
        ctx.font = "bold 20px sans-serif";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";

        ctx.fillText(
          value,
          bar.x,
          bar.y + (bar.height / 2)
        );

      });

    });

  }
};

function ComparisonChart({ greedyProfit, dpProfit }) {

  const [values, setValues] = useState([0, 0]);

  const animateChart = () => {

    let g = 0;
    let d = 0;

    const steps = 40;

    const stepG = greedyProfit / steps;
    const stepD = dpProfit / steps;

    const interval = setInterval(() => {

      g += stepG;
      d += stepD;

      if (g >= greedyProfit && d >= dpProfit) {
        g = greedyProfit;
        d = dpProfit;
        clearInterval(interval);
      }

      setValues([
        Math.round(g),
        Math.round(d)
      ]);

    }, 40);

  };

  const maxValue = Math.max(greedyProfit, dpProfit);
  const scaleMax = Math.ceil(maxValue * 1.1);

  const data = {
    labels: ["Greedy", "Dynamic Programming"],
    datasets: [
      {
        data: values,
        backgroundColor: [
          "rgba(255,99,132,0.8)",
          "rgba(54,162,235,0.8)"
        ]
      }
    ]
  };

  const options = {

    responsive: true,

    plugins: {
      legend: { display: false }
    },

    scales: {
      y: {
        beginAtZero: true,
        max: scaleMax
      }
    },

    animation: {
      duration: 400
    }

  };

  return (

    <div className="mt-6 bg-white shadow-lg rounded-xl p-6 w-full max-w-3xl">

      <h2 className="text-2xl font-bold mb-4 text-blue-600">
        Algorithm Comparison
      </h2>

      <button
        onClick={animateChart}
        className="bg-blue-600 text-white px-4 py-2 rounded mb-4"
      >
        Show Comparison
      </button>

      <Bar
        data={data}
        options={options}
        plugins={[valuePlugin]}
      />

    </div>

  );

}

export default ComparisonChart;
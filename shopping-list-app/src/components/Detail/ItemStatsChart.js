import React from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function ItemStatsChart({ completed, uncompleted, theme }) {
  const data = {
    labels: ["Vyřešené", "Nevyřešené"],
    datasets: [
      {
        label: "Stav položek",
        data: [completed, uncompleted],
        backgroundColor:
          theme === "dark" ? ["#34D399", "#F87171"] : ["#10B981", "#EF4444"],
        borderColor:
          theme === "dark" ? ["#059669", "#DC2626"] : ["#059669", "#B91C1C"],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="flex flex-col items-center">
      <div
        className="w-full min-w-full
 h-auto "
      >
        <Pie data={data} />
      </div>
    </div>
  );
}

import React from "react";
import { Bar } from "react-chartjs-2";

const BarChart = () => {
  const labels = ["January", "February", "March", "April", "May", "June"];
  const data = {
    labels: labels,
    datasets: [
      {
        label: "Users",
        backgroundColor: "#0074e1",
        borderColor: "#0074e1",
        data: [30, 10, 5, 2, 20, 30, 55],
      },
    ],
  };
  return (
    <div>
      <Bar data={data} />
    </div>
  );
};

export default BarChart;

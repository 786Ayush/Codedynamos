import React, { useEffect, useRef } from "react";
import Chart from "chart.js/auto";

const ChartContent = () => {
  const pieChartRef = useRef(null);
  const barChartRef = useRef(null);

  useEffect(() => {
    const pieCtx = pieChartRef.current.getContext("2d");
    const barCtx = barChartRef.current.getContext("2d");

    if (!pieCtx || !barCtx) {
      console.error("Canvas context not found");
      return;
    }

    const pieChart = new Chart(pieCtx, {
      type: "pie",
      data: {
        labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
        datasets: [
          {
            label: "# of Votes",
            data: [12, 19, 3, 5, 2, 3],
            backgroundColor: [
              "rgba(255, 99, 132, 0.2)",
              "rgba(54, 162, 235, 0.2)",
              "rgba(255, 206, 86, 0.2)",
              "rgba(75, 192, 192, 0.2)",
              "rgba(153, 102, 255, 0.2)",
              "rgba(255, 159, 64, 0.2)",
            ],
            borderColor: [
              "rgba(255, 99, 132, 1)",
              "rgba(54, 162, 235, 1)",
              "rgba(255, 206, 86, 1)",
              "rgba(75, 192, 192, 1)",
              "rgba(153, 102, 255, 1)",
              "rgba(255, 159, 64, 1)",
            ],
            borderWidth: 1,
          },
        ],
      },
    });

    const barChart = new Chart(barCtx, {
      type: "bar",
      data: {
        labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
        datasets: [
          {
            label: "# of Votes",
            data: [12, 19, 3, 5, 2, 3],
            backgroundColor: [
              "rgba(255, 99, 132, 0.2)",
              "rgba(54, 162, 235, 0.2)",
              "rgba(255, 206, 86, 0.2)",
              "rgba(75, 192, 192, 0.2)",
              "rgba(153, 102, 255, 0.2)",
              "rgba(255, 159, 64, 0.2)",
            ],
            borderColor: [
              "rgba(255, 99, 132, 1)",
              "rgba(54, 162, 235, 1)",
              "rgba(255, 206, 86, 1)",
              "rgba(75, 192, 192, 1)",
              "rgba(153, 102, 255, 1)",
              "rgba(255, 159, 64, 1)",
            ],
            borderWidth: 1,
          },
        ],
      },
    });

    return () => {
      pieChart.destroy();
      barChart.destroy();
    };
  }, []);

  return (
    <div className="lg:flex flex-col lg:flex-row h-[400px] items-center justify-between bg-white">
      <div className="w-screen lg:w-1/3  overflow-hidden">
        <canvas ref={pieChartRef} style={{ maxWidth: "100%" }}></canvas>
      </div>
      <div className="w-screen lg:w-2/3">
        <canvas ref={barChartRef}></canvas>
      </div>
    </div>
  );
};

export default ChartContent;

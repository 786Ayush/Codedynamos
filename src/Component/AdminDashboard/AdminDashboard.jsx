import React, { useEffect, useState } from "react";
import { FaUser, FaSignOutAlt } from "react-icons/fa";
import Chart from "chart.js/auto";
import CheckboxBar from "./Checkbox";
import Questions from "./Questions";
import DetailedQuestion from "./DetailedQuestion";

const AdminDashboard = () => {
  const [selectedOption, setSelectedOption] = useState(0);

  const handleOptionChange = (optionId) => {
    setSelectedOption(optionId);
  };

  const ChartContent = () => {
    useEffect(() => {
      const pieCtx = document.getElementById("pieChart");
      const barCtx = document.getElementById("barChart");

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
      <div className="flex h-[400px]">
        <div className="w-1/3 ">
          <canvas id="pieChart" width="200" height="200"></canvas>
        </div>
        <div className="w-2/3">
          <canvas id="barChart" width="400" height="200"></canvas>
        </div>
      </div>
    );
  };

  const options = [
    { id: 0, name: "Option 1", content: <ChartContent /> },
    { id: 2, name: "Option 2", content: <CheckboxBar /> },
    { id: 3, name: "Option 3", content: <Questions /> },
    { id: 4, name: "Option 4", content: <DetailedQuestion /> },
  ];

  return (
    <div className="flex flex-col h-screen">
      <header className="bg-gray-900 text-white flex justify-between items-center p-4 shadow-md shadow-black m-4 rounded">
        <button className="text-white mr-4">
          <FaUser />
        </button>
        <div>Dashboard</div>
        <button className="text-white">
          <FaSignOutAlt />
        </button>
      </header>
      <div className="flex flex-grow">
        <nav className="bg-gray-800 text-white w-64 flex flex-col shadow-md m-4 rounded shadow-black">
          {options.map((option) => (
            <button
              key={option.id}
              className={`p-4 hover:bg-gray-700 ${
                selectedOption === option.id && "bg-gray-700"
              }`}
              onClick={() => handleOptionChange(option.id)}
            >
              {option.name}
            </button>
          ))}
        </nav>
        <div className="flex-grow p-4">
          {options.find((opt) => opt.id === selectedOption)?.content}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;

import React, { useEffect, useRef, useState } from "react";
import Chart from "chart.js/auto";
import { supabase } from "../../utils/Supabase";

const ChartContent = () => {
  const pieChartRef = useRef(null);
  const barChartRef = useRef(null);
  const [userData, setUserData] = useState();
  const [monthincome, setmonthincome] = useState(0);
  useEffect(() => {
    const fetchData = async () => {
      const { data: basicDetails, error: basicDetailsError } = await supabase
        .from("basic_details")
        .select("*");

      if (basicDetailsError) {
        console.error(
          "Error fetching data from Supabase (basic_details):",
          basicDetailsError
        );
        return;
      }

      const { data: responseData, error: responseDataError } = await supabase
        .from("responseoftaskdetails")
        .select("*");

      if (responseDataError) {
        console.error(
          "Error fetching data from Supabase (responseoftaskdetails):",
          responseDataError
        );
        return;
      }

      const currentMonth = new Date().getMonth() + 1;
      const currentYear = new Date().getFullYear();

      const joinedData = responseData.map((responseRecord) => {
        const basicDetail = basicDetails.find(
          (detail) => detail.student_id === responseRecord.student_id
        );

        const paymentDate = new Date(responseRecord.payment_date);
        const paymentMonth = paymentDate.getMonth() + 1;
        const paymentYear = paymentDate.getFullYear();

        return {
          ...responseRecord,
          ...basicDetail,
          isCurrentMonth:
            paymentYear === currentYear && paymentMonth === currentMonth,
        };
      });

      const filteredData = joinedData.filter((record) => record.isCurrentMonth);
      console.log(joinedData)
      setmonthincome(filteredData?.length * 99);
      setUserData(joinedData);
    };

    fetchData();
  }, []);
  useEffect(() => {
    const pieCtx = pieChartRef.current.getContext("2d");
    const barCtx = barChartRef.current.getContext("2d");
  
    if (!pieCtx || !barCtx) {
      console.error("Canvas context not found");
      return;
    }
  
    // Assuming the fetched data is stored in the 'userData' state variable
    if (userData) {
      // Create an object to store the count of records for each month
      const monthlyCount = {};
      for (let i = 0; i < 12; i++) {
        monthlyCount[i + 1] = 0; // Initialize count for each month to 0
      }
  
      // Count the number of records for each month
      userData.forEach((record) => {
        const paymentDate = new Date(record.payment_date);
        const paymentMonth = paymentDate.getMonth() + 1;
        monthlyCount[paymentMonth]++;
      });
  
      // Create arrays for pie chart labels and data
      const pieLabels = [];
      const pieData = [];
      for (let month = 1; month <= 12; month++) {
        pieLabels.push(`Month ${month}`);
        pieData.push(monthlyCount[month]);
      }
  
      // Create an object to store the count of records for each sector
      const sectorCount = {};
      userData.forEach((record) => {
        const sector = record.sector;
        sectorCount[sector] = (sectorCount[sector] || 0) + 1;
      });
  
      // Create arrays for bar chart labels and data
      const barLabels = Object.keys(sectorCount);
      const barData = Object.values(sectorCount);
  
      const pieChart = new Chart(pieCtx, {
        type: "pie",
        data: {
          labels: pieLabels,
          datasets: [
            {
              label: "Number of Records",
              data: pieData,
              backgroundColor: [
                "rgba(255, 99, 132, 0.2)",
                "rgba(54, 162, 235, 0.2)",
                "rgba(255, 206, 86, 0.2)",
                "rgba(75, 192, 192, 0.2)",
                "rgba(153, 102, 255, 0.2)",
                "rgba(255, 159, 64, 0.2)",
                // Add more colors if needed
              ],
              borderColor: [
                "rgba(255, 99, 132, 1)",
                "rgba(54, 162, 235, 1)",
                "rgba(255, 206, 86, 1)",
                "rgba(75, 192, 192, 1)",
                "rgba(153, 102, 255, 1)",
                "rgba(255, 159, 64, 1)",
                // Add more colors if needed
              ],
              borderWidth: 1,
            },
          ],
        },
      });
  
      const barChart = new Chart(barCtx, {
        type: "bar",
        data: {
          labels: barLabels,
          datasets: [
            {
              label: "Number of Records",
              data: barData,
              backgroundColor: [
                "rgba(255, 99, 132, 0.2)",
                "rgba(54, 162, 235, 0.2)",
                "rgba(255, 206, 86, 0.2)",
                "rgba(75, 192, 192, 0.2)",
                "rgba(153, 102, 255, 0.2)",
                "rgba(255, 159, 64, 0.2)",
                // Add more colors if needed
              ],
              borderColor: [
                "rgba(255, 99, 132, 1)",
                "rgba(54, 162, 235, 1)",
                "rgba(255, 206, 86, 1)",
                "rgba(75, 192, 192, 1)",
                "rgba(153, 102, 255, 1)",
                "rgba(255, 159, 64, 1)",
                // Add more colors if needed
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
    }
  }, [userData]);
  return (
    <>
      {" "}
      <div className="bg-white shadow-md rounded-lg p-6 m-3">
        <h2 className="text-2xl font-bold mb-4">Income</h2>
        <div className="lg:flex justify-between">
          <div className="mb-6 md:w-1/2">
            <h3 className="text-lg font-semibold mb-2">Current Month Income</h3>
            <p className="text-lg">{monthincome}</p>
          </div>

          <div className="md:w-1/2">
            <h3 className="text-lg font-semibold mb-2">Total Income</h3>
            <p className="text-lg">{userData?.length * 99}</p>
          </div>
        </div>
      </div>
      <div className="lg:flex flex-col lg:flex-row lg:h-[400px] items-center justify-between bg-white shadow-md rounded-lg  m-3">
        <div className="w-full lg:w-1/3  overflow-hidden h-[400px] flex justify-center">
          <canvas ref={pieChartRef} style={{ maxWidth: "100%" }}></canvas>
        </div>
        <div className="w-full lg:w-2/3">
          <canvas
            ref={barChartRef}
            style={{ width: "100%", minWidth: "200px" }}
          ></canvas>
        </div>
      </div>
    </>
  );
};

export default ChartContent;

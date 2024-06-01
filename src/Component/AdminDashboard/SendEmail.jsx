import React, { useState, useEffect } from "react";
import { supabase } from "../../utils/Supabase";

const SendEmail = () => {
  const [checkboxes, setCheckboxes] = useState({});
  const [selectedData, setSelectedData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const date = new Date();
  date.setDate(1); // Set to the 1st day of the current month
  const [fromdate, setfromDate] = useState(date.toISOString().split("T")[0]);
  const [todate, settoDate] = useState(new Date().toISOString().split("T")[0]);

  const [data, setData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const { data: basicDetails, error: basicDetailsError } = await supabase
        .from("basic_details")
        .select("*")
        .gt("created_date", fromdate) // Filter by greater than fromDate
        .lt("created_date", todate); // Filter by less than toDate

      if (basicDetailsError) {
        console.error(
          "Error fetching data from Supabase (basic_details):",
          basicDetailsError
        );
        return;
      }

      setData(basicDetails);
    };

    fetchData();
  }, []);

  const handleCheckboxAndSelectChange = (rowData, checkboxName) => {
    const updatedCheckboxState = {
      ...checkboxes,
      [rowData.id]: {
        ...checkboxes[rowData.id],
        [checkboxName]: !checkboxes[rowData.id]?.[checkboxName],
      },
    };
    const updatedSelectedData = !checkboxes[rowData.id]?.[checkboxName]
      ? [...selectedData, rowData]
      : selectedData.filter((item) => item.id !== rowData.id);
    setCheckboxes(updatedCheckboxState);
    setSelectedData(updatedSelectedData);
  };

  const filteredData = data.filter((item) => {
    return (
      item.student_id.toString().includes(searchTerm) ||
      (item.first_name &&
        item.first_name.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (item.last_name &&
        item.last_name.toLowerCase().includes(searchTerm.toLowerCase()))
    );
  });
  const handleSend = async () => {
    const config = {
      SecureToken: "e071229f-d686-4318-864b-f966c5448984",
      To: "guptaayush617@gmail.com",
      From: "ayush.gupta2020@glbajajgroup.org",
      Subject: "Offer letter",
      Body: "body",
    };

    if (window.Email) {
      window.Email.send(config)
        .then(() => alert("Email sent successfully"))
        .catch((error) => alert("Failed to send email: " + error.message));
    } else {
      alert("Email service is not available.");
    }
  };


  return (
    <div className="overflow-x-auto m-4 bg-white p-3 rounded">
      <input
        type="text"
        placeholder="Search by student ID, first name, or last name"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="border border-gray-300 rounded p-2 mb-4 w-full"
      />
      <div class="flex justify-between my-2">
        <input
          type="date"
          name="from"
          id="from"
          value={fromdate}
          onChange={(e) => setfromDate(e.target.value)}
          class="appearance-none block  bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
        />
        <input
          type="date"
          name="to"
          id="to"
          value={todate}
          onChange={(e) => settoDate(e.target.value)}
          class="appearance-none block  bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
        />
      </div>

      <table className="border border-gray-300 rounded p-4 mb-4 w-full">
        <thead>
          <tr>
            <th className="p-4">Student ID</th>
            <th className="p-4">First Name</th>
            <th className="p-4">Last Name</th>
            <th className="p-4">Select</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.map((rowData) => (
            <tr key={rowData.id}>
              <td className="p-4 text-center">{rowData.student_id}</td>
              <td className="p-4 text-center">{rowData.first_name}</td>
              <td className="p-4 text-center">{rowData.last_name}</td>
              <td className="p-4 text-center">
                <input
                  type="checkbox"
                  className="form-checkbox h-6 w-6 mr-2"
                  checked={checkboxes[rowData.id]?.select || false}
                  onChange={() =>
                    handleCheckboxAndSelectChange(rowData, "select")
                  }
                />
              </td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <td colSpan="4" className="p-4 text-center">
              Selected Data:{" "}
              {selectedData
                .map((item) => `${item.first_name} ${item.last_name}`)
                .join(", ")}
            </td>
          </tr>
        </tfoot>
      </table>
      <div className="flex justify-center w-full">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={handleSend}
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default SendEmail;

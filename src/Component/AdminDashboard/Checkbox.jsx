import React, { useState, useEffect } from "react";
import { supabase } from "../../utils/Supabase";

const CheckboxBar = () => {
  const [checkboxes, setCheckboxes] = useState({});
  const [selectedData, setSelectedData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const { data: basicDetails, error: basicDetailsError } = await supabase
        .from("basic_details")
        .select("*");

      if (basicDetailsError) {
        console.error("Error fetching data from Supabase (basic_details):", basicDetailsError);
        return;
      }

      const { data: responseData, error: responseDataError } = await supabase
        .from("responseoftaskdetails")
        .select("*");

      if (responseDataError) {
        console.error("Error fetching data from Supabase (responseoftaskdetails):", responseDataError);
        return;
      }

      const joinedData = responseData.map((responseRecord) => {
        const basicDetail = basicDetails.find(
          (detail) => detail.student_id === responseRecord.student_id
        );

        return {
          ...responseRecord,
          ...basicDetail,
        };
      });

      setData(joinedData);
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
      (item.first_name && item.first_name.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (item.last_name && item.last_name.toLowerCase().includes(searchTerm.toLowerCase()))
    );
  });

  return (
    <div className="overflow-x-auto m-4 bg-white p-3 rounded">
      <input
        type="text"
        placeholder="Search by student ID, first name, or last name"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="border border-gray-300 rounded p-2 mb-4 w-full"
      />
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
                  onChange={() => handleCheckboxAndSelectChange(rowData, "select")}
                />
              </td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <td colSpan="4" className="p-4 text-center">
              Selected Data:{" "}
              {selectedData.map((item) => `${item.first_name} ${item.last_name}`).join(", ")}
            </td>
          </tr>
        </tfoot>
      </table>
      <div className="flex justify-center w-full">
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Send
        </button>
      </div>
    </div>
  );
};

export default CheckboxBar;
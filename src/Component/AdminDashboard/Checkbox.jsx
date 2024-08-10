import React, { useState, useEffect } from "react";
import { supabase } from "../../utils/Supabase";

const CheckboxBar = () => {
  const [checkboxes, setCheckboxes] = useState({});
  const [selectedData, setSelectedData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [data, setData] = useState([]);
  const [filteredData, setfilteredData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      // Fetch basic_details and responseoftaskdetails with join
      const { data: joinedData, error: joinedDataError } = await supabase.from(
        "responseoftaskdetails"
      ).select(`
          *,
          basic_details:basic_details!public_responseoftaskdetails_student_id_fkey (
            *
          )
        `);

      if (joinedDataError) {
        console.error(
          "Error fetching joined data from Supabase:",
          joinedDataError
        );
        return;
      }

      // Fetch confirmation data separately
      const { data: confirmationData, error: confirmationDataError } =
        await supabase.from("confirmation").select("*");

      if (confirmationDataError) {
        console.error(
          "Error fetching data from Supabase (confirmation):",
          confirmationDataError
        );
        return;
      }

      // Get the list of student IDs from the confirmation data
      const confirmationStudentIds = new Set(
        confirmationData.map((record) => record.student_id)
      );

      // Filter out records that have matching student_id in confirmation data
      const filt = joinedData
        .map((responseRecord) => ({
          ...responseRecord,
          ...responseRecord.basic_details,
        }))
        .filter((record) => !confirmationStudentIds.has(record.student_id));

      const filter = filt.filter((item) => {
        return (
          item.student_id.toString().includes(searchTerm) ||
          (item.first_name &&
            item.first_name.toLowerCase().includes(searchTerm.toLowerCase())) ||
          (item.last_name &&
            item.last_name.toLowerCase().includes(searchTerm.toLowerCase()))
        );
      });
      setfilteredData(filter);
      // Set the state with the filtered joined data
      setData(filt);
      console.log(filteredData);
    };

    fetchData();
  }, []);

  const handleCheckboxAndSelectChange = (rowData, checkboxName) => {
    const updatedCheckboxState = {
      ...checkboxes,
      [rowData.student_id]: {
        ...checkboxes[rowData.student_id],
        [checkboxName]: !checkboxes[rowData.student_id]?.[checkboxName],
      },
    };
    const updatedSelectedData = !checkboxes[rowData.student_id]?.[checkboxName]
      ? [...selectedData, rowData]
      : selectedData.filter((item) => item.student_id !== rowData.student_id);
    setCheckboxes(updatedCheckboxState);
    setSelectedData(updatedSelectedData);
  };

  
  const handlesendbutton = async () => {
    console.log(selectedData);
    const confirmationrecord = selectedData.map((data) => ({
      student_id: data.student_id,
      ResponseOfTask: true,
      ResponseOfTaskDate: data.payment_date,
      CompletionCertificate:
        data.payment_boolean &&
        data.firstquestiongithublink !== null &&
        data.firstquestiongithublink !== ""
          ? true
          : false,
      CompletionCertificateDate: new Date().toISOString(), // Convert to ISO format
      LetterOfRecommendation:
        data.payment_boolean &&
        data.secondquestiongithublink !== null &&
        data.secondquestiongithublink !== ""
          ? true
          : false,
      LetterOfRecommendationDate: new Date().toISOString(), // Convert to ISO format
      Goodies:
        data.payment_boolean &&
        data.thirdquestiongithublink !== null &&
        data.thirdquestiongithublink !== ""
          ? true
          : false,
      GoodiesReceivedDate: new Date().toISOString(), // Convert to ISO format
      Payment: true,
      PaymentDate: data.payment_date,
    }));

    console.log(confirmationrecord);

    const { data, error } = await supabase
      .from("confirmation")
      .insert(confirmationrecord);

    if (error) {
      console.error("Error inserting confirmations:", error);
      return;
    }

    
    const remainingData = filteredData.filter(
      (item) =>
        !selectedData.some(
          (selected) => selected.student_id === item.student_id
        )
    );
    setfilteredData(remainingData);

    console.log("Confirmations inserted successfully:", data);
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
            <tr key={rowData.student_id}>
              <td className="p-4 text-center">{rowData.student_id}</td>
              <td className="p-4 text-center">{rowData.first_name}</td>
              <td className="p-4 text-center">{rowData.last_name}</td>
              <td className="p-4 text-center">
                <input
                  type="checkbox"
                  className="form-checkbox h-6 w-6 mr-2"
                  checked={checkboxes[rowData.student_id]?.select || false}
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
          onClick={handlesendbutton}
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default CheckboxBar;

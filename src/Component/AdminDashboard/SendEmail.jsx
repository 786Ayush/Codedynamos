import React, { useState, useEffect } from "react";
import { supabase } from "../../utils/Supabase";
import emailjs from "@emailjs/browser";

const SendEmail = () => {
  const [checkboxes, setCheckboxes] = useState({});
  const [selectedData, setSelectedData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const date = new Date();
  date.setDate(1); // Set to the 1st day of the current month
  const [fromdate, setFromDate] = useState(date.toISOString().split("T")[0]);
  const [todate, setToDate] = useState(new Date().toISOString().split("T")[0]);
  const [data, setData] = useState([]);
  const [update, setupdate] = useState(0);
  const [filteredData, setfilteredData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const { data: basicDetails, error: basicDetailsError } = await supabase
        .from("basic_details")
        .select("*")
        .gt("created_date", fromdate)
        .eq("email_sent", false);

      if (basicDetailsError) {
        console.error(
          "Error fetching data from Supabase (basic_details):",
          basicDetailsError
        );
        return;
      }

      const filtered = basicDetails.filter((item) => {
        return (
          item.student_id.toString().includes(searchTerm) ||
          (item.first_name &&
            item.first_name.toLowerCase().includes(searchTerm.toLowerCase())) ||
          (item.last_name &&
            item.last_name.toLowerCase().includes(searchTerm.toLowerCase()))
        );
      });

      setfilteredData(filtered);
      setData(basicDetails);
    };

    fetchData();
  }, [fromdate, todate, update]);

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

  // const filtered = data.filter((item) => {
  //   return (
  //     item.student_id.toString().includes(searchTerm) ||
  //     (item.first_name &&
  //       item.first_name.toLowerCase().includes(searchTerm.toLowerCase())) ||
  //     (item.last_name &&
  //       item.last_name.toLowerCase().includes(searchTerm.toLowerCase()))
  //   );
  // });

  // setfilteredData(filtered);

  const handleSend = async () => {
    for (const student of selectedData) {
      const emailData = {
        to_email: student.email,
        name:
          student.first_name +
          " " +
          (student.middle_name === "" ? "" : student.middle_name + " ") +
          student.last_name,
        position: student.sector,
        start_date: student.Start_Date,
        duration: "1 month",
        email: student.email,
        password: student.password,
      };

      const serviceId = process.env.REACT_APP_serviceId; //"service_p5oq0q1";
      const templateId = process.env.REACT_APP_templateId; //"template_z41y55f";
      const publicKey = process.env.REACT_APP_publicKey; //"LO3Xwt5zDzIeR-5gK";

      try {
        const response = await emailjs.send(
          serviceId,
          templateId,
          emailData,
          publicKey
        );

        console.log("EmailJS response:", response);
        if (response.status === 200) {
          console.log("Email sent successfully");
          const { error, data } = await supabase
            .from("basic_details")
            .update({ email_sent: true })
            .eq("student_id", student.student_id)
            .select();
          console.log(data);
          if (error) console.log("Error updating email_sent:", error);
          // alert("Email sent successfully");
        } else {
          console.warn("Unexpected response from EmailJS:", response);
          alert("Unexpected response from email service");
          setupdate(update + 1);
        }
      } catch (error) {
        console.error("Error sending email:", error);
        alert("Failed to send email: " + error.message);
      }
    }
    const remainingData = filteredData.filter(
      (item) =>
        !selectedData.some(
          (selected) => selected.student_id === item.student_id
        )
    );
    setfilteredData(remainingData);
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
      <div className="flex justify-between my-2">
        <input
          type="date"
          name="from"
          id="from"
          value={fromdate}
          onChange={(e) => setFromDate(e.target.value)}
          className="appearance-none block bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
        />
        <input
          type="date"
          name="to"
          id="to"
          value={todate}
          onChange={(e) => setToDate(e.target.value)}
          className="appearance-none block bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
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
          onClick={handleSend}
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default SendEmail;

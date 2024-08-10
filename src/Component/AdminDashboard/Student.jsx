import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "../../utils/Supabase";

const StudentScreen = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [Student_data, setStudentData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const { data: basicDetails, error: basicDetailsError } = await supabase
        .from("basic_details")
        .select("*");
      if (basicDetailsError) {
        console.error("Error fetching student data:", basicDetailsError);
      } else {
        setStudentData(basicDetails);
      }
    };
    fetchData();
  }, []);

  // Function to check if the date is within the last month
  const isDateWithinLastMonth = (dateString) => {
    const createdDate = new Date(dateString);
    const currentDate = new Date();
    const oneMonthAgo = new Date();
    oneMonthAgo.setMonth(currentDate.getMonth() - 1);
    return createdDate >= oneMonthAgo;
  };

  // Filter students based on search term
  const filteredStudents = Student_data.filter((student) => {
    return (
      student.first_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.student_id.toString().includes(searchTerm.toLowerCase())
    );
  });

  return (
    <div className="container mx-auto">
      <h1 className="text-2xl font-bold mb-4">Student Data</h1>
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search by ID or Name"
          className="border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm w-full p-4"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <div className="flex flex-col">
        <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
            <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      ID
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Name
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredStudents.map((student) => (
                    <tr key={student.student_id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {student.student_id}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <Link
                          to={`/admindashboard/detailedquestion/${student.student_id}`}
                          className="text-sm text-blue-500 hover:underline"
                        >
                          {student.first_name}
                        </Link>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            isDateWithinLastMonth(student.created_date)
                              ? "bg-green-100 text-green-800"
                              : "bg-red-100 text-red-800"
                          }`}
                        >
                          {isDateWithinLastMonth(student.created_date)
                            ? "Active"
                            : "Inactive"}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentScreen;

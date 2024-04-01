import React, { useState } from "react";
import { Link } from "react-router-dom";

const StudentScreen = () => {
  const [searchTerm, setSearchTerm] = useState("");

  // Example student data
  const students = [
    { id: "CD01", name: "Student 1", status: "Active" },
    { id: "CD02", name: "Student 2", status: "Inactive" },
    { id: "CD03", name: "Student 3", status: "Active" },
    { id: "CD04", name: "Student 4", status: "Inactive" },
    { id: "CD05", name: "Student 5", status: "Active" },
    { id: "CD06", name: "Student 6", status: "Inactive" },
    { id: "CD07", name: "Student 7", status: "Active" },
    { id: "CD08", name: "Student 8", status: "Inactive" },
    { id: "CD09", name: "Student 9", status: "Active" },
    { id: "CD10", name: "Student 10", status: "Inactive" },
    { id: "CD11", name: "Student 11", status: "Active" },
    { id: "CD12", name: "Student 12", status: "Inactive" },
    { id: "CD13", name: "Student 13", status: "Active" },
    { id: "CD14", name: "Student 14", status: "Inactive" },
    { id: "CD15", name: "Student 15", status: "Active" },
    { id: "CD16", name: "Student 16", status: "Inactive" },
    { id: "CD17", name: "Student 17", status: "Active" },
    { id: "CD18", name: "Student 18", status: "Inactive" },
    { id: "CD19", name: "Student 19", status: "Active" },
    { id: "CD20", name: "Student 20", status: "Inactive" },
  ];

  // Filter students based on search term
  const filteredStudents = students.filter((student) => {
    return (
      student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.id.toString().includes(searchTerm.toLowerCase())
    );
  });

  return (
    <div className="container mx-auto">
      <h1 className="text-2xl font-bold mb-4">Student Data</h1>
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search by ID or Name"
          className="border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm w-full"
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
                    <tr key={student.id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {student.id}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <Link
                          to={`/admindashboard/detailedquestion/${student.id}`}
                          className="text-sm text-blue-500 hover:underline"
                        >
                          {student.name}
                        </Link>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            student.status === "Active"
                              ? "bg-green-100 text-green-800"
                              : "bg-red-100 text-red-800"
                          }`}
                        >
                          {student.status}
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

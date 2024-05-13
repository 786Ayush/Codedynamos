import React, { useState } from "react";
import { FaUser, FaSignOutAlt } from "react-icons/fa";
import { Link, Route, Routes } from "react-router-dom";
import ChartContent from "./ChartContent";
import CheckboxBar from "./Checkbox";
import Questions from "./Questions";
import DetailedQuestion from "./DetailedQuestion";
import StudentScreen from "./Student";
import DetailedStudent from "./DetailedStudent";
import StudentDetailPage from "./DetailedStudent";
import Cookies from "js-cookie";

const AdminDashboard = () => {
  const [selectedOption, setSelectedOption] = useState(0);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleOptionChange = (optionId) => {
    setSelectedOption(optionId);
  };

  const options = [
    {
      id: 0,
      name: "Option 1",
      path: "/",
      element: <ChartContent />,
    },
    {
      id: 2,
      name: "Option 2",
      path: "/checkbox",
      element: <CheckboxBar />,
    },
    {
      id: 3,
      name: "Option 3",
      path: "/questions",
      element: <Questions />,
    },
    {
      id: 4,
      name: "Option 4",
      path: "/detailedquestion",
      element: <StudentScreen />,
    },
  ];

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleLogout = () => {// Remove encrypted user data from cookies
    Cookies.remove("encryptedAdminUser");
    // Perform any additional logout actions
    // For example: redirect to the login page
    window.location.href = "/adminlogin"; // Redirect to login page after logout
  };

  return (
    <div className="flex flex-col h-screen">
      <header className="bg-gray-900 text-white flex justify-between items-center p-4 shadow-md shadow-black m-4 rounded">
        <button className="text-white mr-4" onClick={toggleSidebar}>
          <FaUser />
        </button>
        <div>Dashboard</div>
        <button className="text-white" onClick={handleLogout}>
          <FaSignOutAlt />
        </button>
      </header>
      <div className="flex flex-grow">
        <nav className="bg-gray-800 text-white w-screen lg:w-80 hidden lg:flex flex-col shadow-md m-4 rounded shadow-black">
          {options.map((option) => (
            <Link
              key={option.id}
              to={`/admindashboard${option.path}`}
              className={`p-4 hover:bg-gray-700`}
              activeClassName="bg-gray-700"
              onClick={() => handleOptionChange(option.id)}
            >
              {option.name}
            </Link>
          ))}
        </nav>

        <div className="flex-grow">
          <Routes>
            {options.map((option) => (
              <Route
                key={option.id}
                path={option.path}
                element={option.element}
              />
            ))}
            <Route
              path={`/questions/detail/*`}
              element={<DetailedQuestion />}
            />
            <Route path="/detailedquestion/*" element={<StudentDetailPage />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;

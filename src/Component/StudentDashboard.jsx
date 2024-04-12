import { useState } from "react";
import { Button, Divider, Image } from "@nextui-org/react";
import { FaBars } from "react-icons/fa";
import { IoMdLogOut } from "react-icons/io";
import Cookies from "js-cookie";

const Dashboard = () => {
  const [taskColors, setTaskColors] = useState({
    task1: 0,
    task2: 0,
    task3: 0,
    task4: 1,
    task5: 0,
    task6: 0,
  });
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [showSidebarOptions, setShowSidebarOptions] = useState(true);

  const options = [
    { id: "Option1", name: "📄 View Offer Letter", content: "" },
    { id: "Option2", name: "📋 Allocated Tasks", content: "" },
    { id: "Option3", name: "📝 Task Submission", content: "" },
    { id: "Option4", name: "📜 Internship Certificate", content: "" },
    { id: "Option5", name: "📃 LOR Letter", content: "" },
    { id: "Option6", name: "🎁 Swags Form", content: "" },
  ];

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const toggleSidebarOptions = () => {
    setShowSidebarOptions(!showSidebarOptions);
  };
  const handleLogout = () => {
    // Remove encrypted user data from cookies
    Cookies.remove("encryptedUser");
    // Perform any additional logout actions
    // For example: redirect to the login page
    window.location.href = "/login";
  };


  return (
    <div className="flex flex-col ">
      <header className="bg-gray-900 text-white flex justify-between items-center p-2 shadow-lg shadow-black m-4 rounded-md">
        <Button className="md:hidden" onClick={toggleSidebar}>
          <FaBars />
        </Button>
        <div className="hidden md:block text-xl font-semibold pl-3">
          Dashboard
        </div>
        <IoMdLogOut className="w-10 h-10 pr-3" onClick={handleLogout} />
      </header>
      <div className="flex w-full md:w-screen">
        <nav
          className={`${
            isSidebarOpen ? "block" : "hidden"
          } md:block bg-gray-800 text-white w-full md:w-1/6 flex flex-col shadow-lg shadow-black m-4 rounded-lg`}
        >
          <div className="h-[150px]  flex items-center justify-center">
            <Image
              src="/reallogo.png"
              alt="Next UI Logo"
              width={150}
              height={150}
            />
          </div>
          <Divider />
          <div className="flex  flex-col">
            {options.map((option) => (
              <Button
                key={option.id}
                className="w-full text-base flex hover:bg-zinc-600 justify-start p-3"
                ghost
                onClick={toggleSidebarOptions}
              >
                {option.name}
              </Button>
            ))}
          </div>
        </nav>
        <div
          className={`${
            isSidebarOpen ? "hidden" : "block"
          } flex flex-col pl-8 m-4 rounded-lg shadow-xl shadow-black w-full p-4`}
        >
          <h1 className="text-3xl font-bold mb-4">Greeting, John</h1>
          <div className="dashboard-info">
            <h3 className="text-lg font-medium mb-2">
              Intern Identification: CC4143
            </h3>
            <h3 className="text-lg font-medium mb-2">
              Role: Intern in Web Development
            </h3>
            <h3 className="text-lg font-medium mb-2">
              Enrollment: January 2023 Batch
            </h3>
            <h3 className="text-lg font-medium mb-2">
              All tasks listed below must be completed to fulfill the internship
              requirements.
            </h3>
          </div>
          <h3 className="text-3xl font-bold mb-4">Internship Progression</h3>
          <ul className="task-list">
            <li className="text-base mb-1 text-green-400">
              &#10003; Apply for an Internship Position
            </li>
            <li className="text-base mb-1  text-green-400">
              &#10003; Receive an Offer from CodeClause
            </li>
            <li className="text-base mb-1 text-green-400">
              &#10003; Enrollment in Internship Batch
            </li>
            <li className="text-base mb-1 text-green-400">
              &#10003; Task Assignment
            </li>
            <li
              className="text-base mb-1"
              style={{ color: taskColors.task1 === 1 ? "#2DCC70" : "red" }}
            >
              &#10003; Fulfill Assigned Tasks
            </li>
            <li
              className="text-base mb-1"
              style={{ color: taskColors.task2 === 1 ? "#2DCC70" : "red" }}
            >
              &#10003; Submit Completed Tasks
            </li>
            <li
              className="text-base mb-1"
              style={{ color: taskColors.task3 === 1 ? "#2DCC70" : "red" }}
            >
              &#10003; Verification of Project Submission
            </li>
            <li
              className="text-base mb-1"
              style={{ color: taskColors.task4 === 1 ? "#2DCC70" : "red" }}
            >
              &#10003; Receive Internship Completion Certificate
            </li>
            <li
              className="text-base mb-1"
              style={{ color: taskColors.task5 === 1 ? "#2DCC70" : "red" }}
            >
              &#10003; Obtain Letter of Recommendation (LOR)
            </li>
            <li
              className="text-base mb-1"
              style={{ color: taskColors.task6 === 1 ? "#2DCC70" : "red" }}
            >
              &#10003; Qualify for Swag Rewards
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

import { useEffect, useState } from "react";
import { Button, Divider, Image, Spinner } from "@nextui-org/react";
import { FaBars } from "react-icons/fa";
import { IoMdLogOut } from "react-icons/io";
import Cookies from "js-cookie";

import html2canvas from "html2canvas";
import jsPDF from "jspdf";

import CryptoJS from "crypto-js";
import { Link } from "react-router-dom";

import { supabase } from "../../utils/Supabase";
import { handleofferletter } from "./Documents/handleofferletter";
import { handletaskallocation } from "./Documents/handletaskallocation";
import { handleletterofCompletion } from "./Documents/handleletterofCompletion";
import { handleletterofRecommandation } from "./Documents/handleletterofrecommandation";
const Dashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [showSidebarOptions, setShowSidebarOptions] = useState(true);
  const [month, setmonth] = useState("");
  const [year, setyear] = useState("");
  const [loader, setloader] = useState(false);
  const [submittrue, setsubmittrue] = useState(false);
  const [letters, setletters] = useState();
  const [userdata, setuserdata] = useState();
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const toggleSidebarOptions = () => {
    // onOpen();
    setShowSidebarOptions(!showSidebarOptions);
  };
  const handleLogout = () => {
    // Remove encrypted user data from cookies
    Cookies.remove("encryptedUser");
    // Perform any additional logout actions
    // For example: redirect to the login page
    window.location.href = "/login";
  };
  const [user, setuser] = useState(null);
  useEffect(() => {
    const encryptedUser = Cookies.get("encryptedUser");
    if (encryptedUser) {
      try {
        // Decrypt user data
        const decryptedUserBytes = CryptoJS.AES.decrypt(
          encryptedUser,
          "secretKey"
        );
        const decryptedUserData = decryptedUserBytes.toString(
          CryptoJS.enc.Utf8
        );

        // Parse decrypted user data
        const userData = JSON.parse(decryptedUserData);

        // Perform any additional checks if needed

        // Set login state to true

        // console.log(userData);

        const fetchuserdata = async () => {
          try {
            const { data, error } = await supabase
              .from("educational_details")
              .select("*")
              .eq("student_id", userData.student_id) // Replace with the appropriate student ID
              .single();

            if (error) {
              console.error("Error fetching task details:", error);
            } else {
              const combinedData = { ...userData, ...data };
              setuser(combinedData);
              // console.log(combinedData);
            }
          } catch (error) {
            console.error("Error fetching task details:", error);
          }
        };
        fetchuserdata();
        // console.log(userData);
        // setuser(userData);
        const dateObj = new Date(userData.Start_Date);
        const months = [
          "January",
          "February",
          "March",
          "April",
          "May",
          "June",
          "July",
          "August",
          "September",
          "October",
          "November",
          "December",
        ];
        setmonth(months[dateObj.getMonth()]); // Adding 1 because getMonth() returns month index starting from 0
        setyear(dateObj.getFullYear());
      } catch (error) {
        console.error("Error decrypting user data:", error.message);
      }
    }
  }, []);

  useEffect(() => {
    const fetchTaskDetails = async () => {
      if (user) {
        try {
          const { data, error } = await supabase
            .from("responseoftaskdetails")
            .select(
              `
              *,
              confirmation (*)
            `
            )
            .eq("student_id", user.student_id) // Use the appropriate student ID
            .single();

          if (error) {
            console.error("Error fetching task details:", error);
          } else {
            // console.log(data);
            setsubmittrue(true);
            setletters(data.confirmation); // Access the nested confirmation data
          }
        } catch (error) {
          console.error("Error fetching task details:", error);
        }
      }
    };

    // console.log(user);
    fetchTaskDetails();
  }, [user]);

  return (
    <>
      {/* {loader ? (
        <div className="flex items-center justify-center h-screen">
          <Spinner size="lg" />
        </div>
      ) : ( */}
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
              isSidebarOpen ? "block" : "hidden md:block"
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
            {loader ? (
              <div className="flex items-center justify-center ">
                <Spinner size="lg" />
              </div>
            ) : (
              <div className="flex  flex-col">
                <button
                  key="Option1"
                  className="w-full text-base flex hover:bg-zinc-600 justify-start p-3"
                  onClick={async () => {
                    setloader(true);
                    await handleofferletter(user);
                    setloader(false);
                  }}
                >
                  📄 View Offer Letter
                </button>
                <button
                  key="Option2"
                  className="w-full text-base flex hover:bg-zinc-600 justify-start p-3"
                  onClick={async () => {
                    setloader(true);
                    await handletaskallocation({
                      studentId: user.student_id,
                      date: user.Start_Date,
                    });
                    setloader(false);
                  }}
                >
                  📋 Allocated Tasks
                </button>

                <Link to={submittrue ? "#" : "/dashboard/submissionform"}>
                  <button
                    key="Option3"
                    className="w-full text-base flex hover:bg-zinc-600 justify-start p-3"
                    ghost
                  >
                    📝 Task Submission
                  </button>
                </Link>
                <button
                  key="Option4"
                  className={`w-full text-base flex ${
                    letters?.CompletionCertificate && "hover:bg-zinc-600"
                  } justify-start p-2`}
                  onClick={async () => {
                    if (letters?.CompletionCertificate) {
                      setloader(true);
                      await handleletterofCompletion(user);
                      setloader(false);
                    }
                  }}
                >
                  📜 Internship Certificate
                </button>
                <button
                  key="Option5"
                  className={`w-full text-base flex ${
                    letters?.LetterOfRecommendation && "hover:bg-zinc-600"
                  } justify-start p-3`}
                  ghost
                  onClick={async () => {
                    if (letters?.LetterOfRecommedation) {
                      setloader(true);
                      await handleletterofRecommandation(user);
                      setloader(false);
                    }
                  }}
                >
                  📃 LOR Letter
                </button>
                <button
                  key="Option6"
                  className={`w-full text-base flex ${
                    letters?.Goddies && "hover:bg-zinc-600"
                  } justify-start p-3`}
                  ghost
                  onClick={toggleSidebarOptions}
                >
                  🎁 Swags Form
                </button>
              </div>
            )}
          </nav>
          {user && (
            <div
              className={`${
                isSidebarOpen ? "hidden md:block" : "block"
              } flex flex-col pl-8 m-4 rounded-lg shadow-xl shadow-black w-full p-4`}
            >
              <h1 className="text-3xl font-bold mb-4">Greeting, John</h1>
              <div className="dashboard-info">
                <h3 className="text-lg font-medium mb-2">
                  Intern Identification: {user.student_id.toUpperCase()}
                </h3>
                <h3 className="text-lg font-medium mb-2">
                  Role: {user.sector}
                </h3>
                <h3 className="text-lg font-medium mb-2">
                  Enrollment: {month + " " + year} Batch
                </h3>
                <h3 className="text-lg font-medium mb-2">
                  All tasks listed below must be completed to fulfill the
                  internship requirements.
                </h3>
              </div>
              <h3 className="text-3xl font-bold mb-4">
                Internship Progression
              </h3>
              <ul className="task-list">
                <li className="text-base mb-1 text-green-400">
                  &#10003; Apply for an Internship Position
                </li>
                <li className="text-base mb-1  text-green-400">
                  &#10003; Receive an Offer from Codedynamos
                </li>
                <li className="text-base mb-1 text-green-400">
                  &#10003; Enrollment in Internship Batch
                </li>
                <li className="text-base mb-1 text-green-400">
                  &#10003; Task Assignment
                </li>
                <li
                  className="text-base mb-1"
                  style={{
                    color: submittrue ? "#2DCC70" : "red",
                  }}
                >
                  &#10003; Fulfill Assigned Tasks
                </li>
                <li
                  className="text-base mb-1"
                  style={{
                    color: submittrue ? "#2DCC70" : "red",
                  }}
                >
                  &#10003; Submit Completed Tasks
                </li>
                <li
                  className="text-base mb-1"
                  style={{
                    color: letters?.CompletionCertificate ? "#2DCC70" : "red",
                  }}
                >
                  &#10003; Verification of Project Submission
                </li>
                <li
                  className="text-base mb-1"
                  style={{
                    color: letters?.CompletionCertificate ? "#2DCC70" : "red",
                  }}
                >
                  &#10003; Receive Internship Completion Certificate
                </li>
                <li
                  className="text-base mb-1"
                  style={{
                    color: letters?.LetterOfRecommendation ? "#2DCC70" : "red",
                  }}
                >
                  &#10003; Obtain Letter of Recommendation (LOR)
                </li>
                <li
                  className="text-base mb-1"
                  style={{
                    color: letters?.Goddies ? "#2DCC70" : "red",
                  }}
                >
                  &#10003; Qualify for Swag Rewards
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
      {/* )} */}
    </>
  );
};

export default Dashboard;

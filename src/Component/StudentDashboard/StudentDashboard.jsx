import { useEffect, useState } from "react";
import { Button, Divider, Image, Spinner } from "@nextui-org/react";
import { FaBars } from "react-icons/fa";
import { IoMdLogOut } from "react-icons/io";
import Cookies from "js-cookie";
import OfferLetter from "./Documents/OfferLetter";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

import CryptoJS from "crypto-js";
import { Link } from "react-router-dom";
import InternshipOfferLetter from "./Documents/OfferLetter";
import { Offerletterr } from "./Documents/Offerletterr";

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
  const [month, setmonth] = useState("");
  const [year, setyear] = useState("");
  const [loader, setloader] = useState(false);

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
        console.log(userData);
        setuser(userData);
        const dateObj = new Date(userData.created_date);
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

  const handleofferletter = async () => {
    // setloader(true);
    const offerLetterHTML = `
    <body>
    <style>
        body {
          font-family: Arial, sans-serif;
          margin: 0;
          padding: 0;
          background-color: #f5f5f5;
        }
  
        .container {
          width: 21cm;
          height: 29.7cm;
          margin: 0.3cm;
          padding: 1cm;
          background-color: #ffffff;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        }
  
        header {
          text-align: center;
          padding: 20px;
          background-color: #1668aa;
          color: #ffffff;
          font-size: x-large;
        }
  
        .content {
          color: black;
          padding: 20px;
          position: relative; /* Ensure proper positioning context for absolute elements */
        }
  
        .background-overlay {
          position: absolute;
          top: 0;
          right: 0;
          bottom: 0;
          left: 0;
          background-image: url("/realogo2.png");
          opacity: 0.3; /* Adjust the opacity of the background image */
        }
  
        /* Apply the background overlay only to the .content div */
        .content .background-overlay {
          /* Set the size of the background overlay to match the content */
          width: 100%;
          height: 100%;
          background-size: 500px; /* Adjust the background size if necessary */
          background-repeat: no-repeat; /* Ensure the background image doesn't repeat */
          background-position: center; /* Center the background image */
        }
        .box {
          border: #333 solid 2px;
          overflow: hidden;
        }
  
        .signature {
          text-align: center;
          margin-top: 30px;
        }
  
        .signature img {
          width: 150px;
        }
  
        
      .stamp img {
        text-align: center;
        width: 150px;
      }

        p {
          margin-bottom: 10px;
        }
  
        h1 {
          margin-top: 0;
        }
  
        .stampsignature {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding-inline:20px;
        }
        .logo {
          display: flex;
          justify-content: center;
          height: 200px;
        }
        .contact,
        .msme {
          text-align: center;
        }
      </style>
      <div class="container">
        <div class="box">
          <div class="logo">
            <img src="/realogo2.png" height="200" alt="" />
          </div>
  
          <header>
            <div>Internship Offer Letter</div>
          </header>
  
          <div class="content">
            <div class="background-overlay"></div>
            <!-- Overlay for background image opacity -->
            <p>Date: 27/12/2022</p>
            <p>Ayush Gupta</p>
            <p>GL Bajaj Group of Institution</p>
            <br />
            <p>Dear Ayush Gupta,</p>
            <p>
              We are pleased to extend an internship offer to you at CodeDynamos!
            </p>
            <p>
              Congratulations! We are delighted to offer you a position as a Web
              Development Intern.
            </p>
            <p>Below are the terms and conditions of our offer:</p>
            <p>
              Your internship is scheduled to commence on [Scheduled Date of
              Internship]. Upon acceptance of this offer, you will assume the role
              of an intern with CodeDynamos. Please note that as an intern, you
              will be classified as a temporary employee and will not be entitled
              to employee benefits provided to regular employees.
            </p>
            <p>
              By accepting this offer, you agree to adhere to all company policies
              and practices, including those governing conduct,
              non-discrimination, and harassment prevention. This letter
              constitutes the entire agreement between you and CodeDynamos,
              superseding any prior discussions or agreements.
            </p>
            <p>
              We trust that your internship experience with CodeDynamos will be
              both enriching and rewarding.
            </p>
            <br />
            <div class="flex">
              <div class="">
                <img
                  src="/logo-black.png"
                  
                  alt="signature"
                  width="100"
                  height="100"
                />
                <p>Thank You</p>
                <p>CodeDynamos</p>
              </div>
              <div class="stamp">
                <img src="/logo-black.png" alt="stamp" />
              </div>
            </div>
          </div>
  
          <hr />
          <div class="stampsignature">
            <div class="contact">
              <p>Contact: abc@CodeDynamos.com</p>
              <p>Website: www.codeDynamos.com</p>
            </div>
            <div class="msme">
              <img
                src="/logo-black.png"
                
                alt="msme"
                width="100"
                height="100"
              />
            </div>
          </div>
        </div>
      </div>
      <!-- <button onclick="downloadPDF()">download</button> -->
      <!-- Include the jsPDF library -->
      <script src="https://cdnjs.cloudflare.com/ajax/libs/jspdf/1.3.3/jspdf.min.js"></script>
      <script src="https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js"></script>
      <script>
        
      </script>
    </body>
  `;
    const element = document.createElement("div");
    element.innerHTML = offerLetterHTML;
    document.body.appendChild(element);

    const container = element.querySelector(".container");
    const containerWidth = 210; // A4 width in mm
    const containerHeight = 297; // A4 height in mm

    container.style.height = `${containerHeight}mm`;

    container.style.overflow = "hidden";

    await html2canvas(element, {
      scale: 2,
      useCORS: true,
      allowTaint: true,
      scrollY: -window.scrollY,
    }).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");
      const containerWidth = (canvas.width / canvas.height) * containerHeight;
      const imgWidth = containerWidth;
      const imgHeight = containerHeight;
      pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight);
      pdf.save("internship_offer_letter.pdf");
      document.body.removeChild(element);
      setloader(false);
    });
  };
  const handletaskallocation = () => {
    setloader(true);
    console.log(loader);
    const taskAllocationHTML = `
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Task Allocation Document</title>
    <style>
    .head{
      font-size: x-large;
    }
    body {
      font-family: Arial, sans-serif;
      margin: 0;
      padding: 0;
      line-height: 1.6;
      background-color: #f5f5f5;
    }
    .container {
      width: 21cm;
          height: 29.7cm;
          margin: 0cm;
          padding: 1cm;
      background-color: #fff;
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
      border-radius: 5px;
      box-sizing: border-box;
    }
    .head {
      text-align: center;
      margin-bottom: 20px;
    }
    table {
      width: 100%;
      border-collapse: collapse;
      margin-top: 20px;
    }
    th, td {
      border: 1px solid #dddddd;
      padding: 10px;
      text-align: left;
    }
    th {
      background-color: #f2f2f2;
    }
    tr:nth-child(even) {
      background-color: #f2f2f2;
    }
    tr:hover {
      background-color: #f0f0f0;
    }
    .section-heading {
      font-weight: bold;
      background-color: #e0e0e0;
      text-align: center;
    }
    .requirements p {
      margin: 10px 0;
    }
  
    </style>
  </head>
  <body>
    <div class="container">
      <div class="head">Task Allocation Document</div>
      <table>
        <thead>
          <tr>
            <th class="section-heading" colspan="2">Project Details</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td colspan="2">
              <strong>Position: Web Development Intern</strong>
            </td>
          </tr>
          <tr>
            <td><strong>Start Date:</strong> April 1, 2024</td>
            <td><strong>Submission Date:</strong> June 30, 2024</td>
          </tr>
          <tr class="section-heading">
            <th colspan="2">Allocated Projects</th>
          </tr>
          <tr>
            <td><strong>Sr. No</strong></td>
            <td><strong>Project Name</strong></td>
          </tr>
          <tr>
            <td>1</td>
            <td>Portfolio website</td>
          </tr>
          <tr>
            <td>2</td>
            <td>Blog Website</td>
          </tr>
          <tr class="section-heading">
            <th colspan="2">Golden Projects (Optional)</th>
          </tr>
          <tr>
            <td><strong>Sr. No</strong></td>
            <td><strong>Project Name</strong></td>
          </tr>
          <tr>
            <td>1</td>
            <td>E-commerce website</td>
          </tr>
          <tr>
            <td>2</td>
            <td>Company Landing Page</td>
          </tr>
          <tr></tr>
          <tr>
            <th class="section-heading" colspan="2">Software Requirements</th>
          </tr>
          <tr>
            <td colspan="2">
              <ul>
                <li>IDE - Visual Studio Code, Sublime Text, or Atom</li>
                <li>Database - MySQL, MongoDB</li>
                <li>Server - XAMPP, WAMP</li>
              </ul>
            </td>
          </tr>
          <tr>
            <th class="section-heading" colspan="2">Eligibility Criteria</th>
          </tr>
          <tr>
            <td colspan="2">
              <ol>
                <li>Complete at least one assigned project to earn Internship Completion Certificate.</li>
                <li>Complete two projects to earn a Letter of Recommendation (LOR).</li>
                <li>Complete two projects and at least one Golden Project to earn additional rewards.</li>
              </ol>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </body>
  </html>
    `;

    const element = document.createElement("div");
    element.innerHTML = taskAllocationHTML;
    document.body.appendChild(element);

    const container = element.querySelector(".container");
    const containerWidth = 210; // A4 width in mm
    const containerHeight = 297; // A4 height in mm

    container.style.height = `${containerHeight}mm`;

    container.style.overflow = "hidden";

    html2canvas(element, {
      scale: 2,
      useCORS: true,
      allowTaint: true,
      scrollY: -window.scrollY,
    }).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");
      const containerWidth = (canvas.width / canvas.height) * containerHeight;
      const imgWidth = containerWidth;
      const imgHeight = containerHeight;
      pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight);
      pdf.save("task_allocation_document.pdf");
      document.body.removeChild(element);
      setloader(false);
    });
  };
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
                    await handleofferletter();
                  }}
                >
                  📄 View Offer Letter
                </button>
                <button
                  key="Option2"
                  className="w-full text-base flex hover:bg-zinc-600 justify-start p-3"
                  onClick={async () => {
                    setloader(true);
                    await handletaskallocation();
                  }}
                >
                  📋 Allocated Tasks
                </button>

                <Link to={"/dashboard/submissionform"}>
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
                  className="w-full text-base flex hover:bg-zinc-600 justify-start p-3"
                  ghost
                  onClick={toggleSidebarOptions}
                >
                  📜 Internship Certificate
                </button>
                <button
                  key="Option5"
                  className="w-full text-base flex hover:bg-zinc-600 justify-start p-3"
                  ghost
                  onClick={toggleSidebarOptions}
                >
                  📃 LOR Letter
                </button>
                <button
                  key="Option6"
                  className="w-full text-base flex hover:bg-zinc-600 justify-start p-3"
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
                isSidebarOpen ? "hidden" : "block"
              } flex flex-col pl-8 m-4 rounded-lg shadow-xl shadow-black w-full p-4`}
            >
              <h1 className="text-3xl font-bold mb-4">Greeting, John</h1>
              <div className="dashboard-info">
                <h3 className="text-lg font-medium mb-2">
                  Intern Identification: {user.student_id}
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
                  style={{
                    color: taskColors.task1 === 1 ? "#2DCC70" : "red",
                  }}
                >
                  &#10003; Fulfill Assigned Tasks
                </li>
                <li
                  className="text-base mb-1"
                  style={{
                    color: taskColors.task2 === 1 ? "#2DCC70" : "red",
                  }}
                >
                  &#10003; Submit Completed Tasks
                </li>
                <li
                  className="text-base mb-1"
                  style={{
                    color: taskColors.task3 === 1 ? "#2DCC70" : "red",
                  }}
                >
                  &#10003; Verification of Project Submission
                </li>
                <li
                  className="text-base mb-1"
                  style={{
                    color: taskColors.task4 === 1 ? "#2DCC70" : "red",
                  }}
                >
                  &#10003; Receive Internship Completion Certificate
                </li>
                <li
                  className="text-base mb-1"
                  style={{
                    color: taskColors.task5 === 1 ? "#2DCC70" : "red",
                  }}
                >
                  &#10003; Obtain Letter of Recommendation (LOR)
                </li>
                <li
                  className="text-base mb-1"
                  style={{
                    color: taskColors.task6 === 1 ? "#2DCC70" : "red",
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

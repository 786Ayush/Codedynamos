import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { supabase } from "../../../utils/Supabase";

export const handletaskallocation = async ({ studentId, date }) => {
  try {
    // Fetch user data from Supabase
    if (studentId) {
      console.log(studentId);
      const userData = await fetchuserdata(studentId);
      console.log(userData);
      console.log(date);
      // Generate PDF if userData exists
      if (userData) {
        generatePDF(userData, date);
      } else {
        console.error("Failed to fetch user data.");
      }
    }
  } catch (error) {
    console.error("Error handling task allocation:", error);
  }
};

const fetchuserdata = async (studentId) => {
  try {
    // Fetch the student's question IDs record
    const { data: studentData, error } = await supabase
      .from("studentquestionids")
      .select(
        `
        basic_question1_id,
        basic_question2_id,
        basic_question3_id,
        advance_question1_id,
        advance_question2_id
      `
      )
      .eq("studentid", studentId)
      .single();

    if (error) {
      console.error("Error fetching student question IDs:", error.message);
      return null;
    }

    // Extract question IDs from the student data
    const {
      basic_question1_id,
      basic_question2_id,
      basic_question3_id,
      advance_question1_id,
      advance_question2_id,
    } = studentData;

    // Prepare an array of question IDs to fetch from the questions table
    const questionIds = [
      basic_question1_id,
      basic_question2_id,
      basic_question3_id,
      advance_question1_id,
      advance_question2_id,
    ].filter((id) => id !== null); // Filter out null IDs

    // Fetch questions from the questions table based on IDs
    const { data: questions, error: questionsError } = await supabase
      .from("questions")
      .select("*")
      .in("QuestionID", questionIds);

    if (questionsError) {
      console.error("Error fetching questions:", questionsError.message);
      return null;
    }
    console.log(questions);
    // Map questions to their respective IDs for easier access
    const mappedQuestions = questions.reduce((acc, question) => {
      acc[question.QuestionID] = question.QuestionText;
      return acc;
    }, {});

    // Combine mapped questions with their corresponding IDs from student data
    const formattedQuestions = {
      sector:questions[0].Sector,
      basic_question1: mappedQuestions[basic_question1_id],
      basic_question2: mappedQuestions[basic_question2_id],
      basic_question3: mappedQuestions[basic_question3_id],
      advance_question1: mappedQuestions[advance_question1_id],
      advance_question2: mappedQuestions[advance_question2_id],
    };

    return formattedQuestions;
  } catch (error) {
    console.error("Error fetching user data:", error);
    return null;
  }
};

const generatePDF = (userData, date) => {
  const startDate = new Date(date);
  const nextMonthDate = new Date(
    startDate.getFullYear(),
    startDate.getMonth() + 1,
    startDate.getDate()
  );

  // Format next month's date in "YYYY-MM-DD" format
  const formattedNextMonthDate = nextMonthDate.toISOString().slice(0, 10);
  const taskAllocationHTML = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Task Allocation Document</title>
      <style>
        .head {
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
                <strong>Position: ${userData.sector}</strong>
              </td>
            </tr>
            <tr>
              <td><strong>Start Date:</strong> ${date}</td>
              <td><strong>Submission Date:</strong> ${formattedNextMonthDate}</td>
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
              <td>${userData.basic_question1}</td>
            </tr>
            <tr>
              <td>2</td>
              <td>${userData.basic_question2}</td>
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
              <td>${userData.advance_question1}</td>
            </tr>
            <tr>
              <td>2</td>
              <td>${userData.advance_question2}</td>
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
                   <li>Platforms - If you are working on graphic design tasks, please provide links to your projects on <strong>Figma</strong>, <strong>Behance</strong> or <strong>Dribbble</strong>.</li>
    <li>Document Collaboration - If you are working on content writing tasks, please provide links to your documents on <strong>Google Docs</strong>.</li>

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

  html2canvas(container, {
    scale: 2,
    useCORS: true,
    allowTaint: true,
    scrollY: -window.scrollY,
  }).then((canvas) => {
    const imgData = canvas.toDataURL("image/jpeg", 0.7);
    const pdf = new jsPDF("p", "mm", "a4");
    const imgWidth = containerWidth;
    const imgHeight = (canvas.height / canvas.width) * containerWidth;
    pdf.addImage(imgData, "JPEG", 0, 0, imgWidth, imgHeight);
    pdf.save("task_allocation_document.pdf");
    document.body.removeChild(element);
  });
};

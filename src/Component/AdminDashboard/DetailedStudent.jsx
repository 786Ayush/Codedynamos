import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { supabase } from "../../utils/Supabase";

const StudentDetailPage = () => {
  const para = useParams();
  const [studentData, setStudentData] = useState(null);
  const [studentId, setStudentId] = useState();

  console.log(studentId);

  // setStudentId(para["*"]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log(studentId);
        const { data: basicDetails, error: basicDetailsError } = await supabase
          .from("basic_details")
          .select("*")
          .eq("student_id", studentId);
        console.log(basicDetails);
        if (basicDetailsError) {
          throw basicDetailsError;
        }

        const { data: educationalDetails, error: educationalDetailsError } =
          await supabase
            .from("educational_details")
            .select("*")
            .eq("student_id", studentId);

        console.log(educationalDetails);
        if (educationalDetailsError) {
          throw educationalDetailsError;
        }

        const { data: offerDetails, error: offerDetailsError } = await supabase
          .from("responseoftaskdetails")
          .select("*")
          .eq("student_id", studentId);

        console.log(offerDetails);

        if (offerDetailsError) {
          throw offerDetailsError;
        }

        const { data: questionDetails, error: questionDetailsError } =
          await supabase
            .from("studentquestionids")
            .select("*")
            .eq("studentid", studentId);

        console.log(questionDetails);

        if (questionDetailsError) {
          throw questionDetailsError;
        }

        const { data: accountDetails, error: accountDetailsError } =
          await supabase
            .from("confirmation")
            .select("*")
            .eq("student_id", studentId);

        console.log(accountDetails);
        if (accountDetailsError) {
          throw accountDetailsError;
        }

        const combinedData = {
          basicInfo: basicDetails[0],
          educationInfo: educationalDetails[0],
          responseoftaskdetails: offerDetails[0],
          studentquestionids: questionDetails[0],
          confirmation: accountDetails[0],
        };

        setStudentData(combinedData);
        console.log(combinedData);
      } catch (error) {
        console.error("Error fetching student data:", error);
      }
    };

    fetchData();
  }, [studentId]);

  useEffect(() => {
    setStudentId(para["*"]);
  }, [para]);
  if (!studentData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="h-[80vh] overflow-scroll bg-white m-4 p-3">
      <h1 className="text-2xl font-bold mb-4">Student Details</h1>

      {/* Basic Information */}
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Basic Information</h2>
        <p>
          <strong>ID:</strong> {studentData.basicInfo.student_id}
        </p>
        <p>
          <strong>Name:</strong>{" "}
          {`${studentData.basicInfo.first_name} ${
            studentData.basicInfo.middle_name || ""
          } ${studentData.basicInfo.last_name}`}
        </p>
        <p>
          <strong>Country:</strong> {studentData.basicInfo.country}
        </p>
        <p><strong>Phone:</strong>{studentData.basicInfo.phone}</p>
        {/* Add more details as needed */}
      </section>

      {/* Education Information */}
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Education Information</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h3 className="font-semibold mb-2">10th Grade</h3>
            <p>
              <strong>Board:</strong> {studentData.educationInfo.tenth_board}
            </p>
            <p>
              <strong>School:</strong> {studentData.educationInfo.tenth_school}
            </p>
            <p>
              <strong>Percentage:</strong>{" "}
              {studentData.educationInfo.tenth_percentage}%
            </p>
          </div>
          <div>
            <h3 className="font-semibold mb-2">12th Grade</h3>
            <p>
              <strong>Board:</strong> {studentData.educationInfo.twelfth_board}
            </p>
            <p>
              <strong>School:</strong>{" "}
              {studentData.educationInfo.twelfth_school}
            </p>
            <p>
              <strong>Percentage:</strong>{" "}
              {studentData.educationInfo.twelfth_percentage}%
            </p>
          </div>
          <div>
            <h3 className="font-semibold mb-2">Bachelor's Degree</h3>
            <p>
              <strong>University:</strong>{" "}
              {studentData.educationInfo.bachelor_university}
            </p>
            <p>
              <strong>College:</strong>{" "}
              {studentData.educationInfo.bachelor_college}
            </p>
            <p>
              <strong>Percentage:</strong>{" "}
              {studentData.educationInfo.bachelor_percentage}%
            </p>
          </div>
        </div>
      </section>

      <div className="flex md:flex-row flex-col">
        {/* Offer Information */}
        <section className="mb-8 w-1/2">
          <h2 className="text-xl font-semibold mb-4">Offer Information</h2>
          <p>
            <strong>Offer Letter:</strong>{" "}
            {studentData.confirmation.offer_letter ? "Received" : "Not Received"}
          </p>
          <p>
            <strong>Offer Letter Date:</strong>{" "}
            {studentData.confirmation.offer_letter_date}
          </p>
          <p>
            <strong>Response of Task:</strong>{" "}
            {studentData.responseoftaskdetails.response_of_task
              ? "Received"
              : "Not Received"}
          </p>
          <p>
            <strong>Response of Task Date:</strong>{" "}
            {studentData.responseoftaskdetails.response_of_task_date}
          </p>
          <p>
            <strong>Completion Certificate:</strong>{" "}
            {studentData.responseoftaskdetails.completion_certificate
              ? "Received"
              : "Not Received"}
          </p>
          <p>
            <strong>Completion Certificate Date:</strong>{" "}
            {studentData.responseoftaskdetails.completion_certificate_date || "N/A"}
          </p>
          <p>
            <strong>Letter of Recommendation:</strong>{" "}
            {studentData.responseoftaskdetails.letter_of_recommendation
              ? "Received"
              : "Not Received"}
          </p>
          <p>
            <strong>Letter of Recommendation Date:</strong>{" "}
            {studentData.responseoftaskdetails.letter_of_recommendation_date}
          </p>
          <p>
            <strong>Goodies:</strong>{" "}
            {studentData.responseoftaskdetails.goodies ? "Received" : "Not Received"}
          </p>
          <p>
            <strong>Goodies Received Date:</strong>{" "}
            {studentData.responseoftaskdetails.goodies_received_date}
          </p>
          <p>
            <strong>Payment:</strong>{" "}
            {studentData.responseoftaskdetails.payment ? "Paid" : "Not Paid"}
          </p>
          <p>
            <strong>Payment Amount:</strong> $
            {studentData.responseoftaskdetails.payment_amount}
          </p>
          <p>
            <strong>Payment Date:</strong> {studentData.responseoftaskdetails.payment_date}
          </p>
          <p>
            <strong>Payment Description:</strong>{" "}
            {studentData.responseoftaskdetails.payment_description}
          </p>
        </section>

        {/* Account Information */}
        <section className="mb-8 w-1/2">
          <h2 className="text-xl font-semibold mb-4">Account Details</h2>
          <p>
            <strong>Email:</strong> {studentData.confirmation.email}
          </p>
          <p>
            <strong>Password:</strong> {studentData.confirmation.password}
          </p>
          <p>
            <strong>Basic Question 1 ID:</strong>{" "}
            {studentData.confirmation.basic_question_1_id}
          </p>
          <p>
            <strong>Basic Question 2 ID:</strong>{" "}
            {studentData.confirmation.basic_question_2_id}
          </p>
          <p>
            <strong>Basic Question 3 ID:</strong>{" "}
            {studentData.confirmation.basic_question_3_id}
          </p>
          <p>
            <strong>Advance Question 1 ID:</strong>{" "}
            {studentData.confirmation.advance_question_1_id}
          </p>
          <p>
            <strong>Advance Question 2 ID:</strong>{" "}
            {studentData.confirmation.advance_question_2_id}
          </p>
          <p>
            <strong>Basic Question 1 Check:</strong>{" "}
            {studentData.confirmation.basic_question_1_check ? "Yes" : "No"}
          </p>
          <p>
            <strong>Basic Question 2 Check:</strong>{" "}
            {studentData.confirmation.basic_question_2_check ? "Yes" : "No"}
          </p>
          <p>
            <strong>Basic Question 3 Check:</strong>{" "}
            {studentData.confirmation.basic_question_3_check ? "Yes" : "No"}
          </p>
          <p>
            <strong>Advance Question 1 Check:</strong>{" "}
            {studentData.confirmation.advance_question_1_check ? "Yes" : "No"}
          </p>
          <p>
            <strong>Advance Question 2 Check:</strong>{" "}
            {studentData.confirmation.advance_question_2_check ? "Yes" : "No"}
          </p>
        </section>
      </div>

      {/* Question Information */}
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Questions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* First Question */}
          <div className="border border-gray-200 p-4 rounded">
            <h3 className="font-semibold mb-2">First Question</h3>
            <p className="text-sm mb-2">
              <strong>Question:</strong>{" "}
              {studentData.studentquestionids.basic_question1_id}
            </p>
            <p className="text-sm mb-2">
              <strong>Live Link:</strong>{" "}
              <a
                href={studentData.studentquestionids.first_question_live_link}
                target="_blank"
                rel="noopener noreferrer"
              >
                {studentData.studentquestionids.first_question_live_link}
              </a>
            </p>
            <p className="text-sm mb-2">
              <strong>GitHub Link:</strong>{" "}
              <a
                href={studentData.studentquestionids.first_question_github_link}
                target="_blank"
                rel="noopener noreferrer"
              >
                {studentData.studentquestionids.first_question_github_link}
              </a>
            </p>
            <p className="text-sm mb-2">
              <strong>Comment:</strong>{" "}
              {studentData.studentquestionids.first_question_comment}
            </p>
          </div>

          {/* Second Question */}
          <div className="border border-gray-200 p-4 rounded">
            <h3 className="font-semibold mb-2">Second Question</h3>
            <p className="text-sm mb-2">
              <strong>Question:</strong>{" "}
              {studentData.studentquestionids.basic_question2_id}
            </p><p className="text-sm mb-2">
              <strong>Live Link:</strong>{" "}
              <a
                href={studentData.studentquestionids.second_question_live_link}
                target="_blank"
                rel="noopener noreferrer"
              >
                {studentData.studentquestionids.second_question_live_link}
              </a>
            </p>
            <p className="text-sm mb-2">
              <strong>GitHub Link:</strong>{" "}
              <a
                href={studentData.studentquestionids.second_question_github_link}
                target="_blank"
                rel="noopener noreferrer"
              >
                {studentData.studentquestionids.second_question_github_link}
              </a>
            </p>
            <p className="text-sm mb-2">
              <strong>Comment:</strong>{" "}
              {studentData.studentquestionids.second_question_comment}
            </p>
          </div>

          {/* Third Question */}
          <div className="border border-gray-200 p-4 rounded">
            <h3 className="font-semibold mb-2">Third Question</h3>
            <p className="text-sm mb-2">
              <strong>Question:</strong>{" "}
              {studentData.studentquestionids.basic_question3_id}
            </p>
            <p className="text-sm mb-2">
              <strong>Live Link:</strong>{" "}
              <a
                href={studentData.studentquestionids.third_question_live_link}
                target="_blank"
                rel="noopener noreferrer"
              >
                {studentData.studentquestionids.third_question_live_link}
              </a>
            </p>
            <p className="text-sm mb-2">
              <strong>GitHub Link:</strong>{" "}
              <a
                href={studentData.studentquestionids.third_question_github_link}
                target="_blank"
                rel="noopener noreferrer"
              >
                {studentData.studentquestionids.third_question_github_link}
              </a>
            </p>
            <p className="text-sm mb-2">
              <strong>Comment:</strong>{" "}
              {studentData.studentquestionids.third_question_comment}
            </p>
          </div>

          {/* Fourth Question */}
          <div className="border border-gray-200 p-4 rounded">
            <h3 className="font-semibold mb-2">Fourth Question</h3>
            
            <p className="text-sm mb-2">
              <strong>Question:</strong>{" "}
              {studentData.studentquestionids.advance_question1_id}
            </p>
            <p className="text-sm mb-2">
              <strong>Live Link:</strong>{" "}
              <a
                href={studentData.studentquestionids.fourth_question_live_link}
                target="_blank"
                rel="noopener noreferrer"
              >
                {studentData.studentquestionids.fourth_question_live_link}
              </a>
            </p>
            <p className="text-sm mb-2">
              <strong>GitHub Link:</strong>{" "}
              <a
                href={studentData.studentquestionids.fourth_question_github_link}
                target="_blank"
                rel="noopener noreferrer"
              >
                {studentData.studentquestionids.fourth_question_github_link}
              </a>
            </p>
            <p className="text-sm mb-2">
              <strong>Comment:</strong>{" "}
              {studentData.studentquestionids.fourth_question_comment}
            </p>
          </div>

          <div className="border border-gray-200 p-4 rounded">
            <h3 className="font-semibold mb-2">Fifth Question</h3>
            
            <p className="text-sm mb-2">
              <strong>Question:</strong>{" "}
              {studentData.studentquestionids.advance_question1_id}
            </p>
            <p className="text-sm mb-2">
              <strong>Live Link:</strong>{" "}
              <a
                href={studentData.studentquestionids.fourth_question_live_link}
                target="_blank"
                rel="noopener noreferrer"
              >
                {studentData.studentquestionids.fourth_question_live_link}
              </a>
            </p>
            <p className="text-sm mb-2">
              <strong>GitHub Link:</strong>{" "}
              <a
                href={studentData.studentquestionids.fourth_question_github_link}
                target="_blank"
                rel="noopener noreferrer"
              >
                {studentData.studentquestionids.fourth_question_github_link}
              </a>
            </p>
            <p className="text-sm mb-2">
              <strong>Comment:</strong>{" "}
              {studentData.studentquestionids.fourth_question_comment}
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default StudentDetailPage;

// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import { supabase } from "../../utils/Supabase";

// const StudentDetailPage = () => {
//   const para = useParams();
//   const [studentdata, setStudentData] = useState();
//   console.log(para);
//   // Sample student data (replace with actual data)
//   const studentData = {
//     basicInfo: {
//       studentId: 1,
//       firstName: "John",
//       middleName: "",
//       lastName: "Doe",
//       country: "USA",
//       howYouHeard: "Friend",
//       phone: "123-456-7890",
//       alternatePhone: "987-654-3210",
//       email: "john.doe@example.com",
//       github: "https://github.com/johndoe",
//       linkedin: "https://www.linkedin.com/in/johndoe",
//       createdDate: "2024-03-31",
//       sector: "Technology",
//     },
//     responseoftaskdetails: {
//       studentId: 1,
//       offerLetter: 1,
//       offerLetterDate: "2024-01-15",
//       responseOfTask: 1,
//       responseOfTaskDate: "2024-02-01",
//       completionCertificate: 0,
//       completionCertificateDate: null,
//       letterOfRecommendation: 1,
//       letterOfRecommendationDate: "2024-03-15",
//       goodies: 1,
//       goodiesReceivedDate: "2024-03-25",
//       payment: 1,
//       paymentAmount: 5000.0,
//       paymentDate: "2024-02-15",
//       paymentDescription: "Registration Fee",
//     },
//     educationInfo: {
//       studentId: 1,
//       tenthBoard: "State Board",
//       tenthSchool: "ABC High School",
//       tenthPercentage: 85.5,
//       twelfthBoard: "State Board",
//       twelfthSchool: "XYZ Higher Secondary School",
//       twelfthPercentage: 82.0,
//       bachelorUniversity: "University of ABC",
//       bachelorCollege: "XYZ College",
//       bachelorPercentage: 75.0,
//     },
//     studentquestionids: {
//       studentId: 1,
//       firstQuestion: "What is the solution to the first question?",
//       secondQuestion: "What is the solution to the second question?",
//       thirdQuestion: "What is the solution to the third question?",
//       fourthQuestion: "What is the solution to the fourth question?",
//       firstQuestionLiveLink: "https://example.com/firstquestion",
//       firstQuestionGithubLink: "https://github.com/johndoe/firstquestion",
//       secondQuestionLiveLink: "https://example.com/secondquestion",
//       secondQuestionGithubLink: "https://github.com/johndoe/secondquestion",
//       thirdQuestionLiveLink: "https://example.com/thirdquestion",
//       thirdQuestionGithubLink: "https://github.com/johndoe/thirdquestion",
//       fourthQuestionLiveLink: "https://example.com/fourthquestion",
//       fourthQuestionGithubLink: "https://github.com/johndoe/fourthquestion",
//       paymentScreenshot: null, // Payment screenshot will be displayed here
//       paymentBoolean: 1,
//       paymentDate: "2024-02-15",
//     },
//     confirmation: {
//       studentId: 1,
//       basicQuestion1Id: 123,
//       basicQuestion2Id: 456,
//       basicQuestion3Id: 789,
//       advanceQuestion1Id: 987,
//       advanceQuestion2Id: 654,
//       basicQuestion1Check: 1,
//       basicQuestion2Check: 0,
//       basicQuestion3Check: 1,
//       advanceQuestion1Check: 1,
//       advanceQuestion2Check: 0,
//       email: "john.doe@example.com",
//       password: "*********",
//     },
//   };
//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const { data: basicDetails, error: basicDetailsError } = await supabase
//           .from("basic_details")
//           .select("*")
//           .eq("student_id", para["*"]);

//         if (basicDetailsError) {
//           throw basicDetailsError;
//         }

//         const { data: educationalDetails, error: educationalDetailsError } =
//           await supabase
//             .from("educational_details") // Specify the correct table name here
//             .select("*")
//             .eq("student_id", para["*"]);

//         console.log(educationalDetails);
//         if (educationalDetailsError) {
//           throw educationalDetailsError;
//         }

//         const combinedData = basicDetails.map((basicDetail) => {
//           const eduDetail = educationalDetails.find(
//             (edu) => edu.student_id === basicDetail.student_id
//           );
//           return { ...basicDetail, ...eduDetail };
//         });

//         setStudentData(combinedData);
//         console.log(combinedData);
//       } catch (error) {
//         console.error("Error fetching student data:", error);
//       }
//     };
//     fetchData();
//   }, [para]);
//   return (
//     <div className=" h-[80vh] overflow-scroll bg-white m-4 p-3">
//       <h1 className="text-2xl font-bold mb-4">Student Details</h1>

//       {/* Basic Information */}
//       <section className="mb-8">
//         <h2 className="text-xl font-semibold mb-4">Basic Information</h2>
//         <p>
//           <strong>ID:</strong> {studentData.basicInfo.studentId}
//         </p>
//         <p>
//           <strong>Name:</strong>{" "}
//           {`${studentData.basicInfo.firstName} ${studentData.basicInfo.middleName} ${studentData.basicInfo.lastName}`}
//         </p>
//         <p>
//           <strong>Country:</strong> {studentData.basicInfo.country}
//         </p>
//         {/* Add more details as needed */}
//       </section>

//       {/* Education Information */}
//       <section className="mb-8">
//         <h2 className="text-xl font-semibold mb-4">Education Information</h2>
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//           <div>
//             <h3 className="font-semibold mb-2">10th Grade</h3>
//             <p>
//               <strong>Board:</strong> {studentData.educationInfo.tenthBoard}
//             </p>
//             <p>
//               <strong>School:</strong> {studentData.educationInfo.tenthSchool}
//             </p>
//             <p>
//               <strong>Percentage:</strong>{" "}
//               {studentData.educationInfo.tenthPercentage}%
//             </p>
//           </div>
//           <div>
//             <h3 className="font-semibold mb-2">12th Grade</h3>
//             <p>
//               <strong>Board:</strong> {studentData.educationInfo.twelfthBoard}
//             </p>
//             <p>
//               <strong>School:</strong> {studentData.educationInfo.twelfthSchool}
//             </p>
//             <p>
//               <strong>Percentage:</strong>{" "}
//               {studentData.educationInfo.twelfthPercentage}%
//             </p>
//           </div>
//           <div>
//             <h3 className="font-semibold mb-2">Bachelor's Degree</h3>
//             <p>
//               <strong>University:</strong>{" "}
//               {studentData.educationInfo.bachelorUniversity}
//             </p>
//             <p>
//               <strong>College:</strong>{" "}
//               {studentData.educationInfo.bachelorCollege}
//             </p>
//             <p>
//               <strong>Percentage:</strong>{" "}
//               {studentData.educationInfo.bachelorPercentage}%
//             </p>
//           </div>
//         </div>
//       </section>

//       <div className="flex md:flex-row flex-col">
//         {/* Offer Information */}
//         <section className="mb-8 w-1/2">
//           <h2 className="text-xl font-semibold mb-4">Offer Information</h2>
//           <p>
//             <strong>Offer Letter:</strong>{" "}
//             {studentData.responseoftaskdetails.offerLetter ? "Received" : "Not Received"}
//           </p>
//           <p>
//             <strong>Offer Letter Date:</strong>{" "}
//             {studentData.responseoftaskdetails.offerLetterDate}
//           </p>
//           <p>
//             <strong>Response of Task:</strong>{" "}
//             {studentData.responseoftaskdetails.responseOfTask ? "Received" : "Not Received"}
//           </p>
//           <p>
//             <strong>Response of Task Date:</strong>{" "}
//             {studentData.responseoftaskdetails.responseOfTaskDate}
//           </p>
//           <p>
//             <strong>Completion Certificate:</strong>{" "}
//             {studentData.responseoftaskdetails.completionCertificate
//               ? "Received"
//               : "Not Received"}
//           </p>
//           <p>
//             <strong>Completion Certificate Date:</strong>{" "}
//             {studentData.responseoftaskdetails.completionCertificateDate
//               ? studentData.responseoftaskdetails.completionCertificateDate
//               : "N/A"}
//           </p>
//           <p>
//             <strong>Letter of Recommendation:</strong>{" "}
//             {studentData.responseoftaskdetails.letterOfRecommendation
//               ? "Received"
//               : "Not Received"}
//           </p>
//           <p>
//             <strong>Letter of Recommendation Date:</strong>{" "}
//             {studentData.responseoftaskdetails.letterOfRecommendationDate}
//           </p>
//           <p>
//             <strong>Goodies:</strong>{" "}
//             {studentData.responseoftaskdetails.goodies ? "Received" : "Not Received"}
//           </p>
//           <p>
//             <strong>Goodies Received Date:</strong>{" "}
//             {studentData.responseoftaskdetails.goodiesReceivedDate}
//           </p>
//           <p>
//             <strong>Payment:</strong>{" "}
//             {studentData.responseoftaskdetails.payment ? "Paid" : "Not Paid"}
//           </p>
//           <p>
//             <strong>Payment Amount:</strong> $
//             {studentData.responseoftaskdetails.paymentAmount}
//           </p>
//           <p>
//             <strong>Payment Date:</strong> {studentData.responseoftaskdetails.paymentDate}
//           </p>
//           <p>
//             <strong>Payment Description:</strong>{" "}
//             {studentData.responseoftaskdetails.paymentDescription}
//           </p>
//         </section>

//         {/* Account Information */}
//         <section className="mb-8 w-1/2">
//           <h2 className="text-xl font-semibold mb-4">Account Details</h2>
//           <p>
//             <strong>Email:</strong> {studentData.confirmation.email}
//           </p>
//           <p>
//             <strong>Password:</strong> {studentData.confirmation.password}
//           </p>
//           <p>
//             <strong>Basic Question 1 ID:</strong>{" "}
//             {studentData.confirmation.basicQuestion1Id}
//           </p>
//           <p>
//             <strong>Basic Question 2 ID:</strong>{" "}
//             {studentData.confirmation.basicQuestion2Id}
//           </p>
//           <p>
//             <strong>Basic Question 3 ID:</strong>{" "}
//             {studentData.confirmation.basicQuestion3Id}
//           </p>
//           <p>
//             <strong>Advance Question 1 ID:</strong>{" "}
//             {studentData.confirmation.advanceQuestion1Id}
//           </p>
//           <p>
//             <strong>Advance Question 2 ID:</strong>{" "}
//             {studentData.confirmation.advanceQuestion2Id}
//           </p>
//           <p>
//             <strong>Basic Question 1 Check:</strong>{" "}
//             {studentData.confirmation.basicQuestion1Check ? "Yes" : "No"}
//           </p>
//           <p>
//             <strong>Basic Question 2 Check:</strong>{" "}
//             {studentData.confirmation.basicQuestion2Check ? "Yes" : "No"}
//           </p>
//           <p>
//             <strong>Basic Question 3 Check:</strong>{" "}
//             {studentData.confirmation.basicQuestion3Check ? "Yes" : "No"}
//           </p>
//           <p>
//             <strong>Advance Question 1 Check:</strong>{" "}
//             {studentData.confirmation.advanceQuestion1Check ? "Yes" : "No"}
//           </p>
//           <p>
//             <strong>Advance Question 2 Check:</strong>{" "}
//             {studentData.confirmation.advanceQuestion2Check ? "Yes" : "No"}
//           </p>
//         </section>
//       </div>

//       {/* Question Information */}
//       <section className="mb-8">
//         <h2 className="text-xl font-semibold mb-4">Questions</h2>
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//           {/* First Question */}
//           <div className="border border-gray-200 p-4 rounded">
//             <h3 className="font-semibold mb-2">First Question</h3>
//             <p className="text-sm mb-2">
//               <strong>Live Link:</strong>{" "}
//               <a
//                 href={studentData.studentquestionids.firstQuestionLiveLink}
//                 target="_blank"
//                 rel="noopener noreferrer"
//               >
//                 {studentData.studentquestionids.firstQuestionLiveLink}
//               </a>
//             </p>
//             <p className="text-sm">
//               <strong>GitHub Link:</strong>{" "}
//               <a
//                 href={studentData.studentquestionids.firstQuestionGithubLink}
//                 target="_blank"
//                 rel="noopener noreferrer"
//               >
//                 {studentData.studentquestionids.firstQuestionGithubLink}
//               </a>
//             </p>
//           </div>
//           {/* Second Question */}
//           <div className="border border-gray-200 p-4 rounded">
//             <h3 className="font-semibold mb-2">Second Question</h3>
//             <p className="text-sm mb-2">
//               <strong>Live Link:</strong>{" "}
//               <a
//                 href={studentData.studentquestionids.secondQuestionLiveLink}
//                 target="_blank"
//                 rel="noopener noreferrer"
//               >
//                 {studentData.studentquestionids.secondQuestionLiveLink}
//               </a>
//             </p>
//             <p className="text-sm">
//               <strong>GitHub Link:</strong>{" "}
//               <a
//                 href={studentData.studentquestionids.secondQuestionGithubLink}
//                 target="_blank"
//                 rel="noopener noreferrer"
//               >
//                 {studentData.studentquestionids.secondQuestionGithubLink}
//               </a>
//             </p>
//           </div>
//           {/* Third Question */}
//           <div className="border border-gray-200 p-4 rounded">
//             <h3 className="font-semibold mb-2">Third Question</h3>
//             <p className="text-sm mb-2">
//               <strong>Live Link:</strong>{" "}
//               <a
//                 href={studentData.studentquestionids.thirdQuestionLiveLink}
//                 target="_blank"
//                 rel="noopener noreferrer"
//               >
//                 {studentData.studentquestionids.thirdQuestionLiveLink}
//               </a>
//             </p>
//             <p className="text-sm">
//               <strong>GitHub Link:</strong>{" "}
//               <a
//                 href={studentData.studentquestionids.thirdQuestionGithubLink}
//                 target="_blank"
//                 rel="noopener noreferrer"
//               >
//                 {studentData.studentquestionids.thirdQuestionGithubLink}
//               </a>
//             </p>
//           </div>
//           {/* Fourth Question */}
//           <div className="border border-gray-200 p-4 rounded">
//             <h3 className="font-semibold mb-2">Fourth Question</h3>
//             <p className="text-sm mb-2">
//               <strong>Live Link:</strong>{" "}
//               <a
//                 href={studentData.studentquestionids.fourthQuestionLiveLink}
//                 target="_blank"
//                 rel="noopener noreferrer"
//               >
//                 {studentData.studentquestionids.fourthQuestionLiveLink}
//               </a>
//             </p>
//             <p className="text-sm">
//               <strong>GitHub Link:</strong>{" "}
//               <a
//                 href={studentData.studentquestionids.fourthQuestionGithubLink}
//                 target="_blank"
//                 rel="noopener noreferrer"
//               >
//                 {studentData.studentquestionids.fourthQuestionGithubLink}
//               </a>
//             </p>
//           </div>
//         </div>
//       </section>

//       <section className="mb-8">
//         <h2 className="text-xl font-semibold mb-4">Questions</h2>
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//           {/* First Question */}
//           <div className="border border-gray-200 p-4 rounded">
//             <h3 className="font-semibold mb-2">First Question</h3>
//             <p>{studentData.studentquestionids.firstQuestion}</p>
//           </div>
//           {/* Second Question */}
//           <div className="border border-gray-200 p-4 rounded">
//             <h3 className="font-semibold mb-2">Second Question</h3>
//             <p>{studentData.studentquestionids.secondQuestion}</p>
//           </div>
//           {/* Third Question */}
//           <div className="border border-gray-200 p-4 rounded">
//             <h3 className="font-semibold mb-2">Third Question</h3>
//             <p>{studentData.studentquestionids.thirdQuestion}</p>
//           </div>
//           {/* Fourth Question */}
//           <div className="border border-gray-200 p-4 rounded">
//             <h3 className="font-semibold mb-2">Fourth Question</h3>
//             <p>{studentData.studentquestionids.fourthQuestion}</p>
//           </div>
//         </div>
//       </section>
//     </div>
//   );
// };

// export default StudentDetailPage;

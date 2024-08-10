import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { supabase } from "../../utils/Supabase";

const StudentDetailPage = () => {
  const para = useParams();
  const [studentData, setStudentData] = useState(null);
  const [studentId, setStudentId] = useState();

  useEffect(() => {
    setStudentId(para["*"]);
  }, [para]);

  useEffect(() => {
    if (!studentId) return; // Ensure studentId is set before fetching data
    const fetchData = async () => {
      try {
        const { data, error } = await supabase
          .from("basic_details")
          .select(
            `
            *,
            educational_details (
              *
            ),
            responseoftaskdetails (
              *
            ),
            studentquestionids (
              *
            ),
            confirmation (
              *
            )
          `
          )
          .eq("student_id", studentId);

        if (error) {
          throw error;
        }

        // Extract the single record
        const basicDetail = data[0];
        const combinedData = {
          basicInfo: basicDetail,
          educationInfo: basicDetail?.educational_details || null,
          responseoftaskdetails: basicDetail?.responseoftaskdetails || null,
          studentquestionids: basicDetail?.studentquestionids || null,
          confirmation: basicDetail?.confirmation || null,
        };

        setStudentData(combinedData);
      } catch (error) {
        console.error("Error fetching student data:", error);
      }
    };

    fetchData();
  }, [studentId]);
  console.log(studentData);
  if (!studentData) {
    return <div>Loading...</div>;
  }
  return (
    // <div className="">hello</div>

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
        <p>
          <strong>Phone:</strong>
          {studentData.basicInfo.phone}
        </p>
        <p>
          <strong>Sector:</strong>
          {studentData.basicInfo.sector}
        </p>
        {/* Add more details as needed */}
      </section>

      {/* Education Information */}
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Education Information</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h3 className="font-semibold mb-2">10th Grade</h3>
            <p>
              <strong>Board:</strong> {studentData.educationInfo?.tenth_board}
            </p>
            <p>
              <strong>School:</strong> {studentData.educationInfo?.tenth_school}
            </p>
            <p>
              <strong>Percentage:</strong>{" "}
              {studentData.educationInfo?.tenth_percentage}%
            </p>
          </div>
          <div>
            <h3 className="font-semibold mb-2">12th Grade</h3>
            <p>
              <strong>Board:</strong> {studentData.educationInfo?.twelfth_board}
            </p>
            <p>
              <strong>School:</strong>{" "}
              {studentData.educationInfo?.twelfth_school}
            </p>
            <p>
              <strong>Percentage:</strong>{" "}
              {studentData.educationInfo?.twelfth_percentage}%
            </p>
          </div>
          <div>
            <h3 className="font-semibold mb-2">Bachelor's Degree</h3>
            <p>
              <strong>University:</strong>{" "}
              {studentData.educationInfo?.bachelor_university}
            </p>
            <p>
              <strong>College:</strong>{" "}
              {studentData.educationInfo?.bachelor_college}
            </p>
            <p>
              <strong>Percentage:</strong>{" "}
              {studentData.educationInfo?.bachelor_percentage}%
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
            {studentData.confirmation?.OfferLetter
              ? "Received"
              : "Not Received"}
          </p>
          <p>
            <strong>Offer Letter Date:</strong>{" "}
            {studentData.confirmation?.OfferLetterDate}
          </p>
          <p>
            <strong>Response of Task:</strong>{" "}
            {studentData.confirmation?.ResponseOfTask
              ? "Received"
              : "Not Received"}
          </p>
          <p>
            <strong>Response of Task Date:</strong>{" "}
            {studentData.confirmation?.ResponseOfTaskDate}
          </p>
          <p>
            <strong>Completion Certificate:</strong>{" "}
            {studentData.confirmation?.CompletionCertificate
              ? "Received"
              : "Not Received"}
          </p>
          <p>
            <strong>Completion Certificate Date:</strong>{" "}
            {studentData.confirmation?.CompletionCertificateDate || "N/A"}
          </p>
          <p>
            <strong>Letter of Recommendation:</strong>{" "}
            {studentData.confirmation?.letterOfRecommendation
              ? "Received"
              : "Not Received"}
          </p>
          <p>
            <strong>Letter of Recommendation Date:</strong>{" "}
            {studentData.confirmation?.letterOfRecommendationDate}
          </p>
          <p>
            <strong>Goodies:</strong>{" "}
            {studentData.confirmation?.Goodies ? "Received" : "Not Received"}
          </p>
          <p>
            <strong>Goodies Received Date:</strong>{" "}
            {studentData.confirmation?.GoodiesReceivedDate}
          </p>
          <p>
            <strong>Payment:</strong>{" "}
            {studentData.responseoftaskdetails?.payment_boolean
              ? "Paid"
              : "Not Paid"}
          </p>
          <p>
            <strong>Payment Date:</strong>{" "}
            {studentData.responseoftaskdetails?.payment_date}
          </p>

          <p>
            <strong>Payment Link:</strong>{" "}
            {studentData.responseoftaskdetails?.payment_link}
          </p>
        </section>

        {/* Account Information */}
        <section className="mb-8 w-1/2">
          <h2 className="text-xl font-semibold mb-4">Account Details</h2>
          <p>
            <strong>Email:</strong> {studentData.basicInfo.email}
          </p>
          <p>
            <strong>Password:</strong> {studentData.basicInfo.password}
          </p>
          <p>
            <strong>Basic Question 1 ID:</strong>{" "}
            {studentData.studentquestionids?.basic_question1_id}
          </p>
          <p>
            <strong>Basic Question 2 ID:</strong>{" "}
            {studentData.studentquestionids?.basic_question2_id}
          </p>
          <p>
            <strong>Basic Question 3 ID:</strong>{" "}
            {studentData.studentquestionids?.basic_question3_id}
          </p>
          <p>
            <strong>Advance Question 1 ID:</strong>{" "}
            {studentData.studentquestionids?.advance_question1_id}
          </p>
          <p>
            <strong>Advance Question 2 ID:</strong>{" "}
            {studentData.studentquestionids?.advance_question2_id}
          </p>
          <p>
            <strong>Basic Question 1 Check:</strong>{" "}
            {studentData.studentquestionids?.basic_question1_check
              ? "Yes"
              : "No"}
          </p>
          <p>
            <strong>Basic Question 2 Check:</strong>{" "}
            {studentData.studentquestionids?.basic_question2_check
              ? "Yes"
              : "No"}
          </p>
          <p>
            <strong>Basic Question 3 Check:</strong>{" "}
            {studentData.studentquestionids?.basic_question3_check
              ? "Yes"
              : "No"}
          </p>
          <p>
            <strong>Advance Question 1 Check:</strong>{" "}
            {studentData.studentquestionids?.advance_question1_check
              ? "Yes"
              : "No"}
          </p>
          <p>
            <strong>Advance Question 2 Check:</strong>{" "}
            {studentData.studentquestionids?.advance_question2_check
              ? "Yes"
              : "No"}
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
              <strong>Live Link:</strong>{" "}
              <a
                href={studentData.responseoftaskdetails?.firstquestionlivelink}
                target="_blank"
                rel="noopener noreferrer"
              >
                {studentData.responseoftaskdetails?.firstquestionlivelink}
              </a>
            </p>
            <p className="text-sm mb-2">
              <strong>GitHub Link:</strong>{" "}
              <a
                href={
                  studentData.responseoftaskdetails?.firstquestiongithublink
                }
                target="_blank"
                rel="noopener noreferrer"
              >
                {studentData.responseoftaskdetails?.firstquestiongithublink}
              </a>
            </p>
          </div>

          {/* Second Question */}
          <div className="border border-gray-200 p-4 rounded">
            <h3 className="font-semibold mb-2">Second Question</h3>
            <p className="text-sm mb-2">
              <strong>Live Link:</strong>{" "}
              <a
                href={studentData.responseoftaskdetails?.secondquestionlivelink}
                target="_blank"
                rel="noopener noreferrer"
              >
                {studentData.responseoftaskdetails?.secondquestionlivelink}
              </a>
            </p>
            <p className="text-sm mb-2">
              <strong>GitHub Link:</strong>{" "}
              <a
                href={
                  studentData.responseoftaskdetails?.secondquestiongithublink
                }
                target="_blank"
                rel="noopener noreferrer"
              >
                {studentData.responseoftaskdetails?.secondquestiongithublink}
              </a>
            </p>
          </div>

          {/* Third Question */}
          <div className="border border-gray-200 p-4 rounded">
            <h3 className="font-semibold mb-2">Third Question</h3>
            <p className="text-sm mb-2">
              <strong>Live Link:</strong>{" "}
              <a
                href={studentData.responseoftaskdetails?.thirdquestionlivelink}
                target="_blank"
                rel="noopener noreferrer"
              >
                {studentData.responseoftaskdetails?.thirdquestionlivelink}
              </a>
            </p>
            <p className="text-sm mb-2">
              <strong>GitHub Link:</strong>{" "}
              <a
                href={
                  studentData.responseoftaskdetails?.thirdquestiongithublink
                }
                target="_blank"
                rel="noopener noreferrer"
              >
                {studentData.responseoftaskdetails?.thirdquestiongithublink}
              </a>
            </p>
          </div>

          {/* Fourth Question */}
          <div className="border border-gray-200 p-4 rounded">
            <h3 className="font-semibold mb-2">Fourth Question</h3>

            <p className="text-sm mb-2">
              <strong>Live Link:</strong>{" "}
              <a
                href={studentData.responseoftaskdetails?.fourthquestionlivelink}
                target="_blank"
                rel="noopener noreferrer"
              >
                {studentData.responseoftaskdetails?.fourthquestionlivelink}
              </a>
            </p>
            <p className="text-sm mb-2">
              <strong>GitHub Link:</strong>{" "}
              <a
                href={
                  studentData.responseoftaskdetails?.fourthquestiongithublink
                }
                target="_blank"
                rel="noopener noreferrer"
              >
                {studentData.responseoftaskdetails?.fourthquestiongithublink}
              </a>
            </p>
          </div>

          {/* <div className="border border-gray-200 p-4 rounded">
            <h3 className="font-semibold mb-2">Fifth Question</h3>
            
            
            <p className="text-sm mb-2">
              <strong>Live Link:</strong>{" "}
              <a
                href={studentData.responseoftaskdetails.figthquestiongithublink}
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
          </div> */}
        </div>
      </section>
    </div>
  );
};

export default StudentDetailPage;

import React from "react";

const StudentDetailPage = () => {
  // Sample student data (replace with actual data)
  const studentData = {
    basicInfo: {
      studentId: 1,
      firstName: "John",
      middleName: "",
      lastName: "Doe",
      country: "USA",
      howYouHeard: "Friend",
      phone: "123-456-7890",
      alternatePhone: "987-654-3210",
      email: "john.doe@example.com",
      github: "https://github.com/johndoe",
      linkedin: "https://www.linkedin.com/in/johndoe",
      createdDate: "2024-03-31",
      sector: "Technology",
    },
    offerInfo: {
      studentId: 1,
      offerLetter: 1,
      offerLetterDate: "2024-01-15",
      responseOfTask: 1,
      responseOfTaskDate: "2024-02-01",
      completionCertificate: 0,
      completionCertificateDate: null,
      letterOfRecommendation: 1,
      letterOfRecommendationDate: "2024-03-15",
      goodies: 1,
      goodiesReceivedDate: "2024-03-25",
      payment: 1,
      paymentAmount: 5000.0,
      paymentDate: "2024-02-15",
      paymentDescription: "Registration Fee",
    },
    educationInfo: {
      studentId: 1,
      tenthBoard: "State Board",
      tenthSchool: "ABC High School",
      tenthPercentage: 85.5,
      twelfthBoard: "State Board",
      twelfthSchool: "XYZ Higher Secondary School",
      twelfthPercentage: 82.0,
      bachelorUniversity: "University of ABC",
      bachelorCollege: "XYZ College",
      bachelorPercentage: 75.0,
    },
    questionInfo: {
      studentId: 1,
      firstQuestionLiveLink: "https://example.com/firstquestion",
      firstQuestionGithubLink: "https://github.com/johndoe/firstquestion",
      secondQuestionLiveLink: "https://example.com/secondquestion",
      secondQuestionGithubLink: "https://github.com/johndoe/secondquestion",
      thirdQuestionLiveLink: "https://example.com/thirdquestion",
      thirdQuestionGithubLink: "https://github.com/johndoe/thirdquestion",
      fourthQuestionLiveLink: "https://example.com/fourthquestion",
      fourthQuestionGithubLink: "https://github.com/johndoe/fourthquestion",
      paymentScreenshot: null, // Payment screenshot will be displayed here
      paymentBoolean: 1,
      paymentDate: "2024-02-15",
    },
    accountInfo: {
      studentId: 1,
      basicQuestion1Id: 123,
      basicQuestion2Id: 456,
      basicQuestion3Id: 789,
      advanceQuestion1Id: 987,
      advanceQuestion2Id: 654,
      basicQuestion1Check: 1,
      basicQuestion2Check: 0,
      basicQuestion3Check: 1,
      advanceQuestion1Check: 1,
      advanceQuestion2Check: 0,
      email: "john.doe@example.com",
      password: "*********",
    },
  };

  return (
    <div className="container mx-auto bg-white">
      <h1 className="text-2xl font-bold mb-4">Student Details</h1>

      {/* Basic Information */}
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Basic Information</h2>
        <p>
          <strong>ID:</strong> {studentData.basicInfo.studentId}
        </p>
        <p>
          <strong>Name:</strong>{" "}
          {`${studentData.basicInfo.firstName} ${studentData.basicInfo.middleName} ${studentData.basicInfo.lastName}`}
        </p>
        <p>
          <strong>Country:</strong> {studentData.basicInfo.country}
        </p>
        {/* Add more details as needed */}
      </section>

      {/* Offer Information */}
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Offer Information</h2>
        <p>
          <strong>Offer Letter:</strong>{" "}
          {studentData.offerInfo.offerLetter ? "Received" : "Not Received"}
        </p>
        <p>
          <strong>Offer Letter Date:</strong>{" "}
          {studentData.offerInfo.offerLetterDate}
        </p>
        <p>
          <strong>Response of Task:</strong>{" "}
          {studentData.offerInfo.responseOfTask ? "Received" : "Not Received"}
        </p>
        <p>
          <strong>Response of Task Date:</strong>{" "}
          {studentData.offerInfo.responseOfTaskDate}
        </p>
        <p>
          <strong>Completion Certificate:</strong>{" "}
          {studentData.offerInfo.completionCertificate
            ? "Received"
            : "Not Received"}
        </p>
        <p>
          <strong>Completion Certificate Date:</strong>{" "}
          {studentData.offerInfo.completionCertificateDate
            ? studentData.offerInfo.completionCertificateDate
            : "N/A"}
        </p>
        <p>
          <strong>Letter of Recommendation:</strong>{" "}
          {studentData.offerInfo.letterOfRecommendation
            ? "Received"
            : "Not Received"}
        </p>
        <p>
          <strong>Letter of Recommendation Date:</strong>{" "}
          {studentData.offerInfo.letterOfRecommendationDate}
        </p>
        <p>
          <strong>Goodies:</strong>{" "}
          {studentData.offerInfo.goodies ? "Received" : "Not Received"}
        </p>
        <p>
          <strong>Goodies Received Date:</strong>{" "}
          {studentData.offerInfo.goodiesReceivedDate}
        </p>
        <p>
          <strong>Payment:</strong>{" "}
          {studentData.offerInfo.payment ? "Paid" : "Not Paid"}
        </p>
        <p>
          <strong>Payment Amount:</strong> $
          {studentData.offerInfo.paymentAmount}
        </p>
        <p>
          <strong>Payment Date:</strong> {studentData.offerInfo.paymentDate}
        </p>
        <p>
          <strong>Payment Description:</strong>{" "}
          {studentData.offerInfo.paymentDescription}
        </p>
      </section>

      {/* Education Information */}
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Education Information</h2>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <h3 className="font-semibold mb-2">10th Grade</h3>
            <p>
              <strong>Board:</strong> {studentData.educationInfo.tenthBoard}
            </p>
            <p>
              <strong>School:</strong> {studentData.educationInfo.tenthSchool}
            </p>
            <p>
              <strong>Percentage:</strong>{" "}
              {studentData.educationInfo.tenthPercentage}%
            </p>
          </div>
          <div>
            <h3 className="font-semibold mb-2">12th Grade</h3>
            <p>
              <strong>Board:</strong> {studentData.educationInfo.twelfthBoard}
            </p>
            <p>
              <strong>School:</strong> {studentData.educationInfo.twelfthSchool}
            </p>
            <p>
              <strong>Percentage:</strong>{" "}
              {studentData.educationInfo.twelfthPercentage}%
            </p>
          </div>
          <div>
            <h3 className="font-semibold mb-2">Bachelor's Degree</h3>
            <p>
              <strong>University:</strong>{" "}
              {studentData.educationInfo.bachelorUniversity}
            </p>
            <p>
              <strong>College:</strong>{" "}
              {studentData.educationInfo.bachelorCollege}
            </p>
            <p>
              <strong>Percentage:</strong>{" "}
              {studentData.educationInfo.bachelorPercentage}%
            </p>
          </div>
        </div>
      </section>

      {/* Question Information */}
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Questions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* First Question */}
          <div className="border border-gray-200 p-4 rounded">
            <h3 className="font-semibold mb-2">First Question</h3>
            <p className="text-sm mb-2">
              <strong>Live Link:</strong>{" "}
              <a
                href={studentData.questionInfo.firstQuestionLiveLink}
                target="_blank"
                rel="noopener noreferrer"
              >
                {studentData.questionInfo.firstQuestionLiveLink}
              </a>
            </p>
            <p className="text-sm">
              <strong>GitHub Link:</strong>{" "}
              <a
                href={studentData.questionInfo.firstQuestionGithubLink}
                target="_blank"
                rel="noopener noreferrer"
              >
                {studentData.questionInfo.firstQuestionGithubLink}
              </a>
            </p>
          </div>
          {/* Second Question */}
          <div className="border border-gray-200 p-4 rounded">
            <h3 className="font-semibold mb-2">Second Question</h3>
            <p className="text-sm mb-2">
              <strong>Live Link:</strong>{" "}
              <a
                href={studentData.questionInfo.secondQuestionLiveLink}
                target="_blank"
                rel="noopener noreferrer"
              >
                {studentData.questionInfo.secondQuestionLiveLink}
              </a>
            </p>
            <p className="text-sm">
              <strong>GitHub Link:</strong>{" "}
              <a
                href={studentData.questionInfo.secondQuestionGithubLink}
                target="_blank"
                rel="noopener noreferrer"
              >
                {studentData.questionInfo.secondQuestionGithubLink}
              </a>
            </p>
          </div>
          {/* Third Question */}
          <div className="border border-gray-200 p-4 rounded">
            <h3 className="font-semibold mb-2">Third Question</h3>
            <p className="text-sm mb-2">
              <strong>Live Link:</strong>{" "}
              <a
                href={studentData.questionInfo.thirdQuestionLiveLink}
                target="_blank"
                rel="noopener noreferrer"
              >
                {studentData.questionInfo.thirdQuestionLiveLink}
              </a>
            </p>
            <p className="text-sm">
              <strong>GitHub Link:</strong>{" "}
              <a
                href={studentData.questionInfo.thirdQuestionGithubLink}
                target="_blank"
                rel="noopener noreferrer"
              >
                {studentData.questionInfo.thirdQuestionGithubLink}
              </a>
            </p>
          </div>
          {/* Fourth Question */}
          <div className="border border-gray-200 p-4 rounded">
            <h3 className="font-semibold mb-2">Fourth Question</h3>
            <p className="text-sm mb-2">
              <strong>Live Link:</strong>{" "}
              <a
                href={studentData.questionInfo.fourthQuestionLiveLink}
                target="_blank"
                rel="noopener noreferrer"
              >
                {studentData.questionInfo.fourthQuestionLiveLink}
              </a>
            </p>
            <p className="text-sm">
              <strong>GitHub Link:</strong>{" "}
              <a
                href={studentData.questionInfo.fourthQuestionGithubLink}
                target="_blank"
                rel="noopener noreferrer"
              >
                {studentData.questionInfo.fourthQuestionGithubLink}
              </a>
            </p>
          </div>
        </div>
      </section>

      {/* Account Information */}
      {/* Account Information */}
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Account Details</h2>
        <p>
          <strong>Email:</strong> {studentData.accountInfo.email}
        </p>
        <p>
          <strong>Password:</strong> {studentData.accountInfo.password}
        </p>
        <p>
          <strong>Basic Question 1 ID:</strong>{" "}
          {studentData.accountInfo.basicQuestion1Id}
        </p>
        <p>
          <strong>Basic Question 2 ID:</strong>{" "}
          {studentData.accountInfo.basicQuestion2Id}
        </p>
        <p>
          <strong>Basic Question 3 ID:</strong>{" "}
          {studentData.accountInfo.basicQuestion3Id}
        </p>
        <p>
          <strong>Advance Question 1 ID:</strong>{" "}
          {studentData.accountInfo.advanceQuestion1Id}
        </p>
        <p>
          <strong>Advance Question 2 ID:</strong>{" "}
          {studentData.accountInfo.advanceQuestion2Id}
        </p>
        <p>
          <strong>Basic Question 1 Check:</strong>{" "}
          {studentData.accountInfo.basicQuestion1Check ? "Yes" : "No"}
        </p>
        <p>
          <strong>Basic Question 2 Check:</strong>{" "}
          {studentData.accountInfo.basicQuestion2Check ? "Yes" : "No"}
        </p>
        <p>
          <strong>Basic Question 3 Check:</strong>{" "}
          {studentData.accountInfo.basicQuestion3Check ? "Yes" : "No"}
        </p>
        <p>
          <strong>Advance Question 1 Check:</strong>{" "}
          {studentData.accountInfo.advanceQuestion1Check ? "Yes" : "No"}
        </p>
        <p>
          <strong>Advance Question 2 Check:</strong>{" "}
          {studentData.accountInfo.advanceQuestion2Check ? "Yes" : "No"}
        </p>
      </section>
    </div>
  );
};

export default StudentDetailPage;

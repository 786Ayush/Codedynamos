import React from 'react';

const OfferLetter = () => {
  return (
    <div className="page bg-gradient-to-br from-pink-500 to-purple-800 min-h-screen flex items-center justify-center">
      <div className="content bg-white p-8 rounded-lg shadow-xl">
        <h1 className="text-3xl font-bold mb-4 text-center text-gray-900">Job Offer Letter</h1>
        <p className="text-lg mb-6 text-center text-gray-800">[Date]</p>
        <p className="text-lg mb-6 text-center text-gray-800">[Candidate Name]</p>
        <p className="text-lg mb-6 text-center text-gray-800">[Address]</p>
        <p className="text-lg mb-6 text-center text-gray-800">Dear [Candidate Name],</p>
        <p className="text-lg mb-6 text-center text-gray-800">We are thrilled to offer you the position of [Job Title] at [Company Name]. After carefully reviewing your qualifications and experience, we believe you would be a valuable addition to our team.</p>
        <p className="text-lg mb-6 text-center text-gray-800">Your starting salary will be [Salary] per [time period] with potential for performance-based increases. You will be eligible for [Company Benefits].</p>
        <p className="text-lg mb-6 text-center text-gray-800">Your start date will be [Start Date]. Prior to your start date, we require completion of the necessary paperwork and documentation.</p>
        <p className="text-lg mb-6 text-center text-gray-800">We are confident that you will excel in this role and contribute to the success of our company. If you have any questions or concerns, please do not hesitate to contact us.</p>
        <p className="text-lg mb-6 text-center text-gray-800">Please signify your acceptance of this offer by signing below and returning it to us by [Acceptance Deadline].</p>
        <p className="text-lg mb-6 text-center text-gray-800">We look forward to welcoming you to our team!</p>
        <div className="flex justify-center mt-8">
          <p className="text-lg text-gray-800">Sincerely,</p>
        </div>
        <div className="flex justify-center mt-4">
          <p className="text-lg text-gray-800">[Your Name]</p>
        </div>
        <div className="flex justify-center mt-4">
          <p className="text-lg text-gray-800">[Your Title]</p>
        </div>
        <div className="flex justify-center mt-4">
          <p className="text-lg text-gray-800">[Company Name]</p>
        </div>
      </div>
    </div>
  );
};

export default OfferLetter;

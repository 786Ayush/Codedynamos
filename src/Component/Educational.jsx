// EducationalDetailsForm.js

import React, { useState } from 'react';

const EducationalDetailsForm = () => {
  const [educationDetails, setEducationDetails] = useState({
    school: '',
    degree: '',
    graduationYear: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEducationDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission or validation logic here
    console.log('Form submitted with:', educationDetails);
  };

  return (
    <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded-md shadow-md">
      <h2 className="text-2xl font-semibold mb-4">Educational Details</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="school" className="block text-sm font-medium text-gray-600">
            School/College
          </label>
          <input
            type="text"
            id="school"
            name="school"
            value={educationDetails.school}
            onChange={handleChange}
            className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:border-blue-500"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="degree" className="block text-sm font-medium text-gray-600">
            Degree
          </label>
          <input
            type="text"
            id="degree"
            name="degree"
            value={educationDetails.degree}
            onChange={handleChange}
            className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:border-blue-500"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="graduationYear" className="block text-sm font-medium text-gray-600">
            Graduation Year
          </label>
          <input
            type="text"
            id="graduationYear"
            name="graduationYear"
            value={educationDetails.graduationYear}
            onChange={handleChange}
            className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:border-blue-500"
            required
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
        >
          Save
        </button>
      </form>
    </div>
  );
};

export default EducationalDetailsForm;

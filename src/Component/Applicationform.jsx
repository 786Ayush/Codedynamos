import React, { useState } from 'react';

const ApplicationForm = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    middleName: '',
    lastName: '',
    country: '',
    howYouHeard: '',
    phoneNumber: '',
    emailAddress: '',
    githubLink: '',
    linkedinAddress: '',
    alternateNumber: '',
  });

  const countries = [
    'Select Country',
    'USA',
    'Canada',
    'UK',
    'Germany',
    'France',
    'Australia',
    // Add more countries as needed
  ];

  const howYouHeardOptions = [
    'Select Option',
    'LinkedIn',
    'GitHub',
    'Facebook',
    'Twitter',
    'Friend/Family',
    'Job Fair',
    'Other',
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // You can perform further actions with the form data here
    console.log('Form data submitted:', formData);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="p-6 bg-white rounded-md shadow-md w-1/2">
        <h2 className="text-2xl font-semibold mb-4">Basic Details</h2>
        <hr className="m-4" />
        <form onSubmit={handleSubmit}>

          {/* Country Dropdown */}
          <div className="flex items-center m-4">
            <label htmlFor="country">Country:</label>
            <select
              id="country"
              name="country"
              value={formData.country}
              onChange={handleChange}
              className="m-4 p-2 border rounded"
              required
            >
              {countries.map((country, index) => (
                <option key={index} value={country}>
                  {country}
                </option>
              ))}
            </select>
          </div>

          {/* How You Heard Dropdown */}
          <div className="flex items-center m-4">
            <label htmlFor="howYouHeard">How did you hear about us?</label>
            <select
              id="howYouHeard"
              name="howYouHeard"
              value={formData.howYouHeard}
              onChange={handleChange}
              className="m-4 p-2 border rounded"
              required
            >
              {howYouHeardOptions.map((option, index) => (
                <option key={index} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>

          <hr className="m-4" />

          {/* First Name */}
          <div className="flex items-center m-4">
            <label htmlFor="firstName">First Name:</label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              className="m-4 p-2 border rounded"
              required
            />
          </div>

          {/* Middle Name */}
          <div className="flex items-center m-4">
            <label htmlFor="middleName">Middle Name:</label>
            <input
              type="text"
              id="middleName"
              name="middleName"
              value={formData.middleName}
              onChange={handleChange}
              className="m-4 p-2 border rounded"
            />
          </div>

          {/* Last Name */}
          <div className="flex items-center m-4">
            <label htmlFor="lastName">Last Name:</label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              className="m-4 p-2 border rounded"
              required
            />
          </div>

          <hr className="m-4" />

          {/* Phone Number */}
          <div className="flex items-center m-4">
            <label htmlFor="phoneNumber" className="mr-4">Phone Number:</label>
            <input
              type="tel"
              id="phoneNumber"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              className="m-4 p-2 border rounded"
              required
            />
          </div>

          {/* Alternate Number */}
          <div className="flex items-center m-4">
            <label htmlFor="alternateNumber" className="mr-4">Alternate Number:</label>
            <input
              type="tel"
              id="alternateNumber"
              name="alternateNumber"
              value={formData.alternateNumber}
              onChange={handleChange}
              className="m-4 p-2 border rounded"
            />
          </div>

          {/* Email Address */}
          <div className="flex items-center m-4">
            <label htmlFor="emailAddress" className="mr-4">Email Address:</label>
            <input
              type="email"
              id="emailAddress"
              name="emailAddress"
              value={formData.emailAddress}
              onChange={handleChange}
              className="m-4 p-2 border rounded"
              required
            />
          </div>

          <hr className='m-4'/>

          {/* GitHub Link */}
          <div className="flex items-center m-4">
            <label htmlFor="githubLink" className="mr-4">GitHub Link:</label>
            <input
              type="url"
              id="githubLink"
              name="githubLink"
              value={formData.githubLink}
              onChange={handleChange}
              className="m-4 p-2 border rounded"
            />
          </div>

          {/* LinkedIn Address */}
          <div className="flex items-center m-4">
            <label htmlFor="linkedinAddress" className="mr-4">LinkedIn Link:</label>
            <input
              type="url"
              id="linkedinAddress"
              name="linkedinAddress"
              value={formData.linkedinAddress}
              onChange={handleChange}
              className="m-4 p-2 border rounded"
            />
          </div>

          {/* Submit Button */}
          <button type="submit" className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default ApplicationForm;

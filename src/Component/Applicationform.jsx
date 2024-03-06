import React, { useState } from "react";
import { Link } from "react-router-dom";
import { IoArrowBackOutline } from "react-icons/io5";
import { TbCaretRightFilled, TbCircleArrowRightFilled } from "react-icons/tb";
import Navbar from "./Navbar";
import Footer from "./Foot";

const ApplicationForm = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    middleName: "",
    lastName: "",
    country: "",
    howYouHeard: "",
    phoneNumber: "",
    emailAddress: "",
    githubLink: "",
    linkedinAddress: "",
    alternateNumber: "",
  });

  const countries = [
    "Select Country",
    "USA",
    "Canada",
    "UK",
    "Germany",
    "France",
    "Australia",
    // Add more countries as needed
  ];

  const howYouHeardOptions = [
    "Select Option",
    "LinkedIn",
    "GitHub",
    "Facebook",
    "Twitter",
    "Friend/Family",
    "Job Fair",
    "Other",
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // You can perform further actions with the form data here
    console.log("Form data submitted:", formData);
  };

  const lineStyle = {
    top: "50%",
    height: "2px",
    backgroundColor: "#BDBDBD",
    margin: "10px",
  };

  const circleStyle = {
    width: "20px",
    height: "20px",
    borderRadius: "50%",
    margin: "0 10px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    // position: "relative",
    backgroundColor: "#BDBDBD",
  };

  return (
    <div className="bg-gray-100">
      <Navbar />
      <div className="h-[1600px] flex flex-col items-center justify-center relative">
        <div
          className="w-full h-[500px] absolute top-0 opacity-[75%]"
          style={{
            backgroundImage: 'url("application.jpg")',
            backgroundSize: "cover",
          }}
        ></div>
        <div className="p-4 md:p-6 bg-white rounded-md shadow-md w-full md:w-1/2 z-1 absolute top-[300px]">
          <Link
            to="/internship"
            className="flex flex-start items-center text-blue-200"
          >
            <IoArrowBackOutline className="" />
            <span className="p-2">Back to Job Posting</span>
          </Link>
          <div className="flex justify-center mt-4 md:mt-6 relative items-start">
            <div className="flex flex-col items-center">
              <div
                style={{ ...circleStyle }}
                className="border-4 border-cyan-300 bg-white"
              ></div>
              Basic Details
            </div>
            <div style={{ ...lineStyle, width: "70px", left: "60px" }}></div>
            <div className="flex flex-col items-center">
              <div style={{ ...circleStyle }} className="flex justify-center">
                <TbCaretRightFilled className="text-white" />
              </div>
              Educatioanal Details
            </div>
            <div style={{ ...lineStyle, width: "70px", left: "160px" }}></div>
            <div className="flex flex-col items-center">
              <div style={{ ...circleStyle }} className="flex justify-center">
                <TbCaretRightFilled className="text-white" />
              </div>
              Upload Resume
            </div>
            <div style={{ ...lineStyle, width: "70px", left: "260px" }}></div>
            <div className="flex flex-col items-center">
              <div style={{ ...circleStyle }} className="flex justify-center">
                <TbCaretRightFilled className="text-white" />
              </div>
              Additioanal Details
            </div>
            <div style={{ ...lineStyle, width: "70px", left: "260px" }}></div>
            <div className="flex flex-col items-center">
              <div style={{ ...circleStyle }} className="flex justify-center">
                <TbCaretRightFilled className="text-white" />
              </div>
              Terms and conditions
            </div>
            <div style={{ ...lineStyle, width: "70px", left: "260px" }}></div>
            <div className="flex flex-col items-center">
              <div style={{ ...circleStyle }} className="flex justify-center">
                <TbCaretRightFilled className="text-white" />
              </div>
              Review
            </div>
          </div>
          <h2 className="text-lg md:text-2xl font-semibold m-2 md:m-4">
            Basic Details
          </h2>
          <hr className="m-2 md:m-4" />
          <form onSubmit={handleSubmit}>
            {/* Country Dropdown */}
            <div className="flex items-center m-4">
              <label htmlFor="country">Country:</label>
              <select
                id="country"
                name="country"
                value={formData.country}
                onChange={handleChange}
                className="m-4 p-2 border rounded bg-gray-100"
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
                className="m-4 p-2 border rounded bg-gray-100"
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
                className="m-4 p-2 border rounded bg-gray-100"
                placeholder="John"
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
                className="m-4 p-2 border rounded bg-gray-100"
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
                placeholder="Mehta"
                className="m-4 p-2 border rounded bg-gray-100"
                required
              />
            </div>

            <hr className="m-4" />

            {/* Phone Number */}
            <div className="flex items-center m-4">
              <label htmlFor="phoneNumber" className="mr-4">
                Phone Number:
              </label>
              <input
                type="tel"
                id="phoneNumber"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
                placeholder="0000-0000-00"
                className="m-4 p-2 border rounded bg-gray-100"
                required
              />
            </div>

            {/* Alternate Number */}
            <div className="flex items-center m-4">
              <label htmlFor="alternateNumber" className="mr-4">
                Alternate Number:
              </label>
              <input
                type="tel"
                id="alternateNumber"
                name="alternateNumber"
                placeholder="0000-0000-00"
                value={formData.alternateNumber}
                onChange={handleChange}
                className="m-4 p-2 border rounded bg-gray-100"
              />
            </div>

            {/* Email Address */}
            <div className="flex items-center m-4">
              <label htmlFor="emailAddress" className="mr-4">
                Email Address:
              </label>
              <input
                type="email"
                id="emailAddress"
                name="emailAddress"
                placeholder="xyz@gmail.com"
                value={formData.emailAddress}
                onChange={handleChange}
                className="m-4 p-2 border rounded bg-gray-100"
                required
              />
            </div>

            <hr className="m-4" />

            {/* GitHub Link */}
            <div className="flex items-center m-4">
              <label htmlFor="githubLink" className="mr-4">
                GitHub Link:
              </label>
              <input
                type="url"
                id="githubLink"
                name="githubLink"
                value={formData.githubLink}
                onChange={handleChange}
                className="m-4 p-2 border rounded bg-gray-100"
              />
            </div>

            {/* LinkedIn Address */}
            <div className="flex items-center m-4">
              <label htmlFor="linkedinAddress" className="mr-4">
                LinkedIn Link:
              </label>
              <input
                type="url"
                id="linkedinAddress"
                name="linkedinAddress"
                value={formData.linkedinAddress}
                onChange={handleChange}
                className="m-4 p-2 border rounded bg-gray-100"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ApplicationForm;

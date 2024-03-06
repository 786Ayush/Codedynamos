import React, { useState } from "react";
import { Link } from "react-router-dom";
import { IoArrowBackOutline } from "react-icons/io5";
import { TbCaretRightFilled, TbCircleArrowRightFilled } from "react-icons/tb";
import Navbar from "./Navbar";
import Footer from "./Foot";
import { FaDotCircle } from "react-icons/fa";
import { CiCircleChevRight } from "react-icons/ci";
import { FaRegCheckCircle } from "react-icons/fa";
import { Divider } from "@nextui-org/react";

//sector
const ApplicationForm = () => {
  const [form, setform] = useState("basic");
  const [educationalDetails, setEducationalDetails] = useState({
    tenth_board: "",
    tenth_school: "",
    tenth_percentage: "",
    twelfth_board: "",
    twelfth_school: "",
    twelfth_percentage: "",
    bachelor_university: "",
    bachelor_college: "",
    bachelor_percentage: "",
  });
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
    "India",
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
    setform("education");

    // You can perform further actions with the form data here
    console.log("Form data submitted:", formData);
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
        {form === "basic" && (
          <div className="p-4 md:p-6 bg-white rounded-md shadow-md w-full md:w-1/2 z-1 absolute top-[300px]">
            <Link
              to="/internship"
              className="flex flex-start items-center text-blue-200"
            >
              <IoArrowBackOutline className="" />
              <span className="p-2">Back to Job Posting</span>
            </Link>

            <div className="flex justify-center mt-4 md:mt-6 relative items-center px-5">
              <FaDotCircle className="text-primary w-8 h-8 " />

              <Divider className="text-seperate h-1 w-32 mx-3" />

              <CiCircleChevRight className="text-primary w-7 h-7 " />

              <Divider className="text-seperate h-1 w-32 mx-3" />

              <CiCircleChevRight className="text-primary w-7 h-7 " />

              <Divider className="text-seperate h-1 w-32 mx-3" />

              <CiCircleChevRight className="text-primary w-7 h-7 " />

              <Divider className="text-seperate h-1 w-32 mx-3" />

              <CiCircleChevRight className="text-primary w-7 h-7 " />

              <Divider className="text-seperate h-1 w-32 mx-3" />

              <CiCircleChevRight className="text-primary w-7 h-7 " />
            </div>
            <div className="flex w-full items-center justify-between">
              <span className="w-15 ">Basic Details </span>
              <span className="w-15 ">Educational Details </span>
              <span className="w-15 ">Upload Resume </span>
              <span className="w-15 ">Additioanal Details </span>
              <span className="w-15 ">Terms and conditions </span>
              <span className="w-15 ">Review </span>
            </div>
            <h2 className="text-lg md:text-2xl font-semibold m-2 md:m-4">
              Basic Details
            </h2>
            <hr className="m-2 md:m-4" />
            <form onSubmit={handleSubmit}>
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

              <button
                type="submit"
                className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
              >
                Submit
              </button>
            </form>
          </div>
        )}
        {form === "education" && (
          <div className="p-4 md:p-6 bg-white rounded-md shadow-md w-full md:w-1/2 z-1 absolute top-[300px]">
            <Link
              to="/internship"
              className="flex flex-start items-center text-blue-200"
            >
              <IoArrowBackOutline className="" />
              <span className="p-2">Back to Job Posting</span>
            </Link>
            <div className="flex justify-center mt-4 md:mt-6 relative items-center px-5">
              <FaRegCheckCircle className="text-primary w-5 h-5" />

              <Divider className="text-seperate h-1 w-32 mx-3" />

              <FaDotCircle className="text-primary w-8 h-8 " />

              <Divider className="text-seperate h-1 w-32 mx-3" />

              <CiCircleChevRight className="text-primary w-7 h-7 " />

              <Divider className="text-seperate h-1 w-32 mx-3" />

              <CiCircleChevRight className="text-primary w-7 h-7 " />

              <Divider className="text-seperate h-1 w-32 mx-3" />

              <CiCircleChevRight className="text-primary w-7 h-7 " />

              <Divider className="text-seperate h-1 w-32 mx-3" />

              <CiCircleChevRight className="text-primary w-7 h-7 " />
            </div>
            <div className="flex w-full items-center justify-between">
              <span className="w-15 ">Basic Details </span>
              <span className="w-15 ">Educational Details </span>
              <span className="w-15 ">Upload Resume </span>
              <span className="w-15 ">Additioanal Details </span>
              <span className="w-15 ">Terms and conditions </span>
              <span className="w-15 ">Review </span>
            </div>
            <h2 className="text-lg md:text-2xl font-semibold m-2 md:m-4">
              Educational Details
            </h2>
            <hr className="m-2 md:m-4" />
            <form onSubmit={handleSubmit}>
              <div className="flex items-center m-4">
                <label htmlFor="tenth_board">10th Board:</label>
                <input
                  type="text"
                  id="tenth_board"
                  name="tenth_board"
                  value={educationalDetails["tenth_board"]}
                  onChange={handleChange}
                  className="m-4 p-2 border rounded bg-gray-100"
                  required
                />
              </div>

              <div className="flex items-center m-4">
                <label htmlFor="tenth_school">10th School:</label>
                <input
                  type="text"
                  id="tenth_school"
                  name="tenth_school"
                  value={educationalDetails["tenth_school"]}
                  onChange={handleChange}
                  className="m-4 p-2 border rounded bg-gray-100"
                  required
                />
              </div>

              <div className="flex items-center m-4">
                <label htmlFor="tenth_percentage">10th Percentage:</label>
                <input
                  type="text"
                  id="tenth_percentage"
                  name="tenth_percentage"
                  value={educationalDetails["tenth_percentage"]}
                  onChange={handleChange}
                  className="m-4 p-2 border rounded bg-gray-100"
                  required
                />
              </div>

              <div className="flex items-center m-4">
                <label htmlFor="twelfth_board">12th Board:</label>
                <input
                  type="text"
                  id="twelfth_board"
                  name="twelfth_board"
                  value={educationalDetails["twelfth_board"]}
                  onChange={handleChange}
                  className="m-4 p-2 border rounded bg-gray-100"
                  required
                />
              </div>

              <div className="flex items-center m-4">
                <label htmlFor="twelfth_school">12th School:</label>
                <input
                  type="text"
                  id="twelfth_school"
                  name="twelfth_school"
                  value={educationalDetails["twelfth_school"]}
                  onChange={handleChange}
                  className="m-4 p-2 border rounded bg-gray-100"
                  required
                />
              </div>

              <div className="flex items-center m-4">
                <label htmlFor="twelfth_percentage">12th Percentage:</label>
                <input
                  type="text"
                  id="twelfth_percentage"
                  name="twelfth_percentage"
                  value={educationalDetails["twelfth_percentage"]}
                  onChange={handleChange}
                  className="m-4 p-2 border rounded bg-gray-100"
                  required
                />
              </div>

              <div className="flex items-center m-4">
                <label htmlFor="bachelor_university">
                  Bachelor's University:
                </label>
                <input
                  type="text"
                  id="bachelor_university"
                  name="bachelor_university"
                  value={educationalDetails["bachelor_university"]}
                  onChange={handleChange}
                  className="m-4 p-2 border rounded bg-gray-100"
                  required
                />
              </div>

              <div className="flex items-center m-4">
                <label htmlFor="bachelor_college">Bachelor's College:</label>
                <input
                  type="text"
                  id="bachelor_college"
                  name="bachelor_college"
                  value={educationalDetails["bachelor_college"]}
                  onChange={handleChange}
                  className="m-4 p-2 border rounded bg-gray-100"
                  required
                />
              </div>

              <div className="flex items-center m-4">
                <label htmlFor="bachelor_percentage">
                  Bachelor's Percentage:
                </label>
                <input
                  type="text"
                  id="bachelor_percentage"
                  name="bachelor_percentage"
                  value={educationalDetails["bachelor_percentage"]}
                  onChange={handleChange}
                  className="m-4 p-2 border rounded bg-gray-100"
                  required
                />
              </div>

              <button
                type="submit"
                className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
              >
                Save
              </button>
            </form>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default ApplicationForm;

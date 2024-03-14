import React, { useState } from "react";
import { Link } from "react-router-dom";
import { IoArrowBackOutline } from "react-icons/io5";

import Navbar from "./Navbar";
import Footer from "./Foot";
import { FaDotCircle } from "react-icons/fa";
import { CiCircleChevRight } from "react-icons/ci";
import { FaRegCheckCircle } from "react-icons/fa";
import { Divider } from "@nextui-org/react";

//sector
const ApplicationForm = () => {
  const [form, setform] = useState("basic");
  const [resume, setResume] = useState(null);
  const [isChecked, setIsChecked] = useState(false);

  const handleToggle = () => {
    const newValue = !isChecked;
    setIsChecked(newValue);
    // Call the onChange prop if provided
  };

  //-------------------------------------------------------------------------------------------------
  const handleResumeChange = (e) => setResume(e.target.files[0]);

  const handleResumeSubmit = (e) => {
    e.preventDefault();
    // Perform submission logic here
    // You can use resume file in this function to submit the data
    console.log("Submitted Resume:", resume);
    // Reset form fields after submission
    setResume(null);
  };

  //---------------------------------------------------------------------------------------------------
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
  const handleEducationalChange = (e) => {
    const { name, value } = e.target;
    setEducationalDetails((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e, sector) => {
    e.preventDefault();
    setform(sector);
    const combinedData = { ...formData, educationalDetails };

    // You can perform further actions with the form data here
    console.log("Form data submitted:", combinedData);
  };
  return (
    <div className="bg-gray-100">
      {form === "basic" && (
        <>
          <Navbar />
          <div className="h-[230vh] flex flex-col items-center justify-center relative">
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
              </div>
              <div className="flex w-full items-center justify-between">
                <span className="w-15 ">Basic Details </span>
                <span className="w-15 ">Educational Details </span>
                <span className="w-15 ">Upload Resume </span>
                <span className="w-15 ">Terms and conditions </span>
                <span className="w-15 ">Review </span>
              </div>
              <h2 className="text-lg md:text-2xl font-semibold m-2 md:m-4">
                Basic Details
              </h2>
              <hr className="m-2 md:m-4" />
              <form onSubmit={(event) => handleSubmit(event, "education")}>
                <div className="flex items-center m-4">
                  <label htmlFor="country">
                    Country<span className="text-red-500">*</span>:
                  </label>
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
                  <label htmlFor="howYouHeard">
                    How did you hear about us?
                  </label>
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
                  <label htmlFor="firstName">
                    First Name<span className="text-red-500">*</span>:
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    onKeyPress={(e) => {
                      const charCode = e.charCode;
                      if (
                        !(charCode >= 65 && charCode <= 90) &&
                        !(charCode >= 97 && charCode <= 122)
                      ) {
                        e.preventDefault();
                      }
                    }}
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
                    onKeyPress={(e) => {
                      const charCode = e.charCode;
                      if (
                        !(charCode >= 65 && charCode <= 90) &&
                        !(charCode >= 97 && charCode <= 122)
                      ) {
                        e.preventDefault();
                      }
                    }}
                    className="m-4 p-2 border rounded bg-gray-100"
                  />
                </div>

                <div className="flex items-center m-4">
                  <label htmlFor="lastName">
                    Last Name<span className="text-red-500">*</span>:
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    onKeyPress={(e) => {
                      const charCode = e.charCode;
                      if (
                        !(charCode >= 65 && charCode <= 90) &&
                        !(charCode >= 97 && charCode <= 122)
                      ) {
                        e.preventDefault();
                      }
                    }}
                    placeholder="Mehta"
                    className="m-4 p-2 border rounded bg-gray-100"
                    required
                  />
                </div>

                <hr className="m-4" />
                <div className="flex items-center m-4">
                  <label htmlFor="phoneNumber" className="mr-4">
                    Phone Number<span className="text-red-500">*</span>:
                  </label>
                  <input
                    type="tel"
                    id="phoneNumber"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleChange}
                    placeholder="0000-0000-00"
                    className="m-4 p-2 border rounded bg-gray-100"
                    pattern="[0-9-]{1,}"
                    required
                    onKeyPress={(e) => {
                      const isValidInput = /[0-9-]/.test(e.key);
                      if (!isValidInput) {
                        e.preventDefault();
                      }
                    }}
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
                    pattern="[0-9-]{1,}"
                    onKeyPress={(e) => {
                      const isValidInput = /[0-9-]/.test(e.key);
                      if (!isValidInput) {
                        e.preventDefault();
                      }
                    }}
                  />
                </div>
                <div className="flex items-center m-4">
                  <label htmlFor="emailAddress" className="mr-4">
                    Email Address<span className="text-red-500">*</span>:
                  </label>
                  <input
                    type="email"
                    id="emailAddress"
                    name="emailAddress"
                    placeholder="xyz@gmail.com"
                    value={formData.emailAddress}
                    onChange={handleChange}
                    className="m-4 p-2 border rounded bg-gray-100"
                    pattern="[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}"
                    title="Please enter a valid email address"
                    required
                  />
                </div>

                <hr className="m-4" />
                <div className="flex items-center m-4">
                  <label htmlFor="githubLink" className="mr-4">
                    GitHub Link<span className="text-red-500">*</span>:
                  </label>
                  <input
                    type="url"
                    id="githubLink"
                    name="githubLink"
                    value={formData.githubLink}
                    onChange={handleChange}
                    className="m-4 p-2 border rounded bg-gray-100"
                    pattern="https?://.+"
                    title="Please enter a valid URL starting with http:// or https://"
                    required
                  />
                </div>

                <div className="flex items-center m-4">
                  <label htmlFor="linkedinAddress" className="mr-4">
                    LinkedIn Link<span className="text-red-500">*</span>:
                  </label>
                  <input
                    type="url"
                    id="linkedinAddress"
                    name="linkedinAddress"
                    value={formData.linkedinAddress}
                    onChange={handleChange}
                    className="m-4 p-2 border rounded bg-gray-100"
                    pattern="https?://.+"
                    title="Please enter a valid URL starting with http:// or https://"
                    required
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
          </div>
          <Footer />
        </>
      )}

      {form === "education" && (
        <>
          <Navbar />
          <div className="h-[200vh] flex flex-col items-center justify-center relative">
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
              <div className="flex justify-center mt-4 md:mt-6 relative items-center px-5">
                <FaRegCheckCircle className="text-primary w-5 h-5" />
                <Divider className="text-separate h-1 w-32 mx-3" />
                <FaDotCircle className="text-primary w-8 h-8 " />
                <Divider className="text-separate h-1 w-32 mx-3" />
                <CiCircleChevRight className="text-primary w-7 h-7 " />
                <Divider className="text-separate h-1 w-32 mx-3" />
                <CiCircleChevRight className="text-primary w-7 h-7 " />
                <Divider className="text-separate h-1 w-32 mx-3" />
                <CiCircleChevRight className="text-primary w-7 h-7 " />
              </div>
              <div className="flex w-full items-center justify-between">
                <span className="w-15 ">Basic Details </span>
                <span className="w-15 ">Educational Details </span>
                <span className="w-15 ">Upload Resume </span>
                <span className="w-15 ">Terms and conditions </span>
                <span className="w-15 ">Review </span>
              </div>
              <h2 className="text-lg md:text-2xl font-semibold m-2 md:m-4">
                Educational Details
              </h2>
              <hr className="m-2 md:m-4" />
              <form onSubmit={(event) => handleSubmit(event, "resume")}>
                <div className="flex items-center m-4">
                  <label htmlFor="tenth_board">
                    10th Board:<span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="tenth_board"
                    name="tenth_board"
                    value={educationalDetails["tenth_board"]}
                    onChange={handleEducationalChange}
                    className="m-4 p-2 border rounded bg-gray-100"
                    required
                  />
                </div>

                <div className="flex items-center m-4">
                  <label htmlFor="tenth_school">
                    10th School:<span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="tenth_school"
                    name="tenth_school"
                    value={educationalDetails["tenth_school"]}
                    onChange={handleEducationalChange}
                    className="m-4 p-2 border rounded bg-gray-100"
                    required
                  />
                </div>

                <div className="flex items-center m-4">
                  <label htmlFor="tenth_percentage">
                    10th Percentage:<span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="tenth_percentage"
                    name="tenth_percentage"
                    value={educationalDetails["tenth_percentage"]}
                    onChange={handleEducationalChange}
                    className="m-4 p-2 border rounded bg-gray-100"
                    required
                  />
                </div>

                <div className="flex items-center m-4">
                  <label htmlFor="twelfth_board">
                    12th Board:<span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="twelfth_board"
                    name="twelfth_board"
                    value={educationalDetails["twelfth_board"]}
                    onChange={handleEducationalChange}
                    className="m-4 p-2 border rounded bg-gray-100"
                    required
                  />
                </div>

                <div className="flex items-center m-4">
                  <label htmlFor="twelfth_school">
                    12th School:<span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="twelfth_school"
                    name="twelfth_school"
                    value={educationalDetails["twelfth_school"]}
                    onChange={handleEducationalChange}
                    className="m-4 p-2 border rounded bg-gray-100"
                    required
                  />
                </div>

                <div className="flex items-center m-4">
                  <label htmlFor="twelfth_percentage">
                    12th Percentage:<span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="twelfth_percentage"
                    name="twelfth_percentage"
                    value={educationalDetails["twelfth_percentage"]}
                    onChange={handleEducationalChange}
                    className="m-4 p-2 border rounded bg-gray-100"
                    required
                  />
                </div>

                <div className="flex items-center m-4">
                  <label htmlFor="bachelor_university">
                    Bachelor's University:
                    <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="bachelor_university"
                    name="bachelor_university"
                    value={educationalDetails["bachelor_university"]}
                    onChange={handleEducationalChange}
                    className="m-4 p-2 border rounded bg-gray-100"
                    required
                  />
                </div>

                <div className="flex items-center m-4">
                  <label htmlFor="bachelor_college">
                    Bachelor's College:<span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="bachelor_college"
                    name="bachelor_college"
                    value={educationalDetails["bachelor_college"]}
                    onChange={handleEducationalChange}
                    className="m-4 p-2 border rounded bg-gray-100"
                    required
                  />
                </div>

                <div className="flex items-center m-4">
                  <label htmlFor="bachelor_percentage">
                    Bachelor's Percentage:
                    <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="bachelor_percentage"
                    name="bachelor_percentage"
                    value={educationalDetails["bachelor_percentage"]}
                    onChange={handleEducationalChange}
                    className="m-4 p-2 border rounded bg-gray-100"
                    required
                  />
                </div>

                <div className="flex justify-between">
                  <button
                    onClick={(event) => handleSubmit(event, "basic")}
                    className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
                  >
                    Back
                  </button>
                  <button
                    type="Submit"
                    className=" bg-blue-500 text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
                  >
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
          <Footer />
        </>
      )}

      {form === "resume" && (
        <>
          {" "}
          <Navbar />
          <div className="h-[100vh] flex flex-col items-center justify-center relative">
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

              <div className="flex justify-center mt-4 md:mt-6 relative items-center px-5">
                <FaRegCheckCircle className="text-primary w-5 h-5" />

                <Divider className="text-seperate h-1 w-32 mx-3" />

                <FaRegCheckCircle className="text-primary w-5 h-5" />

                <Divider className="text-seperate h-1 w-32 mx-3" />

                <FaDotCircle className="text-primary w-8 h-8 " />

                <Divider className="text-seperate h-1 w-32 mx-3" />

                <CiCircleChevRight className="text-primary w-7 h-7 " />

                <Divider className="text-seperate h-1 w-32 mx-3" />

                <CiCircleChevRight className="text-primary w-7 h-7 " />
              </div>
              <div className="flex w-full items-center justify-between">
                <span className="w-15 ">Basic Details </span>
                <span className="w-15 ">Educational Details </span>
                <span className="w-15 ">Upload Resume </span>
                <span className="w-15 ">Terms and conditions </span>
                <span className="w-15 ">Review </span>
              </div>
              <div className=" m-5  bg-white ">
                <h2 className="text-lg font-semibold mb-4">
                  Submit Your Resume
                </h2>
                <form onSubmit={(event) => handleSubmit(event, "terms")}>
                  <div className="mb-4">
                    <label
                      className="block text-sm font-medium mb-1"
                      htmlFor="resume"
                    >
                      Upload Resume<span className="text-red-500">*</span>
                    </label>
                    <input
                      className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                      type="file"
                      id="resume"
                      accept=".pdf,.doc,.docx"
                      onChange={handleResumeChange}
                      required
                    />
                  </div>
                  <div className="flex justify-between">
                    <button
                      onClick={(event) => handleSubmit(event, "education")}
                      className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
                    >
                      Back
                    </button>
                    <button
                      type="Submit"
                      className=" bg-blue-500 text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
                    >
                      Submit
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
          <Footer />
        </>
      )}

      {form === "terms" && (
        <>
          {" "}
          <Navbar />
          <div className="h-[130vh] flex flex-col items-center justify-center relative">
            <div
              className="w-full h-[500px] absolute top-0 opacity-[75%]"
              style={{
                backgroundImage: 'url("application.jpg")',
                backgroundSize: "cover",
              }}
            ></div>
            <>
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

                  <FaRegCheckCircle className="text-primary w-5 h-5" />

                  <Divider className="text-seperate h-1 w-32 mx-3" />

                  <FaRegCheckCircle className="text-primary w-5 h-5" />

                  <Divider className="text-seperate h-1 w-32 mx-3" />

                  <FaDotCircle className="text-primary w-8 h-8 " />

                  <Divider className="text-seperate h-1 w-32 mx-3" />

                  <CiCircleChevRight className="text-primary w-7 h-7 " />
                </div>
                <div className="flex w-full items-center justify-between">
                  <span className="w-15 ">Basic Details </span>
                  <span className="w-15 ">Educational Details </span>
                  <span className="w-15 ">Upload Resume </span>
                  <span className="w-15 ">Terms and conditions </span>
                  <span className="w-15 ">Review </span>
                </div>
                <form onSubmit={(event) => handleSubmit(event, "check")}>
                  <div className="font-bold text-xl py-4">
                    Terms and Conditions
                  </div>
                  <div className="txt h-[40vh] overflow-auto rounded border-separate border-3 p-3">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Natus necessitatibus sed inventore reiciendis enim incidunt
                    odit dolores, harum ullam. Quae nihil vitae ducimus eum
                    perferendis, numquam rerum eaque autem veniam assumenda
                    molestias quaerat minus, accusamus totam suscipit aliquid
                    ratione voluptatem a expedita eligendi aut accusantium ipsa!
                    Atque, doloremque! Aspernatur nostrum eaque nisi labore non
                    temporibus dicta? Reprehenderit nostrum modi eos similique,
                    temporibus dolor? Est fuga maiores aut asperiores dolor
                    voluptas expedita inventore. Facere, ullam totam accusantium
                    perspiciatis voluptatem a repudiandae dolor fugit voluptate,
                    culpa debitis consectetur explicabo quisquam deserunt ea et
                    cupiditate. Labore minima dignissimos consectetur deleniti
                    sint porro doloribus esse facere nobis, neque suscipit hic
                    est dolorem mollitia libero ipsum harum corporis quia
                    recusandae. Rerum odit enim perspiciatis veritatis!
                    Voluptate sapiente architecto quisquam? Velit quae cum
                    dolorum minus, consequuntur vitae hic, fugit ex recusandae
                    est neque voluptate dolor voluptatibus illum alias corporis
                    unde. Totam illo laboriosam eos molestiae quis earum quas
                    nisi esse. Nesciunt vitae aliquid quos aut magni quaerat,
                    sapiente voluptatum fugit, numquam a voluptate hic!
                    Voluptatibus minima provident voluptatem esse adipisci,
                    ducimus, facere totam dolore fugiat fugit modi beatae
                    expedita pariatur reprehenderit magnam cum aliquid a
                    asperiores obcaecati veniam doloribus molestiae assumenda
                    tempora. Numquam inventore doloribus quos officia iusto
                    quisquam impedit dolorum labore tempora pariatur maiores
                    dolore fugiat, maxime quibusdam. Culpa dolore aspernatur
                    sequi ut vitae nesciunt id eum necessitatibus, atque
                    eveniet, ea perferendis nostrum perspiciatis quia, ab earum
                    quisquam illum cupiditate laboriosam. Rem, sit dolorum
                    distinctio velit cupiditate suscipit impedit quos a culpa.
                    Voluptatibus, cumque, sapiente tempore enim delectus quasi
                    atque veritatis deserunt earum deleniti illum iusto iste
                    necessitatibus molestiae! Nihil explicabo expedita alias
                    doloribus aliquam voluptate impedit? Corrupti nostrum in,
                    quo molestiae, ipsam, laboriosam quasi necessitatibus
                    voluptas a unde sit itaque totam nam dignissimos sint. Porro
                    iusto quas illo mollitia commodi placeat aspernatur neque
                    ratione reprehenderit dolor. Laudantium quam, non, voluptate
                    exercitationem obcaecati, veritatis expedita minus numquam
                    aliquam fugiat fugit? Accusantium asperiores harum error.
                    Cum, ut magni. Quidem dignissimos vero quo ea ratione
                    mollitia odit voluptas ut. Exercitationem aut magnam sunt
                    cumque hic laudantium ducimus facere illum rerum, culpa amet
                    dolor? Molestias fugiat ex veritatis, inventore quia sequi
                    eligendi voluptates vero quaerat dolorem ratione illum.
                    Sunt, rerum. Voluptas, exercitationem labore! Est numquam
                    nam quaerat ut, id ratione. Perspiciatis laboriosam repellat
                    culpa amet alias, magni quaerat, similique aspernatur natus
                    debitis, consequuntur voluptates molestiae recusandae a
                    sequi odit ea eos accusamus sit quam adipisci. Error,
                    laboriosam quasi.
                  </div>
                  <div className="flex items-center mt-4">
                    <input
                      type="checkbox"
                      checked={isChecked}
                      onClick={handleToggle}
                      className="form-checkbox h-5 w-5 text-indigo-600 transition duration-150 ease-in-out"
                      required
                    />
                    <div className="ml-2 text-gray-700">
                      Accepted terms and conditions
                    </div>
                  </div>

                  <div className="flex justify-between">
                    <button
                      onClick={(event) => handleSubmit(event, "resume")}
                      className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
                    >
                      Back
                    </button>
                    <button
                      type="Submit"
                      className=" bg-blue-500 text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
                    >
                      Submit
                    </button>
                  </div>
                </form>
              </div>
            </>
          </div>
          <Footer />
        </>
      )}
      {form === "check" && (
        <>
          <Navbar />
          <div className="h-[200vh] flex flex-col items-center justify-center relative">
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

              <div className="flex justify-center mt-4 md:mt-6 relative items-center px-5">
                <FaRegCheckCircle className="text-primary w-5 h-5" />
                <Divider className="text-separate h-1 w-32 mx-3" />
                <FaRegCheckCircle className="text-primary w-5 h-5" />
                <Divider className="text-separate h-1 w-32 mx-3" />
                <FaRegCheckCircle className="text-primary w-5 h-5" />
                <Divider className="text-separate h-1 w-32 mx-3" />
                <FaRegCheckCircle className="text-primary w-5 h-5" />
                <Divider className="text-separate h-1 w-32 mx-3" />
                <FaDotCircle className="text-primary w-8 h-8 " />
              </div>
              <div className="flex w-full items-center justify-between">
                <span className="w-15 capitalize">Basic Details </span>
                <span className="w-15 capitalize">Educational Details </span>
                <span className="w-15 capitalize">Upload Resume </span>
                <span className="w-15 capitalize">Terms and conditions </span>
                <span className="w-15 capitalize">Review </span>
              </div>
              <div className="max-w-4xl mx-auto px-4 py-8">
                <h1 className="text-2xl font-bold mb-4">Application Form</h1>
                <div className="bg-gray-100 rounded p-4 mb-4">
                  {Object.entries(formData).map(([key, value]) => (
                    <div key={key} className="mb-2 flex justify-between">
                      <label className="block text-sm font-medium text-gray-700">
                        {key.replace(/_/g, " ")}
                      </label>
                      <p className="mt-1 text-sm text-gray-900">{value}</p>
                    </div>
                  ))}
                  {Object.entries(educationalDetails).map(([key, value]) => (
                    <div key={key} className="mb-2 flex justify-between">
                      <label className="block text-sm font-medium text-gray-700">
                        {key.replace(/_/g, " ")}
                      </label>
                      <p className="mt-1 text-sm text-gray-900">{value}</p>
                    </div>
                  ))}
                </div>
                <p className="text-sm text-gray-600 mb-4">
                  To change any detail, you may need to go back to previous
                  steps.
                </p>
                <div className="flex justify-between">
                  <button
                    onClick={(event) => handleSubmit(event, "terms")}
                    className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
                  >
                    Back
                  </button>
                  <button
                    // onClick={handleSubmit}
                    className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
                  >
                    Submit
                  </button>
                </div>
              </div>
            </div>
          </div>
          <Footer />
        </>
      )}
    </div>
  );
};

export default ApplicationForm;

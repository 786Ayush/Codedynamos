import React, { useState } from "react";
import { Link } from "react-router-dom";
import { IoArrowBackOutline } from "react-icons/io5";

import Navbar from "../Navbar";
import Footer from "../Foot";
import { FaDotCircle } from "react-icons/fa";
import { CiCircleChevRight } from "react-icons/ci";
import { FaRegCheckCircle } from "react-icons/fa";
import { Divider } from "@nextui-org/react";
import { Spinner } from "@nextui-org/react";
import { supabase } from "../../utils/Supabase";

import { motion } from "framer-motion";

//sector
const ApplicationForm = () => {
  const [form, setform] = useState("basic");
  const [resume, setResume] = useState(null);
  const [resumeUrl, setResumeUrl] = useState();
  const [isChecked, setIsChecked] = useState(false);
  const [errors, setErrors] = useState({});

  const handleToggle = () => {
    const newValue = !isChecked;
    setIsChecked(newValue);
    // Call the onChange prop if provided
  };

  //-------------------------------------------------------------------------------------------------
  const handleResumeChange = (e) => setResume(e.target.files[0]);

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
    setFormData({ ...formData, [name]: value }); // Validation logic for each field
    // let error = "";
    // if (name === "phoneNumber") {
    //   if (!/^\d{10}$/.test(value)) {
    //     error = "Please enter a valid phone number in the format XXXX-XXXX-XX";
    //   }
    // } else if (name === "emailAddress") {
    //   if (!/\S+@\S+\.\S+/.test(value)) {
    //     error = "Please enter a valid email address";
    //   }
    // } else if (name === "githubLink" || name === "linkedinAddress") {
    //   if (!/^https?:\/\/.+/.test(value)) {
    //     error = "Please enter a valid URL starting with http:// or https://";
    //   }
    // }
    // setErrors({ ...errors, [name]: error });
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


    // Validation for email address
    if (!/\S+@\S+\.\S+/.test(formData.emailAddress)) {
      setErrors({
        ...errors,
        emailAddress: "Please enter a valid email address",
      });
      return;
    }

    // Validation for GitHub link
    if (!/^https?:\/\/.+/.test(formData.githubLink)) {
      setErrors({
        ...errors,
        githubLink:
          "Please enter a valid URL starting with http:// or https://",
      });
      return;
    }

    // Validation for LinkedIn address
    if (!/^https?:\/\/.+/.test(formData.linkedinAddress)) {
      setErrors({
        ...errors,
        linkedinAddress:
          "Please enter a valid URL starting with http:// or https://",
      });
      return;
    }
    setform(sector);
    const combinedData = { ...formData, educationalDetails };
    console.log(combinedData);
  };

  const handleFinalSubmit = async (e) => {
    e.preventDefault();
    setform("loading");
    try {
      const currentTimestamp = new Date().getTime();
      const resumeName = `${formData.firstName}_${formData.lastName}_${currentTimestamp}`;
      console.log(resumeName);
      // Upload the file to Supabase Storage
      const { data, error } = await supabase.storage
        .from("CodeDynamos/resumes") // Replace 'your_bucket_name' with your actual bucket name
        .upload(resumeName, resume, { cacheControl: "3600" });

      if (error) {
        console.error("Error uploading resume:", error.message);
        return null;
      }
      console.log(data);
      // Retrieve the URL of the uploaded file
      const Url =
        process.env.REACT_APP_ResumeURL +
        data.fullPath;
      setResumeUrl(Url);
      console.log("Resume URL:", resumeUrl);
      // return resumeUrl;
    } catch (error) {
      console.error("Error uploading resume:", error.message);
      return null;
    }

    // Get the current URL
    const currentURL = window.location.href;

    // Function to extract the value parameter from the URL and replace %20 with space
    const extractValueFromURL = (url) => {
      // Create a new URL object
      const urlObject = new URL(url);
      // Get the value parameter from the URL searchParams
      let value = urlObject.searchParams.get("value");
      // Replace %20 with space
      value = value.replace(/%20/g, " ");
      return value;
    };

    // Call the function to extract the value parameter
    const value = extractValueFromURL(currentURL);

    console.log(value); // Output: Artificial Intelligence Intern
    // Get the current date
    const currentDate = new Date();

    // Get the current year and month
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth();

    // Calculate the first date of the next month
    const nextMonth = (currentMonth + 1) % 12;
    const nextYear = currentMonth === 11 ? currentYear + 1 : currentYear;
    const firstDateNextMonth = new Date(nextYear, nextMonth, 1);

    // Format the date as yyyy-mm-dd
    const year = firstDateNextMonth.getFullYear();
    const month = String(firstDateNextMonth.getMonth() + 1).padStart(2, "0"); // Months are zero-based
    const day = String(firstDateNextMonth.getDate()).padStart(2, "0");

    const formattedDate = `${year}-${month}-${day}`;

    // console.log(formattedDate);

    const { data, error } = await supabase.from("basic_details").insert([
      {
        first_name: formData.firstName.replace(/ /g, "_"),
        middle_name: formData.middleName.replace(/ /g, "_"),
        last_name: formData.lastName.replace(/ /g, "_"),
        country: formData.country,
        how_you_heard: formData.howYouHeard,
        phone: formData.phoneNumber,
        alternate_phone: formData.alternateNumber,
        email: formData.emailAddress,
        github: formData.githubLink,
        linkedin: formData.linkedinAddress,
        sector: value,
        resume_link: resumeUrl,
        password: formData.firstName + "@123",
        Start_Date: formattedDate,
      },
    ]).select();

    if (error) {
      console.error(
        "Error inserting form data into basic_details:",
        error.message
      );
      return;
    }

    console.log("Inserted form data into basic_details:", data);

    const { data: insertedEducationDetails, error: educationError } =
      await supabase.from("educational_details").insert([
        {
          tenth_board: educationalDetails.tenth_board,
          tenth_school: educationalDetails.tenth_school,
          tenth_percentage: educationalDetails.tenth_percentage,
          twelfth_board: educationalDetails.twelfth_board,
          twelfth_school: educationalDetails.twelfth_school,
          twelfth_percentage: educationalDetails.twelfth_percentage,
          bachelor_university: educationalDetails.bachelor_university,
          bachelor_college: educationalDetails.bachelor_college,
          bachelor_percentage: educationalDetails.bachelor_percentage,
        },
      ]);

    if (educationError) {
      console.error(
        "Error inserting educational details:",
        educationError.message
      );
      return;
    }
    const { data: questions, error: questionserror } = await supabase
      .from("questions")
      .select("*")
      .eq("Sector", value);

    if (questionserror) {
      console.error("Error getting question details:", questionserror.message);
      return;
    }
    console.log("questions", questions);
    const basicQuestions = questions
      .filter((q) => q.level === "Basic")
      .sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
    const advancedQuestions = questions
      .filter((q) => q.level === "Advanced")
      .sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
    const selectedBasic = basicQuestions.slice(0, 3);
    const selectedAdvanced = advancedQuestions.slice(0, 2);

    // Extract question IDs
    const basicQuestion1Id = selectedBasic[0]?.QuestionID || null;
    const basicQuestion2Id = selectedBasic[1]?.QuestionID || null;
    const basicQuestion3Id = selectedBasic[2]?.QuestionID || null;
    const advancedQuestion1Id = selectedAdvanced[0]?.QuestionID || null;
    const advancedQuestion2Id = selectedAdvanced[1]?.QuestionID || null;

    const { data: insertedquestion, error: insertedquestionerror } =
      await supabase.from("studentquestionids").insert([
        {
          studentid: data[0].student_id,
          basic_question1_id: basicQuestion1Id,
          basic_question2_id: basicQuestion2Id,
          basic_question3_id: basicQuestion3Id,
          advance_question1_id: advancedQuestion1Id,
          advance_question2_id: advancedQuestion2Id,
          basic_question1_check: false,
          basic_question2_check: false,
          basic_question3_check: false,
          advance_question1_check: false,
          advance_question2_check: false,
        },
      ]);

    if (error) {
      console.error("Error inserting data:", insertedquestionerror);
    } else {
      console.log("Data inserted successfully:", insertedquestion);
    }
    console.log("Inserted educational details:", insertedEducationDetails);
    setform("submit");
  };

  return (
    <div className="bg-gray-100">
      {form === "basic" && (
        <>
          <Navbar />
          <div className=" flex flex-col items-center justify-center ">
            <div
              className="w-full h-[30vh]  top-0 opacity-[75%]"
              style={{
                backgroundImage: 'url("application.jpg")',
                backgroundSize: "cover",
              }}
            ></div>

            <div className="p-4 md:p-6 bg-white rounded-md shadow-md w-full md:w-1/2 z-1  top-[300px]">
              <Link
                to="/internship"
                className="flex flex-start items-center text-blue-200"
              >
                <IoArrowBackOutline className="" />
                <span className="p-2">Back to Job Posting</span>
              </Link>

              <div className="flex justify-center mt-4 md:mt-6 relative items-center ">
                <FaDotCircle className="text-primary w-8 h-8 " />

                <Divider className="text-seperate h-1 w-8  xl:w-32 xl:mx-3" />

                <CiCircleChevRight className="text-primary w-7 h-7 " />

                <Divider className="text-seperate h-1 w-8 xl:w-32 xl:mx-3" />

                <CiCircleChevRight className="text-primary w-7 h-7 " />

                <Divider className="text-seperate h-1 w-8 xl:w-32 xl:mx-3" />

                <CiCircleChevRight className="text-primary w-7 h-7 " />
              </div>
              <div className="xl:flex w-full items-center justify-between hidden">
                <span className="w-15 ">Basic Details </span>
                <span className="w-15 ">Educational Details </span>
                <span className="w-15 ">Upload Resume </span>
                <span className="w-15 ">Terms and conditions </span>
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
                    className="w-full p-2 border rounded bg-gray-100"
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
                    className="w-full p-2 border rounded bg-gray-100"
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
                    className="w-full p-2 border rounded bg-gray-100"
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
                    className="w-full p-2 border rounded bg-gray-100"
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
                    placeholder=""
                    className="w-full p-2 border rounded bg-gray-100"
                    required
                  />
                </div>

                <hr className="m-4" />
                <div className="flex items-center m-4">
                  <label htmlFor="phoneNumber" className="mr-4">
                    Phone Number<span className="text-red-500">*</span>:
                  </label>
                  <div className="">
                    <input
                      type="tel"
                      id="phoneNumber"
                      name="phoneNumber"
                      value={formData.phoneNumber}
                      onChange={handleChange}
                      placeholder="0000-0000-00"
                      className="w-full p-2 border rounded bg-gray-100"
                      pattern="[0-9-]{1,}"
                      required
                      onKeyPress={(e) => {
                        const isValidInput = /[0-9-]/.test(e.key);
                        if (!isValidInput) {
                          e.preventDefault();
                        }
                      }}
                    />
                    {errors.phoneNumber && (
                      <div className="text-red-500">{errors.phoneNumber}</div>
                    )}
                  </div>
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
                    className="w-full p-2 border rounded bg-gray-100"
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
                  <div className="">
                    <input
                      type="email"
                      id="emailAddress"
                      name="emailAddress"
                      placeholder="xyz@gmail.com"
                      value={formData.emailAddress}
                      onChange={handleChange}
                      className="w-full p-2 border rounded bg-gray-100"
                      pattern="[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}"
                      title="Please enter a valid email address"
                      required
                    />
                    {errors.emailAddress && (
                      <div className="text-red-500">{errors.emailAddress}</div>
                    )}
                  </div>
                </div>

                <hr className="m-4" />
                <div className="flex items-center m-4">
                  <label htmlFor="githubLink" className="mr-4">
                    GitHub Link<span className="text-red-500">*</span>:
                  </label>
                  <div className="">
                    <input
                      type="url"
                      id="githubLink"
                      name="githubLink"
                      value={formData.githubLink}
                      onChange={handleChange}
                      className="w-full p-2 border rounded bg-gray-100"
                      pattern="https?://.+"
                      title="Please enter a valid URL starting with http:// or https://"
                      required
                    />

                    {errors.githubLink && (
                      <div className="text-red-500">{errors.githubLink}</div>
                    )}
                  </div>
                </div>

                <div className="flex items-center m-4">
                  <label htmlFor="linkedinAddress" className="mr-4">
                    LinkedIn Link<span className="text-red-500">*</span>:
                  </label>
                  <div className="">
                    <input
                      type="url"
                      id="linkedinAddress"
                      name="linkedinAddress"
                      value={formData.linkedinAddress}
                      onChange={handleChange}
                      className=" p-2 border rounded bg-gray-100 w-full"
                      pattern="https?://.+"
                      title="Please enter a valid URL starting with http:// or https://"
                      required
                    />

                    {errors.linkedinAddress && (
                      <div className="text-red-500">
                        {errors.linkedinAddress}
                      </div>
                    )}
                  </div>
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
          <div className=" flex flex-col items-center justify-center ">
            <div
              className="w-full h-[30vh]  top-0 opacity-[75%]"
              style={{
                backgroundImage: 'url("application.jpg")',
                backgroundSize: "cover",
              }}
            ></div>

            <div className="p-4 md:p-6 bg-white rounded-md shadow-md w-full md:w-1/2 z-1 ">
              <Link
                to="/internship"
                className="flex flex-start items-center text-blue-200"
              >
                <IoArrowBackOutline className="" />
                <span className="p-2">Back to Job Posting</span>
              </Link>
              <div className="flex justify-center mt-4 md:mt-6 relative items-center px-5">
                <FaRegCheckCircle className="text-primary w-5 h-5" />
                <Divider className="text-separate h-1 w-8 xl:w-32 xl:mx-3" />
                <FaDotCircle className="text-primary w-8 h-8 " />
                <Divider className="text-separate h-1 w-8 xl:w-32 xl:mx-3" />
                <CiCircleChevRight className="text-primary w-7 h-7 " />
                <Divider className="text-separate h-1 w-8 xl:w-32 xl:mx-3" />
                <CiCircleChevRight className="text-primary w-7 h-7 " />
              </div>
              <div className="xl:flex w-full items-center justify-between hidden">
                <span className="w-15 ">Basic Details </span>
                <span className="w-15 ">Educational Details </span>
                <span className="w-15 ">Upload Resume </span>
                <span className="w-15 ">Terms and conditions </span>
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
                    className=" w-full p-2 border rounded bg-gray-100"
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
                    className="w-full p-2 border rounded bg-gray-100"
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
                    className="w-full p-2 border rounded bg-gray-100"
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
                    className="w-full p-2 border rounded bg-gray-100"
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
                    className="w-full p-2 border rounded bg-gray-100"
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
                    className="w-full p-2 border rounded bg-gray-100"
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
                    className="w-full p-2 border rounded bg-gray-100"
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
                    className="w-full p-2 border rounded bg-gray-100"
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
                    className="w-full p-2 border rounded bg-gray-100"
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
          <div className=" flex flex-col items-center justify-center ">
            <div
              className="w-full h-[30vh]  top-0 opacity-[75%]"
              style={{
                backgroundImage: 'url("application.jpg")',
                backgroundSize: "cover",
              }}
            ></div>

            <div className="p-4 md:p-6 bg-white rounded-md shadow-md w-full md:w-1/2 z-1  top-[300px]">
              <Link
                to="/internship"
                className="flex flex-start items-center text-blue-200"
              >
                <IoArrowBackOutline className="" />
                <span className="p-2">Back to Job Posting</span>
              </Link>

              <div className="flex justify-center mt-4 md:mt-6 relative items-center px-5">
                <FaRegCheckCircle className="text-primary w-5 h-5" />

                <Divider className="text-seperate h-1 w-8 xl:w-32 xl:mx-3" />

                <FaRegCheckCircle className="text-primary w-5 h-5" />

                <Divider className="text-seperate h-1 w-8 xl:w-32 xl:mx-3" />

                <FaDotCircle className="text-primary w-8 h-8 " />

                <Divider className="text-seperate h-1 w-8 xl:w-32 xl:mx-3" />

                <CiCircleChevRight className="text-primary w-7 h-7 " />
              </div>
              <div className="xl:flex w-full items-center justify-between hidden">
                <span className="w-15 ">Basic Details </span>
                <span className="w-15 ">Educational Details </span>
                <span className="w-15 ">Upload Resume </span>
                <span className="w-15 ">Terms and conditions </span>
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
          <div className=" flex flex-col items-center justify-center ">
            <div
              className="w-full h-[30vh]  top-0 opacity-[75%]"
              style={{
                backgroundImage: 'url("application.jpg")',
                backgroundSize: "cover",
              }}
            ></div>
            <>
              <div className="p-4 md:p-6 bg-white rounded-md shadow-md w-full md:w-1/2 z-1 ">
                <Link
                  to="/internship"
                  className="flex flex-start items-center text-blue-200"
                >
                  <IoArrowBackOutline className="" />
                  <span className="p-2">Back to Job Posting</span>
                </Link>

                <div className="flex justify-center mt-4 md:mt-6 relative items-center px-5">
                  <FaRegCheckCircle className="text-primary w-5 h-5" />

                  <Divider className="text-seperate h-1 w-8 xl:w-32 xl:mx-3" />

                  <FaRegCheckCircle className="text-primary w-5 h-5" />

                  <Divider className="text-seperate h-1 w-8 xl:w-32 xl:mx-3" />

                  <FaRegCheckCircle className="text-primary w-5 h-5" />

                  <Divider className="text-seperate h-1 w-8 xl:w-32 xl:mx-3" />

                  <FaDotCircle className="text-primary w-8 h-8 " />
                </div>
                <div className="xl:flex w-full items-center justify-between hidden">
                  <span className="w-15 ">Basic Details </span>
                  <span className="w-15 ">Educational Details </span>
                  <span className="w-15 ">Upload Resume </span>
                  <span className="w-15 ">Terms and conditions </span>
                </div>
                <form onSubmit={(e) => handleFinalSubmit(e)}>
                  <div className="font-bold text-xl py-4">
                    Terms and Conditions
                  </div>
                  <div className="txt h-[40vh] overflow-auto rounded border-separate border-3 p-3">
                    User Information:
                    <br />
                    The information you provide during the internship
                    registration will not be shared outside of CodeDynamos. It
                    will only be used for CodeDynamos-related work or marketing
                    purposes. <br />
                    Internship Application: <br />
                    Your application status will be updated before the start of
                    the internship. <br />
                    Confirmation of Intern: <br />
                    You will receive an email from the CodeDynamos Internship
                    program. It is not confirmed until the offer letter is
                    accepted by the intern. <br />
                    Project/Task Allocations: <br />
                    Your project and task assignments will be communicated
                    through your the internship portal. You must complete and
                    submit your projects/tasks only through the internship
                    portal. Failure to submit within the specified time will
                    disqualify you from receiving swags. <br />
                    Submission: <br />
                    You must submit your projects through the internship portal.
                    Maintenance charges may apply during the submission process.{" "}
                    <br />
                    Certificates: <br />
                    Certificates will be issued only after the completion of
                    your internship. You will receive your certificates within
                    2-3 days of internship completion. <br />
                    Letter of Recommendation (LOR): <br />
                    You will receive an LOR only after completing your
                    internship. You will receive your LOR within 2-3 days of
                    internship completion. <br />
                    Eligibility Criteria: <br />
                    i. If you complete at least one project out of four, you are
                    eligible for a soft copy of your internship completion
                    certificate. <br />
                    ii. If you complete at least two projects out of four, you
                    are eligible for a soft copy of an LOR with the certificate.{" "}
                    <br />
                    iii. If you complete two projects and one golden project,
                    you are eligible for swags verification. However,
                    eligibility for swags is subject to meeting specific
                    requirements. <br />
                    Swags Eligibility Criteria: <br />
                    i. The Golden Project must be dynamic and have proper UI and
                    user management. Console-based projects are not considered
                    as Golden Projects. <br />
                    ii. The first two simple projects will not qualify as Golden
                    Projects, so there are no restrictions for them. <br />
                    iii. Data Science interns must provide complete projects
                    with proper UI; Jupiter or Colab files will not be accepted
                    for swags. <br />
                    iv. Having completed two simple projects and one Golden
                    Project does not automatically make you eligible for swags.
                    You must meet the project requirements. <br />
                    v. Swags will include a hardcopy of your certificate, Letter
                    of Recommendation (LOR), and some goodies delivered to your
                    doorstep. <br />
                    vi. Swags are currently only available for locations within
                    India. <br />
                    vii. For Golden Projects, a LinkedIn video of your project
                    output is mandatory. Without the video, swags will not be
                    awarded. <br />
                    viii. The forms provided for swags delivery must be filled
                    within the given duration. Failure to do so will result in
                    ineligibility for swags, and no exceptions will be made.{" "}
                    <br />
                    LinkedIn Posts: <br />
                    You must make a LinkedIn post of your golden project output
                    video. Posting offer letters and others is optional, but
                    posting a swags post on LinkedIn is mandatory after
                    receiving swags. <br />
                    Project Verification: <br />
                    For project verification, please attach a proper fee payment
                    proof. Failure to provide this proof will result in the
                    rejection of your project verification. If our team finds
                    common or forged proofs, the user will be permanently banned
                    from CodeDynamos Internship. <br />
                    Project Authenticity: <br />
                    Your project must be your original work. If your golden
                    project is found to be copied, you are not eligible for
                    swags. <br />
                    Termination: <br />
                    Legal action will be taken against individuals who make
                    false claims or engage in inappropriate behavior towards
                    CodeDynamos and its executives. <br />
                    Support: <br />
                    All queries will be addressed via WhatsApp communication. No
                    phone support is available. Please allow up to two days for
                    our executives to respond. <br />
                    Stipend: <br />
                    This is an educational internship, and no stipend will be
                    provided. <br />
                    Future Opportunities: <br />
                    Participating in the internship does not guarantee job
                    offers from CodeDynamos. <br />
                    Future Opportunities: <br />
                    Participating in the internship does not guarantee job
                    offers from CodeDynamos. <br />
                  </div>
                  <div className="flex items-center mt-4">
                    <input
                      type="checkbox"
                      checked={isChecked}
                      onChange={handleToggle}
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

      {form === "loading" && (
        <>
          <Navbar />
          <div className="flex flex-col items-center justify-center h-screen">
            <Spinner label="Loading..." color="primary" />
          </div>
          <Footer />
        </>
      )}

      {form === "submit" && (
        <>
          <Navbar />
          <div className="flex flex-col items-center justify-center h-screen">
            <div className="p-4">
              <motion.svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                className="w-16 h-16 text-yellow-400 mb-4 rounded-lg"
                animate={{
                  rotate: 360,
                  scale: [0.8, 1.2, 1], // Scale animation with a bounce effect
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut", // Ease in-out effect
                }}
              >
                <motion.polygon
                  points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"
                  fill="currentColor"
                />
              </motion.svg>
            </div>
            <h1 className="text-3xl font-bold mb-4 text-center">
              Application Submitted
            </h1>
            <p className="text-lg text-gray-700 mb-8 w-[80%] text-center">
              Thank you for submitting your application for the internship
              position. We appreciate your interest in joining our team. Our
              hiring team will review your application carefully. If you are
              selected you will be contacted via email within the next few days.
            </p>
          </div>
          <Footer />
        </>
      )}
    </div>
  );
};

export default ApplicationForm;

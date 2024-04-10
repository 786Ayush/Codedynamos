import React, { useState } from "react";
import { Link } from "react-router-dom";
import { IoArrowBackOutline } from "react-icons/io5";

import Navbar from "../Navbar";
import Footer from "../Foot";
import { FaDotCircle } from "react-icons/fa";
import { CiCircleChevRight } from "react-icons/ci";
import { FaRegCheckCircle } from "react-icons/fa";
import { Divider } from "@nextui-org/react";
import { insertDetails } from "./Application";
import { supabase } from "../../utils/Supabase";

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
    if (!/^\d{10}$/.test(formData.phoneNumber)) {
      setErrors({
        ...errors,
        phoneNumber:
          "Please enter a valid phone number in the format XXXXXXXXXX",
      });
      return;
    }

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
        "https://lawxcdsxvkevyfiudefn.supabase.co/storage/v1/object/public/" +
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

    const { data, error } = await supabase.from("basic_details").insert([
      {
        first_name: formData.firstName,
        middle_name: formData.middleName,
        last_name: formData.lastName,
        country: formData.country,
        how_you_heard: formData.howYouHeard,
        phone: formData.phoneNumber,
        alternate_phone: formData.alternateNumber,
        email: formData.emailAddress,
        github: formData.githubLink,
        linkedin: formData.linkedinAddress,
        sector: value,
        resume_link: resumeUrl,
      },
    ]);

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

    console.log("Inserted educational details:", insertedEducationDetails);
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
                  <div className="">
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
                  <div className="">
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
                      className="m-4 p-2 border rounded bg-gray-100"
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
                      className="m-4 p-2 border rounded bg-gray-100"
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
                <Divider className="text-separate h-1 w-32 mx-3" />
                <FaDotCircle className="text-primary w-8 h-8 " />
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

                  <Divider className="text-seperate h-1 w-32 mx-3" />

                  <FaRegCheckCircle className="text-primary w-5 h-5" />

                  <Divider className="text-seperate h-1 w-32 mx-3" />

                  <FaRegCheckCircle className="text-primary w-5 h-5" />

                  <Divider className="text-seperate h-1 w-32 mx-3" />

                  <FaDotCircle className="text-primary w-8 h-8 " />
                </div>
                <div className="flex w-full items-center justify-between">
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
    </div>
  );
};

export default ApplicationForm;

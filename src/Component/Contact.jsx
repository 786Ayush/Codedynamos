import React, { useState } from "react";
import Footer from "./Foot";
import Navbar from "./Navbar";
import { supabase } from "../utils/Supabase";
import { FaInstagram, FaLinkedin, FaTwitter } from "react-icons/fa";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    question: "",
  });
  const [submit, setsubmit] = useState(false);
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };
  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      // console.log(supabase);
      // Insert the form data into the 'contacts' table
      const { data, error } = await supabase.from("feedback").insert([
        {
          name: formData.name,
          email: formData.email,
          phone: formData.phoneNumber,
          question: formData.question,
        },
      ]);

      if (error) {
        throw error;
      } else {
        setsubmit(true);
      }
      console.log("Form data inserted successfully:", data);
    } catch (error) {
      console.error("Error inserting form data:", error.message);
    }
  };

  return (
    <>
      <div className="">
        <Navbar />
        <div className="font-sans">
          {/* Header */}
          <header className="sm:h-[300px] ">
            <img
              src="/contact-us-com.jpg"
              alt="Contact Us Header"
              className="w-full h-full object-cover filter brightness-75"
            />
            {/* <div className="absolute inset-0 bg-black opacity-40"></div> */}
          </header>

          {/* Main Content */}
          <div className="flex flex-col-reverse  md:flex-row justify-center items-start sm:p-8 pb-5 bg-[#E5E7EB] text-white">
            {/* Contact Information */}
            <section className="sm:w-1/2 flex flex-col p-4 w-screen">
              <h2 className="text-2xl font-semibold mb-8 text-gray-800">
                Contact Information
              </h2>
              <div className="flex flex-col ">
                <div className="mb-2 text-gray-700 flex justify-around">
                  <div className="font-semibold w-[100px]">Email:</div>
                  <div className="w-[200px]">dynamoscode@gmail.com</div>
                </div>
                <div className="mb-2 text-gray-700 flex justify-around">
                  <div className="font-semibold w-[100px]">Query Email:</div>
                  <div className="w-[200px]">query.dynamoscode@gmail.com</div>
                </div>
                <div className="mb-2 text-gray-700 flex justify-around">
                  <div className="font-semibold w-[100px]">Instagram:</div>
                  <a
                    href="https://www.instagram.com/codedynamos/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-[200px] flex items-center text-[#E1306C] hover:text-[#b81d5d] transition-colors duration-300"
                  >
                    <FaInstagram className="mr-2" /> CodeDynamos
                  </a>
                </div>
                <div className="mb-2 text-gray-700 flex justify-around">
                  <div className="font-semibold w-[100px]">X:</div>
                  <a
                    href="https://x.com/CodeDynamos"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-[200px] flex items-center text-[#1DA1F2] hover:text-[#0d95e8] transition-colors duration-300"
                  >
                    <FaTwitter className="mr-2" /> CodeDynamos
                  </a>
                </div>
                <div className="mb-2 text-gray-700 flex justify-around">
                  <div className="font-semibold w-[100px]">Linked In:</div>
                  <a
                    href="https://www.linkedin.com/company/codedynamos/about/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-[200px] flex items-center text-[#0A66C2] hover:text-[#004182] transition-colors duration-300"
                  >
                    <FaLinkedin className="mr-2" /> CodeDynamos
                  </a>
                </div>
              </div>
            </section>
            <div className="border-l border-gray-500 h-full "></div>

            {/* Contact Form */}
            <section className="sm:w-1/2 h-full flex flex-col p-6 py-0 w-screen border-l-2 border-gray-500">
              <h2 className="text-2xl font-semibold  text-gray-800 mb-4">
                Contact Form
              </h2>
              <form onSubmit={handleSubmit} className="space-y-4 text-black">
                <div className="flex flex-col text-black">
                  <label htmlFor="name" className="block text-sm font-medium">
                    Name:
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    placeholder="John Doe"
                    className="mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-500"
                  />
                </div>
                <div className="flex flex-col">
                  <label htmlFor="email" className="block text-sm font-medium">
                    Email Address:
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="xyz@gmail.com"
                    className="mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-500"
                  />
                </div>
                <div className="flex flex-col">
                  <label
                    htmlFor="phoneNumber"
                    className="block text-sm font-medium"
                  >
                    Phone Number:
                  </label>
                  <input
                    type="tel"
                    id="phoneNumber"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleChange}
                    required
                    placeholder="+9100 0000 0000"
                    className="mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-500"
                  />
                </div>
                <div className="flex flex-col">
                  <label
                    htmlFor="question"
                    className="block text-sm font-medium"
                  >
                    Question:
                  </label>
                  <textarea
                    id="question"
                    name="question"
                    value={formData.question}
                    onChange={handleChange}
                    required
                    placeholder="Type your question here..."
                    className="mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-500"
                    rows={3}
                  />
                </div>
                <div className="mt-4 flex justify-center">
                  <button
                    type="submit"
                    disabled={submit ? true : false}
                    className="bg-blue-500 text-white p-3 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-500"
                  >
                    {submit ? "Submitted" : "Submit"}
                  </button>
                </div>
              </form>
            </section>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
};

export default Contact;

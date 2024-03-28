import React from "react";
import { Link } from "react-router-dom";
import {
  FaInstagram,
  FaLinkedin,
  FaWhatsapp,
  FaFacebook,
} from "react-icons/fa";

const Footer = () => {
  const arrowIcon = "→"; // Unicode character for right arrow

  return (
    <footer className="bg-[var(--nav-color)] text-white">
      {" "}
      {/* bg-gray-800*/}
      <div className="container mx-auto flex flex-col justify-between  lg:flex-row mb-5">
        {/* Big Logo Photo */}
        <div className=" w-full lg:w-1/4 ">
          <div className="flex items-center px-10 justify-center ">
            <img
              src="/reallogo.png"
              alt="Company Logo"
              className="w-full h-full "
            />
          </div>
          <div className=" px-10 text-center">
            <h1 className="text-lg lg:text-xl lg:text-2xl font-bold">
              CodeDynamos Internship
            </h1>

            <h4 ><span className="sm:block lg:inline">Gmail:</span> dynamoscode@gmail.com</h4>
          </div>
        </div>

        {/* Useful Links Section */}
        <div className="w-full lg:w-1/4 mb-4 lg:mb-0 lg: mt-16 flex flex-col items-center">
          <h3 className="text-xl lg:text-2xl lg:text-3xl font-bold mb-4 text-gray-400 text-center">
            Useful Links
          </h3>
          <ul className="text-sm lg:text-base lg:text-lg  px-5 flex flex-col items-start">
            <li>
              <Link to="/" className="hover:text-gray-300 text-white">
                {arrowIcon} Home
              </Link>
            </li>
            <li>
              <Link to="/about" className="hover:text-gray-300 text-white">
                {arrowIcon} About Us
              </Link>
            </li>
            <li>
              <Link
                to="/internship-domains"
                className="hover:text-gray-300 text-white"
              >
                {arrowIcon} Internship Domains
              </Link>
            </li>
            <li>
              <Link to="/roadmaps" className="hover:text-gray-300 text-white">
                {arrowIcon} Roadmaps
              </Link>
            </li>
            <li>
              <Link to="/contact" className="hover:text-gray-300 text-white">
                {arrowIcon} Contact
              </Link>
            </li>
          </ul>
        </div>

        {/* Internship Domains Section */}
        <div className="w-full lg:w-1/4 mb-4 lg:mb-0 lg: mt-16 flex flex-col items-center">
          <h3 className="text-xl lg:text-2xl lg:text-3xl font-bold mb-4 text-gray-400 text-center">
            Internship Domains
          </h3>
          <ul className="text-sm lg:text-base lg:text-lg px-5 flex flex-col items-start">
            <li>
              <Link
                to="/web-development"
                className="hover:text-gray-300 text-white"
              >
                {arrowIcon} Web Development
              </Link>
            </li>
            <li>
              <Link
                to="/graphic-design"
                className="hover:text-gray-300 text-white"
              >
                {arrowIcon} Graphic Design
              </Link>
            </li>
            <li>
              <Link
                to="/data-science"
                className="hover:text-gray-300 text-white"
              >
                {arrowIcon} Data Science
              </Link>
            </li>
            <li>
              <Link
                to="/artificial-intelligence"
                className="hover:text-gray-300 text-white"
              >
                {arrowIcon} Artificial Intelligence
              </Link>
            </li>
            <li>
              <Link
                to="/python-development"
                className="hover:text-gray-300 text-white"
              >
                {arrowIcon} Python Development
              </Link>
            </li>
            <li>
              <Link
                to="/android-development"
                className="hover:text-gray-300 text-white"
              >
                {arrowIcon} Android Development
              </Link>
            </li>
            <li>
              <Link
                to="/java-development"
                className="hover:text-gray-300 text-white"
              >
                {arrowIcon} Java Development
              </Link>
            </li>
            <li>
              <Link
                to="/content-writer"
                className="hover:text-gray-300 text-white"
              >
                {arrowIcon} Content Writer
              </Link>
            </li>
          </ul>
        </div>

        {/* Inbox Section */}
        <div className="w-full lg:w-1/4 lg: mt-16">
          <h3 className="text-xl lg:text-2xl lg:text-3xl font-bold mb-4 text-gray-400 text-center">
            Join Our Internship
          </h3>
          <p className="text-sm lg:text-base lg:text-lg  px-5 text-center">
            Join the Virtual Internship Program in cutting-edge technologies
            with CodeDynamos.
          </p>
        </div>
      </div>
      <div className="bg-[var(--nav-color)] flex flex-col lg:flex-row p-3 text-sm justify-around">
        <div className="text-white  lg:mb-0 text-center lg:text-left">
          <p>&copy; Copyright AnotherCompany Internship. All Rights Reserved</p>
          <p>
            Designed by <span className="text-blue-400">CodeDynamos </span>
          </p>
        </div>
        <div className="flex justify-center lg:justify-end  items-center">
          {/* Instagram Button */}
          <a
            href="https://www.instagram.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white p-3 rounded-full"
          >
            <FaInstagram className="w-6 h-6 lg:w-8 lg:h-8 hover:text-gray-300" />
          </a>

          {/* LinkedIn Button */}
          <a
            href="https://www.linkedin.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white p-3 rounded-full"
          >
            <FaLinkedin className="w-6 h-6 lg:w-8 lg:h-8 hover:text-gray-300" />
          </a>

          {/* WhatsApp Button */}
          <a
            href="https://wa.me/1234567890"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white p-3 rounded-full"
          >
            <FaWhatsapp className="w-6 h-6 lg:w-8 lg:h-8 hover:text-gray-300" />
          </a>

          {/* Facebook Button */}
          <a
            href="https://www.facebook.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white p-3 rounded-full"
          >
            <FaFacebook className="w-6 h-6 lg:w-8 lg:h-8 hover:text-gray-300" />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

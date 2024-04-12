import React from "react";
import Navbar from "../Navbar";
import Footer from "../Foot";
import { Link } from "@nextui-org/react";
import { RiSendPlaneFill } from "react-icons/ri";
import { MdOutlineAvTimer } from "react-icons/md";

const Internships = () => {
  const InternshipDomains = [
    { index: 1, value: "Artificial Intelligence Intern" },
    { index: 2, value: "Data Science Intern" },
    { index: 3, value: "Web Development Intern" },
    { index: 4, value: "Java Development Intern" },
    { index: 5, value: "Android Development Intern" },
    { index: 6, value: "Python Development Intern" },
    { index: 7, value: "Graphics Design Intern" },
    { index: 8, value: "Content Writer Intern" },
  ];

  const generateRandomColor = () => {
    // Generate a random color for the background
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  return (
    <>
      <Navbar />
      <div className="flex items-center justify-between flex-col bg-gray-200">
        <div className="text-center my-8 sm:text-4xl text-xl font-bold max-w-screen-xl mx-auto p-2">
          Unleash Your Potential, Seize the Opportunity, and Embark on Your
          Internship Adventure with Us!
        </div>
        <div className="flex flex-col w-screen items-center">
          {InternshipDomains.map((domain, index) => {
            const words = domain.value.split(" ");
            const abbreviation = words
              .slice(0, -1)
              .map((word) => word[0])
              .join("")
              .toUpperCase();
            const backgroundColor = generateRandomColor();

            return (
              <Link
                key={index}
                href={`/applicationform?value=${domain.value}`}
                className={`bg-[#FFFFFF] w-screen p-5 rounded-lg shadow-xl my-5 flex flex-col sm:flex-row justify-between items-center  font-semibold text-zinc-800 ${
                  index === InternshipDomains.length - 1 ? "mb-6" : ""
                }`}
                style={{
                  width: "100%",
                  maxWidth: "80%", // Set a maximum width to prevent overflow
                  transition: `transform 0.1s ease-in-out ${index * 0.1}s`,
                  transformOrigin: "center",
                  cursor: "pointer",
                  textDecoration: 'none', // Ensure default link style is removed
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.transform = "scale(1.03)";
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.transform = "scale(1)";
                }}
              >
                <div className="flex items-center">
                  <div
                    className="sm:w-12  sm:h-12 w-9 h-7  rounded-full text-white flex items-center justify-center text-base sm:font-bold shadow-inner"
                    style={{ backgroundColor }}
                  >
                    {abbreviation}
                  </div>
                  <h1 className="sm:text-xl text-base font-semibold ml-4 sm:w-56 w-full">
                    {domain.value}
                  </h1>
                </div>
                <h2 className="sm:text-base text-sm font-semibold flex items-center justify-between">
                  <MdOutlineAvTimer /> Internship
                </h2>
                <h3 className="sm:text-base text-sm font-semibold flex items-center justify-between">
                  <RiSendPlaneFill /> Remote Employment
                </h3>
              </Link>
            );
          })}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Internships;

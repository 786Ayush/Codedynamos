import React, { useState } from "react";
import Navbar from "./Navbar";
import Footer from "./Foot";
import Testimonials from "./Testimonials";
import { Helmet } from "react-helmet";

const About = () => {
  const [activeButton, setActiveButton] = useState("Our-Organization");
  const [text, setText] = useState(
    "At TechMinds Academy, our vision is to revolutionize tech education and stand as a beacon for cultivating the leaders of tomorrow from today’s    emerging talents. We are dedicated to building a worldwide community of    proficient professionals equipped to confront the future's challenges,    steer innovation, and champion with unwavering integrity. Our dream is    to foster a global environment where perpetual learning, hands-on    experience, and collaborative discovery serve as the fundamental pillars    for every aspiring tech professional’s transformative journey."
  );
  const [imageUrl, setimage] = useState("/bg-home.jpg");
  const handleButtonClick = (buttonText) => {
    if (buttonText === "Our-Organization")
      setText(
        "At CodeDynamos, our vision is to revolutionize tech education and stand as a beacon for cultivating the leaders of tomorrow from today’s    emerging talents. We are dedicated to building a worldwide community of    proficient professionals equipped to confront the future's challenges,    steer innovation, and champion with unwavering integrity. Our dream is    to foster a global environment where perpetual learning, hands-on    experience, and collaborative discovery serve as the fundamental pillars    for every aspiring tech professional’s transformative journey."
      );
    else if (buttonText === "Our Key Features")
      setText(
        "As you embark on your journey to learn about us, we invite you into the vibrant tapestry that is CodeDynamos. Our story is one of passion, dedication, and innovation. Discover the essence of who we are, our history, and the values that weave through every facet of our organization. Uncover the unique blend of expertise and creativity that propels us forward. Dive into the collective spirit that defines our team, our accomplishments, and our commitment to excellence. Learning about us is an exploration into the heart of CodeDynamos, where every page unfolds a narrative of growth, collaboration, and a relentless pursuit of success."
      );
    else if (buttonText === "Core Values")
      setText(
        "At CodeDynamos, our core values serve as the guiding principles that define our identity and shape our actions. Integrity is at the heart of everything we do, fostering trust and transparency in all our interactions. We are committed to excellence, continuously striving to deliver the highest quality in our products and services. Collaboration is ingrained in our culture, promoting teamwork and shared success. Innovation fuels our forward momentum, encouraging a spirit of creativity and adaptability. Above all, we embrace a customer-centric approach, prioritizing the needs and satisfaction of those we serve. These core values form the foundation of CodeDynamos, driving our mission to inspire, innovate, and make a positive impact on the world."
      );
    setActiveButton(buttonText);
  };

  return (
    <>
    <Helmet>
        <title>About Us - CodeDynamos</title>
        <meta name="description" content="Learn more about CodeDynamos, our mission, and how we help freshers kickstart their careers." />
        <meta name="keywords" content="about codedynamos, IT consulting, internships for freshers, mission" />
        <meta property="og:title" content="About Us - CodeDynamos" />
        <meta property="og:description" content="Learn more about CodeDynamos, our mission, and how we help freshers kickstart their careers." />
        <meta property="og:image" content="/about-us.png" />
        <meta property="og:url" content="https://www.codedynamos.com/about" />
        <meta property="og:type" content="website" />
      </Helmet>
      <Navbar />
      <div className="min-h-screen bg-gray-200">
        <div className="flex justify-center py-8 ">
          <div className="space-x-4 flex  flex-row m-2 text-xs">
            <button
              className={`sm:p-4 p-2 rounded focus:outline-none  ${
                activeButton === "Our-Organization"
                  ? "bg-[var(--button)] text-white"
                  : "bg-white text-black"
              }`}
              onClick={() => handleButtonClick("Our-Organization")}
            >
              Our Organization
            </button>
            <button
              className={`sm:p-4 p-2 rounded focus:outline-none ${
                activeButton === "Our Key Features"
                  ? "bg-[var(--button)] text-white"
                  : "bg-white text-black"
              }`}
              onClick={() => handleButtonClick("Our Key Features")}
            >
              Our Key Features
            </button>
            <button
              className={`sm:p-4 p-2 rounded focus:outline-none ${
                activeButton === "Core Values"
                  ? "bg-[var(--button)] text-white"
                  : "bg-white text-black"
              }`}
              onClick={() => handleButtonClick("Core Values")}
            >
              Core Values
            </button>
          </div>
        </div>
        <div className="  flex items-center justify-center  flex-col-reverse sm:flex-row">
          <div className="sm:w-1/2  p-2 sm:p-8">
            <h1 className="text-base sm:text-3xl font-bold mb-4">{activeButton}</h1>
            <p className="text-sm sm:text-lg text-gray-800">{text}</p>
          </div>
          <div className="sm:w-1/2  p-0 sm:p-8 ">
            <img
              src={imageUrl}
              alt="Image"
              className="w-full h-auto rounded-md shadow-md sm:p-0 p-4 m-1"
            />
          </div>
        </div>
      </div>
      {/* <Testimonials /> */}
      <Footer />
    </>
  );
};

export default About;

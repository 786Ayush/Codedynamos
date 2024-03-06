import React from "react";
import Navbar from "./Navbar";
import Footer from "./Foot";
import Testimonials from "./Testimonials";

const Home = () => {
  return (
    <>
      <Navbar />
      <div
        className="flex h-screen bg-cover"
        style={{ backgroundImage: "url('/bg-home.jpg')" }}
      >
        <div className="flex flex-col justify-center text-white p-8 bg-black bg-opacity-50 w-full text-left h-screen">
          <div className="w-1/2 ">
            <h1 className="sm:text-3xl text-xl font-bold mb-4">
              We enable individuals to discover their optimal career trajectory.
            </h1>
            <p className="mb-4">
              Participate in the Virtual Internship Program focused on
              cutting-edge technologies offered by CodeDynamos.
            </p>
            <a
              href="#"
              className="inline-block px-6 py-3 text-white rounded bg-[var(--button)] transition duration-300 hover:bg-blue-500 hover:text-white"
              // style={{
              //   backgroundColor: "#3490dc", // Default button color
              // }}
            >
              Apply now
            </a>
          </div>
          <div className="w-1/2"></div>
        </div>
      </div>

      {/* <div className="mt-5 h-screen">
        {" "}
        <Testimonials />
      </div> */}
      <Footer />
    </>
  );
};

export default Home;

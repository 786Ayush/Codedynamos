import React, { useState } from "react";

import { FaCaretLeft } from "react-icons/fa";
import { FaCaretRight } from "react-icons/fa";

const Testimonials = () => {
  const [currentPage, setCurrentPage] = useState(0); // Changed initial page to 0
  const testimonialsPerPage = 3;

  const testimonials = [
    {
      name: "Sarah M.",
      field: "Web Development Intern",
      message:
        "This internship has been an invaluable experience for me as a web development enthusiast. The hands-on projects and mentorship provided have greatly enhanced my skills and confidence in building responsive and user-friendly websites. I'm grateful for this opportunity!",
    },
    {
      name: "Michael H.",
      field: "App Development Intern",
      message:
        "Being an app development intern here has exceeded my expectations. The exposure to real-world app development projects and the guidance from experienced professionals have significantly sharpened my skills. I feel well-prepared to embark on a career in mobile app development!",
    },
    {
      name: "Jessica R.",
      field: "Data Science Intern",
      message:
        "As a data science intern, I've had the chance to work on cutting-edge projects that have deepened my understanding of data analysis and machine learning algorithms. The supportive environment here has allowed me to thrive and expand my knowledge in this exciting field!",
    },
    {
      name: "Daniel W.",
      field: "Java Development Intern",
      message:
        "My internship experience in Java development has been fantastic. I've had the opportunity to work on challenging projects and collaborate with talented developers. The skills I've gained here are invaluable and will undoubtedly propel my career in software development!",
    },
    {
      name: "Sophie L.",
      field: "AI Intern",
      message:
        "This AI internship has been an enriching journey for me. I've had the chance to delve into advanced AI concepts and apply them to real-world problems. The guidance from experts in the field has been instrumental in my growth as an AI enthusiast!",
    },
    {
      name: "Alex P.",
      field: "Python Development Intern",
      message:
        "As a Python development intern, I've had access to meaningful projects that have honed my programming skills. The supportive team environment and mentorship have fostered my professional growth and prepared me for a successful career in software engineering!",
    },
    {
      name: "Natalie S.",
      field: "Graphic Design Intern",
      message:
        "My internship in graphic design has been incredibly rewarding. I've had the opportunity to unleash my creativity and work on diverse projects that have enriched my portfolio. The feedback and guidance from experienced designers have been invaluable in refining my skills!",
    },
    {
      name: "Ryan T.",
      field: "Content Writing Intern",
      message:
        "This content writing internship has been a fantastic learning experience. I've had the chance to sharpen my writing skills across various formats and topics. The constructive feedback and mentorship provided have been instrumental in my growth as a content creator!",
    },
  ];

  const totalTestimonials = testimonials.length;

  const goToPreviousPage = () => {
    setCurrentPage((prevPage) =>
      prevPage === totalTestimonials - 1 ? 0 : prevPage + 1
    );
  };

  const goToNextPage = () => {
    setCurrentPage((prevPage) =>
      prevPage === 0 ? totalTestimonials - 1 : prevPage - 1
    );
  };

  return (
    // Inside the return statement of TestimonialsCards component
    <>
      <div className=" flex flex-col justify-evenly bg-gradient-to-b from-zinc-500 to-zinc-300">
        <div className="text-4xl text-center p-7">What people say</div>
        <div className="flex flex-col gap-5 px-6">
          <div className="md:grid grid-cols-1 md:grid-cols-3 gap-6 hidden ">
            {/* Render testimonials based on the current page */}
            {Array.from({ length: testimonialsPerPage }, (_, index) => {
              console.log("index", index);
              const testimonialIndex =
                (currentPage + testimonialsPerPage + index) % totalTestimonials;
              console.log("testimonialIndex", testimonialIndex);
              const testimonial = testimonials[testimonialIndex];
              // Check if the testimonial index is within the range of total testimonials
              if (testimonialIndex < totalTestimonials) {
                return (
                  <div
                    key={testimonialIndex}
                    className="flex flex-col border border-gray-300 rounded-lg p-4 shadow-lg"
                  >
                    <div className="w-full">
                      <img
                        src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
                        className="w-10 h-10 rounded-full"
                      />
                    </div>
                    <div className="text-start">
                      <div className="text-xl font-semibold">
                        {testimonial.name}
                      </div>
                      <div className="text-sm text-gray-500">
                        {testimonial.field}
                      </div>
                      <div className="text-base text-gray-700 mt-2">
                        {testimonial.message}
                      </div>
                    </div>
                  </div>
                );
              } else {
                return null; // If testimonial index exceeds total testimonials, render nothing
              }
            })}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3  md:hidden ">
            {/* Render testimonials based on the current page */}
            {Array.from({ length: 1 }, (_, index) => {
              console.log("index", index);
              const testimonialIndex =
                (currentPage + testimonialsPerPage + index) % totalTestimonials;
              console.log("testimonialIndex", testimonialIndex);
              const testimonial = testimonials[testimonialIndex];
              // Check if the testimonial index is within the range of total testimonials
              if (testimonialIndex < totalTestimonials) {
                return (
                  <div
                    key={testimonialIndex}
                    className="flex flex-col border border-gray-300 rounded-lg p-4 shadow-lg"
                  >
                    {/* <div className="w-full"> */}
                    <img
                      src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
                      className="w-10 h-10 rounded-full"
                    />
                    {/* </div> */}
                    <div className="text-start">
                      <div className="text-xl font-semibold">
                        {testimonial.name}
                      </div>
                      <div className="text-sm text-gray-500">
                        {testimonial.occupation}
                      </div>
                      <div className="text-base text-gray-700 mt-2">
                        {testimonial.message}
                      </div>
                    </div>
                  </div>
                );
              } else {
                return null; // If testimonial index exceeds total testimonials, render nothing
              }
            })}
          </div>
          <div className="flex justify-center gap-2 mt-4">
            <div
              size="sm"
              variant="flat"
              color="secondary"
              onClick={goToPreviousPage}
            >
              <FaCaretLeft className="text-2xl  text-primary" />
            </div>
            <div
              size="sm"
              variant="flat"
              color="secondary"
              onClick={goToNextPage}
            >
              <FaCaretRight className="text-2xl  text-primary" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Testimonials;

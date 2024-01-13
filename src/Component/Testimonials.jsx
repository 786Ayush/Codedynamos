import React from "react";

const Testimonial = ({ image, name, content }) => (
  <div className="max-w-xs mx-auto bg-[#1E2128] shadow-lg rounded-lg overflow-hidden m-4 p-5">
    <div className="flex items-center justify-center h-32 w-32 mx-auto mt-4  overflow-hidden">
      <img className="w-full h-full object-cover " src={image} alt={name} />
    </div>
    <div className="p-4 text-white text-center">
      <h2 className="text-2xl font-bold mt-2 p-3">{name}</h2>
      <p className="text-base">{content}</p>
    </div>
  </div>
);

const Testimonials = () => {
  const testimonials = [
    {
      image: "/img1.webp",
      name: "John Doe",
      content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    },
    {
      image: "/img1.webp",
      name: "Jane Smith",
      content: "Vestibulum vitae velit ac felis rhoncus luctus.",
    },
    {
      image: "/img1.webp",
      name: "Jane Smith",
      content: "Vestibulum vitae velit ac felis rhoncus luctus.",
    },
    // Add more testimonials as needed
  ];
  return (
    <div className="text-center flex flex-col h-screen bg-gray-200 justify-evenly"> {/*  bg-[#353839] */}
      <h1 className="text-4xl font-bold mb-4 ">Testimonials</h1>  {/* text-[#CFD2DA] */}
      <div className="flex flex-wrap justify-center">
        {testimonials.map((testimonial, index) => (
          <Testimonial key={index} {...testimonial} />
        ))}
      </div>
    </div>
  );
};

export default Testimonials;

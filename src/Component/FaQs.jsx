import React from "react";
import { Accordion, AccordionItem } from "@nextui-org/react";
import { FaMinus, FaPlus } from "react-icons/fa";

export default function FaQ() {
  const itemClasses = {
    base: "py-0 w-full",
    title: "font-normal text-medium flex justify-between items-center", // Added flexbox styling
    trigger:
      "px-2 py-0 data-[hover=true]:bg-default-100 rounded-lg h-14 flex items-center justify-between border-0",
    indicator: "text-medium",
    content: "text-small px-2",
  };

  return (
    <div className="h-screen flex flex-col justify-center items-center bg-gradient-to-b from-zinc-300 to-zinc-50">
      <div className="text-3xl font-bold mb-8 p-8">FAQ's</div>
      <div className="w-full md:w-[70%] py-4">
        <Accordion
          variant="shadow"
          color="black"
          
          itemClasses={itemClasses}
          defaultExpandedKeys={["theme"]}
        >
          <AccordionItem
            key="1"
            aria-label="What opportunities does the internship provide?"
            title="What opportunities does the internship provide?"
            bg="white"
            indicator={({ isOpen }) => (isOpen ? <FaMinus /> : <FaPlus />)}
          >
            The internship provides hands-on experience in [specific field],
            exposure to real-world projects, mentorship from industry
            professionals, and networking opportunities.
          </AccordionItem>
          <AccordionItem
            key="2"
            aria-label="How long does the internship last?"
            title="How long does the internship last?"
            bg="white"
            borderBottomRadius="md"
            borderBottom="1px solid #ddd"
            indicator={({ isOpen }) => (isOpen ? <FaMinus /> : <FaPlus />)}
          >
            The duration of the internship varies depending on the program.
            Typically, internships last for [duration].
          </AccordionItem>
          <AccordionItem
            key="3"
            aria-label="What skills are required to apply for the internship?"
            title="What skills are required to apply for the internship?"
            bg="white"
            borderBottomRadius="md"
            borderBottom="1px solid #ddd"
            indicator={({ isOpen }) => (isOpen ? <FaMinus /> : <FaPlus />)}
          >
            The required skills vary depending on the internship position.
            However, proficiency in [specific skills] is usually preferred.
          </AccordionItem>
          <AccordionItem
            key="4"
            aria-label="How can I apply for the internship?"
            title="How can I apply for the internship?"
            bg="white"
            borderBottomRadius="md"
            borderBottom="1px solid #ddd"
            indicator={({ isOpen }) => (isOpen ? <FaMinus /> : <FaPlus />)}
          >
            To apply for the internship, please visit our website and fill out
            the application form. Make sure to submit all required documents and
            showcase your relevant experience.
          </AccordionItem>
          <AccordionItem
            key="5"
            aria-label="What are the benefits of completing this internship?"
            title="What are the benefits of completing this internship?"
            bg="white"
            borderBottomRadius="md"
            position="end"
            indicator={({ isOpen }) => (isOpen ? <FaMinus /> : <FaPlus />)}
          >
            Completing this internship will provide you with valuable industry
            experience, enhance your skills, expand your professional network,
            and increase your employability in your chosen field.
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  );
}

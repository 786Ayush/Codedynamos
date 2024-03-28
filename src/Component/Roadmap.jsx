import React from "react";
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";
import Navbar from "./Navbar";
import Footer from "./Foot";
import { AiFillFileText } from "react-icons/ai";
import { FaLaptopCode } from "react-icons/fa";
import { MdOutlineLogin } from "react-icons/md";
import { MdCallReceived } from "react-icons/md";
import { BiTask } from "react-icons/bi";
import { CiGift } from "react-icons/ci";

const Roadmap = () => {
  return (
    <>
      <Navbar />
      <VerticalTimeline>
        <VerticalTimelineElement
          className="vertical-timeline-element--work"
          contentStyle={{ background: "#03A9F4", color: "#fff" }}
          contentArrowStyle={{ borderRight: "7px solid  #03A9F4" }}
          iconStyle={{ background: "#03A9F4", color: "#fff" }}
          icon={<AiFillFileText />}
        >
          <h3 className="vertical-timeline-element-title">Craft Your Resume</h3>
          <p>
            Prepare a polished resume tailored to showcase your skills and
            experiences relevant to the internship.
          </p>
        </VerticalTimelineElement>

        <VerticalTimelineElement
          className="vertical-timeline-element--work"
          contentStyle={{ background: "#FF5722", color: "#fff" }}
          contentArrowStyle={{ borderRight: "7px solid  #FF5722" }}
          iconStyle={{ background: "#FF5722", color: "#fff" }}
          icon={<FaLaptopCode />}
        >
          <h3 className="vertical-timeline-element-title">
            Submit Your Application
          </h3>
          <p>Submit your application for the desired internship position.</p>
        </VerticalTimelineElement>

        <VerticalTimelineElement
          className="vertical-timeline-element--work"
          contentStyle={{ background: "#FFEB3B", color: "#fff" }}
          contentArrowStyle={{ borderRight: "7px solid  #FFEB3B" }}
          iconStyle={{ background: "#FFEB3B", color: "#000" }}
          icon={<MdOutlineLogin className="text-white" />}
        >
          <h3 className="vertical-timeline-element-title text-white">
            Obtain Login Credentials
          </h3>
          <p className="text-white">
            If required, acquire login credentials to access the internship
            platform.
          </p>
        </VerticalTimelineElement>

        <VerticalTimelineElement
          className="vertical-timeline-element--work"
          contentStyle={{ background: "#673AB7", color: "#fff" }}
          contentArrowStyle={{ borderRight: "7px solid  #673AB7" }}
          iconStyle={{ background: "#673AB7", color: "#fff" }}
          icon={<MdCallReceived />}
        >
          <h3 className="vertical-timeline-element-title">
            Receive Task Assignments
          </h3>
          <p>
            Upon successful login, receive your assigned tasks and project
            details.
          </p>
        </VerticalTimelineElement>

        <VerticalTimelineElement
          className="vertical-timeline-element--work"
          contentStyle={{ background: "#FF9800", color: "#fff" }}
          contentArrowStyle={{ borderRight: "7px solid  #FF9800" }}
          iconStyle={{ background: "#FF9800", color: "#fff" }}
          icon={<BiTask />}
        >
          <h3 className="vertical-timeline-element-title">
            Task Completion & Deployment
          </h3>
          <p>
            Complete assigned tasks diligently and deploy the project upon
            completion.
          </p>
        </VerticalTimelineElement>

        <VerticalTimelineElement
          className="vertical-timeline-element--work"
          contentStyle={{ background: "#795548", color: "#fff" }}
          contentArrowStyle={{ borderRight: "7px solid  #795548" }}
          iconStyle={{ background: "#795548", color: "#fff" }}
          icon={<CiGift />}
        >
          <h3 className="vertical-timeline-element-title">
            Acknowledgment and Closure
          </h3>
          <p>
            Receive acknowledgment for your efforts and project completion,
            concluding the internship journey.
          </p>
        </VerticalTimelineElement>
      </VerticalTimeline>
      <Footer />
    </>
  );
};

export default Roadmap;

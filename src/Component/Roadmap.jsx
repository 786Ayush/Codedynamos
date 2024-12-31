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
import { Helmet } from "react-helmet";

const Roadmap = () => {
  return (
    <>
    <Helmet>
        <title>Internship Roadmap: Your Guide to Success | CodeDynamos</title>
        <meta
          name="description"
          content="Follow the detailed internship roadmap at CodeDynamos to prepare, apply, and excel in your internship journey. Start your career with confidence!"
        />
        <meta
          name="keywords"
          content="internship roadmap, career guidance, internship preparation, CodeDynamos roadmap, internship success"
        />
        <meta property="og:title" content="Internship Roadmap: Your Guide to Success | CodeDynamos" />
        <meta
          property="og:description"
          content="Discover the step-by-step roadmap to successfully land and excel in internships at CodeDynamos. Empower your career today!"
        />
        <meta property="og:image" content="/roadmap-preview.png" />
        <meta property="og:url" content="https://www.codedynamos.com/roadmap" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Internship Roadmap: Your Guide to Success | CodeDynamos" />
        <meta
          name="twitter:description"
          content="Step into a successful career with our comprehensive internship roadmap. Learn how to prepare, apply, and thrive in your internship journey!"
        />
        <meta name="twitter:image" content="/roadmap-preview.png" />
      </Helmet>
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

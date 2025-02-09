import React, { lazy, Suspense } from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Component/Home";
import Login from "./Component/Login";
import Roadmap from "./Component/Roadmap";
import OfferLetter from "./Component/OfferLetter";
import ApplicationForm from "./Component/Application/Applicationform";
import AdminDashboard from "./Component/AdminDashboard/AdminDashboard";
import Internships from "./Component/Internship/Internships";
import Protected from "./Component/Protected";
import AdminLogin from "./Component/AdminLogin";
import Dashboard from "./Component/StudentDashboard/StudentDashboard";
import Submissionform from "./Component/StudentDashboard/Submissionform";
import AdminProtected from "./Component/AdminProtected";

// Lazy load components
const About = lazy(() => import("./Component/About"));
const Contact = lazy(() => import("./Component/Contact"));

function App() {
  return (
    <div className="bg-gray-100">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/adminlogin" element={<AdminLogin />} />
        <Route path="/internship" element={<Internships />} />
        <Route path="/roadmap" element={<Roadmap />} />
        <Route path="/applicationform" element={<ApplicationForm />} />

        {/* Lazy-loaded routes with Suspense fallback */}
        <Route
          path="/about"
          element={
            <Suspense fallback={<div>Loading...</div>}>
              <About />
            </Suspense>
          }
        />
        <Route
          path="/contact"
          element={
            <Suspense fallback={<div>Loading...</div>}>
              <Contact />
            </Suspense>
          }
        />

        <Route
          path="/dashboard"
          element={
            <Protected>
              <Dashboard />
            </Protected>
          }
        />
        <Route
          path="/dashboard/submissionform"
          element={
            <Protected>
              <Submissionform />
            </Protected>
          }
        />
        <Route
          path="/admindashboard/*"
          element={
            <AdminProtected>
              <AdminDashboard />
            </AdminProtected>
          }
        />
      </Routes>
    </div>
  );
}

export default App;

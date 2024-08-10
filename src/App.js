import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Component/Home";
import About from "./Component/About";
import Login from "./Component/Login";

import Roadmap from "./Component/Roadmap";
import Contact from "./Component/Contact";
import OfferLetter from "./Component/OfferLetter";
// import Dashboard from "./Component/StudentDashboard";
import ApplicationForm from "./Component/Application/Applicationform";
import AdminDashboard from "./Component/AdminDashboard/AdminDashboard";
import Internships from "./Component/Internship/Internships";

import Protected from "./Component/Protected";
import AdminLogin from "./Component/AdminLogin";
import Dashboard from "./Component/StudentDashboard/StudentDashboard";
import Submissionform from "./Component/StudentDashboard/Submissionform";
import AdminProtected from "./Component/AdminProtected";

function App() {
  return (
    <div className="bg-gray-100">
      {/* <Router> */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<Login />} />
        <Route path="/adminlogin" element={<AdminLogin />} />
        <Route path="/internship" element={<Internships />} />

        <Route path="/roadmap" element={<Roadmap />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/applicationform" element={<ApplicationForm />} />
        <Route path="/offerletter" element={<OfferLetter />} />
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
      {/* </Router> */}
    </div>
  );
}

export default App;

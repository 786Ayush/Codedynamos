import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Suspense, lazy } from "react";

const Home = lazy(() => import("./Component/Home"));
const About = lazy(() => import("./Component/About"));
const Login = lazy(() => import("./Component/Login"));
const Roadmap = lazy(() => import("./Component/Roadmap"));
const Contact = lazy(() => import("./Component/Contact"));
const OfferLetter = lazy(() => import("./Component/OfferLetter"));
const ApplicationForm = lazy(() => import("./Component/Application/Applicationform"));
const AdminDashboard = lazy(() => import("./Component/AdminDashboard/AdminDashboard"));
const Internships = lazy(() => import("./Component/Internship/Internships"));
const Protected = lazy(() => import("./Component/Protected"));
const AdminLogin = lazy(() => import("./Component/AdminLogin"));
const Dashboard = lazy(() => import("./Component/StudentDashboard/StudentDashboard"));
const Submissionform = lazy(() => import("./Component/StudentDashboard/Submissionform"));
const AdminProtected = lazy(() => import("./Component/AdminProtected"));

function App() {
  return (
    <div className="bg-gray-100">
      <Suspense fallback={<div className="text-center mt-10">Loading...</div>}>
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
      </Suspense>
    </div>
  );
}

export default App;

import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Component/Home";
import About from "./Component/About";
import Login from "./Component/Login";
import Internships from "./Component/Internships";
import Roadmap from "./Component/Roadmap";
import Contact from "./Component/Contact";
import OfferLetter from "./Component/OfferLetter";
import Dashboard from "./Component/StudentDashboard";
import ApplicationForm from "./Component/Application/Applicationform";
import AdminDashboard from "./Component/AdminDashboard/AdminDashboard";

function App() {
  return (
    <div className="bg-gray-100">
      {/* <Router> */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/login" element={<Login />} />
          <Route path="/internship" element={<Internships />} />
          <Route path="/roadmap" element={<Roadmap />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/applicationform" element={<ApplicationForm />} />
          <Route path="/offerletter" element={<OfferLetter />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/admindashboard/*" element={<AdminDashboard />} />
        </Routes>
      {/* </Router> */}
    </div>
  );
}

export default App;

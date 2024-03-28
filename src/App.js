import "./App.css";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
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

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/about",
    element: <About />,
  },
  {
    path: "/login",
    element: <Login />,
  },

  {
    path: "/internship",
    element: <Internships />,
  },
  {
    path: "/roadmap",
    element: <Roadmap />,
  },
  {
    path: "/contact",
    element: <Contact />,
  },
  {
    path: "/applicationform",
    element: <ApplicationForm />,
  },

  {
    path: "/offerletter",
    element: <OfferLetter />,
  },
  {
    path: "/dashboard",
    element: <Dashboard />,
  },
  {
    path: "/admindashboard",
    element: <AdminDashboard />,
  },
]);

function App() {
  return (
    <div className=" bg-gray-100">
      {/* <Navbar/> */}
      <RouterProvider router={router} />
      {/* <Footer/> */}
    </div>
  );
}

export default App;

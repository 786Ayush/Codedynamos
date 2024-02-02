import "./App.css";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./Component/Home";
import About from "./Component/About";

import Login from "./Component/Login";
import Register from "./Component/Register";
import Internships from "./Component/Internships";
import Roadmap from "./Component/Roadmap";
import Contact from "./Component/Contact";
import ApplicationForm from "./Component/Applicationform";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/about",
    element: <About/>
  },
  {
    path: "/login",
    element: <Login/>
  },
  {
    path: "/register",
    element: <Register/>
  },
  {
    path: "/internship",
    element: <Internships/>
  },
  {
    path:"/roadmap",
    element:<Roadmap/>
  },
  {
    path:"/contact",
    element:<Contact/>
  },
  {
    path:"/applicationform",
    element:<ApplicationForm/>
  }
]);

function App() {
  return (
    <div className="App">
      {/* <Navbar/> */}
      <RouterProvider router={router} />
      {/* <Footer/> */}
    </div>
  );
}

export default App;

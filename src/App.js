import logo from './logo.svg';
import './App.css';
import Navbar from './Component/Navbar';
import Footer from './Component/Foot';
import { BrowserRouter } from 'react-router-dom';
import Home from './Component/Home';

function App() {
  return (
    <BrowserRouter>
    <>
    <Navbar/>
    <Home/>
    <Footer/>
    </>
    </BrowserRouter>
  );
}

export default App;

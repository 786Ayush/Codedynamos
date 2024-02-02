// Roadmap.js

import React from 'react';
import { FaFileAlt, FaClipboardCheck, FaUsers, FaCheckCircle, FaUserCheck } from 'react-icons/fa';
import Navbar from './Navbar';
import Footer from './Foot';

const Roadmap = () => {
  const roadmapData = [
    { title: 'Apply', description: 'Submit your application online.', icon: <FaFileAlt />, color: 'bg-blue-500' },
    { title: 'Screening', description: 'Initial screening process.', icon: <FaClipboardCheck />, color: 'bg-yellow-500' },
    { title: 'Interview', description: 'Interview with our team.', icon: <FaUsers />, color: 'bg-pink-500' },
    { title: 'Selection', description: 'Final selection of candidates.', icon: <FaCheckCircle />, color: 'bg-green-500' },
    { title: 'Onboarding', description: 'Welcome to the internship program!', icon: <FaUserCheck />, color: 'bg-purple-500' },
  ];

  return (
    <>
    <Navbar/>
    <div className="min-h-screen bg-gray-900 flex items-center justify-center">
      <div className="container mx-auto relative">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {roadmapData.map((step, index) => (
            <div
              key={index}
              className={`p-6 rounded-lg shadow-md text-white relative ${step.color} transition-transform transform hover:scale-105 animate__animated animate__fadeInUp`}
              style={{ zIndex: roadmapData.length - index }}
            >
              <div className="mb-4">{step.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
              <p className="text-sm">{step.description}</p>
              {index < roadmapData.length - 1 && (
                <svg className="wavy-connector" viewBox="0 0 50 100" preserveAspectRatio="none">
                  <path d={`M 0 50 Q 25 0 50 50 T 100 50`} stroke="white" fill="transparent" strokeWidth="2" />
                </svg>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
    <Footer/>
    </>
  );
};

export default Roadmap;

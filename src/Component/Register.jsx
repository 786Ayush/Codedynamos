// Register.js

import React, { useState } from 'react';
import Navbar from './Navbar';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [linkedin, setLinkedin] = useState('');
  const [github, setGithub] = useState('');
  const [collegeName, setCollegeName] = useState('');
  const [branch, setBranch] = useState('');
  const [degree, setDegree] = useState('');
  const [internshipDomain, setInternshipDomain] = useState('');
  const [resume, setResume] = useState(null);

  const handleDropdownChange = (field, value) => {
    if (field === 'branch') {
      setBranch(value);
    } else if (field === 'internshipDomain') {
      setInternshipDomain(value);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add your form submission logic here
    console.log('Form submitted with:', {
      name,
      email,
      linkedin,
      github,
      collegeName,
      branch,
      degree,
      internshipDomain,
      resume,
    });
  };

  return (
    <div className="">
      <Navbar />
      <div className="flex items-center justify-center">
        <div className="bg-white p-8 rounded shadow-md w-screen">
          <h2 className="text-2xl font-bold mb-4">Application Form</h2>
          <form onSubmit={handleSubmit}>
            <div className="flex flex-wrap mb-4">
              <label htmlFor="name" className="block text-gray-600 w-full sm:w-1/4">
                Name
              </label>
              <input
                type="text"
                id="name"
                className="p-2 border border-gray-300 rounded w-full sm:w-3/4"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div className="flex flex-wrap mb-4">
              <label htmlFor="email" className="block text-gray-600 w-full sm:w-1/4">
                Email
              </label>
              <input
                type="email"
                id="email"
                className="p-2 border border-gray-300 rounded w-full sm:w-3/4"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="flex flex-wrap mb-4">
              <label htmlFor="linkedin" className="block text-gray-600 w-full sm:w-1/4">
                LinkedIn Profile
              </label>
              <input
                type="text"
                id="linkedin"
                className="p-2 border border-gray-300 rounded w-full sm:w-3/4"
                value={linkedin}
                onChange={(e) => setLinkedin(e.target.value)}
              />
            </div>
            <div className="flex flex-wrap mb-4">
              <label htmlFor="github" className="block text-gray-600 w-full sm:w-1/4">
                GitHub Profile
              </label>
              <input
                type="text"
                id="github"
                className="p-2 border border-gray-300 rounded w-full sm:w-3/4"
                value={github}
                onChange={(e) => setGithub(e.target.value)}
              />
            </div>
            <div className="flex flex-wrap mb-4">
              <label htmlFor="collegeName" className="block text-gray-600 w-full sm:w-1/4">
                College Name
              </label>
              <input
                type="text"
                id="collegeName"
                className="p-2 border border-gray-300 rounded w-full sm:w-3/4"
                value={collegeName}
                onChange={(e) => setCollegeName(e.target.value)}
                required
              />
            </div>
            <div className="flex flex-wrap mb-4">
              <label htmlFor="branch" className="block text-gray-600 w-full sm:w-1/4">
                Branch
              </label>
              <input
                type="text"
                id="branch"
                className="p-2 border border-gray-300 rounded w-full sm:w-3/4"
                value={branch}
                onChange={(e) => setBranch(e.target.value)}
                required
              />
            </div>
            <div className="flex flex-wrap mb-4">
              <label htmlFor="branch" className="block text-gray-600 w-full sm:w-1/4">
                Branch
              </label>
              <select
                id="branch"
                className="p-2 border border-gray-300 rounded w-full sm:w-3/4"
                value={branch}
                onChange={(e) => handleDropdownChange('branch', e.target.value)}
                required
              >
                <option value="" disabled>
                  Select Branch
                </option>
                <option value="CSE">Computer Science and Engineering</option>
                <option value="IT">Information Technology</option>
                <option value="ECE">Electronics and Communication Engineering</option>
                {/* Add more options as needed */}
              </select>
            </div>
            <div className="flex flex-wrap mb-4">
              <label htmlFor="internshipDomain" className="block text-gray-600 w-full sm:w-1/4">
                Internship Domain
              </label>
              <select
                id="internshipDomain"
                className="p-2 border border-gray-300 rounded w-full sm:w-3/4"
                value={internshipDomain}
                onChange={(e) => handleDropdownChange('internshipDomain', e.target.value)}
                required
              >
                <option value="" disabled>
                  Select Internship Domain
                </option>
                <option value="WebDev">Web Development</option>
                <option value="AppDev">App Development</option>
                <option value="DataScience">Data Science</option>
                {/* Add more options as needed */}
              </select>
            </div>
            <div className="flex flex-wrap mb-4">
              <label htmlFor="resume" className="block text-gray-600 w-full sm:w-1/4">
                Resume (PDF or DOCX)
              </label>
              <input
                type="file"
                id="resume"
                accept=".pdf,.docx"
                onChange={(e) => setResume(e.target.files[0])}
                required
              />
            </div>
            <button
              type="submit"
              className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
            >
              Submit Application
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;

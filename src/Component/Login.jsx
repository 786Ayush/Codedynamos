// Login.js

import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // If using React Router

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    // Add your login logic here
    console.log('Logging in with:', { username, password });
  };

  return (
    <div className="min-h-screen relative flex items-center justify-center">
      {/* Background with Blur Effect */}
      <div
        className="absolute inset-0 bg-center bg-cover filter blur-sm"
        style={{ backgroundImage: 'url("/bg-home.jpg")' }}
      ></div>

      {/* Content */}
      <div className="relative z-10 bg-white p-8 rounded shadow-md w-96">
        <h2 className="text-2xl font-bold mb-4">Login</h2>
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <input
              type="text"
              id="username"
              className="w-full p-2 border border-gray-300 rounded"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder='Username'
              required
            />
          </div>
          <div className="mb-4">
            <input
              type="password"
              id="password"
              className="w-full p-2 border border-gray-300 rounded"
              value={password}
              placeholder='Password'
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
          >
            Login
          </button>
        </form>
        <p className="mt-4 text-sm text-gray-600">
          Don't have an account?{' '}
          <Link to="/register" className="text-blue-500">
            Register here
          </Link>
        </p>
        
        {/* Go Back Link */}
        <p className="mt-4 text-sm text-gray-600">
          <Link to="/" className="text-blue-500">
            Go back
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;

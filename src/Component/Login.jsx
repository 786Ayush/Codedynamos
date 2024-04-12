import React, { useState, useEffect } from "react";
import { Link, Navigate } from "react-router-dom";
import Cookies from "js-cookie";
import CryptoJS from "crypto-js";
import { supabase } from "../utils/Supabase";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Track login state

  useEffect(() => {
    // Check if encrypted user data is present in cookies
    const encryptedUser = Cookies.get("encryptedUser");
    if (encryptedUser) {
      try {
        // Decrypt user data
        const decryptedUserBytes = CryptoJS.AES.decrypt(
          encryptedUser,
          "secretKey"
        );
        const decryptedUserData = decryptedUserBytes.toString(
          CryptoJS.enc.Utf8
        );

        // Parse decrypted user data
        const userData = JSON.parse(decryptedUserData);

        // Perform any additional checks if needed

        // Set login state to true
        setIsLoggedIn(true);
      } catch (error) {
        console.error("Error decrypting user data:", error.message);
      }
    }
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const { data: user, error } = await supabase
        .from("basic_details")
        .select("*")
        .eq("email", username)
        .eq("password", password)
        .single();

      if (error) {
        throw error;
      }

      if (!user) {
        setErrorMessage("Invalid email or password");
        return;
      } else {
        setErrorMessage(null);

        // Encrypt user data
        const encryptedUser = CryptoJS.AES.encrypt(
          JSON.stringify(user),
          "secretKey"
        ).toString();

        // Store encrypted user data in cookies
        Cookies.set("encryptedUser", encryptedUser);

        console.log("Logged in successfully:", user);
        setIsLoggedIn(true); // Set login state to true
      }
    } catch (error) {
      console.error("Login error:", error.message);
      setErrorMessage("Invalid email or password");
    }
  };

  // Redirect to dashboard if user is logged in
  if (isLoggedIn) {
    return <Navigate to="/dashboard" replace={true} />;
  }

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
        {errorMessage && (
          <div className="mb-4 text-red-500">{errorMessage}</div>
        )}
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <input
              type="text"
              id="username"
              className="w-full p-2 border border-gray-300 rounded"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Username"
              required
            />
          </div>
          <div className="mb-4">
            <input
              type="password"
              id="password"
              className="w-full p-2 border border-gray-300 rounded"
              value={password}
              placeholder="Password"
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
          Don't have an account?{" "}
          <Link to="/internship" className="text-blue-500">
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

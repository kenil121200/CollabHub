import React, { useState, ChangeEvent } from "react";
import githubLogo from "../../assets/github.svg";
import Animation from "../Animation";
import LoginImage from "../../assets/loginImage.png";
import collabHubLogo from "../../assets/collabhub.svg";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function LoginPage() {
  const navigate = useNavigate();
  const { handleLogin } = useAuth();

  // State to manage email input
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  // Handle email input changes
  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    setError(""); // Reset error when user starts typing
  };

  // Function to check if the user exists
  const checkUserExists = async (email: string) => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_LINK}/profile/userExist`,
        { email }
      );
      return response.data.exists;
    } catch (error) {
      console.error("Error checking if user exists:", error);
      setError("An error occurred while checking the user. Please try again.");
      return false;
    }
  };

  // Handle sign in button click
  const handleSignIn = async () => {
    if (!email) {
      setError("Email is required.");
    } else {
      const userExists = await checkUserExists(email);
      if (userExists) {
        // User exists, navigate to profile setup
        handleLogin();
      } else {
        // User does not exist, set error message
        navigate("/profile-setup");
      }
    }
  };

  return (
    <>
      <div className="absolute inset-0 -z-10 h-full w-full bg-white [background:radial-gradient(125%_125%_at_50%_10%,#fff_40%,#63e_100%)]">
        <div className="flex flex-col items-start justify-center h-screen lg:w-2/6 lg:ml-20 ml-0 lg:items-start lg:text-left text-center">
          <p className="mb-4 text-base font-medium text-green-700">
            Discover, Unite, Code Together
          </p>
          <img
            src={collabHubLogo}
            alt="CollabHub logo"
            className="h-16 w-auto mb-4"
          />
          <p className="text-wrap text-lg text-gray-800 mb-4 leading-relaxed sm:max-w-none max-w-xs">
            CollabHub is an open-source platform where developers can discover,
            contribute to, and manage projects in one searchable environment.
          </p>

          {/* Email Input Field */}
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={handleEmailChange}
            className="mb-4 p-2 border border-gray-300 rounded w-full"
            required
          />
          {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

          <button
            onClick={handleSignIn}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded inline-flex items-center"
          >
            <img
              src={githubLogo}
              alt="Github logo"
              className="fill-current w-6 h-6 mr-4"
            />
            <span>Sign in with Github</span>
          </button>
        </div>

        <div className="absolute bottom-0 right-0 lg:block hidden w-3/5 xl:w-2/3 2xl:w-auto">
          <Animation />
          <img
            src={LoginImage}
            alt="Github logo"
            className="absolute bottom-0 right-0"
          />
        </div>
      </div>
    </>
  );
}

export default LoginPage;

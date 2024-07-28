// Author: Jay Patel

import React from "react";
import "./App.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./features/landing-page/LandingPageScreen";
import ContactUs from "./features/ContactUs/ContactUs";
import Faqs from "./features/Faqs/Faqs";
import ChatPage from "./features/Chat/ChatPage";
import "react-toastify/dist/ReactToastify.css";
import Projects from "./features/ProjectsPage/Projects";
import { LoginPage, NavBar } from "./components";
import ProfileScreen from "./features/Profile/ProfileScreen";
import FindDeveloper from "./features/FindDeveloper/FindDeveloper";
import ViewDeveloper from "./features/FindDeveloper/ViewDeveloper";
import ProfileInformation from "./components/ProfileInformation/ProfileInformation";
import UserProjects from "./features/UserProjects/UserProject";

function App() {
  return (
    <>
      <ToastContainer />

      <Router>
        <NavBar />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/faqs" element={<Faqs />} />
          <Route path="/contact-us" element={<ContactUs />} />
          <Route path="/profile-setup" element={<ProfileInformation />} />
          <Route path="/profile" element={<ProfileScreen />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/developers" element={<FindDeveloper />} />
          <Route path="/getDeveloper/:id" element={<ViewDeveloper />} />
          <Route path="/chat" element={<ChatPage />} />
          <Route path="/user-projects" element={<UserProjects />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;

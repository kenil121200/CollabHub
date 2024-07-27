import React from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./features/landing-page/LandingPageScreen";
import ContactUs from "./features/ContactUs/ContactUs";
import Faqs from "./features/Faqs/Faqs";
import Home from "./features/Home/Home";
import "react-toastify/dist/ReactToastify.css";
import Projects from "./features/ProjectsPage/Projects";
import { LoginPage, NavBar, HomePage } from "./components";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ProfileScreen from "./features/Profile/ProfileScreen";
import FindDeveloper from "./features/FindDeveloper/FindDeveloper";
import ViewDeveloper from "./features/FindDeveloper/ViewDeveloper";
import ProfileInformation from "./components/ProfileInformation/ProfileInformation";

function App() {
  return (
    <>
      <ToastContainer />

      <Router>
        <NavBar />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/home" element={<Home />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/faqs" element={<Faqs />} />
          <Route path="/contact-us" element={<ContactUs />} />
          <Route path="/profile-setup" element={<ProfileInformation />} />
          <Route path="/profile" element={<ProfileScreen />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/developers" element={<FindDeveloper />} />
          <Route path="/getDeveloper/:id" element={<ViewDeveloper />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;

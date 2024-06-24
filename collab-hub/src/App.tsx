import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./features/landing-page/LandingPageScreen";
import ContactUs from "./features/ContactUs/ContactUs";
import Faqs from "./features/Faqs/Faqs";
import Home from "./features/Home/Home";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/home" element={<Home />} />
        <Route path="/faqs" element={<Faqs />} />
        <Route path="/contact-us" element={<ContactUs />} />
      </Routes>
    </Router>
  );
}

export default App;

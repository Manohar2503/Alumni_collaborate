import React from "react";
import { Routes, Route } from "react-router-dom";

import Body from "../Pages/Body";
import Footer from "../Pages/Footer";
import { Header } from "../Pages";

import AlumniMainPage from "../AlumniHomePage/alumnimainpage.jsx";
import LoginPage from "../Pages/LoginPage";
import SignupPage from "../Pages/SignupPage";

import Profile from "../Components/MainPages/Profile";
import Students from "../Components/Students";

import ForgotPassword from "../Pages/ForgotPassword.jsx";
import ResetPassword from "../Pages/ResetPassword.jsx";

import Mentors from "../Components/Alumni/Mentors.jsx";
import ExploreMentors from "../Components/Alumni/ExploreMentors.jsx";
import BecomeAMentor from "../Components/Alumni/BecomeAMentor.jsx";
import CareerResources from "../Components/Alumni/CareerResources.jsx";
import AlumniCategoryUpdate from "../Components/Alumni/AlumniCategoryUpdate.jsx";

const Routers = () => {
  return (
    <Routes>
      <Route path="/" element={<Body />} />
      <Route path="/body" element={<Body />} />
      <Route path="/footer" element={<Footer />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/alumni-page" element={<AlumniMainPage />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/reset-password/:token" element={<ResetPassword />} />
      <Route path="/students" element={<Students />} />
      <Route path="/mentors" element={<Mentors />} />
      <Route path="/explorementors" element={<ExploreMentors />} />
      <Route path="/becomeamentor" element={<BecomeAMentor />} />
      
      <Route path="/careerresources" element={<CareerResources />} />
      <Route path="/alumnicategoryUpdate" element={<AlumniCategoryUpdate/>}/>
    </Routes>
  );
};

export default Routers;

import React from "react";
import Body from '../Pages/Body'
import Footer from '../Pages/Footer'
import { Header } from "../Pages";

import { Routes, Route } from "react-router-dom";
// import DonarImages from "../Components/DonarImages";
import AlumniMainPage from "../AlumniHomePage/alumnimainpage.jsx";
import LoginPage from "../Pages/LoginPage";
import SignupPage from "../Pages/SignupPage";

import Profile from "../Components/MainPages/Profile";
import Students from "../Components/Students"; // Import Students component



const Routers = () => {
  return (
    <Routes>
      <Route path="/" element={<Body/>} />
      <Route path="/body" element={<Body/>} />
      <Route path="/footer" element={<Footer/>} />
      <Route path="/login" element={<LoginPage/>} />
      <Route path="/alumni-page" element={<AlumniMainPage/>}/>
      <Route path="/signup" element={<SignupPage/>}/>
      <Route path ='/profile' element={<Profile/>}/>
      <Route path='/forgot-password' element={<ForgotPassword/>} />
      <Route path='/reset-password/:token' element={<ResetPassword/>} />
      <Route path="/students" element={<Students/>} /> {/* Add route for student dashboard */}
      <Route path="/mentors" element={<Mentors/>} />
      <Route path="/explorementors" element={<ExploreMentors/>} />
      <Route path="/becomeamentor" element={<BecomeAMentor/>} />
    </Routes>
  );
};
export default Routers;

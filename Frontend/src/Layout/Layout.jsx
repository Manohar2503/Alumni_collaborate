import React, { useContext, useReducer, createContext, useEffect, useState } from 'react';
import { userProfileData } from '../data/userProfile';
import { Header, Footer } from '../Pages';
import Routers from '../Routers/Routers';
import Navbar from '../Components/Navbar'; // Import Navbar component
import { getInitialState, reducer } from '../reducer/UseReducer';
import { useLocation } from 'react-router-dom';

export const UserContext = createContext();

const Layout = () => {
  const [state, dispatch] = useReducer(reducer, undefined, getInitialState);
  const [profile, setProfile] = useState(() => {
    try {
      const saved = localStorage.getItem('userProfileData');
      return saved ? JSON.parse(saved) : userProfileData;
    } catch (e) {
      return userProfileData;
    }
  });
  const location = useLocation();
  
  // Determine if the navbar should be shown (for all alumni pages)
  const alumniPages = ['/alumni-page', '/jobs', '/messaging', '/notifications', '/profile'];
  const showNavbar = alumniPages.includes(location.pathname);
  const hideHeader = showNavbar; // Hide header when navbar is shown
  const footerHiddenPaths = ['/alumni-page', '/jobs', '/messaging', '/notifications', '/profile'];
  const hideFooter = footerHiddenPaths.includes(location.pathname);

  // Persist userPosts to localStorage so they survive logout/navigation
  useEffect(() => {
    try {
      localStorage.setItem('userPosts', JSON.stringify(state.userPosts || []));
    } catch (e) {
      // ignore storage errors
    }
  }, [state.userPosts]);

  // Persist profile to localStorage when it changes
  useEffect(() => {
    try {
      localStorage.setItem('userProfileData', JSON.stringify(profile));
    } catch (e) {}
  }, [profile]);

  return (
    <>
      <UserContext.Provider value={{ state, dispatch, profile, setProfile }}>
        {showNavbar && <Navbar />} {/* Render Navbar if showNavbar is true */}
        {!hideHeader && !showNavbar && <Header />} {/* Render Header if hideHeader is false and showNavbar is false */}
        <main>
          <Routers />
        </main>
        {!hideHeader && !hideFooter && <Footer />} {/* Corrected: Using !hideHeader instead of !hideHeaderFooter */}
      </UserContext.Provider>
    </>
  );
};

export default Layout;

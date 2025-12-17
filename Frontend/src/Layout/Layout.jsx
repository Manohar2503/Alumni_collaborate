import React, { useContext, useReducer, createContext, useEffect } from 'react';
import { Header, Footer } from '../Pages';
import Routers from '../Routers/Routers';
import Navbar from '../Components/Navbar'; // Import Navbar component
import { getInitialState, reducer } from '../reducer/UseReducer';
import { useLocation } from 'react-router-dom';

export const UserContext = createContext();

const Layout = () => {
  const [state, dispatch] = useReducer(reducer, undefined, getInitialState);
  const location = useLocation();
  
  // Determine if the header should be hidden or replaced with a navbar
  const hideHeader = location.pathname === '/alumni-page';
  const showNavbar = location.pathname === '/profile';
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

  return (
    <>
      <UserContext.Provider value={{ state, dispatch }}>
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

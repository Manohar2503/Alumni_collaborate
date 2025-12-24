import React, { useReducer, createContext, useEffect } from 'react';
import { Header, Footer } from '../Pages';
import Routers from '../Routers/Routers';
import Navbar from '../Components/Navbar';
import { getInitialState, reducer } from '../reducer/UseReducer';
import { useLocation } from 'react-router-dom';

export const UserContext = createContext();

const Layout = () => {
  const [state, dispatch] = useReducer(reducer, undefined, getInitialState);
  const location = useLocation();

  // ✅ LOGIN BASED CHECK (only line needed)
const isLoggedIn = Boolean(state.user?.token || localStorage.getItem('token'));

  // Footer logic (unchanged)
  const footerHiddenPaths = ['/alumni-page', '/jobs', '/messaging', '/notifications', '/profile'];
  const hideFooter = footerHiddenPaths.includes(location.pathname);

  useEffect(() => {
    try {
      localStorage.setItem('userPosts', JSON.stringify(state.userPosts || []));
    } catch (e) {}
  }, [state.userPosts]);

  return (
    <UserContext.Provider value={{ state, dispatch }}>
      
      {/* ✅ Clean & correct */}
      {!isLoggedIn ? <Header /> : <Navbar />}

      <main>
        <Routers />
      </main>

      {!hideFooter && <Footer />}
    </UserContext.Provider>
  );
};

export default Layout;

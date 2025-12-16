import React, { useContext, useReducer, createContext, useEffect } from 'react';
import { Header, Footer } from '../Pages';
import Routers from '../Routers/Routers';
import { getInitialState, reducer } from '../reducer/UseReducer';
import { useLocation } from 'react-router-dom';

export const UserContext = createContext();

const Layout = () => {
  const [state, dispatch] = useReducer(reducer, undefined, getInitialState);
  const location = useLocation();
  
  // Hide header on alumni-page (legacy) and allow hiding footer on specific pages
  const hideHeaderFooter = location.pathname === '/alumni-page';
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
        {!hideHeaderFooter && <Header />}
        <main>
          <Routers />
        </main>
        {!hideHeaderFooter && !hideFooter && <Footer />}
      </UserContext.Provider>
    </>
  );
};

export default Layout;
import React, { useContext, useReducer, createContext, useEffect } from 'react';
import { Header, Footer } from '../Pages';
import Routers from '../Routers/Routers';
import { getInitialState, reducer } from '../reducer/UseReducer';
import { useLocation } from 'react-router-dom';

export const UserContext = createContext();

const Layout = () => {
  const [state, dispatch] = useReducer(reducer, undefined, getInitialState);
  const location = useLocation();
  
  // Hide header and footer on alumni-page
  const hideHeaderFooter = location.pathname === '/alumni-page';

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
        {!hideHeaderFooter && <Footer />}
      </UserContext.Provider>
    </>
  );
};

export default Layout;
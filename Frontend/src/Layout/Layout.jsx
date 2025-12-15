import React, { useContext, useReducer, createContext } from 'react';
import { Header, Footer } from '../Pages';
import Routers from '../Routers/Routers';
import { initialState, reducer } from '../reducer/UseReducer';
import { useLocation } from 'react-router-dom';

export const UserContext = createContext();

const Layout = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const location = useLocation();
  
  // Hide header and footer on alumni-page
  const hideHeaderFooter = location.pathname === '/alumni-page';

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
import React, { useContext, useReducer, createContext } from 'react';
import { Header, Footer } from '../Pages';
import Routers from '../Routers/Routers';
import { initialState, reducer } from '../reducer/UseReducer';

export const UserContext = createContext();

const Layout = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <>
      <UserContext.Provider value={{ state, dispatch }}>
        <Header />
        <main>
          <Routers />
        </main>
        {/* <Footer /> */}
      </UserContext.Provider>
    </>
  );
};

export default Layout;
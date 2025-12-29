import React, { useReducer, createContext, useEffect, useState, useLayoutEffect } from "react";
import axios from "axios";
import { Header, Footer } from "../Pages";
import Navbar from "../Components/Navbar";
import Routers from "../Routers/Routers";
import { reducer, getInitialState } from "../reducer/UseReducer";
import { useLocation, useNavigate } from "react-router-dom";

export const UserContext = createContext();

const Layout = () => {
  const [state, dispatch] = useReducer(reducer, getInitialState());
  const [loading, setLoading] = useState(true);
  
  const location = useLocation();
  const navigate = useNavigate();

  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);
  const footerHiddenPaths = ["/alumni-page", "/jobs", "/messaging", "/notifications", "/profile"];
  const hideFooter = footerHiddenPaths.includes(location.pathname);
  const publicRoutes = ["/", "/login", "/signup", "/forgot-password"];

  // 🔥 Check auth on app start
  useEffect(() => {
    // scroll fix
    window.scrollTo({ top: 0, behavior: "smooth" });

    // ❌ Don't check auth on public pages
    if (publicRoutes.includes(location.pathname)) {
      setLoading(false);
      return;
    }

    const checkAuth = async () => {
      try {
        const res = await axios.get(
          "http://localhost:5001/api/users/me",
          { withCredentials: true }
        );

        dispatch({ type: "USER", payload: res.data });
      } catch (err) {
        dispatch({ type: "USER", payload: null });
        navigate("/", { replace: true });
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, [location.pathname]);

  if (loading) return null; // or loader

  return (
    <UserContext.Provider value={{ state, dispatch }}>
      {/* Navbar ONLY for logged-in users */}
      {state.user && <Navbar />}

      {/* Header ONLY for logged-out users */}
      {!state.user && <Header />}

      <main>
        <Routers />
      </main>

      {!state.user && !hideFooter && <Footer />}
    </UserContext.Provider>
  );
};

export default Layout;

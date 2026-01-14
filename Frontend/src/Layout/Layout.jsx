import React, { useReducer, createContext, useEffect, useState, useLayoutEffect } from "react";
import axios from "axios";
import { Header, Footer } from "../Pages";
import Navbar from "../Components/Navbar";
import Routers from "../Routers/Routers";
import { reducer, getInitialState } from "../reducer/UseReducer";
import { useLocation, useNavigate } from "react-router-dom";
import { userProfileData } from "../data/userProfile";

export const UserContext = createContext();

const Layout = () => {
  const [state, dispatch] = useReducer(reducer, getInitialState());
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState(() => {
    try {
      const saved = localStorage.getItem('userProfileData');
      return saved ? JSON.parse(saved) : userProfileData;
    } catch (e) {
      return userProfileData;
    }
  });
  
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

    if (publicRoutes.includes(location.pathname)) {
      setLoading(false);
      return;
    }

    const checkAuth = async () => {
      try {
        const res = await axios.get(
      `${import.meta.env.VITE_REACT_APP_API_URL}/users/me`,
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

  // Persist profile to localStorage when it changes
  useEffect(() => {
    try {
      localStorage.setItem('userProfileData', JSON.stringify(profile));
    } catch (e) {}
  }, [profile]);

  if (loading) return null; // or loader

  return (
    <UserContext.Provider value={{ state, dispatch, profile, setProfile }}>
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

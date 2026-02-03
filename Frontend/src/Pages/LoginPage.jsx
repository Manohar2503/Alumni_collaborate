import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import pic3 from "../assets/pic3.jpeg";
import { UserContext } from "../Layout/Layout";
import { FiArrowLeft } from "react-icons/fi";
import "../styles/stranger.css";

const LoginPage = () => {
  const { dispatch } = useContext(UserContext);

  const [form, setForm] = useState({
    email: "",
    password: "",
    role: "student",
  });

  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();

  const changeHandler = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // ✅ Back button always goes to Home page
  const handleBackToHome = () => {
    navigate("/body");
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    setError("");
    setSubmitting(true);

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_REACT_APP_API_URL}/users/login`,
        form,
        { withCredentials: true }
      );

      // ✅ Correct: store user data in context
      dispatch({ type: "USER", payload: res.data });
      sessionStorage.setItem("skipAuthOnce", "1");

      // ✅ after login go to alumni dashboard
      navigate("/alumni-page", { replace: true });
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="relative h-screen overflow-hidden flex items-center justify-center">
      {/* 🔴 Background */}
      <div
        className="absolute inset-0 stranger-bg"
        style={{ backgroundImage: `url(${pic3})` }}
      />

      {/* 🔥 Login Card */}
      <div className="relative z-10 bg-black bg-opacity-80 p-8 rounded-xl shadow-2xl w-11/12 max-w-md float-card">
        
        {/* ✅ BACK TO HOME BUTTON */}
        <button
          onClick={handleBackToHome}
          className="absolute top-4 left-4 flex items-center gap-2 text-gray-200 hover:text-red-400 transition text-sm"
        >
          <FiArrowLeft size={18} />
          Home
        </button>

        <h2 className="text-3xl font-extrabold text-center mb-6 stranger-title">
          SIGN IN
        </h2>

        {error && (
          <p className="text-red-400 text-sm text-center mb-3">{error}</p>
        )}

        <form onSubmit={submitHandler} className="space-y-4">
          <div>
            <label className="block text-sm text-gray-300">User Type</label>
            <select
              name="role"
              value={form.role}
              onChange={changeHandler}
              className="mt-1 w-full px-4 py-2 bg-gray-900 text-gray-200 rounded-lg focus:ring-2 focus:ring-red-600 outline-none"
            >
              <option value="student">Student</option>
              <option value="alumni">Alumni</option>
            </select>
          </div>

          <div>
            <label className="block text-sm text-gray-300">E-mail</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={changeHandler}
              placeholder="Enter your email"
              className="mt-1 w-full px-4 py-2 bg-gray-900 text-gray-200 rounded-lg focus:ring-2 focus:ring-red-600 outline-none"
              required
            />
          </div>

          <div>
            <label className="block text-sm text-gray-300">Password</label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={changeHandler}
              placeholder="Enter your password"
              className="mt-1 w-full px-4 py-2 bg-gray-900 text-gray-200 rounded-lg focus:ring-2 focus:ring-red-600 outline-none"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full py-2 bg-red-700 text-white font-semibold rounded-lg hover:bg-red-800 transition disabled:opacity-70"
            disabled={submitting}
          >
            {submitting ? "Signing In..." : "Sign In"}
          </button>
        </form>

        <div className="mt-4 text-center space-y-2">
          <Link
            to="/forgot-password"
            className="text-sm text-red-400 hover:underline"
          >
            Forgot Password?
          </Link>

          <p className="text-sm text-gray-400">
            Don’t have an account?{" "}
            <Link to="/signup" className="text-red-400 hover:underline">
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;

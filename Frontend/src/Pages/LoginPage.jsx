import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import pic3 from "../assets/pic3.jpeg";
import { UserContext } from "../Layout/Layout";

const LoginPage = () => {
  const { dispatch } = useContext(UserContext);

  const [form, setForm] = useState({
    email: "",
    password: "",
    role: "student",
  });

  const [error, setError] = useState("");
  const navigate = useNavigate();

  const changeHandler = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_REACT_APP_API_URL}/users/login`,
        form,
        { withCredentials: true }
      );

      dispatch({ type: "USER", payload: true });

      if (!res.data.isProfileCompleted) {
        navigate("/alumni-page");
      } else {
        navigate("/alumni-page");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div
      className="h-screen bg-cover bg-center bg-fixed flex items-center justify-center"
      style={{ backgroundImage: `url(${pic3})` }}
    >
      <div className="bg-black bg-opacity-75 p-8 rounded-lg shadow-lg w-11/12 max-w-md">
        <h2 className="text-2xl font-bold text-white mb-6 text-center">
          Sign In
        </h2>

        {error && (
          <p className="text-red-400 text-sm text-center mb-3">{error}</p>
        )}

        <form onSubmit={submitHandler} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-300">
              User Type
            </label>
            <select
              name="role"
              value={form.role}
              onChange={changeHandler}
              className="mt-1 block w-full px-4 py-2 bg-gray-800 text-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            >
              <option value="student">Student</option>
              <option value="alumni">Alumni</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300">
              E-mail
            </label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={changeHandler}
              placeholder="Enter your email"
              className="mt-1 block w-full px-4 py-2 bg-gray-800 text-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={changeHandler}
              placeholder="Enter your password"
              className="mt-1 block w-full px-4 py-2 bg-gray-800 text-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          <button
            type="submit"
            className="w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500"
          >
            Sign In
          </button>
        </form>

       <div className="mt-4 text-center space-y-2">
  <Link
    to="/forgot-password"
    className="text-sm text-blue-400 hover:underline"
  >
    Forgot Password?
  </Link>

  <p className="text-sm text-gray-400">
    Don’t have an account?{" "}
    <Link to="/signup" className="text-blue-400 hover:underline">
      Sign Up
    </Link>
  </p>
</div>

      </div>
    </div>
  );
};

export default LoginPage;

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import pic3 from "../assets/pic3.jpeg";

const SignupPage = () => {
  const [form, setForm] = useState({
    name: "",
    collegeMail: "",
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
      await axios.post(
        `${import.meta.env.VITE_REACT_APP_API_URL}/users`,
        form,
        { withCredentials: true }
      );

      alert("Signup successful. Please login.");
      navigate("/login");
    } catch (err) {
      setError(err.response?.data?.message || "Signup failed");
    }
  };

  return (
    <div className="h-screen flex">
      {/* LEFT IMAGE */}
      <div
        className="hidden md:block w-1/2 bg-cover bg-center"
        style={{ backgroundImage: `url(${pic3})` }}
      >
        <div className="h-full w-full bg-black bg-opacity-70"></div>
      </div>

      {/* RIGHT FORM */}
      <div className="w-full md:w-1/2 flex items-center justify-center bg-gray-900">
        <div className="bg-black bg-opacity-75 p-8 rounded-lg shadow-lg w-11/12 max-w-md">
          <h2 className="text-2xl font-bold text-white mb-6 text-center">
            Create Account
          </h2>

          {error && (
            <p className="text-red-400 text-sm text-center mb-3">{error}</p>
          )}

          <form onSubmit={submitHandler} className="space-y-4">
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={form.name}
              onChange={changeHandler}
              className="w-full px-4 py-2 bg-gray-800 text-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            />

            <input
              type="email"
              name="collegeMail"
              placeholder="College Email"
              value={form.collegeMail}
              onChange={changeHandler}
              className="w-full px-4 py-2 bg-gray-800 text-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            />

            <input
              type="email"
              name="email"
              placeholder="Personal Email"
              value={form.email}
              onChange={changeHandler}
              className="w-full px-4 py-2 bg-gray-800 text-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            />

            <input
              type="password"
              name="password"
              placeholder="Password"
              value={form.password}
              onChange={changeHandler}
              className="w-full px-4 py-2 bg-gray-800 text-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            />

            <select
              name="role"
              value={form.role}
              onChange={changeHandler}
              className="w-full px-4 py-2 bg-gray-800 text-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            >
              <option value="student">Student</option>
              <option value="alumni">Alumni</option>
            </select>

            <button
              type="submit"
              className="w-full py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700"
            >
              Sign Up
            </button>
          </form>

          <div className="mt-4 text-center">
            <Link to="/login" className="text-sm text-blue-400 hover:underline">
              Already have an account? Sign In
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;

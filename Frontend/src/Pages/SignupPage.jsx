import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; 
import axios from "axios";

const SignupPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [collegeMail, setCollegeMail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [batch, setBatch] = useState("");
  const [branch, setBranch] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate(); 

  const onSubmitHandler = (e) => {
    e.preventDefault();
    if (!name || !email || !collegeMail || !password || !phone || !batch || !branch) {
      setMessage("All fields are required!");
      return;
    }
 
    setLoading(true);
    axios
      .post(`${import.meta.env.VITE_REACT_APP_API_URL}/users`, { name, email, collegeMail, password, phone, batch, branch })
      .then((result) => {
        setLoading(false);
        setMessage("Signup successful!");
        console.log("Response:", result.data); 
        alert("Signup successful! Please login to continue.");
        navigate("/login"); 
      })
      .catch((err) => {
        setLoading(false);
        if (err.response && err.response.data && err.response.data.message) {
          setMessage(err.response.data.message); 
        } else {
          setMessage("An error occurred. Please try again.");
        }
        console.error("Error:", err);
      });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-indigo-200">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
        <h1 className="text-2xl font-bold text-center text-indigo-600">Join the Alumni Network</h1>
        <p className="text-gray-600 text-center mt-2">Stay connected with your college community.</p>
        {message && <p className="text-center text-red-500">{message}</p>}
        <form onSubmit={onSubmitHandler} className="mt-6 space-y-4">
          <div className="flex flex-col">
            <label htmlFor="name" className="text-gray-700 font-medium">Full Name</label>
            <input
              type="text"
              id="name"
              aria-label="Full Name"
              placeholder="Enter your full name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-1 px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="collegeMail" className="text-gray-700 font-medium">College Email</label>
            <input
              type="email"
              id="collegeMail"
              aria-label="College Email"
              placeholder="Enter your college email"
              value={collegeMail}
              onChange={(e) => setCollegeMail(e.target.value)}
              className="mt-1 px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="email" className="text-gray-700 font-medium">Personal Email</label>
            <input
              type="email"
              id="email"
              aria-label="Personal Email"
              placeholder="Enter your personal email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="collegeMail" className="text-gray-700 font-medium">Phone Number:</label>
            <input
              type="number"
              id="collegeMail"
              aria-label="College Email"
              placeholder="Enter your college email"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="mt-1 px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="collegeMail" className="text-gray-700 font-medium">Student Branch</label>
            <input
              type="text"
              id="collegeMail"
              aria-label="College Email"
              placeholder="Enter your college email"
              value={branch}
              onChange={(e) => setBranch(e.target.value)}
              className="mt-1 px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="collegeMail" className="text-gray-700 font-medium">Student Batch</label>
            <input
              type="text"
              id="collegeMail"
              aria-label="College Email"
              placeholder="Enter your college email"
              value={batch}
              onChange={(e) => setBatch(e.target.value)}
              className="mt-1 px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="password" className="text-gray-700 font-medium">Password</label>
            <input
              type="password"
              id="password"
              aria-label="Password"
              placeholder="Create a secure password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            disabled={loading}
          >
            {loading ? "Signing up..." : "Sign Up"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignupPage;

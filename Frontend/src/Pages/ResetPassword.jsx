import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const ResetPassword = () => {
  const { token } = useParams();
  const navigate = useNavigate();

  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const submitHandler = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_REACT_APP_API_URL}/users/reset-password/${token}`,
        { password }
      );

      setMessage(res.data.message);

      setTimeout(() => navigate("/login"), 2000);
    } catch (err) {
      setError(err.response?.data?.message || "Reset failed");
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gray-900">
      <div className="bg-black bg-opacity-80 p-8 rounded-lg w-11/12 max-w-md">
        <h2 className="text-2xl font-bold text-white mb-4 text-center">
          Reset Password
        </h2>

        {message && (
          <p className="text-green-400 text-sm text-center mb-3">
            {message}
          </p>
        )}
        {error && (
          <p className="text-red-400 text-sm text-center mb-3">
            {error}
          </p>
        )}

        <form onSubmit={submitHandler} className="space-y-4">
          <input
            type="password"
            placeholder="Enter new password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full px-4 py-2 bg-gray-800 text-gray-200 rounded-lg outline-none"
          />

          <button
            type="submit"
            className="w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Reset Password
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;

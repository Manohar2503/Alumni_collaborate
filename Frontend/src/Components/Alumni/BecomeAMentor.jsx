import React, { useState } from 'react';

const BecomeAMentor = () => {
  const [formData, setFormData] = useState({
    name: '',
    experience: '',
    sessionType: '',
    motivation: ''
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    } else if (!/^[A-Za-z\s]+$/.test(formData.name)) {
      newErrors.name = 'Name should contain only letters';
    }

    if (!formData.experience) {
      newErrors.experience = 'Experience is required';
    } else if (formData.experience <= 0) {
      newErrors.experience = 'Experience must be greater than 0';
    }

    if (!formData.sessionType) {
      newErrors.sessionType = 'Please select a session type';
    }

    if (!formData.motivation.trim()) {
      newErrors.motivation = 'Motivation is required';
    } else if (formData.motivation.length < 20) {
      newErrors.motivation = 'Minimum 20 characters required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      alert('Mentor application submitted successfully!');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-lg bg-white p-6 rounded-lg shadow-md"
      >
        <h1 className="text-2xl font-bold text-center mb-4">
          Want to Become a Mentor?
        </h1>

        <div className="mb-3">
          <input
            type="text"
            name="name"
            placeholder="Enter your full name"
            value={formData.name}
            onChange={handleChange}
            className="w-full p-2 rounded-md border border-gray-300 focus:outline-none focus:ring-1 focus:ring-green-500 transition"
          />
          {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
        </div>

        <div className="mb-3">
          <input
            type="number"
            name="experience"
            placeholder="Years of experience"
            value={formData.experience}
            onChange={handleChange}
            className="w-full p-2 rounded-md border border-gray-300 focus:outline-none focus:ring-1 focus:ring-green-500 transition"
          />
          {errors.experience && <p className="text-red-500 text-xs mt-1">{errors.experience}</p>}
        </div>

        <div className="mb-3">
          <select
            name="sessionType"
            value={formData.sessionType}
            onChange={handleChange}
            className="w-full p-2 rounded-md border border-gray-300 bg-white focus:outline-none focus:ring-1 focus:ring-green-500 transition"
          >
            <option value="">Preferred session type</option>
            <option value="Live">Live</option>
            <option value="Recorded">Recorded</option>
          </select>
          {errors.sessionType && (
            <p className="text-red-500 text-xs mt-1">{errors.sessionType}</p>
          )}
        </div>

        <div className="mb-4">
          <textarea
            name="motivation"
            rows="3"
            placeholder="Why do you want to mentor?"
            value={formData.motivation}
            onChange={handleChange}
            className="w-full p-2 rounded-md border border-gray-300 resize-none focus:outline-none focus:ring-1 focus:ring-green-500 transition"
          />
          {errors.motivation && (
            <p className="text-red-500 text-xs mt-1">{errors.motivation}</p>
          )}
        </div>

        <button
          type="submit"
          className="w-full py-2 rounded-md bg-green-600 text-white font-semibold hover:bg-green-700 transition"
        >
          Submit Application
        </button>
      </form>
    </div>
  );
};

export default BecomeAMentor;

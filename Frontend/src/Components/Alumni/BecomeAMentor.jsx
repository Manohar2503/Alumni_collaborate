import React, { useState } from 'react';
import axios from 'axios';

const BecomeAMentor = () => {
  const [formData, setFormData] = useState({
    name: '',
    smallIntro: '',
    image: '',
    linkedin: '',
    company: '',
    experience: '',
    technologies: '',
    sessionType: '',
    motivation: ''
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.smallIntro.trim()) {
      newErrors.smallIntro = 'Short introduction is required';
    }

    if (!formData.linkedin.trim()) {
      newErrors.linkedin = 'LinkedIn profile is required';
    }

    if (!formData.company.trim()) {
      newErrors.company = 'Company name is required';
    }

    if (!formData.experience || formData.experience <= 0) {
      newErrors.experience = 'Experience must be greater than 0';
    }

    if (!formData.sessionType) {
      newErrors.sessionType = 'Please select a session type';
    }

    if (!formData.motivation || formData.motivation.length < 20) {
      newErrors.motivation = 'Minimum 20 characters required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      const payload = {
        ...formData,
        technologies: formData.technologies
          ? formData.technologies.split(',').map(t => t.trim())
          : []
      };

      const res = await axios.post(
        `${import.meta.env.VITE_REACT_APP_API_URL}/mentors/mentor-applications`,
        payload
      );

      alert(res.data.message || 'Mentor application submitted successfully');

      setFormData({
        name: '',
        smallIntro: '',
        image: '',
        linkedin: '',
        company: '',
        experience: '',
        technologies: '',
        sessionType: '',
        motivation: ''
      });

    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || 'Something went wrong');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-lg bg-white p-6 rounded-lg shadow-md"
      >
        <h1 className="text-2xl font-bold text-center mb-4">
          Become a Mentor
        </h1>

        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={formData.name}
          onChange={handleChange}
          className="w-full p-2 mb-2 border rounded"
        />
        {errors.name && <p className="text-red-500 text-xs">{errors.name}</p>}

        <input
          type="text"
          name="smallIntro"
          placeholder="Short Introduction"
          value={formData.smallIntro}
          onChange={handleChange}
          className="w-full p-2 mb-2 border rounded"
        />
        {errors.smallIntro && <p className="text-red-500 text-xs">{errors.smallIntro}</p>}

        <input
          type="text"
          name="company"
          placeholder="Company"
          value={formData.company}
          onChange={handleChange}
          className="w-full p-2 mb-2 border rounded"
        />
        {errors.company && <p className="text-red-500 text-xs">{errors.company}</p>}

        <input
          type="text"
          name="linkedin"
          placeholder="LinkedIn Profile URL"
          value={formData.linkedin}
          onChange={handleChange}
          className="w-full p-2 mb-2 border rounded"
        />
        {errors.linkedin && <p className="text-red-500 text-xs">{errors.linkedin}</p>}

        <input
          type="number"
          name="experience"
          placeholder="Years of Experience"
          value={formData.experience}
          onChange={handleChange}
          className="w-full p-2 mb-2 border rounded"
        />
        {errors.experience && <p className="text-red-500 text-xs">{errors.experience}</p>}

        <input
          type="text"
          name="technologies"
          placeholder="Technologies (comma separated)"
          value={formData.technologies}
          onChange={handleChange}
          className="w-full p-2 mb-2 border rounded"
        />

        <select
          name="sessionType"
          value={formData.sessionType}
          onChange={handleChange}
          className="w-full p-2 mb-2 border rounded"
        >
          <option value="">Preferred session type</option>
          <option value="Live">Live</option>
          <option value="Recorded">Recorded</option>
        </select>
        {errors.sessionType && <p className="text-red-500 text-xs">{errors.sessionType}</p>}

        <textarea
          name="motivation"
          rows="3"
          placeholder="Why do you want to mentor?"
          value={formData.motivation}
          onChange={handleChange}
          className="w-full p-2 mb-3 border rounded"
        />
        {errors.motivation && <p className="text-red-500 text-xs">{errors.motivation}</p>}

        <button
          type="submit"
          className="w-full py-2 bg-green-600 text-white rounded hover:bg-green-700"
        >
          Submit Application
        </button>
      </form>
    </div>
  );
};

export default BecomeAMentor;

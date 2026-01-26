import React, { useState } from 'react'
import axios from 'axios'

const PostOpportunity = () => {

  const [fields, setFields] = useState({
    company: "",
    role: "",
    link: "",
    type: ""
  })

  const [errors, setErrors] = useState({})

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target

    setFields({
      ...fields,
      [name]: value
    })
  }

  // Validation
  const validate = () => {
    let newErrors = {}

    if (fields.company.length <= 3) {
      newErrors.company = "Company name must be minimum 3 characters"
    } 
    else if (/[0-9!@#$%^&*]/.test(fields.company)) {
      newErrors.company = "Company name should not contain numbers or special characters"
    }

    if (fields.role.length <= 3) {
      newErrors.role = "Role must be minimum 3 characters"
    } 
    else if (/[0-9!@#$%^&*]/.test(fields.role)) {
      newErrors.role = "Role should not contain numbers or special characters"
    }

    if (fields.link.length <= 3) {
      newErrors.link = "Please enter valid link"
    }

    if (fields.type !== "job" && fields.type !== "internship") {
      newErrors.type = "Please select type"
    }

    setErrors(newErrors)

    return Object.keys(newErrors).length === 0
  }

  // Submit handler
  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!validate()) return

    try {
      await axios.post(
        "http://localhost:5001/api/oppurtunities/postOppurtunity",
        fields,
        { withCredentials: true }
      )

      alert("Opportunity posted successfully!")

    } catch (error) {
      console.log(error)
    }
  }

return (
  <div className="flex items-center justify-center bg-gray-100 p-4">

    <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md 
      hover:shadow-2xl transition-all duration-300">

      <h2 className="text-2xl font-semibold text-center mb-6 text-blue-600">
        Post Opportunity
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">

        {/* Company */}
        <div>
          <input
            name="company"
            type="text"
            placeholder="Company Name"
            value={fields.company}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded-md border border-gray-300
              focus:ring-2 focus:ring-blue-600 focus:border-blue-600
              focus:outline-none transition"
          />
          {errors.company && (
            <p className="text-red-500 text-sm mt-1">
              {errors.company}
            </p>
          )}
        </div>

        {/* Role */}
        <div>
          <input
            name="role"
            type="text"
            placeholder="Role"
            value={fields.role}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded-md border border-gray-300
              focus:ring-2 focus:ring-blue-600 focus:border-blue-600
              focus:outline-none transition"
          />
          {errors.role && (
            <p className="text-red-500 text-sm mt-1">
              {errors.role}
            </p>
          )}
        </div>

        {/* Link */}
        <div>
          <input
            name="link"
            type="text"
            placeholder="Application Link"
            value={fields.link}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded-md border border-gray-300
              focus:ring-2 focus:ring-blue-600 focus:border-blue-600
              focus:outline-none transition"
          />
          {errors.link && (
            <p className="text-red-500 text-sm mt-1">
              {errors.link}
            </p>
          )}
        </div>

        {/* Type */}
        <div>
          <select
            name="type"
            value={fields.type}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded-md border border-gray-300 bg-white
              focus:ring-2 focus:ring-blue-600 focus:border-blue-600
              focus:outline-none transition cursor-pointer"
          >
            <option value="">Select Type</option>
            <option value="job">Job</option>
            <option value="internship">Internship</option>
          </select>

          {errors.type && (
            <p className="text-red-500 text-sm mt-1">
              {errors.type}
            </p>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-md font-semibold
            hover:bg-blue-700 hover:shadow-md
            transition-all duration-300 active:scale-95"
        >
          Submit Opportunity
        </button>

      </form>

    </div>

  </div>
)


}

export default PostOpportunity

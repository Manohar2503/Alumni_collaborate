import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Profile() {
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    name: "",
    email: "",
    collegeMail: "",
    phone: "",
    batch: "",
    branch: "",
  });
  const [isLoading, setIsLoading] = useState(true);

 
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_REACT_APP_API_URL}/users/profile`, {
          withCredentials: true,
        });
        setProfile(response.data);
        setIsLoading(false);
      } catch (error) {
        toast.error("Failed to fetch profile data");
        console.error("Error fetching profile:", error);
        setIsLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile({ ...profile, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`${import.meta.env.VITE_REACT_APP_API_URL}/users/update`, profile, {
        withCredentials: true,
      });
      setProfile(response.data.user);
      setIsEditing(false);
      toast.success("Profile updated successfully!");
    } catch (error) {
      toast.error("Failed to update profile");
      console.error("Error updating profile:", error);
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="bg-gradient-to-r from-blue-500 to-blue-700 p-6 text-white">
          <h2 className="text-2xl font-bold">Profile Information</h2>
          <p className="text-blue-100">Manage your personal details</p>
        </div>

        {!isEditing ? (
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <ProfileField label="Name" value={profile.name} />
                <ProfileField label="Email" value={profile.email} />
                <ProfileField
                  label="College Email"
                  value={profile.collegeMail}
                />
              </div>
              <div className="space-y-4">
                <ProfileField label="Phone" value={profile.phone} />
                <ProfileField label="Batch" value={profile.batch} />
                <ProfileField label="Branch" value={profile.branch} />
              </div>
            </div>

            <div className="mt-8 flex justify-end">
              <button
                onClick={() => setIsEditing(true)}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 mr-2"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                </svg>
                Edit Profile
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <FormField
                  label="Name"
                  name="name"
                  value={profile.name}
                  onChange={handleChange}
                />
                <FormField
                  label="Email"
                  name="email"
                  value={profile.email}
                  onChange={handleChange}
                  type="email"
                />
                <FormField
                  label="College Email"
                  name="collegeMail"
                  value={profile.collegeMail}
                  onChange={handleChange}
                  disabled
                />
              </div>
              <div className="space-y-4">
                <FormField
                  label="Phone"
                  name="phone"
                  value={profile.phone}
                  onChange={handleChange}
                  type="tel"
                />
                <FormField
                  label="Batch"
                  name="batch"
                  value={profile.batch}
                  onChange={handleChange}
                />
                <FormField
                  label="Branch"
                  name="branch"
                  value={profile.branch}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="mt-8 flex justify-end space-x-4">
              <button
                type="button"
                onClick={() => setIsEditing(false)}
                className="px-6 py-2 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 mr-2"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
                Save Changes
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}


function ProfileField({ label, value }) {
  return (
    <div>
      <h3 className="text-sm font-medium text-gray-500">{label}</h3>
      <p className="mt-1 text-lg font-semibold text-gray-900">{value}</p>
    </div>
  );
}

function FormField({ label, name, value, onChange, type = "text", disabled = false }) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {label}
      </label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        disabled={disabled}
        className={`w-full px-4 py-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500 ${
          disabled ? "bg-gray-100 text-gray-500" : ""
        }`}
      />
    </div>
  );
}
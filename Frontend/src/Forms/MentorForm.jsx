import {React,useState} from 'react';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';
const MentorForm = () => {
  const navigate = useNavigate();
const[mentorData,setMentorData]=useState({
  image:"",
  topic:"",
  video:""
});

const handleChanges=(e)=>{
  setMentorData({...mentorData,[e.target.name]:e.target.value});
}

const handleSubmit=(e)=>{
e.preventDefault();
if(!mentorData.image || !mentorData.topic || !mentorData.video){
  alert("All fields are required!");
  return;
}
//const token = localStorage.getItem('authToken');
//console.log(token)
// if(!token){
//   alert("Go to login page")
// }
// else{
  axios.post("http://localhost:5000/api/mentor",mentorData,{
    withCredentials : true,
    
  })
  .then((result) => {
    console.log("Response:", result.data);
    alert("session details submitted successfully!");
    navigate("/mentor");
  })
  .catch((err) => {
    console.error("Error:", err);
    alert(
        err.response && err.response.data.message
            ? err.response.data.message
            : "An error occurred while submitting the session details. Please try again."
    );
  });
//}
}

  return (
    <div className="min-h-screen flex flex-col items-center bg-gradient-to-r from-blue-50 to-blue-100 py-10">
    <div className="mb-6 w-full h-full  flex justify-center">
  <img
    src="./public/pictures/mentoringgraphic.jpg"
    alt="VVIT Mentorship"
    className="w-[80%] h-[300px] rounded-lg shadow-lg"
  />
</div>
      {/* Form Section */}
      <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-center text-blue-800 mb-4">
          Mentor Submission Form
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Image Link
            </label>
            <input
              type="text"
              name='image'
              value={mentorData.image}
              onChange={handleChanges}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              placeholder="Enter an image URL"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Name of the Topic
            </label>
            <input
              type="text"
              name='topic'
              value={mentorData.topic}
              onChange={handleChanges}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              placeholder="Enter the topic name"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Link for Video
            </label>
            <input
              type="text"
              name='video'
              value={mentorData.video}
              onChange={handleChanges}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              placeholder="Enter a video link"
            />
          </div>
          <button 
            type="submit"
            className="w-full bg-blue-800 text-white py-3 rounded-lg font-semibold hover:bg-blue-900 transition duration-300"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default MentorForm;

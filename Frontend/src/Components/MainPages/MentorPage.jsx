import { useState, useEffect } from "react";
import React from "react";
import { Link } from "react-router-dom";

const MentorCard = ({ data }) => {
  return (
    <div className="bg-gray-100 rounded-lg p-4 text-center shadow-lg">
      <img src="../src/assets/ml.jpg" alt="Video Thumbnail" className="w-full h-40 object-cover rounded-md mb-4" />
      <h3 className="text-lg font-bold">{data.topic}</h3>
      <button className="bg-blue-800 text-white m-3 px-4 py-2 rounded hover:bg-blue-600">
        <a href={data.video} target="_blank" rel="noopener noreferrer">Watch</a>
      </button>
    </div>
  );
};

const EventCard = ({ event, addBookmark }) => {
  return (
    <div className="space-y-6 mb-5">
      <div className="bg-white rounded-lg p-6 shadow-md text-center">
        <h3 className="text-xl font-bold">{event.title}</h3>
        <p className="text-gray-500 mb-4">{event.time}</p>
        <p className="text-gray-500 mb-4">{event.createdAt.split('T')[0]}</p>
        <button 
          className="bg-yellow-400 text-blue-800 px-4 py-2 rounded hover:bg-yellow-300 mr-2"
          onClick={() => addBookmark(event._id)}
        >
          Bookmark
        </button>
        <button className="bg-blue-800 text-white px-4 py-2 rounded">
          <a href={event.registration} target="_blank" rel="noopener noreferrer">Register</a>
        </button>
      </div>
    </div>
  );
};

function MentorPage() {
  const [session, setSession] = useState([]);
  const [eventData, setEventData] = useState([]);
  const [courseList, setCourseList] = useState([]);

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_REACT_APP_API_URL}/mentor`);
        if (response.ok) {
          const result = await response.json();
          setSession(result.data.reverse());
        }
      } catch (error) {
        alert('Error fetching data: ' + error.message);
      }
    };

    const getEventsData = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_REACT_APP_API_URL}/newmentor`);
        if (response.ok) {
          const res = await response.json();
          setEventData(res.data.reverse());
        }
      } catch (error) {
        alert('Error fetching data: ' + error.message);
      }
    };

    getData();
    getEventsData();
  }, []);

  // Function to add a bookmark
  const addBookmark = (id) => {
    setCourseList(prevList => [...new Set([id, ...prevList])]); 
  };

  const postBookMarks = () => {
     console.log(courseList);
  };

  return (
    <div className="font-sans">
      <section className="bg-blue-800 text-white py-16 text-center">
        <h1 className="text-3xl font-bold">Mentorship Programs for Alumni and Students</h1>
        <p className="mt-4">Connect with mentors, learn from past sessions, and explore upcoming events.</p>
        <div className="mt-6 flex justify-center space-x-4">
          <button className="bg-yellow-400 text-blue-800 px-4 py-2 rounded hover:bg-yellow-300" onClick={() => scrollToSection("previousVideos")}>
            Watch Past Sessions
          </button>
          <button className="bg-yellow-400 text-blue-800 px-4 py-2 rounded hover:bg-yellow-300" onClick={() => scrollToSection("upcomingPrograms")}>
            View Upcoming Programs
          </button>
          <button className="bg-yellow-400 text-blue-800 px-4 py-2 rounded hover:bg-yellow-300" onClick={() => scrollToSection("mentorForm")}>
            Become a Mentor
          </button>
        </div>
      </section>

      <div>
        <Link to="/mentorform" className="block text-center mt-8 text-blue-800 font-semibold">Add Mentorship Program</Link>
      </div>

      <section id="previousVideos" className="py-16 px-8">
        <h2 className="text-2xl font-semibold text-center mb-8">Past Mentoring Sessions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {session.map((data, index) => <MentorCard key={index} data={data} />)}
        </div>
        <Link to="" className="block text-center mt-8 text-blue-800 font-semibold">View All Past Sessions</Link>
      </section>

      <Link to="/newmentor" className="block text-center mt-8 text-blue-800 font-semibold">Add Mentorship Program</Link>

      <section id="upcomingPrograms" className="py-16 px-8 bg-gray-100">
        <h2 className="text-2xl font-semibold text-center mb-8">Upcoming Mentorship Programs</h2>
        {eventData.map((event, index) => <EventCard key={index} event={event} addBookmark={addBookmark} />)}
        <button onClick={postBookMarks}><h2 className="text-2xl font-semibold text-center mb-8">Save</h2></button>
      </section>
      

      <section id="mentorForm" className="py-16 px-8 bg-blue-50">
        <h2 className="text-2xl font-semibold text-center mb-8">Become a Mentor</h2>
        <form className="max-w-md mx-auto space-y-4 bg-white p-6 rounded-lg shadow-md">
          <label className="block">
            <span className="text-gray-700">Name:</span>
            <input type="text" className="mt-1 block w-full h-[40px] rounded-md border-gray-300 shadow-sm" placeholder="Your Name" required />
          </label>
          
          <label className="block">
            <span className="text-gray-700">Email:</span>
            <input type="email" className="mt-1 block w-full h-[40px] rounded-md border-gray-300 shadow-sm" placeholder="Your Email" required />
          </label>
          
          <label className="block">
            <span className="text-gray-700">Area of Expertise:</span>
            <input type="text" className="mt-1 block w-full h-[40px] rounded-md border-gray-300 shadow-sm" placeholder="Your Expertise" required />
          </label>
          
          <label className="block">
            <span className="text-gray-700">Brief Bio:</span>
            <textarea className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" placeholder="Tell us about yourself" rows="3"></textarea>
          </label>
          
          <button type="submit" className="w-full bg-blue-800 text-white py-2 rounded">Submit Application</button>
        </form>
      </section>
    </div>
  );
}

const scrollToSection = (id) => {
  document.getElementById(id).scrollIntoView({ behavior: "smooth" });
};

export default MentorPage;

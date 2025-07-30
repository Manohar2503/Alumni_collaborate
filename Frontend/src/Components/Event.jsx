
import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import EventsData from "../assets/data/EventsData";
import EventForm from "../Forms/EventForm";


function EventCard({ event }) {
    const [isOpen, setIsOpen] = useState(false);
    const [isHovered, setIsHovered] = useState(false);
    const navigate = useNavigate();
    const getDetails = () => navigate("/event-details",{ state: { event } });
  
  
    const toggleDetails = () => {
      setIsOpen((prev) => !prev);
    };
  
    return (
      <div className="bg-white mr-5">
        {/* Main Event Card */}
        <div
          className="px-10 py-10 cursor-pointer"
          onClick={toggleDetails}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {/* Event Header */}
          <div className="flex justify-between items-center">
            <div className="sm:mr-10">
              <p className="text-gray-500">{event.date}</p>
              <h1
                className={`text-3xl font-thin ${
                  isHovered ? "text-blue-600" : "text-black"
                }`}
              >
                {event.title} /{" "}
                <span className="text-xl">Event Location {event.location}</span>{" "}
                {isOpen ? "▴" : "▾"}
              </h1>
            </div>
            <div>
            <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700" onClick={getDetails}>
              Details
            </button>
            </div>
          </div>
  
          {/* Conditional Rendering of Details */}
          {isOpen && (
            <div className="mt-4 text-gray-600">
              <p>
                {event.date}, {event.time}
              </p>
              <p>Event location is {event.location}.</p>
            </div>
          )}
        </div>
        <hr
          className={`mx-5 border-1 ${
            isHovered ? "border-blue-600" : "border-gray-200"
          } `}
        />
      </div>
    );
  }
  
const Event = () => {
  return <>
    <div>
        <div className="w-full h-[200px] flex justify-center items-center">
          <h1 className="text-3xl md:text-7xl font-bold">Alumni Nexus Events</h1>
        </div>
        <div className="bg-[#1d1d34] w-full h-full  z-0">
          <div className="w-full h-[70px]"></div>
          {EventsData.map((event, index) => (
            <EventCard key={index} event={event} />
          ))}

          <div className="w-full h-[100px]"></div>
        </div>
        <EventForm/>
      </div>
  </>
}

export default Event
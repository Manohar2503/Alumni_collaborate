import React, { useState } from "react";
import { useLocation } from "react-router-dom";

const EventDetails = () => {
  const location = useLocation();
  const event = location.state?.event;
  const [isImageClicked, setIsImageClicked] = useState(false);

  if (!event) {
    return (
      <div className="flex justify-center items-center h-screen text-red-500 text-2xl">
        No event details found.
      </div>
    );
  }

  // Toggle image size when clicked
  const handleImageMouseDown = () => {
    setIsImageClicked(true);
  };

  const handleImageMouseUp = () => {
    setIsImageClicked(false);
  };

  return (
    <div className="w-full h-full bg-gradient-to-r from-purple-700 via-indigo-600 to-blue-500 text-white">
      <div className="py-16 px-8 flex flex-col items-center">
        {/* Event Title */}
        <h1
          className="text-6xl font-extrabold text-center animate-fadeInUp"
          style={{ animationDelay: "0.3s" }}
        >
          {event.title}
        </h1>

        {/* Event Date and Location */}
        <p
          className="mt-4 text-xl font-medium italic animate-fadeIn"
          style={{ animationDelay: "0.5s" }}
        >
          {event.date} | Location:{" "}
          <span className="font-semibold text-yellow-300">{event.location}</span>
        </p>

        {/* Ticket Information */}
        <div
          className="bg-white text-gray-800 rounded-lg shadow-lg p-6 mt-10 w-64 text-center animate-bounce"
          style={{ animationDelay: "0.8s" }}
        >
          <p className="font-semibold">Tickets are not on sale</p>
          <a
            href="http://"
            className="text-blue-600 underline hover:text-blue-800 mt-2 block"
          >
            See other events
          </a>
        </div>

        {/* Event Main Image */}
        <div
          className="mt-16 w-full flex justify-center animate-zoomIn"
          style={{ animationDelay: "1s" }}
        >
          <img
            src={event.image}
            alt="Event Main"
            className={`rounded-lg shadow-lg border-4 border-pink-500 hover:scale-105 transform transition duration-300 max-w-full ${
              isImageClicked
                ? "scale-150 md:scale-125 lg:scale-110"
                : "scale-100"
            }`}
            onMouseDown={handleImageMouseDown}
            onMouseUp={handleImageMouseUp}
          />
        </div>

        {/* Time and Location */}
        <div className="mt-12 text-center">
          <h2
            className="text-3xl font-bold underline decoration-pink-500 decoration-4 animate-fadeInUp"
            style={{ animationDelay: "1.2s" }}
          >
            Time & Location
          </h2>
          <p
            className="mt-4 text-lg animate-fadeIn"
            style={{ animationDelay: "1.4s" }}
          >
            {event.date}, {event.time}
          </p>
          <p
            className="text-lg animate-fadeIn"
            style={{ animationDelay: "1.6s" }}
          >
            Location: {event.location}
          </p>
        </div>

        {/* Event Description */}
        <div className="mt-12">
          <h2
            className="text-3xl font-bold underline decoration-yellow-300 decoration-4 animate-fadeInUp"
            style={{ animationDelay: "1.8s" }}
          >
            Description
          </h2>
          <p
            className="mt-4 text-lg font-light leading-relaxed max-w-3xl mx-auto animate-fadeIn"
            style={{ animationDelay: "2s" }}
          >
            {event.description}
          </p>
        </div>

        {/* Event Images */}
        <div className="mt-16">
          <h2
            className="text-4xl font-bold text-pink-400 animate-fadeInUp"
            style={{ animationDelay: "2.2s" }}
          >
            Event Images
          </h2>
          <div
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mt-8 animate-fadeIn"
            style={{ animationDelay: "2.4s" }}
          >
            {[event.image1, event.image2, event.image3, event.image4, event.image5, event.image6, event.image7, event.image8]
              .filter(Boolean)
              .map((imgSrc, idx) => (
                <img
                  key={idx}
                  src={imgSrc}
                  alt={`Event Image ${idx + 1}`}
                  className="rounded-lg shadow-lg hover:scale-105 transform transition duration-300 border-2 border-white"
                />
              ))}
          </div>
        </div>

        {/* Share Section */}
        <div
          className="mt-16 text-center animate-fadeInUp"
          style={{ animationDelay: "2.6s" }}
        >
          <h2 className="text-2xl md:text-3xl font-bold underline decoration-blue-400 decoration-4">
            YOU CAN WATCH US ON
          </h2>
          <div className="mt-4 flex justify-center space-x-8 text-xl md:text-2xl">
            <a
              href="https://www.instagram.com/acm_vvit"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-pink-400"
            >
              Instagram
            </a>
            <a
              href="https://www.facebook.com/acm_vvit"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-500"
            >
              Facebook
            </a>
            <a
              href="https://www.linkedin.com/acm_vvit"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-300"
            >
              LinkedIn
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDetails;

import React, { useState, useEffect } from "react";
import Accordian from "./Accordian";

const Course = ({ tab }) => {
  const [data, setData] = useState([]);
  const [open, setOpen] = useState(null);

  // Fetch learning tracks from backend
  useEffect(() => {
    const fetchTracks = async () => {
      try {
       const res = await fetch(
  `${import.meta.env.VITE_REACT_APP_API_URL}/learningtracks/gettracks`,
  { credentials: "include" }
); // Your API endpoint
        const result = await res.json();
        setData(result);
      } catch (error) {
        console.error("Failed to fetch learning tracks:", error);
      }
    };

    fetchTracks();
  }, []);

  const formatLink = (url) => {
    try {
      const { hostname, pathname } = new URL(url);
      const domain = hostname.replace("www.", "");
      const lastPath = pathname.split("/").filter(Boolean).pop();

      return {
        domain,
        label: lastPath
          ? lastPath.replace(/-/g, " ").slice(0, 30)
          : "Resource",
      };
    } catch {
      return { domain: "Link", label: "Open Source" };
    }
  };

  return (
    <div className="p-4 max-w-7xl mx-auto animate-fadeIn">
      {data.map(
        (path) =>
          tab === path.trackId && (
            <div key={path.trackId} className="space-y-8">
              {/* Header */}
              <div>
                <h2 className="text-3xl font-bold text-gray-900">
                  {path.title}
                </h2>
                <p className="text-gray-600 mt-2">
                  {path.description}{" "}
                  <span className="font-medium">One concept at a time 🚀</span>
                </p>
              </div>

              {/* Category Pills */}
              <div className="flex flex-wrap gap-3">
                {path.categories.map((resource) => (
                  <button
                    key={resource.categoryId}
                    onClick={() => setOpen(resource.categoryId)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300
                      ${
                        open === resource.categoryId
                          ? "bg-black text-white scale-105 shadow-md"
                          : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                      }`}
                  >
                    {resource.title}
                  </button>
                ))}
              </div>

              {/* Accordions */}
              <div className="space-y-5">
                {path.categories.map((category) => (
                  <Accordian
                    key={category.categoryId}
                    title={category.title}
                    isOpen={open === category.categoryId}
                    onToggle={() =>
                      setOpen(
                        open === category.categoryId
                          ? null
                          : category.categoryId
                      )
                    }
                  >
                    <div className="space-y-8">
                      {/* Paid */}
                      <div>
                        <h4 className="text-lg font-semibold mb-4 flex items-center gap-2">
                          <span className="w-2 h-2 bg-green-500 rounded-full" />
                          Paid Resources
                        </h4>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                          {category.links.paid.map((link, i) => {
                            const { domain, label } = formatLink(link);
                            return (
                              <a
                                key={i}
                                href={link}
                                target="_blank"
                                rel="noreferrer"
                                className="flex items-center gap-3 p-4 rounded-xl
                                bg-white border border-gray-200
                                hover:shadow-lg hover:-translate-y-1
                                transition-all duration-300"
                              >
                                <img
                                  src={`https://www.google.com/s2/favicons?domain=${domain}`}
                                  alt=""
                                  className="w-6 h-6"
                                />
                                <div>
                                  <p className="text-sm text-blue-600 capitalize">
                                    {label}
                                  </p>
                                  <p className="text-xs text-gray-600">
                                    {domain}
                                  </p>
                                </div>
                              </a>
                            );
                          })}
                        </div>
                      </div>

                      {/* Unpaid */}
                      <div>
                        <h4 className="text-lg font-semibold mb-4 flex items-center gap-2">
                          <span className="w-2 h-2 bg-blue-500 rounded-full" />
                          Free Resources
                        </h4>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                          {category.links.unpaid.map((link, i) => {
                            const { domain, label } = formatLink(link);
                            return (
                              <a
                                key={i}
                                href={link}
                                target="_blank"
                                rel="noreferrer"
                                className="flex items-center gap-3 p-4 rounded-xl
                                bg-white border border-gray-200
                                hover:shadow-lg hover:-translate-y-1
                                transition-all duration-300"
                              >
                                <img
                                  src={`https://www.google.com/s2/favicons?domain=${domain}`}
                                  alt=""
                                  className="w-6 h-6"
                                />
                                <div>
                                  <p className="text-sm text-blue-600 capitalize">
                                    {label}
                                  </p>
                                  <p className="text-xs text-gray-600">
                                    {domain}
                                  </p>
                                </div>
                              </a>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  </Accordian>
                ))}
              </div>
            </div>
          )
      )}
    </div>
  );
};

export default Course;

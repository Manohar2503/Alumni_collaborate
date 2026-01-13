import React, { useEffect, useState } from "react";
import axios from "axios";
import Course from "./Course";
import { Menu, X } from "lucide-react";

const CareerResources = () => {
  const [data, setData] = useState([]);
  const [activeTab, setActiveTab] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_REACT_APP_API_URL}/learningtracks/gettracks`)

      .then((res) => {
        setData(res.data);
        if (res.data.length > 0) {
          setActiveTab(res.data[0].trackId);
        }
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="relative min-h-screen bg-gray-200">
      <div className="fixed top-0 left-0 right-0 z-50 md:hidden bg-white shadow h-14 flex items-center justify-between px-4">
        <h1 className="font-bold text-blue text-lg">Alumni</h1>
        <button onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      {isOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      <div className="flex pt-14 md:pt-0 min-h-screen">
        <aside
          className={`
            fixed md:sticky z-50 md:z-auto
            top-14 md:top-4
            left-0
            h-[calc(100vh-3.5rem)] md:h-[calc(100vh-2rem)]
            w-64 md:w-1/4
            bg-white md:bg-transparent
            transform transition-transform duration-300 ease-in-out
            ${isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
          `}
        >
          <div className="p-4 h-full">
            <div className="bg-white shadow-sm rounded-xl p-4 h-full overflow-y-auto">
              <h2 className="font-bold text-lg mb-4">Career Paths</h2>

              {data.map((path) => (
                <button
                  key={path.trackId}
                  onClick={() => {
                    setActiveTab(path.trackId);
                    setIsOpen(false);
                  }}
                  className={`w-full text-left mb-2 rounded-lg px-4 py-2 text-sm font-medium transition
                    ${
                      activeTab === path.trackId
                        ? "border-2 border-blue-600 text-blue-600"
                        : "bg-gray-100 text-gray-600 hover:text-blue-600"
                    }`}
                >
                  {path.title}
                </button>
              ))}
            </div>
          </div>
        </aside>

        <main className="flex-1 overflow-y-auto p-6 m-4 mt-0 md:mt-4 bg-white rounded">
          {activeTab && <Course tab={activeTab} />}
        </main>
      </div>
    </div>
  );
};

export default CareerResources;

import React, {useState} from "react";
import totaldata from "../../data/learning.json";
import Accordian from "./Accordian";
const Course = ({ tab }) => {
  const data = totaldata.learningTracks;
  const [activeIndex, setActiveIndex]=useState(null);
  return (
    <div className="p-4">
      {data.map((path) =>
        tab === path.trackId ? (
          <div key={path.trackId} className="space-y-6">
            {/* Track Info */}
            <h2 className="text-2xl font-semibold">{path.title}</h2>
            <p className="text-gray-600">{path.description}</p>

            <img
              src={path.image}
              alt={path.title}
              className="h-48 w-48 rounded object-cover"
            />

            {/* Categories */}
            {path.categories.map((category) => (
              <div
                key={category.categoryId}
                className="border rounded-lg p-6 space-y-4"
              >
                <h3 className="text-xl font-medium">{category.title}</h3>
                <p className="text-sm text-gray-500">
                  Level: {category.level}
                </p>

                {/* Courses */}
                {category.courses.map((course) => (
                  <div
                    key={course.id}
                    className="border rounded p-4 space-y-2"
                  >
                    <p className="font-semibold">{course.courseTitle}</p>
                    <p className="text-sm">Duration: {course.duration}</p>

                    {course.progress.completed ? (
                      <p className="text-green-600 text-sm">
                        ✅ Completed ({course.progress.completedModules} modules)
                      </p>
                    ) : (
                      <p className="text-red-500 text-sm">
                        ⏳ Not completed yet
                      </p>
                    )}

                    {/* Modules */}
                    {course.modules.map((module, index) => (
                      <div>
                          <Accordian key={index}
                          isOpen={activeIndex===index}
                          onToggle={()=>{
                            setActiveIndex(activeIndex===index ? null : index)
                          }}
                        className="ml-4 border-l pl-4 space-y-2"
                        title={module.title}>
                      
                        <p className="font-medium">{}</p>
                        <p className="text-sm">
                          Status:{" "}
                          {module.completed ? "Completed" : "Not Completed"}
                        </p>

                        {/* Resources */}
                        {module.resources.map((resource) => (
                          <div
                            key={resource.resourceId}
                            className="ml-4 text-sm"
                          >
                            <p>{resource.type}</p>
                            <a
                              href={resource.link}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-blue-600 underline"
                            >
                              {resource.title}
                            </a>
                          </div>
                        ))}
                        </Accordian>
                      </div>
                    ))}
                    
                  </div>
                ))}
              </div>
            ))}
          </div>
        ) : null
      )}
    </div>
  );
};

export default Course;

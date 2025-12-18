import React, { useState } from 'react';
import mentorsData from "../../assets/data/mentorsdata.json"

const PreviousSessions = () => {
  // Sample data
  const data =mentorsData.previousMentorSessions;

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTopic, setSelectedTopic] = useState('All Topics');
  const [selectedCompany, setSelectedCompany] = useState('All Companies');

  // Extract unique topics and companies
  const allTopics = ['All Topics', ...new Set(data.flatMap(session => session.topics))];
  const allCompanies = ['All Companies', ...new Set(data.map(session => session.mentor.company))];

  // Filter data
  const filteredData = data.filter(session => {
    const matchesSearch = session.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         session.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTopic = selectedTopic === 'All Topics' || session.topics.includes(selectedTopic);
    const matchesCompany = selectedCompany === 'All Companies' || session.mentor.company === selectedCompany;
    return matchesSearch && matchesTopic && matchesCompany;
  });

  // Format date
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <h2 className="text-4xl font-bold text-gray-800 mb-3">Previous Sessions</h2>
          <p className="text-gray-600 text-lg">Watch recordings from our past mentor sessions</p>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Search */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Search Sessions</label>
              <input
                type="text"
                placeholder="Search by title or description..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
              />
            </div>

            {/* Topic Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Filter by Topic</label>
              <select
                value={selectedTopic}
                onChange={(e) => setSelectedTopic(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
              >
                {allTopics.map(topic => (
                  <option key={topic} value={topic}>{topic}</option>
                ))}
              </select>
            </div>

            {/* Company Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Filter by Company</label>
              <select
                value={selectedCompany}
                onChange={(e) => setSelectedCompany(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
              >
                {allCompanies.map(company => (
                  <option key={company} value={company}>{company}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Results count */}
          <div className="mt-4 text-sm text-gray-600">
            Showing <span className="font-semibold text-gray-800">{filteredData.length}</span> of {data.length} sessions
          </div>
        </div>

        {/* Sessions Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredData.map((item) => (
            <div 
              key={item.id} 
              className="bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 border border-gray-200 overflow-hidden group hover:-translate-y-1 cursor-pointer"
            >
              {/* Top accent line */}
              <div className="h-1 bg-gradient-to-r from-blue-500 to-blue-600"></div>
              
              <div className="p-6 flex flex-col gap-4 h-full">
                <div className="flex-grow">
                  {/* Title */}
                  <h3 className="text-lg font-bold text-gray-800 group-hover:text-blue-600 mb-2 transition-colors duration-300">
                    {item.title}
                  </h3>

                  {/* Date */}
                  <div className="flex items-center gap-2 text-sm text-gray-500 mb-3">
                    <span>{formatDate(item.date)}</span>
                    <span className="mx-1">•</span>
                    <span>{item.duration}</span>
                  </div>
                  
                  {/* Description */}
                  <p className="text-sm text-gray-600 leading-relaxed mb-4 line-clamp-3">
                    {item.description}
                  </p>
                  
                  {/* Mentor Info */}
                  <div className="bg-gray-50 p-3 rounded-lg mb-4 space-y-2 text-sm">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-gray-700">Mentor:</span>
                      <span className="text-gray-600">{item.mentor.name}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-gray-700">Role:</span>
                      <span className="text-gray-600">{item.mentor.role}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-gray-700">Company:</span>
                      <span className="text-gray-600">{item.mentor.company}</span>
                    </div>
                  </div>
                  
                  {/* Topics */}
                  <div className="flex flex-wrap gap-2">
                    {item.topics.map((topic, index) => (
                      <span 
                        key={index}
                        className="px-2.5 py-1 bg-blue-50 text-blue-700 text-xs rounded-md font-medium"
                      >
                        {topic}
                      </span>
                    ))}
                  </div>
                </div>
                
                {/* Watch Button */}
                {item.recordingLink && (
                  <a
                    href={item.recordingLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 w-full text-center bg-blue-600 text-white py-2.5 rounded-lg hover:bg-blue-700 transition-colors duration-300 font-medium shadow-sm"
                  >
                    Watch Recording
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* No results message */}
        {filteredData.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No sessions found matching your filters.</p>
            <button 
              onClick={() => {
                setSearchTerm('');
                setSelectedTopic('All Topics');
                setSelectedCompany('All Companies');
              }}
              className="mt-4 text-blue-600 hover:text-blue-700 font-medium"
            >
              Clear all filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default PreviousSessions;
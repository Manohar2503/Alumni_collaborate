import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UpcomingSessions = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTopic, setSelectedTopic] = useState('All Topics');
  const [selectedMode, setSelectedMode] = useState('All Modes');

  useEffect(() => {
    const fetchUpcomingSessions = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_REACT_APP_API_URL}/mentors/sessions/upcoming`
        );
        setData(Array.isArray(res.data) ? res.data : []);
      } catch (err) {
        console.log(err);
        alert(err.response?.data?.message || 'Something went wrong');
      } finally {
        setLoading(false);
      }
    };

    fetchUpcomingSessions();
  }, []);

  const safeData = Array.isArray(data) ? data : [];

  // Extract unique topics and modes
  const allTopics = [
    'All Topics',
    ...new Set(
      safeData.flatMap(session =>
        Array.isArray(session.topics) ? session.topics : []
      )
    )
  ];
  const allModes = ['All Modes', ...new Set(safeData.map(session => session.mode))];

  // Filter data
  const filteredData = safeData.filter(session => {
    const matchesSearch =
      session.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      session.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTopic =
      selectedTopic === 'All Topics' || (session.topics && session.topics.includes(selectedTopic));
    const matchesMode = selectedMode === 'All Modes' || session.mode === selectedMode;
    return matchesSearch && matchesTopic && matchesMode;
  });

  // Format date
  const formatDate = (dateString) =>
    new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-lg font-semibold">Loading upcoming sessions...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <h2 className="text-4xl font-bold text-gray-900 mb-3">Upcoming Sessions</h2>
          <p className="text-gray-600 text-lg">Join our upcoming mentor sessions</p>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Search */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Search Sessions</label>
              <input
                type="text"
                placeholder="Search by title or description..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
              />
            </div>

            {/* Topic Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Filter by Topic</label>
              <select
                value={selectedTopic}
                onChange={(e) => setSelectedTopic(e.target.value)}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
              >
                {allTopics.map(topic => (
                  <option key={topic} value={topic}>{topic}</option>
                ))}
              </select>
            </div>

            {/* Mode Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Filter by Mode</label>
              <select
                value={selectedMode}
                onChange={(e) => setSelectedMode(e.target.value)}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
              >
                {allModes.map(mode => (
                  <option key={mode} value={mode}>{mode}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Results count */}
          <div className="mt-4 text-sm text-gray-600">
            Showing <span className="font-semibold text-gray-900">{filteredData.length}</span> of {safeData.length} sessions
          </div>
        </div>

        {/* Sessions Grid */}

<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
  {filteredData.map((item) => (
    <div key={item._id} className="bg-white rounded-xl shadow-sm hover:shadow-lg hover:-translate-y-2 transition-all duration-300 overflow-hidden group">
      <div className="h-1 bg-blue-500"></div>
      
      <div className="p-6">
        <h3 className="text-lg font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">{item.title}</h3>
        <div className="flex items-center gap-2 text-sm text-gray-500 mb-3">
          <span>📅</span>
          <span>{formatDate(item.dateTime)}</span>
        </div>

        <div className="mb-4">
          <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium ${item.mode === 'Live' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'}`}>
            {item.mode === 'Live' ? '🔴' : '🎥'} {item.mode}
          </span>
        </div>

        <p className="text-sm text-gray-600 leading-relaxed mb-4 line-clamp-3">{item.description}</p>
        
          {/* Topics */}
         {item.topics && item.topics.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {item.topics.map((topic, idx) => (
              <span key={idx} className="px-2.5 py-1 bg-blue-50 text-blue-700 text-xs rounded-md font-medium">
                {topic}
              </span>
            ))}
          </div>
        )}
        {/* Mentor Photo */}
        {item.mentor?.[0]?.photo && (
          <div className="mb-4">
            <img src={item.mentor[0].photo} alt={item.title} className="w-full h-40 object-cover rounded-lg" />
          </div>
        )}

        {/* Mentor Info */}
        <div className="bg-gray-50 p-3 rounded-lg mb-4">
          <p className="text-sm text-gray-700">
            <span className="font-semibold">Mentor:</span> {item.mentor?.[0]?.name}
          </p>
          {item.mentor?.[0]?.linkedin && (
            <a href={item.mentor[0].linkedin} target="_blank" rel="noopener noreferrer" className="text-xs text-blue-600 hover:text-blue-700 hover:underline inline-flex items-center gap-1">
              LinkedIn Profile →
            </a>
          )}
        </div>
       

        {/* Register Button */}
        <a href={item.registerLink} target="_blank" rel="noopener noreferrer" className="block w-full text-center bg-blue-600 text-white py-2.5 rounded-lg hover:bg-blue-700 transition-colors duration-200 font-medium shadow-sm hover:shadow">
          Register Now
        </a>
      </div>
    </div>
  ))}
</div>


        {/* No results message */}
        {filteredData.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No sessions found matching your filters.</p>
            <button onClick={() => { setSearchTerm(''); setSelectedTopic('All Topics'); setSelectedMode('All Modes'); }} className="mt-4 text-blue-600 hover:text-blue-700 font-medium">
              Clear all filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default UpcomingSessions;

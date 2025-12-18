import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PreviousSessions from './PreviousSessions';
import UpcomingSessions from './UpcomingSessions';

const Mentors = () => {
  const [user, setUser] = useState("alumni");
  const [activeTab, setActiveTab] = useState("overview");
  const navigate = useNavigate();

  

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section - Compact */}
      <div className="relative overflow-hidden bg-gradient-to-br from-blue-600 via-blue-500 to-blue-400 text-white">
        {/* Decorative Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
          <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" style={{animationDelay: '1s'}}></div>
        </div>

        {/* Content Container */}
        <div className="relative max-w-6xl mx-auto px-6 py-12 text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-white/10 backdrop-blur-sm rounded-full text-xs font-medium mb-4 border border-white/20">
            🎓 Alumni Mentorship Platform
          </div>

          {/* Main Heading */}
          <h1 className="text-3xl md:text-4xl font-bold mb-3 leading-tight">
            Learn. Guide. <span className="text-blue-200">Grow Together.</span>
          </h1>

          {/* Subtext */}
          <p className="text-base text-blue-100 mb-6 max-w-2xl mx-auto">
            Connect with experienced alumni mentors and shape your career journey.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-wrap gap-3 justify-center">
            <button
              onClick={() => navigate("/explorementors")}
              className="px-6 py-2.5 bg-white text-blue-600 font-semibold rounded-lg shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5"
            >
              Explore Mentors
            </button>
            {user === "alumni" && (
              <button
                onClick={() => navigate("/becomeamentor")}
                className="px-6 py-2.5 bg-blue-700 text-white font-semibold rounded-lg border-2 border-white/30 hover:bg-blue-800 transition-all duration-300 hover:-translate-y-0.5 shadow-md"
              >
                Become a Mentor
              </button>
            )}
          </div>
        </div>

        {/* Subtle Bottom Border */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-white/30 to-transparent"></div>
      </div>

      {/* Tabs Navigation */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10 shadow-sm">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex gap-1">
            <button
              onClick={() => setActiveTab("overview")}
              className={`px-6 py-3 font-medium text-sm transition-all duration-200 border-b-2 ${
                activeTab === "overview"
                  ? "border-blue-600 text-blue-600"
                  : "border-transparent text-gray-600 hover:text-blue-600 hover:border-blue-200"
              }`}
            >
              📊 Overview
            </button>
            <button
              onClick={() => setActiveTab("previous-sessions")}
              className={`px-6 py-3 font-medium text-sm transition-all duration-200 border-b-2 ${
                activeTab === "previous-sessions"
                  ? "border-blue-600 text-blue-600"
                  : "border-transparent text-gray-600 hover:text-blue-600 hover:border-blue-200"
              }`}
            >
              ⏪ Previous Sessions
            </button>
            <button
              onClick={() => setActiveTab("upcoming-sessions")}
              className={`px-6 py-3 font-medium text-sm transition-all duration-200 border-b-2 ${
                activeTab === "upcoming-sessions"
                  ? "border-blue-600 text-blue-600"
                  : "border-transparent text-gray-600 hover:text-blue-600 hover:border-blue-200"
              }`}
            >
             🔔 Upcoming Sessions
            </button>
          </div>
        </div>
      </div>

      {/* Tab Content */}
      <div className="max-w-6xl mx-auto px-6 py-8">
        {/* Overview Tab */}
        {activeTab === "overview" && (
          <div className="animate-fadeIn">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white rounded-xl p-6 border border-gray-200 text-center group hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                <div className="text-4xl font-bold text-blue-600 mb-2 transition-transform duration-300 group-hover:scale-110">500+</div>
                <div className="text-sm font-semibold text-gray-900 mb-1">Active Mentors</div>
                <div className="text-xs text-gray-600">Industry experts ready to guide</div>
              </div>
              <div className="bg-white rounded-xl p-6 border border-gray-200 text-center group hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                <div className="text-4xl font-bold text-blue-600 mb-2 transition-transform duration-300 group-hover:scale-110">2,000+</div>
                <div className="text-sm font-semibold text-gray-900 mb-1">Students Mentored</div>
                <div className="text-xs text-gray-600">Career paths transformed</div>
              </div>
              <div className="bg-white rounded-xl p-6 border border-gray-200 text-center group hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                <div className="text-4xl font-bold text-blue-600 mb-2 transition-transform duration-300 group-hover:scale-110">95%</div>
                <div className="text-sm font-semibold text-gray-900 mb-1">Success Rate</div>
                <div className="text-xs text-gray-600">Achieved career goals</div>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="mt-6 bg-gradient-to-br from-blue-50 to-white rounded-xl p-6 border border-blue-100">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Why Choose Our Platform?</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0 text-lg">✨</div>
                  <div>
                    <div className="font-semibold text-gray-900 text-sm">Personalized Matching</div>
                    <div className="text-xs text-gray-600">AI-powered mentor recommendations</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0 text-lg">🎯</div>
                  <div>
                    <div className="font-semibold text-gray-900 text-sm">Flexible Scheduling</div>
                    <div className="text-xs text-gray-600">Book sessions at your convenience</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0 text-lg">💡</div>
                  <div>
                    <div className="font-semibold text-gray-900 text-sm">Expert Guidance</div>
                    <div className="text-xs text-gray-600">Learn from industry leaders</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0 text-lg">🌟</div>
                  <div>
                    <div className="font-semibold text-gray-900 text-sm">Career Growth</div>
                    <div className="text-xs text-gray-600">Accelerate your professional journey</div>
                  </div>
                </div>
              </div>
            </div>

             <div className="animate-fadeIn mb-6 py-6">
            <h3 className='txt-4xl font-bold py-3 mb-2'>🚀 How It Works</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="group bg-white rounded-xl p-6 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border border-blue-100">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center mb-4 text-white text-2xl group-hover:scale-110 transition-transform duration-300">
                  🔍
                </div>
                <div className="text-xl font-bold mb-2 text-gray-900">1. Browse Mentors</div>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Explore profiles of experienced alumni across various industries and specializations.
                </p>
              </div>
              <div className="group bg-white rounded-xl p-6 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border border-blue-100">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center mb-4 text-white text-2xl group-hover:scale-110 transition-transform duration-300">
                  📅
                </div>
                <div className="text-xl font-bold mb-2 text-gray-900">2. Book a Session</div>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Schedule one-on-one mentorship sessions at your convenience.
                </p>
              </div>
              <div className="group bg-white rounded-xl p-6 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border border-blue-100">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center mb-4 text-white text-2xl group-hover:scale-110 transition-transform duration-300">
                  🚀
                </div>
                <div className="text-xl font-bold mb-2 text-gray-900">3. Grow Your Career</div>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Get personalized guidance, insights, and support to achieve your goals.
                </p>
              </div>
            </div>

            <div className="animate-fadeIn">
            

            {/* Additional Session Info */}
            <div className="mt-6 bg-blue-50 rounded-xl p-6 border border-blue-100">
              <h4 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                <span className="text-lg">💡</span> Session Tips
              </h4>
              <ul className="space-y-2 text-sm text-gray-700">
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 font-bold">•</span>
                  <span>Prepare questions and goals before each session</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 font-bold">•</span>
                  <span>Take notes during the session for future reference</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 font-bold">•</span>
                  <span>Follow up with action items and progress updates</span>
                </li>
              </ul>
            </div>
          </div>
          </div>
          </div>
        )}

        {/* How It Works Tab */}
        {activeTab === "previous-sessions" && (
         <PreviousSessions/>
        )}

        {/* Sessions Tab */}
        {activeTab === "upcoming-sessions" && (
          <UpcomingSessions/>
        )}
      </div>

     

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
      `}</style>
    </div>
  );
};

export default Mentors;
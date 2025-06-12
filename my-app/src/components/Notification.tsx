import React, { useState } from "react";
import { BsBell } from "react-icons/bs";
// import { useNavigate } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
const ReminderSettings = () => {
  const [isNotificationEnabled, setIsNotificationEnabled] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="flex flex-col h-screen bg-gradient-to-br from-yellow-50 via-green-50 to-yellow-100">
      {/* Header */}
      <div className="flex justify-between items-center px-6 py-4 bg-white/80 backdrop-blur-sm border-b border-green-200 shadow-sm">
       
        <div className="flex space-x-3 text-gray-600">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 hover:text-green-600 transition-colors">
            <path d="M17 18a2 2 0 002-2v-5a2 2 0 00-2-2h-5a2 2 0 00-2 2v5a2 2 0 002 2h5zM21 19a2 2 0 01-2 2h-1a1 1 0 01-1-1v-1a1 1 0 112 0v1a1 1 0 01-1 1h1a2 2 0 012 2z" />
          </svg>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 hover:text-green-600 transition-colors">
            <path d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm0-2a8 8 0 100-16 8 8 0 000 16zm7-8A9 9 0 115 4a9 9 0 0114 0z" />
          </svg>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 hover:text-green-600 transition-colors">
            <path d="M12 22c-4.418 0-8-3.582-8-8s3.582-8 8-8 8 3.582 8 8-3.582 8-8 8zm0-18c-3.866 0-7 3.134-7 7s3.134 7 7 7 7-3.134 7-7-3.134-7-7-7z" />
          </svg>
          <div className="flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-green-600">
              <path d="M12 22c-4.418 0-8-3.582-8-8s3.582-8 8-8 8 3.582 8 8-3.582 8-8 8zm0-18c-3.866 0-7 3.134-7 7s3.134 7 7 7 7-3.134 7-7-3.134-7-7-7zm1 1H11v2h2v-2zm0 4H11v2h2v-2zm0 4H11v2h2v-2z" />
            </svg>
            
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex flex-col items-center justify-center flex-1 px-6 py-8">
        {/* Illustration with Animation */}
        <div className="flex items-center mb-12 relative">
          <div className="relative">
            <div className="w-24 h-24 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center shadow-lg animate-pulse">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" className="w-12 h-12">
                <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm0 18c-4.411 0-8-3.589-8-8s3.589-8 8-8 8 3.589 8 8-3.589 8-8 8z" />
              </svg>
            </div>
            {/* Notification bubble */}
            <div className="absolute -top-2 -right-4 transform rotate-12">
              <div className="bg-white rounded-xl shadow-lg p-3 border-2 border-green-200 min-w-max">
                <div className="flex items-center space-x-2 text-green-600">
                  <BsBell className="w-5 h-5 animate-bounce" />
                  <span className="font-medium text-sm">Reminder</span>
                </div>
              </div>
              {/* Speech bubble tail */}
              <div className="absolute bottom-0 left-4 w-0 h-0 border-l-8 border-r-8 border-t-8 border-l-transparent border-r-transparent border-t-white transform translate-y-1"></div>
            </div>
          </div>
        </div>

        {/* Question with better typography */}
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-2 leading-tight">
            Remind everyday to add your expenses?
          </h2>
          <p className="text-gray-600 text-base">
            Stay on top of your financial tracking
          </p>
        </div>

        {/* Enhanced Toggle Section */}
        <div className="w-full max-w-sm">
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-green-100">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <label htmlFor="toggle" className="text-lg font-semibold text-gray-800 cursor-pointer">
                  Show reminder notification
                </label>
                <p className="text-sm text-gray-600 mt-1">
                  Get daily reminders at 9:00 PM
                </p>
              </div>
              
              {/* Custom Toggle Switch */}
              <label className="relative inline-flex items-center cursor-pointer ml-4">
                <input 
                  type="checkbox" 
                  id="toggle" 
                  className="sr-only peer" 
                  checked={isNotificationEnabled} 
                  onChange={() => setIsNotificationEnabled(!isNotificationEnabled)} 
                />
                <div className="w-14 h-8 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 rounded-full peer peer-checked:after:translate-x-6 peer-checked:after:border-white after:content-[''] after:absolute after:top-1 after:left-1 after:bg-white after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-gradient-to-r peer-checked:from-green-400 peer-checked:to-green-500 shadow-inner"></div>
              </label>
            </div>
          </div>
        </div>

        {/* Information with better design */}
        <div className="mt-8 max-w-sm">
          <div className="flex items-start space-x-3 p-4 bg-green-50 rounded-xl border-l-4 border-green-400">
            <div className="flex-shrink-0 mt-1">
              <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 text-green-600">
                  <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm8.706-1.442c1.146-.573 2.437.463 2.126 1.706l-.709 2.836.042-.02a.75.75 0 01.67 1.34l-.04.022c-1.147.573-2.438-.463-2.127-1.706l.71-2.836-.042.02a.75.75 0 11-.671-1.34l.041-.022zM12 9a.75.75 0 100-1.5.75.75 0 000 1.5z" clipRule="evenodd" />
                </svg>
              </div>
            </div>
            <div className="flex-1">
              <p className="text-sm text-gray-700 leading-relaxed">
                Turn on reminders to get daily notifications for adding expenses. You can always change this setting later in your preferences.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Footer */}
      <div className="flex justify-between items-center px-6 py-4 bg-white/80 backdrop-blur-sm border-t border-green-200">
        <button 
          className="px-6 py-3 text-green-600 font-semibold hover:bg-green-50 rounded-lg transition-all duration-200 hover:scale-105 active:scale-95" 
          onClick={() => navigate(-1)}
        >
          ← BACK
        </button>
        <button 
          className="px-6 py-3 bg-gradient-to-r from-green-500 to-green-600 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl hover:from-green-600 hover:to-green-700 transition-all duration-200 hover:scale-105 active:scale-95" 
           onClick={() => navigate('/home')}
        >
          NEXT →
        </button>
      </div>
    </div>
  );
};

export default ReminderSettings;
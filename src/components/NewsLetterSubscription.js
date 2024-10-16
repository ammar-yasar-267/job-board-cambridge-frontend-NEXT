import React, { useState } from 'react';
import { Mail, Send, Bell } from 'lucide-react';
import axios from 'axios';
import NotificationForEmail from './NotificationForEmail';

const NewsLetterSubscription = ({ isSubscribed }) => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [notification, setNotification] = useState(null);
  const [isSubscribedChild, setIsSubscribedChild] = useState(isSubscribed);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await axios.post('/api/subscribe', { email });
      setNotification({ message: response.data.message, type: 'success' });
      setTimeout(() => {
        isSubscribed(true);
        setIsSubscribedChild(true);
        setEmail('');
      }, 3000);
    } catch (error) {
      setNotification({ message: error.response?.data?.message || 'An error occurred', type: 'error' });
      setIsLoading(false);
      setIsSubscribedChild(false);
    }

    setIsLoading(false);
  };

  const closeNotification = () => {
    setNotification(null);
  };

  return (
    <div className="max-w-6xl mx-auto bg-gradient-to-br from-green-700 to-green-600 shadow-lg rounded-lg p-10 relative overflow-hidden">
      {notification && (
        <NotificationForEmail
          message={notification.message}
          type={notification.type}
          onClose={closeNotification}
        />
      )}
      <div className="absolute top-0 right-0 -mt-8 -mr-8 w-32 h-32 bg-green-500 rounded-full opacity-20"></div>
      <div className="absolute bottom-0 left-0 -mb-8 -ml-8 w-32 h-32 bg-green-500 rounded-full opacity-20"></div>
      
      <div className="relative z-10">
        <div className="flex items-center mb-6">
          <Mail className="w-7 h-7 text-green-300 mr-2" />
          <h2 className="text-2xl font-bold text-white">Subscribe to our newsletter</h2>
        </div>
        <p className="text-green-100 mb-6 flex items-center">
          <Bell className="w-4 h-4 mr-2" />
          Stay updated with the latest job opportunities and career advice.
        </p>
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
          <div className="flex-grow relative">
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full p-4 pl-12 rounded-lg border border-green-400 bg-green-50 focus:outline-none focus:ring-2 focus:ring-green-300 transition duration-150 ease-in-out"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-green-500" />
          </div>
          <button 
            type="submit"
            disabled={isLoading}
            className="bg-green-500 hover:bg-green-400 text-white px-8 py-4 rounded-lg transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-green-300 focus:ring-offset-2 flex items-center justify-center"
          >
            <span>{isLoading ? 'Subscribing...' : 'Subscribe'}</span>
            <Send className="ml-2 w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
};

export default NewsLetterSubscription;
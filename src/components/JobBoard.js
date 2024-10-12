'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Search, Loader } from 'lucide-react';
import NewsLetterSubscription from './NewsLetterSubscription';
import NotificationForEmail from './NotificationForEmail';
import Link from 'next/link';

const JobBoard = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [notification, setNotification] = useState(null);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const router = useRouter();

  const handleSearch = async (href) => {
    if (searchTerm.trim() === '') {
      setNotification({
        message: 'Please enter a search term',
        type: 'error',
      });
      return;
    }

    setIsLoading(true);

    try {
      if (href) {
        await router.push(href);
      }
      // Perform any other async operations here
    } catch (error) {
      console.error('Search error:', error);
      setNotification({
        message: 'An error occurred during search',
        type: 'error',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      const keyword = searchTerm.trim();
      if (keyword !== '') {
        const href = `/jobsearch/${keyword}`;
        handleSearch(href);
      }
    }
  };

  return (
    <div className="min-h-5 flex flex-col font-sans">
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <img src="/logo.jpg" alt="Trovit Logo" className="w-32" />
        </div>
      </header>

      <main className="flex-grow flex flex-col">
        <div className="bg-cover bg-center py-12" style={{
          backgroundImage: 'url(/bg.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          backgroundBlendMode: 'overlay',
          height: '80vh',
        }}>
          <div className="container mx-auto px-4">
            <h1 className="text-4xl font-bold text-center text-white mb-2">Jobs Finder</h1>
            <p className="text-center text-gray-200 mb-12 max-w-2xl mx-auto">
              Job Ads from thousands of websites in just one search.
            </p>

            <div className="max-w-4xl mx-auto mb-12">
              <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
                <div className="flex-grow relative">
                  <input
                    type="text"
                    placeholder="What? Job or company name"
                    className="w-full p-4 pr-12 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-150 ease-in-out text-input bg-white"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    onKeyDown={handleKeyDown}
                  />
                  <Search className="absolute right-4 top-4 text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder="Where? City or county"
                  className="flex-grow p-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-150 ease-in-out"
                  value="Cambridge"
                  readOnly={true}
                />
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    const keyword = searchTerm.trim();
                    if (keyword !== '') {
                      const href = `/jobsearch/${keyword}`;
                      handleSearch(href);
                    }
                  }}
                  disabled={isLoading}
                  className={`flex items-center justify-center bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-lg transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 ${
                    isLoading ? 'opacity-50 cursor-not-allowed' : ''
                  }`}
                >
                  {isLoading ? (
                    <>
                      <Loader className="animate-spin mr-2" size={20} />
                      Searching...
                    </>
                  ) : (
                    'Search'
                  )}
                </button>
              </div>
            </div>

            {!isSubscribed && (
              <NewsLetterSubscription email={email} setEmail={setEmail} />
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default JobBoard;
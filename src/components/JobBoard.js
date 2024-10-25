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

    try {
      if (href) {
        setTimeout(() => {
          setIsLoading(true);
          router.push(href);
        }, 100);
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
      let keyword = searchTerm.trim();
      keyword = keyword.toLowerCase();
      if (keyword !== '') {
        const href = `/jobs/${keyword.replace(/\s+/g, '-')}-jobs-in-cambridge`;
        handleSearch(href);
      }
    }
  };

  const PostJobButton = () => (
    <button className="bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-3 rounded-lg shadow-lg flex items-center space-x-2 transition-colors duration-200">
      <svg
        className="w-5 h-5"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M12 4v16m8-8H4"
        />
      </svg>
      <span>Post a Job</span>
    </button>
  );

  const handleIsSubscribed = (subscribed) => {
    setIsSubscribed(subscribed);
  }

  return (
    <div className="min-h-5 flex flex-col font-sans">
      <header className="bg-white shadow-sm">
        <div className="container mx-auto py-4 px-4 flex justify-between items-center">
          <img src="/logo.jpg" alt="Trovit Logo" className="w-40" />
          <PostJobButton />
        </div>
      </header>

      <main className="flex-grow flex flex-col">
        <div 
          className="bg-cover bg-center py-10 flex flex-col justify-between"
          style={{
            backgroundImage: 'url(/bg.jpg)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            backgroundBlendMode: 'overlay',
            minHeight: isSubscribed ? '60vh' : '80vh', // Adjust height based on subscription status
          }}
        >
          <div className={`container mx-auto px-4 py-6 flex-grow flex flex-col gap-8`}>
            <div>
              <h1 className="text-4xl font-bold text-center text-white mb-2">Jobs in Cambridge</h1>
              <p className="text-center text-gray-200 mb-8 max-w-2xl mx-auto"> {/* Reduced margin */}
                Find jobs and vacancies in Cambridge
              </p>

              <div className="max-w-4xl py-4 mx-auto mb-8 px-4 md:px-0"> {/* Added px-4 for mobile view */}
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
                      let keyword = searchTerm.trim();
                      keyword = keyword.toLowerCase();
                      console.log('Keyword:', keyword);
                      if (keyword !== '') {
                        const href = `/jobs/${keyword.replace(/\s+/g, '-')}-jobs-in-cambridge`;
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
            </div>
            
            {!isSubscribed && (
              <NewsLetterSubscription isSubscribed={handleIsSubscribed} />
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default JobBoard;
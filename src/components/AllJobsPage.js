'use client'

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Search, Briefcase, MapPin, Clock, CreditCard, Calendar, ArrowLeft, HomeIcon, Loader } from 'lucide-react';
import FilterDrawer from './CustomFilter';

const AllJobsPage = () => {
  
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const router = useRouter();
  // const { keyword } = useParams();
  // const [jobs, setJobs] = useState([]);
  // const [isFilterOpen, setIsFilterOpen] = useState(false);
  // const [loadingJobs, setLoadingJobs] = useState(false);
  // const [filteredJobs, setFilteredJobs] = useState([]);
  // const [loading, setLoading] = useState(true);
  // const [categories, setCategories] = useState({});
  // const [loadingCategories, setLoadingCategories] = useState(true);
  // const [searchTerm, setSearchTerm] = useState('');

  // const [sortBy, setSortBy] = useState('');
  // const [datePosted, setDatePosted] = useState('');
  // const [salaryRange, setSalaryRange] = useState('');
  // const [isRemote, setIsRemote] = useState(false);
  // const [location, setLocation] = useState('');
  // const [company, setCompany] = useState('');
  // const [contractType, setContractType] = useState('');
  // const [hours, setHours] = useState('');

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
      const keyword = searchTerm.trim();
      if (keyword !== '') {
        const href = `/jobsearch/${keyword}`;
        handleSearch(href);
      }
    }
  };

  return (
    <>
      <div className="bg-green-600 p-4 md:p-6 shadow-md w-full">
        <div className="container mx-auto w-full">
          <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-4">
            <button
              aria-label="Go back to previous page"
              className="group bg-green-600 text-white p-2 rounded-md transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-gray-100"
              onClick={() => router.push('/')}
            >
              <HomeIcon className="w-6 h-6" />
            </button>
            <div className="relative flex-grow md:flex-grow-0 md:w-7/12 w-full">
              <input
                type="text"
                placeholder="What job are you looking for?"
                className="w-full p-3 pr-4 rounded-lg border-2 border-green-500 focus:outline-none focus:border-green-700"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyDown={handleKeyDown}
              />
              <Search className="absolute right-3 top-3 text-green-600" />
            </div>
            <input
              type="text"
              placeholder="Cambridge"
              className="w-full md:w-1/4 p-3 rounded-lg border-2 border-green-500 focus:outline-none focus:border-green-700"
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
              className={`w-full md:w-auto bg-green-700 text-white px-6 py-3 rounded-lg hover:bg-green-800 transition duration-300 ${
                isLoading ? 'opacity-50 cursor-not-allowed' : ''
              } flex items-center justify-center`}
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
    </>
  );
};  

export default AllJobsPage;
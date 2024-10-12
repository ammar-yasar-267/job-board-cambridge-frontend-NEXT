'use client'

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { useRouter } from 'next/navigation';
import Head from 'next/head';
import { Search, Briefcase, MapPin, Clock, CreditCard, Calendar, HomeIcon } from 'lucide-react';

const AllJobsFromCategoryPage = () => {

  const params = useParams();
  const keyword = params.keyword;
  const Router = useRouter();

  const [staticHtml, setStaticHtml] = useState('');
  const [metadata, setMetadata] = useState(null);
  const [structuredData, setStructuredData] = useState(null);
  const { category } = useParams();
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState({});
  const [loadingCategories, setLoadingCategories] = useState(true);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = () => {
    if (searchTerm) {
      Router.push(`/jobsearch/${searchTerm}`);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <>
      <div className="bg-green-600 p-4 md:p-6 shadow-md">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-4">
            <button
              aria-label="Go back to previous page"
              className="group bg-green-600 text-white p-2 rounded-md transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-gray-100"
              onClick={() => Router.push('/')}
            >
              <HomeIcon className="w-6 h-6" />
            </button>
            <div className="relative flex-grow md:flex-grow-0 md:w-7/12 w-full">
              <input
                type="text"
                placeholder="What job are you looking for?"
                className="w-full p-3 pr-4 rounded-lg border-2 border-green-500 focus:outline-none focus:border-green-700"
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
              onClick={handleSearch}
              className="w-full md:w-auto bg-green-700 text-white px-6 py-3 rounded-lg hover:bg-green-800 transition duration-300"
            >
              Search Jobs
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default AllJobsFromCategoryPage;
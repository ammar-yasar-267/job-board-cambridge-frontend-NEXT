'use client'

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import AllJobsPage from './AllJobsPage.js';
import FilterDrawer from './FilterDrawer.js';
import JobsList from './JobsList.js';
import CategoriesFooterForJobsPage from './CategoriesFooterForJobsPage.js';

export default function JobsPageWrapper({ keyword, initialJobs, categories }) {
  const [jobs, setJobs] = useState(initialJobs);
  const [categoriesData, setCategoriesData] = useState(categories);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();

  

const Footer = () => (
  <footer className="bg-gray-200 border-t">
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="flex flex-col lg:flex-row justify-between items-start">
        {/* About Column */}
        <div className="mb-8 lg:mb-0 lg:w-1/3 lg:pr-8">
          <h3 className="text-gray-700 font-semibold mb-4">About Jobs in Cambridge</h3>
          <p className="text-gray-600 text-sm">
            Find jobs and vacancies in Cambridge.<br /> Your local job search starts here.
          </p>
          <div className="mt-8">
            <Link href="/" className="text-green-600 hover:text-green-700 font-semibold text-lg">
              Jobs In Cambridge
            </Link>
          </div>
        </div>

        {/* Vertical Divider */}
        <div className="hidden lg:block w-px bg-gray-300 h-40 self-center" />

        {/* Support */}
        <div className="mb-8 lg:mb-0 lg:w-1/3 lg:px-8">
          <h3 className="text-gray-700 font-semibold mb-4">Support</h3>
          <ul className="space-y-2">
            <li>
              <a href="mailto:support@jobsincambs.com" className="text-gray-600 hover:text-green-600 text-sm">
                support@jobsincambs.com
              </a>
            </li>
          </ul>
        </div>

        {/* Vertical Divider */}
        <div className="hidden lg:block w-px bg-gray-300 h-40 self-center" />

        {/* Jobs */}
        <div className="mb-8 lg:mb-0 lg:w-1/3 lg:pl-8">
          <h3 className="text-gray-700 font-semibold mb-4">Jobs</h3>
          <ul className="space-y-2">
            <li>
              <Link href="/" className="text-gray-600 hover:text-green-600 text-sm">
                Post a Job
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-gray-300 mt-12 pt-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-500 text-sm">
            © {new Date().getFullYear()} JobsInCambridge. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  </footer>
);

  useEffect(() => {
    setJobs(initialJobs);
  }, [initialJobs]);

  const handleFilterChange = (newFilters) => {
    const updatedSearchParams = new URLSearchParams(searchParams);
    Object.entries(newFilters).forEach(([key, value]) => {
      if (value) {
        updatedSearchParams.set(key, value);
      } else {
        updatedSearchParams.delete(key);
      }
    });
    router.push(`/jobs/${keyword.replace(/\s+/g, '-')}?${updatedSearchParams.toString()}`);
  };

  return (
    <>
    <div className="min-h-screen bg-gray-100">
      <AllJobsPage />
      <div className="container mx-auto px-4 py-4">
        <h1 className="text-3xl text-green-600 font-bold mb-6 py-4 border-b-4 border-green-500">
          {/* {jobs.length}  */}
          {keyword} jobs in Cambridge
        </h1>
        <div className="rounded-lg mb-4 transition duration-300 flex flex-col md:flex-row gap-10">
          <div className="md:w-1/4">
          <button onClick={() => setIsFilterOpen(true)} className="md:hidden">
            Open Filters
          </button>
          <FilterDrawer
            isOpen={isFilterOpen}
            onClose={() => setIsFilterOpen(false)}
            onFilterChange={handleFilterChange}
            initialFilters={Object.fromEntries(searchParams)} />
            <div className='hidden md:block'>
              <CategoriesFooterForJobsPage categories={categoriesData} />
            </div>
          </div>
          <div className="md:w-3/4">
            <JobsList jobs={jobs} categories={categories} />
          </div>
        </div>
      </div>
      <div className="md:hidden">
        <CategoriesFooterForJobsPage categories={categoriesData} />
      </div>
      <Footer/>
    </div>
    </>
  );
}
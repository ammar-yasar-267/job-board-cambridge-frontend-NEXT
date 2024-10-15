'use client'

import { useState, useEffect } from 'react';
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
    router.push(`/jobsearch/${keyword}?${updatedSearchParams.toString()}`);
  };

  return (
    <><div className="min-h-screen bg-gray-100">
      <AllJobsPage />
      <div className="container mx-auto px-4 py-4">
      <div className="p-6 rounded-lg mb-4 transition duration-300 flex flex-col md:flex-row gap-10">
        <div className="md:w-1/4">
          <FilterDrawer
            isOpen={isFilterOpen}
            onClose={() => setIsFilterOpen(false)}
            onFilterChange={handleFilterChange}
            initialFilters={Object.fromEntries(searchParams)} />
          <button onClick={() => setIsFilterOpen(true)} className="md:hidden">
            <span>Filters</span>
          </button>
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
      
    </div>
    </>
  );
}
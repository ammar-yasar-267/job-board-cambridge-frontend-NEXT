'use client';

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Loader } from 'lucide-react';

export default function FooterClient({ categories }) {
  const [loadingStates, setLoadingStates] = useState({});
  const router = useRouter();

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

  const handleClick = (e, href) => {
    e.preventDefault();
    const keyword = href.split('/').pop();
    
    setTimeout(() => {
      setLoadingStates(prev => ({ ...prev, [keyword]: true }));
      router.push(href);
    }, 100);
  };

  return (
    <><div className="bg-white p-4">
      <h2 className="text-center text-xl py-4 font-bold text-gray-700 mb-4">Browse by category</h2>
      <div className="grid py-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-8">
        {Object.entries(categories).map(([category, items]) => (
          <div key={category}>
            <h3 className="text-lg font-medium mb-3 text-gray-700">{category}</h3>
            <ul className="space-y-2">
              {items.map(item => (
                <li key={`${category}-${item.pageName}`} className="flex items-center">
                  <Link href={`/category/${item.keyword.toLowerCase().replace(/\s+/g, '-')}-jobs-in-cambridge`} onClick={(e) => handleClick(e, `/category/${item.keyword.toLowerCase().replace(/\s+/g, '-')}-jobs-in-cambridge`)}>
                    <span className="text-green-600 hover:text-green-800 hover:underline text-sm transition duration-150 ease-in-out cursor-pointer">
                      {item.keyword} jobs in Cambridge
                    </span>
                  </Link>
                  {loadingStates[item.keyword] && (
                    <Loader className="animate-spin ml-2" width={16} height={16} />
                  )}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
    
    <Footer /></>
  );
}

FooterClient.propTypes = {
  categories: PropTypes.object.isRequired,
};
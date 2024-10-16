'use client';

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Loader } from 'lucide-react';

export default function FooterClient({ categories }) {
  const [loadingStates, setLoadingStates] = useState({});
  const router = useRouter();

  const handleClick = (e, href) => {
    e.preventDefault();
    const keyword = href.split('/').pop();
    
    setTimeout(() => {
      setLoadingStates(prev => ({ ...prev, [keyword]: true }));
      router.push(href);
    }, 100);
  };

  return (
    <div className="bg-white p-4">
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
  );
}

FooterClient.propTypes = {
  categories: PropTypes.object.isRequired,
};
import React from 'react';
import Link from 'next/link';

const Categories = ({ categories }) => (
    <div className="bg-white py-5 rounded-lg shadow-md p-6">
        <h3 className="font-bold text-xl mb-4 text-gray-800">Explore Categories</h3>
        <div className="space-y-6">
            {Object.entries(categories).map(([category, items]) => (
                <div key={category}>
                    <h3 className="text-lg font-medium mb-3 text-gray-700">{category}</h3>
                    <ul className="space-y-2">
                        {items.map((item) => (
                            <li key={item.pageName}>
                                <Link href={`/category/${item.keyword.toLowerCase().replace(/\s+/g, '-')}-jobs-in-cambridge`}>
                                    <span className="text-green-600 hover:text-green-800 hover:underline text-sm transition duration-150 ease-in-out cursor-pointer">
                                        {item.keyword} jobs in Cambridge
                                    </span>
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            ))}
        </div>
    </div>
);

  export default function CategoriesFooterForJobsPage({ categories }) {
    return (
        <Categories categories={categories} />
    );
  }
import React from 'react';
import Link from 'next/link';

async function getCategories() {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/footer`, {
      cache: 'no-store', 
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    const categoriesData = data.reduce((acc, item) => {
      if (!acc[item.PageCategory]) {
        acc[item.PageCategory] = [];
      }
      acc[item.PageCategory].push({
        keyword: item.PageKeyword,
        pageName: item.PageName,
      });
      return acc;
    }, {});

    return categoriesData;
  } catch (error) {
    console.error('Error fetching categories:', error);
    return null;
  }
}

export default async function Footer() {
  const categories = await getCategories();

  if (!categories) {
    return <div>Error loading categories</div>;
  }

  return (
    <div className="bg-white p-4">
      <h2 className="text-center text-xl py-4 font-bold text-gray-700 mb-4">Browse by category</h2>
      <div className="grid py-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-8">
        {Object.entries(categories).map(([category, items]) => (
          <div key={category}>
            <h3 className="text-lg font-medium mb-3 text-gray-700">{category}</h3>
            <ul className="space-y-2">
            {items.map(item => (
            <li key={`${category}-${item.pageName}`}>
              <Link href={`/category/${item.keyword}`}>
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
}

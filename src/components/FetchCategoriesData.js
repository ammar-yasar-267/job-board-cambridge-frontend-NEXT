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
  
async function fetchStaticHtml(keyword) {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/jobs/${keyword}`,{
            cache: 'no-store', 
            headers: {
              'Content-Type': 'application/json',
            },
          });

        const { pageData, metadata } = await response.json();
        const staticHtml = pageData[0].PageContentReact
        return staticHtml;

    } catch (error) {
        console.error('Error fetching static HTML:', error);
    }
}

  export default async function CategoriesData({ keyword }) {

    console.log('Try');
    const categories = await getCategories();
    const staticHtml = await fetchStaticHtml(keyword);

    if (!categories) {
        return <div>Error loading categories</div>;
    }

    return (
    <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row gap-8">
            <div className="hidden md:block w-full md:w-1/4 gap-x-4">
            <div className="bg-white py-5 rounded-lg shadow-md p-6">
            <h3 className="font-bold text-xl mb-4 text-gray-800">Explore Categories</h3>
            <div className="space-y-6">
                {Object.entries(categories).map(([category, items]) => (
                    <div key={category}>
                    <h3 className="text-lg font-medium mb-3 text-gray-700">{category}</h3>
                    <ul className="space-y-2">
                        {items.map((item) => (
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
        </div>
        <div className="w-full md:flex-grow">
            <div dangerouslySetInnerHTML={{ __html: staticHtml }} />
        </div>
        <div className="block md:hidden mt-8">
            <div className="bg-white py-5 rounded-lg shadow-md p-6">
            <h3 className="font-bold text-xl mb-4 text-gray-800">Explore Categories</h3>
            <div className="space-y-6">
                {Object.entries(categories).map(([category, items]) => (
                    <div key={category}>
                    <h3 className="text-lg font-medium mb-3 text-gray-700">{category}</h3>
                    <ul className="space-y-2">
                        {items.map((item) => (
                        <li key={item.pageName}>
                            <a href={`/category/${item.keyword}`} className="text-green-600 hover:text-green-800 hover:underline text-sm transition duration-150 ease-in-out">
                            {item.keyword} jobs in Cambridge
                            </a>
                        </li>
                        ))}
                    </ul>
                    </div>
                ))}
            </div>
            </div>
        </div>
        </div>
    </div>
    );
}
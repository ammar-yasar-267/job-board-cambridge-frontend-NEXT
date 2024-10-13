import React from 'react';
import FooterClient from './FooterClient';

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

export default async function FooterServer() {
  const categories = await getCategories();

  if (!categories) {
    return <div>Error loading categories</div>;
  }

  return <FooterClient categories={categories} />;
}
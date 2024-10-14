    async function fetchCategories() {
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

    export default async function sitemap() {
        const baseURL = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'
        const categories = await fetchCategories();
    
        const sitemap = Object.keys(categories || {}).reduce((acc, category) => {
            const pages = categories[category];
            pages.forEach((page) => {
                acc.push({
                    url: `${baseURL}/category/${page.keyword}`,
                    lastModified: new Date(),
                    changeFrequency: 'daily',
                    priority: 0.8,
                });

                acc.push({
                    url: `${baseURL}/jobsearch/${page.keyword}`,
                    lastModified: new Date(),
                    changeFrequency: 'daily',
                    priority: 0.7, // You might want to adjust this priority
                });
            });
            return acc;
        }, []); // Initialize acc as an empty array
    
        return [
            {
                url: `${baseURL}/`,
                lastModified: new Date(),
                changeFrequency: 'weekly',
                priority: 1,
            },
            ...sitemap,
        ]
    }
async function fetchJobs(keyword, filters) {
  console.log('Fetching jobs for:', keyword);
    const queryParams = new URLSearchParams(filters).toString();
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/${keyword}-jobs-in-cambridge${queryParams ? `?${queryParams}` : ''}`);
    const data = await response.json();
    if (!response.ok) {
      throw new Error('Failed to fetch jobs');
    }
    return data;
  }

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

  export { fetchJobs, fetchCategories };
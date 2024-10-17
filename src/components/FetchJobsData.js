import React from 'react';
import Link from 'next/link';
import FilterDrawer from './CustomFilter';
import { MapPin, CreditCard, Briefcase, Clock, Calendar } from 'react-icons/fi'; // Importing icons from react-icons/fi

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

  async function fetchJobs(keyword) {
    try {
      const queryParams = new URLSearchParams({
        ...(sortBy && { sortBy }),
        ...(datePosted && { datePosted }),
        ...(salaryRange && { salaryRange }),
        ...(isRemote && { isRemote: true }),
        ...(location && { location }),
        ...(company && { company }),
        ...(contractType && { contractType }),
        ...(hours && { hours })
      }).toString();

      const url = `${process.env.NEXT_PUBLIC_API_URL}/${keyword}-jobs-in-cambridge${queryParams ? `?${queryParams}` : ''}`;

      const response = await fetch(url);
      const count = await response.total_jobs;
      const data = await response.jobs.json();

      if (data && Array.isArray(data)) {
        setJobs(data);
        setFilteredJobs(data); // Set filteredJobs initially to all jobs
      } else {
        setJobs([]);
        setFilteredJobs([]);
      }
    } catch (error) {
      console.error('Error fetching jobs:', error);
    }
}

  export default async function JobsData({ keyword }) {

    console.log('Try');
    const categories = await getCategories();
    console.log('Categories:', categories);
    const jobs = await fetchJobs(keyword);

    if (!categories) {
        return <div>Error loading categories</div>;
    }

    return (
        <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-semibold text-green-600 mb-4">Search Results for {keyword} Jobs in Cambridge: {jobs.count}</h1>
        <div className="flex flex-col md:flex-row gap-8">

        <FilterDrawer
            isOpen={isFilterOpen}
            onClose={setIsFilterOpen}
            sortBy={sortBy}
            setSortBy={setSortBy}
            datePosted={datePosted}
            setDatePosted={setDatePosted}
            salaryRange={salaryRange}
            setSalaryRange={setSalaryRange}
            contractType={contractType}
            setContractType={setContractType}
            hours={hours}
            setHours={setHours}
          />

          {/* Filter Drawer for Mobile */}
          {isFilterOpen && (
            <div className="md:hidden bg-white rounded-lg shadow-md p-6 mb-8">
              <FilterSection title="Sort by">
              <select
                className="w-full p-2 border rounded-md"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="">Default</option>
                <option value="relevance">Relevance</option>
                <option value="date_asc">Date posted</option>
                <option value="salary_asc">Salary (Low to High)</option>
                <option value="salary_desc">Salary (High to Low)</option>
              </select>
            </FilterSection>

            <FilterSection title="Date posted">
              <select
                className="w-full p-2 border rounded-md"
                value={datePosted}
                onChange={(e) => setDatePosted(e.target.value)}
              >
                <option value="">Any time</option>
                <option value="1">Last 24 hours</option>
                <option value="7">Last 7 days</option>
                <option value="30">Last 30 days</option>
              </select>
            </FilterSection>

            <FilterSection title="Salary">
              <select
                className="w-full p-2 border rounded-md"
                value={salaryRange}
                onChange={(e) => setSalaryRange(e.target.value)}
              >
                <option value="">Any</option>
                <option value="0-30000">Up to £30,000</option>
                <option value="30000-50000">£30,000 - £50,000</option>
                <option value="50000-75000">£50,000 - £75,000</option>
                <option value="75000-100000">£75,000 - £100,000</option>
                <option value="100000-999999">£100,000+</option>
              </select>
            </FilterSection>

            <FilterSection title="Contract type">
              <select
                className="w-full p-2 border rounded-md"
                value={contractType}
                onChange={(e) => setContractType(e.target.value)}
              >
                <option value="">Any</option>
                <option value="permanent">Permanent</option>
                <option value="contract">Contract</option>
              </select>
            </FilterSection>

            <FilterSection title="Hours" last={true}>
              <select
                className="w-full p-2 border rounded-md"
                value={hours}
                onChange={(e) => setHours(e.target.value)}
              >
                <option value="">Any</option>
                <option value="full_time">Full Time</option>
                <option value="part_time">Part Time</option>
              </select>
            </FilterSection>
            </div>
          )}

          {/* Desktop Filter Section */}
          <div className="hidden md:block w-full md:w-1/4 gap-x-4">
            <div className="bg-white rounded-lg shadow-md p-6 mb-8">
              <h3 className="font-bold text-xl mb-4 text-gray-800">Filter Results</h3>
              <FilterSection title="Sort by">
              <select
                className="w-full p-2 border rounded-md"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="">Default</option>
                <option value="relevance">Relevance</option>
                <option value="date_asc">Date posted</option>
                <option value="salary_asc">Salary (Low to High)</option>
                <option value="salary_desc">Salary (High to Low)</option>
              </select>
            </FilterSection>

            <FilterSection title="Date posted">
              <select
                className="w-full p-2 border rounded-md"
                value={datePosted}
                onChange={(e) => setDatePosted(e.target.value)}
              >
                <option value="">Any time</option>
                <option value="1">Last 24 hours</option>
                <option value="7">Last 7 days</option>
                <option value="30">Last 30 days</option>
              </select>
            </FilterSection>

            <FilterSection title="Salary">
              <select
                className="w-full p-2 border rounded-md"
                value={salaryRange}
                onChange={(e) => setSalaryRange(e.target.value)}
              >
                <option value="">Any</option>
                <option value="0-30000">Up to £30,000</option>
                <option value="30000-50000">£30,000 - £50,000</option>
                <option value="50000-75000">£50,000 - £75,000</option>
                <option value="75000-100000">£75,000 - £100,000</option>
                <option value="100000-999999">£100,000+</option>
              </select>
            </FilterSection>

            <FilterSection title="Contract type">
              <select
                className="w-full p-2 border rounded-md"
                value={contractType}
                onChange={(e) => setContractType(e.target.value)}
              >
                <option value="">Any</option>
                <option value="permanent">Permanent</option>
                <option value="contract">Contract</option>
              </select>
            </FilterSection>

            <FilterSection title="Hours" last={true}>
              <select
                className="w-full p-2 border rounded-md"
                value={hours}
                onChange={(e) => setHours(e.target.value)}
              >
                <option value="">Any</option>
                <option value="full_time">Full Time</option>
                <option value="part_time">Part Time</option>
              </select>
            </FilterSection>
              {/* Add more filter sections as needed */}
            </div>

            <div className="bg-white py-5 rounded-lg shadow-md p-6">
              <h3 className="font-bold text-xl mb-4 text-gray-800">Explore Categories</h3>
              {!loadingCategories && (
                <div className="space-y-6">
                  {Object.entries(categories).map(([category, items]) => (
                    <div key={category}>
                      <h3 className="text-lg font-medium mb-3 text-gray-700">{category}</h3>
                      <ul className="space-y-2">
                        {items.map((item) => (
                          <li key={item.pageName}>
                            <a
                              href={`/category/${item.keyword}`}
                              className="text-green-600 hover:text-green-800 hover:underline text-sm transition duration-150 ease-in-out"
                            >
                              {item.keyword} jobs in Cambridge
                            </a>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Job Listings Section */}
          <div className="w-full md:w-3/4">
            {loading ? (
              <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-green-500"></div>
              </div>
            ) : (
              <>
                {jobs.length > 0 ? (
                  jobs.map((job, index) => <JobCard key={job.id || index} job={job} />)
                ) : (
                  <div className="bg-white p-6 rounded-lg shadow-md">
                    <p className="text-gray-600">No jobs found matching your criteria.</p>
                  </div>
                )}
              </>
            )}
          </div>

          {/* Categories Section for Mobile */}
        <div className="block md:hidden mt-8">
          <div className="bg-white py-5 rounded-lg shadow-md p-6">
            <h3 className="font-bold text-xl mb-4 text-gray-800">Explore Categories</h3>
            {!loadingCategories && (
              <div className="space-y-6">
                {Object.entries(categories).map(([category, items]) => (
                  <div key={category}>
                    <h3 className="text-lg font-medium mb-3 text-gray-700">{category}</h3>
                    <ul className="space-y-2">
                      {items.map((item) => (
                        <li key={item.pageName}>
                          <a
                            href={`/category/${item.keyword}`}
                            className="text-green-600 hover:text-green-800 hover:underline text-sm transition duration-150 ease-in-out"
                          >
                            {item.keyword} jobs in Cambridge
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
    );
}

const FilterSection = ({ title, children, last = false }) => (
    <div className={`py-3 ${!last ? 'border-b border-gray-200' : ''}`}>
      <h4 className="font-semibold text-gray-700 mb-2">{title}</h4>
      {children}
    </div>
  );
  
  const JobCard = ({ job }) => {
    const [showFullDescription, setShowFullDescription] = useState(false);
  
    const toggleDescription = () => {
      // Toggle the showFullDescription state
    };
  
    return (
      <div className="bg-white p-6 rounded-lg shadow-md mb-4 hover:shadow-lg transition duration-300">
        <h3 className="text-xl font-semibold mb-2 text-green-600">{job.job_title}</h3>
        <p className="font-semibold text-gray-700">{job.company}</p>
        <div className="flex flex-wrap items-center mt-2 text-gray-600">
          <div className="flex items-center mr-4 mb-2">
            <MapPin size={18} className="mr-1" />
            <span>{job.location}</span>
          </div>
          <div className="flex items-center mr-4 mb-2">
            <CreditCard size={18} className="mr-1" />
            <span>£{job.salary_min} - £{job.salary_max} {job.salary_max ? 'Per Year' : ''}</span>
          </div>
          {job.contract_type && (
            <div className="flex items-center mr-4 mb-2">
              <Briefcase size={18} className="mr-1" />
              <span>{job.contract_type === 'permanent' ? 'Permanent' : job.contract_type === 'contract' ? 'Contract' : job.contract_type}</span>
            </div>
          )}
          {job.contract_time && (
            <div className="flex items-center mr-4 mb-2">
              <Clock size={18} className="mr-1" />
              <span>{job.contract_time === 'part_time' ? 'Part Time' : job.contract_time === 'full_time' ? 'Full Time' : job.contract_time}</span>
            </div>
          )}
          {job.date_posted && (
            <div className="flex items-center mb-2">
              <Calendar size={18} className="mr-1" />
              <span>Posted {new Date(job.date_posted).toLocaleDateString()}</span>
            </div>
          )}
        </div>
        {/* <div class="mt-4">
              <p class="text-gray-700">
                ${job.description.length > 280 ? `
                  <span class="job-description">
                    <span class="truncated-description">${job.description.substring(0, 280)}...</span>
                    <span class="full-description">${job.description}</span>
                    <a href="${job.redirect_url}" target="_blank" rel="noopener noreferrer"><button class="show-more-button">Show more</button>
                  </span>
                ` : job.description}
              </p>
            </div> */}
        <div className="mt-4">
          <p className="text-gray-700">
            {showFullDescription ? job.description : `${job.description.substring(0, 250)}...`}
            <a href={job.redirect_url} target="_blank" rel="nofollow noopener noreferrer"><button onClick={toggleDescription} className="text-green-600 hover:underline ml-2">
              {showFullDescription ? 'Show less' : 'Show more'}
            </button></a>
          </p>
        </div>
        <div className="mt-4">
          <a 
            href={job.redirect_url} 
            target="_blank" 
            rel="nofollow noopener noreferrer" 
            className="inline-block bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition duration-300"
          >
            View Job
          </a>
        </div>
      </div>
    );
  };
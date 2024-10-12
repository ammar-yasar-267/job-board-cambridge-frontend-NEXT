import React from 'react';
import Link from 'next/link';
import { Search, Briefcase, MapPin, Clock, CreditCard, Calendar } from 'lucide-react';

const Categories = ({ categories }) => (
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

const JobCard = ({ job }) => (
    <div className="bg-white w-fit p-6 rounded-lg shadow-md mb-6 hover:shadow-lg transition duration-300">
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
          <div className="mt-4">
            <p className="text-gray-700">
              {job.description}
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

export default function JobsList({ jobs, categories }) {
    return (
      <div className="w-full">
        {Array.isArray(jobs) && jobs.map((job) => (
          <JobCard key={job.id} job={job} />
        ))}
      </div>
    );
  }
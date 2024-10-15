import JobsPageWrapper from '../../../components/JobsPageWrapper.js';
import { fetchJobs, fetchCategories } from '../../../utils/api.js';

export async function generateMetadata({ params }) {
  const { keyword } = params;

  return {
      title: `${keyword} Jobs in Cambridge | Jobs in Cambridge`,
      description: `Find the latest ${keyword} job opportunities in Cambridge. Browse our curated list of positions with top companies.`,
      openGraph: {
          title: `${keyword} Jobs in Cambridge | Jobs in Cambridge`,
          description: `Find the latest ${keyword} job opportunities in Cambridge. Browse our curated list of positions with top companies.`,
          url: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://job-board-cambridge-frontend-next.vercel.app'}/jobsearch/${keyword}`,
          type: 'website',
      },
      robots: {
          index: true,
          follow: true,
      },
      alternates: {
          canonical: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://job-board-cambridge-frontend-next.vercel.app'}/jobsearch/${keyword}`,
      },
  };
}

export default async function JobSearch({ params, searchParams }) {
  const { keyword } = params;
  const initialJobs = await fetchJobs(keyword, searchParams);
  const categories = await fetchCategories();

  return <JobsPageWrapper keyword={keyword} initialJobs={initialJobs} categories={categories}/>;
}
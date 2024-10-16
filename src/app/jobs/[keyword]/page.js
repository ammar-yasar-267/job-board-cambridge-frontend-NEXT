import JobsPageWrapper from '../../../components/JobsPageWrapper.js';
import { fetchJobs, fetchCategories } from '../../../utils/api.js';

export async function generateMetadata({ params }) {
  const { keyword } = params;

  const keywordParts = keyword.split('-');
  const formattedKeyword = keywordParts.slice(0, keywordParts.length - 3).join(' ');
  const formattedKeywordWithHyphens = formattedKeyword.replace(/ /g, '-');
  const capitalizeFirstLetter = (str) => str.charAt(0).toUpperCase() + str.slice(1);
  const formattedKeywordCapitalized = formattedKeyword.split(' ').map(capitalizeFirstLetter).join(' ');
  return {
      title: `${formattedKeywordCapitalized} Jobs in Cambridge | Jobs in Cambridge`,
      description: `Find the latest ${formattedKeyword} job opportunities in Cambridge. Browse our curated list of positions with top companies.`,
      openGraph: {
          title: `${formattedKeyword} Jobs in Cambridge | Jobs in Cambridge`,
          description: `Find the latest ${formattedKeyword} job opportunities in Cambridge. Browse our curated list of positions with top companies.`,
          url: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://job-board-cambridge-frontend-next.vercel.app'}/jobs/${formattedKeywordWithHyphens}-jobs-in-cambridge`,
          type: 'website',
      },
      robots: {
          index: true,
          follow: true,
      },
      alternates: {
          canonical: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://job-board-cambridge-frontend-next.vercel.app'}/jobs/${formattedKeyword.toLowerCase()}-jobs-in-cambridge`,
      },
  };
}

export default async function JobSearch({ params, searchParams }) {
  const keyword = params.keyword.split('-jobs-in-cambridge')[0].replace(/-/g, ' ');
  const keywordParts = keyword.split(' ');
  const formattedKeyword = keywordParts.join(' ');
  const capitalizeFirstLetter = (str) => str.charAt(0).toUpperCase() + str.slice(1);
  const formattedKeywordCapitalized = formattedKeyword.split(' ').map(capitalizeFirstLetter).join(' ');

  console.log('Keyword Capitalized: ', formattedKeywordCapitalized);

  const initialJobs = await fetchJobs(keyword, searchParams);
  const categories = await fetchCategories();

  return <JobsPageWrapper keyword={formattedKeywordCapitalized} initialJobs={initialJobs} categories={categories}/>;
}
import JobsPageWrapper from '../../../components/JobsPageWrapper.js';
import { fetchJobs, fetchCategories } from '../../../utils/api.js';

export default async function JobSearch({ params, searchParams }) {
  const { keyword } = params;
  const initialJobs = await fetchJobs(keyword, searchParams);
  const categories = await fetchCategories();

  return <JobsPageWrapper keyword={keyword} initialJobs={initialJobs} categories={categories}/>;
}
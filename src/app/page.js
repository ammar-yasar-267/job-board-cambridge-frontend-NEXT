import JobBoardPage from '@/components/JobBoardPage';

export const metadata = {
  title: 'Jobs in Cambridge | Find thousands of jobs in Cambridge in just one click',
  description: 'Find the best jobs in Cambridge. Apply to the latest jobs in Cambridge and get hired quickly. Find the best jobs in Cambridge. Apply to the latest jobs in Cambridge and get hired quickly.',
  openGraph: {
    title: 'Jobs in Cambridge | Find thousands of jobs in Cambridge in just one click',
    description: 'Find the best jobs in Cambridge. Apply to the latest jobs in Cambridge and get hired quickly. Find the best jobs in Cambridge. Apply to the latest jobs in Cambridge and get hired quickly.',
    url: 'https://jobsincambs.com',
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: 'https://jobsincambs.com',
  },
}

export default async function Home() {
  return (
    <JobBoardPage />
  );
}
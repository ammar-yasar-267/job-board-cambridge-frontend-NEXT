import JobBoard from './JobBoard'; // Ensure JobBoard is a Client Component
import FooterServer from './FooterServer';

export default function JobBoardPage() {
  return (
    <>
      <div className="flex flex-col min-h-screen">
      <JobBoard />
      <FooterServer />
    </div>
    </>
  );
}

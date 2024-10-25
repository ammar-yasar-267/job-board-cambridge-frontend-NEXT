import LoadMetaDataForCategoriesPage from "./LoadMetaDataForCategoriesPage";
import AllJobsFromCategoryPage from "./AllJobsFromCategoryPage";
import FetchCategoriesData from "./FetchCategoriesData";
import Link from "next/link";

export default function MainCategoriesPage({ keyword }) {

const Footer = () => (
    <footer className="bg-gray-200 border-t">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="flex flex-col lg:flex-row justify-between items-start">
          {/* About Column */}
          <div className="mb-8 lg:mb-0 lg:w-1/3 lg:pr-8">
            <h3 className="text-gray-700 font-semibold mb-4">About Jobs in Cambridge</h3>
            <p className="text-gray-600 text-sm">
              Find jobs and vacancies in Cambridge.<br /> Your local job search starts here.
            </p>
            <div className="mt-8">
              <Link href="/" className="text-green-600 hover:text-green-700 font-semibold text-lg">
                Jobs In Cambridge
              </Link>
            </div>
          </div>
  
          {/* Vertical Divider */}
          <div className="hidden lg:block w-px bg-gray-300 h-40 self-center" />
  
          {/* Support */}
          <div className="mb-8 lg:mb-0 lg:w-1/3 lg:px-8">
            <h3 className="text-gray-700 font-semibold mb-4">Support</h3>
            <ul className="space-y-2">
              <li>
                <a href="mailto:support@jobsincambs.com" className="text-gray-600 hover:text-green-600 text-sm">
                  support@jobsincambs.com
                </a>
              </li>
            </ul>
          </div>
  
          {/* Vertical Divider */}
          <div className="hidden lg:block w-px bg-gray-300 h-40 self-center" />
  
          {/* Jobs */}
          <div className="mb-8 lg:mb-0 lg:w-1/3 lg:pl-8">
            <h3 className="text-gray-700 font-semibold mb-4">Jobs</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-gray-600 hover:text-green-600 text-sm">
                  Post a Job
                </Link>
              </li>
            </ul>
          </div>
        </div>
  
        <div className="border-t border-gray-300 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-500 text-sm">
              © {new Date().getFullYear()} JobsInCambridge. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
    return (
        <>
        {console.log('MainCategoriesPage keyword:', keyword)}
        <div className="min-h-screen bg-gray-100">
            <LoadMetaDataForCategoriesPage keyword={keyword} />
            <AllJobsFromCategoryPage keyword={keyword} />
            <FetchCategoriesData keyword={keyword}/>
            <Footer />
        </div>
        </>
    );
}
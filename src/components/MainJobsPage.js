import AllJobsPage from "./AllJobsPage"
import FetchJobsData from "./FetchJobsData"

export default function MainJobsPage({ keyword }) {
    return (
        <>
        {console.log('Jobs keyword:', keyword)}
        <div className="min-h-screen bg-gray-200">
            <AllJobsPage />
            <FetchJobsData keyword={keyword}/>
        </div>
        </>
    )
}
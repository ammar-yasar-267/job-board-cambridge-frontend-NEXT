import LoadMetaDataForCategoriesPage from "./LoadMetaDataForCategoriesPage";
import AllJobsFromCategoryPage from "./AllJobsFromCategoryPage";
import FetchCategoriesData from "./FetchCategoriesData";

export default function MainCategoriesPage({ keyword }) {
    return (
        <>
        {console.log('MainCategoriesPage keyword:', keyword)}
        <div className="min-h-screen bg-gray-100">
            <LoadMetaDataForCategoriesPage keyword={keyword} />
            <AllJobsFromCategoryPage keyword={keyword} />
            <FetchCategoriesData keyword={keyword}/>
        </div>
        </>
    );
}
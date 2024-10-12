import MainCategoriesPage from '../../../components/MainCategoriesPage.js';

export default function Category({ params }) {
    const { keyword } = params;

    return (
        <>
            {console.log('keyword:', keyword)}
            <MainCategoriesPage keyword={keyword} />
        </>
    );
}
async function getMetaData(keyword) {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/jobs/${keyword}`, {
            cache: 'no-store',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        const { pageData, metadata } = await response.json();
        return metadata;
    } catch (error) {
        console.error('Error fetching metadata:', error);
        return null;
    }
}

export async function generateMetadata({ params }) {
    const keyword = params.keyword;
    const metadata = await getMetaData(keyword);

    if (!metadata) {
        return {
            title: 'Error loading metadata',
        };
    }

    return {
        title: metadata.title,
        description: metadata.description,
        openGraph: {
            title: metadata.title,
            description: metadata.description,
            url: metadata.canonicalUrl,
            type: 'website',
        },
        robots: {
            index: true,
            follow: true,
        },
        alternates: {
            canonical: metadata.canonicalUrl,
        },
    };
}

export default async function CategoryPage({ keyword }) {
    const metadata = await getMetaData(keyword);

    if (!metadata) {
        return <div>Error loading metadata</div>;
    }

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: metadata.structuredData[0].PageStructuredData }}
            />
        </>
    );
}
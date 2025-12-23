
const WORDPRESS_API_URL = process.env.NEXT_PUBLIC_WORDPRESS_URL;

export async function getPageData() {
    if (!WORDPRESS_API_URL) {
        throw new Error("NEXT_PUBLIC_WORDPRESS_URL is not defined");
    }

    // Fetch the home page data. 
    // We assume the Home page is the front page or has a specific ID/slug.
    // Standard WP way to get specific page by ID if known, or filtering by slug.
    // Let's try fetching the front page or specific ID if user provided one?
    // User didn't provide home page ID, but provided many IDs in mock data (e.g., uploaded_to: 233, etc).
    // Safest bet for "Home" is usually getting pages and filtering by slug 'home' or checking `?slug=home`.

    const res = await fetch(`${WORDPRESS_API_URL}/wp-json/wp/v2/pages?slug=home&_embed`, {
        next: { revalidate: 60 }, // Revalidate every 60 seconds
    });

    if (!res.ok) {
        throw new Error("Failed to fetch data");
    }

    const pages = await res.json();

    if (pages.length === 0) {
        // If 'home' slug doesn't work, maybe try ID 1 or something?
        // Or just return the first page?
        // Let's stick with slug 'home' as it's standard convention.
        throw new Error("Home page not found");
    }

    return pages[0]?.acf;
}

export async function getServicesData() {
    if (!WORDPRESS_API_URL) {
        throw new Error("NEXT_PUBLIC_WORDPRESS_URL is not defined");
    }

    const res = await fetch(`${WORDPRESS_API_URL}/wp-json/wp/v2/service?_embed&per_page=100&order=asc&orderby=id`, {
        next: { revalidate: 60 },
    });

    if (!res.ok) {
        console.warn("Failed to fetch services data");
        return [];
    }

    const services = await res.json();
    return services;
}

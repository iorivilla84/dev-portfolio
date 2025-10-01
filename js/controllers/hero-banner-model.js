/**
 * Fetches the Hero Banner data to append as portfolio in the front end
 * @async
 * @returns {Promise} An Object containing the request status, data objects and code
 */
const getHeroBannerDataModel = async () => {
    const heroBannerEndPath = './js/portfolio-model/hero-banner.json';

    try {
        const response = await fetch(heroBannerEndPath);
        if (!response.ok) {
            throw new Error(
              `Failed to fetch ${heroBannerEndPath}: ${response.status} ${response.statusText}`
            );
        }

        const jsonResponse = await response.json();
        return { status: 'ok', hero_banner: jsonResponse.hero_banner, code: 200 }
    } catch (error) {
        if (error.name === "SyntaxError") {
            console.error(`JSON parse error in ${heroBannerEndPath}:`, error.message);
        } else {
            console.error(`Error fetching ${heroBannerEndPath}:`, error.message);
        }

        return { status: 'error', hero_banner: [], code: 500 }
    }
}

export { getHeroBannerDataModel }

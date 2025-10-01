/**
 * Fetches the background data (education + recommendations)
 * @async
 * @returns {Promise} An Object containing the request status, data objects and code
 */
const getSiteData = async () => {
    const siteDataEndPath = "./js/portfolio-model/site.json";

    try {
        const response = await fetch(siteDataEndPath);

        if (!response.ok) {
            throw new Error(
                `Failed to fetch ${siteDataEndPath}: ${response.status} ${response.statusText}`
            )
        }

        const jsonResponse = await response.json();
        return {
            status: 'ok',
            site: jsonResponse.site,
            code: 200
        }
    } catch (error) {
        if (error.name === 'SyntaxError') {
            console.error(`JSON parse error in ${siteDataEndPath}:`, error.message);
        } else {
            console.error(`Error fetching ${siteDataEndPath}:`, error.message);
        }

        return {
            status: 'error',
            site: [],
            code: 500
        }
    }
}

export { getSiteData };

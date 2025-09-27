/**
 * Fetches the list of Projects to append as portfolio in the front end
 * @async
 * @returns {Promise} An Object containing the request status, data and code
 */
const getPortfolioListModel = async () => {
    const portfolioListEndPath = './js/portfolio-model/portfolio-list.json';

    try {
        const response = await fetch(portfolioListEndPath);
        if (!response.ok) {
            throw new Error(
              `Failed to fetch ${portfolioListEndPath}: ${response.status} ${response.statusText}`
            );
        }

        const jsonResponse = await response.json();
        return {
            status: 'ok',
            section_title: jsonResponse.section_title,
            section_description: jsonResponse.section_description,
            portfolio: jsonResponse.portfolio,
            project_filters: jsonResponse.project_filters,
            code: 200
        }
    } catch (error) {
        if (error.name === "SyntaxError") {
            console.error(`JSON parse error in ${portfolioListEndPath}:`, error.message);
        } else {
            console.error(`Error fetching ${portfolioListEndPath}:`, error.message);
        }

        return {
            status: 'error',
            section_title: [],
            section_description: [],
            portfolio: [],
            project_filters: [],
            code: 500
        }
    }
}

export { getPortfolioListModel }

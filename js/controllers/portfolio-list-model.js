/**
 * Fetches the list of skills to append in the front end
 * @async
 * @returns {Promise} An Object containing the request status, data and code
 */
const getPortfolioListModel = async () => {
    const portfolioListEndPath = './js/portfolio-model/portfolio-list.json';

    try {
        const response = await fetch(portfolioListEndPath);

        if (response.ok) {
            const jsonResponse = await response.json();
            return { status: 'ok', data: jsonResponse, code: 200 }
        }
    } catch (error) {
        return { status: 'error', data: [], code: 500 }
    }
}

export { getPortfolioListModel }

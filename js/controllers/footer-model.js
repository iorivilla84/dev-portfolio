/**
 * Fetches the footer content to append in the front end
 * @async
 * @returns {Promise} An Object containing the request status, data and code
 */
const getFooterDataModel = async () => {
    const footerEndPath = './js/portfolio-model/footer-content.json';

    try {
        const response = await fetch(footerEndPath);
        if (!response.ok) {
            throw new Error(
              `Failed to fetch ${footerEndPath}: ${response.status} ${response.statusText}`
            );
        }

        const jsonResponse = await response.json();
        return {
            status: 'ok',
            footer: jsonResponse.footer,
            copyright: jsonResponse.copyright,
            code: 200
        }
    } catch (error) {
        if (error.name === "SyntaxError") {
            console.error(`JSON parse error in ${footerEndPath}:`, error.message);
        } else {
            console.error(`Error fetching ${footerEndPath}:`, error.message);
        }

        return {
            status: 'error',
            footer: [],
            copyright: [],
            code: 500
        }
    }
}

export { getFooterDataModel };

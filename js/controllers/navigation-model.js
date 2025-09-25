/**
 * Fetches the Main Navigation list data to append in the front end
 * @async
 * @returns {Promise} An Object containing the request status, data and code
 */
const getNavigationDataModel = async () => {
    const navigationEndPath = './js/portfolio-model/navigation-list.json';

    try {
        const response = await fetch(navigationEndPath);

        if (!response.ok) {
            throw new Error(
              `Failed to fetch ${navigationEndPath}: ${response.status} ${response.statusText}`
            );
        }

        const jsonResponse = await response.json();
        return {
            status: 'ok',
            main_navigation: jsonResponse.main_navigation,
            socials: jsonResponse.socials,
            code: 200
        }
    } catch (error) {
        if (error.name === "SyntaxError") {
            console.error(`JSON parse error in ${navigationEndPath}:`, error.message);
        } else {
            console.error(`Error fetching ${navigationEndPath}:`, error.message);
        }

        return {
            status: 'ok',
            main_navigation: [],
            socials: [],
            code: 500
        }
    }
}

export { getNavigationDataModel }

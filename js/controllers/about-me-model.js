/**
 * Fetches the list of skills to append in the front end
 * @async
 * @returns {Promise} An Object containing the request status, data and code
 */
const getAboutMeList = async () => {
    const aboutMeEndPath = "./js/portfolio-model/about-me.json";

    try {
        const response = await fetch(aboutMeEndPath);
        if (response.ok) {
            const jsonResponse = await response.json();
            return { status: 'ok', data: jsonResponse, code: 200 }
        }
    } catch (error) {
        return { status: 'error', data: [], code: 500 }
    }
}

export { getAboutMeList }

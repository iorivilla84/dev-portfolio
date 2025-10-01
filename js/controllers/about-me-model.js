/**
 * Fetches the list of About Me to append in the front end
 * @async
 * @returns {Promise} An Object containing the request status, data objects and code
 */
const getAboutMeList = async () => {
    const aboutMeEndPath = "./js/portfolio-model/about-me.json";

    try {
        const response = await fetch(aboutMeEndPath);
        if (!response.ok) {
            throw new Error(
              `Failed to fetch ${aboutMeEndPath}: ${response.status} ${response.statusText}`
            );
        }

        const jsonResponse = await response.json();
        return {
            status: 'ok',
            about_me: jsonResponse.about_me,
            code: 200
        }
    } catch (error) {
        if (error.name === "SyntaxError") {
            console.error(`JSON parse error in ${aboutMeEndPath}:`, error.message);
        } else {
            console.error(`Error fetching ${aboutMeEndPath}:`, error.message);
        }

        return {
            status: 'error',
            about_me: [],
            code: 500
        }
    }
}

export { getAboutMeList }

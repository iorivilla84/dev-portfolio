/**
 * Fetches the list of About Me to append in the front end
 * @async
 * @returns {Promise} An Object containing the request status, data and code
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
            main_title: jsonResponse.main_title,
            section_title: jsonResponse.section_title,
            description: jsonResponse.description,
            cv_link: jsonResponse.cv_link,
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
            main_title: [],
            section_title: [],
            description: [],
            cv_link: [],
            code: 500
        }
    }
}

export { getAboutMeList }

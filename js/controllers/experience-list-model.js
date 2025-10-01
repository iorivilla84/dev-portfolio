/**
 * Fetches the list of Experience to append in the front end
 * @async
 * @returns {Promise} An Object containing the request status, data objects and code
 */
const getExperienceList = async () => {
    const experienceListEndPath = './js/portfolio-model/experience-list.json';

    try {
        const response = await fetch(experienceListEndPath);
        if (!response.ok) {
            throw new Error(
              `Failed to fetch ${experienceListEndPath}: ${response.status} ${response.statusText}`
            );
        }

        const jsonResponse = await response.json();
        return {
            status: 'ok',
            section_title: jsonResponse.section_title,
            experience: jsonResponse.experience,
            code: 200
        }
    } catch (error) {
        if (error.name === "SyntaxError") {
            console.error(`JSON parse error in ${experienceListEndPath}:`, error.message);
        } else {
            console.error(`Error fetching ${experienceListEndPath}:`, error.message);
        }

        return {
            status: 'error',
            section_title: [],
            experience: [],
            code: 500
        }
    }
}

export { getExperienceList }
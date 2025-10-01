/**
 * Fetches the list of skills to append in the front end
 * @async
 * @returns {Promise} An Object containing the request status, data objects and code
 */
const getSkills = async () => {
    const skillsEndPath = './js/portfolio-model/skills.json'

    try {
        const response = await fetch(skillsEndPath);
        if (!response.ok) {
            throw new Error(
              `Failed to fetch ${skillsEndPath}: ${response.status} ${response.statusText}`
            );
        }

        const jsonResponse = await response.json();
        return {
            status: 'ok',
            categories: jsonResponse.categories,
            section_title: jsonResponse.section_title,
            code: 200
        }
    } catch (error) {
        if (error.name === "SyntaxError") {
            console.error(`JSON parse error in ${skillsEndPath}:`, error.message);
        } else {
            console.error(`Error fetching ${skillsEndPath}:`, error.message);
        }

        return {
            status: 'error',
            section_title: [],
            categories: [],
            code: 500
        }
    }
}

export { getSkills };

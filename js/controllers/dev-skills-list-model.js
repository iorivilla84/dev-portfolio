/**
 * Fetches the list of skills to append in the front end
 * @async
 * @returns {Promise} An Object containing the request status, data and code
 */
const getSkills = async () => {
    const skillsEndPath = './js/portfolio-model/skills.json'

    try {
        const response = await fetch(skillsEndPath);
        if (response.ok) {
            const jsonResponse = await response.json();
            return { status: 'ok', data: jsonResponse, code: 200 }
        }
    } catch (error) {
        return { status: 'error', data: [], code: 500 }
    }
}

export { getSkills };

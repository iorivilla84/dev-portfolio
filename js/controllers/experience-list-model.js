/**
 * Fetches the list of Experience to append in the front end
 * @async
 * @returns {Promise} An Object containing the request status, data and code
 */
const getExperienceList = async () => {
    const experienceListEndPath = './js/portfolio-model/experience-list.json';

    try {
        const response = await fetch(experienceListEndPath);
        if (response.ok) {
            const jsonResponse = await response.json();
            const experienceData = jsonResponse.experience;
            return { status: 'ok', data: experienceData, code: '200'}
        }
    } catch (error) {
        return { status: 'error', data: [], code: '500'}
    }
}

export { getExperienceList }
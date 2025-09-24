
/**
 * Fetches the background data (education + recommendations)
 * @async
 * @returns {Promise} An Object containing the request status, data and code
 */
const getBackgroundData = async () => {
    const backgroundDataEndPath = "./js/portfolio-model/background-list.json";

    try {
        const response = await fetch(backgroundDataEndPath);

        if (!response.ok) throw new Error('network response was not ok fetching background data');

        const jsonResponse = await response.json();
        return {
            status: "ok",
            education: jsonResponse.education,
            recommendations: jsonResponse.recommendations,
            code: 200
        }
    } catch (error) {
        return {
            status: "ok",
            education: [],
            recommendations: [],
            code: 500
        }
    }
}


export { getBackgroundData }

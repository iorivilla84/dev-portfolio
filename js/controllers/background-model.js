
/**
 * Fetches the background data (education + recommendations)
 * @async
 * @returns {Promise} An Object containing the request status, data objects and code
 */
const getBackgroundData = async () => {
    const backgroundDataEndPath = "./js/portfolio-model/background-list.json";

    try {
        const response = await fetch(backgroundDataEndPath);

        if (!response.ok) {
            throw new Error(
              `Failed to fetch ${backgroundDataEndPath}: ${response.status} ${response.statusText}`
            );
        }

        const jsonResponse = await response.json();
        return {
            status: "ok",
            section_title: jsonResponse.section_title,
            education: jsonResponse.education,
            recommendations: jsonResponse.recommendations,
            cv_info: jsonResponse.cv_info,
            code: 200
        }
    } catch (error) {
        if (error.name === "SyntaxError") {
            console.error(`JSON parse error in ${backgroundDataEndPath}:`, error.message);
        } else {
            console.error(`Error fetching ${backgroundDataEndPath}:`, error.message);
        }

        return {
            status: "ok",
            section_title: [],
            education: [],
            recommendations: [],
            cv_url: [],
            code: 500
        }
    }
}


export { getBackgroundData }


/**
 * Fetches the background data (education + recommendations)
 * @async
 * @returns {Promise} An Object containing the request status, data objects and code
 */
 const getRecommendationData = async () => {
    const recommendationDataEndPath = "./js/portfolio-model/recommendations-list.json";

    try {
        const response = await fetch(recommendationDataEndPath);

        if (!response.ok) {
            throw new Error(
              `Failed to fetch ${recommendationDataEndPath}: ${response.status} ${response.statusText}`
            );
        }

        const jsonResponse = await response.json();
        return {
            status: "ok",
            recommendations: jsonResponse.recommendations,
            code: 200
        }
    } catch (error) {
        if (error.name === "SyntaxError") {
            console.error(`JSON parse error in ${recommendationDataEndPath}:`, error.message);
        } else {
            console.error(`Error fetching ${recommendationDataEndPath}:`, error.message);
        }

        return {
            status: "ok",
            recommendations: [],
            code: 500
        }
    }
}


export { getRecommendationData }

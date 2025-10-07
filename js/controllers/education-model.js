
/**
 * Fetches the education data education
 * @async
 * @returns {Promise} An Object containing the request status, data objects and code
 */
const getEducationData = async () => {
    const educationDataEndPath = "./js/portfolio-model/education-list.json";

    try {
        const response = await fetch(educationDataEndPath);

        if (!response.ok) {
            throw new Error(
              `Failed to fetch ${educationDataEndPath}: ${response.status} ${response.statusText}`
            );
        }

        const jsonResponse = await response.json();
        return {
            status: "ok",
            section_title: jsonResponse.section_title,
            education: jsonResponse.education,
            code: 200
        }
    } catch (error) {
        if (error.name === "SyntaxError") {
            console.error(`JSON parse error in ${educationDataEndPath}:`, error.message);
        } else {
            console.error(`Error fetching ${educationDataEndPath}:`, error.message);
        }

        return {
            status: "ok",
            section_title: [],
            education: [],
            code: 500
        }
    }
}


export { getEducationData }

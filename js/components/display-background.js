import { getBackgroundData } from "../controllers/background-model.js"
import { getElement } from "../helpers/dom-helper.js";

const displayBackground = {
    /**
     * Initialises the displayBackground object to display Education and Recommendations
     * @async
     * @returns {void}
     */
    init: async () => {
        await displayBackground.displayBackground();
    },
    /**
     * Creates the HTML template for recommendations items
     * @param {Object} recommendations - The recommendations object to be rendered
     * @returns {string} The HTML recommendations template
     */
     recommendationListTemplate: (recommendation) => {
        return `
            <div class="recommendation-item h-100 py-4">
                <div class="recommendation-content">
                    <p class="recommendation-item__text">${recommendation?.recommendation}</p>
                    <h4 class="recommendation-item__title">- ${recommendation?.name}</h4>
                    <span class="recommendation-item__position">
                        ${recommendation?.position}
                        <a class="recommendation-item__company-link" href="${recommendation?.company_link}" target="_blank">${recommendation?.company}</a>
                    </span>
                </div>
            </div>
        `
    },
    /**
     * Creates the HTML template for education items
     * @param {Object} education - The education object to be rendered
     * @returns {string} The education HTML template
     */
    educationListTemplate: (education) => {
        return `
            <div class="education-list">
                <div class="education-list-item">
                    <div class="timeline-dot"></div>
                    <div class="education-content">
                        <span class="education-list-item__period">${education?.period}</span>
                        <h4 class="education-list-item__title">${education?.title}</h4>
                        <p class="education-list-item__institute">${education?.institute}</p>
                    </div>
                </div>
            </div>
        `
    },
    /**
     * Fetches the background data (education + recommendations)
     * and renders the education and recommendations sections
     * @async
     * @returns {Promise<Array<Object>>} An array of education objects
     */
    displayBackground: async () => {
        const { status, education, recommendations } = await getBackgroundData();

        if (status === 'ok') {
            const educationContainer = getElement.single('.education-list-wrapper');
            education?.forEach(edu => {
                educationContainer?.insertAdjacentHTML('beforeend', displayBackground.educationListTemplate(edu));
            });

            const recommendationContainer = getElement.single('.recommendations-wrapper');
            recommendations?.forEach(recommendation => {
                recommendationContainer?.insertAdjacentHTML('beforeend', displayBackground.recommendationListTemplate(recommendation));
            });
        }

        return education;
    }
}

export { displayBackground }

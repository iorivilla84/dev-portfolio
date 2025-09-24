import { getBackgroundData } from "../controllers/background-model.js"
import { getElement } from "../helpers/dom-helper.js";

const displayBackground = {
    /**
     * Initializes the displayBackground component
     * It calls the displayBackground method to fetch the
     * background data and render the education and recommendations
     * sections
     */
    init: () => {
        displayBackground.displayBackground();
    },
    /**
     * Returns the HTML template for a single recommendations item
     * @param {Object} recommendations - The recommendations object to be rendered
     * @returns {string} The HTML template for a single recommendations item
     */
     recommendationListTemplate: (recommendation) => {
        const recommendationContainer = getElement.single('.recommendations-wrapper');
        if (!recommendationContainer) return;

        const recommendationTemplate = `
            <div class="recommendation-item h-100 py-4">
                <div class="recommendation-content">
                <p class="recommendation-item__text">${recommendation?.recommendation}</p>
                    <h4 class="recommendation-item__title">- ${recommendation?.name}</h4>
                    <span class="recommendation-item__position">
                        ${recommendation?.position}
                        <a class="recommendation-item__company-link" href="${recommendation?.company_link}" target="_blank">${recommendation?.company}</a>
                    </span>
                </div>
            <div>
        `
    return recommendationContainer.insertAdjacentHTML('beforeend', recommendationTemplate);
    },
    /**
     * Returns the HTML template for a single education item
     * @param {Object} education - The education object to be rendered
     * @returns {string} The HTML template for a single education item
     */
    educationListTemplate: (education) => {
        const educationContainer = getElement.single('.education-list-wrapper');
        if (!educationContainer) return;

        const educationTemplate = `
            <ul class="education-list">
                <li class="education-list-item">
                    <div class="timeline-dot"></div>
                    <div class="education-content">
                        <span class="education-list-item__period">${education?.period}</span>
                        <h4 class="education-list-item__title">${education?.title}</h4>
                        <p class="education-list-item__institute">${education?.institute}</p>
                    </div>
                </li>
            <ul>
        `
    return educationContainer.insertAdjacentHTML('beforeend', educationTemplate);
    },
    /**
     * Fetches the background data (education + recommendations)
     * and renders the education and recommendations sections
     * @returns {Promise<Array<Object>>} An array of education objects
     */
    displayBackground: async () => {
        const { status, education, recommendations } = await getBackgroundData();
        console.log(status);
        if (status === 'ok') {
            education?.forEach(edu => displayBackground.educationListTemplate(edu));
            recommendations?.forEach(recommendation => displayBackground.recommendationListTemplate(recommendation));
        }
        console.log(recommendations);
        return education;
    }
}

export { displayBackground }

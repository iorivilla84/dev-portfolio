import { getBackgroundData } from "../controllers/background-model.js"
import { getElement } from "../helpers/dom-helper.js";
import { formatterHelper } from "../helpers/formatter.js";
import { displayAboutMeList } from "./display-about-me-list.js";

const displayBackground = {
    /**
     * Initialises the displayBackground object to display Education and Recommendations
     * @async
     * @returns {void}
     */
    init: async () => {
        const educationWrapper = getElement.single('.background-wrapper');
        const model = await getBackgroundData();
        if (!educationWrapper || !model) return;

        await displayBackground.displayBackground(educationWrapper, model);
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
                    <p class="recommendation-item__text">${recommendation?.recommendation || 'No Recommendation Available'}</p>
                    <h4 class="recommendation-item__name">- ${recommendation?.name || 'No Name Available'}</h4>
                    <span class="recommendation-item__position">
                        ${recommendation?.position || 'No Position Available'}
                        <a class="recommendation-item__company-link" href="${recommendation?.company_link || '#'}" target="_blank">${recommendation?.company || 'No Company Name Available'}</a>
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
                        <span class="education-list-item__period">${education?.period || 'No Period Available'}</span>
                        <h4 class="education-list-item__title">${education?.title || 'No Title Available'}</h4>
                        <p class="education-list-item__institute">${education?.institute || 'No Institute Available'}</p>
                    </div>
                </div>
            </div>
        `
    },
    /**
     * Displays the education and recommendations sections in the background section
     * @param {HTMLElement} wrapper - The container of the target element.
     * @param {Object} model - The background data object containing education and recommendations data
     * @returns {void}
     */
    displayBackground: (wrapper, model) => {
        const { status, section_title, education, recommendations, cv_info } = model;

        if (status !== 'ok') return;

        const educationContainer = wrapper.querySelector('.education-list-wrapper');
        const educationSectionTitle = wrapper.querySelector('.education-title');
        const recommendationContainer = wrapper.querySelector('.recommendations-wrapper');
        if (!educationContainer || !educationSectionTitle || !recommendationContainer) return;

        educationSectionTitle.textContent = section_title || 'Section Title'

        const educationHTML = formatterHelper.arrayFormatter(education, displayBackground.educationListTemplate);
        educationContainer.insertAdjacentHTML('beforeend', educationHTML);
        educationContainer.insertAdjacentHTML('afterend', displayAboutMeList.cvLinkTemplate(cv_info));

        const recommendationHTML = formatterHelper.arrayFormatter(recommendations, displayBackground.recommendationListTemplate);
        recommendationContainer?.insertAdjacentHTML('beforeend', recommendationHTML);
    }
}

export { displayBackground }

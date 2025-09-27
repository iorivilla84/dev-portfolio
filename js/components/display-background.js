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
    getSectionTitle: (sectionTitle) => {
        const sectionTitleInfo = formatterHelper.arrayFormatter(sectionTitle, (sectionTitle) => sectionTitle || 'Section Title');
        return sectionTitleInfo;
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
    displayBackground: (wrapper, model) => {
        const { status, section_title, education, recommendations, cv_link } = model;

        if (status !== 'ok') return;

        const educationContainer = wrapper.querySelector('.education-list-wrapper');
        const educationSectionTitle = wrapper.querySelector('.education-title');
        const recommendationContainer = wrapper.querySelector('.recommendations-wrapper');
        if (!educationContainer || !educationSectionTitle || !recommendationContainer) return;

        educationSectionTitle.innerHTML = displayBackground.getSectionTitle(section_title);

        const educationHTML = formatterHelper.arrayFormatter(education, displayBackground.educationListTemplate);
        educationContainer.insertAdjacentHTML('beforeend', educationHTML);
        educationContainer.insertAdjacentHTML('afterend', displayAboutMeList.cvLinkTemplate(cv_link));

        const recommendationHTML = formatterHelper.arrayFormatter(recommendations, displayBackground.recommendationListTemplate);
        recommendationContainer?.insertAdjacentHTML('beforeend', recommendationHTML);
    }
}

export { displayBackground }

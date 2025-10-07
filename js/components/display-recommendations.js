import { getRecommendationData } from "../controllers/recommendations-model.js"
import { getElement } from "../helpers/dom-helper.js";
import { formatterHelper } from "../helpers/formatter.js";

const displayRecommendationsInfo = {
    /**
     * Initialises the displayRecommendations object to display Recommendations in the front end
     * @async
     * @returns {void}
     */
    init: async () => {
        const recommendationsWrapper = getElement.single('.recommendations-wrapper');
        const model = await getRecommendationData();
        if (!recommendationsWrapper || !model) return;

        displayRecommendationsInfo.displayRecommendations(recommendationsWrapper, model);
    },
    /**
     * Creates the HTML template for recommendations items
     * @param {Object} recommendations - The recommendations object to be rendered
     * @returns {string} The HTML recommendations template
     */
     recommendationListTemplate: (recommendation) => {
        return `
            <div class="col-12 col-md-4 recommendation-item py-4">
                <blockquote class="recommendation-content">
                    <p class="recommendation-item__text">${recommendation?.recommendation || 'No Recommendation Available'}</p>
                    <h4 class="recommendation-item__name">- ${recommendation?.name || 'No Name Available'}</h4>
                    <cite class="recommendation-item__position">
                        ${recommendation?.position || 'No Position Available'}
                        <a class="recommendation-item__company-link" href="${recommendation?.company_link || '#'}" target="_blank">${recommendation?.company || 'No Company Name Available'}</a>
                    </cite>
                </blockquote>
            </div>
        `
    },
    /**
     * Displays the recommendations sections
     * @param {HTMLElement} wrapper - The container of the target element.
     * @param {Object} model - The background data object containing recommendations data
     * @returns {void}
     */
    displayRecommendations: async (wrapper, model) => {
        const { status, recommendations } = model;
        const recommendationContainer = wrapper.querySelector('.recommendations-content');
        if (status !== 'ok' || !recommendationContainer) return;

        const recommendationHTML = formatterHelper.arrayFormatter(recommendations, displayRecommendationsInfo.recommendationListTemplate);
        recommendationContainer.insertAdjacentHTML('beforeend', recommendationHTML);
    }
}

export { displayRecommendationsInfo }

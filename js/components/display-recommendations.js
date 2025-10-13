import { getRecommendationData } from "../controllers/recommendations-model.js"
import { getElement } from "../helpers/dom-helper.js";
import { formatterHelper } from "../helpers/formatter.js";
import { messageHelper } from "../helpers/messages.js";

const displayRecommendationsInfo = {
    /**
     * Initialises and displays the Recommendations in the front end
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
                    <p class="recommendation-item__text">
                        ${recommendation?.recommendation || messageHelper.alert('No Recommendation Available', 'span')}
                    </p>
                    <h4 class="recommendation-item__name">
                        - ${recommendation?.name || messageHelper.alert('No Name Available', 'span')}
                    </h4>
                    <cite class="recommendation-item__position">
                        ${recommendation?.position || messageHelper.alert('No Position Available')}
                        <a class="recommendation-item__company-link"
                            href="${recommendation?.company_link || '#'}"
                            target="_blank">
                            ${recommendation?.company || messageHelper.alert('No Company Name Available', 'span')}
                        </a>
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
    displayRecommendations: (wrapper, model) => {
        const { status, recommendations } = model;
        const recommendationContainer = wrapper.querySelector('.recommendations-content');
        if (status !== 'ok' || !recommendationContainer) return;

        const recommendationHTML =
            formatterHelper.arrayFormatter(recommendations, displayRecommendationsInfo.recommendationListTemplate);
        recommendationContainer.insertAdjacentHTML('beforeend', recommendationHTML);
    }
}

export { displayRecommendationsInfo }

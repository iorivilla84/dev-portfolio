import { getEducationData } from "../controllers/education-model.js"
import { getElement } from "../helpers/dom-helper.js";
import { formatterHelper } from "../helpers/formatter.js";
import { renderComponent } from "./renderers.js";
import { messageHelper } from "../helpers/messages.js";

const displayBackground = {
    /**
     * Initialises the displayEducationInfo object to display Education information
     * @async
     * @returns {void}
     */
    init: async () => {
        const educationWrapper = getElement.single('.background-wrapper');
        const model = await getEducationData();
        if (!educationWrapper || !model) return;

        await displayBackground.displayEducationInfo(educationWrapper, model);
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
                        <span class="education-list-item__period">${education?.period || messageHelper.alert('No Period Available', 'span')}</span>
                        <h4 class="education-list-item__title">${education?.title || messageHelper.alert('No Title Available', 'span')}</h4>
                        <p class="education-list-item__institute">${education?.institute || messageHelper.alert('No Institute Available', 'span')}</p>
                    </div>
                </div>
            </div>
        `
    },
    /**
     * Displays the education information in the background section
     * @async
     * @param {HTMLElement} wrapper - The container of the target element.
     * @param {Object} model - The background data object containing education data
     * @returns {void}
     */
    displayEducationInfo: async (wrapper, model) => {
        const { status, section_title, education} = model;

        if (status !== 'ok') return;

        const educationContainer = wrapper.querySelector('.education-list-wrapper');
        const educationSectionTitle = wrapper.querySelector('.education-title');
        if (!educationContainer || !educationSectionTitle) return;

        educationSectionTitle.textContent = section_title || 'Section Title'

        const educationHTML = formatterHelper.arrayFormatter(education, displayBackground.educationListTemplate);
        educationContainer.insertAdjacentHTML('beforeend', educationHTML);
        educationContainer.insertAdjacentHTML('afterend', await renderComponent.resumeButton(educationContainer));
    }
}

export { displayBackground }

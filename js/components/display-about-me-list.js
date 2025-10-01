import { getElement } from "../helpers/dom-helper.js";
import { getAboutMeList } from "../controllers/about-me-model.js";
import { formatterHelper } from "../helpers/formatter.js";

const displayAboutMeList = {
    /**
     * Initisalises the about me section list
     * @async
     * @returns {void}
     */
    init: async () => {
        const model = await getAboutMeList();
        const aboutMeContainer = getElement.single('.get-to-know-me-wrapper');
        if (!model || !aboutMeContainer) return;

        displayAboutMeList.displayAboutMeInfo(aboutMeContainer, model)
    },
    /**
     * Creates the HTML template for the about me description items
     * @param {Object} description - The about me object
     * @returns {string} - An HTML string of list items containing the experience description
     */
     descriptionTemplate: (description) => {
        return `
            <li class="about-me-item">${description?.trim() || 'Item Not Available'}</li>
        `;
    },
    /**
     * Creates an HTML string for displaying button link to download a CV otherwise fall back to the sample text.
     * @param {Object} about_me - The about me object
     * @returns {string} - An HTML string of a button and link to download the CV.
     */
     cvLinkTemplate: (about_me) => {
        return `
            <a href="${about_me?.cv_url || 'https://example.com'}" class="download-btn btn btn-primary" target="_blank">
                ${about_me?.cv_button_text ? about_me?.cv_button_text : 'Button Text'}
            </a>
        `;
    },
    /**
     * Renders the about me section list
     * @param {String} selector - The CSS selector of the target element
     * @param {Object} model - The about me object
     * @async
     * @returns {Promise<void>}
     */
    displayAboutMeInfo: async (wrapper, model) => {
        const { status, about_me } = model;
        const aboutMeSectionTitle = wrapper.closest('.about-me-wrapper').querySelector('.about-me-title');
        const aboutMeSubtitle = wrapper.querySelector('.about-me-subtitle');
        const descriptionContainer = wrapper.querySelector('.about-me-list');

        if (status !== 'ok' || !aboutMeSectionTitle || !aboutMeSectionTitle || !descriptionContainer) return;

        aboutMeSectionTitle.textContent = about_me?.main_title || 'Main Title';
        aboutMeSubtitle.textContent = about_me?.section_title || 'Section Title';

        const descriptionHTML = about_me.description.length
            ? formatterHelper.arrayFormatter(about_me?.description, displayAboutMeList.descriptionTemplate)
            : '<li class="about-me-item">Item Not Available</li>';
        descriptionContainer.insertAdjacentHTML('beforeend', descriptionHTML);

        descriptionContainer.insertAdjacentHTML('afterend', displayAboutMeList.cvLinkTemplate(about_me));
    }
}

export { displayAboutMeList }

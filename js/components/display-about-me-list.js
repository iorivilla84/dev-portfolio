import { getElement } from "../helpers/dom-helper.js";
import { getAboutMeList } from "../controllers/about-me-model.js";
import { renderComponent } from "./renderers.js";
import { messageHelper } from "../helpers/messages.js";

const displayAboutMeList = {
    /**
     * Initisalises the about me section list
     * @async
     * @returns {void}
     */
    init: async () => {
        const model = await getAboutMeList();
        const aboutMeContainer = getElement.single('.about-me-wrapper');
        if (!model || !aboutMeContainer) return;

        await displayAboutMeList.displayAboutMeInfo(aboutMeContainer, model)
    },
    /**
     * Renders the about me section list
     * @async
     * @param {String} selector - The CSS selector of the target element
     * @param {Object} model - The about me object
     * @returns {Promise<void>}
     */
    displayAboutMeInfo: async (wrapper, model) => {
        const { status, about_me } = model;
        const aboutMeSectionTitle = wrapper.querySelector('.about-me-title');
        const aboutMeDescriptionContainer = wrapper.querySelector('.about-me-description__text');

        if (status !== 'ok' || !aboutMeSectionTitle || !aboutMeDescriptionContainer) return;

        aboutMeSectionTitle.textContent = about_me?.main_title || 'Section Title';

        const aboutMeText = about_me?.description || messageHelper.alert('No Description Available');
        aboutMeDescriptionContainer.insertAdjacentHTML('afterbegin', aboutMeText);
        aboutMeDescriptionContainer.insertAdjacentHTML('afterend', await renderComponent.resumeButton(aboutMeDescriptionContainer));
    }
}

export { displayAboutMeList }

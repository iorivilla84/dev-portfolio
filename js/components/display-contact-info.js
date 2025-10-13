import { getElement } from "../helpers/dom-helper.js";
import { getContactDataModel } from "../controllers/contact-model.js";
import { renderComponent } from "./renderers.js";
import { messageHelper } from "../helpers/messages.js";

const displayContactInfo = {
    /**
     * Initialises and displays the contact info in the front end
     * @async
     * @returns {void}
     */
    init: async () => {
        const model = await getContactDataModel();
        const contactWrapper = getElement.single('.contact-wrapper');
        if (!contactWrapper || !model) return;

        await displayContactInfo.displayContactInfo(contactWrapper, model);
    },
    /**
     * Displays the contact info in the front end based on the given model
     * @async
     * @param {HTMLElement} wrapper - The container of the target element.
     * @param {Object} model - The contact data object model
     * @returns {void}
     */
    displayContactInfo: async (wrapper, model) => {
        const { status, contact } = model
        const contactTitle = wrapper.querySelector('.contact-title');
        const contactText = wrapper.querySelector('.contact-text');
        const contactButtonsWrapper = wrapper.querySelector('.contact-buttons-wrapper');

        if (status !== 'ok' || !contactTitle ||!contactText || !contactButtonsWrapper) return;

        contactTitle.textContent = contact?.title || 'Section Title';
        contactText.insertAdjacentHTML('afterbegin', contact?.description || messageHelper.alert('No Contact Text Available', 'span'));
        contactButtonsWrapper.insertAdjacentHTML('afterbegin', await renderComponent.contactMeButton(contactButtonsWrapper));
        contactButtonsWrapper.insertAdjacentHTML('beforeend', await renderComponent.resumeButton(contactButtonsWrapper));
    }
}

export { displayContactInfo }

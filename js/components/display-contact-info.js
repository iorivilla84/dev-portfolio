import { getElement } from "../helpers/dom-helper.js";
import { getContactDataModel } from "../controllers/contact-model.js";
import { displayAboutMeList } from "./display-about-me-list.js";

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

        displayContactInfo.displayContactInfo(contactWrapper, model);
    },
    /**
     * Creates an HTML string for displaying the button to send an email otherwise fall back to the sample text.
     * @param {Object} contact - The contact object
     * @returns {string} - An HTML string of a button and link to send an email.
     */
    cvEmailLinkTemplate: contact => {
        return `
            <a href="mailto:${contact?.email_address || 'sample@email'}" class="download-btn btn btn-primary">
                ${contact?.email_address && contact?.email_button_text ? contact?.email_button_text : 'No Email Available'}
            </a>
        `;
    },
    /**
     * Displays the contact info in the front end based on the given model
     * @param {HTMLElement} wrapper - The container of the target element.
     * @param {Object} model - The contact data object model
     * @returns {void}
     */
    displayContactInfo: (wrapper, model) => {
        const { status, contact } = model
        const contactTitle = wrapper.querySelector('.contact-title');
        const contactText = wrapper.querySelector('.contact-text');
        const contactButtonsWrapper = wrapper.querySelector('.contact-buttons-wrapper');

        if (status !== 'ok' || !contactTitle ||!contactText || !contactButtonsWrapper) return;

        contactTitle.textContent = contact?.title || 'No Contact Title Available';
        contactText.insertAdjacentHTML('afterbegin', contact?.description || 'No Contact Text Available');
        contactButtonsWrapper.insertAdjacentHTML('afterbegin', displayContactInfo.cvEmailLinkTemplate(contact));
        contactButtonsWrapper.insertAdjacentHTML('beforeend', displayAboutMeList.cvLinkTemplate(contact));
    }
}

export { displayContactInfo }

import { getElement } from "../helpers/dom-helper.js";
import { formatterHelper } from "../helpers/formatter.js"
import { getFooterDataModel } from "../controllers/footer-model.js";
import { renderComponent } from "./renderers.js";
import { messageHelper } from "../helpers/messages.js";;

const displayFooterContent = {
    /**
     * Initialises the footer component by fetching the footer data model and rendering the content
     * @async
     * @returns {void}
     */
    init: async () => {
        const model = await getFooterDataModel();
        const footerWrapper = getElement.single('.footer-container');
        if (!footerWrapper || !model) return;

        await displayFooterContent.renderFooterContent(footerWrapper, model);

        const yearContainer = getElement.single('.footer-year');
        if (!yearContainer) return;

        displayFooterContent.renderCopyRightsYear(yearContainer);
    },
    /**
     * Creates the html string to display the copyright content
     * @param {Object} copyright - The copyright data object
     * @returns {String} An HTML string of the copyright content
     */
    getCopyRights: (copyright) => {
        return `
            <a href="${copyright?.made_by_link || '#'}" target="_blank" rel="noopener noreferrer">
                ${copyright?.made_by || messageHelper.alert('No Name Provided', 'span')}
            </a>
        `
    },
    /**
     * Renders the footer content in the footer container
     * @param {HTMLElement} footerWrapper - The footer container wrapper
     * @param {Object} model - copyright - The footer data object
     * @returns {void}
     */
    renderFooterContent: async (footerWrapper, model) => {
        const { status, footer, copyright } = model;
        const footerLogoContainer = footerWrapper.querySelector('.footer-logo');
        const socialIconsContainer = footerWrapper.querySelector('.footer-socials-wrapper');
        const footerSocialTitle = footerWrapper.querySelector('.footer-social-title');
        const footerSubtitle = footerWrapper.querySelector('.footer-subtitle');
        const footerTextDescription = footerWrapper.querySelector('.footer-text');
        const footerCopyRight = footerWrapper.querySelector('.footer-copyrights');
        if (
            status !== 'ok'
            || !footerLogoContainer
            || !socialIconsContainer
            || !footerSocialTitle
            || !footerSubtitle
            || !footerTextDescription
            || !footerCopyRight
        ) return;

        footerLogoContainer.insertAdjacentHTML('beforeend', await renderComponent.brandLogo(footerLogoContainer));
        footerSubtitle.textContent = footer?.subtitle || 'Footer Subtitle';
        footerTextDescription.insertAdjacentHTML('afterbegin', footer?.text || messageHelper.alert('No Footer Text Available', 'span'))
        footerSocialTitle.insertAdjacentHTML('afterbegin', footer?.social_title || 'Footer Social Title');

        socialIconsContainer.insertAdjacentHTML('beforeend', await renderComponent.socialIcons(socialIconsContainer));

        footerCopyRight.insertAdjacentHTML('afterbegin',
            `
                ${copyright.text || messageHelper.alert('Missing copyright text and HTML tag in JSON text property', 'span')}
                ${copyright.year || messageHelper.alert('Missing year HTML tag in JSON year property', 'span')}
            `
        );

        footerCopyRight.insertAdjacentHTML('beforeend', displayFooterContent.getCopyRights(copyright));
    },
    /**
     * Fetch Current Year to append in copyrights section
     * @param {String} container - The class of the element target
     * @returns {Number} A number with the current year
     */
     renderCopyRightsYear: container => {
        container.textContent = formatterHelper.getFullYear();
    }
}

export { displayFooterContent };

import { getElement } from "../helpers/dom-helper.js";
import { formatterHelper } from "../helpers/formatter.js"
import { getFooterDataModel } from "../controllers/footer-model.js";
import { renderComponent } from "./renderers.js";

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

        displayFooterContent.renderFooterContent(footerWrapper, model);

        const yearContainer = getElement.single('.footer-year');
        if (!yearContainer) return;

        displayFooterContent.renderCopyRightsYear(yearContainer);
    },
    /**
     * Creates the HTML string to display the social icons items
     * @param {Object} social - The social info data object
     * @returns {string} An HTML string of the social navigation items
     */
    getFooterSocials: (social) => {
        return `
            <li class="socials footer-item">
                <a href="${social.link || '#'}" aria-label="${social.name || 'Icon Name'}" target="_blank" rel="noopener noreferrer" class="footer-link">
                    ${social.icon || 'Icon Missing'}
                </a>
            </li>
        `;
    },
    /**
     * Creates the html string to display the copyright content
     * @param {Object} copyright - The copyright data object
     * @returns {String} An HTML string of the copyright content
     */
    getCopyRights: (copyright) => {
        return `
            <a href="${copyright?.made_by_link || '#'}" target="_blank" rel="noopener noreferrer">
                ${copyright?.made_by || 'Your Name'}
            </a>
        `
    },
    /**
     * Renders the footer content in the footer container
     * @param {HTMLElement} footerWrapper - the footer container wrapper
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
        footerTextDescription.textContent = footer?.text || 'Footer Text';
        footerSocialTitle.textContent = footer?.social_title || 'Footer Social Title';

        const socialIconsHtml = formatterHelper.arrayFormatter(footer?.social_links, social => displayFooterContent.getFooterSocials(social))
        socialIconsContainer.insertAdjacentHTML('beforeend', socialIconsHtml);
        footerCopyRight.insertAdjacentHTML('afterbegin',
            `${copyright.text || 'No copyright text available'} ${copyright.year || 'No year available'}`
        );
        footerCopyRight.insertAdjacentHTML('beforeend', displayFooterContent.getCopyRights(copyright) || 'No copyright text available');

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

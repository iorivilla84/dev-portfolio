import { getSiteData } from "../controllers/site.js";
import { formatterHelper } from "../helpers/formatter.js";

/**
 * Renderers the reusable html components
 * @returns {void}
 */
const renderComponent = {
    /**
     * Fetches the site data model and returns it if exists, otherwise returns an empty object
     * @returns {Promise<Object>} A Promise resolving with the site data model
     */
    siteModel: async () => {
        const { status, site } = await getSiteData();
        if (status !== 'ok') return {};

        return site || {};
    },
    /**
     * Creates and Renders the brand logo and classes with the given container as the target element
     * @param {HTMLElement} container - The target container
     * @returns {Promise<string>} - The rendered brand logo HTML string
     */
    brandLogo: async (container) => {
        if (!container) return;

        const { navigation } = await renderComponent.siteModel();
        let logoClassHandler;
        if (container.closest('.footer-content')) {
            logoClassHandler = { img: 'footer-logo', a: 'footer-link' };
        } else if (container.closest('.main-nav')) {
            logoClassHandler = { img: 'navbar-brand', a: 'nav-brand-logo' };
        } else {
            logoClassHandler = { img: 'site-logo', a: 'site-logo-link' };
        }

        return `
            <a href="#home" class="${logoClassHandler.a}">
                <img class="${logoClassHandler.img}" src="${navigation?.logo || navigation?.logo_fallback_url}">
            </a>
        `;
    },
    /**
     * Creates and Renders the social icons and classes with the given container as the target element
     * @param {HTMLElement} container - The target container
     * @returns {string} HTML string to render the social icons items
     */
     socialIcons: async (container) => {
        if (!container) return;

        const { social_icons } = await renderComponent.siteModel();
        const iconsItemsArray = Array.isArray(social_icons) ? social_icons : [social_icons];

        let iconsClassHandler;
        if (container.closest('.footer-content')) {
            iconsClassHandler = { li: 'socials footer-item', a: 'footer-link' };
        } else if (container.closest('.main-nav')) {
            iconsClassHandler = { li: 'socials-item nav-item', a: 'nav-link' };
        } else {
            iconsClassHandler = { li: 'socials-list', a: 'socials-icons' };
        }
        const socialItems = formatterHelper.arrayFormatter(iconsItemsArray, social => {
            return `
                <li class="${iconsClassHandler.li}">
                    <a class="${iconsClassHandler.a}" href="${social?.link || '#'}" target="_blank" rel="noopener noreferrer" aria-label="${social?.name || 'Icon Name'}">
                        ${social?.icon || 'Icon Missing'}
                    </a>
                </li>
            `;
        });

        return socialItems.length ? socialItems : '<li class="socials-item nav-item">No Icons Available</li>';
    },
    /**
     * Creates an HTML string for displaying button link to download a CV otherwise fall back to the sample text.
     * @param {HTMLElement} container - The target container
     * @returns {Promise<string>} - The HTML string to render the button and link to download the CV
     */
    resumeButton: async (container) => {
        if (!container) return;

        const { resume_button } = await renderComponent.siteModel();
        return `
            <a href="${resume_button?.cv_url || 'https://example.com'}" class="download-btn btn btn-primary" target="_blank">
                ${resume_button?.cv_button_text ? resume_button?.cv_button_text : 'Button Text'}
            </a>
        `;
    },
    /**
     * Creates an HTML string for displaying the button to send an email otherwise fall back to the sample text.
     * @param {HTMLElement} container - The target container
     * @returns {string} - An HTML string to render the button and link to send an email.
     */
     contactMeButton: async (container) => {
        if (!container) return;

        const { contact_me_button } = await renderComponent.siteModel();
        return `
            <a href="mailto:${contact_me_button?.email_address || 'sample@email'}" class="download-btn btn btn-primary" role="button" aria-label="Send me an email">
                ${contact_me_button?.email_address && contact_me_button?.email_button_text
                    ? contact_me_button?.email_button_text
                    : 'No Email Available'}
            </a>
        `;
    },
}

export { renderComponent }

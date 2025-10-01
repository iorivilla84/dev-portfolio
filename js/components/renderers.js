import { getSiteData } from "../controllers/site.js";
import { getElement } from "../helpers/dom-helper.js";

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
        const { site } = await getSiteData();
        return site || {};
    },
    /**
     * Renders the brand logo with the given container as the target element
     * @param {HTMLElement} container - The target container
     * @returns {Promise<string>} - The rendered brand logo HTML string
     */
    brandLogo: async (container) => {
        if (!container) return;

        const model = await renderComponent.siteModel();
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
                <img class="${logoClassHandler.img}" src="${model?.logo || model?.logo_fallback_url}">
            </a>
        `;
    }
}

export { renderComponent }

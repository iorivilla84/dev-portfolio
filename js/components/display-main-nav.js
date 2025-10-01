import { getElement } from "../helpers/dom-helper.js";
import { navEventHandlers } from "../controllers/nav-event-handlers.js";
import { getNavigationDataModel } from "../controllers/navigation-model.js";
import { formatterHelper } from "../helpers/formatter.js";
import { renderComponent } from "./renderers.js";

const siteMainNav = {
    /**
     * Initialise the main navigation
     * @async
     * @returns {void}
     */
    init: async () => {
        const model = await getNavigationDataModel();
        if (!model) return;

        await siteMainNav.renderMainNavigation(model);
        navEventHandlers.init();
    },
    /**
     * Injects items into containers using a template function
     * @param {HTMLElement} containers - The target containers
     * @param {Array} items - The array of items to render
     * @param {Function} renderItem - The function that returns the HTML string template
     * @returns {void}
     */
    appendItems: (containers, items, renderItem) => {
        if (!containers?.length) return;

        const itemArray = Array.isArray(items) ? items : [items];
        const template = formatterHelper.arrayFormatter(itemArray, renderItem);
        containers.forEach(container => container.insertAdjacentHTML('beforeend', template))
    },
    /**
     * Template function for main navigation items
     * @param {string} itemId - The ID of the item
     * @returns {string} HTML string of the navigation item
     */
    mainNavTemplate: (itemId) => {
        const slug = itemId.toLowerCase().replace(/\s+/g, '-');
        return `
            <li class="nav-item">
                <a class="nav-link" aria-current="page" href="#${slug || 'slug'}">${slug || 'No Nav Item Available'}</a>
            </li>
        `;
    },
    /**
     * Template function for social nav items
     * @param {Object} social - The social object
     * @returns {string} HTML string of the social navigation item
     */
    socialNavTemplate: (social) => {
        return `
        <li class="socials-item nav-item">
            <a class="nav-link" href="${social.social_link || '#'}" target="_blank" rel="noopener noreferrer" aria-label="${social.social_name || 'Icon Name'}">
                ${social.social_icon || 'Icon Missing'}
            </a>
        </li>
        `;
    },
    /**
     * Render main navigation items
     * @param {HTMLElement} navContainer - The target container
     * @param {Array|string} mainNavigation - The array of main navigation items
     * @returns {void}
     */
    getMainNavItems: (navContainer, mainNavigation) => {
        const navItemsArray = Array.isArray(mainNavigation) ? mainNavigation : [mainNavigation];
        const navArrayList = navItemsArray.length ? navItemsArray : 'No Nav Items Available';
        siteMainNav.appendItems(navContainer, navArrayList, siteMainNav.mainNavTemplate);
    },
    /**
     * Render social navigation items
     * @param {HTMLElement} socialsContainer - The target container
     * @param {Array|Object} socials - The array of social navigation items
     * @returns {void}
     */
    getSocialNavItems: (socialsContainer, socials) => {
        const socialItems = Array.isArray(socials) ? socials : [socials];
        siteMainNav.appendItems(socialsContainer, socialItems, siteMainNav.socialNavTemplate);
    },
    /**
     * Render the main navigation
     * @param {Object} model - The main navigation model
     * @returns {void}
     */
    renderMainNavigation: async (model) => {
        const { main_navigation, socials } = model;

        const mainNavContainer = getElement.multiple('.navbar-nav.main-nav-list');
        const socialsNavContainer = getElement.multiple('.socials-nav-list .nav-socials-wrapper');
        const logoContainers = getElement.multiple('.main-nav');
        if (!mainNavContainer.length || !socialsNavContainer.length || !logoContainers.length) return;

        for (const container of logoContainers) {
            container.insertAdjacentHTML('afterbegin', await renderComponent.brandLogo(container));
        }
        siteMainNav.getMainNavItems(mainNavContainer, main_navigation);
        siteMainNav.getSocialNavItems(socialsNavContainer, socials);
    }
};

export { siteMainNav };

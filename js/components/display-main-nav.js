import { getElement } from "../helpers/dom-helper.js";
import { navEventHandlers } from "../controllers/nav-event-handlers.js";
import { getNavigationDataModel } from "../controllers/navigation-model.js";
import { formatterHelper } from "../helpers/formatter.js";
import { renderComponent } from "./renderers.js";
import { messageHelper } from "../helpers/messages.js";

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
                <a class="nav-link" aria-current="page" href="${'#' + slug || '#'}">${slug || messageHelper.alert('No Item Available', 'span', 'warning')}</a>
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
        const navArrayList = navItemsArray?.length ? navItemsArray : '';
        siteMainNav.appendItems(navContainer, navArrayList, siteMainNav.mainNavTemplate);
    },
    /**
     * Render the main navigation
     * @async
     * @param {Object} model - The main navigation model
     * @returns {void}
     */
    renderMainNavigation: async (model) => {
        const { status, main_navigation } = model;

        const mainNavContainer = getElement.multiple('.navbar-nav.main-nav-list');
        const socialsNavContainer = getElement.multiple('.socials-nav-list .nav-socials-wrapper');
        const logoContainers = getElement.multiple('.main-nav');
        if (status !== 'ok' || !mainNavContainer.length || !socialsNavContainer.length || !logoContainers.length) return;

        for (const container of logoContainers) {
            container.insertAdjacentHTML('afterbegin', await renderComponent.brandLogo(container));
        }

        for (const container of socialsNavContainer) {
            container.insertAdjacentHTML('afterbegin', await renderComponent.socialIcons(container))
        }

        siteMainNav.getMainNavItems(mainNavContainer, main_navigation);
    }
};

export { siteMainNav };

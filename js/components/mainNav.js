import { getElement } from "../helpers/dom-helper.js";
import { navEventHandlers } from "../controllers/nav-event-handlers.js";

const siteMainNav = {
    /**
     * Intialise event the navigation event handlers
     * @returns {void}
     */
    init: () => {
        siteMainNav.appendLiContent('.navbar .navbar-nav');
    },
    /**
     * Create and append the main menu list and socials icons
     * @param {String} ulContainer - The class selector of the targeted element
     * @returns {void}
     */
    appendLiContent: (ulContainer) => {
        const navArrayList = [
            'home',
            'about',
            'projects',
            'experience',
            'background',
            'contact'
        ];
        const mainNavContainer = getElement.multiple(ulContainer);

        if (!navArrayList || !mainNavContainer) return;

        navArrayList.forEach(itemId => {
            const htmlTemplate = `
                <li class="nav-item">
                    <a class="nav-link" aria-current="page" href="#${itemId}">${itemId}</a>
                </li>
            `;

            mainNavContainer.forEach(navContainer => {
                navContainer.insertAdjacentHTML('beforeend', htmlTemplate);
            });
        });

        mainNavContainer.forEach(ulContainer => {
            const socialsTemplate = `
                <ul class="navbar-nav socials-wrapper">
                    <li class="socials nav-item">
                        <a class="nav-link" rel="noopener noreferrer"
                            href="https://www.linkedin.com/in/diego-fernando-villamil-velasquez/"
                            target="_blank">
                            <i class="fa-brands fa-linkedin"></i>
                        </a>
                    </li>
                    <li class="socials nav-item">
                        <a class="nav-link" rel="noopener noreferrer"
                            href="https://github.com/iorivilla84"
                            target="_blank">
                            <i class="fa-brands fa-github"></i>
                        </a>
                    </li>
                </ul>
            ` ;
            ulContainer.insertAdjacentHTML('afterend', socialsTemplate);
        });

        navEventHandlers.init();
    }
}

export { siteMainNav };

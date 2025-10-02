import { getSiteData } from "../controllers/site.js";

const displaySiteInfo = {
    /**
     * Initialises the site data model and updates the page title in the front end
     * @async
     * @returns {void}
     */
    init: async () => {
        const { status, site } = await getSiteData();
        if (status !== 'ok' || !site) return;

        displaySiteInfo.updateSiteTitle(site);
    },
    /**
     * Updates the page title with the home title from the site data model otherwise fallback ti sample text
     * @param {Object} model - The site data object
     * @returns {void}
     */
    updateSiteTitle: (model) => {
        const { site_title = {} } = model;

        document.title = site_title.home_title || 'Dev Portfolio';
    }
}

export { displaySiteInfo }

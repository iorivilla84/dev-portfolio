import { getSiteData } from "../controllers/site.js";

const displaySiteInfo = {
    /**
     * Initialises the site data model and updates the page title in the front end
     * @async
     * @returns {void}
     */
    init: async () => {
        const model = await getSiteData();
        if (!model) return;

        displaySiteInfo.updateSiteTitle(model);
    },
    /**
     * Updates the page title with the home title from the site data model otherwise fallback ti sample text
     * @param {Object} model - The site data object
     * @returns {void}
     */
    updateSiteTitle: (model) => {
        const { status, site } = model;
        if (status !== 'ok') return;

        document.title = site.home_title || 'Your Name | Portfolio';
    }
}

export { displaySiteInfo }

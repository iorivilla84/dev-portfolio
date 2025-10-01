import { getSiteData } from "../controllers/site.js";

const displaySiteInfo = {
    init: async () => {
        const model = await getSiteData();
        if (!model) return;

        displaySiteInfo.updateSiteTitle(model);

    },
    updateSiteTitle: model => {
        const { status, site } = model;
        if (status !== 'ok') return;

        document.title = site.home_title || 'Your Name | Portfolio';
    }
}

export { displaySiteInfo }

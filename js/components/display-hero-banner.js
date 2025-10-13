import { getHeroBannerDataModel } from "../controllers/hero-banner-model.js";
import { getElement } from "../helpers/dom-helper.js";
import { formatterHelper } from "../helpers/formatter.js";
import { urlValidation } from "../helpers/url.js";
import { getSiteData } from "../controllers/site.js";

const displayHeroBanner = {
    /**
     * Initializes the hero banner by rendering the content
     * @async
     * @returns {void}
     */
    init: async () => {
        const model = await getHeroBannerDataModel();
        if (!model) return;

        await displayHeroBanner.renderBannerContent(model);
    },
    /**
     * Creates an HTML template for the hero banner images
     * @async
     * @param {object} model - An array of objects containing the image siteModel
     * @param {string} fallbackImg - The fallback image path or URL used when an image fails to load
     * @returns {string} An HTML template containing the hero banner images
     */
     getImgElements: async (model, fallbackImage) => {
        const validateUrl = await urlValidation.init(model?.avatar, fallbackImage);

        return `
            <img
                class="hero-banner-img"
                src="${validateUrl}"
                alt="${model?.avatar ? model?.name : 'Hero Banner Image'}"
                loading="lazy">
        `;
    },
    /**
     * Creates an HTML template for the hero banner text content
     * @param {Array} model - An array of objects containing the text model
     * @returns {string} An HTML template containing the hero banner text content
     */
    getBannerTextContent: (model) => {
        return formatterHelper.arrayFormatter(model, (content) => `
            <h1 class="hero-title">${content?.title || 'Hero Banner Title'}</h1>
            <h2 class="hero-subtitle">${content?.subtitle || 'Hero Banner Subtitle'}</h2>
            <p class="hero-text">${content?.text || 'Hero Banner Text'}</p>
        ` || '');
    },
    /**
     * Renders the hero banner content
     * Fetches the hero banner model and renders it in the hero banner section
     * @async
     * @param {object} model - An object containing the hero banner model
     * @returns {Promise<void>} A promise that resolves when the hero banner content is rendered
     */
    renderBannerContent: async (model) => {
        const { status, hero_banner } = model;
        const heroBannerImgWrapper = getElement.single('.hero-image-container');
        const heroBannerTextWrapper = getElement.single('.hero-text-content');
        const siteData = await getSiteData();

        if (siteData.status !== 'ok' || !siteData.site) return;
        const fallbackImage = siteData?.site?.fallback_image;

        if (status !== 'ok' || !heroBannerImgWrapper || !heroBannerTextWrapper) return;

        heroBannerImgWrapper.insertAdjacentHTML('beforeend', await displayHeroBanner.getImgElements(hero_banner, fallbackImage))
        heroBannerTextWrapper.insertAdjacentHTML('beforeend', displayHeroBanner.getBannerTextContent(hero_banner));
    }
}

export { displayHeroBanner }

import { getHeroBannerDataModel } from "../controllers/hero-banner-model.js";
import { getElement } from "../helpers/dom-helper.js";
import { formatterHelper } from "../helpers/formatter.js";

const displayHeroBanner = {
    /**
     * Initializes the hero banner by rendering the content
     * @async
     * @returns {void}
     */
    init: async () => {
        await displayHeroBanner.renderBannerContent();
    },
    /**
     * Creates an HTML template for the hero banner images
     * @param {Array} data - An array of objects containing the image data
     * @returns {string} An HTML template containing the hero banner images
     */
     getImgElements: (data) => {
        return formatterHelper.arrayFormatter(data, (imageObj) => `
            <img
                class="hero-banner-img"
                src="${imageObj?.avatar || 'No Image Available'}"
                alt="${imageObj?.name || 'Hero Banner'}"
                loading="lazy">
        ` || '');
    },
    /**
     * Creates an HTML template for the hero banner text content
     * @param {Array} data - An array of objects containing the text data
     * @returns {string} An HTML template containing the hero banner text content
     */
    getBannerTextContent: (data) => {
        return formatterHelper.arrayFormatter(data, (content) => `
            <h1 class="hero-title">${content?.title || 'Hero Banner Title'}</h1>
            <h2 class="hero-subtitle">${content?.subtitle || 'Hero Banner Subtitle'}</h2>
            <p class="hero-text">${content?.text || 'Hero Banner Text'}</p>
        ` || '');
    },
    /**
     * Renders the hero banner content
     * Fetches the hero banner data and renders it in the hero banner section
     * @async
     * @returns {Promise<void>} A promise that resolves when the hero banner content is rendered
     */
    renderBannerContent: async () => {
        const { status, hero_banner } = await getHeroBannerDataModel();
        const heroBannerImgWrapper = getElement.single('.hero-image-container');
        const heroBannerTextWrapper = getElement.single('.hero-text-content');

        if (status !== 'ok' || !heroBannerImgWrapper || !heroBannerTextWrapper) return;

        heroBannerImgWrapper.insertAdjacentHTML('beforeend', displayHeroBanner.getImgElements(hero_banner))
        heroBannerTextWrapper.insertAdjacentHTML('beforeend', displayHeroBanner.getBannerTextContent(hero_banner));
    }
}

export { displayHeroBanner }

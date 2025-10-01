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
        const model = await getHeroBannerDataModel();
        if (!model) return;

        displayHeroBanner.renderBannerContent(model);
    },
    /**
     * Creates an HTML template for the hero banner images
     * @param {Array} model - An array of objects containing the image model
     * @returns {string} An HTML template containing the hero banner images
     */
     getImgElements: (model) => {
        return `
            <img
                class="hero-banner-img"
                src="${model?.avatar || 'https://static.vecteezy.com/system/resources/previews/004/141/669/non_2x/no-photo-or-blank-image-icon-loading-images-or-missing-image-mark-image-not-available-or-image-coming-soon-sign-simple-nature-silhouette-in-frame-isolated-illustration-vector.jpg'}"
                alt="${model.avatar ? model?.name : 'Hero Banner Image'}"
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
     * @returns {Promise<void>} A promise that resolves when the hero banner content is rendered
     */
    renderBannerContent: (model) => {
        const { status, hero_banner } = model;
        const heroBannerImgWrapper = getElement.single('.hero-image-container');
        const heroBannerTextWrapper = getElement.single('.hero-text-content');

        if (status !== 'ok' || !heroBannerImgWrapper || !heroBannerTextWrapper) return;

        heroBannerImgWrapper.insertAdjacentHTML('beforeend', displayHeroBanner.getImgElements(hero_banner))
        heroBannerTextWrapper.insertAdjacentHTML('beforeend', displayHeroBanner.getBannerTextContent(hero_banner));
    }
}

export { displayHeroBanner }

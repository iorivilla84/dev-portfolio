import { getHeroBannerDataModel } from "../controllers/hero-banner-model.js";
import { getElement } from "../helpers/dom-helper.js";

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
    getImgElement: (data) => {
        const normalizeDataArray = Array.isArray(data) ? data : [data];
        const imgHtmlTemplate = normalizeDataArray?.map(img => {
            return `
                <img class="hero-banner-img" src="${img?.avatar}" alt="${img?.name || 'Hero Banner'}" loading="lazy">
            `;
        }).join('');

        return imgHtmlTemplate;
    },
    /**
     * Creates an HTML template for the hero banner text content
     * @param {Array} data - An array of objects containing the text data
     * @returns {string} An HTML template containing the hero banner text content
     */
    getBannerTextContent: (data) => {
        const contentHtmlTemplate = data?.map(txt => {
            return `
                <h1 class="hero-title">${txt?.title}</h1>
                <h2 class="hero-subtitle">${txt?.subtitle}</h2>
                <p class="hero-text">${txt?.text}</p>
            `;
        }).join('');

        return contentHtmlTemplate;
    },
    /**
     * Renders the hero banner content
     * Fetches the hero banner data and renders it in the hero banner section
     * @async
     * @returns {Promise<void>} A promise that resolves when the hero banner content is rendered
     */
    renderBannerContent: async () => {
        const { status, data } = await getHeroBannerDataModel();
        const heroBannerImgWrapper = getElement.single('.hero-image-container');
        const heroBannerTextWrapper = getElement.single('.hero-text-content');
        if (!heroBannerImgWrapper || !heroBannerTextWrapper) return;

        if (status === 'ok') {
            heroBannerImgWrapper.insertAdjacentHTML('beforeend', displayHeroBanner.getImgElement(data));
            heroBannerTextWrapper.insertAdjacentHTML('beforeend', displayHeroBanner.getBannerTextContent(data));
        }
    }
}

export { displayHeroBanner }

import { getElement } from "../helpers/dom-helper.js";
import { getAboutMeList } from "../controllers/about-me-model.js";

const displayAboutMeList = {
    /**
     * Init about me section list
     * @async
     * @returns {void}
     */
    init: async () => {
        await displayAboutMeList.renderAboutMe('.about-me-list-wrapper')
    },
    /**
     * Fetches the list of skills to append in the front end
     * @async
     * @returns {Promise<string>} A string containing the HTML of the list items
     */
    getAboutMeContent: async () => {
        const aboutMeData = await getAboutMeList();
        if (!aboutMeData?.data) return;

        const aboutListHtml = aboutMeData.data.map(aboutList => {
            return `
                <li class="about-me-item">${aboutList}</li>
            `;
        }).join('');

        return aboutListHtml;
    },
    /**
     * Renders the about me section list
     * @param {String} selector - The CSS selector of the target element
     * @async
     * @returns {Promise<void>}
     */
    renderAboutMe: async (selector) => {
        const aboutMeList = await displayAboutMeList.getAboutMeContent();
        const aboutMeContainer = getElement.single(selector);

        if (!aboutMeList || !aboutMeContainer) return;

        const aboutMeListUlWrapper = `<ul class="about-me-list">${aboutMeList}</ul>`;
        aboutMeContainer.innerHTML = '';
        aboutMeContainer.insertAdjacentHTML('beforeend', aboutMeListUlWrapper);
    }
}

export { displayAboutMeList }

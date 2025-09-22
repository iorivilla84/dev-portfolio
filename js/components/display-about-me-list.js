import { getElement } from "../helpers/dom-helper.js";
import { getAboutMeList } from "../controllers/about-me-model.js";

const displayAboutMeList = {
    /**
     * Init about me section list
     * @returns {void}
     */
    initAboutMe: () => {
        displayAboutMeList.renderAboutMe('.about-me-list-wrapper')
    },
    /**
     * Fetches the list of skills to append in the front end
     * @returns {Promise<string>} A string containing the HTML of the list items
     */
    getAboutMeList: async () => {
        const aboutMeData = await getAboutMeList();
        if (!aboutMeData) return;

        let aboutListHtml = '';
        aboutMeData.data.map(aboutList => {
            aboutListHtml += `
                <li class="about-me-item">${aboutList}</li>
            `;
        });

        return aboutListHtml;
    },
    /**
     * Renders the about me section list
     * @param {String} selector - The CSS selector of the target element
     * @returns {Promise<void>}
     */
    renderAboutMe: async (selector) => {
        const aboutMeList = await displayAboutMeList.getAboutMeList();
        const aboutMeContainer = getElement.single(selector);

        if (!aboutMeContainer) return;

        const aboutMeListUlWrapper = `<ul class="about-me-list">${aboutMeList}</ul>`;
        aboutMeContainer.insertAdjacentHTML('beforeend', aboutMeListUlWrapper);
    }
}

export { displayAboutMeList }

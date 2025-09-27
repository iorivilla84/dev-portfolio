import { getElement } from "../helpers/dom-helper.js";
import { formatterHelper } from "../helpers/formatter.js"

const copyRights = {
    /**
     * init fetch copyRights full year
     * @returns {void}
     */
    init: () => {
        const yearContainer = getElement.single('.footer-year');
        if (!yearContainer) return;

        copyRights.getCurrentYear(yearContainer);
    },
    /**
     * Fetch Current Year to append in copyrights
     * @param {String} container - The class of the element target
     * @returns {Number} A number with the current year
     */
    getCurrentYear: container => {
        container.textContent = formatterHelper.getFullYear();
    }
}

export { copyRights };

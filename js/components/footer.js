import { getElement } from "../helpers/dom-helper.js";
import { formatYear } from "../helpers/formatter.js"

const copyRights = {
    /**
     * init fetch copyRights full year
     * @returns {void}
     */
    init: () => {
        copyRights.getCurrentYear('.footer-year');
    },
    /**
     * Fetch Current Year to append in copyrights
     * @param {String} container - The class of the element target
     * @returns {Number} A number with the current year
     */
    getCurrentYear: container => {
        
        const yearContainer = getElement.single(container);
        if (!yearContainer) return;
    
        yearContainer.innerHTML = formatYear.getFullYear();
    }
}

export { copyRights };

import { getElement } from '../helpers/dom-helper.js';
import { getSkills } from '../controllers/dev-skills-list-model.js';
import { accordionEventHandlers } from '../controllers/accordion-event-handlers.js'

const displaySkills = {
    /**
     * Initialise my skills settings
     * @async
     * @returns {void}
     */
    init: async () => {
        const mySkillsContainer = getElement.single('.my-skills-list-wrapper');

        await displaySkills.devSkills(mySkillsContainer);
        accordionEventHandlers.init(mySkillsContainer, '.skill-accordion__link');
    },
    /**
     * Fetches the list of skills to append in the front end
     * @async
     * @returns {Promise<Array<Object>>} An array of skills objects
     */
    fetchSkillsData: async () => {
        const devSkillListResponse = await getSkills();
        if (!devSkillListResponse) return;

        return devSkillListResponse.data;
    },
    /**
     * Converts the skills data object into an HTML string
     * @param {object} skillsData - The skills data object
     * @returns {string} The HTML string of the skills items
     */
    getSkillsItemsList: (skillsData) => {
        if (!skillsData) return;
        const normaliseSkillsData = Array.isArray(skillsData) ? skillsData : [skillsData];

        const skillsHtmlContainer = normaliseSkillsData.map(category => {
            if (category.items && category.items.length > 0) {
                const skillsItems = category.items.map(item => `
                    <li class="code-style skill-item">${item}</li>
                `).join('');

                return `
                    <div class="accordion-item skill-accordion">
                        <div class="accordion-header">
                            <h4 class="skill-accordion__heading">
                                <button type="button" class="skill-accordion__link accordion-link-button" aria-expanded="false" data-toggle="collapse">
                                    ${category.name}
                                </button>
                            </h4>
                        </div>
                        <div class="skill-accordion__body accordion-content" role="region">
                            <ul class="skill-accordion__list my-skills-list skills-list">
                                ${skillsItems}
                            </ul>
                        </div>
                    </div>
                `
            }
            return '';
        }).join('');

        return skillsHtmlContainer;
    },
    /**
     * initialise and append the dev skills into the DOM
     * @param {HTMLElement} listContainer - The container element to append the dev skills
     * @returns {void}
     */
    devSkills: async (listContainer) => {
        const devSkillListData = await displaySkills.fetchSkillsData();
        const devSkillItems = displaySkills.getSkillsItemsList(devSkillListData);

        if (!devSkillListData || !devSkillItems) return;

        listContainer.insertAdjacentHTML('beforeend', devSkillItems);
    }
}

export { displaySkills }

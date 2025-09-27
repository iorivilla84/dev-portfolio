import { getElement } from '../helpers/dom-helper.js';
import { getSkills } from '../controllers/dev-skills-list-model.js';
import { accordionEventHandlers } from '../controllers/accordion-event-handlers.js'
import { formatterHelper } from "../helpers/formatter.js";

const displaySkills = {
    /**
     * Initialise my skills settings
     * @async
     * @returns {void}
     */
    init: async () => {
        await displaySkills.renderDevSkills('.my-skills-wrapper');
        accordionEventHandlers.init('.my-skills-list-content', '.skill-accordion__link');
    },
    /**
     * Converts the skills data object into an HTML string
     * @param {object} skillsData - The skills data object
     * @returns {string} The HTML string of the skills items
     */
    getSkillsItemsList: (skillsData) => {
        if (!skillsData) return;

        return formatterHelper.arrayFormatter(skillsData, (skill) => {
            if (!skill.items?.length) return '';

            const skillsItems = skill.items.map(item => `
                <li class="code-style skill-item">${item}</li>
            `).join('');

            return `
                <div class="accordion-item skill-accordion">
                    <div class="accordion-header">
                        <h4 class="skill-accordion__heading">
                            <button type="button" class="skill-accordion__link accordion-link-button" aria-expanded="false" data-toggle="collapse">
                                ${skill.name}
                            </button>
                        </h4>
                    </div>
                    <div class="skill-accordion__body accordion-content" role="region">
                        <ul class="skill-accordion__list my-skills-list skills-list">
                            ${skillsItems}
                        </ul>
                    </div>
                </div>
            `;
        });
    },
    /**
     * Creates an HTML string for displaying a section title
     * @param {string|string[]} sectionTitle - The section title to be displayed
     * @returns {string} An HTML string of the section title
     */
    getSectionTitle: (sectionTitle) => {
        const sectionTitleInfo = formatterHelper.arrayFormatter(sectionTitle, (sectionTitle) => sectionTitle || 'Section Title');
        return sectionTitleInfo;
    },
    /**
     * initialise and append the dev skills into the DOM
     * @param {HTMLElement} listContainer - The list container element
     * @returns {Promise<void>}
     */
    renderDevSkills: async (listContainer) => {
        const { status, categories, section_title } = await getSkills();
        const devSkillItems = displaySkills.getSkillsItemsList(categories);
        const skillsContainer = getElement.single(listContainer);
        const skillsListContent = skillsContainer.querySelector('.my-skills-list-content');
        const skillsSectionTitle = skillsContainer.querySelector('.my-skills-title');

        if (status !== 'ok'
            || !devSkillItems
            || !skillsContainer
            || !skillsListContent
            || !skillsSectionTitle
        ) return;

        skillsSectionTitle.insertAdjacentHTML('beforeend', displaySkills.getSectionTitle(section_title));
        skillsListContent.insertAdjacentHTML('beforeend', displaySkills.getSkillsItemsList(categories));
    }
}

export { displaySkills }

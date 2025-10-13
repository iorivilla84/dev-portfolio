import { getElement } from '../helpers/dom-helper.js';
import { getSkills } from '../controllers/dev-skills-list-model.js';
import { accordionController } from '../controllers/accordion-controller.js'
import { formatterHelper } from "../helpers/formatter.js";
import { messageHelper } from "../helpers/messages.js";

const displaySkills = {
    /**
     * Initialise my skills settings
     * @async
     * @returns {void}
     */
    init: async () => {
        const model = await getSkills();
        const skillsContainer = getElement.single('.my-skills-wrapper');
        if (!model || !skillsContainer) return;

        await displaySkills.renderDevSkills(skillsContainer, model);
        accordionController.init('.my-skills-list-content', '.skill-accordion__link');
    },
    /**
     * Converts the skills data object into an HTML string
     * @param {object} skillsData - The skills data object
     * @returns {string} The HTML string of the skills items
     */
    getSkillsItemsList: (skillsData) => {
        if (!skillsData) return;
        return formatterHelper.arrayFormatter(skillsData, (skill) => {
            const skillsItems = skill?.items?.map(item => {
                return item
                    ? `<li class="code-style skill-item">${item.trim()}</li>`
                    : messageHelper.alert('Item Not Available', 'li')
            }).join('');

            return `
                <div class="accordion-item skill-accordion">
                    <div class="accordion-header">
                        <h4 class="skill-accordion__heading">
                            <button type="button" class="skill-accordion__link accordion-link-button" aria-expanded="false" data-toggle="collapse">
                                ${skill?.name || messageHelper.alert('Accordion Name Not Available')}
                            </button>
                        </h4>
                    </div>
                    <div class="skill-accordion__body accordion-content" role="region">
                        <ul class="skill-accordion__list my-skills-list skills-list">
                            ${skillsItems || messageHelper.alert('No Skills Available', 'li')}
                        </ul>
                    </div>
                </div>
            `;
        });
    },
    /**
     * initialise and append the dev skills into the DOM
     * @param {NodeListOf<HTMLElement>} wrapper - The list container element
     * @param {HTMLElement} model - The skills model object
     * @returns {Promise<void>}
     */
    renderDevSkills: (wrapper, model) => {
        const { status, categories, section_title } = model;
        const devSkillItems = displaySkills.getSkillsItemsList(categories);
        const skillsListContent = wrapper.querySelector('.my-skills-list-content');
        const skillsSectionTitle = wrapper.querySelector('.my-skills-title');

        if (status !== 'ok'
            || !devSkillItems
            || !skillsListContent
            || !skillsSectionTitle
        ) return;

        skillsSectionTitle.textContent = section_title || 'Section Title';
        skillsListContent.insertAdjacentHTML('beforeend', displaySkills.getSkillsItemsList(categories));
    }
}

export { displaySkills }

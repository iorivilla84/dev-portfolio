import { getElement } from '../helpers/dom-helper.js';
import { getSkills } from '../controllers/dev-skills-list-model.js';
import { accordionEventHandlers } from '../controllers/accordion-event-handlers.js'

const displaySkills = {
    /**
     * Initialise my skills settings
     * @returns {void}
     */
    init: () => {
        displaySkills.devSkills('.my-skills-list-wrapper');
    },
    fetchSkillsData: async () => {
        const devSkillListResponse = await getSkills();
        if (!devSkillListResponse) return;

        return devSkillListResponse.data;
    },
    getSkillsItemsList: (skillsData) => {
        if (!skillsData) return;

        let skillsHtmlContainer = '';
        skillsData.forEach(category => {
            if (category.items && category.items.length > 0) {
                const skillsItems = category.items.map(item => `
                    <li class="code-style skill-item">${item}</li>
                `).join('');

                skillsHtmlContainer += `
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

        })

        return skillsHtmlContainer;
    },
    devSkills: async (listContainer) => {
        const mySkillsContainer = getElement.single(listContainer);
        const devSkillListData = await displaySkills.fetchSkillsData();
        const devSkillItems = displaySkills.getSkillsItemsList(devSkillListData);

        if (!mySkillsContainer || !devSkillListData || !devSkillItems) return;

        mySkillsContainer.insertAdjacentHTML('beforeend', devSkillItems);
        accordionEventHandlers.init('.my-skills-list-wrapper', '.skill-accordion__link');
    }
}

export { displaySkills }

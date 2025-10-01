import { getElement } from "../helpers/dom-helper.js";
import { getExperienceList } from '../controllers/experience-list-model.js'
import { accordionEventHandlers } from '../controllers/accordion-event-handlers.js'
import { formatterHelper } from "../helpers/formatter.js";

const displayDevExperience = {
    /**
     * Initializes the component by fetching the experience list and rendering it
     * @async
     * @returns {Promise<void>}
     */
    init: async () => {
        const experienceWrapper = getElement.single('.experience-wrapper');
        const model = await getExperienceList();
        if (!experienceWrapper || !model) return;

        await displayDevExperience.displayWorkExperience(experienceWrapper, model);
    },
    /**
     * Returns an HTML string representing the stack list for the given experience.
     * @param {object} experience - The experience object
     * @returns {string} The HTML string of the stack list
     */
    getExperienceLanguages: experience => {
        if (!experience) return '';

        const languagesList = formatterHelper.arrayFormatter(experience?.stack, language => {
            return `<li class="stack-list__item code-style">${language.trim() || 'Item Not Available'}</li>`
        });

        return `<ul class="stack-list">${languagesList.length ? languagesList : '<li>No Stack List Available</li>'}</ul>`;
    },
    /**
     * Returns an HTML string representing the responsibilities list for the given experience.
     * @param {object} experience - The experience object
     * @returns {string} The HTML string of the responsibilities list
     */
    getResponsibilities: (experience) => {
        if (!experience) return '';

        const responsibilitiesList = formatterHelper.arrayFormatter(experience?.responsibilities, duty => {
            return `<li class="experience-item-list experience-duties">${duty || 'Item Not Available'}</li>`
        })

        return `
            <ul class="experience-duties-wrapper experience-duties-list">
                ${responsibilitiesList.length ? responsibilitiesList : '<li>No Responsibilities Available</li>'}
            </ul>
        `;
    },
    /**
     * Returns an HTML string representing the position and period for the given experience.
     * @param {object} experience - The experience object
     * @returns {string} The HTML string of the position and period
     */
    getExperienceHeader: experience => {
        return `
            <h4 class="experience-info-accordion__heading">
                <button type="button" class="experience-info-accordion__link accordion-link-button" aria-expanded="false" data-toggle="collapse">
                    ${experience?.position
                        ? `<div class="experience-info-accordion__position">${experience.position}</div>`
                        : `<div class="experience-info-accordion__position">No Position Item Available</div>`}
                    ${experience?.period_time
                        ? `<div class="experience-info-accordion__period">${experience.period_time}</div>`
                        : `<div class="experience-info-accordion__period">No Period Item Available</div>`}
                </button>
            </h4>
        `
    },
    /**
     * Returns an HTML string representing the company logo for the given experience.
     * @param {object} experience - The experience object
     * @returns {string} The HTML string of the company logo
     */
    getCompanyLogo: experience => {
        return `
            <div class="experience-info-accordion__company-logo">
                <img class="company-logo-img"
                    src="${experience.company_logo || 'https://static.vecteezy.com/system/resources/previews/004/141/669/non_2x/no-photo-or-blank-image-icon-loading-images-or-missing-image-mark-image-not-available-or-image-coming-soon-sign-simple-nature-silhouette-in-frame-isolated-illustration-vector.jpg'}"
                    alt="${experience.company_logo && experience.company_name ? experience.company_name : 'No Company Name Available'}" loading="lazy">
            </div>
        `
    },
    /**
     * Returns an HTML string representing the location and company link for the given experience.
     * @param {object} experience - The experience object
     * @returns {string} The HTML string of the location and company link
     */
    getExperienceLocation: experience => {
        return `
            ${experience?.location
                ? `<div class="city location-item">${experience.location}</div>`
                : `<div class="city location-item">No Location Available</div>`}
            ${experience?.company_link
                ? `
                    <div class="company-link location-item">
                        <a href="${experience.company_link || '#'}" target="_blank" rel="noopener noreferrer" aria-label="Learn more">${experience.company_link || 'Company Link'}</a>
                    </div>`
                : '<div class="company-link location-item">No Company Link Available</div>'}
        `
    },
    /**
     * Returns an HTML string representing the complete experience template.
     * @param {object} experience - The experience object
     * @returns {string} The HTML string of the complete experience template.
     */
    workExperienceTemplate: experience => {
        const renderHeaderTemplate = displayDevExperience.getExperienceHeader(experience);
        const renderCompanyLogoTemplate = displayDevExperience.getCompanyLogo(experience);
        const renderCompanyLocationTemplate = displayDevExperience.getExperienceLocation(experience);
        const renderResponsibilitiesTemplate = displayDevExperience.getResponsibilities(experience);
        const renderLanguagesTemplate = displayDevExperience.getExperienceLanguages(experience);
        return `
            <div class="accordion-item experience-info-accordion">
                <div class="accordion-header">
                    ${renderHeaderTemplate}
                </div>
                <div class="experience-info-accordion__body accordion-content" role="region">
                    <div class="col-12 experience-info-accordion__content">
                        <div class="row">
                            <div class="col-12 col-lg-3 d-flex mb-4 mb-lg-0">
                                ${renderCompanyLogoTemplate}
                            </div>
                            <div class="col-12 col-lg-9 experience-info-accordion__text-wrapper">
                                <div class="experience-info-accordion__location d-flex flex-wrap">
                                    ${renderCompanyLocationTemplate}
                                </div>
                                <div class="experience-info-accordion__responsibility">
                                ${renderResponsibilitiesTemplate}
                                </div>
                                <div class="stack">
                                    ${renderLanguagesTemplate}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `
    },
    /**
     * Renders the work experience section based on the given data model
     * @param {HTMLElement} wrapper - The container of the target element.
     * @param {object} model - The model containing the experience data
     * @returns {void}
     */
    displayWorkExperience: (wrapper, model) => {
        const { status, section_title, experience } = model;
        const experienceWrapper = wrapper.querySelector('.experience-content-wrapper');
        const experienceSectionTitle = wrapper.querySelector('.experience-title');
        if (!experienceWrapper || !experienceSectionTitle || status !== 'ok') return;

        experienceSectionTitle.textContent = section_title || "Section Title";
        const html = formatterHelper.arrayFormatter(experience, displayDevExperience.workExperienceTemplate);
        experienceWrapper.insertAdjacentHTML('beforeend', html);

        accordionEventHandlers.init('.experience-content-wrapper', '.experience-info-accordion__link');
    }
}

export { displayDevExperience }

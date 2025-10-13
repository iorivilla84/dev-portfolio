import { getElement } from "../helpers/dom-helper.js";
import { getExperienceList } from '../controllers/experience-list-model.js'
import { accordionController } from '../controllers/accordion-controller.js'
import { formatterHelper } from "../helpers/formatter.js";
import { urlValidation } from "../helpers/url.js";
import { getSiteData } from "../controllers/site.js";
import { messageHelper } from "../helpers/messages.js";

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
     * Returns an HTML string representing the stack list for the given experience
     * @param {object} experience - The experience object
     * @returns {string} The HTML string of the stack list
     */
    getExperienceLanguages: experience => {
        if (!experience) return {};

        const languagesList = formatterHelper.arrayFormatter(experience?.stack, language => {
            return language
                ? `<li class="stack-list__item code-style">${language.trim()}</li>`
                : messageHelper.alert('Item Not Available', 'li');
        });

        return `<ul class="stack-list">${languagesList?.length ? languagesList : messageHelper.alert('No Stack List Available', 'li')}</ul>`;
    },
    /**
     * Returns an HTML string representing the responsibilities list for the given experience
     * @param {object} experience - The experience object
     * @returns {string} The HTML string of the responsibilities list
     */
    getResponsibilities: (experience) => {
        if (!experience) return {};

        const responsibilitiesList = formatterHelper.arrayFormatter(experience?.responsibilities, duty => {
            return `<li class="experience-item-list experience-duties">${duty || messageHelper.alert('Item Not Available', 'p')}</li>`
        })

        return `
            <ul class="experience-duties-wrapper experience-duties-list">
                ${responsibilitiesList.length ? responsibilitiesList : messageHelper.alert('No Responsibilities Available', 'li')}
            </ul>
        `;
    },
    /**
     * Returns an HTML string representing the position and period for the given experience
     * @param {object} experience - The experience object
     * @returns {string} The HTML string of the position and period
     */
    getExperienceHeader: experience => {
        if (!experience) return {};

        return `
            <h4 class="experience-info-accordion__heading">
                <button type="button" class="experience-info-accordion__link accordion-link-button" aria-expanded="false" data-toggle="collapse">
                    ${experience?.position
                        ? `<div class="experience-info-accordion__position">${experience?.position}</div>`
                        : messageHelper.alert('No Position Item Available')}
                    ${experience?.period_time
                        ? `<div class="experience-info-accordion__period">${experience?.period_time}</div>`
                        : messageHelper.alert('No Period Item Available')}
                </button>
            </h4>
        `
    },
    /**
     * Returns an HTML string representing the company logo for the given experience
     * @async
     * @param {object} experience - The experience object
     * @param {string} fallbackImg - The fallback image path or URL used when an image fails to load
     * @returns {string} The HTML string of the company logo
     */
    getCompanyLogo: async (experience, fallbackImg) => {
        if (!experience) return {};
        const validateImg = await urlValidation.init(experience?.company_logo, fallbackImg);

        return `
            <div class="experience-info-accordion__company-logo">
                <img class="company-logo-img"
                    src="${validateImg}"
                    alt="${experience?.company_logo && experience?.company_name ? experience?.company_name : 'No Company Name Available'}" loading="lazy">
            </div>
        `
    },
    /**
     * Returns an HTML string representing the location and company link for the given experience
     * @param {object} experience - The experience object
     * @returns {string} The HTML string of the location and company link
     */
    getExperienceLocation: (experience) => {
        if (!experience) return {};
        const validateUrl = urlValidation.isValidHttpUrl(experience?.company_link);
        let validCompanyUrl = validateUrl
            ? `<a href="${experience?.company_link || '#'}" target="_blank" rel="noopener noreferrer" aria-label="Learn more">${experience?.company_link || 'Company Link'}</a>`
            : messageHelper.alert('Invalid URL. Please make sure it starts with http:// or https:// and points to a valid resource.', 'span');

        return `
            <div class="city location-item">${experience?.location || messageHelper.alert('No Location Available')}</div>

            ${experience?.company_link
                ? `
                    <div class="company-link location-item">
                        ${validCompanyUrl}
                    </div>`
                : messageHelper.alert('No Company Link Available')}
        `
    },
    /**
     * Returns an HTML string representing the complete experience template.
     * @async
     * @param {object} experience - The experience object
     * @returns {string} The HTML string of the complete experience template.
     */
    workExperienceTemplate: async (experience) => {
        const { status, site } = await getSiteData();
        if (status !== 'ok' || !site) return {};

        const fallbackImage = site?.fallback_image;
        if (!fallbackImage) return '';

        const renderHeaderTemplate = displayDevExperience.getExperienceHeader(experience);
        const renderCompanyLogoTemplate = await displayDevExperience.getCompanyLogo(experience, fallbackImage);
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
     * @async
     * @param {HTMLElement} wrapper - The container of the target element
     * @param {object} model - The model containing the experience data
     * @returns {void}
     */
    displayWorkExperience: async (wrapper, model) => {
        const { status, experience } = model;
        const experienceWrapper = wrapper.querySelector('.experience-content-wrapper');
        if (!experienceWrapper || status !== 'ok') return;

        const html = (await Promise.all(
            experience?.map(exp => displayDevExperience.workExperienceTemplate(exp))
        )).join('');

        experienceWrapper.insertAdjacentHTML('beforeend', html);

        accordionController.init('.experience-content-wrapper', '.experience-info-accordion__link');
    }
}

export { displayDevExperience }

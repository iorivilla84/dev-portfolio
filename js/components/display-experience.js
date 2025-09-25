import { getElement } from "../helpers/dom-helper.js";
import { getExperienceList } from '../controllers/experience-list-model.js'
import { accordionEventHandlers } from '../controllers/accordion-event-handlers.js'

const displayDevExperience = {
    /**
     * Init DV experience list
     * @async
     * @returns {void}
     */
    init: async () => {
        await displayDevExperience.renderWorkExperience();
    },
    getExperienceData: async () => {
        const { data } = await getExperienceList();
        if (!data) return;

        return data;
    },
    getExperienceLanguages: languages => {
        if (!Array.isArray(languages?.stack)) return '';

        const languagesList = Array.isArray(languages?.stack)
            ? languages.stack.map(language => `<li class="stack-list__item code-style">${language}</li>`)
            : [];
        const languagesHtmlTemplate = languagesList.length > 0
            ? `<ul class="stack-list">${languagesList.join('')}</ul>`
            : '';

        return languagesHtmlTemplate;
    },
    getResponsibilities: (experience) => {
        if (!Array.isArray(experience?.responsibilities)) return '';

        const responsibilities = Array.isArray(experience?.responsibilities)
            ? experience.responsibilities
            : [];

        const responsibilitiesList = responsibilities?.map(responsibility => {
            return `<li class="experience-item-list experience-duties">${responsibility}</li>`
        }).join('');

        return `
            <ul class="experience-duties-wrapper experience-duties-list">
                ${responsibilitiesList}
            </ul>
        `
    },
    getExperienceHeader: experience => {
        return `
            <h4 class="experience-info-accordion__heading">
                <button type="button" class="experience-info-accordion__link accordion-link-button" aria-expanded="false" data-toggle="collapse">
                    ${experience?.position
                        ? `<div class="experience-info-accordion__position">${experience.position}</div>`
                        : ''}
                    ${experience?.period_time
                        ? `<div class="experience-info-accordion__period">${experience.period_time}</div>`
                        : ''}
                </button>
            </h4>
        `
    },
    getCompanyLogo: experience => {
        return `
            <div class="experience-info-accordion__company-logo">
                ${experience?.company_logo
                    ? `<img class="company-logo-img" src="${experience.company_logo}" alt="${experience.company_name}" loading="lazy">`
                    : ''}
            </div>
        `
    },
    getExperienceLocation: experience => {
        return `
            ${experience?.location ? `<div class="city location-item">${experience.location}</div>` : ''}
            ${experience?.company_link
                ? `
                    <div class="company-link location-item">
                        <a href="${experience.company_link}" target="_blank" rel="noopener noreferrer">${experience.company_link}</a>
                    </div>`
                : ''}
        `
    },
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
    renderWorkExperience: async () => {
        const experienceData = await displayDevExperience.getExperienceData();
        const experienceWrapper = getElement.single('.experience-content-wrapper');

        if (!experienceWrapper || !experienceData) return;

        experienceData.forEach(experience => {
            experienceWrapper.insertAdjacentHTML('beforeend', displayDevExperience.workExperienceTemplate(experience))
        });

        accordionEventHandlers.init('.experience-content-wrapper', '.experience-info-accordion__link');
    }
}

export { displayDevExperience }

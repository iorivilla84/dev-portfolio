import { getElement } from "../helpers/dom-helper.js";
import { getExperienceList } from '../controllers/experience-list-model.js'
import { accordionEventHandlers } from '../controllers/accordion-event-handlers.js'

const displayDevExperience = {
    /**
     * Init DV experience list
     * @returns {void}
     */
    init: async () => {
        displayDevExperience.renderWorkExperience();
    },
    getExperienceData: async () => {
        const experienceData = await getExperienceList();
        if (!experienceData) return;

        return experienceData.data;
    },
    getExperienceLanguages: languages => {
        const languagesList = Array.isArray(languages?.stack)
            ? languages.stack.map(language => `<li class="stack-list__item code-style">${language}</li>`)
            : [];
        const languagesHtmlTemplate = languagesList.length > 0
            ? `<ul class="stack-list">${languagesList.join('')}</ul>`
            : '';

        return languagesHtmlTemplate;
    },
    getResponsibilities: (experience) => {
        const responsibilities = Array.isArray(experience?.responsibilities)
            ? experience.responsibilities
            : [];

        const responsibilitiesList = responsibilities?.map(responsibility => {
            return `<li class="experience-item-list experience-duties">${responsibility}`
        }).join('');

        const responsibilitiesHtml = `
            <ul class="experience-duties-wrapper experience-duties-list">
                ${responsibilitiesList}
            </ul>
        `

        return responsibilitiesHtml;
    },
    getExperienceHeader: experience => {
        const headerHtmlTemplate = `
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

        return headerHtmlTemplate;
    },
    getCompanyLogo: experience => {
        const companyLogoHtmlTemplate = `
            <div class="experience-info-accordion__company-logo">
                ${experience?.company_logo
                    ? `<img class="company-logo-img" src="${experience.company_logo}" alt="${experience.company_name}">`
                    : ''}
            </div>
        `
        return companyLogoHtmlTemplate;
    },
    getExperienceLocation: experience => {
        const locationHtmlTemplate = `
            ${experience?.location ? `<div class="city location-item">${experience.location}</div>` : ''}
            ${experience?.company_link
                ? `
                    <div class="company-link location-item">
                        <a href="${experience.company_link}" target="_blank" rel="noopener noreferrer">${experience.company_link}</a>
                    </div>`
                : ''}
        `
        return locationHtmlTemplate;
    },
    workExperienceTemplate: experience => {
        const renderHeaderTemplate = displayDevExperience.getExperienceHeader(experience);
        const renderCompanyLogoTemplate = displayDevExperience.getCompanyLogo(experience);
        const renderCompanyLocationTemplate = displayDevExperience.getExperienceLocation(experience);
        const renderResponsibilitiesTemplate = displayDevExperience.getResponsibilities(experience);
        const renderLanguagesTemplate = displayDevExperience.getExperienceLanguages(experience);
        const accordionHtmlTemplate = `
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
        return accordionHtmlTemplate;
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

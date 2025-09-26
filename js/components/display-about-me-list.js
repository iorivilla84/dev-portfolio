import { getElement } from "../helpers/dom-helper.js";
import { getAboutMeList } from "../controllers/about-me-model.js";
import { formatterHelper } from "../helpers/formatter.js";

const displayAboutMeList = {
    /**
     * Init about me section list
     * @async
     * @returns {void}
     */
    init: async () => {
        await displayAboutMeList.displayAboutMeInfo('.get-to-know-me-wrapper')
    },
    /**
     * Creates the HTML template for the about me description items
     * @param {Object} description - The description object
     * @returns {string} - An HTML string of list items containing the descriptions
     */
    descriptionTemplate: (description) => {
        const descriptionArray = formatterHelper.arrayFormatter(description, (description) => description || '');
        return descriptionArray
            ? `
                <li class="about-me-item">${descriptionArray}</li>
            `
            : '';
    },
    /**
     * Creates an HTML string for displaying a link to download a CV otherwise empty.
     * @param {string} cv_link - The link to the CV.
     * @returns {string} - An HTML string of a link to download the CV.
     */
    cvLinkTemplate: (cv_link) => {
        const linkInfo = formatterHelper.arrayFormatter(cv_link, (cv_link) => cv_link || 'http://example.com');
        return linkInfo
            ? `
                <a href="${linkInfo}" class="download-btn btn btn-primary" target="_blank">
                    Download CV
                </a>
            `
            : '';
    },
    /**
     * Creates an HTML string for displaying a link to download a CV otherwise empty.
     * @param {string} cv_link - The link to the CV.
     * @returns {string} - An HTML string of a link to download the CV.
     */
     subTitleResumeTemplate: (subTitle) => {
        const subTitleInfo = formatterHelper.arrayFormatter(subTitle, (subTitle) => subTitle || 'SubTitle');
        return subTitleInfo;
    },
    /**
     * Creates an HTML string for displaying a link to download a CV otherwise empty.
     * @param {string} cv_link - The link to the CV.
     * @returns {string} - An HTML string of a link to download the CV.
     */
     titleSectionTemplate: (sectionTitle) => {
        const sectionTitleInfo = formatterHelper.arrayFormatter(sectionTitle, (sectionTitle) => sectionTitle || 'Section Title');
        return sectionTitleInfo;
    },
    /**
     * Renders the about me section list
     * @param {String} selector - The CSS selector of the target element
     * @async
     * @returns {Promise<void>}
     */
    displayAboutMeInfo: async (selector) => {
        const {
            status,
            main_title,
            section_title,
            description,
            cv_link
        } = await getAboutMeList();
        const aboutMeContainer = getElement.single(selector);
        const aboutMeSectionContainer = aboutMeContainer.closest('.about-me-wrapper');
        const aboutMeSectionTitle = aboutMeSectionContainer.querySelector('.about-me-title');
        const aboutMeSubtitle = aboutMeContainer.querySelector('.about-me-subtitle');
        const descriptionContainer = aboutMeContainer.querySelector('.about-me-list');

        if (
            !aboutMeContainer
            || !aboutMeSectionContainer
            || !aboutMeSectionTitle
            || !aboutMeSubtitle
            || !descriptionContainer
            || !main_title.length
            || !section_title.length
            || !description.length
            || !cv_link.length
        ) return;

        if (status === 'ok') {
            aboutMeSectionTitle.insertAdjacentHTML('beforeend', displayAboutMeList.titleSectionTemplate(main_title));
            aboutMeSubtitle.insertAdjacentHTML('afterbegin', displayAboutMeList.subTitleResumeTemplate(section_title));
            description?.forEach(desc => {
                descriptionContainer.insertAdjacentHTML('beforeend', displayAboutMeList.descriptionTemplate(desc));
            });
            descriptionContainer.insertAdjacentHTML('afterend', displayAboutMeList.cvLinkTemplate(cv_link));
        }
    }
}

export { displayAboutMeList }

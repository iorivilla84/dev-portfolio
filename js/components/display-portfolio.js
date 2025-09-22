import { getElement } from "../helpers/dom-helper.js";
import { getPortfolioListModel } from "../controllers/portfolio-list-model.js";
import { filteredProjectsEventHandler } from "../controllers/filtering-projects-event-handler.js";

const displayPortfolioGrid = {
    /**
     * Init portfolio grid list of images
     * @returns {void}
     */
    init: async () => {
        await displayPortfolioGrid.displayPortfolio('.projects-list-container');
        await displayPortfolioGrid.renderFilterButtons('.project-list-filter');
        displayPortfolioGrid.renderFilterProjects('.btn-filter');
    },
    /**
     * Creates the card html template to append into the gridContainer
     * @param {Object} project - The object with all the portfolio projects details
     * @param {HTMLDivElement} gridContainer - The grid container element to append template
     * @returns {void}
     */
    portfolioCardTemplate: (project, gridContainer) => {
        const projectLanguagesList = project.stack
            .map(language => `
                <span class="code-style skill-item d-inline-block">${language}</span>
            `).join(' ');

        const projectsListHtmlTemplate = `
            <div class="col">
                <div class="card border-0 bg-transparent text-white h-100" data-project-type="${project.type}" data-project-id="${project.id_number}">
                    <div class="card-image-wrapper card-img-top">
                        <img src="${project.imgPath}" class="card-project-image" alt="${project.name}">
                    </div>
                    <div class="card-body px-0 mb-4">
                        <h5 class="card-title fw-bold fs-3">${project.name}</h5>
                        <div class="card-text project-skills-wrapper mb-1">${projectLanguagesList}</div>

                        ${project.code_link || project.application_link || project.site_link || project.prototype_link
                            ? `
                                <div class="buttons-wrapper pt-3">
                                    ${project.code_link ? `<a href="${project.code_link}" class="btn btn-primary" target="_blank">View Code</a>` : ''}
                                    ${project.application_link ? `<a href="${project.application_link}" class="btn btn-primary" target="_blank">View Project</a>` : ''}
                                    ${project.site_link ? `<a href="${project.site_link}" class="btn btn-primary" target="_blank">View Website</a>` : ''}
                                    ${project.prototype_link ? `<a href="${project.prototype_link}" class="btn btn-primary" target="_blank">View Prototype</a>` : ''}
                                </div>
                            `
                            : ''
                        }
                    </div>
                </div>
            </div>
        `;

        gridContainer.innerHTML += projectsListHtmlTemplate;
    },
    /**
     * Render and append the project cards list into the targeted container element
     * @param {String} container - The CSS selector of the target container element.
     * @returns {void}
     */
    displayPortfolio: async (container) => {
        const portfolioDataObj = await getPortfolioListModel();
        const portfolioListObj = portfolioDataObj.data.portfolio;
        if (!portfolioDataObj && !portfolioListObj.length) return;

        const portfolioGridContainer = getElement.single(container);
        if (!portfolioGridContainer) return;

        portfolioListObj.forEach(project => displayPortfolioGrid.portfolioCardTemplate(project, portfolioGridContainer));
    },
    /**
     * Renders and appends the project filter list into the targeted container element
     * @param {String} container - The CSS selector of the target container element.
     * @returns {void}
     */
    renderFilterButtons: async (container) => {
        const portfolioDataObj = await getPortfolioListModel();
        const filterListObj = portfolioDataObj.data.project_filters;
        if (!portfolioDataObj && !filterListObj) return;

        const filterWrapper = getElement.single(container);
        if (!filterListObj) return;

        filterListObj.map(filter => {
            const filterHtmlList = `
                <li class="filter-item">
                    <button class="btn-filter" type="button" aria-controls="${filter}">${filter}</button>
                </li>
            `;

            filterWrapper.innerHTML += filterHtmlList;
        });
    },
    /**
     * Filtering portfolio projects based on type of project
     * @param {HTMLElement} filterBtn - The button element that triggers filtering.
     * @param {string} card - The CSS selector for the card elements to filter.
     */
    filteredProjects: (filterBtn, card) => {
        const currentProjectListArray = getElement.multiple(card);
        if (!currentProjectListArray.length && !projectContainer && !filterBtn) return;

        filteredProjectsEventHandler.toggleFilterClasses(filterBtn, currentProjectListArray);
    },
    /**
     * Renders and displays portfolio projects based on the button selector
     * @param {String} filterBtns - The CSS selector of the target buttons element.
     * @returns {void}
     */
    renderFilterProjects: filterBtns => {
        const projectsFilerBtns = getElement.multiple(filterBtns);
        if (!projectsFilerBtns.length) return;

        projectsFilerBtns.forEach(btn => {
            displayPortfolioGrid.filteredProjects(btn, '.projects-list-container .card', '.projects-list-container')
            displayPortfolioGrid.addFilterCounts(btn);
        });
    },
    /**
     * Add cards count to each button filter
     * @param {HTMLButtonElement} btn - The button element to append the cards count.
     * @returns {void}
     */
    addFilterCounts: (btn) => {
        const filterBtnValue = btn.getAttribute('aria-controls');
        const allCardsCount = getElement.multiple('[data-project-type]');

        let cardsCount = 0;
        if (filterBtnValue === 'All') {
            cardsCount = allCardsCount.length;
        } else {
            cardsCount = [...allCardsCount].filter(card => {
                const cardType = card.getAttribute('data-project-type')
                    .split(',').map(type => type.trim());
                return cardType.includes(filterBtnValue);
            }).length;
        }

        btn.insertAdjacentHTML('beforeend', `<span class="cards-count">${cardsCount}</span>`);
    }
}

export { displayPortfolioGrid };

import { getElement  } from "../helpers/dom-helper.js";

const filteredProjectsEventHandler = {
    /**
     * Initialize the filtering projects event handler
     * @param {HTMLButtonElement} filterBtn - The button element that triggers filtering projects
     * @param {Array<HTMLDivElement>} currentProjectListArray - The array of project list elements
     * @returns {void}
     */
    init: (filterBtn, currentProjectListArray) => {
        filteredProjectsEventHandler.toggleFilterClasses(filterBtn, currentProjectListArray);
    },
    /**
     * Resets all filter buttons by removing the 'is-filtered' class
     * @returns {void}
     */
    resetAllBtnsClasses: (filterBtns) => {
        const allFilterBtns = getElement.multiple(filterBtns);
        allFilterBtns.forEach(btn => {
            btn.classList.remove('is-filtered');
        });
    },
    /**
     * Handles the card projects event handler for filtering projects based on the button value
     * Adds or removes the project card from the view with animation
     * @param {Array<HTMLDivElement>} currentProjectListArray - The array of project list elements
     * @param {string} filteredBtnValue - The value of the selected filter button
     * @returns {void}
     */
    cardProjectsEventHandler: (currentProjectListArray, filteredBtnValue) => {
        currentProjectListArray.forEach(project => {
            const projectContainerEl = project.closest('.card-wrapper');
            const projectType = project.getAttribute('data-project-type').toLowerCase() || '';

            if (filteredBtnValue === 'all' || projectType.includes(filteredBtnValue)) {
                // Add card into the view
                projectContainerEl.style.display = 'block';
                requestAnimationFrame(() => {
                    project.classList.remove('hide');
                    project.classList.add('show');
                });
            } else {
                // Remove card from the view with animation
                project.classList.add('hide');
                project.classList.remove('show');
                project.addEventListener('transitionend', () => {
                    if (project.classList.contains('hide')) {
                        projectContainerEl.style.display = 'none';
                    }
                }, { once: true });
            }
        });
    },
    /**
     * Toggles the 'is-filtered' class on all filter buttons and
     * hides/shows the project list elements based on the selected filter button value
     * @param {HTMLButtonElement} filterBtn - The button element that triggers filtering projects
     * @param {Array<HTMLDivElement>} currentProjectListArray - The array of project list elements
     * @returns {void}
     */
    toggleFilterClasses: (filterContainer, currentProjectListArray) => {
        if (filterContainer.dataset.listenerAttached) return;
        filterContainer.dataset.listenerAttached = 'true';

        filterContainer.addEventListener('click', (e) => {
            const filterBtn = e.target.closest('.btn-filter');
            if (!filterBtn) return;

            filteredProjectsEventHandler.resetAllBtnsClasses('.btn-filter');

            const filteredBtnValue = filterBtn.getAttribute('aria-controls').toLowerCase();
            filterBtn.classList.add('is-filtered');

            filteredProjectsEventHandler.cardProjectsEventHandler(currentProjectListArray, filteredBtnValue);
        });
    }
}

export { filteredProjectsEventHandler }

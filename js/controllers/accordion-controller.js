import { getElement } from "../helpers/dom-helper.js";

const accordionController = {
    /**
     * Initialises the accordion event handlers
     * @param {String} wrapper - The class selector of the accordion wrapper
     * @param {String} linkSelector - The class selector of the accordion button link
     * @returns {void}
     */
    init: (wrapper, linkSelector) => {
        accordionController.initAccordion(wrapper, linkSelector);
    },
    /**
     * Set the aria-expanded in accordion on click
     * @param {HTMLElement} el - container of the target element
     * @returns {Boolean} expanded - true if expanded otherwise false
     */
    setAriaExpanded: (el, expanded) => {
        el.setAttribute('aria-expanded', expanded ? 'true' : 'false');
    },
    getPanelFullHeight: (panel) => {
        const scrollHeight = panel.scrollHeight || 0;
        let extra = 0;
        const firstChild = panel.firstElementChild;
        const lastChild = panel.lastElementChild;
        if (firstChild) extra += parseFloat(getComputedStyle(firstChild).marginTop) || 0;
        if (lastChild) extra += parseFloat(getComputedStyle(lastChild).marginBottom) || 0;
        return Math.ceil(scrollHeight + extra);
    },
    /**
     * Reset classes and content height for each accordion
     * @param {NodeListOf<HTMLElement>} accordionLinks - All accordions buttons
     * @param {NodeListOf<HTMLElement>} allAccordions - All accordions contents
     * @returns {void}
     */
    resetAllAccordions: (accordionLinks, allAccordions) => {
        accordionLinks.forEach(header => {
            header.classList.remove('active');
            accordionController.setAriaExpanded(header, false);
        });
        allAccordions.forEach(content => {
            content.classList.remove('active');
            content.style.maxHeight = 0;
            accordionController.setAriaExpanded(content, true)
        });
    },
    /**
     * Toggle the classes for each accordion
     * @param {HTMLElement} accordion - The element attached to the event listener
     * @param {NodeListOf<HTMLElement>} accordionLinks - The accordion buttons
     * @param {NodeListOf<HTMLElement>} allAccordions - The accordion contents
     * @returns {void}
     */
    toggleAccordionClasses: (accordion, accordionLinks, allAccordions) => {
        accordion.addEventListener('click', (e) => {
            e.preventDefault();
            const currentAccordion = e.currentTarget;
            const currentAccordionWrapper = currentAccordion?.closest('.accordion-item');
            const currentAccordionContent = currentAccordionWrapper?.querySelector('.accordion-content');

            if (!currentAccordionWrapper || !currentAccordionContent) return;

            const isActive = currentAccordionContent.classList.contains('active');

            // reset all accordions
            accordionController.resetAllAccordions(accordionLinks, allAccordions)

            // Toggle class active
            if (!isActive) {
                currentAccordion.classList.add('active');
                accordionController.setAriaExpanded(currentAccordion, true);
                accordionController.setAriaExpanded(currentAccordionContent, true);
                currentAccordionContent.classList.add('active');

                const height = accordionController.getPanelFullHeight(currentAccordionContent) + "px";
                currentAccordionContent.style.maxHeight = height;
                currentAccordionContent.addEventListener("transitionend", function handler(e) {
                    if (e.propertyName === "max-height") {
                        currentAccordionContent.style.maxHeight = "none";
                        currentAccordionContent.removeEventListener("transitionend", handler);
                    }
                });
            } else {
                currentAccordionContent.style.maxHeight =
                    accordionController.getPanelFullHeight(currentAccordionContent) + "px";
                requestAnimationFrame(() => {
                    currentAccordionContent.style.maxHeight = "0";
                });

                accordionController.setAriaExpanded(currentAccordion, false);
                accordionController.setAriaExpanded(currentAccordionContent, false);
            };
        });
    },
    /**
     * Set the aria-label or aria-labelledby attribute based on the element, attribute, id and index
     * @param {HTMLElement} el - The element to set the attribute
     * @param {String} attribute - The attribute to set
     * @param {String} id - The id to set
     * @param {Number} index - The index of the element
     * @returns {void}
     */
    setAriaAttribute: (el, attribute, id, index) => {
        const idNum = index + 1;
        el.setAttribute(`${attribute}`, `${id}-${idNum}`);
    },
    /**
     * Sets the aria-label or aria-labelledby attribute based on the element, attribute, id and index.
     * @param {HTMLElement} element - The element to set the attribute
     * @param {String} attribute - The attribute to set
     * @param {String} id - The id to set
     * @returns {void}
     */
    applyAriaAttributes: (element, attribute, id) => {
        element?.forEach((panel, index) => {
            accordionController.setAriaAttribute(panel, attribute, id, index);
        });
    },
    /**
     * Initialises the accordion event handlers
     * @param {String} wrapper - The class selector of the accordion wrapper
     * @param {String} linkSelector - The class selector of the accordion button link
     * @returns {void}
     */
    initAccordion: (wrapper, linkSelector) => {
        const accordionWrapper = typeof wrapper === 'string' ? getElement.single(wrapper) : wrapper;

        if (!accordionWrapper) return;

        const allAccordions = accordionWrapper.querySelectorAll('.accordion-content');
        const accordionLinks = accordionWrapper.querySelectorAll(linkSelector);
        if (!accordionLinks.length || !allAccordions.length) return;

        accordionController.applyAriaAttributes(allAccordions, 'aria-labelledby', 'accordion-panel');
        accordionController.applyAriaAttributes(accordionLinks, 'aria-controls', 'panel');
        accordionController.applyAriaAttributes(accordionLinks, 'id', 'accordion-header');

        // Open first accordion by default
        accordionLinks[0].classList.add('active');
        accordionController.setAriaExpanded(accordionLinks[0], true);
        allAccordions[0].classList.add('active');

        requestAnimationFrame(() => {
            const height = accordionController.getPanelFullHeight(allAccordions[0]) + "px";
            allAccordions[0].style.maxHeight = height;
            allAccordions[0].addEventListener("transitionend", function handler(e) {
                if (e.propertyName === "max-height") {
                    allAccordions[0].style.maxHeight = "none";
                    allAccordions[0].removeEventListener("transitionend", handler);
                }
            });
        });

        accordionController.setAriaExpanded(allAccordions[0], true);

        accordionLinks.forEach(accordion => accordionController.toggleAccordionClasses(accordion, accordionLinks, allAccordions));

        let resizeTimeout;
        window.addEventListener("resize", () => {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(() => {
                allAccordions.forEach(accordion => {
                    if (accordion.classList.contains("active")) {
                        if (accordion.style.maxHeight !== "none") {
                            accordion.style.maxHeight =
                                accordionController.getPanelFullHeight(accordion) + "px";
                        }
                    }
                });
            }, 50)
        });
    }
}

export { accordionController }

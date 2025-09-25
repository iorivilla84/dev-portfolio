import { getElement } from "../helpers/dom-helper.js";

const accordionEventHandlers = {
    /**
     * Initialises the accordion event handlers
     * @param {String} wrapper - The class selector of the accordion wrapper
     * @param {String} linkSelector - The class selector of the accordion button link
     * @returns {void}
     */
    init: (wrapper, linkSelector) => {
        accordionEventHandlers.initAccordionEventHandler(wrapper, linkSelector);
    },
    /**
     * Set the aria-expanded in accordion on click
     * @param {HTMLElement} el - container of the target element
     * @param {Boolean} expanded - true if expanded otherwise false
     * @returns {void}
     */
    setAriaExpanded: (el, expanded) => {
        el.setAttribute('aria-expanded', expanded ? 'true' : 'false');
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
            accordionEventHandlers.setAriaExpanded(header, false);
        });
        allAccordions.forEach(content => {
            content.classList.remove('active');
            content.style.maxHeight = null;
            accordionEventHandlers.setAriaExpanded(content, true)
        });
    },
    /**
     * Toggle the classes for each accordion
     * @param {HTMLElement} accordion - The element attached to the event listener
     * @param {NodeListOf<HTMLElement>} accordionLinks - The accordion buttons
     * @param {NodeListOf<HTMLElement>} allAccordions - The accordion contents
     * @returns {void}
     */
    accordionClassToggle: (accordion, accordionLinks, allAccordions) => {
        accordion.addEventListener('click', (e) => {
            e.preventDefault();
            const currentAccordion = e.currentTarget;
            const currentAccordionWrapper = currentAccordion.closest('.accordion-item');
            const currentAccordionContent = currentAccordionWrapper?.querySelector('.accordion-content');

            if (!currentAccordionWrapper || !currentAccordionContent) return;

            const isActive = currentAccordionContent.classList.contains('active');

            // reset all accordions
            accordionEventHandlers.resetAllAccordions(accordionLinks, allAccordions)

            // Toggle class active
            if (!isActive) {
                currentAccordion.classList.add('active');
                accordionEventHandlers.setAriaExpanded(currentAccordion, true);
                currentAccordionContent.classList.add('active');
                currentAccordionContent.style.maxHeight = currentAccordionContent.scrollHeight + 'px';
                accordionEventHandlers.setAriaExpanded(currentAccordionContent, true);
            } else {
                accordionEventHandlers.setAriaExpanded(currentAccordion, false);
                accordionEventHandlers.setAriaExpanded(currentAccordionContent, false);
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
    setAriaLabelId: (el, attribute, id, index) => {
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
    setAccordionAttributes: (element, attribute, id) => {
        element?.forEach((panel, index) => {
            accordionEventHandlers.setAriaLabelId(panel, attribute, id, index);
        });
    },
    /**
     * Initialises the accordion event handlers
     * @param {String} wrapper - The class selector of the accordion wrapper
     * @param {String} linkSelector - The class selector of the accordion button link
     * @returns {void}
     */
    initAccordionEventHandler: (wrapper, linkSelector) => {
        const accordionWrapper =
            typeof wrapper === 'string' ? getElement.single(wrapper) : wrapper;

        if (!accordionWrapper) return;

        const allAccordions = accordionWrapper.querySelectorAll('.accordion-content');
        const accordionLinks = accordionWrapper.querySelectorAll(linkSelector);

        if (!accordionLinks.length || !allAccordions.length) return;
        accordionEventHandlers.setAccordionAttributes(allAccordions, 'aria-labelledby', 'accordion-panel');
        accordionEventHandlers.setAccordionAttributes(accordionLinks, 'aria-controls', 'panel');
        accordionEventHandlers.setAccordionAttributes(accordionLinks, 'id', 'accordion-header');
        accordionLinks[0].classList.add('active');
        accordionEventHandlers.setAriaExpanded(accordionLinks[0], true);

        allAccordions[0].classList.add('active');
        allAccordions[0].style.maxHeight = allAccordions[0].scrollHeight + "px";
        accordionEventHandlers.setAriaExpanded(allAccordions[0], true);

        accordionLinks.forEach(accordion => accordionEventHandlers.accordionClassToggle(accordion, accordionLinks, allAccordions));
    }
}

export { accordionEventHandlers }

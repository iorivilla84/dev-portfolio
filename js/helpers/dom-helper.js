/**
 * Query selector to target a single or multiple elements from the DOM
 * @param {string} selector - A CSS selector string
 * @returns {NodeListOf<Element>} - A list of matching elements
 */
 const getElement = {
    single: selector => document.querySelector(selector),
    multiple: selector => document.querySelectorAll(selector)
}

export { getElement };

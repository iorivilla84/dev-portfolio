const messageHelper = {
    /**
     * Returns a reusable alert message HTML
     * @param {string} message - The text to display
     * @param {string} [htmlTag = 'span'] - The HTML tag to use
     * @param {string} [type='danger'] - Bootstrap alert type: 'danger', 'warning', 'info', 'success'
     * @returns {string} - The HTML string for the alert
     */
    alert: (message, htmlTag = 'div', type = 'danger') => {
        return `<${htmlTag} class="alert alert-${type} py-1 px-2 mb-2 me-2">${message}</${htmlTag}>`;
    }
};

export { messageHelper };

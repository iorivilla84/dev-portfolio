const formatterHelper = {
    /**
     * Get and Format Full Year
     * @returns {Number} A number with a formatted year
     */
    getFullYear: () => {
        const currentYear = new Date().getFullYear();
        if (!currentYear) return;

        return currentYear.toString();
    },
    /**
     * Formats an array of objects into a new array using a given function
     * @param {Array} data - The array of objects to format
     * @param {Function} mapFunc - The function to apply to each object in the array
     * @returns {Array} A new array with the formatted objects
     */
    arrayFormatter: (data, mapFunc) => {
        if (!data) return [];

        const linkInfo = (Array.isArray(data)) ? data : [data];
        return linkInfo.map(mapFunc).join('') || data;
    }
}

export { formatterHelper }

const formatYear = {
    /**
     * Get and Format Full Year
     * @returns {Number} A number with a formatted year
     */
    getFullYear: () => {
        const currentYear = new Date().getFullYear();
        if (!currentYear) return;
    
        return currentYear;
    }
}

export { formatYear }

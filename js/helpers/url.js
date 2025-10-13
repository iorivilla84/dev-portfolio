const urlValidation = {
    /**
     * Initialises the image URL/path validation
     * Checks if it's a valid image extension or valid image URL protocol.
     * @returns {Promise<void>}
     */
    init: (mainUrl, fallbackUrl) => {
        return urlValidation.checkImage(mainUrl, fallbackUrl)
    },
    /**
     * Checks if URL has a valid HTTP/HTTPS protocol
     * @param {string} urlString - The given URL
     * @returns {boolean}
     */
    isValidHttpUrl: (urlString) => {
        try {
            const url = new URL(urlString, window.location.origin);
            return url.protocol === "http:" || url.protocol === "https:";
        } catch (error) {
            console.error(`URL validation failed for "${urlString}". Ensure it starts with http:// or https://`, error);
            return false;
        }
    },
    /**
     * Checks if the image extension is valid
     * @param {string} url - The given image url/path
     * @returns {boolean}
     */
    isValidImgExtension: (url) => {
        return /\.(jpg|jpeg|png|webp|avif|gif|svg)$/i.test(url);
    },
    /**
     * Checks if image URL is valid and reachable
     * @param {string} url - The given image url/path
     * @returns {Promise<boolean>}
     */
    isValidImage: (url) => {
        return new Promise((resolve) => {
            const img = new Image();
            img.onload = () => resolve(true);
            img.onerror = () => resolve(false);
            img.src = url;
        });
    },
    /**
     * Creates and displays an error message
     * @param {string} message - The give error message to display
     * @returns {void}
     */
    showErrorMessage: (message) => {
        const alertBox = document.createElement('div');
        alertBox.className = 'img-error-msg alert alert-danger position-fixed top-0 start-50 translate-middle-x';
        alertBox.textContent = message;
        document.body.appendChild(alertBox);

        setTimeout(() => {
            alertBox.remove();
        }, 3000);
    },
    /**
     * Tests if the main image URL is valid and reachable,
     * if not, uses the fallback URL.
     * @async
     * @param {string} mainUrl - The main image URL to test
     * @param {string} fallbackUrl - The fallback image URL to use if mainUrl is invalid
     * @returns {Promise<string>} - A promise that resolves to the image URL that is used
     */
    checkImage: async (mainUrl, fallbackUrl) => {
        const imageExist = await urlValidation.isValidImage(mainUrl);
        const isValid = urlValidation.isValidHttpUrl(mainUrl) || urlValidation.isValidImgExtension(mainUrl);

        if (!imageExist || !isValid) {
            if (mainUrl !== '' && !urlValidation.isValidImgExtension(mainUrl)) {
                console.warn(`Extension not valid at "${mainUrl}".`)
                urlValidation.showErrorMessage(`Extension not valid at "${mainUrl}".`)
            }

            return fallbackUrl;
        }

        return mainUrl;
    }
}

export { urlValidation };

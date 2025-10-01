/**
 * Fetches the contact data to append in the front end
 * @async
 * @returns {Promise} An Object containing the request status, data objects and code
 */
const getContactDataModel = async () => {
    const contactEndPath = './js/portfolio-model/contact.json';

    try {
        const response = await fetch(contactEndPath);
        if (!response.ok) {
            throw new Error(
                `Failed to fetch ${contactEndPath}: ${response.status} ${response.statusText}`
            )
        }

        const jsonResponse = await response.json();
        return {
            status: "ok",
            contact: jsonResponse.contact,
            code: 200
        }
    } catch (error) {
        if (error.name === 'SyntaxError') {
            console.error(`JSON parse error in ${contactEndPath}:`, error.message);
        } else {
            console.error(`Error fetching ${contactEndPath}:`, error.message);
        }

        return {
            status: "ok",
            contact: [],
            code: 500
        }
    }
}

export { getContactDataModel }

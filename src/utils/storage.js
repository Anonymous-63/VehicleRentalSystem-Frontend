export const getDataFromLocalStorage = (key) => {
    const data = localStorage.getItem(key);
    try {
        return JSON.parse(data); // Try parsing JSON
    } catch {
        return data; // Return as string if parsing fails
    }
};

export const removeValueFromLocalStorage = (key) => {
    localStorage.removeItem(key);
};
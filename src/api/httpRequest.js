import { JWT_TOKEN_PREFIX } from "../utils/Constants";
import { getTokenFromLocalStorage } from "../utils/global";

async function apiRequest(method, url, data = null, params = {}) {
    try {
        Object.keys(params).forEach(key => {
            url = url.replace(`:${key}`, params[key]);
        });

        const token = getTokenFromLocalStorage(JWT_TOKEN_PREFIX);

        const options = {
            method: method,
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            }
        }

        if (data) {
            options.body = JSON.stringify(data);
        }

        const response = await fetch(url, options);

        if (!response.ok) {
            throw new Error(`HTTP Error: ${response.status} ${response.statusText}`);
        }

        return await response.json();
    } catch (error) {
        console.error('HTTP Request Error:', error);
        throw error;
    }
};

export default apiRequest;
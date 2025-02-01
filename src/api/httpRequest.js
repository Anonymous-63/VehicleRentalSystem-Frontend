import { errorNotif } from "../components/CustomNotification";
import { JWT_TOKEN_PREFIX } from "../utils/Constants";
import { getDataFromLocalStorage } from "../utils/storage";

async function apiRequest(method, url, data = null, params = {}) {
    try {
        Object.keys(params).forEach(key => {
            url = url.replace(`:${key}`, params[key]);
        });

        const token = getDataFromLocalStorage(JWT_TOKEN_PREFIX);

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
            errorNotif(`${response.status} - ${response.statusText}`);
        }

        return await response.json();
    } catch (error) {
        errorNotif(error);
    }
};

export default apiRequest;
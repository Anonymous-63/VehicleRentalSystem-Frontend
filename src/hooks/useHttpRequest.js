import { JWT_TOKEN_PREFIX } from "../utils/Constants";
import { getDataFromLocalStorage } from "../utils/storage";
import { useHandlerApiError } from "./useHandleApiError"

export const useHttpRequest = () => {
    const handleApiError = useHandlerApiError();
    

    const apiRequest = async (method, url, data = null, params = {}) => {
        try {
            Object.keys(params).forEach(key => {
                url = url.replace(`:${key}`, params[key]);
            })
            const token = getDataFromLocalStorage(JWT_TOKEN_PREFIX);
            const options = {
                method: method,
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                }
            };

            if (data) {
                options.body = JSON.stringify(data);
            }
            const response = await fetch(url, options);
            if (!response.ok) {
                handleApiError(response);
                throw new Error(`Request failed with status ${response.status}`);
            }
            return await response.json();
        } catch (error) {
            throw error;
        }
    }
    return apiRequest;
}
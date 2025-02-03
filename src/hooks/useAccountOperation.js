import { GET, POST, SERVER_URL } from "../utils/Constants";
import { useHttpRequest } from "./useHttpRequest"

export const useAccountOperation = () => {
    const apiRequest = useHttpRequest();

    const register = async (values) => {
        try {
            return await apiRequest(POST, SERVER_URL + "/auth/register", values);
        } catch (error) {
            throw error;
        }
    }

    const login = async (values) => {
        try {
            return await apiRequest(POST, SERVER_URL + "/auth/login", values);
        } catch (error) {
            throw error;
        }
    }

    const getWebOperator = async () => {
        try {
            return await apiRequest(GET, SERVER_URL + "/user/me");
        } catch (error) {
            throw error;
        }
    }

    return { register, login, getWebOperator };
}
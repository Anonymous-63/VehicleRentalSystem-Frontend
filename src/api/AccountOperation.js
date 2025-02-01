import { GET, POST, SERVER_URL } from "../utils/Constants";
import apiRequest from "./httpRequest";

export async function register(values) {
    try {
        const response = await apiRequest(POST, SERVER_URL + "/auth/register", values);
        return response;
    } catch (error) {
        console.error(error);
    }
}

export async function login(values) {
    try {
        const response = await apiRequest(POST, SERVER_URL + "/auth/login", values);
        return response;
    } catch (error) {
        console.error(error);

    }
}

export async function getWebOperator() {
    try {
        const response = await apiRequest(GET, SERVER_URL + "/user/me");
        return response;
    } catch (error) {
        console.error(error);
    }
}

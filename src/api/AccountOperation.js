import { GET, POST, SERVER_URL } from "../utils/Constants";
import apiRequest from "./httpRequest";

export async function login(loginCredential) {
    try {
        const response = await apiRequest(POST, SERVER_URL + "/auth/login", loginCredential);
        return response;
    } catch (error) {
        console.error(error);

    }
}

export async function getWebOperator(token) {
    try {
        const response = await apiRequest(GET, SERVER_URL + "/auth/user", token);
        return response;
    } catch (error) {
        console.error(error);

    }
}
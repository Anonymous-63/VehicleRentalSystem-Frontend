import { DELETE, GET, PUT, SERVER_URL } from "../utils/Constants";
import apiRequest from "./httpRequest";

export async function get(url, id) {
    try {
        const response = await apiRequest(GET, SERVER_URL + url, null, { id })
        return response;
    } catch (error) {
        console.error('Error fetching details:', error);

    }
}

export async function getAll(url) {
    try {
        const response = await apiRequest(GET, SERVER_URL + url);
        return response;
    } catch (error) {
        console.error('Error fetching details:', error);
    }
}

export async function deleteEntity(url, ids) {
    try {
        const response = await apiRequest(DELETE, SERVER_URL + url, ids);
        return response;
    } catch (error) {
        console.error(error);

    }
}
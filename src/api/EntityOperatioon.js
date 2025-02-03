import { DELETE, GET, POST, PUT, SERVER_URL } from "../utils/Constants";
import apiRequest from "./httpRequest";


export const addEntity = async (url, values) => {
    try {
        const response = await apiRequest(POST, SERVER_URL + url, values);
        return response;
    } catch (error) {
        throw error;
    }
}

export const updateEntity = async (url, values) => {
    try {
        const response = await apiRequest(PUT, SERVER_URL + url, values);
        return response;
    } catch (error) {
        throw error;
    }
}

export async function get(url, id) {
    try {
        const response = await apiRequest(GET, SERVER_URL + url, null, { id })
        return response;
    } catch (error) {
        throw error;
    }
}

export async function getAll(url) {
    try {
        const response = await apiRequest(GET, SERVER_URL + url);
        return response;
    } catch (error) {
        throw error;
    }
}

export async function deleteEntity(url, ids) {
    try {
        const response = await apiRequest(DELETE, SERVER_URL + url, ids);
        return response;
    } catch (error) {
        throw error

    }
}
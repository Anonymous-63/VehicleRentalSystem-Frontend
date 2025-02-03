import { DELETE, GET, POST, PUT, SERVER_URL } from "../utils/Constants";
import { useHttpRequest } from "./useHttpRequest"

export const useEntityOperation = () => {
    const apiRequest = useHttpRequest();

    const addEntity = async (url, values) => {
        try {
            return await apiRequest(POST, SERVER_URL + url, values);
        } catch (error) {
            throw error;
        }
    }

    const updateEntity = async (url, values) => {
        try {
            return await apiRequest(PUT, SERVER_URL + url, values);
        } catch (error) {
            throw error;
        }
    }

    const deleteEntity = async (url, ids) => {
        try {
            return await apiRequest(DELETE, SERVER_URL + url, ids);
        } catch (error) {
            throw error;
        }
    }

    const getEntity = async (url, id) => {
        try {
            return await apiRequest(GET, SERVER_URL + url, null, { id });
        } catch (error) {
            throw error;
        }
    }

    const getAllEntity = async (url) => {
        try {
            return await apiRequest(GET, SERVER_URL + url);
        } catch (error) {
            throw error;
        }
    }

    return { addEntity, updateEntity, deleteEntity, getEntity, getAllEntity };
}
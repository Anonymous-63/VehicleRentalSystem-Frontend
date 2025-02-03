import { useNavigate } from "react-router";
import { errorNotif } from "../components/CustomNotification";

export function handleApiError(response) {
    const navigate = useNavigate();
    if (!response) {
        errorNotif("No response from server.");
        return;
    }

    switch (response.status) {
        case 400:
            errorNotif("Bad request. Please check your input.");
            break;
        case 401:
            errorNotif("Unauthorized. Please log in again.");
            navigate("/login");
            break;
        case 403:
            errorNotif("You don't have permission to access this.");
            navigate("/unauthorized")
            break;
        case 404:
            errorNotif("Requested data not found.");
            navigate("/notFound");
            break;
        case 500:
            errorNotif("Server error. Please try again later.");
            break;
        default:
            errorNotif("An unexpected error occurred.");
    }
}

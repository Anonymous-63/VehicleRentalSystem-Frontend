import { webPages } from "../routes/pagesConfig";
import { USER_PREFIX } from "./Constants";
import { getDataFromLocalStorage } from "./storage";


export const createRouteList = (pages, parentPath = "") => {
    const user = getDataFromLocalStorage(USER_PREFIX);
    const webPages = pages.filter(page => page.roles.length === 0 || !(user && page.roles.includes(user.role))).map(page => {
        const routeItem = {
            path: parentPath + '/' + page.sidebar.route // Concatenate the parent's path with the child route
        };
        if (page.children && page.children.length > 0) {
            routeItem.children = createRouteList(page.children, routeItem.path); // Pass down parentPath
        } else {
            routeItem.element = page.sidebar.component;
        }
        return routeItem;
    })
    console.log("webPages", webPages);
    return webPages;

}


export const routeList = createRouteList(webPages);

import { webPages } from "../routes/WebPages";


export const createRouteList = (pages) => {
    const user = JSON.parse(localStorage.getItem("user"));
    return pages.filter(page => page.roles.length === 0 || (user && page.roles.includes(user.role))).map(page => {
        const routeItem = {
            path: page.sidebar.route
        };
        if (page.children && page.children.length > 0) {
            routeItem.children = createRouteList(page.children);
        } else {
            routeItem.element = page.sidebar.component;
        }
        return routeItem;
    })
}

export const routeList = createRouteList(webPages);

export const getTokenFromLocalStorage = (key) => {
    const token = localStorage.getItem(key);
    if (token) {
        return token
    }
    return null;
}

export const removeTokenFromLocalStorage = (key) => {
    const token = localStorage.getItem(key);
    if (token) {
        localStorage.removeItem(key);
    }
}
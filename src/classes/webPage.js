export class webPage {
    constructor(id, sidebar, className = null, children = [], roles = []) {
        this.id = id;
        this.sidebar = sidebar;
        this.className = className;
        this.children = children;
        this.roles = roles;
    }
}
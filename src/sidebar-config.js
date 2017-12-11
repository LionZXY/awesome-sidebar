export default class SidebarConfig {
    constructor(side = 'left', opened = false, onEsc = true, onClick = true) {
        this.side = side;
        this.opened = opened;
        this.onEsc = onEsc;
        this.onClick = onClick;
    }
}
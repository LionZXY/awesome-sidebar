export default class Sidebar extends HTMLElement {
    constructor() {
        super();
        this.menu = this.querySelector('main[slot="content"]')

        console.log(this.menu);
        this.addEventListener('click', e => {
            this.opened = false;
        });

        this.side = this.side;
        this.opened = this.opened;
    }

    get side() {
        return this.getAttribute('side')
    }

    set side(val) {
        if (val !== 'left' && val !== 'right') {
            throw TypeError('Side can be only left or right');
        }

        if (val === 'left') {
            this.menu.style.left = '0';
            this.menu.style.right = 'auto';
        }

        if (val === 'right') {
            this.menu.style.left = 'auto';
            this.menu.style.right = '0';
        }

        this.setAttribute('side', val);
    }

    get opened() {
        return this.getAttribute('opened');
    }

    set opened(val) {
        if (val) {
            this.classList.remove('hidden');
        } else {
            this.classList.add('hidden');
        }
    }
}


customElements.define('sidebar-menu', Sidebar);
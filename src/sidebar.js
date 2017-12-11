import getTransitionDuration from 'get-transition-duration';

export default class Sidebar extends HTMLElement {
    constructor() {
        super();
        this.menu = this.querySelector('main[slot="content"]')

        this.addEventListener('click', e => {
            this.opened = false;
        });

        document.addEventListener('keyup', e => {
                if (e.keyCode === 27) {
                    this.opened = false;
                }
            },
            true /* grab event on tunnel, not on bubble */);

        this.menu.addEventListener('click', e => {
            e.stopPropagation();
        });

        this.menu.querySelectorAll('li').forEach(item => {
            item.addEventListener('click', e =>
                this.opened = false
            )
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
            console.log('Close menu...');
            this.removeEventListener('transitionend', this._hideVisibility);
            this.style.visibility = 'visible';
            this.classList.remove('hidden');
        } else {
            console.log('Open menu...');
            this.classList.add('hidden');
            this.addEventListener('transitionend', this._hideVisibility);
        }
    }

    open() {
        this.opened = true;
    }

    close() {
        this.opened = false;
    }

    _hideVisibility() {
        this.style.visibility = 'hidden';
        this.removeEventListener('transitionend', this._hideVisibility);
    }
}


customElements.define('sidebar-menu', Sidebar);
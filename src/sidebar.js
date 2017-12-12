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
        if (!this.opened) {
            this.style.visibility = 'hidden';
        }
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
        return this.getAttribute('opened') === 'true';
    }

    set opened(val) {
        this.setAttribute('opened', val.toString());
        if (val) {
            console.log('Open menu...');

            this.classList.remove('hidden');
            this.menu.classList.remove('hidden');
            this.style.visibility = 'visible';

            document.querySelector('body').style.height = '100%';
            document.querySelector('body').style.overflow = 'hidden';
        } else {
            console.log('Close menu...');

            this.classList.add('hidden');
            this.menu.classList.add('hidden');
            this.style.visibility = 'hidden';

            document.querySelector('body').style.height = 'auto';
            document.querySelector('body').style.overflow = 'auto';
        }
    }

    open() {
        this.opened = true;
    }

    close() {
        this.opened = false;
    }
}


customElements.define('sidebar-menu', Sidebar);
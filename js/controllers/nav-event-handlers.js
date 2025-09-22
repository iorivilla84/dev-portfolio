import { getElement } from "../helpers/dom-helper.js";

const navEventHandlers = {
    /**
     * Initialise the main navigation class event handlers
     * @returns {void}
     */
    init: () => {
        navEventHandlers.classNavEventHandlers(
            '.navbar-nav .nav-link',
            '.offcanvas .navbar-nav .nav-link');

        navEventHandlers.navBackgroundOnScroll('.navbar');
    },
    /**
     * Sync classes between main menus form desktop and offcanvas on mobile
     * @param {HTMLElement} currentBtn - the button target element 
     * @param {Array} mainNavLiEl - A node list of li elements
     * @param {Array} mainNavLiMobileEl - A node list of li elements
     * @returns {void}
     */
    syncActive: (currentBtn, mainNavLiEl, mainNavLiMobileEl) => {
        // remove from all links first
        [...mainNavLiEl, ...mainNavLiMobileEl].forEach(link => link.classList.remove('active'));

        // normalize current path with hash
        const currentHref = new URL(currentBtn.href).pathname + new URL(currentBtn.href).hash;

        [...mainNavLiEl, ...mainNavLiMobileEl].forEach(link => {
            const linkHref = new URL(link.href).pathname + new URL(link.href).hash;
            if (linkHref === currentHref) {
                link.classList.add('active');
            }
        });
    },
    /**
     * Update classes for desktop and mobile main menus
     * @param {Array} navDesktop - A node list of li elements
     * @param {Array} navMobile - A node list of li elements
     * @returns {void}
     */
     classNavEventHandlers: (navDesktop, navMobile) => {
        const mainNavLiEl = getElement.multiple(navDesktop);
        const mainNavLiMobileEl = getElement.multiple(navMobile);
    
        if (!mainNavLiEl.length || !mainNavLiMobileEl.length) return;
    
        // Detect current path + hash
        const currentPath = window.location.pathname + window.location.hash;
        let matched = false;
    
        // Set active link on page load
        [...mainNavLiEl, ...mainNavLiMobileEl].forEach(link => {
            const linkHref = new URL(link.href).pathname + new URL(link.href).hash;
            if (linkHref === currentPath) {
                link.classList.add('active');
                matched = true;
            }
        });
    
        // Fallback: first link active if no match
        if (!matched) {
            mainNavLiEl[0].classList.add('active');
            mainNavLiMobileEl[0].classList.add('active');
        }
    
        // Add event listeners on click for desktop + mobile
        [...mainNavLiEl, ...mainNavLiMobileEl].forEach(liBtn => {
            liBtn.addEventListener('click', (e) => {
                navEventHandlers.syncActive(e.currentTarget, mainNavLiEl, mainNavLiMobileEl);
            });
        });
    },    
    /**
     * Add/Remove main nav classes based on scroll position
     * @param {String} nav - The class selector of the target element
     * @returns {void}
     */
    detectWindowScroll: nav => {
        // on page load if page scroll is > 50 add background and border bottom
        const navLogoBrand = getElement.single('.nav-brand-logo');

        const updateNavClass = scrollY => {
            if (scrollY > 50) {
                nav.classList.remove('bg-transparent');
                nav.classList.add('bg-dark', 'border-bottom', 'navbar-blur');
                navLogoBrand.classList.add('is-scrolled');
            } else {
                nav.classList.remove('bg-dark', 'border-bottom', 'navbar-blur');
                navLogoBrand.classList.remove('is-scrolled');
                nav.classList.add('bg-transparent');
            }
        }

        updateNavClass(window.scrollY)
        
        // Add EventListener to manage main nav classes based on scroll position
        let ticking = false;
        window.addEventListener('scroll', () => {
            if (!ticking) {
                window.requestAnimationFrame(() => {
                    updateNavClass(window.scrollY);
                    ticking = false;
                });
                ticking = true;
            }
            updateNavClass(window.scrollY)
        });
    },
    /**
     * Initialise the main nav background on scroll
     * @param {String} navBar - The class selector of the target element
     * @returns {void}
     */
    navBackgroundOnScroll: (navBar) => {
        const navBarContainer = getElement.multiple(navBar);
        if (!navBarContainer.length) return;

        navBarContainer.forEach(nav => {
            navEventHandlers.detectWindowScroll(nav)
        })
    }
}

export { navEventHandlers };

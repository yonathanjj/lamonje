// loader.js
document.addEventListener("DOMContentLoaded", () => {

    // --- COMPONENT LOADER (Your original code) ---
    const loadComponent = (url, placeholderId, callback) => {
        fetch(url)
            .then(response => response.ok ? response.text() : Promise.reject(`Failed to fetch ${url}`))
            .then(data => {
                const placeholder = document.getElementById(placeholderId);
                if (!placeholder) return;

                const parser = new DOMParser();
                const doc = parser.parseFromString(data, 'text/html');

                // Inject styles and HTML
                doc.head.childNodes.forEach(node => document.head.appendChild(node.cloneNode(true)));
                placeholder.innerHTML = doc.body.innerHTML;

                // Execute the callback function AFTER the component is loaded
                if (callback) {
                    callback(placeholder);
                }
            })
            .catch(error => console.error('Error loading component:', error));
    };

    // --- NAVBAR LOGIC FUNCTION ---
    // This function contains all the interactive JS for the navbar.
    const initializeNavbar = (navbarContainer) => {
        const nav = navbarContainer.querySelector('#main-nav-component');
        if (!nav) return;

        // 1. Scroll Behavior
        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 20) {
                nav.classList.add('scrolled');
            } else {
                nav.classList.remove('scrolled');
            }
        });

        // 2. Hamburger Menu Click Behavior
        const hamburger = nav.querySelector('.hamburger-menu');
        const mobilePanel = nav.querySelector('.mobile-nav-panel');
        const mobileLinks = mobilePanel.querySelectorAll('a');

        hamburger.addEventListener('click', () => {
            const isNavOpen = nav.classList.toggle('nav-open');
            document.body.style.overflow = isNavOpen ? 'hidden' : 'auto';

            if (isNavOpen) {
                // Animate links INTO view with GSAP
                gsap.to(mobileLinks, {
                    duration: 0.6,
                    opacity: 1,
                    y: 0,
                    stagger: 0.1,
                    ease: 'power3.out',
                    delay: 0.3
                });
            } else {
                // Instantly reset links when closing
                gsap.set(mobileLinks, { opacity: 0, y: 30 });
            }
        });
    };

    // --- EXECUTION ---
    // Load the navbar and then run its initialization script.
    loadComponent('navbar.html', 'navbar-placeholder', initializeNavbar);

    // Load the footer (it has no special script in this case).
    loadComponent('footer.html', 'footer-placeholder');
});
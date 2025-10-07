/* script.js */

// --- HERO CONTENT ENTRY ANIMATION (using GSAP) ---
gsap.from(".hero-headline span", {
    duration: 1.2,
    y: 100,
    opacity: 0,
    stagger: 0.15,
    ease: 'power3.out',
    delay: 0.5
});

gsap.from(".hero-btn", {
    duration: 1,
    y: 30,
    opacity: 0,
    stagger: 0.1,
    ease: 'power3.out',
    delay: 1
});





// --- 4. ACCORDION LOGIC FOR SERVICES SECTION ---
const serviceItems = document.querySelectorAll('.service-item');

serviceItems.forEach(item => {
    const header = item.querySelector('.service-header');

    header.addEventListener('click', () => {
        // Find the currently open item
        const currentlyActiveItem = document.querySelector('.service-item.active');

        // If there is an open item and it's not the one we just clicked, close it.
        if (currentlyActiveItem && currentlyActiveItem !== item) {
            currentlyActiveItem.classList.remove('active');
        }

        // Toggle the active class on the item we clicked.
        item.classList.toggle('active');
    });
});

// Check if GSAP is loaded before running animations
if (typeof gsap !== 'undefined') {

    // Animate the "Who We Are" section
    gsap.from(".about-section .section-heading", {
        scrollTrigger: {
            trigger: ".about-section",
            start: "top 80%", // Trigger when the top of the section is 80% from the top of the viewport
            toggleActions: "play none none none"
        },
        duration: 1,
        x: -50,
        opacity: 0,
        ease: 'power3.out'
    });

    gsap.from(".about-section .about-right > *", {
        scrollTrigger: {
            trigger: ".about-section",
            start: "top 80%",
            toggleActions: "play none none none"
        },
        duration: 1,
        x: 50,
        opacity: 0,
        stagger: 0.2, // Animate paragraph and button one after another
        ease: 'power3.out'
    });

    // Animate the "What We Do" section
    gsap.from(".services-section .section-heading", {
        scrollTrigger: {
            trigger: ".services-section",
            start: "top 80%",
            toggleActions: "play none none none"
        },
        duration: 1,
        x: -50,
        opacity: 0,
        ease: 'power3.out'
    });

    gsap.from(".services-section .service-item", {
        scrollTrigger: {
            trigger: ".services-section .services-list",
            start: "top 80%",
            toggleActions: "play none none none"
        },
        duration: 0.8,
        y: 40,
        opacity: 0,
        stagger: 0.15,
        ease: 'power3.out'
    });

    gsap.from(".services-section .services-cta-container", {
        scrollTrigger: {
            trigger: ".services-section .services-cta-container",
            start: "top 90%",
            toggleActions: "play none none none"
        },
        duration: 1,
        y: 40,
        opacity: 0,
        ease: 'power3.out'
    });

} else {
    console.log("GSAP not loaded, skipping scroll animations.");
}




// --- 5. FINAL FEATURED PROJECTS LOGIC ---

document.addEventListener('DOMContentLoaded', () => {

    // A. FINAL PROJECT DATA (Now includes a URL for each project)
    const projectsData = [
        {
            id: 'p1',
            title: 'Homna Limited',
            category: 'Campaign Strategy & Digital Marketing',
            heroImage: 'assets/img/h1.png',
            url: 'projects.html'
        },
        {
            id: 'p2',
            title: 'FreshMeals',
            category: 'Brand Identity & Social Media',
            heroImage: 'assets/img/f1.png',
            url: 'projects.html'
        },
        {
            id: 'p3',
            title: 'Psy addis',
            category: 'Brand Strategy & Apparel Design',
            heroImage: 'assets/img/p1.png',
            url: 'projects.html'
        },
        {
            id: 'p4',
            title: 'BTN Manufacturing',
            category: 'Content Strategy & SEO',
            heroImage: 'assets/img/btn1.png',
            url: 'projects.html'
        },
        {
            id: 'p5',
            title: 'Kazubaa Events',
            category: 'Event Marketing & Social Promotion',
            heroImage: 'assets/img/k1.png',
            url: 'projects.html'
        },
        {
            id: 'p6',
            title: 'DuraSeal',
            category: 'Corporate Branding & Web Design',
            heroImage: 'assets/img/d1.png',
            url: 'projects.html'
        }
    ];

    // B. DYNAMICALLY CREATE PROJECT CARDS (as links)
    const projectsGrid = document.querySelector('.projects-grid');
    if (projectsGrid) {
        projectsData.forEach(project => {
            // Create an anchor tag for the card
            const cardLink = document.createElement('a');
            cardLink.href = project.url;
            cardLink.className = 'project-card';
            cardLink.setAttribute('data-project-id', project.id);

            // Set the inner HTML for the card content
            cardLink.innerHTML = `
                <div class="project-image-wrapper">
                    <img src="${project.heroImage}" alt="${project.title}">
                </div>
                <div class="project-info">
                    <h3>${project.title}</h3>
                    <p>${project.category}</p>
                </div>
            `;
            projectsGrid.appendChild(cardLink);
        });
    }

    // C. MODAL LOGIC (COMPLETELY REMOVED)

    // GSAP Scroll Animation for the grid (unchanged)
    if (typeof gsap !== 'undefined') {
        gsap.from(".project-card", {
            scrollTrigger: {
                trigger: ".projects-grid",
                start: "top 80%"
            },
            duration: 0.8,
            y: 50,
            opacity: 0,
            stagger: 0.1,
        });
    }
});





// --- 6. INFINITE LOGO SCROLLER LOGIC ---
document.addEventListener('DOMContentLoaded', () => {
    const logoScroller = document.querySelector('.logo-scroller');

    if (logoScroller) {
        const logoList = logoScroller.querySelector('.logo-list');
        const logos = Array.from(logoList.children);

        // The magic: duplicate the logos to create the seamless loop effect
        logos.forEach(logo => {
            const duplicate = logo.cloneNode(true);
            // Add an attribute to hide duplicates from screen readers for better accessibility
            duplicate.setAttribute('aria-hidden', true);
            logoList.appendChild(duplicate);
        });
    }
});



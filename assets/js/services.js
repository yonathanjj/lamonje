// services.js

document.addEventListener('DOMContentLoaded', () => {

    if (typeof gsap === 'undefined') {
        console.error("GSAP is not loaded.");
        return;
    }
    gsap.registerPlugin(ScrollTrigger);

    let ctx = gsap.context(() => {
        // Hero Animation
        gsap.from(".hero-services-section > .container > *", {
            duration: 1.2, y: 40, opacity: 0, stagger: 0.2, ease: 'power3.out', delay: 0.2
        });

        // Services Grid Animation
        gsap.from(".service-card", {
            scrollTrigger: { trigger: ".services-grid", start: "top 85%" },
            duration: 1, y: 50, opacity: 0, stagger: 0.1, ease: 'power3.out'
        });

        gsap.from(".process-item", {
            scrollTrigger: {
                trigger: ".process-list",
                start: "top 85%",
            },
            duration: 1,
            y: 50,
            opacity: 0,
            stagger: 0.2, // This will animate cards 1, 2, 3, 4 in sequence
            ease: 'power3.out'
        });

        // Infinite Scroller for Industries
        const industryList = document.querySelector(".industry-list");
        if (industryList) {
            const items = Array.from(industryList.children);
            items.forEach(item => {
                const duplicate = item.cloneNode(true);
                duplicate.setAttribute("aria-hidden", true);
                industryList.appendChild(duplicate);
            });
        }
    });
});
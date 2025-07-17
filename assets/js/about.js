// about.js

/**
 * Populates testimonial scrollers with data and duplicates them for a seamless loop.
 * @param {Array} data - An array of testimonial objects.
 */
function initTestimonialScroller(data) {
    const scrollerLists = document.querySelectorAll(".testimonial-list");
    if (!scrollerLists.length) return; // Exit if no scrollers are found

    scrollerLists.forEach(list => {
        // Clear any existing content
        list.innerHTML = "";

        // Populate with initial set of testimonials
        data.forEach(testimonial => {
            const cardHTML = `
                <div class="testimonial-card">
                    <p class="testimonial-quote">"${testimonial.quote}"</p>
                    <div class="testimonial-author">
                        <div class="author-avatar"><img src="${testimonial.avatar}" alt="${testimonial.name}"></div>
                        <div class="author-info">
                            <div class="author-name">${testimonial.name}</div>
                            <div class="author-title">${testimonial.title}</div>
                        </div>
                    </div>
                </div>`;
            list.innerHTML += cardHTML;
        });

        // Duplicate the populated list for the infinite scroll effect
        const originalContent = list.innerHTML;
        list.innerHTML += originalContent;
    });
}


/**
 * Initializes all GSAP animations for the page.
 */
function initPageAnimations() {
    if (typeof gsap === 'undefined') {
        console.error("GSAP is not loaded. Animations will not run.");
        return;
    }
    gsap.registerPlugin(ScrollTrigger);

    // GSAP Context for proper cleanup
    let ctx = gsap.context(() => {
        // --- Hero Animations ---
        gsap.from(".hero-headline span", { duration: 1.2, y: 100, opacity: 0, stagger: 0.1, ease: 'power4.out', delay: 0.3 });
        gsap.from(".hero-subheadline", { duration: 1.2, y: 50, opacity: 0, ease: 'power4.out', delay: 0.8 });

        // --- Scroll-Triggered Animations ---
        gsap.from(".mission-intro-text", { scrollTrigger: { trigger: ".mission-intro-text", start: "top 85%" }, duration: 1.5, yPercent: 100, opacity: 0, ease: 'power4.out' });
        gsap.from(".statement-block", { scrollTrigger: { trigger: ".vision-grid", start: "top 80%" }, duration: 1, y: 50, opacity: 0, stagger: 0.2, ease: 'power3.out' });
        gsap.from(".story-wrapper > *", { scrollTrigger: { trigger: ".story-section", start: "top 80%" }, duration: 1.2, y: 50, opacity: 0, stagger: 0.2, ease: 'power3.out' });
        gsap.from(".value-card", { scrollTrigger: { trigger: ".values-grid", start: "top 85%" }, duration: 1, y: 50, opacity: 0, stagger: 0.15, ease: 'power3.out' });
        gsap.from(".cta-section > *", { scrollTrigger: { trigger: ".cta-section", start: "top 80%" }, duration: 1.2, y: 50, opacity: 0, stagger: 0.2, ease: 'power3.out' });
    });

    // Cleanup function for when the component unmounts (useful in frameworks)
    // return () => ctx.revert();
}


// --- Main Execution ---
document.addEventListener('DOMContentLoaded', () => {
    const testimonialsData = [
        { quote: "Their team brought our brand to life in ways we couldn’t imagine. The creativity and dedication were unparalleled.", name: "Liam T.", title: "Founder of BluePeak Co.", avatar: "https://i.pravatar.cc/150?img=1" },
        { quote: "Between better-auth and openauth one of those options should cover how you want to do things for 95% of cases.", name: "Lazar Nikolov", title: "Software Engineer & Educator", avatar: "https://i.pravatar.cc/150?img=3" },
        { quote: "Working with them felt like having an in-house team. They are responsive, strategic, and incredibly talented.", name: "Jessica Chen", title: "Marketing Director, Nova Tech", avatar: "https://i.pravatar.cc/150?img=5" },
        { quote: "The problem of defaulting to SaaS for auth in js is finally fixed... They just get it.", name: "David L.", title: "CEO, Streamline", avatar: "https://i.pravatar.cc/150?img=8" }
    ];

    initTestimonialScroller(testimonialsData);
    initPageAnimations();
});
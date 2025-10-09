/*
  ================================================================
  ==   IMMACULATE SCRIPT V7.3 - FINAL POSITIONING FIX           ==
  ================================================================
*/

// --- 1. HERO CONTENT ENTRY ANIMATION ---
gsap.from(".hero-headline span", {
    duration: 1.2, y: 100, opacity: 0, stagger: 0.15, ease: 'power3.out', delay: 1
});
gsap.from(".hero-btn", {
    duration: 1, y: 30, opacity: 0, stagger: 0.1, ease: 'power3.out', delay: 1.5
});

// --- 2. WEBGL CUBE ANIMATION ---
document.addEventListener('DOMContentLoaded', () => {
    if (typeof THREE === 'undefined') {
        console.error("Three.js is not loaded!");
        return;
    }
    if (typeof THREE.RoundedBoxGeometry === 'undefined') {
        console.error("RoundedBoxGeometry is not loaded! Check your HTML for the correct script tag.");
        return;
    }

    // --- SETUP ---
    const canvas = document.getElementById('webgl-canvas');
    const popupCard = document.querySelector('.webgl-popup-card');
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 100);
    const renderer = new THREE.WebGLRenderer({ canvas: canvas, antialias: true, alpha: true });

    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    camera.position.set(0, 0, 10);

    // --- CARD DATA ---
    const CARD_DATA = [
        { title: "Brand Strategy & Identity", description: "Naming, Messaging, Positioning, Visual Identity, Guidelines.", gradientColor: '255, 103, 0', stats: [{ label: 'Focus', value: 'Clarity' }, { label: 'Output', value: 'Brand Book' }] },
        { title: "Campaign Strategy", description: "Campaign Dev, Content Creation, Social, Ads, SEO.", gradientColor: '255, 103, 0', stats: [{ label: 'Focus', value: 'Growth' }, { label: 'Metric', value: 'ROI' }] },
        { title: "Event & Activation Marketing", description: "Events, PR, Media Engagement, Community Touchpoints.", gradientColor: '255, 103, 0', stats: [{ label: 'Focus', value: 'Engagement' }, { label: 'Reach', 'value': 'Community' }] },
        { title: "Strategic Thinking", description: "We solve problems with foresight and intention. Every solution is rooted in understanding context and anticipating impact.", gradientColor: '255, 103, 0', stats: [{ label: 'Principle', value: 'Foresight' }, { label: 'Core Value', value: '#1' }] },
        { title: "Creative Discipline", description: "Our ideas don’t just inspire, they deliver. We balance bold storytelling with performance-focused execution.", gradientColor: '255, 103, 0', stats: [{ label: 'Principle', value: 'Execution' }, { label: 'Core Value', value: '#2' }] },
        { title: "Accountability", description: "We track, measure, and improve everything we do. Our clients trust us because we own our results and our process.", gradientColor: '255, 103, 0', stats: [{ label: 'Principle', value: 'Ownership' }, { label: 'Core Value', value: '#3' }] },
        { title: "Clarity", description: "We communicate clearly and design intentionally. Simplicity isn’t a shortcut; it’s how we build trust and growth.", gradientColor: '255, 103, 0', stats: [{ label: 'Principle', value: 'Simplicity' }, { label: 'Core Value', 'value': '#4' }] },
    ];

    // --- LIGHTING ---
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
    scene.add(ambientLight);
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1.5);
    directionalLight.position.set(10, 10, 10);
    scene.add(directionalLight);

    // --- CREATE THE CUBE ASSEMBLY ---
    const mainCubeGroup = new THREE.Group();
    const interactiveCubes = [];
    const CUBE_SIZE = 0.7;
    const CUBE_GAP = 0.1;
    const ORANGE_COLOR = new THREE.Color('#FF6700');

    const materials = [
        new THREE.MeshPhysicalMaterial({ color: ORANGE_COLOR, transmission: 0.9, roughness: 0.25, ior: 1.5, transparent: true, opacity: 0.8 }),
        new THREE.MeshStandardMaterial({ color: ORANGE_COLOR, roughness: 0.5, metalness: 0.5 }),
        new THREE.MeshPhysicalMaterial({ color: ORANGE_COLOR, transmission: 0.9, roughness: 0.5, ior: 1.5, transparent: true, opacity: 0.8 }),
    ];
    const cubeGeometry = new THREE.RoundedBoxGeometry(CUBE_SIZE, CUBE_SIZE, CUBE_SIZE, 6, 0.05);

    for (let x = -1; x <= 1; x++) {
        for (let y = -1; y <= 1; y++) {
            for (let z = -1; z <= 1; z++) {
                if (x === 0 && y === 0 && z === 0) continue;
                const materialIndex = (Math.abs(x) + Math.abs(y) + Math.abs(z) - 1) % materials.length;
                const cube = new THREE.Mesh(cubeGeometry, materials[materialIndex]);
                cube.position.set(x * (CUBE_SIZE + CUBE_GAP), y * (CUBE_SIZE + CUBE_GAP), z * (CUBE_SIZE + CUBE_GAP));
                const dataIndex = (Math.abs(x*3) + Math.abs(y*2) + Math.abs(z)) % CARD_DATA.length;
                cube.userData = CARD_DATA[dataIndex];
                mainCubeGroup.add(cube);
                interactiveCubes.push(cube);
            }
        }
    }
    scene.add(mainCubeGroup);

    // --- INTERACTIVITY SETUP ---
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2(-5, -5);
    let hoveredCube = null;

    window.addEventListener('mousemove', (event) => {
        mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
        mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    });

    // --- RENDER LOOP (WITH RESPONSIVE CARD POSITIONING) ---
    function animate() {
        requestAnimationFrame(animate);

        // --- Cube rotation logic (unchanged) ---
        const targetRotationX = mouse.y * 0.25;
        const targetRotationY = mouse.x * 0.25;
        mainCubeGroup.rotation.x += (targetRotationX - mainCubeGroup.rotation.x) * 0.05;
        mainCubeGroup.rotation.y += (targetRotationY - mainCubeGroup.rotation.y) * 0.05;
        mainCubeGroup.rotation.z += 0.001;

        // --- Raycasting logic (unchanged) ---
        raycaster.setFromCamera(mouse, camera);
        const intersects = raycaster.intersectObjects(interactiveCubes);
        const newHoveredCube = intersects.length > 0 ? intersects[0].object : null;

        // --- Card visibility logic (unchanged) ---
        if (newHoveredCube !== hoveredCube) {
             if (hoveredCube) {
                gsap.to(hoveredCube.scale, { x: 1, y: 1, z: 1, duration: 0.5, ease: 'elastic.out(1, 0.75)' });
            }
            if (newHoveredCube) {
                gsap.to(newHoveredCube.scale, { x: 1.15, y: 1.15, z: 1.15, duration: 0.5, ease: 'elastic.out(1, 0.75)' });
                const data = newHoveredCube.userData;
                const statsHTML = data.stats.map(stat => `<div class="stat"><h4>${stat.label}</h4><span>${stat.value}</span></div>`).join('');
                popupCard.innerHTML = `
                    <div class="card-header"><h3>${data.title}</h3><p>${data.description}</p></div>
                    <div class="card-footer">${statsHTML}</div>`;
                popupCard.style.setProperty('--card-gradient-color', data.gradientColor);
                popupCard.classList.add('is-visible');
            } else {
                popupCard.classList.remove('is-visible');
            }
            hoveredCube = newHoveredCube;
        }

        // ==========================================================
        // ==  START OF MODIFIED CODE: RESPONSIVE CARD POSITIONING ==
        // ==========================================================
        if (hoveredCube) {
            // Check if we are in mobile view
            if (window.innerWidth <= 900) {
                // MOBILE LOGIC: Center the card on screen
                gsap.to(popupCard, {
                    duration: 0.5,
                    left: '50%',          // Center horizontally
                    top: '20vh',          // Position 20% from the top of the viewport
                    xPercent: -50,        // GSAP's way of doing transform: translateX(-50%) to truly center it
                    yPercent: 0,          // Reset any vertical transform percentage
                    ease: 'power3.out'
                });

            } else {
                // DESKTOP LOGIC: Position card next to the cube (original behavior)
                const screenPos = new THREE.Vector3();
                hoveredCube.getWorldPosition(screenPos).project(camera);
                const x = (screenPos.x * 0.5 + 0.5) * window.innerWidth;
                const y = (screenPos.y * -0.5 + 0.5) * window.innerHeight;

                gsap.to(popupCard, {
                    duration: 0.5,
                    left: x + 25,
                    top: y,
                    xPercent: 0,        // Reset horizontal transform
                    yPercent: 0,        // Reset vertical transform
                    ease: 'power3.out'
                });
            }
        }
        // ========================================================
        // ==                 END OF MODIFIED CODE                 ==
        // ========================================================

        renderer.render(scene, camera);
    }

    // --- RESIZE HANDLER (WITH MOBILE ADJUSTMENTS) ---
    window.addEventListener('resize', () => {
        const width = window.innerWidth;
        const height = window.innerHeight;
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
        renderer.setSize(width, height);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

        if(width <= 900) {
            // Mobile: Center the cube, move it up, and make it smaller.
            mainCubeGroup.position.set(0, -2.1, 0); // CHANGED: from -3 to -2.5 to move it up
            mainCubeGroup.scale.set(0.85, 0.85, 0.85); // CHANGED: from 1.0 to 0.85 to shrink it
        } else {
            // Desktop: Position the cube in the right-hand grid column.
            mainCubeGroup.position.set(3.5, 0, 0);
            mainCubeGroup.scale.set(1.1, 1.1, 1.1);
        }
    });

    window.dispatchEvent(new Event('resize'));
    animate();
});


// --- 4. ACCORDION LOGIC FOR SERVICES SECTION ---
document.addEventListener('DOMContentLoaded', () => {
    const serviceItems = document.querySelectorAll('.service-item');
    serviceItems.forEach(item => {
        const header = item.querySelector('.service-header');
        if (header) {
            header.addEventListener('click', () => {
                const currentlyActiveItem = document.querySelector('.service-item.active');
                if (currentlyActiveItem && currentlyActiveItem !== item) {
                    currentlyActiveItem.classList.remove('active');
                }
                item.classList.toggle('active');
            });
        }
    });
});

// --- SCROLL ANIMATIONS ---
if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
    gsap.from(".about-section .section-heading", {
        scrollTrigger: { trigger: ".about-section", start: "top 80%", toggleActions: "play none none none" },
        duration: 1, x: -50, opacity: 0, ease: 'power3.out'
    });
    gsap.from(".about-section .about-right > *", {
        scrollTrigger: { trigger: ".about-section", start: "top 80%", toggleActions: "play none none none" },
        duration: 1, x: 50, opacity: 0, stagger: 0.2, ease: 'power3.out'
    });
    gsap.from(".services-section .section-heading", {
        scrollTrigger: { trigger: ".services-section", start: "top 80%", toggleActions: "play none none none" },
        duration: 1, x: -50, opacity: 0, ease: 'power3.out'
    });
    gsap.from(".services-section .service-item", {
        scrollTrigger: { trigger: ".services-section .services-list", start: "top 80%", toggleActions: "play none none none" },
        duration: 0.8, y: 40, opacity: 0, stagger: 0.15, ease: 'power3.out'
    });
    gsap.from(".services-section .services-cta-container", {
        scrollTrigger: { trigger: ".services-section .services-cta-container", start: "top 90%", toggleActions: "play none none none" },
        duration: 1, y: 40, opacity: 0, ease: 'power3.out'
    });
}

// --- 5. FINAL FEATURED PROJECTS LOGIC ---
document.addEventListener('DOMContentLoaded', () => {
    const projectsData = [
        { id: 'p1', title: 'Homna Limited', category: 'Campaign Strategy & Digital Marketing', heroImage: 'assets/img/h1.png', url: 'projects.html' },
        { id: 'p2', title: 'FreshMeals', category: 'Brand Identity & Social Media', heroImage: 'assets/img/f1.png', url: 'projects.html' },
        { id: 'p3', title: 'Psy addis', category: 'Brand Strategy & Apparel Design', heroImage: 'assets/img/p1.png', url: 'projects.html' },
        { id: 'p4', title: 'BTN Manufacturing', category: 'Content Strategy & SEO', heroImage: 'assets/img/btn1.png', url: 'projects.html' },
        { id: 'p5', title: 'Kazubaa Events', category: 'Event Marketing & Social Promotion', heroImage: 'assets/img/k1.png', url: 'projects.html' },
        { id: 'p6', title: 'DuraSeal', category: 'Corporate Branding & Web Design', heroImage: 'assets/img/d1.png', url: 'projects.html' }
    ];
    const projectsGrid = document.querySelector('.projects-grid');
    if (projectsGrid) {
        projectsData.forEach(project => {
            const cardLink = document.createElement('a');
            cardLink.href = project.url;
            cardLink.className = 'project-card';
            cardLink.setAttribute('data-project-id', project.id);
            cardLink.innerHTML = `
                <div class="project-image-wrapper">
                    <img src="${project.heroImage}" alt="${project.title}">
                </div>
                <div class="project-info">
                    <h3>${project.title}</h3>
                    <p>${project.category}</p>
                </div>`;
            projectsGrid.appendChild(cardLink);
        });
        if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
            gsap.from(".project-card", {
                scrollTrigger: { trigger: ".projects-grid", start: "top 80%" },
                duration: 0.8, y: 50, opacity: 0, stagger: 0.1,
            });
        }
    }
});

// --- 6. INFINITE LOGO SCROLLER LOGIC ---
document.addEventListener('DOMContentLoaded', () => {
    const logoScroller = document.querySelector('.logo-scroller');
    if (logoScroller) {
        const logoList = logoScroller.querySelector('.logo-list');
        const logos = Array.from(logoList.children);
        logos.forEach(logo => {
            const duplicate = logo.cloneNode(true);
            duplicate.setAttribute('aria-hidden', true);
            logoList.appendChild(duplicate);
        });
    }
});
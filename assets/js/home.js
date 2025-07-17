/* script.js */

// --- 1. LIVE WEBGL GRADIENT BACKGROUND ---

const canvas = document.getElementById('gradient-canvas');
const gl = canvas.getContext('webgl');

// The shader code. This is what runs on the GPU.
// Vertex shader positions the geometry.
const vertexShaderSource = `
    attribute vec2 a_position;
    void main() {
        gl_Position = vec4(a_position, 0.0, 1.0);
    }
`;

// Fragment shader calculates the color for each pixel.
const fragmentShaderSource = `
    precision mediump float;
    uniform vec2 u_resolution;
    uniform float u_time;

    // This is the main part of the "lava lamp" effect.
    // It's a pseudo-random noise function.
    float random(vec2 st) {
        return fract(sin(dot(st.xy, vec2(12.9898,78.233))) * 43758.5453123);
    }

    // Value noise function
    float noise(vec2 st) {
        vec2 i = floor(st);
        vec2 f = fract(st);
        float a = random(i);
        float b = random(i + vec2(1.0, 0.0));
        float c = random(i + vec2(0.0, 1.0));
        float d = random(i + vec2(1.0, 1.0));
        vec2 u = f * f * (3.0 - 2.0 * f);
        return mix(a, b, u.x) + (c - a)* u.y * (1.0 - u.x) + (d - b) * u.y * u.x;
    }

    void main() {
        vec2 st = gl_FragCoord.xy / u_resolution.xy;
        st.x *= u_resolution.x / u_resolution.y;

        // Animate the noise over time
        float n = noise(st * 3.0 + u_time * 0.1);

        // Define our orange-themed color palette
        vec3 color1 = vec3(1.0, 0.2, 0.0); // Bright Orange
        vec3 color2 = vec3(1.0, 0.4, 0.0); // Main Orange (#FF6700)
        vec3 color3 = vec3(0.5, 0.1, 0.5); // Dark Purple/Magenta accent

        // Mix colors based on the noise value
        vec3 color = mix(color1, color2, smoothstep(0.3, 0.5, n));
        color = mix(color, color3, smoothstep(0.6, 0.65, n));
        color = mix(color, color1, smoothstep(0.8, 0.85, n));

        gl_FragColor = vec4(color, 1.0);
    }
`;

// --- WebGL Boilerplate Functions ---
function createShader(gl, type, source) {
    const shader = gl.createShader(type);
    gl.shaderSource(shader, source);
    gl.compileShader(shader);
    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        console.error('Shader compilation error:', gl.getShaderInfoLog(shader));
        gl.deleteShader(shader);
        return null;
    }
    return shader;
}

function createProgram(gl, vertexShader, fragmentShader) {
    const program = gl.createProgram();
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
        console.error('Program linking error:', gl.getProgramInfoLog(program));
        gl.deleteProgram(program);
        return null;
    }
    return program;
}

// --- Main WebGL Setup ---
const vertexShader = createShader(gl, gl.VERTEX_SHADER, vertexShaderSource);
const fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, fragmentShaderSource);
const program = createProgram(gl, vertexShader, fragmentShader);

const positionAttributeLocation = gl.getAttribLocation(program, "a_position");
const resolutionUniformLocation = gl.getUniformLocation(program, "u_resolution");
const timeUniformLocation = gl.getUniformLocation(program, "u_time");

const positionBuffer = gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
const positions = [-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1];
gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW);

// --- Render Loop ---
function render(time) {
    time *= 0.001; // convert time to seconds

    // Resize canvas to match display size
    canvas.width = gl.canvas.clientWidth;
    canvas.height = gl.canvas.clientHeight;
    gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);

    gl.useProgram(program);

    gl.enableVertexAttribArray(positionAttributeLocation);
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    gl.vertexAttribPointer(positionAttributeLocation, 2, gl.FLOAT, false, 0, 0);

    // Pass uniforms to the shader
    gl.uniform2f(resolutionUniformLocation, gl.canvas.width, gl.canvas.height);
    gl.uniform1f(timeUniformLocation, time);

    gl.drawArrays(gl.TRIANGLES, 0, 6);

    requestAnimationFrame(render);
}
requestAnimationFrame(render);


// --- 2. HERO CONTENT ENTRY ANIMATION (using GSAP) ---
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



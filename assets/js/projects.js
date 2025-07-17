// projects.js

document.addEventListener('DOMContentLoaded', () => {

    // --- FINALIZED PROJECT DATA ---
    const projectsData = [
        {
            id: 'p1',
            layout: 'full',
            tags: ['Campaign Marketing', 'Event Marketing'],
            title: 'Finmap Financials Launch Event',
            heroImage: 'assets/img/s.png',
            description: 'Executed a high-impact launch event and digital campaign for Finmap. Our team managed event logistics, PR, and a multi-channel digital marketing push that generated massive early-stage buzz and user sign-ups.',
            details: { Client: 'Finmap', Year: '2024', Services: 'Event Marketing, Campaign Marketing' },
            galleryImages: ['https://picsum.photos/id/1015/800/600', 'https://picsum.photos/id/1016/800/600', 'https://picsum.photos/id/1018/800/600', 'https://picsum.photos/id/1025/800/600']
        },
        {
            id: 'p2',
            layout: 'half',
            tags: ['Brand Strategy'],
            title: 'Sky Hall Rebranding',
            heroImage: 'https://images.unsplash.com/photo-1574950578143-858c61e3f317?q=80&w=1964&auto=format&fit=crop',
            description: 'Developed a sophisticated new brand identity for the Sky Hall event space. We defined their core brand strategy, creating a new logo, color palette, and messaging that elevated their position in the luxury market.',
            details: { Client: 'Sky Hall Events', Year: '2023', Services: 'Brand Strategy' },
            galleryImages: ['https://picsum.photos/id/20/800/600', 'https://picsum.photos/id/22/800/600', 'https://picsum.photos/id/24/800/600', 'https://picsum.photos/id/25/800/600']
        },
        {
            id: 'p3',
            layout: 'half',
            tags: ['Campaign Marketing'],
            title: 'UltraViolet Fashion Campaign',
            heroImage: 'https://images.unsplash.com/photo-1594744806497-882ace3a3036?q=80&w=1887&auto=format&fit=crop',
            description: 'A social media campaign for the UltraViolet fashion line, featuring bold photography and influencer partnerships to capture a new, younger audience demographic and drive online sales.',
            details: { Client: 'UltraViolet', Year: '2024', Services: 'Campaign Marketing' },
            galleryImages: ['https://picsum.photos/id/30/800/600', 'https://picsum.photos/id/31/800/600', 'https://picsum.photos/id/32/800/600', 'https://picsum.photos/id/33/800/600']
        },
        {
            id: 'p4',
            layout: 'full',
            tags: ['Brand Strategy'],
            title: 'BEAR Puzzles Identity',
            heroImage: 'https://images.unsplash.com/photo-1596701062354-3e9c59325e36?q=80&w=1894&auto=format&fit=crop',
            description: 'Created a playful and engaging brand strategy for BEAR, a new line of 3D puzzles. The identity and packaging design stands out on shelves and has a strong unboxing experience.',
            details: { Client: 'Cartonix', Year: '2023', Services: 'Brand Strategy' },
            galleryImages: ['https://picsum.photos/id/40/800/600', 'https://picsum.photos/id/41/800/600', 'https://picsum.photos/id/42/800/600', 'https://picsum.photos/id/44/800/600']
        },
        {
            id: 'p5',
            layout: 'half',
            tags: ['Event Marketing'],
            title: 'Sonmax Auto Show',
            heroImage: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?q=80&w=2070&auto=format&fit=crop',
            description: 'We managed the activation marketing for Sonmax Auto at the annual motor show, designing a booth and interactive experience that generated a record number of leads for their sales team.',
            details: { Client: 'Sonmax Auto', Year: '2024', Services: 'Event Marketing' },
            galleryImages: ['https://picsum.photos/id/51/800/600', 'https://picsum.photos/id/53/800/600', 'https://picsum.photos/id/54/800/600', 'https://picsum.photos/id/58/800/600']
        },
        {
            id: 'p6',
            layout: 'half',
            tags: ['Campaign Marketing'],
            title: 'Promin Playlist Launch',
            heroImage: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=2070&auto=format&fit=crop',
            description: 'Launched a digital campaign to promote a new Spotify playlist. The campaign utilized targeted ads and social content, exceeding subscriber goals by 150% in the first month.',
            details: { Client: 'Promin', Year: '2023', Services: 'Campaign Marketing' },
            galleryImages: ['https://picsum.photos/id/60/800/600', 'https://picsum.photos/id/61/800/600', 'https://picsum.photos/id/63/800/600', 'https://picsum.photos/id/65/800/600']
        },
    ];

    const projectGrid = document.querySelector('.project-grid');
    const filterBar = document.querySelector('.filter-bar');

    function displayProjects(filteredProjects) {
        if (!projectGrid) return;
        projectGrid.innerHTML = '';
        filteredProjects.forEach(project => {
            const card = document.createElement('div');
            card.className = `project-card ${project.layout === 'full' ? 'full-width' : ''}`;
            card.setAttribute('data-project-id', project.id);
            card.innerHTML = `<img src="${project.heroImage}" alt="${project.title}"><div class="card-content"><div class="card-tags">${project.tags.map(tag => `<span class="card-tag">${tag}</span>`).join('')}</div><div class="card-info"><h3>${project.title}</h3></div></div>`;
            projectGrid.appendChild(card);
        });
    }

    function initFilters() {
        if (!filterBar) return;
        filterBar.addEventListener('click', (e) => {
            if (e.target.tagName !== 'BUTTON') return;
            filterBar.querySelector('.active').classList.remove('active');
            e.target.classList.add('active');
            const filter = e.target.dataset.filter;
            const filteredProjects = (filter === 'all') ? projectsData : projectsData.filter(p => p.tags.includes(filter));
            displayProjects(filteredProjects);
        });
    }

    function initModalLogic() {
        const modal = document.getElementById('project-modal');
        if (!modal || !projectGrid) return;
        const closeModalBtn = modal.querySelector('.close-modal-btn');
        const openModal = (projectId) => {
            const project = projectsData.find(p => p.id === projectId);
            if (!project) return;
            document.getElementById('popup-title').textContent = project.title;
            document.getElementById('popup-category').textContent = project.tags.join(', ');
            document.getElementById('popup-hero-image').src = project.heroImage;
            document.getElementById('popup-description').textContent = project.description;
            const detailsList = document.getElementById('popup-details-list');
            detailsList.innerHTML = '';
            for (const [key, value] of Object.entries(project.details)) {
                detailsList.innerHTML += `<dt>${key}</dt><dd>${value}</dd>`;
            }
            const galleryGrid = document.getElementById('popup-gallery-grid');
            galleryGrid.innerHTML = '';
            project.galleryImages.forEach(imgSrc => {
                galleryGrid.innerHTML += `<div><img src="${imgSrc}" alt="${project.title} gallery image"></div>`;
            });
            modal.classList.add('is-open');
            document.body.style.overflow = 'hidden';
        };
        const closeModal = () => {
            modal.classList.remove('is-open');
            document.body.style.overflow = '';
        };
        projectGrid.addEventListener('click', e => {
            const card = e.target.closest('.project-card');
            if (card) openModal(card.dataset.projectId);
        });
        closeModalBtn.addEventListener('click', closeModal);
        modal.addEventListener('click', e => { if (e.target === modal) closeModal(); });
    }

    displayProjects(projectsData);
    initFilters();
    initModalLogic();
});
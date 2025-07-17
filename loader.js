// loader.js
document.addEventListener("DOMContentLoaded", () => {
    const loadComponent = (url, placeholderId) => {
        fetch(url)
            .then(response => response.ok ? response.text() : Promise.reject(`Failed to fetch ${url}`))
            .then(data => {
                const placeholder = document.getElementById(placeholderId);
                if (placeholder) {
                    const parser = new DOMParser();
                    const doc = parser.parseFromString(data, 'text/html');
                    placeholder.innerHTML = doc.body.innerHTML;
                    doc.head.childNodes.forEach(node => document.head.appendChild(node.cloneNode(true)));
                    Array.from(doc.body.querySelectorAll('script')).forEach(oldScript => {
                        const newScript = document.createElement('script');
                        Array.from(oldScript.attributes).forEach(attr => newScript.setAttribute(attr.name, attr.value));
                        newScript.appendChild(document.createTextNode(oldScript.innerHTML));
                        oldScript.parentNode.replaceChild(newScript, oldScript);
                    });
                }
            })
            .catch(error => console.error('Error loading component:', error));
    };
    loadComponent('navbar.html', 'navbar-placeholder');
    loadComponent('footer.html', 'footer-placeholder');
});



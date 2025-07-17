// contact.js

document.addEventListener('DOMContentLoaded', () => {

    // --- MINI-CALENDAR GENERATION LOGIC ---
    const calendarContainer = document.getElementById('mini-calendar');
    if (calendarContainer) {
        const today = new Date();
        const month = today.getMonth();
        const year = today.getFullYear();

        const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

        const firstDayOfMonth = new Date(year, month, 1).getDay();
        const daysInMonth = new Date(year, month + 1, 0).getDate();

        let calendarHTML = `
            <div class="calendar-header">
                <span>${monthNames[month]} ${year}</span>
            </div>
            <div class="calendar-days-header">
                <div>S</div><div>M</div><div>T</div><div>W</div><div>T</div><div>F</div><div>S</div>
            </div>
            <div class="calendar-grid">
        `;

        for (let i = 0; i < firstDayOfMonth; i++) {
            calendarHTML += `<div class="calendar-day"></div>`;
        }

        for (let day = 1; day <= daysInMonth; day++) {
            let classes = 'calendar-day current-month';
            if (day === today.getDate() && month === today.getMonth() && year === today.getFullYear()) {
                classes += ' today';
            }
            if (day > today.getDate() && (day % 4 === 0 || day % 9 === 0)) {
                classes += ' available';
            }
            calendarHTML += `<div class="${classes}" title="Available for a call">${day}</div>`;
        }

        calendarHTML += `</div>`;
        calendarContainer.innerHTML = calendarHTML;
    }

    // --- FAQ ACCORDION LOGIC ---
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        const answer = item.querySelector('.faq-answer');

        question.addEventListener('click', () => {
            const isOpen = item.classList.contains('active');
            faqItems.forEach(i => {
                i.classList.remove('active');
                i.querySelector('.faq-answer').style.maxHeight = null;
            });
            if (!isOpen) {
                item.classList.add('active');
                answer.style.maxHeight = answer.scrollHeight + 'px';
            }
        });
    });

    // --- FORM SUBMISSION LOGIC ---
    const form = document.getElementById('contact-form');
    const successMessage = document.getElementById('success-message');

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const formData = new FormData(form);

        console.log("Form submitted!");
        for (let [key, value] of formData.entries()) {
            console.log(`${key}: ${value}`);
        }

        gsap.to(form, { duration: 0.5, opacity: 0, onComplete: () => {
            form.style.display = 'none';
            successMessage.style.display = 'block';
            gsap.from(successMessage, { duration: 0.5, opacity: 0, y: 20 });
        }});
    });

    // --- GSAP ENTRY ANIMATIONS ---
    gsap.from('.contact-header > *', { duration: 1, y: 30, opacity: 0, stagger: 0.2, ease: 'power3.out' });
    gsap.from('.form-container', { duration: 1, x: -50, opacity: 0, ease: 'power3.out', delay: 0.4, scrollTrigger: '.form-container' });
    gsap.from('.sidebar .quick-contact-block', { duration: 1, x: 50, opacity: 0, stagger: 0.2, ease: 'power3.out', delay: 0.6, scrollTrigger: '.sidebar' });
});
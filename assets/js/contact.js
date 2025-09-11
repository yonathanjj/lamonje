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

    document.addEventListener('DOMContentLoaded', function () {
        // --- FORM SUBMISSION LOGIC ---

        // Get the form and success message elements from the DOM
        const form = document.getElementById('contact-form');
        const successMessage = document.getElementById('success-message');

        // Add an event listener for the form's 'submit' event
        form.addEventListener('submit', function (e) {
            // 1. Prevent the browser's default form submission behavior
            e.preventDefault();

            // 2. Get the form data and the Formspree URL
            const formData = new FormData(form);
            const formAction = form.getAttribute('action');

            // 3. Submit the data to Formspree using fetch()
            fetch(formAction, {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json' // Important for getting a JSON response
                }
            }).then(response => {
                // 4. Check if Formspree accepted the submission
                if (response.ok) {
                    // If successful, run the GSAP success animation
                    console.log('Form submitted successfully to Formspree.');
                    gsap.to(form, {
                        duration: 0.5,
                        opacity: 0,
                        onComplete: () => {
                            form.style.display = 'none'; // Hide form completely
                            successMessage.style.display = 'block'; // Show success message
                            gsap.from(successMessage, {
                                duration: 0.5,
                                opacity: 0,
                                y: 20
                            });
                        }
                    });
                    form.reset(); // Clear the form fields for the next user
                } else {
                    // If there was an error, handle it
                    response.json().then(data => {
                        if (Object.hasOwn(data, 'errors')) {
                            alert(data["errors"].map(error => error["message"]).join(", "));
                        } else {
                            console.error('Formspree submission error:', data);
                            alert('Oops! There was a problem submitting your form. Please try again.');
                        }
                    });
                }
            }).catch(error => {
                // 5. Catch any network errors
                console.error('Network error:', error);
                alert('A network error occurred. Please check your connection and try again.');
            });
        });
    });

    // --- GSAP ENTRY ANIMATIONS ---
    gsap.from('.contact-header > *', { duration: 1, y: 30, opacity: 0, stagger: 0.2, ease: 'power3.out' });
    gsap.from('.form-container', { duration: 1, x: -50, opacity: 0, ease: 'power3.out', delay: 0.4, scrollTrigger: '.form-container' });
    gsap.from('.sidebar .quick-contact-block', { duration: 1, x: 50, opacity: 0, stagger: 0.2, ease: 'power3.out', delay: 0.6, scrollTrigger: '.sidebar' });
});
document.addEventListener('DOMContentLoaded', () => {
    // Typed.js for typewriter effect
    new Typed('#typed-text', {
        strings: ['Cloud & Automation Engineer', 'Site Reliability Engineer (SRE)', 'Python Automation & Tooling', 'Data Engineering & ML', 'Network & DNS Automation'],
        typeSpeed: 50,
        backSpeed: 30,
        loop: true
    });

    // Particles.js for hero background
    particlesJS('particles-js', {
        particles: {
            number: { value: 50, density: { enable: true, value_area: 800 } },
            color: { value: '#d4af37' },
            shape: { type: 'circle' },
            opacity: { value: 0.5, random: true },
            size: { value: 3, random: true },
            line_linked: { enable: true, distance: 150, color: '#d4af37', opacity: 0.4, width: 1 },
            move: { enable: true, speed: 2, direction: 'none', random: false, straight: false, out_mode: 'out' }
        },
        interactivity: {
            detect_on: 'canvas',
            events: { onhover: { enable: true, mode: 'grab' }, onclick: { enable: true, mode: 'push' }, resize: true },
            modes: { grab: { distance: 140, line_linked: { opacity: 1 } }, push: { particles_nb: 4 } }
        },
        retina_detect: true
    });

    // Project filter
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            const filter = button.getAttribute('data-filter');
            projectCards.forEach(card => {
                if (filter === 'all' || card.getAttribute('data-category') === filter) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });

    // Contact form submission (supports Formspree via AJAX and local fallback)
    const contactForm = document.getElementById('contact-form');
    const contactMessage = document.getElementById('contact-form-message');

    function showContactMessage(text, status) {
        if (!contactMessage) {
            alert(text);
            return;
        }
        contactMessage.style.display = 'block';
        contactMessage.textContent = text;
        contactMessage.className = 'form-alert ' + (status === 'success' ? 'success' : 'error');
        // simple inline styling fallback for visibility
        if (status === 'success') {
            contactMessage.style.background = 'rgba(34,197,94,0.08)';
            contactMessage.style.border = '1px solid rgba(34,197,94,0.2)';
            contactMessage.style.color = '#bbf7d0';
        } else {
            contactMessage.style.background = 'rgba(239,68,68,0.06)';
            contactMessage.style.border = '1px solid rgba(239,68,68,0.16)';
            contactMessage.style.color = '#fecaca';
        }
        // hide after a short delay for success
        if (status === 'success') setTimeout(() => { contactMessage.style.display = 'none'; }, 6000);
    }

    if (contactForm) {
        if (contactForm.dataset.useFormspree) {
            contactForm.addEventListener('submit', async (e) => {
                e.preventDefault();
                const action = contactForm.action;
                const formData = new FormData(contactForm);
                try {
                    const res = await fetch(action, { method: 'POST', body: formData, headers: { 'Accept': 'application/json' } });
                    if (res.ok) {
                        showContactMessage('Thank you — your message has been sent.', 'success');
                        contactForm.reset();
                    } else {
                        let errText = 'There was an error sending your message. Please try again later.';
                        try {
                            const data = await res.json();
                            if (data && data.error) errText = data.error;
                        } catch (_) {}
                        showContactMessage(errText, 'error');
                    }
                } catch (err) {
                    showContactMessage('Unable to send message. Please check your connection and try again.', 'error');
                    console.error('Contact submit error', err);
                }
            });
        } else {
            // Local fallback behavior for static hosting
            contactForm.addEventListener('submit', (e) => {
                e.preventDefault();
                const name = document.getElementById('contact-name').value.trim();
                const email = document.getElementById('contact-email').value.trim();
                const message = document.getElementById('contact-message').value.trim();
                const entry = { name, email, message, timestamp: new Date().toISOString() };

                try {
                    const stored = JSON.parse(localStorage.getItem('contact_submissions') || '[]');
                    stored.push(entry);
                    localStorage.setItem('contact_submissions', JSON.stringify(stored));
                } catch (err) {
                    console.error('Could not save to localStorage', err);
                }

                const text = `---\nTime: ${entry.timestamp}\nName: ${entry.name}\nEmail: ${entry.email}\nMessage:\n${entry.message}\n`;
                const blob = new Blob([text], { type: 'text/plain' });
                const url = URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = `contact-submission-${Date.now()}.txt`;
                document.body.appendChild(a);
                a.click();
                a.remove();
                URL.revokeObjectURL(url);

                showContactMessage('Submission saved locally and downloaded. This site is static so data cannot be stored on the server.', 'success');
                contactForm.reset();
            });
        }
    }

    // Skills radar chart
    new Chart(document.getElementById('skills-chart'), {
        type: 'radar',
        data: {
            labels: ['Azure', 'AWS', 'Terraform', 'Python', 'Ansible', 'SRE', 'Networking/DNS', 'Azure Data Factory', 'PySpark', 'ELK / Observability'],
            datasets: [{
                label: 'Skill Level',
                data: [90, 85, 85, 92, 80, 86, 80, 75, 75, 78],
                backgroundColor: 'rgba(212, 175, 55, 0.18)',
                borderColor: '#d4af37',
                borderWidth: 2,
                pointBackgroundColor: '#d4af37'
            }]
        },
        options: {
            scales: {
                r: {
                    angleLines: { color: '#d1d5db' },
                    grid: { color: '#d1d5db' },
                    pointLabels: { color: '#ffffff' },
                    ticks: { display: false }
                }
            },
            plugins: {
                legend: { labels: { color: '#ffffff' } }
            }
        }
    });

    // Animate skill bars reliably (requestAnimationFrame-based)
    const skillItems = document.querySelectorAll('.skill-item');
    const skillsSection = document.getElementById('skills');
    if (skillItems.length && skillsSection) {
        let animated = false;
        function animateSkills() {
            if (animated) return;
            animated = true;
            skillItems.forEach(item => {
                const value = parseInt(item.getAttribute('data-value') || '0', 10) || 0;
                const fill = item.querySelector('.skill-bar-fill');
                const percentEl = item.querySelector('.skill-percent');
                if (!fill || !percentEl) return;
                const duration = 900; // ms
                const start = performance.now();
                function step(now) {
                    const elapsed = now - start;
                    const progress = Math.min(elapsed / duration, 1);
                    const current = Math.round(progress * value);
                    fill.style.width = current + '%';
                    percentEl.textContent = current + '%';
                    if (progress < 1) requestAnimationFrame(step);
                }
                requestAnimationFrame(step);
            });
        }

        // Trigger animation if section already visible, otherwise on scroll when it comes into view
        if (skillsSection.getBoundingClientRect().top < window.innerHeight) {
            setTimeout(animateSkills, 200);
        } else {
            function onScroll() {
                if (skillsSection.getBoundingClientRect().top < window.innerHeight - 100) {
                    animateSkills();
                    window.removeEventListener('scroll', onScroll);
                }
            }
            window.addEventListener('scroll', onScroll, { passive: true });
        }
    }
});
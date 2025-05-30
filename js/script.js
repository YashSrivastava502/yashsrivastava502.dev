document.addEventListener('DOMContentLoaded', () => {
    // Typed.js for typewriter effect
    new Typed('#typed-text', {
        strings: ['DevOps & Data Engineer', 'Automation Engineer'],
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

    // Contact form submission
    const contactForm = document.getElementById('contact-form');
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        alert('Message sent! (Placeholder; contact me for a backend solution)');
        contactForm.reset();
    });

    // Skills radar chart
    new Chart(document.getElementById('skills-chart'), {
        type: 'radar',
        data: {
            labels: ['AWS', 'Azure', 'Terraform', 'Python', 'Ansible', 'Azure Data Factory', 'PySpark', 'Databricks', 'ELK Stack', 'DevOps'],
            datasets: [{
                label: 'Skill Level',
                data: [85, 90, 80, 90, 80, 75, 75, 70, 75, 70],
                backgroundColor: 'rgba(212, 175, 55, 0.2)',
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
});
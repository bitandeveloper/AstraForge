// Loading Screen Handler
window.addEventListener("load", () => {
    const loadingScreen = document.getElementById('loading-screen');

    // Ensure loading screen shows for minimum 1.5s even if page loads instantly
    setTimeout(() => {
        loadingScreen.classList.add('fade-out');

        // Remove from DOM after fade-out completes
        setTimeout(() => {
            loadingScreen.remove();
        }, 600); // Match CSS transition duration
    }, 1500); // Minimum display time

    document.body.classList.add("loaded");
});

// Scroll Fade-In Animation
const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add("visible");
        }
    });
}, { threshold: 0.2 });

document.querySelectorAll(".fade-in").forEach(el => {
    observer.observe(el);
});

// Hamburger Toggle
const hamburger = document.getElementById("hamburger");
const navMenu = document.getElementById("nav-menu");

if (hamburger && navMenu) {
    hamburger.addEventListener("click", () => {
        if (navMenu.style.display === "flex") {
            navMenu.style.display = "none";
        } else {
            navMenu.style.display = "flex";
        }
    });
}

// Active Link Highlight
const currentPath = window.location.pathname;
const navLinks = document.querySelectorAll('nav a');

navLinks.forEach(link => {
    // Check if the link's href matches the current path
    // OR if we are on root and link is index.html
    const href = link.getAttribute('href');
    if (currentPath.includes(href) || (currentPath.endsWith('/') && href === 'index.html')) {
        link.classList.add('active');
    }
});

// Contact Form Handler (Mock)
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const btn = contactForm.querySelector('button');
        const originalText = btn.innerText;
        btn.innerText = "Transmitting Protocol...";

        // EmailJS Service options
        const serviceID = 'service_rgf271t';
        const templateID = 'template_9cqtw6c';

        // Send the form directly using EmailJS
        emailjs.sendForm(serviceID, templateID, contactForm)
            .then(() => {
                // Success State
                btn.style.background = '#4CAF50';
                btn.style.color = 'white';
                btn.innerText = "Protocol Sent Successfully";

                // Optional: Show success message below form
                const successMsg = document.createElement('div');
                successMsg.className = 'success-message fade-in visible';
                successMsg.style.marginTop = '1rem';
                successMsg.style.textAlign = 'center';
                successMsg.style.color = '#4CAF50';
                successMsg.innerHTML = "<p>Mission received. We will respond within 48 hours.</p>";

                if (!contactForm.querySelector('.success-message')) {
                    contactForm.appendChild(successMsg);
                }

                setTimeout(() => {
                    btn.innerText = originalText;
                    btn.style.background = ''; // Reset to CSS default
                    btn.style.color = '';
                    contactForm.reset();
                    if (successMsg) successMsg.remove();
                }, 5000);
            }, (err) => {
                // Error State
                console.error('FAILED...', err);
                btn.style.background = '#f44336';
                btn.innerText = "Transmission Failed";
                alert("Protocol failed to send. Please check your network or email directly at berabitan.14@gmail.com");

                setTimeout(() => {
                    btn.innerText = originalText;
                    btn.style.background = '';
                }, 3000);
                setTimeout(() => {
                    btn.innerText = originalText;
                    btn.style.background = '';
                }, 3000);
            });
    });
}

// Project Filter Logic
const filterBtns = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');

if (filterBtns.length > 0) {
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all
            filterBtns.forEach(b => b.classList.remove('active'));
            // Add to clicked
            btn.classList.add('active');

            const filterValue = btn.getAttribute('data-filter');

            projectCards.forEach(card => {
                const category = card.getAttribute('data-category');

                if (filterValue === 'all' || category === filterValue) {
                    card.style.display = 'block';
                    // Optional: Add fade-in animation reset here
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });
}

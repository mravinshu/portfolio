// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            e.preventDefault();
            targetElement.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// Simple entrance animation for cards
const cards = document.querySelectorAll('.card');
const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px"
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = "1";
            entry.target.style.transform = "translateY(0)";
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

cards.forEach((card, index) => {
    card.style.opacity = "0";
    card.style.transform = "translateY(20px)";
    card.style.transition = `opacity 0.5s ease ${index * 0.1}s, transform 0.5s ease ${index * 0.1}s`;
    observer.observe(card);
});

// Typewriter Effect
const typewriterElement = document.getElementById('typewriter-text');
const roles = ["DATA SCIENTIST", "SOFTWARE DEVELOPER", "MENTOR", "TECH ENTHUSIAST"];
let roleIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeWriter() {
    const currentRole = roles[roleIndex];
    let typeSpeed = 100;

    if (isDeleting) {
        typewriterElement.textContent = currentRole.substring(0, charIndex - 1);
        charIndex--;
        typeSpeed = 50;
    } else {
        typewriterElement.textContent = currentRole.substring(0, charIndex + 1);
        charIndex++;
    }

    if (!isDeleting && charIndex === currentRole.length) {
        // Finished typing role, pause then delete
        typeSpeed = 2000;
        isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
        // Finished deleting, switch to next role
        isDeleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
        typeSpeed = 500;
    }

    setTimeout(typeWriter, typeSpeed);
}

document.addEventListener('DOMContentLoaded', () => {
    if (typewriterElement) {
        typewriterElement.textContent = "";
        setTimeout(typeWriter, 500);
    }
});


// Genie Effect Generic Function
function setupGenieModal(triggerSelector, modalId) {
    const triggerCard = document.querySelector(triggerSelector);
    const modal = document.getElementById(modalId);

    if (triggerCard && modal) {
        const modalContent = modal.querySelector('.modal-content');
        const closeModalBtn = modal.querySelector('.close-modal');

        triggerCard.addEventListener('click', (e) => {
            e.preventDefault();

            // Calculate card position/center for the genie origin
            const cardRect = triggerCard.getBoundingClientRect();
            const cardCenterX = cardRect.left + cardRect.width / 2;
            const cardCenterY = cardRect.top + cardRect.height / 2;

            const viewportCenterX = window.innerWidth / 2;
            const viewportCenterY = window.innerHeight / 2;

            // Offset of card from center
            const offsetX = cardCenterX - viewportCenterX;
            const offsetY = cardCenterY - viewportCenterY;

            // Set transform origin dynamically
            modalContent.style.transformOrigin = `calc(50% + ${offsetX}px) calc(50% + ${offsetY}px)`;

            modal.classList.add('open');
        });

        closeModalBtn.addEventListener('click', () => {
            modal.classList.remove('open');
        });

        // Close on click outside
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.classList.remove('open');
            }
        });
    }
}

// Setup Modals
setupGenieModal('.projects-card', 'projects-modal');
setupGenieModal('.skills-card', 'skills-modal');
setupGenieModal('.education-card', 'education-modal');
setupGenieModal('.experience-card', 'experience-modal');
setupGenieModal('.achievements-card', 'achievements-modal');
setupGenieModal('.btn-resume', 'resume-modal');
setupGenieModal('.contact-card', 'contact-modal');

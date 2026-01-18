// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
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
const textToType = "DATA SCIENTIST & SOFTWARE DEVELOPER";
let typeIndex = 0;

function typeWriter() {
    if (typeIndex < textToType.length) {
        typewriterElement.textContent += textToType.charAt(typeIndex);
        typeIndex++;
        setTimeout(typeWriter, 50); // Adjust typing speed here
    }
}

document.addEventListener('DOMContentLoaded', () => {
    // Clear it just in case
    if (typewriterElement) {
        typewriterElement.textContent = '';
        setTimeout(typeWriter, 500); // Small delay before starting
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
setupGenieModal('.contact-card', 'contact-modal');

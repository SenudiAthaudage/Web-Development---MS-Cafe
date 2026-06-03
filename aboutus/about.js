// Flip card buttons
const buttons = document.querySelectorAll('.flip-btn');
buttons.forEach(button => {
    button.addEventListener('click', () => {
        const card = button.closest('.flip-card');
        card.classList.toggle('active');
    });
});

// Scroll reveal for photo
const photo = document.querySelector('#photo');  // use the id to be safe

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('show');
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.2 });

if (photo) observer.observe(photo);
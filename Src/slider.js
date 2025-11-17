
const slider = document.getElementById('slider');
const sliderContainer = document.getElementById('sliderContainer') || document.querySelector('.slider-container');
const slides = Array.from(document.querySelectorAll('.slide'));
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const indicatorsContainer = document.getElementById('sliderIndicators');
let currentIndex = 0;
let intervalId = null;
const AUTOPLAY_DELAY = 3000;

function createIndicators() {
    if (!indicatorsContainer) return;
    indicatorsContainer.innerHTML = '';
    slides.forEach((_, i) => {
        const btn = document.createElement('button');
        btn.className = 'w-2 h-2 rounded-full bg-white bg-opacity-60 hover:bg-opacity-90 transition';
        btn.setAttribute('aria-label', `Slide ${i + 1}`);
        btn.setAttribute('data-slide', String(i));
        btn.addEventListener('click', () => {
            goToSlide(i);
            restartAutoplay();
        });
        indicatorsContainer.appendChild(btn);
    });
}

function updateIndicators() {
    if (!indicatorsContainer) return;
    const buttons = indicatorsContainer.querySelectorAll('button');
    buttons.forEach((b, i) => {
        b.classList.toggle('bg-opacity-100', i === currentIndex);
        b.classList.toggle('bg-opacity-60', i !== currentIndex);
    });
}

function showSlide(index) {
    if (!slider) return;
    currentIndex = ((index % slides.length) + slides.length) % slides.length; // normalize
    const offset = -currentIndex * 100; // Calculate the offset for the current slide
    slider.style.transform = `translateX(${offset}%)`;

    // Accessibility: mark non-active slides as hidden
    slides.forEach((s, i) => {
        s.setAttribute('aria-hidden', i === currentIndex ? 'false' : 'true');
        s.tabIndex = i === currentIndex ? 0 : -1;
    });

    updateIndicators();
}

function goToSlide(i) {
    showSlide(i);
}

nextBtn && nextBtn.addEventListener('click', () => {
    goToSlide(currentIndex + 1);
    restartAutoplay();
});

prevBtn && prevBtn.addEventListener('click', () => {
    goToSlide(currentIndex - 1);
    restartAutoplay();
});

function startAutoplay() {
    stopAutoplay();
    intervalId = setInterval(() => {
        goToSlide(currentIndex + 1);
    }, AUTOPLAY_DELAY);
}

function stopAutoplay() {
    if (intervalId) {
        clearInterval(intervalId);
        intervalId = null;
    }
}

function restartAutoplay() {
    stopAutoplay();
    startAutoplay();
}

// Pause on hover/focus for better UX
if (sliderContainer) {
    sliderContainer.addEventListener('mouseenter', stopAutoplay);
    sliderContainer.addEventListener('mouseleave', startAutoplay);
    sliderContainer.addEventListener('focusin', stopAutoplay);
    sliderContainer.addEventListener('focusout', startAutoplay);
}

// Keyboard navigation
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') {
        goToSlide(currentIndex - 1);
        restartAutoplay();
    } else if (e.key === 'ArrowRight') {
        goToSlide(currentIndex + 1);
        restartAutoplay();
    }
});

// Initialize
createIndicators();
showSlide(0);
startAutoplay();



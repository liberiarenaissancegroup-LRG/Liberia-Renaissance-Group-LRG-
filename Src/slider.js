
    const slider = document.getElementById('slider');
    const slides = document.querySelectorAll('.slide');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    let currentIndex = 0;

    function showSlide(index) {
        if (index >= slides.length) {
            currentIndex = 0;
        } else if (index < 0) {
            currentIndex = slides.length - 1;
        }
        const offset = -currentIndex * 100; // Calculate the offset for the current slide
        slider.style.transform = `translateX(${offset}%)`; // Move the slider
    }

    nextBtn.addEventListener('click', () => {
        currentIndex++;
        showSlide(currentIndex);
    });

    prevBtn.addEventListener('click', () => {
        currentIndex--;
        showSlide(currentIndex);
    });

    // Auto slide every 1 second (1000 milliseconds)
    setInterval(() => {
        currentIndex++;
        showSlide(currentIndex);
    }, 3000); // Change the interval to 1000 milliseconds



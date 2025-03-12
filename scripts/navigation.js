document.addEventListener('DOMContentLoaded', () => {
    const spreads = document.querySelectorAll('.notebook-spread');
    const prevButton = document.querySelector('.prev-spread');
    const nextButton = document.querySelector('.next-spread');
    let currentSpread = parseInt(localStorage.getItem('currentSpread')) || 1;
    const totalSpreads = spreads.length;

    function updateNavigation() {
        // Update button states
        prevButton.disabled = currentSpread === 1;
        nextButton.disabled = currentSpread === totalSpreads;

        // Update spread visibility
        spreads.forEach(spread => {
            const spreadNum = parseInt(spread.dataset.spread);
            if (spreadNum === currentSpread) {
                spread.classList.add('active');
                spread.style.display = 'flex';
            } else {
                spread.classList.remove('active');
                spread.style.display = 'none';
            }
        });

        localStorage.setItem('currentSpread', currentSpread);
    }

    // Initialize visibility
    updateNavigation();

    // Add click handlers
    prevButton.addEventListener('click', () => {
        if (currentSpread > 1) {
            currentSpread--;
            updateNavigation();
        }
    });

    nextButton.addEventListener('click', () => {
        if (currentSpread < totalSpreads) {
            currentSpread++;
            updateNavigation();
        }
    });

    // Add keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft' && !prevButton.disabled) {
            prevButton.click();
        } else if (e.key === 'ArrowRight' && !nextButton.disabled) {
            nextButton.click();
        }
    });
});

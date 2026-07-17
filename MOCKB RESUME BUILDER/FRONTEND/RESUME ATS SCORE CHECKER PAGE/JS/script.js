// script.js for Resume ATS Score Checker Gateway Page
document.addEventListener('DOMContentLoaded', () => {
    const backBtn = document.querySelector('.back-btn');
    if (backBtn) {
        backBtn.addEventListener('click', (e) => {
            // If the href is just #, use history.back()
            if (backBtn.getAttribute('href') === '#') {
                e.preventDefault();
                window.history.back();
            }
        });
    }
});

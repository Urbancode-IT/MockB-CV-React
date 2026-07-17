function startAnalysis() {
    document.getElementById('initial-content').style.display = 'none';
    document.getElementById('analysis-loading').style.display = 'flex';
    
    // Simulate analysis time
    setTimeout(() => {
        document.getElementById('analysis-loading').style.display = 'none';
        document.getElementById('analysis-report').style.display = 'block';
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 2500);
}

function upgradeResume() {
    document.getElementById('analysis-report').style.display = 'none';
    document.getElementById('analysis-loading').querySelector('h3').innerText = 'Upgrading your resume...';
    document.getElementById('analysis-loading').querySelector('p').innerText = 'Applying smart suggestions and optimizing formatting.';
    document.getElementById('analysis-loading').style.display = 'flex';

    // Simulate upgrade time
    setTimeout(() => {
        document.getElementById('analysis-loading').style.display = 'none';
        document.getElementById('upgraded-preview').style.display = 'block';
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 2000);
}

function resetUpgrader() {
    document.getElementById('upgraded-preview').style.display = 'none';
    document.getElementById('initial-content').style.display = 'block';
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Cover Letter Upgrader Specific JS

document.addEventListener('DOMContentLoaded', () => {
    // File Upload Drag & Drop Logic
    const dropZone = document.getElementById('drop-zone');
    const fileInput = document.getElementById('file-input');

    if (dropZone) {
        ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
            dropZone.addEventListener(eventName, preventDefaults, false);
        });

        ['dragenter', 'dragover'].forEach(eventName => {
            dropZone.addEventListener(eventName, () => dropZone.classList.add('dragover'), false);
        });

        ['dragleave', 'drop'].forEach(eventName => {
            dropZone.addEventListener(eventName, () => dropZone.classList.remove('dragover'), false);
        });

        dropZone.addEventListener('drop', (e) => {
            let dt = e.dataTransfer;
            let files = dt.files;
            handleFiles(files);
        }, false);
    }
});

function preventDefaults(e) {
    e.preventDefault();
    e.stopPropagation();
}

function handleFileSelect(input) {
    handleFiles(input.files);
}

function handleFiles(files) {
    if (files.length > 0) {
        const file = files[0];
        const fileList = document.getElementById('file-list');
        const uploadError = document.getElementById('upload-error');
        
        if (uploadError) uploadError.style.display = 'none';
        
        fileList.innerHTML = ''; // Clear previous

        const fileItem = document.createElement('div');
        fileItem.className = 'cl-file-item';
        
        const isPdf = file.name.toLowerCase().endsWith('.pdf');
        const iconColor = isPdf ? '#F44336' : '#2196F3';
        const iconClass = isPdf ? 'fa-file-pdf' : 'fa-file-word';
        
        fileItem.innerHTML = `
            <div style="display: flex; align-items: center; gap: 15px;">
                <i class="fa-solid ${iconClass}" style="font-size: 24px; color: ${iconColor};"></i>
                <div>
                    <div style="font-weight: bold;">${file.name}</div>
                    <div style="font-size: 0.85rem; color: var(--text-gray);">${(file.size / (1024 * 1024)).toFixed(2)} MB</div>
                </div>
            </div>
            <div style="display: flex; align-items: center; gap: 15px;">
                <i class="fa-solid fa-check" style="color: #4CAF50;"></i>
                <i class="fa-solid fa-xmark" style="color: #888; cursor: pointer; transition: color 0.2s;" onmouseover="this.style.color='#f44336'" onmouseout="this.style.color='#888'" onclick="removeUploadedFile(event)"></i>
            </div>
        `;
        
        fileList.appendChild(fileItem);
        
        // Auto scroll to next step
        setTimeout(() => {
            const nextStep = document.querySelectorAll('.cl-step-row')[1];
            if (nextStep) {
                const y = nextStep.getBoundingClientRect().top + window.pageYOffset - 100;
                window.scrollTo({top: y, behavior: 'smooth'});
            }
        }, 500);
    }
}

function scrollToUpload() {
    const uploadSection = document.getElementById('upload-section');
    if (uploadSection) {
        const y = uploadSection.getBoundingClientRect().top + window.pageYOffset - 80;
        window.scrollTo({ top: y, behavior: "smooth" });
    }
}

function startAnalysis() {
    const fileList = document.getElementById('file-list');
    const roleInput = document.getElementById('target-role');
    const uploadError = document.getElementById('upload-error');
    const roleError = document.getElementById('role-error');
    
    let hasError = false;

    if (!fileList || fileList.children.length === 0) {
        uploadError.style.display = 'block';
        hasError = true;
    } else {
        uploadError.style.display = 'none';
    }
    
    if (!roleInput || !roleInput.value.trim()) {
        roleError.style.display = 'block';
        hasError = true;
    } else {
        roleError.style.display = 'none';
    }

    if (hasError) {
        if (uploadError.style.display === 'block') {
            scrollToUpload();
        } else if (roleError.style.display === 'block') {
            roleInput.focus();
        }
        return;
    }

    document.getElementById('initial-content').style.display = 'none';
    document.getElementById('analysis-loading').style.display = 'block';
    window.scrollTo({ top: 0, behavior: 'smooth' });
    
    setTimeout(() => {
        document.getElementById('analysis-loading').style.display = 'none';
        document.getElementById('analysis-report').style.display = 'block';
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 2500);
}

function upgradeDocument() {
    document.getElementById('analysis-report').style.display = 'none';
    
    const loadingTitle = document.getElementById('loading-title');
    const loadingDesc = document.getElementById('loading-desc');
    loadingTitle.innerText = 'Upgrading your Cover Letter...';
    loadingDesc.innerText = 'Applying narrative enhancements and missing keywords.';
    
    document.getElementById('analysis-loading').style.display = 'block';
    window.scrollTo({ top: 0, behavior: 'smooth' });

    setTimeout(() => {
        document.getElementById('analysis-loading').style.display = 'none';
        document.getElementById('upgraded-preview').style.display = 'block';
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 2500);
}

function resetUpgrader() {
    document.getElementById('upgraded-preview').style.display = 'none';
    document.getElementById('analysis-report').style.display = 'none';
    
    document.getElementById('initial-content').style.display = 'block';
    
    // Reset fields
    document.getElementById('file-list').innerHTML = '';
    document.getElementById('target-role').value = '';
    
    // Reset Loading Text
    document.getElementById('loading-title').innerText = 'Analyzing Cover Letter...';
    document.getElementById('loading-desc').innerText = 'Evaluating tone, keyword density, and professional alignment.';
    
    scrollToUpload();
}

function changeTemplate(themeName, element) {
    // Update active class on options
    document.querySelectorAll('.cl-template-option').forEach(el => el.classList.remove('active'));
    element.classList.add('active');

    // Update mockup class
    const mockup = document.querySelector('.cl-letter-mockup');
    mockup.className = 'cl-letter-mockup ' + themeName;
}

function downloadPDF() {
    window.print();
}

function downloadWord() {
    const mockupContent = document.querySelector('.cl-letter-mockup').innerHTML;
    const header = "<html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'><head><meta charset='utf-8'><title>Cover Letter</title></head><body>";
    const footer = "</body></html>";
    const sourceHTML = header + mockupContent + footer;
    
    const source = 'data:application/vnd.ms-word;charset=utf-8,' + encodeURIComponent(sourceHTML);
    const fileDownload = document.createElement("a");
    document.body.appendChild(fileDownload);
    fileDownload.href = source;
    fileDownload.download = 'Upgraded_Cover_Letter.doc';
    fileDownload.click();
    document.body.removeChild(fileDownload);
}

function toggleFaq(element) {
    const answer = element.nextElementSibling;
    const icon = element.querySelector('i');
    
    if (answer.style.maxHeight && answer.style.maxHeight !== '0px') {
        answer.style.maxHeight = '0px';
        icon.style.transform = 'rotate(0deg)';
    } else {
        answer.style.maxHeight = answer.scrollHeight + 'px';
        icon.style.transform = 'rotate(180deg)';
    }
}

function removeUploadedFile(event) {
    if (event) {
        event.stopPropagation();
    }
    const fileList = document.getElementById('file-list');
    if (fileList) {
        fileList.innerHTML = '';
    }
    const fileInput = document.getElementById('file-input');
    if (fileInput) {
        fileInput.value = '';
    }
}

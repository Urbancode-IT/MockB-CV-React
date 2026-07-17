document.addEventListener('DOMContentLoaded', () => {
    const generateBtn = document.getElementById('generate-btn');
    const aiLoader = document.getElementById('ai-loader');
    const previewBody = document.getElementById('preview-body');
    const progressFill = document.querySelector('.progress-fill');
    const typingStatus = document.querySelector('.typing-status');
    const uploadBox = document.getElementById('upload-box');
    const fileInput = document.getElementById('file-upload');
    const templateOptions = document.querySelectorAll('.template-option');
    
    let selectedTemplate = 'modern';

    // Handle Template Selection
    templateOptions.forEach(opt => {
        opt.addEventListener('click', () => {
            templateOptions.forEach(o => o.classList.remove('active'));
            opt.classList.add('active');
            selectedTemplate = opt.getAttribute('data-template');
        });
    });

    // Handle File Upload Visuals
    uploadBox.addEventListener('click', () => fileInput.click());
    
    fileInput.addEventListener('change', (e) => {
        if (e.target.files.length > 0) {
            uploadBox.querySelector('span').innerText = `File selected: ${e.target.files[0].name}`;
            uploadBox.classList.add('active');
        }
    });

    // Simulated AI Generation
    generateBtn.addEventListener('click', async () => {
        // Collect data
        const data = {
            jd: document.getElementById('job-description').value,
            name: document.getElementById('user-name').value || 'Your Name',
            title: document.getElementById('target-title').value || 'Hiring Manager',
            exp: document.getElementById('user-experience').value,
            edu: document.getElementById('user-education').value,
            skills: document.getElementById('user-skills').value
        };

        if (!data.jd) {
            Swal.fire({
                icon: 'warning',
                title: 'Missing Job Description',
                text: 'Please paste a job description first so our AI can analyze it!',
                confirmButtonColor: '#EEC30C',
                background: '#1A1A1A',
                color: '#FFF'
            });
            return;
        }

        // Show Loader
        aiLoader.style.display = 'flex';
        
        // Progress Simulation
        const steps = [
            { p: 20, t: 'Analyzing Job Description...' },
            { p: 40, t: 'Extracting key requirements and keywords...' },
            { p: 70, t: 'Aligning your skills with JD requirements...' },
            { p: 90, t: 'Checking grammar and professional tone...' },
            { p: 100, t: 'Finalizing cover letter...' }
        ];

        for (const step of steps) {
            await new Promise(r => setTimeout(r, 800));
            progressFill.style.width = `${step.p}%`;
            typingStatus.innerText = step.t;
        }

        // Generate Letter Content
        const date = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
        
        let letterHtml = '';

        const mainContent = `
            <div class="letter-body" style="line-height: 1.8; color: #333; text-align: justify;">
                <p style="margin-bottom: 20px;">
                    I am writing to express my strong interest in the <strong>${data.title}</strong> position as advertised. 
                    After carefully reviewing the requirements mentioned in your job description, I am confident that my background in 
                    ${data.skills || 'my field'} and my passion for excellence make me an ideal candidate for this role.
                </p>

                <p style="margin-bottom: 20px;">
                    In my previous experience, ${data.exp || 'I have consistently delivered high-quality results and demonstrated strong leadership.'} 
                    My education at ${data.edu || 'my university'} has provided me with a solid foundation to excel in a fast-paced environment. 
                    I was particularly drawn to this opportunity because of the emphasis on technical proficiency and collaborative problem-solving 
                    highlighted in your posting.
                </p>

                <p style="margin-bottom: 20px;">
                    Throughout my career, I have honed skills in ${data.skills || 'various technologies'}, which directly align with 
                    the needs of your team. I am eager to bring my expertise to your organization and contribute to your ongoing success.
                </p>

                <p style="margin-bottom: 20px;">
                    Thank you for your time and consideration. I have attached my resume for your review and look forward to the possibility 
                    of discussing how my skills and experiences can benefit your team in an interview.
                </p>
            </div>
        `;

        if (selectedTemplate === 'creative') {
            letterHtml = `
                <div class="cv-document creative" id="letter-content">
                    <div class="creative-sidebar">
                        <h2 style="margin: 0; color: #fff; font-size: 1.5rem;">${data.name}</h2>
                        <p style="margin: 10px 0; color: var(--primary-color);">${data.title}</p>
                        <hr style="opacity: 0.2; margin: 20px 0;">
                        <p style="font-size: 0.8rem; opacity: 0.8;">${data.edu}</p>
                        <p style="font-size: 0.8rem; opacity: 0.8; margin-top: 10px;">${data.skills}</p>
                    </div>
                    <div class="creative-main">
                        <p style="margin-bottom: 25px; color: #666;">${date}</p>
                        <p style="margin-bottom: 25px; font-weight: 700;">To the Hiring Manager,</p>
                        ${mainContent}
                        <div style="margin-top: 40px;">
                            <p style="margin: 0;">Sincerely,</p>
                            <p style="margin: 10px 0 0 0; font-weight: 700; font-size: 1.2rem;">${data.name}</p>
                        </div>
                    </div>
                </div>
            `;
        } else {
            letterHtml = `
                <div class="cv-document ${selectedTemplate}" id="letter-content">
                    <div style="margin-bottom: 30px;">
                        <h2 style="margin: 0; color: #111; font-size: 1.8rem;">${data.name}</h2>
                        <p style="margin: 5px 0; color: #666;">${data.title}</p>
                    </div>
                    
                    <div style="margin-bottom: 25px;">
                        <p style="margin: 0;">${date}</p>
                    </div>

                    <div style="margin-bottom: 25px;">
                        <p style="margin: 0; font-weight: 700;">To the Hiring Manager,</p>
                    </div>

                    ${mainContent}

                    <div style="margin-top: 40px;">
                        <p style="margin: 0;">Sincerely,</p>
                        <p style="margin: 10px 0 0 0; font-weight: 700; font-size: 1.2rem;">${data.name}</p>
                    </div>
                </div>
            `;
        }

        // Hide Loader and Render
        setTimeout(() => {
            aiLoader.style.display = 'none';
            previewBody.innerHTML = letterHtml;
            
            Swal.fire({
                icon: 'success',
                title: 'Letter Generated!',
                text: `Your ${selectedTemplate} cover letter is ready.`,
                timer: 3000,
                showConfirmButton: false,
                background: '#1A1A1A',
                color: '#FFF'
            });

            // Scroll to preview on mobile
            if (window.innerWidth < 992) {
                document.getElementById('preview-section').scrollIntoView({ behavior: 'smooth' });
            }
        }, 500);
    });

    // Download PDF
    document.getElementById('download-pdf').addEventListener('click', () => {
        const element = document.getElementById('letter-content');
        if (!element) {
            Swal.fire({ icon: 'error', title: 'Oops...', text: 'Please generate a cover letter first!', background: '#1A1A1A', color: '#FFF' });
            return;
        }
        
        const opt = {
            margin: 0,
            filename: `AI-Cover-Letter-${selectedTemplate}.pdf`,
            image: { type: 'jpeg', quality: 0.98 },
            html2canvas: { scale: 2, useCORS: true },
            jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
        };
        
        html2pdf().set(opt).from(element).save();
    });

    // Download Word
    document.getElementById('download-word').addEventListener('click', () => {
        const content = document.getElementById('letter-content');
        if (!content) {
            Swal.fire({ icon: 'error', title: 'Oops...', text: 'Please generate a cover letter first!', background: '#1A1A1A', color: '#FFF' });
            return;
        }

        const header = "<html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'><head><meta charset='utf-8'><title>Export HTML to Word</title></head><body>";
        const footer = "</body></html>";
        const sourceHTML = header + content.innerHTML + footer;
        
        const source = 'data:application/vnd.ms-word;charset=utf-8,' + encodeURIComponent(sourceHTML);
        const fileDownload = document.createElement("a");
        document.body.appendChild(fileDownload);
        fileDownload.href = source;
        fileDownload.download = `AI-Cover-Letter-${selectedTemplate}.doc`;
        fileDownload.click();
        document.body.removeChild(fileDownload);
    });
});

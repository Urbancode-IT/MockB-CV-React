// Sticky Header on Scroll
const header = document.getElementById('header');

window.addEventListener('scroll', () => {
    if (header) {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    }
});

// Mega Menu Toggle Logic (Shared with Home Page)
const resumeTrigger = document.getElementById('resume-builder-trigger');
const resumeMegaMenu = document.getElementById('resume-mega-menu');
const resumeParent = resumeTrigger ? resumeTrigger.closest('.has-mega-menu') : null;

const langTrigger = document.getElementById('languages-trigger');
const langMegaMenu = document.getElementById('languages-mega-menu');
const langParent = document.getElementById('lang-menu-parent');

const clTrigger = document.getElementById('cover-letter-trigger');
const clMegaMenu = document.getElementById('cover-letter-mega-menu');
const clParent = clTrigger ? clTrigger.closest('.has-mega-menu') : null;

const portfolioTrigger = document.getElementById('portfolio-trigger');
const portfolioMegaMenu = document.getElementById('portfolio-mega-menu');
const portfolioParent = portfolioTrigger ? portfolioTrigger.closest('.has-mega-menu') : null;

function closeAllMegaMenus() {
    if (resumeMegaMenu) resumeMegaMenu.classList.remove('active');
    if (resumeParent) resumeParent.classList.remove('active');
    if (langMegaMenu) langMegaMenu.classList.remove('active');
    if (langParent) langParent.classList.remove('active');
    if (clMegaMenu) clMegaMenu.classList.remove('active');
    if (clParent) clParent.classList.remove('active');
    if (portfolioMegaMenu) portfolioMegaMenu.classList.remove('active');
    if (portfolioParent) portfolioParent.classList.remove('active');
}

if (resumeTrigger && resumeMegaMenu) {
    resumeTrigger.addEventListener('click', (e) => {
        e.stopPropagation();
        const isActive = resumeMegaMenu.classList.contains('active');
        closeAllMegaMenus();
        if (!isActive) {
            resumeMegaMenu.classList.add('active');
            if (resumeParent) resumeParent.classList.add('active');
        }
    });
}

if (langTrigger && langMegaMenu) {
    langTrigger.addEventListener('click', (e) => {
        e.stopPropagation();
        const isActive = langMegaMenu.classList.contains('active');
        closeAllMegaMenus();
        if (!isActive) {
            langMegaMenu.classList.add('active');
            if (langParent) langParent.classList.add('active');
        }
    });
}

if (clTrigger && clMegaMenu) {
    clTrigger.addEventListener('click', (e) => {
        e.stopPropagation();
        const isActive = clMegaMenu.classList.contains('active');
        closeAllMegaMenus();
        if (!isActive) {
            clMegaMenu.classList.add('active');
            if (clParent) clParent.classList.add('active');
        }
    });
}

if (portfolioTrigger && portfolioMegaMenu) {
    portfolioTrigger.addEventListener('click', (e) => {
        e.stopPropagation();
        const isActive = portfolioMegaMenu.classList.contains('active');
        closeAllMegaMenus();
        if (!isActive) {
            portfolioMegaMenu.classList.add('active');
            if (portfolioParent) portfolioParent.classList.add('active');
        }
    });
}

// Close mega menus when clicking outside
document.addEventListener('click', (e) => {
    let clickedInsideMenu = false;
    if (resumeMegaMenu && resumeTrigger && (resumeMegaMenu.contains(e.target) || resumeTrigger.contains(e.target))) clickedInsideMenu = true;
    if (langMegaMenu && langTrigger && (langMegaMenu.contains(e.target) || langTrigger.contains(e.target))) clickedInsideMenu = true;
    if (clMegaMenu && clTrigger && (clMegaMenu.contains(e.target) || clTrigger.contains(e.target))) clickedInsideMenu = true;
    if (portfolioMegaMenu && portfolioTrigger && (portfolioMegaMenu.contains(e.target) || portfolioTrigger.contains(e.target))) clickedInsideMenu = true;
    
    if (!clickedInsideMenu) {
        closeAllMegaMenus();
    }
});

// Close mega menus when pressing Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeAllMegaMenus();
    }
});

/* ========================================================
   Portfolio Templates Showcase Filtering
   ======================================================== */

// Template Data Matrix
const templatesData = [
    // Style-wise Designs
    {
        name: "Creative Glassmorphism",
        category: "styles",
        tag: "Creative Glassmorphic",
        desc: "Stunning overlay cards with blurred backdrop frosted filters, gold glowing outlines, and rich color-blend gradients.",
        icon: "fa-solid fa-wand-magic-sparkles"
    },
    {
        name: "Technical Developer Grid",
        category: "styles",
        tag: "Monospace Tech Grid",
        desc: "Ideal for engineers. Monospace styling details, Git repository indicators, terminal layouts, and structured blocks.",
        icon: "fa-solid fa-code"
    },
    {
        name: "Minimalist Editorial",
        category: "styles",
        tag: "Bold Serif Minimalist",
        desc: "Stripped-back luxury template focusing on crisp serif web typography, generous spacing, and heavy imagery.",
        icon: "fa-solid fa-pen-nib"
    },
    
    // Job Role-wise Designs
    {
        name: "Frontend Engineer Showcase",
        category: "roles",
        tag: "Frontend & UI/UX Developer",
        desc: "Includes native responsive previews, interactive code blocks, CodePen integrations, and real-time animation hooks.",
        icon: "fa-brands fa-html5"
    },
    {
        name: "UI/UX Figma Case Study",
        category: "roles",
        tag: "Product Designer & Research",
        desc: "Bespoke Case Study roadmap grids, user personas slides, interactive iframe Figma prototype windows, and layout testing guides.",
        icon: "fa-brands fa-figma"
    },
    {
        name: "Fullstack System Grid",
        category: "roles",
        tag: "Fullstack & Cloud Architect",
        desc: "Highlights microservices architectures, DB schemas, cloud integration statuses, and API endpoint query logs.",
        icon: "fa-solid fa-database"
    }
];

// Active Category filter
let activeCategory = 'styles';

function renderTemplates(category) {
    const grid = document.getElementById('templates-display-grid');
    if (!grid) return;
    
    grid.innerHTML = '';
    
    const filtered = templatesData.filter(item => item.category === category);
    
    filtered.forEach((item, index) => {
        const card = document.createElement('div');
        card.className = 'template-showcard animate-reveal';
        card.style.animationDelay = `${index * 0.1}s`;
        
        card.innerHTML = `
            <div class="template-preview">
                <div class="preview-overlay">
                    <div class="preview-content">
                        <div class="preview-nav">
                            <span>Portfolio Demo</span>
                            <i class="${item.icon}"></i>
                        </div>
                        <div class="preview-hero">
                            <div class="p-line accent"></div>
                            <div class="p-line"></div>
                        </div>
                        <div class="preview-grid">
                            <div class="preview-box"></div>
                            <div class="preview-box"></div>
                            <div class="preview-box"></div>
                        </div>
                    </div>
                    <a href="configure.html?template=${encodeURIComponent(item.name)}" class="btn btn-primary btn-sm" style="position: absolute; bottom: 20px; z-index: 10;">Select Template</a>
                </div>
                <div class="mock-avatar">
                    <i class="${item.icon}"></i>
                </div>
            </div>
            <div class="template-details">
                <span class="tag">${item.tag}</span>
                <h3>${item.name}</h3>
                <p>${item.desc}</p>
            </div>
        `;
        
        grid.appendChild(card);
    });
}

function filterCategory(category) {
    // Toggle active tab buttons
    const buttons = document.querySelectorAll('.tab-btn');
    buttons.forEach(btn => {
        const onclickAttr = btn.getAttribute('onclick');
        if (onclickAttr && onclickAttr.includes(category)) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });
    
    activeCategory = category;
    renderTemplates(category);
}

// Initial template render on page load
document.addEventListener('DOMContentLoaded', () => {
    if (document.getElementById('templates-display-grid')) {
        renderTemplates('styles');
    }
});

/* ========================================================
   Customizer Mock Panel Interactions
   ======================================================== */
const swatches = document.querySelectorAll('.color-swatches:not(.select-swatches) .swatch');
const showcaseWindow = document.querySelector('.showcase-window');
const mockAvatar = document.querySelector('.mock-avatar');
const mockLogo = document.querySelector('.mock-logo');

if (swatches.length > 0 && showcaseWindow) {
    swatches.forEach(swatch => {
        swatch.addEventListener('click', () => {
            // Remove active class
            swatches.forEach(s => s.classList.remove('active'));
            swatch.classList.add('active');
            
            // Apply respective theme adjustments
            if (swatch.classList.contains('gold')) {
                showcaseWindow.style.boxShadow = '0 40px 100px rgba(0,0,0,0.8), 0 0 50px rgba(238, 195, 12, 0.05)';
                if (mockAvatar) {
                    mockAvatar.style.color = '#EEC30C';
                    mockAvatar.style.background = 'rgba(238, 195, 12, 0.1)';
                    mockAvatar.style.borderColor = 'rgba(238, 195, 12, 0.2)';
                }
                if (mockLogo) mockLogo.style.color = '#EEC30C';
            } else if (swatch.classList.contains('blue')) {
                showcaseWindow.style.boxShadow = '0 40px 100px rgba(0,0,0,0.8), 0 0 50px rgba(42, 130, 230, 0.05)';
                if (mockAvatar) {
                    mockAvatar.style.color = '#2A82E6';
                    mockAvatar.style.background = 'rgba(42, 130, 230, 0.1)';
                    mockAvatar.style.borderColor = 'rgba(42, 130, 230, 0.2)';
                }
                if (mockLogo) mockLogo.style.color = '#2A82E6';
            } else if (swatch.classList.contains('purple')) {
                showcaseWindow.style.boxShadow = '0 40px 100px rgba(0,0,0,0.8), 0 0 50px rgba(155, 81, 224, 0.05)';
                if (mockAvatar) {
                    mockAvatar.style.color = '#9B51E0';
                    mockAvatar.style.background = 'rgba(155, 81, 224, 0.1)';
                    mockAvatar.style.borderColor = 'rgba(155, 81, 224, 0.2)';
                }
                if (mockLogo) mockLogo.style.color = '#9B51E0';
            } else if (swatch.classList.contains('red')) {
                showcaseWindow.style.boxShadow = '0 40px 100px rgba(0,0,0,0.8), 0 0 50px rgba(235, 87, 87, 0.05)';
                if (mockAvatar) {
                    mockAvatar.style.color = '#EB5757';
                    mockAvatar.style.background = 'rgba(235, 87, 87, 0.1)';
                    mockAvatar.style.borderColor = 'rgba(235, 87, 87, 0.2)';
                }
                if (mockLogo) mockLogo.style.color = '#EB5757';
            }
        });
    });
}

/* ========================================================
   Configurator Page Functional Logic
   ======================================================== */
document.addEventListener('DOMContentLoaded', () => {
    const configBody = document.querySelector('.configure-page');
    if (!configBody) return;

    // 1. Get Selected Template from URL params
    const urlParams = new URLSearchParams(window.location.search);
    let selectedTemplate = urlParams.get('template') || 'Creative Glassmorphism';
    
    const viewportTag = document.getElementById('active-viewport-tag');
    if (viewportTag) viewportTag.textContent = selectedTemplate;
    
    // Default theme color
    let selectedTheme = 'gold';

    // 2. Swatches Customizer Selection
    const selectSwatches = document.querySelectorAll('.select-swatches .swatch');
    const previewArea = document.getElementById('viewport-preview-area');
    const previewAvatar = document.getElementById('preview-avatar');
    const previewLogo = document.getElementById('preview-logo');

    selectSwatches.forEach(swatch => {
        swatch.addEventListener('click', () => {
            selectSwatches.forEach(s => s.classList.remove('active'));
            swatch.classList.add('active');
            selectedTheme = swatch.getAttribute('data-color');

            // Apply color to dynamic preview in real time
            applyThemeColor(previewArea, previewAvatar, previewLogo, selectedTheme);
        });
    });

    // Helper to paint live previews
    function applyThemeColor(area, avatar, logo, theme) {
        if (!area) return;
        let colorCode = '#EEC30C';
        let glowCode = 'rgba(238, 195, 12, 0.05)';
        let bgCode = 'rgba(238, 195, 12, 0.1)';
        let borderCode = 'rgba(238, 195, 12, 0.2)';

        if (theme === 'blue') {
            colorCode = '#2A82E6';
            glowCode = 'rgba(42, 130, 230, 0.05)';
            bgCode = 'rgba(42, 130, 230, 0.1)';
            borderCode = 'rgba(42, 130, 230, 0.2)';
        } else if (theme === 'purple') {
            colorCode = '#9B51E0';
            glowCode = 'rgba(155, 81, 224, 0.05)';
            bgCode = 'rgba(155, 81, 224, 0.1)';
            borderCode = 'rgba(155, 81, 224, 0.2)';
        } else if (theme === 'red') {
            colorCode = '#EB5757';
            glowCode = 'rgba(235, 87, 87, 0.05)';
            bgCode = 'rgba(235, 87, 87, 0.1)';
            borderCode = 'rgba(235, 87, 87, 0.2)';
        }

        area.style.boxShadow = `0 20px 50px rgba(0,0,0,0.6), 0 0 40px ${glowCode}`;
        if (avatar) {
            avatar.style.color = colorCode;
            avatar.style.background = bgCode;
            avatar.style.borderColor = borderCode;
            avatar.style.boxShadow = `0 0 20px ${bgCode}`;
        }
        if (logo) logo.style.color = colorCode;
    }

    // 3. Drag & Drop File Upload Area
    const dropZone = document.getElementById('drop-zone');
    const resumeInput = document.getElementById('resume-input');
    const browseBtn = document.getElementById('browse-btn');
    const fileDetails = document.getElementById('file-details');
    const uploadedFileName = document.getElementById('uploaded-file-name');
    const defaultZoneContent = document.querySelector('.dropzone-content');
    const createBtn = document.getElementById('create-portfolio-btn');
    const creationNote = document.getElementById('creation-note');

    let uploadedFile = null;

    if (browseBtn && resumeInput) {
        browseBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            resumeInput.click();
        });
    }

    if (dropZone) {
        dropZone.addEventListener('click', () => {
            resumeInput.click();
        });

        // Drag events
        ['dragenter', 'dragover'].forEach(eventName => {
            dropZone.addEventListener(eventName, (e) => {
                e.preventDefault();
                e.stopPropagation();
                dropZone.classList.add('dragover');
            }, false);
        });

        ['dragleave', 'drop'].forEach(eventName => {
            dropZone.addEventListener(eventName, (e) => {
                e.preventDefault();
                e.stopPropagation();
                dropZone.classList.remove('dragover');
            }, false);
        });

        dropZone.addEventListener('drop', (e) => {
            const dt = e.dataTransfer;
            const files = dt.files;
            if (files.length > 0) {
                handleUploadedFile(files[0]);
            }
        });
    }

    if (resumeInput) {
        resumeInput.addEventListener('change', (e) => {
            if (e.target.files.length > 0) {
                handleUploadedFile(e.target.files[0]);
            }
        });
    }

    function handleUploadedFile(file) {
        uploadedFile = file;
        
        // Hide default upload contents, display success details
        if (defaultZoneContent) defaultZoneContent.classList.add('hidden');
        if (fileDetails) {
            fileDetails.classList.remove('hidden');
            if (uploadedFileName) uploadedFileName.textContent = file.name;
        }

        // Enable generation button
        if (createBtn) {
            createBtn.disabled = false;
            createBtn.style.cursor = 'pointer';
        }
        if (creationNote) {
            creationNote.textContent = "Resume uploaded! Ready to analyze and compile.";
            creationNote.style.color = "#27c93f";
        }
    }

    // 4. Create Portfolio Staggered AI spinner triggers
    if (createBtn) {
        createBtn.addEventListener('click', () => {
            const overlay = document.getElementById('processing-overlay');
            if (!overlay) return;

            overlay.classList.remove('hidden');

            // Stagger steps timings
            setTimeout(() => {
                const step1 = document.getElementById('p-step-1');
                if (step1) {
                    step1.className = 'step-line success';
                    step1.querySelector('i').className = 'fa-solid fa-circle-check';
                }
                const step2 = document.getElementById('p-step-2');
                if (step2) {
                    step2.className = 'step-line active';
                    step2.querySelector('i').className = 'fa-solid fa-circle-notch fa-spin';
                }
            }, 800);

            setTimeout(() => {
                const step2 = document.getElementById('p-step-2');
                if (step2) {
                    step2.className = 'step-line success';
                    step2.querySelector('i').className = 'fa-solid fa-circle-check';
                }
                const step3 = document.getElementById('p-step-3');
                if (step3) {
                    step3.className = 'step-line active';
                    step3.querySelector('i').className = 'fa-solid fa-circle-notch fa-spin';
                }
            }, 1600);

            setTimeout(() => {
                const step3 = document.getElementById('p-step-3');
                if (step3) {
                    step3.className = 'step-line success';
                    step3.querySelector('i').className = 'fa-solid fa-circle-check';
                }
                const step4 = document.getElementById('p-step-4');
                if (step4) {
                    step4.className = 'step-line active';
                    step4.querySelector('i').className = 'fa-solid fa-circle-notch fa-spin';
                }
            }, 2400);

            setTimeout(() => {
                const step4 = document.getElementById('p-step-4');
                if (step4) {
                    step4.className = 'step-line success';
                    step4.querySelector('i').className = 'fa-solid fa-circle-check';
                }

                // Parse user name dynamically from uploaded file
                let rawName = "Alex Carter";
                if (uploadedFile) {
                    // Extract potential name from filename structure
                    const cleaned = uploadedFile.name.replace(/\.[^/.]+$/, "").replace(/[-_]/g, " ");
                    const words = cleaned.split(" ");
                    if (words.length > 0 && !words[0].toLowerCase().includes("resume")) {
                        rawName = words.map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(" ");
                    }
                }

                // Save configurations locally inside SessionStorage to populate output page
                sessionStorage.setItem('selectedTemplate', selectedTemplate);
                sessionStorage.setItem('selectedTheme', selectedTheme);
                sessionStorage.setItem('userName', rawName);

                // Redirect to separate output page
                window.location.href = "output.html";
            }, 3200);
        });
    }
});

/* ========================================================
   Output Page Functional Display & Export Downloads
   ======================================================== */
document.addEventListener('DOMContentLoaded', () => {
    const outputBody = document.querySelector('.output-page');
    if (!outputBody) return;

    // Load configs from SessionStorage
    const template = sessionStorage.getItem('selectedTemplate') || 'Creative Glassmorphism';
    const theme = sessionStorage.getItem('selectedTheme') || 'gold';
    const name = sessionStorage.getItem('userName') || 'Alex Carter';

    // Populate selected template label
    const tagLabel = document.getElementById('output-viewport-tag');
    if (tagLabel) tagLabel.textContent = template;

    // Populate user specific details
    const userNameHeader = document.getElementById('output-user-name');
    const logoHeader = document.getElementById('output-logo');
    if (userNameHeader) userNameHeader.textContent = name;
    if (logoHeader) logoHeader.textContent = `${name.split(" ")[0]}'s Portfolio`;

    // Apply color accents
    const previewArea = document.getElementById('output-preview-area');
    const previewAvatar = document.getElementById('output-avatar');
    const subdomainInput = document.getElementById('subdomain-url-input');

    if (previewArea) {
        let colorCode = '#EEC30C';
        let glowCode = 'rgba(238, 195, 12, 0.05)';
        let bgCode = 'rgba(238, 195, 12, 0.1)';
        let borderCode = 'rgba(238, 195, 12, 0.2)';

        if (theme === 'blue') {
            colorCode = '#2A82E6';
            glowCode = 'rgba(42, 130, 230, 0.05)';
            bgCode = 'rgba(42, 130, 230, 0.1)';
            borderCode = 'rgba(42, 130, 230, 0.2)';
        } else if (theme === 'purple') {
            colorCode = '#9B51E0';
            glowCode = 'rgba(155, 81, 224, 0.05)';
            bgCode = 'rgba(155, 81, 224, 0.1)';
            borderCode = 'rgba(155, 81, 224, 0.2)';
        } else if (theme === 'red') {
            colorCode = '#EB5757';
            glowCode = 'rgba(235, 87, 87, 0.05)';
            bgCode = 'rgba(235, 87, 87, 0.1)';
            borderCode = 'rgba(235, 87, 87, 0.2)';
        }

        previewArea.style.boxShadow = `0 20px 50px rgba(0,0,0,0.6), 0 0 40px ${glowCode}`;
        if (previewAvatar) {
            previewAvatar.style.color = colorCode;
            previewAvatar.style.background = bgCode;
            previewAvatar.style.borderColor = borderCode;
            previewAvatar.style.boxShadow = `0 0 20px ${bgCode}`;
        }
        if (logoHeader) logoHeader.style.color = colorCode;
    }

    // Set subdomain URL slug
    if (subdomainInput) {
        const slug = name.toLowerCase().replace(/[^a-z0-9]/g, "-");
        subdomainInput.value = `https://mockb.cv/${slug}`;
    }

    // Setup Back Navigation adjustment link parameters
    const backBtn = document.getElementById('output-back-btn');
    if (backBtn) {
        backBtn.href = `configure.html?template=${encodeURIComponent(template)}`;
    }
});

// URL Copy Utility
function copySubdomainUrl() {
    const input = document.getElementById('subdomain-url-input');
    const copyBtn = document.getElementById('copy-url-btn');
    if (input) {
        input.select();
        input.setSelectionRange(0, 99999);
        navigator.clipboard.writeText(input.value);

        if (copyBtn) {
            copyBtn.innerHTML = `<i class="fa-solid fa-check"></i> Copied!`;
            setTimeout(() => {
                copyBtn.innerHTML = `<i class="fa-solid fa-copy"></i> Copy`;
            }, 1500);
        }
    }
}

// Download Compiler simulated triggering
function triggerDownload(type) {
    const modal = document.getElementById('download-alert');
    const modalText = document.getElementById('download-alert-text');
    if (!modal) return;

    modal.classList.remove('hidden');
    if (modalText) {
        modalText.textContent = type === 'pdf' 
            ? "Compiling high-definition printable layout margins and pages..." 
            : "Generating styled Microsoft Word XML document elements...";
    }

    setTimeout(() => {
        modal.classList.add('hidden');
        
        // Execute real text file download via local Blob compiling
        const name = sessionStorage.getItem('userName') || 'Alex Carter';
        const template = sessionStorage.getItem('selectedTemplate') || 'Creative Glassmorphism';
        const theme = sessionStorage.getItem('selectedTheme') || 'gold';

        let fileContent = `========================================================
MockB CV Premium Web Portfolio Asset Document
Generated on: ${new Date().toLocaleDateString()}
========================================================

Owner: ${name}
Design Layout: ${template}
Color Theme Accent: ${theme}
Subdomain: https://mockb.cv/${name.toLowerCase().replace(/[^a-z0-9]/g, "-")}

--------------------------------------------------------
CORE PORTFOLIO MARKUP & CONTENT DETAILS
--------------------------------------------------------

1. Header navigation links: About, Projects, Experience, Contact.
2. Introduction: "Hi, I am ${name}, a professional developer passionate about designing premium interactive applications."
3. Highlighted Projects:
   - AI Automation Agent: Engineered custom LLM integration dashboard frameworks.
   - Real-time Interface Portal: Frosted glass web components optimized for fast user triggers.
4. Professional Work Milestones:
   - Senior Developer (2024 - Present): Managing system design pipelines and cloud endpoints.

This document represents the structural backup of your MockB personal web hosting spaces. Use it to print or edit offline files.`;

        const blob = new Blob([fileContent], { type: 'text/plain;charset=utf-8' });
        const element = document.createElement('a');
        element.href = URL.createObjectURL(blob);
        
        const safeName = name.replace(/\s+/g, "_");
        element.download = type === 'pdf' 
            ? `MockB_Portfolio_${safeName}.pdf` 
            : `MockB_Portfolio_${safeName}.docx`;
            
        document.body.appendChild(element);
        element.click();
        document.body.removeChild(element);
    }, 1800);
}

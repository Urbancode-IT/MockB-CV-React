
        // Core state data
        let resumeData = {
            name: "Your name",
            role: "Profession/Role",
            email: "email@example.com",
            phone: "Phone",
            address: "Address",
            photo: "",
            sections: []
        };

        const defaultIconsList = [
            { cls: 'fa-solid fa-award' },
            { cls: 'fa-solid fa-file-invoice' },
            { cls: 'fa-solid fa-book' },
            { cls: 'fa-solid fa-graduation-cap' },
            { cls: 'fa-solid fa-guitar' },
            { cls: 'fa-solid fa-globe' },
            { cls: 'fa-solid fa-house' },
            { cls: 'fa-solid fa-briefcase' },
            { cls: 'fa-solid fa-address-card' },
            { cls: 'fa-solid fa-folder' },
            { cls: 'fa-solid fa-phone' },
            { cls: 'fa-solid fa-share-nodes' },
            { cls: 'fa-solid fa-brain' },
            { cls: 'fa-solid fa-puzzle-piece' },
            { cls: 'fa-solid fa-pen' }
        ];

        const moreIconsList = [
            { cls: 'fa-solid fa-arrow-pointer' },
            { cls: 'fa-solid fa-expand' },
            { cls: 'fa-solid fa-circle-nodes' },
            { cls: 'fa-solid fa-compass' },
            { cls: 'fa-solid fa-bicycle' },
            { cls: 'fa-solid fa-binoculars' },
            { cls: 'fa-solid fa-code' },
            { cls: 'fa-solid fa-microchip' },
            { cls: 'fa-solid fa-users' },
            { cls: 'fa-solid fa-hotel' },
            { cls: 'fa-solid fa-building' },
            { cls: 'fa-solid fa-video' },
            { cls: 'fa-solid fa-camera' },
            { cls: 'fa-solid fa-tent' },
            { cls: 'fa-solid fa-car' },
            { cls: 'fa-solid fa-chart-line' },
            { cls: 'fa-solid fa-chart-pie' },
            { cls: 'fa-solid fa-chalkboard-user' },
            { cls: 'fa-solid fa-chart-simple' },
            { cls: 'fa-solid fa-check' },
            { cls: 'fa-solid fa-chess-queen' },
            { cls: 'fa-solid fa-user' },
            { cls: 'fa-solid fa-terminal' },
            { cls: 'fa-solid fa-fire' },
            { cls: 'fa-solid fa-comment' },
            { cls: 'fa-solid fa-circle-info' },
            { cls: 'fa-solid fa-cubes' },
            { cls: 'fa-solid fa-hourglass' },
            { cls: 'fa-solid fa-droplet' },
            { cls: 'fa-solid fa-dumbbell' },
            { cls: 'fa-solid fa-earth-americas' },
            { cls: 'fa-solid fa-gear' },
            { cls: 'fa-solid fa-film' },
            { cls: 'fa-solid fa-flag' },
            { cls: 'fa-solid fa-flask' },
            { cls: 'fa-solid fa-gamepad' },
            { cls: 'fa-solid fa-globe-asia' },
            { cls: 'fa-solid fa-hammer' },
            { cls: 'fa-solid fa-hand-holding-heart' },
            { cls: 'fa-solid fa-seedling' },
            { cls: 'fa-solid fa-heart' },
            { cls: 'fa-solid fa-hands-clapping' },
            { cls: 'fa-solid fa-hashtag' },
            { cls: 'fa-regular fa-heart' },
            { cls: 'fa-solid fa-marker' },
            { cls: 'fa-solid fa-percent' },
            { cls: 'fa-solid fa-industry' },
            { cls: 'fa-solid fa-infinity' },
            { cls: 'fa-solid fa-keyboard' },
            { cls: 'fa-solid fa-key' },
            { cls: 'fa-solid fa-landmark' },
            { cls: 'fa-solid fa-arrow-down-a-z' },
            { cls: 'fa-solid fa-code-compare' },
            { cls: 'fa-solid fa-desktop' },
            { cls: 'fa-solid fa-laptop' },
            { cls: 'fa-solid fa-lightbulb' },
            { cls: 'fa-solid fa-cpu' },
            { cls: 'fa-solid fa-microphone' },
            { cls: 'fa-solid fa-microscope' },
            { cls: 'fa-solid fa-mountain' },
            { cls: 'fa-solid fa-mug-hot' },
            { cls: 'fa-solid fa-music' },
            { cls: 'fa-solid fa-paintbrush' },
            { cls: 'fa-solid fa-palette' },
            { cls: 'fa-solid fa-pen-ruler' },
            { cls: 'fa-solid fa-motorcycle' },
            { cls: 'fa-solid fa-person-running' },
            { cls: 'fa-solid fa-person-swimming' },
            { cls: 'fa-solid fa-plane' },
            { cls: 'fa-solid fa-rocket' },
            { cls: 'fa-solid fa-scale-balanced' },
            { cls: 'fa-solid fa-leaf' },
            { cls: 'fa-solid fa-signature' },
            { cls: 'fa-solid fa-wand-magic-sparkles' },
            { cls: 'fa-solid fa-spa' },
            { cls: 'fa-solid fa-calculator' },
            { cls: 'fa-solid fa-star' },
            { cls: 'fa-solid fa-telescope' },
            { cls: 'fa-solid fa-route' },
            { cls: 'fa-solid fa-trophy' },
            { cls: 'fa-solid fa-shield-halved' },
            { cls: 'fa-solid fa-vial' }
        ];

        // History Undo/Redo Stacks
        let historyStack = [];
        let historyIndex = -1;

        // Initialize App
        window.addEventListener('DOMContentLoaded', () => {
            saveHistoryState();
            renderAll();
        });

        function saveHistoryState() {
            // Save state copy
            if (historyIndex < historyStack.length - 1) {
                historyStack = historyStack.slice(0, historyIndex + 1);
            }
            historyStack.push(JSON.stringify(resumeData));
            historyIndex++;
            updateHistoryButtons();
        }

        function updateHistoryButtons() {
            document.getElementById('undoBtn').disabled = (historyIndex <= 0);
            document.getElementById('redoBtn').disabled = (historyIndex >= historyStack.length - 1);
        }

        function undo() {
            if (historyIndex > 0) {
                historyIndex--;
                resumeData = JSON.parse(historyStack[historyIndex]);
                renderAll();
                updateHistoryButtons();
            }
        }

        function redo() {
            if (historyIndex < historyStack.length - 1) {
                historyIndex++;
                resumeData = JSON.parse(historyStack[historyIndex]);
                renderAll();
                updateHistoryButtons();
            }
        }

        // Tab Switching Logic
        function switchTab(tabId) {
            document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
            document.querySelectorAll('.tab-content').forEach(content => content.classList.remove('show'));
            
            // Activate button
            const activeBtn = Array.from(document.querySelectorAll('.tab-btn')).find(btn => (btn.innerText || btn.textContent || '').toLowerCase().includes(tabId));
            if (activeBtn) activeBtn.classList.add('active');
            
            // Activate content
            const contentPanel = document.getElementById('tab-' + tabId);
            if (contentPanel) contentPanel.classList.add('show');

            // Tab-specific side effects
            if (tabId === 'rearrange') renderRearrangeTab();
        }

        // Accordion toggle
        function toggleAccordion(trigger) {
            const content = trigger.classList && (trigger.classList.contains('customize-content') || trigger.classList.contains('section-body-wrapper')) ? trigger : trigger.nextElementSibling;
            const chevron = trigger === content ? trigger.previousElementSibling?.querySelector('i') : trigger.querySelector('i');
            if (getComputedStyle(content).display === 'none') {
                content.style.display = 'flex';
                if (chevron) chevron.style.transform = 'rotate(180deg)';
            } else {
                content.style.display = 'none';
                if (chevron) chevron.style.transform = 'rotate(0deg)';
            }
        }

        // Add Content Modal Toggle
        function toggleModal(show) {
            const modal = document.getElementById('addContentModal');
            if (show) {
                modal.classList.add('show');
            } else {
                modal.classList.remove('show');
            }
        }

        // Photo Upload Handling
        function handlePhotoUpload(event) {
            const file = event.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = function(e) {
                    resumeData.photo = e.target.result;
                    document.getElementById('photoPreview').src = e.target.result;
                    document.getElementById('photoPreview').style.display = 'block';
                    document.getElementById('cameraIcon').style.display = 'none';
                    toggleCustomizationPanels();
                    saveHistoryState();
                    renderAll();
                    openManagePhotoModal();
                };
                reader.readAsDataURL(file);
            }
        }

        let photoZoom = 1;
        let photoPanX = 0;
        let photoPanY = 0;
        let isDraggingPhoto = false;
        let startDragX = 0, startDragY = 0;

        function updatePhotoTransform() {
            const img = document.getElementById('manage-photo-img');
            img.style.transform = `translate(${photoPanX}px, ${photoPanY}px) scale(${photoZoom})`;
        }

        function initPhotoDrag() {
            const img = document.getElementById('manage-photo-img');
            img.addEventListener('mousedown', function(e) {
                e.preventDefault();
                isDraggingPhoto = true;
                startDragX = e.clientX - photoPanX;
                startDragY = e.clientY - photoPanY;
                img.style.cursor = 'grabbing';
            });
            window.addEventListener('mousemove', function(e) {
                if (!isDraggingPhoto) return;
                photoPanX = e.clientX - startDragX;
                photoPanY = e.clientY - startDragY;
                updatePhotoTransform();
            });
            window.addEventListener('mouseup', function() {
                if (isDraggingPhoto) {
                    isDraggingPhoto = false;
                    img.style.cursor = 'grab';
                }
            });
        }
        document.addEventListener('DOMContentLoaded', initPhotoDrag);

        function openManagePhotoModal() {
            if (!resumeData.photo) return;
            const modal = document.getElementById('manage-photo-modal');
            const img = document.getElementById('manage-photo-img');
            img.src = resumeData.photo;
            document.getElementById('photo-zoom-slider').value = 100;
            photoZoom = 1;
            photoPanX = 0;
            photoPanY = 0;
            updatePhotoTransform();
            modal.style.display = 'flex';
        }

        function closeManagePhotoModal() {
            document.getElementById('manage-photo-modal').style.display = 'none';
        }

        function zoomManagePhoto(val) {
            photoZoom = val / 100;
            updatePhotoTransform();
        }

        function saveManagePhoto() {
            closeManagePhotoModal();
        }

        function triggerReplacePhoto() {
            closeManagePhotoModal();
            document.getElementById('profilePhotoInput').click();
        }

        function deletePhoto() {
            resumeData.photo = '';
            document.getElementById('photoPreview').style.display = 'none';
            document.getElementById('cameraIcon').style.display = 'flex';
            document.getElementById('profilePhotoInput').value = '';
            toggleCustomizationPanels();
            closeManagePhotoModal();
            renderAll();
        }

        function applyPhotoSettings() {
            const show = document.getElementById('photo-show').checked;
            const grayscale = document.getElementById('photo-grayscale').checked;
            resumeData.photoShow = show;
            resumeData.photoGrayscale = grayscale;
            renderAll();
        }


        function setPhotoPosition(pos, btn) {
            resumeData.photoPosition = pos;
            if (btn) {
                const parent = btn.parentElement;
                Array.from(parent.children).forEach(c => c.classList.remove('active'));
                btn.classList.add('active');
            }
            renderAll();
        }

        function setPhotoSize(size, btn) {
            resumeData.photoSize = size;
            if (btn) {
                const parent = btn.parentElement;
                Array.from(parent.children).forEach(c => c.classList.remove('active'));
                btn.classList.add('active');
            }
            renderAll();
        }

        function setPhotoShape(shape, btn) {
            resumeData.photoShape = shape;
            const shapeRadii = { circle: '50%', square: '4px', roundsm: '8px', roundlg: '14px', squarefull: '0px' };
            if (btn) {
                const parent = btn.parentElement;
                Array.from(parent.children).forEach(c => c.classList.remove('active'));
                btn.classList.add('active');
            }
            const overlay = document.getElementById('manage-photo-overlay');
            if (overlay) { const circle = overlay.querySelector('div'); if (circle) circle.style.borderRadius = shapeRadii[shape] || '50%'; }
            syncModalShapeButtons(shape);
            renderAll();
        }

        function setPhotoShapeModal(shape) {
            resumeData.photoShape = shape;
            const shapeRadii = { circle: '50%', square: '4px', roundsm: '8px', roundlg: '14px', squarefull: '0px' };
            ['circle','square','roundsm','roundlg','squarefull'].forEach(s => {
                const b = document.getElementById('mpshape-' + s);
                if (b) { b.style.borderColor = s === shape ? '#a881af' : '#ddd'; b.style.background = s === shape ? '#f4eeff' : '#fff'; }
            });
            const overlay = document.getElementById('manage-photo-overlay');
            if (overlay) { const circle = overlay.querySelector('div'); if (circle) circle.style.borderRadius = shapeRadii[shape] || '50%'; }
            syncPanelShapeButtons(shape);
            renderAll();
        }

        function syncModalShapeButtons(shape) {
            ['circle','square','roundsm','roundlg','squarefull'].forEach(s => {
                const b = document.getElementById('mpshape-' + s);
                if (b) { b.style.borderColor = s === shape ? '#a881af' : '#ddd'; b.style.background = s === shape ? '#f4eeff' : '#fff'; }
            });
        }

        function syncPanelShapeButtons(shape) {
            ['circle','square','roundsm','roundlg','squarefull'].forEach(s => {
                const b = document.getElementById('photo-shape-' + s);
                if (b) {
                    if (s === shape) b.classList.add('active');
                    else b.classList.remove('active');
                }
            });
        }

        // Update single fields in real time
        function updateField(key, value) {
            resumeData[key] = value;
            
            // Update preview directly
            const sheetField = document.getElementById('sheet-' + key);
            if (sheetField) {
                if (key === 'email') {
                    sheetField.innerHTML = `<i class="fa-solid fa-envelope" style="margin-right:4px;"></i> ` + value;
                } else if (key === 'phone') {
                    sheetField.innerHTML = `<i class="fa-solid fa-phone" style="margin-right:4px;"></i> ` + value;
                } else if (key === 'address') {
                    sheetField.innerHTML = `<i class="fa-solid fa-location-dot" style="margin-right:4px;"></i> ` + value;
                } else {
                    sheetField.innerText = value;
                }
            }
        }

        // Add dynamic content section
        function addSection(type) {
            const titlesMap = {
                summary: "Summary",
                education: "Education",
                experience: "Professional Experience",
                skills: "Skills",
                languages: "Languages",
                certificates: "Certificates",
                interests: "Interests",
                projects: "Projects",
                courses: "Courses",
                awards: "Awards",
                organisations: "Organisations",
                publications: "Publications",
                references: "References",
                declaration: "Declaration",
                custom: "Custom Section"
            };

            let newSection = {
                id: type + '_' + Date.now(),
                type: type,
                title: titlesMap[type] || "New Section"
            };

            // Custom specific model setups
            if (type === 'summary') {
                newSection.content = "Write a paragraph summarizing your profile.";
            } else if (type === 'skills') {
                newSection.items = [{ name: "", desc: "", level: "" }];
            } else if (type === 'languages') {
                newSection.items = [{ name: "", desc: "", level: "" }];
            } else if (type === 'certificates') {
                newSection.items = [{ name: "", desc: "" }];
            } else if (type === 'interests') {
                newSection.items = [{ name: "", desc: "" }];
            } else if (type === 'courses') {
                newSection.items = [{ name: "", institution: "", dateRange: "", location: "", desc: "" }];
            } else if (type === 'awards') {
                newSection.items = [{ name: "", issuer: "", day: "", month: "", year: "", desc: "" }];
            } else if (type === 'organisations') {
                newSection.items = [{ name: "", position: "", dateRange: "", location: "", desc: "" }];
            } else if (type === 'publications') {
                newSection.items = [{ name: "", publisher: "", day: "", month: "", year: "", desc: "" }];
            } else if (type === 'references') {
                newSection.items = [{ name: "", role: "", organization: "", email: "", phone: "" }];
            } else if (type === 'declaration') {
                newSection.items = [{ desc: "", signature: "", name: "", location: "", dateRange: "" }];
            } else if (type === 'custom' || type === 'customs') {
                newSection.items = [{ name: "", role: "", dateRange: "", location: "", desc: "" }];
            } else {
                newSection.items = [{ name: "", desc: "" }];
            }

            resumeData.sections.push(newSection);
            saveHistoryState();
            renderAll();
            toggleModal(false);
        }

        // Delete section
        function deleteSection(id) {
            resumeData.sections = resumeData.sections.filter(sec => sec.id !== id);
            saveHistoryState();
            renderAll();
        }

        // Add sub entry inside section
        function addSectionEntry(sectionId) {
            const section = resumeData.sections.find(s => s.id === sectionId);
            if (!section) return;

            if (section.type === 'education' || section.type === 'experience' || section.type === 'projects') {
                section.items.push({ title: "", role: "", dateRange: "", location: "", desc: "" });
                section.editMode = section.items.length - 1;
            } else if (section.type === 'skills' || section.type === 'languages') {
                section.items.push({ name: "", desc: "", level: "" });
                section.editMode = section.items.length - 1;
            } else if (section.type === 'certificates' || section.type === 'interests') {
                section.items.push({ name: "", desc: "" });
                section.editMode = section.items.length - 1;
            } else if (section.type === 'courses') {
                section.items.push({ name: "", institution: "", dateRange: "", location: "", desc: "" });
                section.editMode = section.items.length - 1;
            } else if (section.type === 'awards') {
                section.items.push({ name: "", issuer: "", day: "", month: "", year: "", desc: "" });
                section.editMode = section.items.length - 1;
            } else if (section.type === 'organisations') {
                section.items.push({ name: "", position: "", dateRange: "", location: "", desc: "" });
                section.editMode = section.items.length - 1;
            } else if (section.type === 'publications') {
                section.items.push({ name: "", publisher: "", day: "", month: "", year: "", desc: "" });
                section.editMode = section.items.length - 1;
            } else if (section.type === 'references') {
                section.items.push({ name: "", role: "", organization: "", email: "", phone: "" });
                section.editMode = section.items.length - 1;
            } else if (section.type === 'declaration') {
                section.items.push({ desc: "", signature: "", name: "", location: "", dateRange: "" });
                section.editMode = section.items.length - 1;
            } else if (section.type === 'custom' || section.type === 'customs') {
                section.items.push({ name: "", role: "", dateRange: "", location: "", desc: "" });
                section.editMode = section.items.length - 1;
            } else {
                if (!section.items) section.items = [];
                section.items.push({ name: "", desc: "" });
                section.editMode = section.items.length - 1;
            }

            saveHistoryState();
            renderAll();
        }

        // Remove sub entry inside section
        function deleteSectionEntry(sectionId, index) {
            const section = resumeData.sections.find(s => s.id === sectionId);
            if (section && section.items) {
                section.items.splice(index, 1);
                saveHistoryState();
                renderAll();
            }
        }

        // --- Templates Sidebar Filters ---
        function setActivePill(btn, filter) {
            document.querySelectorAll('#tab-templates .rt-filter-pill').forEach(b => {
                b.classList.remove('active');
                b.style.border = '1px solid #444';
                b.style.background = 'transparent';
                b.style.color = '#ccc';
            });
            btn.classList.add('active');
            btn.style.border = '1px solid #EEC30C';
            btn.style.background = 'rgba(238,195,12,0.1)';
            btn.style.color = '#EEC30C';
            
            // If "All" is clicked, reset selectors & toggles
            if (filter === 'all') {
                document.getElementById('select-sb-styles').value = 'all';
                document.getElementById('select-sb-layout').value = 'all';
                document.getElementById('select-sb-experience').value = 'all';
                document.getElementById('select-sb-format').value = 'all';
                
                document.querySelectorAll('#tab-templates .color-sb-btn').forEach(b => b.classList.remove('active'));
                const colorAll = document.getElementById('color-sb-all');
                if (colorAll) colorAll.classList.add('active');
                
                document.querySelectorAll('#tab-templates .photo-sb-btn').forEach(b => b.classList.remove('active'));
                const photoAll = document.querySelector('#tab-templates .photo-sb-btn[data-photo="all"]');
                if (photoAll) {
                    photoAll.classList.add('active');
                    photoAll.style.background = '#EEC30C';
                    photoAll.style.color = '#000';
                    photoAll.style.fontWeight = 'bold';
                }
                
                document.querySelectorAll('#tab-templates .cols-sb-btn').forEach(b => b.classList.remove('active'));
                const colsAll = document.querySelector('#tab-templates .cols-sb-btn[data-cols="all"]');
                if (colsAll) {
                    colsAll.classList.add('active');
                    colsAll.style.background = '#EEC30C';
                    colsAll.style.color = '#000';
                    colsAll.style.fontWeight = 'bold';
                }
            }
            filterSidebarTemplates();
        }

        function setActiveColor(btn) {
            document.querySelectorAll('#tab-templates .color-sb-btn').forEach(b => {
                b.classList.remove('active');
                b.style.transform = 'scale(1)';
                b.style.boxShadow = 'none';
            });
            btn.classList.add('active');
            if (btn.id !== 'color-sb-all') {
                btn.style.transform = 'scale(1.2)';
                btn.style.boxShadow = '0 0 0 2px #111, 0 0 0 4px #EEC30C';
            } else {
                btn.style.border = '1px solid #EEC30C';
            }
            filterSidebarTemplates();
        }

        function setActiveToggle(btn, type) {
            const selector = type === 'photo' ? '.photo-sb-btn' : '.cols-sb-btn';
            document.querySelectorAll(`#tab-templates ${selector}`).forEach(b => {
                b.classList.remove('active');
                b.style.background = 'transparent';
                b.style.color = '#888';
                b.style.fontWeight = 'normal';
            });
            btn.classList.add('active');
            btn.style.background = '#EEC30C';
            btn.style.color = '#000';
            btn.style.fontWeight = 'bold';
            filterSidebarTemplates();
        }

        function filterSidebarTemplates() {
            let activeFilters = [];

            // Check top pills
            const activeTopPill = document.querySelector('#tab-templates .rt-filter-pill.active');
            if (activeTopPill && activeTopPill.getAttribute('data-filter') !== 'all') {
                activeFilters.push(activeTopPill.getAttribute('data-filter').toLowerCase());
            }

            // Check selects
            const styleVal = document.getElementById('select-sb-styles').value;
            if (styleVal !== 'all') activeFilters.push(styleVal);

            const layoutVal = document.getElementById('select-sb-layout').value;
            if (layoutVal !== 'all') activeFilters.push(layoutVal);

            const expVal = document.getElementById('select-sb-experience').value;
            if (expVal !== 'all') activeFilters.push(expVal);

            const formatVal = document.getElementById('select-sb-format').value;
            if (formatVal !== 'all') activeFilters.push(formatVal);

            // Check Color
            const activeColor = document.querySelector('#tab-templates .color-sb-btn.active');
            if (activeColor && activeColor.getAttribute('data-color') !== 'all') {
                activeFilters.push(activeColor.getAttribute('data-color').toLowerCase());
            }

            // Check Photo
            const activePhoto = document.querySelector('#tab-templates .photo-sb-btn.active');
            if (activePhoto && activePhoto.getAttribute('data-photo') !== 'all') {
                activeFilters.push(activePhoto.getAttribute('data-photo').toLowerCase());
            }

            // Check Cols
            const activeCol = document.querySelector('#tab-templates .cols-sb-btn.active');
            if (activeCol && activeCol.getAttribute('data-cols') !== 'all') {
                activeFilters.push(activeCol.getAttribute('data-cols').toLowerCase());
            }

            // Apply filter to cards
            document.querySelectorAll('#sidebar-templates-grid .template-card-mini').forEach(card => {
                const tagsAttr = card.getAttribute('data-tags') || '';
                const cardText = (card.innerText + " " + tagsAttr).toLowerCase();
                let isMatch = true;

                for (let filter of activeFilters) {
                    if (!cardText.includes(filter)) {
                        isMatch = false;
                        break;
                    }
                }

                if (isMatch) {
                    card.style.display = 'flex';
                } else {
                    card.style.display = 'none';
                }
            });
        }

        function previewTemplateImg(src, event) {
            if (event) event.stopPropagation();
            let modal = document.getElementById('sidebar-preview-modal');
            if (!modal) {
                const modalHTML = `
                <div id="sidebar-preview-modal" style="display:none; position:fixed; inset:0; z-index:10000; background:rgba(0,0,0,0.85); align-items:center; justify-content:center;" onclick="this.style.display='none'">
                    <div style="position:relative; max-width:90%; max-height:90%; background:#1a1a2e; padding:15px; border-radius:12px; border:1px solid #333;" onclick="event.stopPropagation()">
                        <span style="position:absolute; top:-35px; right:0; color:#fff; font-size:30px; font-weight:bold; cursor:pointer;" onclick="document.getElementById('sidebar-preview-modal').style.display='none'">&times;</span>
                        <img id="sidebar-preview-image" src="" alt="Template Preview" style="max-width:100%; max-height:80vh; object-fit:contain; display:block; border-radius:6px;">
                    </div>
                </div>`;
                document.body.insertAdjacentHTML('beforeend', modalHTML);
                modal = document.getElementById('sidebar-preview-modal');
            }
            document.getElementById('sidebar-preview-image').src = src;
            modal.style.display = 'flex';
        }

        function toggleSectionCollapse(id) {
            const sec = resumeData.sections.find(s => s.id === id);
            if(sec) {
                sec.isCollapsed = !sec.isCollapsed;
                renderAll();
            }
        }
        function toggleSectionCustomizations(id) {
            const sec = resumeData.sections.find(s => s.id === id);
            if(sec) {
                sec.customizationsOpen = !sec.customizationsOpen;
                renderAll();
            }
        }
        function updateSectionCustomization(id, key, value, isCheckbox) {
            const sec = resumeData.sections.find(s => s.id === id);
            if(sec) {
                if(!sec.customizations) sec.customizations = {};
                if(isCheckbox) {
                    sec.customizations[key] = value;
                } else {
                    sec.customizations[key] = value;
                }
                debounceUpdatePreview();
                renderAll();
            }
        }

        // Update values inside sections
        function updateSectionValue(sectionId, index, key, value) {
            const section = resumeData.sections.find(s => s.id === sectionId);
            if (!section) return;

            if (section.type === 'summary') {
                section.content = value;
            } else if (section.type === 'skills') {
                section.items[index] = value;
            } else {
                if (!section.items) section.items = [];
                if (!section.items[index]) section.items[index] = {};
                section.items[index][key] = value;
            }

            // Simple update to avoid full reload loops
            debounceUpdatePreview();
        }

        // Debouncer for typing
        let debounceTimer;
        function debounceUpdatePreview() {
            clearTimeout(debounceTimer);
            debounceTimer = setTimeout(() => {
                renderPreviewSheet();
            }, 300);
        }

        // Render entire UI
        function renderAll() {
            renderEditorCards();
            renderPreviewSheet();
            renderCustomizeSectionLayout();
        }

        function toggleSectionMode(sectionId, mode) {
            const section = resumeData.sections.find(s => s.id === sectionId);
            if (section) {
                section.editMode = mode;
                renderEditorCards();
            }
        }

        function toggleEntryVisibility(sectionId, index) {
            const section = resumeData.sections.find(s => s.id === sectionId);
            if (!section) return;
            if (index === 'summary') {
                section.hidden = !section.hidden;
            } else {
                if (section.items && section.items[index]) {
                    section.items[index].hidden = !section.items[index].hidden;
                }
            }
            saveHistoryState();
            renderAll();
        }

        function getDefaultSectionIconClass(type) {
            const iconMap = {
                summary: 'fa-solid fa-user',
                education: 'fa-solid fa-graduation-cap',
                experience: 'fa-solid fa-briefcase',
                skills: 'fa-solid fa-layer-group',
                languages: 'fa-solid fa-language',
                certificates: 'fa-solid fa-file-lines',
                interests: 'fa-solid fa-heart',
                projects: 'fa-solid fa-diagram-project',
                courses: 'fa-solid fa-book-open',
                awards: 'fa-solid fa-trophy',
                organisations: 'fa-solid fa-building',
                publications: 'fa-solid fa-newspaper',
                references: 'fa-solid fa-users',
                declaration: 'fa-solid fa-file-signature',
                custom: 'fa-solid fa-star'
            };
            return iconMap[type] || 'fa-solid fa-circle-dot';
        }

        function toggleIconPicker(sectionId) {
            const section = resumeData.sections.find(s => s.id === sectionId);
            if (section) {
                section.iconPickerOpen = !section.iconPickerOpen;
                renderEditorCards();
            }
        }

        function selectSectionIcon(sectionId, iconCls) {
            const section = resumeData.sections.find(s => s.id === sectionId);
            if (section) {
                section.icon = iconCls;
                section.iconPickerOpen = false;
                saveHistoryState();
                renderAll();
            }
        }

        function toggleSectionIconVisibility(sectionId) {
            const section = resumeData.sections.find(s => s.id === sectionId);
            if (section) {
                section.iconHidden = !section.iconHidden;
                saveHistoryState();
                renderAll();
            }
        }

        function getEntryRowHTML(sectionId, item, idx) {
            const isHidden = !!item.hidden;
            const entryTitle = (typeof item === 'object' ? (item.title || item.name || item.role) : item) || 'New Entry';
            return `
                <div class="new-entry-row" onclick="toggleSectionMode('${sectionId}', ${idx})" style="opacity: ${isHidden ? 0.45 : 1};">
                    <i class="fa-solid fa-grip-vertical drag-handle" onclick="event.stopPropagation()"></i>
                    <span class="entry-title">${entryTitle}</span>
                    <button class="action-icon" onclick="event.stopPropagation(); toggleEntryVisibility('${sectionId}', ${idx})" title="${isHidden ? 'Show in resume' : 'Hide from resume'}">
                        <i class="fa-solid ${isHidden ? 'fa-eye-slash' : 'fa-eye'}"></i>
                    </button>
                    <button class="action-icon" onclick="event.stopPropagation(); deleteSectionEntry('${sectionId}', ${idx})" title="Delete entry">
                        <i class="fa-solid fa-trash-can" style="color: #ef4444;"></i>
                    </button>
                </div>
            `;
        }

        function getSummaryRowHTML(section) {
            const isHidden = !!section.hidden;
            return `
                <div class="new-entry-row" onclick="toggleSectionMode('${section.id}', 'entry')" style="opacity: ${isHidden ? 0.45 : 1};">
                    <i class="fa-solid fa-grip-vertical drag-handle" onclick="event.stopPropagation()"></i>
                    <span class="entry-title">New Entry</span>
                    <button class="action-icon" onclick="event.stopPropagation(); toggleEntryVisibility('${section.id}', 'summary')" title="${isHidden ? 'Show in resume' : 'Hide from resume'}">
                        <i class="fa-solid ${isHidden ? 'fa-eye-slash' : 'fa-eye'}"></i>
                    </button>
                    <button class="action-icon" onclick="event.stopPropagation(); deleteSection('${section.id}')" title="Delete section">
                        <i class="fa-solid fa-trash-can" style="color: #ef4444;"></i>
                    </button>
                </div>
            `;
        }

        function getEditHeadingHTML(section) {
            const isIconPickerOpen = !!section.iconPickerOpen;
            const defaultIcon = getDefaultSectionIconClass(section.type);
            const currentIcon = section.icon || defaultIcon;
            const currentIconDisplay = section.iconHidden ? 'fa-solid fa-eye-slash' : currentIcon;
            
            // Generate default icons buttons
            let defaultIconsHTML = '';
            defaultIconsList.forEach(ic => {
                defaultIconsHTML += `
                    <button
                        onclick="event.stopPropagation(); selectSectionIcon('${section.id}', '${ic.cls}')"
                        style="background: ${currentIcon === ic.cls ? 'rgba(238,195,12,0.15)' : 'rgba(255,255,255,0.04)'}; border: 1px solid ${currentIcon === ic.cls ? '#EEC30C' : '#333'}; border-radius: 6px; padding: 0.5rem; color: #e5e7eb; cursor: pointer; font-size: 1rem; display: flex; align-items: center; justify-content: center; height: 36px; width: 36px;"
                    >
                        <i class="${ic.cls}"></i>
                    </button>
                `;
            });
            
            // Generate more icons buttons
            let moreIconsHTML = '';
            moreIconsList.forEach(ic => {
                moreIconsHTML += `
                    <button
                        onclick="event.stopPropagation(); selectSectionIcon('${section.id}', '${ic.cls}')"
                        style="background: ${currentIcon === ic.cls ? 'rgba(238,195,12,0.15)' : 'rgba(255,255,255,0.04)'}; border: 1px solid ${currentIcon === ic.cls ? '#EEC30C' : '#333'}; border-radius: 6px; padding: 0.5rem; color: #e5e7eb; cursor: pointer; font-size: 1rem; display: flex; align-items: center; justify-content: center; height: 36px; width: 36px;"
                    >
                        <i class="${ic.cls}"></i>
                    </button>
                `;
            });

            return `
                <div class="edit-heading-mode">
                    <div class="edit-heading-group" style="position: relative;">
                        <label>Icon</label>
                        <button class="icon-selector-btn" onclick="event.stopPropagation(); toggleIconPicker('${section.id}')" title="Choose icon">
                            <i class="${currentIconDisplay}"></i>
                            <i class="fa-solid fa-chevron-${isIconPickerOpen ? 'up' : 'down'}" style="font-size:0.7rem;"></i>
                        </button>
                        
                        <!-- Icon Picker Dropdown -->
                        <div style="display: ${isIconPickerOpen ? 'block' : 'none'}; position: absolute; top: 100%; left: 0; z-index: 200; background: #1a1a1a; border: 1px solid #333; border-radius: 12px; padding: 1rem; width: 260px; margin-top: 0.5rem; box-shadow: 0 8px 30px rgba(0,0,0,0.5); text-align: left; font-family: sans-serif; max-height: 300px; overflow-y: auto;">
                            <div style="display: flex; flex-direction: column; gap: 0.5rem; margin-bottom: 1rem; padding-bottom: 0.75rem; border-bottom: 1px solid #333; align-items: flex-start;">
                                <span style="font-size:0.85rem; font-weight: 600; color: #aaa;">Show/hide icon</span>
                                <div style="display: flex; align-items: center; gap: 0.75rem;">
                                    <div
                                        onclick="event.stopPropagation(); toggleSectionIconVisibility('${section.id}')"
                                        style="width: 36px; height: 20px; border-radius: 10px; background: ${section.iconHidden ? '#555' : '#7c3aed'}; cursor: pointer; position: relative; transition: background 0.2s;"
                                    >
                                        <div style="position: absolute; top: 2px; left: ${section.iconHidden ? '2px' : '18px'}; width: 16px; height: 16px; border-radius: 50%; background: #fff; transition: left 0.2s;"></div>
                                    </div>
                                    <div style="display: flex; align-items: center; gap: 0.4rem; color: ${section.iconHidden ? '#888' : '#e5e7eb'}; font-size: 0.85rem; font-weight: 600;">
                                        <i class="fa-solid ${section.iconHidden ? 'fa-eye-slash' : 'fa-eye'}" style="color: ${section.iconHidden ? '#888' : '#7c3aed'};"></i>
                                        <span>${section.iconHidden ? 'Hidden' : 'Shown'}</span>
                                    </div>
                                </div>
                            </div>
                            <div style="font-size: 0.8rem; font-weight: 700; color: #888; margin-bottom: 0.5rem;">Default icons</div>
                            <div style="display: grid; grid-template-columns: repeat(5,1fr); gap: 0.4rem; margin-bottom: 0.75rem;">
                                ${defaultIconsHTML}
                            </div>
                            <div style="font-size: 0.8rem; font-weight: 700; color: #888; margin-bottom: 0.5rem;">More</div>
                            <div style="display: grid; grid-template-columns: repeat(5,1fr); gap: 0.4rem;">
                                ${moreIconsHTML}
                            </div>
                        </div>
                    </div>
                    <div class="edit-heading-group" style="flex:1;">
                        <label>Heading</label>
                        <input type="text" class="heading-input" value="${section.title || section.type.toUpperCase()}" oninput="updateSectionTitle('${section.id}', this.value)">
                    </div>
                    <button class="btn-done-pink" onclick="toggleSectionMode('${section.id}', 'default')">
                        <i class="fa-solid fa-check"></i> Done
                    </button>
                    <i class="fa-solid fa-chevron-up toggle-icon" style="margin-bottom:0.5rem; font-size:0.9rem;" onclick="toggleSectionMode('${section.id}', 'default')"></i>
                </div>
            `;
        }

        function execRTECommand(command, value = null) {
            document.execCommand(command, false, value);
        }

        function handleRTEInput(sectionId, element) {
            const content = element.innerHTML;
            updateSectionValue(sectionId, 0, 'content', content);
        }

        function updateSectionTitle(sectionId, title) {
            const section = resumeData.sections.find(s => s.id === sectionId);
            if (section) {
                section.title = title;
                debounceUpdatePreview();
            }
        }

        function updateDateRange(sectionId, idx, dateIndex, value) {
            const section = resumeData.sections.find(s => s.id === sectionId);
            if (section && section.items && section.items[idx]) {
                let dates = (section.items[idx].dateRange || '').split(' - ');
                if (dates.length < 2) dates = [dates[0] || '', ''];
                dates[dateIndex] = value;
                section.items[idx].dateRange = dates.filter(Boolean).join(' - ');
                debounceUpdatePreview();
            }
        }

        function openLanguageLevelModal(sectionId) {
            const sec = resumeData.sections.find(s => s.id === sectionId);
            if (!sec) return;
            const c = sec.customizations || {};
            const l1 = c.level1 || 'Basic';
            const l2 = c.level2 || 'Conversational';
            const l3 = c.level3 || 'Proficient';
            const l4 = c.level4 || 'Fluent';
            const l5 = c.level5 || 'Native/Bilingual';
        
            const modalHTML = `
                <div id="lang-level-modal" style="position:fixed; top:0; left:0; width:100%; height:100%; background:rgba(0,0,0,0.5); z-index:10000; display:flex; justify-content:center; align-items:center;">
                    <div style="background:#fff; color:#000; padding:2rem; border-radius:12px; width:400px; max-width:90%; position:relative; box-shadow: 0 10px 25px rgba(0,0,0,0.2);">
                        <button onclick="document.getElementById('lang-level-modal').remove()" style="position:absolute; right:15px; top:15px; background:none; border:none; font-size:1.2rem; cursor:pointer;"><i class="fa-solid fa-xmark"></i></button>
                        <h3 style="text-align:center; font-size:1.1rem; font-weight:700; margin-bottom:1.5rem; color:#222;">Languages – Customize Labels</h3>
                        <div style="margin-bottom:1rem;">
                            <label style="display:block; font-size:0.85rem; font-weight:600; margin-bottom:0.3rem;">Level 1</label>
                            <input type="text" id="ll1" value="${l1}" style="width:100%; padding:0.6rem; border:1px solid #ccc; border-radius:6px; background:#f9f9f9; color:#333;">
                        </div>
                        <div style="margin-bottom:1rem;">
                            <label style="display:block; font-size:0.85rem; font-weight:600; margin-bottom:0.3rem;">Level 2</label>
                            <input type="text" id="ll2" value="${l2}" style="width:100%; padding:0.6rem; border:1px solid #ccc; border-radius:6px; background:#f9f9f9; color:#333;">
                        </div>
                        <div style="margin-bottom:1rem;">
                            <label style="display:block; font-size:0.85rem; font-weight:600; margin-bottom:0.3rem;">Level 3</label>
                            <input type="text" id="ll3" value="${l3}" style="width:100%; padding:0.6rem; border:1px solid #ccc; border-radius:6px; background:#f9f9f9; color:#333;">
                        </div>
                        <div style="margin-bottom:1rem;">
                            <label style="display:block; font-size:0.85rem; font-weight:600; margin-bottom:0.3rem;">Level 4</label>
                            <input type="text" id="ll4" value="${l4}" style="width:100%; padding:0.6rem; border:1px solid #ccc; border-radius:6px; background:#f9f9f9; color:#333;">
                        </div>
                        <div style="margin-bottom:1.5rem;">
                            <label style="display:block; font-size:0.85rem; font-weight:600; margin-bottom:0.3rem;">Level 5</label>
                            <input type="text" id="ll5" value="${l5}" style="width:100%; padding:0.6rem; border:1px solid #ccc; border-radius:6px; background:#f9f9f9; color:#333;">
                        </div>
                        <div style="display:flex; gap:10px;">
                            <button onclick="document.getElementById('lang-level-modal').remove()" style="flex:1; padding:0.8rem; background:#fff; border:1px solid #ccc; border-radius:20px; font-weight:600; cursor:pointer; color:#333;">Cancel</button>
                            <button onclick="saveLanguageLevels('${sectionId}')" style="flex:1; padding:0.8rem; background:#1e1e1e; color:#fff; border:none; border-radius:20px; font-weight:600; cursor:pointer;">Save</button>
                        </div>
                    </div>
                </div>
            `;
            document.body.insertAdjacentHTML('beforeend', modalHTML);
        }
        
        function saveLanguageLevels(sectionId) {
            const l1 = document.getElementById('ll1').value;
            const l2 = document.getElementById('ll2').value;
            const l3 = document.getElementById('ll3').value;
            const l4 = document.getElementById('ll4').value;
            const l5 = document.getElementById('ll5').value;
            updateSectionCustomization(sectionId, 'level1', l1, false);
            updateSectionCustomization(sectionId, 'level2', l2, false);
            updateSectionCustomization(sectionId, 'level3', l3, false);
            updateSectionCustomization(sectionId, 'level4', l4, false);
            updateSectionCustomization(sectionId, 'level5', l5, true);
            document.getElementById('lang-level-modal').remove();
            renderEditorCards();
        }

        function getSectionLayoutCustomizationsHTML(section, sectionTitle) {
            const c = section.customizations || {};
            const layout = c.layout || 'Grid';
            let html = `
                <div class="customization-trigger-row" onclick="toggleSectionCustomizations('${section.id}')" style="cursor:pointer; display:flex; justify-content:space-between; padding: 1rem; border-top: 1px solid #222; background: #1a1a1a; border-radius: ${section.customizationsOpen ? '0' : '0 0 12px 12px'}; font-size: 0.9rem; color: #fff;">
                    <span><i class="fa-solid fa-sliders" style="margin-right:0.5rem; font-size:0.8rem;"></i> ${section.customizationsOpen ? 'Hide customizations for this section' : 'Show customizations for this section'}</span>
                    <i class="fa-solid ${section.customizationsOpen ? 'fa-chevron-up' : 'fa-chevron-down'}" style="font-size:0.8rem; transition: transform 0.3s ease;"></i>
                </div>
                <div style="display: ${section.customizationsOpen ? 'block' : 'none'}; padding: 1.5rem; background: #1e1e1e; border-top: 1px solid rgba(255,255,255,0.05); border-radius: 0 0 12px 12px;">
                    <h3 style="margin-bottom: 1rem; font-size: 1.1rem; font-weight: 600; color: #f0f0f0;">${sectionTitle}</h3>
                    
                    <div style="display:flex; gap: 8px; flex-wrap: wrap; margin-bottom: 1rem;">
                        <button onclick="updateSectionCustomization('${section.id}', 'layout', 'Grid', true)" style="flex:1; padding:0.5rem; border:1px solid ${layout === 'Grid' ? '#EEC30C' : '#444'}; border-radius:8px; background:${layout === 'Grid' ? 'rgba(238,195,12,0.1)' : 'transparent'}; color:${layout === 'Grid' ? '#EEC30C' : '#ccc'}; cursor:pointer; font-size:0.85rem; font-weight:600;">Grid</button>
                        <button onclick="updateSectionCustomization('${section.id}', 'layout', 'Rows', true)" style="flex:1; padding:0.5rem; border:1px solid ${layout === 'Rows' ? '#EEC30C' : '#444'}; border-radius:8px; background:${layout === 'Rows' ? 'rgba(238,195,12,0.1)' : 'transparent'}; color:${layout === 'Rows' ? '#EEC30C' : '#ccc'}; cursor:pointer; font-size:0.85rem; font-weight:600;">Rows</button>
                        <button onclick="updateSectionCustomization('${section.id}', 'layout', 'Compact', true)" style="flex:1; padding:0.5rem; border:1px solid ${layout === 'Compact' ? '#EEC30C' : '#444'}; border-radius:8px; background:${layout === 'Compact' ? 'rgba(238,195,12,0.1)' : 'transparent'}; color:${layout === 'Compact' ? '#EEC30C' : '#ccc'}; cursor:pointer; font-size:0.85rem; font-weight:600;">Compact</button>
                        <button onclick="updateSectionCustomization('${section.id}', 'layout', 'Bubble', true)" style="flex:1; padding:0.5rem; border:1px solid ${layout === 'Bubble' ? '#EEC30C' : '#444'}; border-radius:8px; background:${layout === 'Bubble' ? 'rgba(238,195,12,0.1)' : 'transparent'}; color:${layout === 'Bubble' ? '#EEC30C' : '#ccc'}; cursor:pointer; font-size:0.85rem; font-weight:600;">Bubble</button>
                        <button onclick="updateSectionCustomization('${section.id}', 'layout', 'Level', true)" style="flex:1; padding:0.5rem; border:1px solid ${layout === 'Level' ? '#EEC30C' : '#444'}; border-radius:8px; background:${layout === 'Level' ? 'rgba(238,195,12,0.1)' : 'transparent'}; color:${layout === 'Level' ? '#EEC30C' : '#ccc'}; cursor:pointer; font-size:0.85rem; font-weight:600;">Level</button>
                    </div>
            `;

            if (layout === 'Grid') {
                const cols = c.columns || 2;
                html += `
                    <div style="display:flex; gap: 8px; flex-wrap: wrap; margin-bottom: 1rem;">
                        <button onclick="updateSectionCustomization('${section.id}', 'columns', 1, true)" style="flex:1; padding:0.5rem; border:1px solid ${cols === 1 ? '#EEC30C' : '#444'}; border-radius:8px; background:${cols === 1 ? 'rgba(238,195,12,0.1)' : 'transparent'}; color:${cols === 1 ? '#EEC30C' : '#ccc'}; cursor:pointer;">
                            <div style="width:20px; height:8px; background:currentColor; margin:0 auto;"></div>
                        </button>
                        <button onclick="updateSectionCustomization('${section.id}', 'columns', 2, true)" style="flex:1; padding:0.5rem; border:1px solid ${cols === 2 ? '#EEC30C' : '#444'}; border-radius:8px; background:${cols === 2 ? 'rgba(238,195,12,0.1)' : 'transparent'}; color:${cols === 2 ? '#EEC30C' : '#ccc'}; cursor:pointer;">
                            <div style="display:flex; gap:2px; justify-content:center;"><div style="width:10px; height:8px; background:currentColor;"></div><div style="width:10px; height:8px; background:currentColor;"></div></div>
                        </button>
                        <button onclick="updateSectionCustomization('${section.id}', 'columns', 3, true)" style="flex:1; padding:0.5rem; border:1px solid ${cols === 3 ? '#EEC30C' : '#444'}; border-radius:8px; background:${cols === 3 ? 'rgba(238,195,12,0.1)' : 'transparent'}; color:${cols === 3 ? '#EEC30C' : '#ccc'}; cursor:pointer;">
                            <div style="display:flex; gap:2px; justify-content:center;"><div style="width:6px; height:8px; background:currentColor;"></div><div style="width:6px; height:8px; background:currentColor;"></div><div style="width:6px; height:8px; background:currentColor;"></div></div>
                        </button>
                        <button onclick="updateSectionCustomization('${section.id}', 'columns', 4, true)" style="flex:1; padding:0.5rem; border:1px solid ${cols === 4 ? '#EEC30C' : '#444'}; border-radius:8px; background:${cols === 4 ? 'rgba(238,195,12,0.1)' : 'transparent'}; color:${cols === 4 ? '#EEC30C' : '#ccc'}; cursor:pointer;">
                            <div style="display:flex; gap:2px; justify-content:center;"><div style="width:4px; height:8px; background:currentColor;"></div><div style="width:4px; height:8px; background:currentColor;"></div><div style="width:4px; height:8px; background:currentColor;"></div><div style="width:4px; height:8px; background:currentColor;"></div></div>
                        </button>
                    </div>
                `;
            } else if (layout === 'Rows') {
                const rowSpacing = c.rowSpacing || 'Tight';
                const startBullets = c.startBullets || false;
                const subinfoStyle = c.subinfoStyle || 'Dash';
                html += `
                    <div style="font-size: 0.85rem; font-weight: 600; color: #aaa; margin-bottom: 0.5rem;">Row spacing</div>
                    <div style="display:flex; gap: 8px; margin-bottom: 1rem;">
                        <button onclick="updateSectionCustomization('${section.id}', 'rowSpacing', 'Tight', true)" style="flex:1; padding:0.5rem; border:1px solid ${rowSpacing === 'Tight' ? '#EEC30C' : '#444'}; border-radius:8px; background:${rowSpacing === 'Tight' ? 'rgba(238,195,12,0.1)' : 'transparent'}; color:${rowSpacing === 'Tight' ? '#EEC30C' : '#ccc'}; cursor:pointer; font-size:0.85rem;">Tight</button>
                        <button onclick="updateSectionCustomization('${section.id}', 'rowSpacing', 'Spacious', true)" style="flex:1; padding:0.5rem; border:1px solid ${rowSpacing === 'Spacious' ? '#EEC30C' : '#444'}; border-radius:8px; background:${rowSpacing === 'Spacious' ? 'rgba(238,195,12,0.1)' : 'transparent'}; color:${rowSpacing === 'Spacious' ? '#EEC30C' : '#ccc'}; cursor:pointer; font-size:0.85rem;">Spacious</button>
                    </div>
                    <div style="display:flex; align-items:center; gap: 12px; margin-bottom: 1rem;">
                        <input type="checkbox" id="start-bullets-${section.id}" ${startBullets ? 'checked' : ''} onchange="updateSectionCustomization('${section.id}', 'startBullets', this.checked, true)" style="width:16px; height:16px; cursor:pointer; accent-color: #EEC30C;">
                        <label for="start-bullets-${section.id}" style="color: #ccc; font-size:0.9rem; cursor:pointer;">Start rows with bullets</label>
                    </div>
                    <div style="font-size: 0.85rem; font-weight: 600; color: #aaa; margin-bottom: 0.5rem;">Subinfo Style</div>
                    <div style="display:flex; gap: 8px; margin-bottom: 1rem;">
                        <button onclick="updateSectionCustomization('${section.id}', 'subinfoStyle', 'Colon', true)" style="flex:1; padding:0.5rem; border:1px solid ${subinfoStyle === 'Colon' ? '#EEC30C' : '#444'}; border-radius:8px; background:${subinfoStyle === 'Colon' ? 'rgba(238,195,12,0.1)' : 'transparent'}; color:${subinfoStyle === 'Colon' ? '#EEC30C' : '#ccc'}; cursor:pointer; font-size:0.85rem;">: Colon</button>
                        <button onclick="updateSectionCustomization('${section.id}', 'subinfoStyle', 'Dash', true)" style="flex:1; padding:0.5rem; border:1px solid ${subinfoStyle === 'Dash' ? '#EEC30C' : '#444'}; border-radius:8px; background:${subinfoStyle === 'Dash' ? 'rgba(238,195,12,0.1)' : 'transparent'}; color:${subinfoStyle === 'Dash' ? '#EEC30C' : '#ccc'}; cursor:pointer; font-size:0.85rem;">- Dash</button>
                        <button onclick="updateSectionCustomization('${section.id}', 'subinfoStyle', 'Bracket', true)" style="flex:1; padding:0.5rem; border:1px solid ${subinfoStyle === 'Bracket' ? '#EEC30C' : '#444'}; border-radius:8px; background:${subinfoStyle === 'Bracket' ? 'rgba(238,195,12,0.1)' : 'transparent'}; color:${subinfoStyle === 'Bracket' ? '#EEC30C' : '#ccc'}; cursor:pointer; font-size:0.85rem;">() Bracket</button>
                    </div>
                `;
            } else if (layout === 'Compact') {
                const separator = c.separator || 'Comma';
                const subinfoStyle = c.subinfoStyle || 'Dash';
                html += `
                    <div style="display:flex; gap: 8px; margin-bottom: 1rem;">
                        <button onclick="updateSectionCustomization('${section.id}', 'separator', 'Bullet', true)" style="flex:1; padding:0.5rem; border:1px solid ${separator === 'Bullet' ? '#EEC30C' : '#444'}; border-radius:8px; background:${separator === 'Bullet' ? 'rgba(238,195,12,0.1)' : 'transparent'}; color:${separator === 'Bullet' ? '#EEC30C' : '#ccc'}; cursor:pointer; font-size:0.85rem;">Bullet</button>
                        <button onclick="updateSectionCustomization('${section.id}', 'separator', 'Pipe', true)" style="flex:1; padding:0.5rem; border:1px solid ${separator === 'Pipe' ? '#EEC30C' : '#444'}; border-radius:8px; background:${separator === 'Pipe' ? 'rgba(238,195,12,0.1)' : 'transparent'}; color:${separator === 'Pipe' ? '#EEC30C' : '#ccc'}; cursor:pointer; font-size:0.85rem;">Pipe</button>
                        <button onclick="updateSectionCustomization('${section.id}', 'separator', 'Comma', true)" style="flex:1; padding:0.5rem; border:1px solid ${separator === 'Comma' ? '#EEC30C' : '#444'}; border-radius:8px; background:${separator === 'Comma' ? 'rgba(238,195,12,0.1)' : 'transparent'}; color:${separator === 'Comma' ? '#EEC30C' : '#ccc'}; cursor:pointer; font-size:0.85rem;">Comma</button>
                    </div>
                    <div style="font-size: 0.85rem; font-weight: 600; color: #aaa; margin-bottom: 0.5rem;">Subinfo Style</div>
                    <div style="display:flex; gap: 8px; margin-bottom: 1rem;">
                        <button onclick="updateSectionCustomization('${section.id}', 'subinfoStyle', 'Colon', true)" style="flex:1; padding:0.5rem; border:1px solid ${subinfoStyle === 'Colon' ? '#EEC30C' : '#444'}; border-radius:8px; background:${subinfoStyle === 'Colon' ? 'rgba(238,195,12,0.1)' : 'transparent'}; color:${subinfoStyle === 'Colon' ? '#EEC30C' : '#ccc'}; cursor:pointer; font-size:0.85rem;">: Colon</button>
                        <button onclick="updateSectionCustomization('${section.id}', 'subinfoStyle', 'Dash', true)" style="flex:1; padding:0.5rem; border:1px solid ${subinfoStyle === 'Dash' ? '#EEC30C' : '#444'}; border-radius:8px; background:${subinfoStyle === 'Dash' ? 'rgba(238,195,12,0.1)' : 'transparent'}; color:${subinfoStyle === 'Dash' ? '#EEC30C' : '#ccc'}; cursor:pointer; font-size:0.85rem;">- Dash</button>
                        <button onclick="updateSectionCustomization('${section.id}', 'subinfoStyle', 'Bracket', true)" style="flex:1; padding:0.5rem; border:1px solid ${subinfoStyle === 'Bracket' ? '#EEC30C' : '#444'}; border-radius:8px; background:${subinfoStyle === 'Bracket' ? 'rgba(238,195,12,0.1)' : 'transparent'}; color:${subinfoStyle === 'Bracket' ? '#EEC30C' : '#ccc'}; cursor:pointer; font-size:0.85rem;">() Bracket</button>
                    </div>
                `;
            } else if (layout === 'Bubble') {
                const subinfoStyle = c.subinfoStyle || 'Dash';
                html += `
                    <div style="font-size: 0.85rem; font-weight: 600; color: #aaa; margin-bottom: 0.5rem;">Subinfo Style</div>
                    <div style="display:flex; gap: 8px; margin-bottom: 1rem;">
                        <button onclick="updateSectionCustomization('${section.id}', 'subinfoStyle', 'Colon', true)" style="flex:1; padding:0.5rem; border:1px solid ${subinfoStyle === 'Colon' ? '#EEC30C' : '#444'}; border-radius:8px; background:${subinfoStyle === 'Colon' ? 'rgba(238,195,12,0.1)' : 'transparent'}; color:${subinfoStyle === 'Colon' ? '#EEC30C' : '#ccc'}; cursor:pointer; font-size:0.85rem;">: Colon</button>
                        <button onclick="updateSectionCustomization('${section.id}', 'subinfoStyle', 'Dash', true)" style="flex:1; padding:0.5rem; border:1px solid ${subinfoStyle === 'Dash' ? '#EEC30C' : '#444'}; border-radius:8px; background:${subinfoStyle === 'Dash' ? 'rgba(238,195,12,0.1)' : 'transparent'}; color:${subinfoStyle === 'Dash' ? '#EEC30C' : '#ccc'}; cursor:pointer; font-size:0.85rem;">- Dash</button>
                        <button onclick="updateSectionCustomization('${section.id}', 'subinfoStyle', 'Bracket', true)" style="flex:1; padding:0.5rem; border:1px solid ${subinfoStyle === 'Bracket' ? '#EEC30C' : '#444'}; border-radius:8px; background:${subinfoStyle === 'Bracket' ? 'rgba(238,195,12,0.1)' : 'transparent'}; color:${subinfoStyle === 'Bracket' ? '#EEC30C' : '#ccc'}; cursor:pointer; font-size:0.85rem;">() Bracket</button>
                    </div>
                `;
            } else if (layout === 'Level') {
                const levelStyle = c.levelStyle || 'Dots';
                html += `
                    <div style="display:flex; gap: 8px; margin-bottom: 1rem;">
                        <button onclick="updateSectionCustomization('${section.id}', 'levelStyle', 'Text', true)" style="flex:1; padding:0.5rem; border:1px solid ${levelStyle === 'Text' ? '#EEC30C' : '#444'}; border-radius:8px; background:${levelStyle === 'Text' ? 'rgba(238,195,12,0.1)' : 'transparent'}; color:${levelStyle === 'Text' ? '#EEC30C' : '#ccc'}; cursor:pointer; font-size:0.85rem;">Text</button>
                        <button onclick="updateSectionCustomization('${section.id}', 'levelStyle', 'Dots', true)" style="flex:1; padding:0.5rem; border:1px solid ${levelStyle === 'Dots' ? '#EEC30C' : '#444'}; border-radius:8px; background:${levelStyle === 'Dots' ? 'rgba(238,195,12,0.1)' : 'transparent'}; color:${levelStyle === 'Dots' ? '#EEC30C' : '#ccc'}; cursor:pointer; font-size:0.85rem;">Dots</button>
                        <button onclick="updateSectionCustomization('${section.id}', 'levelStyle', 'Bar', true)" style="flex:1; padding:0.5rem; border:1px solid ${levelStyle === 'Bar' ? '#EEC30C' : '#444'}; border-radius:8px; background:${levelStyle === 'Bar' ? 'rgba(238,195,12,0.1)' : 'transparent'}; color:${levelStyle === 'Bar' ? '#EEC30C' : '#ccc'}; cursor:pointer; font-size:0.85rem;">Bar</button>
                    </div>
                `;
            }
            
            html += `
                </div>
            `;
            return html;
        }

        function renderEditorCards() {
            const container = document.getElementById('active-sections-container');
            container.innerHTML = '';

            resumeData.sections.forEach(section => {
                const card = document.createElement('div');
                card.id = 'editor-' + section.id;
                
                const isCollapsed = section.isCollapsed === true;
                const collapseStyle = isCollapsed ? 'display: none;' : '';
                const chevronClass = isCollapsed ? 'fa-chevron-down' : 'fa-chevron-up';

                const isIconHidden = !!section.iconHidden;
                const defaultIcon = getDefaultSectionIconClass(section.type);
                const headerIcon = isIconHidden ? 'fa-solid fa-eye-slash' : (section.icon || defaultIcon);

                if (section.editMode === 'heading') {
                    card.className = 'new-section-card';
                    card.innerHTML = getEditHeadingHTML(section);
                    container.appendChild(card);
                    return;
                }

                if (section.type === 'summary') {
                    card.className = 'new-section-card';
                    
                    if (section.editMode === 'entry') {
                        card.innerHTML = `
                            <div class="edit-entry-mode">
                                <div class="edit-entry-header">
                                    <h3>Edit Entry</h3>
                                    <div class="edit-entry-actions">
                                        <button class="action-icon" onclick="toggleSectionMode('${section.id}', 'default')"><i class="fa-solid fa-eye"></i></button>
                                        <button class="action-icon" onclick="deleteSection('${section.id}')"><i class="fa-solid fa-trash-can"></i></button>
                                    </div>
                                </div>
                                <label class="entry-field-label">Professional Summary</label>
                                <div class="rte-container">
                                    <div class="rte-toolbar">
                                        <button class="rte-btn" onclick="execRTECommand('bold')" title="Bold"><b>B</b></button>
                                        <button class="rte-btn" onclick="execRTECommand('italic')" title="Italic"><i>I</i></button>
                                        <button class="rte-btn" onclick="execRTECommand('underline')" title="Underline"><u>U</u></button>
                                        <div class="rte-separator"></div>
                                        <button class="rte-btn" onclick="execRTECommand('insertUnorderedList')" title="Bullet List"><i class="fa-solid fa-list-ul"></i></button>
                                        <button class="rte-btn" onclick="execRTECommand('createLink', prompt('Enter URL'))" title="Link"><i class="fa-solid fa-link"></i></button>
                                        <div class="rte-separator"></div>
                                        <button class="rte-btn" onclick="execRTECommand('justifyLeft')" title="Align Left"><i class="fa-solid fa-align-left"></i></button>
                                        <button class="rte-btn" onclick="execRTECommand('justifyCenter')" title="Align Center"><i class="fa-solid fa-align-center"></i></button>
                                        <button class="rte-btn" onclick="execRTECommand('justifyRight')" title="Align Right"><i class="fa-solid fa-align-right"></i></button>
                                        <button class="rte-btn" onclick="execRTECommand('justifyFull')" title="Justify"><i class="fa-solid fa-align-justify"></i></button>
                                    </div>
                                    <div class="rte-content" contenteditable="true" oninput="handleRTEInput('${section.id}', this)" placeholder="Write a professional summary or objective statement that highlights your key qualifications and career goals...">${section.content || ''}</div>
                                </div>
                                <div style="padding-top: 1rem; border-top: 1px solid rgba(255, 255, 255, 0.1);">
                                    <button class="btn-done-pink-large" onclick="toggleSectionMode('${section.id}', 'default')">
                                        <i class="fa-solid fa-check"></i> Done
                                    </button>
                                </div>
                            </div>
                        `;
                    } else {
                        // default mode
                        card.innerHTML = `
                            <div class="new-section-header" onclick="toggleSectionCollapse('${section.id}')" style="cursor:pointer;">
                                <div class="icon-container">
                                    <i class="${headerIcon}"></i>
                                </div>
                                <h3>${section.title || 'Summary'}</h3>
                                <button class="btn-edit-heading" onclick="event.stopPropagation(); toggleSectionMode('${section.id}', 'heading')">
                                    <i class="fa-solid fa-pencil"></i> Edit Heading
                                </button>
                                <i class="fa-solid ${chevronClass} toggle-icon"></i>
                            </div>
                            <div class="new-section-body" style="${collapseStyle}">
                                ${getSummaryRowHTML(section)}
                                <div class="add-entry-row">
                                    <button class="btn-add-new-entry" onclick="toggleSectionMode('${section.id}', 'entry')">
                                        <i class="fa-solid fa-plus"></i> Add Entry
                                    </button>
                                    <button class="delete-section-btn" onclick="deleteSection('${section.id}')">
                                        <i class="fa-solid fa-trash-can"></i>
                                    </button>
                                </div>
                            </div>
                        `;
                    }

                    const c = section.customizations || {};
                    if (section.editMode === 'entry') {
                        card.innerHTML += `
                            <div class="customization-trigger-row" onclick="toggleSectionCustomizations('${section.id}')" style="cursor:pointer; display:flex; justify-content:space-between; padding: 1rem; border-top: 1px solid #222; background: #1a1a1a; border-radius: ${section.customizationsOpen ? '0' : '0 0 12px 12px'}; font-size: 0.9rem; color: #fff;">
                                <span><i class="fa-solid fa-sliders" style="margin-right:0.5rem; font-size:0.8rem;"></i> ${section.customizationsOpen ? 'Hide customizations for this section' : 'Show customizations for this section'}</span>
                                <i class="fa-solid ${section.customizationsOpen ? 'fa-chevron-up' : 'fa-chevron-down'}" style="font-size:0.8rem; transition: transform 0.3s ease;"></i>
                            </div>
                            <div style="display: ${section.customizationsOpen ? 'block' : 'none'}; padding: 1.5rem; background: #1e1e1e; border-top: 1px solid rgba(255,255,255,0.05); border-radius: 0 0 12px 12px;">
                                <h3 style="margin-bottom: 1rem; font-size: 1.1rem; font-weight: 600; color: #f0f0f0;">Summary</h3>
                                <div style="display:flex; align-items:center; gap: 12px; margin-bottom: 0.8rem;">
                                    <input type="checkbox" id="sum-header-${section.id}" ${c.displayInHeader ? 'checked' : ''} onchange="updateSectionCustomization('${section.id}', 'displayInHeader', this.checked, true)" style="width:16px; height:16px; cursor:pointer; accent-color: #EEC30C;">
                                    <label for="sum-header-${section.id}" style="color: #ccc; font-size:0.9rem; cursor:pointer;">Display summary as part of header</label>
                                </div>
                                <div style="display:flex; align-items:center; gap: 12px;">
                                    <input type="checkbox" id="sum-heading-${section.id}" ${c.showHeading !== false ? 'checked' : ''} onchange="updateSectionCustomization('${section.id}', 'showHeading', this.checked, true)" style="width:16px; height:16px; cursor:pointer; accent-color: #EEC30C;">
                                    <label for="sum-heading-${section.id}" style="color: #ccc; font-size:0.9rem; cursor:pointer;">Show summary heading</label>
                                </div>
                            </div>
                        `;
                    }
                    container.appendChild(card);
                    return;
                }

                // Skills
                if (section.type === 'skills') {
                    card.className = 'new-section-card';
                    const rteToolbar = `
                        <div class="rte-toolbar">
                            <button class="rte-btn" onclick="execRTECommand('bold')" title="Bold"><b>B</b></button>
                            <button class="rte-btn" onclick="execRTECommand('italic')" title="Italic"><i>I</i></button>
                            <button class="rte-btn" onclick="execRTECommand('underline')" title="Underline"><u>U</u></button>
                            <div class="rte-separator"></div>
                            <button class="rte-btn" onclick="execRTECommand('insertUnorderedList')" title="Bullet List"><i class="fa-solid fa-list-ul"></i></button>
                            <button class="rte-btn" onclick="execRTECommand('createLink', prompt('Enter URL'))" title="Link"><i class="fa-solid fa-link"></i></button>
                            <div class="rte-separator"></div>
                            <button class="rte-btn active" onclick="execRTECommand('justifyLeft')" title="Left"><i class="fa-solid fa-align-left"></i></button>
                            <button class="rte-btn" onclick="execRTECommand('justifyCenter')" title="Center"><i class="fa-solid fa-align-center"></i></button>
                            <button class="rte-btn" onclick="execRTECommand('justifyRight')" title="Right"><i class="fa-solid fa-align-right"></i></button>
                            <button class="rte-btn" onclick="execRTECommand('justifyFull')" title="Justify"><i class="fa-solid fa-align-justify"></i></button>
                        </div>`;

                    if (typeof section.editMode === 'number') {
                        const idx = section.editMode;
                        const item = (section.items[idx] && typeof section.items[idx] === 'object') ? section.items[idx] : { name: '', desc: '', level: '' };
                        card.innerHTML = `
                            <div class="edit-entry-mode">
                                <div class="edit-entry-header">
                                    <h3>Edit Entry</h3>
                                    <div class="edit-entry-actions">
                                        <button class="action-icon" onclick="toggleSectionMode('${section.id}', 'default')"><i class="fa-solid fa-eye"></i></button>
                                        <button class="action-icon" onclick="deleteSectionEntry('${section.id}', ${idx}); toggleSectionMode('${section.id}', 'default')"><i class="fa-solid fa-trash-can"></i></button>
                                    </div>
                                </div>
                                <div class="form-group" style="margin-bottom:1rem;">
                                    <label class="entry-field-label">Skill</label>
                                    <input type="text" class="form-input-dark" value="${item.name || ''}" oninput="updateSectionValue('${section.id}', ${idx}, 'name', this.value)" placeholder="Enter Skill">
                                </div>
                                <label class="entry-field-label">Information / Sub-skills</label>
                                <div class="rte-container">
                                    ${rteToolbar}
                                    <div class="rte-content" contenteditable="true" oninput="updateSectionValue('${section.id}', ${idx}, 'desc', this.innerHTML)" placeholder="Enter information or sub-skills">${item.desc || ''}</div>
                                </div>
                                <div class="form-group" style="margin-top:1rem;">
                                    <label class="entry-field-label">Skill level</label>
                                    <select class="form-input-dark" onchange="updateSectionValue('${section.id}', ${idx}, 'level', this.value)" style="cursor:pointer; appearance:auto;">
                                        <option value="" ${!item.level ? 'selected' : ''}>Select skill level</option>
                                        <option value="Beginner" ${item.level==='Beginner'?'selected':''}>Beginner</option>
                                        <option value="Intermediate" ${item.level==='Intermediate'?'selected':''}>Intermediate</option>
                                        <option value="Advanced" ${item.level==='Advanced'?'selected':''}>Advanced</option>
                                        <option value="Expert" ${item.level==='Expert'?'selected':''}>Expert</option>
                                    </select>
                                </div>
                                <div style="padding-top:1rem; border-top:1px solid rgba(255,255,255,0.1);">
                                    <button class="btn-done-pink-large" onclick="toggleSectionMode('${section.id}', 'default')"><i class="fa-solid fa-check"></i> Done</button>
                                </div>
                            </div>
                        `;
                    } else {
                        const items = section.items || [];
                        card.innerHTML = `
                            <div class="new-section-header" onclick="toggleSectionCollapse('${section.id}')" style="cursor:pointer;">
                                <div class="icon-container"><i class="${headerIcon}"></i></div>
                                <h3>${section.title || 'Skills'}</h3>
                                <button class="btn-edit-heading" onclick="event.stopPropagation(); toggleSectionMode('${section.id}', 'heading')"><i class="fa-solid fa-pencil"></i> Edit Heading</button>
                                <i class="fa-solid ${chevronClass} toggle-icon"></i>
                            </div>
                            <div class="new-section-body" style="${collapseStyle}">
                                ${items.map((item, idx) => getEntryRowHTML(section.id, item, idx)).join('')}
                                <div class="add-entry-row">
                                    <button class="btn-add-new-entry" onclick="addSectionEntry('${section.id}')"><i class="fa-solid fa-plus"></i> Add Entry</button>
                                    <button class="delete-section-btn" onclick="deleteSection('${section.id}')"><i class="fa-solid fa-trash-can"></i></button>
                                </div>
                            </div>
                        `;
                    }
                    if (typeof section.editMode === 'number') {
                        card.innerHTML += getSectionLayoutCustomizationsHTML(section, 'Skills');
                    }
                    container.appendChild(card);
                    return;
                }

                // Languages
                if (section.type === 'languages') {
                    card.className = 'new-section-card';
                    const rteToolbar = `
                        <div class="rte-toolbar">
                            <button class="rte-btn" onclick="execRTECommand('bold')" title="Bold"><b>B</b></button>
                            <button class="rte-btn" onclick="execRTECommand('italic')" title="Italic"><i>I</i></button>
                            <button class="rte-btn" onclick="execRTECommand('underline')" title="Underline"><u>U</u></button>
                            <div class="rte-separator"></div>
                            <button class="rte-btn" onclick="execRTECommand('insertUnorderedList')" title="Bullet List"><i class="fa-solid fa-list-ul"></i></button>
                            <button class="rte-btn" onclick="execRTECommand('createLink', prompt('Enter URL'))" title="Link"><i class="fa-solid fa-link"></i></button>
                            <div class="rte-separator"></div>
                            <button class="rte-btn active" onclick="execRTECommand('justifyLeft')" title="Left"><i class="fa-solid fa-align-left"></i></button>
                            <button class="rte-btn" onclick="execRTECommand('justifyCenter')" title="Center"><i class="fa-solid fa-align-center"></i></button>
                            <button class="rte-btn" onclick="execRTECommand('justifyRight')" title="Right"><i class="fa-solid fa-align-right"></i></button>
                            <button class="rte-btn" onclick="execRTECommand('justifyFull')" title="Justify"><i class="fa-solid fa-align-justify"></i></button>
                        </div>`;

                    if (typeof section.editMode === 'number') {
                        const idx = section.editMode;
                        const item = (section.items[idx] && typeof section.items[idx] === 'object') ? section.items[idx] : { name: '', desc: '', level: '' };
                        card.innerHTML = `
                            <div class="edit-entry-mode">
                                <div class="edit-entry-header">
                                    <h3>Edit Entry</h3>
                                    <div class="edit-entry-actions">
                                        <button class="action-icon" onclick="toggleSectionMode('${section.id}', 'default')"><i class="fa-solid fa-eye"></i></button>
                                        <button class="action-icon" onclick="deleteSectionEntry('${section.id}', ${idx}); toggleSectionMode('${section.id}', 'default')"><i class="fa-solid fa-trash-can"></i></button>
                                    </div>
                                </div>
                                <div class="form-group" style="margin-bottom:1rem;">
                                    <label class="entry-field-label">Language</label>
                                    <input type="text" class="form-input-dark" value="${item.name || ''}" oninput="updateSectionValue('${section.id}', ${idx}, 'name', this.value)" placeholder="Enter language">
                                </div>
                                <label class="entry-field-label">Additional information</label>
                                <div class="rte-container">
                                    ${rteToolbar}
                                    <div class="rte-content" contenteditable="true" oninput="updateSectionValue('${section.id}', ${idx}, 'desc', this.innerHTML)" placeholder="e.g. C2, 4+, TOEFL, IELTS,...">${item.desc || ''}</div>
                                </div>
                                <div class="form-group" style="margin-top:1rem;">
                                    <label class="entry-field-label">Language level</label>
                                    <select class="form-input-dark" onchange="updateSectionValue('${section.id}', ${idx}, 'level', this.value)" style="cursor:pointer; appearance:auto; margin-bottom: 1rem;">
                                        <option value="" ${!item.level ? 'selected' : ''}>Select language level</option>
                                        <option value="Level 1" ${item.level==='Level 1'?'selected':''}>${(section.customizations||{}).level1 || 'Basic'}</option>
                                        <option value="Level 2" ${item.level==='Level 2'?'selected':''}>${(section.customizations||{}).level2 || 'Conversational'}</option>
                                        <option value="Level 3" ${item.level==='Level 3'?'selected':''}>${(section.customizations||{}).level3 || 'Proficient'}</option>
                                        <option value="Level 4" ${item.level==='Level 4'?'selected':''}>${(section.customizations||{}).level4 || 'Fluent'}</option>
                                        <option value="Level 5" ${item.level==='Level 5'?'selected':''}>${(section.customizations||{}).level5 || 'Native/Bilingual'}</option>
                                    </select>
                                    
                                    <div style="display:flex; justify-content:space-between; align-items:center; margin-top:1rem; padding:1rem; border-radius:8px; background:rgba(255,255,255,0.02); border:1px solid rgba(255,255,255,0.05);">
                                        <div>
                                            <div style="font-weight:600; font-size:0.85rem; margin-bottom:0.2rem; color:#fff;">Customize level text</div>
                                            <div style="font-size:0.75rem; color:#888;">${(section.customizations||{}).level1 || 'Basic'}, ${(section.customizations||{}).level2 || 'Conversational'}, ${(section.customizations||{}).level3 || 'Proficient'}, ${(section.customizations||{}).level4 || 'Fluent'}, ${(section.customizations||{}).level5 || 'Native/Bilingual'}</div>
                                        </div>
                                        <button onclick="openLanguageLevelModal('${section.id}')" style="background:none; border:none; color:#1a73e8; font-weight:600; font-size:0.85rem; cursor:pointer;">Customize</button>
                                    </div>
                                </div>
                                <div style="padding-top:1rem; border-top:1px solid rgba(255,255,255,0.1);">
                                    <button class="btn-done-pink-large" onclick="toggleSectionMode('${section.id}', 'default')"><i class="fa-solid fa-check"></i> Done</button>
                                </div>
                            </div>
                        `;
                    } else {
                        const items = section.items || [];
                        card.innerHTML = `
                            <div class="new-section-header" onclick="toggleSectionCollapse('${section.id}')" style="cursor:pointer;">
                                <div class="icon-container"><i class="${headerIcon}"></i></div>
                                <h3>${section.title || 'Languages'}</h3>
                                <button class="btn-edit-heading" onclick="event.stopPropagation(); toggleSectionMode('${section.id}', 'heading')"><i class="fa-solid fa-pencil"></i> Edit Heading</button>
                                <i class="fa-solid ${chevronClass} toggle-icon"></i>
                            </div>
                            <div class="new-section-body" style="${collapseStyle}">
                                ${items.map((item, idx) => getEntryRowHTML(section.id, item, idx)).join('')}
                                <div class="add-entry-row">
                                    <button class="btn-add-new-entry" onclick="addSectionEntry('${section.id}')"><i class="fa-solid fa-plus"></i> Add Entry</button>
                                    <button class="delete-section-btn" onclick="deleteSection('${section.id}')"><i class="fa-solid fa-trash-can"></i></button>
                                </div>
                            </div>
                        `;
                    }
                    if (typeof section.editMode === 'number') {
                        card.innerHTML += getSectionLayoutCustomizationsHTML(section, 'Languages');
                    }
                    container.appendChild(card);
                    return;
                }

                // Certificates
                if (section.type === 'certificates') {
                    card.className = 'new-section-card';
                    const rteToolbar = `
                        <div class="rte-toolbar">
                            <button class="rte-btn" onclick="execRTECommand('bold')" title="Bold"><b>B</b></button>
                            <button class="rte-btn" onclick="execRTECommand('italic')" title="Italic"><i>I</i></button>
                            <button class="rte-btn" onclick="execRTECommand('underline')" title="Underline"><u>U</u></button>
                            <div class="rte-separator"></div>
                            <button class="rte-btn" onclick="execRTECommand('insertUnorderedList')" title="Bullet List"><i class="fa-solid fa-list-ul"></i></button>
                            <button class="rte-btn" onclick="execRTECommand('createLink', prompt('Enter URL'))" title="Link"><i class="fa-solid fa-link"></i></button>
                            <div class="rte-separator"></div>
                            <button class="rte-btn active" onclick="execRTECommand('justifyLeft')" title="Left"><i class="fa-solid fa-align-left"></i></button>
                            <button class="rte-btn" onclick="execRTECommand('justifyCenter')" title="Center"><i class="fa-solid fa-align-center"></i></button>
                            <button class="rte-btn" onclick="execRTECommand('justifyRight')" title="Right"><i class="fa-solid fa-align-right"></i></button>
                            <button class="rte-btn" onclick="execRTECommand('justifyFull')" title="Justify"><i class="fa-solid fa-align-justify"></i></button>
                        </div>`;

                    if (typeof section.editMode === 'number') {
                        const idx = section.editMode;
                        const item = (section.items[idx] && typeof section.items[idx] === 'object') ? section.items[idx] : { name: '', desc: '' };
                        card.innerHTML = `
                            <div class="edit-entry-mode">
                                <div class="edit-entry-header">
                                    <h3>Edit Entry</h3>
                                    <div class="edit-entry-actions">
                                        <button class="action-icon" onclick="toggleSectionMode('${section.id}', 'default')"><i class="fa-solid fa-eye"></i></button>
                                        <button class="action-icon" onclick="deleteSectionEntry('${section.id}', ${idx}); toggleSectionMode('${section.id}', 'default')"><i class="fa-solid fa-trash-can"></i></button>
                                    </div>
                                </div>
                                <div class="form-group" style="margin-bottom:1rem;">
                                    <label class="entry-field-label">Certificate</label>
                                    <div style="position:relative;">
                                        <input type="text" class="form-input-dark" style="padding-right:60px;" value="${item.name || ''}" oninput="updateSectionValue('${section.id}', ${idx}, 'name', this.value)" placeholder="Enter certificate">
                                        <button style="position:absolute; right:8px; top:50%; transform:translateY(-50%); background:rgba(255,255,255,0.1); border:none; border-radius:4px; padding:0.2rem 0.5rem; color:#d1d5db; cursor:pointer; font-size:0.75rem; display:flex; align-items:center; gap:4px;" onclick="prompt('Enter URL')"><i class="fa-solid fa-link"></i> Link</button>
                                    </div>
                                </div>
                                <label class="entry-field-label">Additional information</label>
                                <div class="rte-container">
                                    ${rteToolbar}
                                    <div class="rte-content" contenteditable="true" oninput="updateSectionValue('${section.id}', ${idx}, 'desc', this.innerHTML)" placeholder="eg. Level 1 and 2">${item.desc || ''}</div>
                                </div>
                                <div style="padding-top:1rem; border-top:1px solid rgba(255,255,255,0.1);">
                                    <button class="btn-done-pink-large" onclick="toggleSectionMode('${section.id}', 'default')"><i class="fa-solid fa-check"></i> Done</button>
                                </div>
                            </div>
                        `;
                    } else {
                        const items = section.items || [];
                        card.innerHTML = `
                            <div class="new-section-header" onclick="toggleSectionCollapse('${section.id}')" style="cursor:pointer;">
                                <div class="icon-container"><i class="${headerIcon}"></i></div>
                                <h3>${section.title || 'Certificates'}</h3>
                                <button class="btn-edit-heading" onclick="event.stopPropagation(); toggleSectionMode('${section.id}', 'heading')"><i class="fa-solid fa-pencil"></i> Edit Heading</button>
                                <i class="fa-solid ${chevronClass} toggle-icon"></i>
                            </div>
                            <div class="new-section-body" style="${collapseStyle}">
                                ${items.map((item, idx) => getEntryRowHTML(section.id, item, idx)).join('')}
                                <div class="add-entry-row">
                                    <button class="btn-add-new-entry" onclick="addSectionEntry('${section.id}')"><i class="fa-solid fa-plus"></i> Add Entry</button>
                                    <button class="delete-section-btn" onclick="deleteSection('${section.id}')"><i class="fa-solid fa-trash-can"></i></button>
                                </div>
                            </div>
                        `;
                    }
                    if (typeof section.editMode === 'number') {
                        card.innerHTML += getSectionLayoutCustomizationsHTML(section, 'Certificates');
                    }
                    container.appendChild(card);
                    return;
                }

                // Interests
                if (section.type === 'interests') {
                    card.className = 'new-section-card';
                    const rteToolbar = `
                        <div class="rte-toolbar">
                            <button class="rte-btn" onclick="execRTECommand('bold')" title="Bold"><b>B</b></button>
                            <button class="rte-btn" onclick="execRTECommand('italic')" title="Italic"><i>I</i></button>
                            <button class="rte-btn" onclick="execRTECommand('underline')" title="Underline"><u>U</u></button>
                            <div class="rte-separator"></div>
                            <button class="rte-btn" onclick="execRTECommand('insertUnorderedList')" title="Bullet List"><i class="fa-solid fa-list-ul"></i></button>
                            <button class="rte-btn" onclick="execRTECommand('createLink', prompt('Enter URL'))" title="Link"><i class="fa-solid fa-link"></i></button>
                            <div class="rte-separator"></div>
                            <button class="rte-btn active" onclick="execRTECommand('justifyLeft')" title="Left"><i class="fa-solid fa-align-left"></i></button>
                            <button class="rte-btn" onclick="execRTECommand('justifyCenter')" title="Center"><i class="fa-solid fa-align-center"></i></button>
                            <button class="rte-btn" onclick="execRTECommand('justifyRight')" title="Right"><i class="fa-solid fa-align-right"></i></button>
                            <button class="rte-btn" onclick="execRTECommand('justifyFull')" title="Justify"><i class="fa-solid fa-align-justify"></i></button>
                        </div>`;

                    if (typeof section.editMode === 'number') {
                        const idx = section.editMode;
                        const item = (section.items[idx] && typeof section.items[idx] === 'object') ? section.items[idx] : { name: '', desc: '' };
                        card.innerHTML = `
                            <div class="edit-entry-mode">
                                <div class="edit-entry-header">
                                    <h3>Edit Entry</h3>
                                    <div class="edit-entry-actions">
                                        <button class="action-icon" onclick="toggleSectionMode('${section.id}', 'default')"><i class="fa-solid fa-eye"></i></button>
                                        <button class="action-icon" onclick="deleteSectionEntry('${section.id}', ${idx}); toggleSectionMode('${section.id}', 'default')"><i class="fa-solid fa-trash-can"></i></button>
                                    </div>
                                </div>
                                <div class="form-group" style="margin-bottom:1rem;">
                                    <label class="entry-field-label">Interest</label>
                                    <div style="position:relative;">
                                        <input type="text" class="form-input-dark" style="padding-right:60px;" value="${item.name || ''}" oninput="updateSectionValue('${section.id}', ${idx}, 'name', this.value)" placeholder="Enter Interest / Hobby">
                                        <button style="position:absolute; right:8px; top:50%; transform:translateY(-50%); background:rgba(255,255,255,0.1); border:none; border-radius:4px; padding:0.2rem 0.5rem; color:#d1d5db; cursor:pointer; font-size:0.75rem; display:flex; align-items:center; gap:4px;" onclick="prompt('Enter URL')"><i class="fa-solid fa-link"></i> Link</button>
                                    </div>
                                </div>
                                <label class="entry-field-label">Additional information</label>
                                <div class="rte-container">
                                    ${rteToolbar}
                                    <div class="rte-content" contenteditable="true" oninput="updateSectionValue('${section.id}', ${idx}, 'desc', this.innerHTML)" placeholder="Enter additional information">${item.desc || ''}</div>
                                </div>
                                <div style="padding-top:1rem; border-top:1px solid rgba(255,255,255,0.1);">
                                    <button class="btn-done-pink-large" onclick="toggleSectionMode('${section.id}', 'default')"><i class="fa-solid fa-check"></i> Done</button>
                                </div>
                            </div>
                        `;
                    } else {
                        const items = section.items || [];
                        card.innerHTML = `
                            <div class="new-section-header" onclick="toggleSectionCollapse('${section.id}')" style="cursor:pointer;">
                                <div class="icon-container"><i class="${headerIcon}"></i></div>
                                <h3>${section.title || 'Interests'}</h3>
                                <button class="btn-edit-heading" onclick="event.stopPropagation(); toggleSectionMode('${section.id}', 'heading')"><i class="fa-solid fa-pencil"></i> Edit Heading</button>
                                <i class="fa-solid ${chevronClass} toggle-icon"></i>
                            </div>
                            <div class="new-section-body" style="${collapseStyle}">
                                ${items.map((item, idx) => getEntryRowHTML(section.id, item, idx)).join('')}
                                <div class="add-entry-row">
                                    <button class="btn-add-new-entry" onclick="addSectionEntry('${section.id}')"><i class="fa-solid fa-plus"></i> Add Entry</button>
                                    <button class="delete-section-btn" onclick="deleteSection('${section.id}')"><i class="fa-solid fa-trash-can"></i></button>
                                </div>
                            </div>
                        `;
                    }
                    if (typeof section.editMode === 'number') {
                        card.innerHTML += getSectionLayoutCustomizationsHTML(section, 'Interests');
                    }
                    container.appendChild(card);
                    return;
                }

                card.className = 'editor-section-card';
                let cardBodyHTML = '';

                if (section.type === 'pagebreak') {
                    cardBodyHTML = `
                        <p style="font-size:0.85rem; color:#888; padding: 0.5rem 0;">This is a page break. You can rearrange its position in the Customize tab.</p>
                    `;
                } else if (section.type === 'summary' || section.type === 'custom' || section.type === 'declaration') {
                    cardBodyHTML = `
                        <div class="form-group full-width">
                            <textarea class="form-input" oninput="updateSectionValue('${section.id}', 0, 'content', this.value)">${section.content || ''}</textarea>
                        </div>
                    `;
                }
                // Skills / Lists section
                else if (section.type === 'skills') {
                    let itemsHTML = '';
                    section.items.forEach((skill, idx) => {
                        itemsHTML += `
                            <div style="display:flex; gap:0.5rem; margin-bottom:0.5rem;">
                                <input type="text" class="form-input" style="flex:1;" value="${skill}" oninput="updateSectionValue('${section.id}', ${idx}, '', this.value)">
                                <button class="section-action-btn delete-btn" onclick="deleteSectionEntry('${section.id}', ${idx})"><i class="fa-solid fa-trash-can"></i></button>
                            </div>
                        `;
                    });

                    cardBodyHTML = `
                        <div class="section-body">
                            ${itemsHTML}
                            <button class="btn-add-entry" onclick="addSectionEntry('${section.id}')">
                                <i class="fa-solid fa-plus"></i> Add Skill
                            </button>
                        </div>
                    `;
                }
                // Education / Experience / Complex List entry blocks
                else if (section.type === 'education' || section.type === 'experience') {
                    card.className = 'new-section-card';
                    
                    if (typeof section.editMode === 'number') {
                        const idx = section.editMode;
                        const item = section.items[idx] || {};
                        const isEdu = section.type === 'education';
                        const isExp = section.type === 'experience';
                        card.innerHTML = `
                            <div class="edit-entry-mode">
                                <div class="edit-entry-header">
                                    <h3>Edit Entry</h3>
                                    <div class="edit-entry-actions">
                                        <button class="action-icon" onclick="toggleSectionMode('${section.id}', 'default')"><i class="fa-solid fa-eye"></i></button>
                                        <button class="action-icon" onclick="deleteSectionEntry('${section.id}', ${idx}); toggleSectionMode('${section.id}', 'default')"><i class="fa-solid fa-trash-can"></i></button>
                                    </div>
                                </div>
                                
                                <div class="form-group" style="margin-bottom: 1rem;">
                                    <label class="entry-field-label">${isEdu ? 'Degree' : (isExp ? 'Job Title' : 'Role Title')}</label>
                                    <input type="text" class="form-input-dark" value="${item.role || ''}" oninput="updateSectionValue('${section.id}', ${idx}, 'role', this.value)" placeholder="Enter ${isEdu ? 'Degree / Field Of Study' : 'Job Title'}">
                                </div>
                                
                                <div class="form-group" style="margin-bottom: 1rem;">
                                    <label class="entry-field-label">${isEdu ? 'School' : (isExp ? 'Employer' : 'Company')}</label>
                                    <div style="position:relative;">
                                        <input type="text" class="form-input-dark" style="padding-right: 40px;" value="${item.title || ''}" oninput="updateSectionValue('${section.id}', ${idx}, 'title', this.value)" placeholder="Enter ${isEdu ? 'school / university' : 'employer'}">
                                        <button style="position:absolute; right:8px; top:50%; transform:translateY(-50%); background:rgba(255,255,255,0.1); border:none; border-radius:4px; padding:0.2rem 0.5rem; color:#d1d5db; cursor:pointer; font-size:0.75rem; display:flex; align-items:center; gap:4px;" onclick="prompt('Enter URL')"><i class="fa-solid fa-link"></i> Link</button>
                                    </div>
                                </div>
                                
                                <div class="form-grid-3">
                                    <div>
                                        <label class="entry-field-label">Start Date</label>
                                        <input type="text" class="form-input-dark" value="${(item.dateRange || '').split(' - ')[0] || ''}" oninput="updateDateRange('${section.id}', ${idx}, 0, this.value)" placeholder="MM/YYYY">
                                    </div>
                                    <div>
                                        <label class="entry-field-label">End Date</label>
                                        <input type="text" class="form-input-dark" value="${(item.dateRange || '').split(' - ')[1] || ''}" oninput="updateDateRange('${section.id}', ${idx}, 1, this.value)" placeholder="MM/YYYY">
                                    </div>
                                    <div>
                                        <label class="entry-field-label">Location</label>
                                        <input type="text" class="form-input-dark" value="${item.location || ''}" oninput="updateSectionValue('${section.id}', ${idx}, 'location', this.value)" placeholder="City, Country">
                                    </div>
                                </div>
                                
                                <label class="entry-field-label">Description</label>
                                <div class="rte-container">
                                    <div class="rte-toolbar">
                                        <button class="rte-btn" onclick="execRTECommand('bold')" title="Bold"><b>B</b></button>
                                        <button class="rte-btn" onclick="execRTECommand('italic')" title="Italic"><i>I</i></button>
                                        <button class="rte-btn" onclick="execRTECommand('underline')" title="Underline"><u>U</u></button>
                                        <div class="rte-separator"></div>
                                        <button class="rte-btn" onclick="execRTECommand('insertUnorderedList')" title="Bullet List"><i class="fa-solid fa-list-ul"></i></button>
                                        <button class="rte-btn" onclick="execRTECommand('createLink', prompt('Enter URL'))" title="Link"><i class="fa-solid fa-link"></i></button>
                                        <div class="rte-separator"></div>
                                        <button class="rte-btn active" onclick="execRTECommand('justifyLeft')" title="Align Left"><i class="fa-solid fa-align-left"></i></button>
                                        <button class="rte-btn" onclick="execRTECommand('justifyCenter')" title="Align Center"><i class="fa-solid fa-align-center"></i></button>
                                        <button class="rte-btn" onclick="execRTECommand('justifyRight')" title="Align Right"><i class="fa-solid fa-align-right"></i></button>
                                        <button class="rte-btn" onclick="execRTECommand('justifyFull')" title="Justify"><i class="fa-solid fa-align-justify"></i></button>
                                    </div>
                                    <div class="rte-content" contenteditable="true" oninput="updateSectionValue('${section.id}', ${idx}, 'desc', this.innerHTML)" placeholder="${isEdu ? 'Add a description of your education entry...' : 'Describe your role & achievements'}">${item.desc || ''}</div>
                                </div>
                                <div style="padding-top: 1rem; border-top: 1px solid rgba(255, 255, 255, 0.1);">
                                    <button class="btn-done-pink-large" onclick="toggleSectionMode('${section.id}', 'default')">
                                        <i class="fa-solid fa-check"></i> Done
                                    </button>
                                </div>
                            </div>
                        `;
                    } else {
                        // default mode
                        card.innerHTML = `
                            <div class="new-section-header" onclick="toggleSectionCollapse('${section.id}')" style="cursor:pointer;">
                                <div class="icon-container">
                                    <i class="${headerIcon}"></i>
                                </div>
                                <h3>${section.title || section.type.toUpperCase()}</h3>
                                <button class="btn-edit-heading" onclick="event.stopPropagation(); toggleSectionMode('${section.id}', 'heading')">
                                    <i class="fa-solid fa-pencil"></i> Edit Heading
                                </button>
                                <i class="fa-solid ${chevronClass} toggle-icon"></i>
                            </div>
                            <div class="new-section-body" style="${collapseStyle}">
                                ${(section.items || []).map((item, idx) => getEntryRowHTML(section.id, item, idx)).join('')}
                                <div class="add-entry-row">
                                    <button class="btn-add-new-entry" onclick="addSectionEntry('${section.id}')">
                                        <i class="fa-solid fa-plus"></i> Add Entry
                                    </button>
                                    <button class="delete-section-btn" onclick="deleteSection('${section.id}')">
                                        <i class="fa-solid fa-trash-can"></i>
                                    </button>
                                </div>
                            </div>
                        `;
                    }

                    const c = section.customizations || {};
                    let customizationsHTML = '';
                    if (section.type === 'education') {
                        customizationsHTML = `
                            <div class="customization-trigger-row" onclick="toggleSectionCustomizations('${section.id}')" style="cursor:pointer; display:flex; justify-content:space-between; padding: 1rem; border-top: 1px solid #222; background: #1a1a1a; border-radius: ${section.customizationsOpen ? '0' : '0 0 12px 12px'}; font-size: 0.9rem; color: #fff;">
                                <span><i class="fa-solid fa-sliders" style="margin-right:0.5rem; font-size:0.8rem;"></i> ${section.customizationsOpen ? 'Hide customizations for this section' : 'Show customizations for this section'}</span>
                                <i class="fa-solid ${section.customizationsOpen ? 'fa-chevron-up' : 'fa-chevron-down'}" style="font-size:0.8rem; transition: transform 0.3s ease;"></i>
                            </div>
                            <div style="display: ${section.customizationsOpen ? 'block' : 'none'}; padding: 1.5rem; background: #1e1e1e; border-top: 1px solid rgba(255,255,255,0.05); border-radius: 0 0 12px 12px;">
                                <h3 style="margin-bottom: 1rem; font-size: 1.1rem; font-weight: 600; color: #f0f0f0;">Education</h3>
                                <div style="font-size: 0.85rem; font-weight: 600; color: #aaa; margin-bottom: 0.5rem;">Title & Subtitle Order</div>
                                <div style="display: flex; gap: 0.5rem; margin-bottom: 1rem;">
                                    <button onclick="updateSectionCustomization('${section.id}', 'order', 'degree-school', false)" style="flex: 1; padding: 0.6rem; border-radius: 8px; border: 1px solid ${c.order === 'degree-school' || !c.order ? '#EEC30C' : '#444'}; background: ${c.order === 'degree-school' || !c.order ? 'rgba(238,195,12,0.1)' : '#2a2a2a'}; color: ${c.order === 'degree-school' || !c.order ? '#EEC30C' : '#aaa'}; font-size: 0.85rem; font-weight: 600; cursor: pointer; transition: all 0.2s;">
                                        Degree, School
                                    </button>
                                    <button onclick="updateSectionCustomization('${section.id}', 'order', 'school-degree', false)" style="flex: 1; padding: 0.6rem; border-radius: 8px; border: 1px solid ${c.order === 'school-degree' ? '#EEC30C' : '#444'}; background: ${c.order === 'school-degree' ? 'rgba(238,195,12,0.1)' : '#2a2a2a'}; color: ${c.order === 'school-degree' ? '#EEC30C' : '#aaa'}; font-size: 0.85rem; font-weight: 600; cursor: pointer; transition: all 0.2s;">
                                        School, Degree
                                    </button>
                                </div>
                                <div style="font-size: 0.75rem; color: #777;">Hint: Find additional customization options in <span style="text-decoration: underline; cursor: pointer; color:#aaa;" onclick="switchTab('customize')">Customize > Entry Layout</span></div>
                            </div>
                        `;
                    } else if (section.type === 'experience') {
                        customizationsHTML = `
                            <div class="customization-trigger-row" onclick="toggleSectionCustomizations('${section.id}')" style="cursor:pointer; display:flex; justify-content:space-between; padding: 1rem; border-top: 1px solid #222; background: #1a1a1a; border-radius: ${section.customizationsOpen ? '0' : '0 0 12px 12px'}; font-size: 0.9rem; color: #fff;">
                                <span><i class="fa-solid fa-sliders" style="margin-right:0.5rem; font-size:0.8rem;"></i> ${section.customizationsOpen ? 'Hide customizations for this section' : 'Show customizations for this section'}</span>
                                <i class="fa-solid ${section.customizationsOpen ? 'fa-chevron-up' : 'fa-chevron-down'}" style="font-size:0.8rem; transition: transform 0.3s ease;"></i>
                            </div>
                            <div style="display: ${section.customizationsOpen ? 'block' : 'none'}; padding: 1.5rem; background: #1e1e1e; border-top: 1px solid rgba(255,255,255,0.05); border-radius: 0 0 12px 12px;">
                                <h3 style="margin-bottom: 1rem; font-size: 1.1rem; font-weight: 600; color: #f0f0f0;">Work Experience</h3>
                                <div style="font-size: 0.85rem; font-weight: 600; color: #aaa; margin-bottom: 0.5rem;">Order title/subtitle</div>
                                <div style="display: flex; gap: 0.5rem; margin-bottom: 1rem;">
                                    <button onclick="updateSectionCustomization('${section.id}', 'order', 'title-employer', false)" style="flex: 1; padding: 0.6rem; border-radius: 8px; border: 1px solid ${c.order === 'title-employer' || !c.order ? '#EEC30C' : '#444'}; background: ${c.order === 'title-employer' || !c.order ? 'rgba(238,195,12,0.1)' : '#2a2a2a'}; color: ${c.order === 'title-employer' || !c.order ? '#EEC30C' : '#aaa'}; font-size: 0.85rem; font-weight: 600; cursor: pointer; transition: all 0.2s;">
                                        Job Title - Employer
                                    </button>
                                    <button onclick="updateSectionCustomization('${section.id}', 'order', 'employer-title', false)" style="flex: 1; padding: 0.6rem; border-radius: 8px; border: 1px solid ${c.order === 'employer-title' ? '#EEC30C' : '#444'}; background: ${c.order === 'employer-title' ? 'rgba(238,195,12,0.1)' : '#2a2a2a'}; color: ${c.order === 'employer-title' ? '#EEC30C' : '#aaa'}; font-size: 0.85rem; font-weight: 600; cursor: pointer; transition: all 0.2s;">
                                        Employer - Job Title
                                    </button>
                                </div>
                                <div style="font-size: 0.85rem; font-weight: 600; color: #aaa; margin-bottom: 0.5rem;">Employment History</div>
                                <div style="display:flex; align-items:center; gap: 12px;">
                                    <input type="checkbox" id="group-promo-${section.id}" ${c.groupPromotions ? 'checked' : ''} onchange="updateSectionCustomization('${section.id}', 'groupPromotions', this.checked, true)" style="width:16px; height:16px; cursor:pointer; accent-color: #EEC30C;">
                                    <label for="group-promo-${section.id}" style="color: #ccc; font-size: 0.9rem; cursor:pointer;">Group promotions</label>
                                </div>
                            </div>
                        `;
                    }
                    if (typeof section.editMode === 'number') {
                        card.innerHTML += customizationsHTML;
                    }
                    container.appendChild(card);
                    return;
                }
                // Projects
                if (section.type === 'projects') {
                    card.className = 'new-section-card';
                    const projRTE = `<div class="rte-toolbar"><button class="rte-btn" onclick="execRTECommand('bold')"><b>B</b></button><button class="rte-btn" onclick="execRTECommand('italic')"><i>I</i></button><button class="rte-btn" onclick="execRTECommand('underline')"><u>U</u></button><div class="rte-separator"></div><button class="rte-btn" onclick="execRTECommand('insertUnorderedList')"><i class="fa-solid fa-list-ul"></i></button><button class="rte-btn" onclick="execRTECommand('createLink',prompt('Enter URL'))"><i class="fa-solid fa-link"></i></button><div class="rte-separator"></div><button class="rte-btn active" onclick="execRTECommand('justifyLeft')"><i class="fa-solid fa-align-left"></i></button><button class="rte-btn" onclick="execRTECommand('justifyCenter')"><i class="fa-solid fa-align-center"></i></button><button class="rte-btn" onclick="execRTECommand('justifyRight')"><i class="fa-solid fa-align-right"></i></button><button class="rte-btn" onclick="execRTECommand('justifyFull')"><i class="fa-solid fa-align-justify"></i></button></div>`;
                    if (typeof section.editMode === 'number') {
                        const idx = section.editMode; const item = section.items[idx] || {};
                        card.innerHTML = `<div class="edit-entry-mode"><div class="edit-entry-header"><h3>Edit Entry</h3><div class="edit-entry-actions"><button class="action-icon" onclick="toggleSectionMode('${section.id}','default')"><i class="fa-solid fa-eye"></i></button><button class="action-icon" onclick="deleteSectionEntry('${section.id}',${idx});toggleSectionMode('${section.id}','default')"><i class="fa-solid fa-trash-can"></i></button></div></div><div class="form-group" style="margin-bottom:1rem;"><label class="entry-field-label">Project title</label><div style="position:relative;"><input type="text" class="form-input-dark" style="padding-right:60px;" value="${item.title||''}" oninput="updateSectionValue('${section.id}',${idx},'title',this.value)" placeholder="Enter Project title"><button style="position:absolute;right:8px;top:50%;transform:translateY(-50%);background:rgba(255,255,255,0.1);border:none;border-radius:4px;padding:0.2rem 0.5rem;color:#d1d5db;cursor:pointer;font-size:0.75rem;display:flex;align-items:center;gap:4px;" onclick="prompt('Enter URL')"><i class="fa-solid fa-link"></i> Link</button></div></div><div class="form-group" style="margin-bottom:1rem;"><label class="entry-field-label">Sub title</label><input type="text" class="form-input-dark" value="${item.role||''}" oninput="updateSectionValue('${section.id}',${idx},'role',this.value)" placeholder="Enter sub title"></div><div style="display:grid;grid-template-columns:1fr 1fr;gap:1rem;margin-bottom:1rem;"><div><label class="entry-field-label">Start Date</label><input type="text" class="form-input-dark" value="${(item.dateRange||'').split(' - ')[0]||''}" oninput="updateDateRange('${section.id}',${idx},0,this.value)" placeholder="MM/YYYY"></div><div><label class="entry-field-label">End Date</label><input type="text" class="form-input-dark" value="${(item.dateRange||'').split(' - ')[1]||''}" oninput="updateDateRange('${section.id}',${idx},1,this.value)" placeholder="MM/YYYY"></div></div><label class="entry-field-label">Description</label><div class="rte-container">${projRTE}<div class="rte-content" contenteditable="true" oninput="updateSectionValue('${section.id}',${idx},'desc',this.innerHTML)" placeholder="Describe the project and its outcomes...">${item.desc||''}</div></div><div style="padding-top:1rem;border-top:1px solid rgba(255,255,255,0.1);"><button class="btn-done-pink-large" onclick="toggleSectionMode('${section.id}','default')"><i class="fa-solid fa-check"></i> Done</button></div></div>`;
                    } else {
                        card.innerHTML = `<div class="new-section-header" onclick="toggleSectionCollapse('${section.id}')" style="cursor:pointer;"><div class="icon-container"><i class="${headerIcon}"></i></div><h3>${section.title||'Projects'}</h3><button class="btn-edit-heading" onclick="event.stopPropagation(); toggleSectionMode('${section.id}','heading')"><i class="fa-solid fa-pencil"></i> Edit Heading</button><i class="fa-solid ${chevronClass} toggle-icon"></i></div><div class="new-section-body" style="${collapseStyle}">${(section.items||[]).map((item,idx)=>getEntryRowHTML(section.id, item, idx)).join('')}<div class="add-entry-row"><button class="btn-add-new-entry" onclick="addSectionEntry('${section.id}')"><i class="fa-solid fa-plus"></i> Add Entry</button><button class="delete-section-btn" onclick="deleteSection('${section.id}')"><i class="fa-solid fa-trash-can"></i></button></div></div>`;
                    }
                    if (typeof section.editMode === 'number') {
                        card.innerHTML += getSectionLayoutCustomizationsHTML(section, 'Projects');
                    }
                    container.appendChild(card); return;
                }
                if (section.type === 'courses') {
                    card.className = 'new-section-card';
                    const cRTE = `<div class="rte-toolbar"><button class="rte-btn" onclick="execRTECommand('bold')"><b>B</b></button><button class="rte-btn" onclick="execRTECommand('italic')"><i>I</i></button><button class="rte-btn" onclick="execRTECommand('underline')"><u>U</u></button><div class="rte-separator"></div><button class="rte-btn" onclick="execRTECommand('insertUnorderedList')"><i class="fa-solid fa-list-ul"></i></button><button class="rte-btn" onclick="execRTECommand('createLink',prompt('Enter URL'))"><i class="fa-solid fa-link"></i></button><div class="rte-separator"></div><button class="rte-btn active" onclick="execRTECommand('justifyLeft')"><i class="fa-solid fa-align-left"></i></button><button class="rte-btn" onclick="execRTECommand('justifyCenter')"><i class="fa-solid fa-align-center"></i></button><button class="rte-btn" onclick="execRTECommand('justifyRight')"><i class="fa-solid fa-align-right"></i></button><button class="rte-btn" onclick="execRTECommand('justifyFull')"><i class="fa-solid fa-align-justify"></i></button></div>`;
                    if (typeof section.editMode === 'number') {
                        const idx = section.editMode; const item = section.items[idx] || {};
                        card.innerHTML = `<div class="edit-entry-mode"><div class="edit-entry-header"><h3>Edit Entry</h3><div class="edit-entry-actions"><button class="action-icon" onclick="toggleSectionMode('${section.id}','default')"><i class="fa-solid fa-eye"></i></button><button class="action-icon" onclick="deleteSectionEntry('${section.id}',${idx});toggleSectionMode('${section.id}','default')"><i class="fa-solid fa-trash-can"></i></button></div></div><div class="form-group" style="margin-bottom:1rem;"><label class="entry-field-label">Course title</label><div style="position:relative;"><input type="text" class="form-input-dark" style="padding-right:60px;" value="${item.name||''}" oninput="updateSectionValue('${section.id}',${idx},'name',this.value)" placeholder="Enter course title"><button style="position:absolute;right:8px;top:50%;transform:translateY(-50%);background:rgba(255,255,255,0.1);border:none;border-radius:4px;padding:0.2rem 0.5rem;color:#d1d5db;cursor:pointer;font-size:0.75rem;display:flex;align-items:center;gap:4px;" onclick="prompt('Enter URL')"><i class="fa-solid fa-link"></i> Link</button></div></div><div class="form-group" style="margin-bottom:1rem;"><label class="entry-field-label">Institution</label><input type="text" class="form-input-dark" value="${item.institution||''}" oninput="updateSectionValue('${section.id}',${idx},'institution',this.value)" placeholder="Enter Institution"></div><div class="form-grid-3" style="margin-bottom:1rem;"><div><label class="entry-field-label">Start Date</label><input type="text" class="form-input-dark" value="${(item.dateRange||'').split(' - ')[0]||''}" oninput="updateDateRange('${section.id}',${idx},0,this.value)" placeholder="MM/YYYY"></div><div><label class="entry-field-label">End Date</label><input type="text" class="form-input-dark" value="${(item.dateRange||'').split(' - ')[1]||''}" oninput="updateDateRange('${section.id}',${idx},1,this.value)" placeholder="MM/YYYY"></div><div><label class="entry-field-label">Location</label><input type="text" class="form-input-dark" value="${item.location||''}" oninput="updateSectionValue('${section.id}',${idx},'location',this.value)" placeholder="City, Country"></div></div><label class="entry-field-label">Description</label><div class="rte-container">${cRTE}<div class="rte-content" contenteditable="true" oninput="updateSectionValue('${section.id}',${idx},'desc',this.innerHTML)" placeholder="Describe the course...">${item.desc||''}</div></div><div style="padding-top:1rem;border-top:1px solid rgba(255,255,255,0.1);"><button class="btn-done-pink-large" onclick="toggleSectionMode('${section.id}','default')"><i class="fa-solid fa-check"></i> Done</button></div></div>`;
                    } else {
                        card.innerHTML = `<div class="new-section-header" onclick="toggleSectionCollapse('${section.id}')" style="cursor:pointer;"><div class="icon-container"><i class="${headerIcon}"></i></div><h3>${section.title||'Courses'}</h3><button class="btn-edit-heading" onclick="event.stopPropagation(); toggleSectionMode('${section.id}','heading')"><i class="fa-solid fa-pencil"></i> Edit Heading</button><i class="fa-solid ${chevronClass} toggle-icon"></i></div><div class="new-section-body" style="${collapseStyle}">${(section.items||[]).map((item,idx)=>getEntryRowHTML(section.id, item, idx)).join('')}<div class="add-entry-row"><button class="btn-add-new-entry" onclick="addSectionEntry('${section.id}')"><i class="fa-solid fa-plus"></i> Add Entry</button><button class="delete-section-btn" onclick="deleteSection('${section.id}')"><i class="fa-solid fa-trash-can"></i></button></div></div>`;
                    }
                    if (typeof section.editMode === 'number') {
                        card.innerHTML += getSectionLayoutCustomizationsHTML(section, 'Courses');
                    }
                    container.appendChild(card); return;
                }
                if (section.type === 'awards') {
                    card.className = 'new-section-card';
                    const aRTE = `<div class="rte-toolbar"><button class="rte-btn" onclick="execRTECommand('bold')"><b>B</b></button><button class="rte-btn" onclick="execRTECommand('italic')"><i>I</i></button><button class="rte-btn" onclick="execRTECommand('underline')"><u>U</u></button><div class="rte-separator"></div><button class="rte-btn" onclick="execRTECommand('insertUnorderedList')"><i class="fa-solid fa-list-ul"></i></button><button class="rte-btn" onclick="execRTECommand('createLink',prompt('Enter URL'))"><i class="fa-solid fa-link"></i></button><div class="rte-separator"></div><button class="rte-btn active" onclick="execRTECommand('justifyLeft')"><i class="fa-solid fa-align-left"></i></button><button class="rte-btn" onclick="execRTECommand('justifyCenter')"><i class="fa-solid fa-align-center"></i></button><button class="rte-btn" onclick="execRTECommand('justifyRight')"><i class="fa-solid fa-align-right"></i></button><button class="rte-btn" onclick="execRTECommand('justifyFull')"><i class="fa-solid fa-align-justify"></i></button></div>`;
                    const days=[...Array(31)].map((_,i)=>i+1); const months=['January','February','March','April','May','June','July','August','September','October','November','December']; const years=[...Array(50)].map((_,i)=>new Date().getFullYear()-i);
                    if (typeof section.editMode === 'number') {
                        const idx = section.editMode; const item = section.items[idx] || {};
                        card.innerHTML = `<div class="edit-entry-mode"><div class="edit-entry-header"><h3>Edit Entry</h3><div class="edit-entry-actions"><button class="action-icon" onclick="toggleSectionMode('${section.id}','default')"><i class="fa-solid fa-eye"></i></button><button class="action-icon" onclick="deleteSectionEntry('${section.id}',${idx});toggleSectionMode('${section.id}','default')"><i class="fa-solid fa-trash-can"></i></button></div></div><div class="form-group" style="margin-bottom:1rem;"><label class="entry-field-label">Award</label><div style="position:relative;"><input type="text" class="form-input-dark" style="padding-right:60px;" value="${item.name||''}" oninput="updateSectionValue('${section.id}',${idx},'name',this.value)" placeholder="Enter award"><button style="position:absolute;right:8px;top:50%;transform:translateY(-50%);background:rgba(255,255,255,0.1);border:none;border-radius:4px;padding:0.2rem 0.5rem;color:#d1d5db;cursor:pointer;font-size:0.75rem;display:flex;align-items:center;gap:4px;" onclick="prompt('Enter URL')"><i class="fa-solid fa-link"></i> Link</button></div></div><div class="form-group" style="margin-bottom:1rem;"><label class="entry-field-label">Issuer</label><input type="text" class="form-input-dark" value="${item.issuer||''}" oninput="updateSectionValue('${section.id}',${idx},'issuer',this.value)" placeholder="Enter Issuer"></div><label class="entry-field-label">Date</label><div class="form-grid-3" style="margin-bottom:0.5rem;"><div><select class="form-input-dark" onchange="updateSectionValue('${section.id}',${idx},'day',this.value)" style="appearance:auto;cursor:pointer;"><option value="">Day</option>${days.map(d=>`<option value="${d}" ${item.day==d?'selected':''}>${d}</option>`).join('')}</select></div><div><select class="form-input-dark" onchange="updateSectionValue('${section.id}',${idx},'month',this.value)" style="appearance:auto;cursor:pointer;"><option value="">Month</option>${months.map(m=>`<option value="${m}" ${item.month===m?'selected':''}>${m}</option>`).join('')}</select></div><div><select class="form-input-dark" onchange="updateSectionValue('${section.id}',${idx},'year',this.value)" style="appearance:auto;cursor:pointer;"><option value="">Year</option>${years.map(y=>`<option value="${y}" ${item.year==y?'selected':''}>${y}</option>`).join('')}</select></div></div><div style="display:flex;gap:1.5rem;margin-bottom:1rem;"><label style="display:flex;align-items:center;gap:0.5rem;font-size:0.8rem;color:#9ca3af;cursor:pointer;"><input type="checkbox" ${item.hideDay?'checked':''} onchange="updateSectionValue('${section.id}',${idx},'hideDay',this.checked)"> Don't show</label><label style="display:flex;align-items:center;gap:0.5rem;font-size:0.8rem;color:#9ca3af;cursor:pointer;"><input type="checkbox" ${item.hideMonth?'checked':''} onchange="updateSectionValue('${section.id}',${idx},'hideMonth',this.checked)"> Don't show</label></div><label class="entry-field-label">Description</label><div class="rte-container">${aRTE}<div class="rte-content" contenteditable="true" oninput="updateSectionValue('${section.id}',${idx},'desc',this.innerHTML)" placeholder="Describe your award...">${item.desc||''}</div></div><div style="padding-top:1rem;border-top:1px solid rgba(255,255,255,0.1);"><button class="btn-done-pink-large" onclick="toggleSectionMode('${section.id}','default')"><i class="fa-solid fa-check"></i> Done</button></div></div>`;
                    } else {
                        card.innerHTML = `<div class="new-section-header" onclick="toggleSectionCollapse('${section.id}')" style="cursor:pointer;"><div class="icon-container"><i class="${headerIcon}"></i></div><h3>${section.title||'Awards'}</h3><button class="btn-edit-heading" onclick="event.stopPropagation(); toggleSectionMode('${section.id}','heading')"><i class="fa-solid fa-pencil"></i> Edit Heading</button><i class="fa-solid ${chevronClass} toggle-icon"></i></div><div class="new-section-body" style="${collapseStyle}">${(section.items||[]).map((item,idx)=>getEntryRowHTML(section.id, item, idx)).join('')}<div class="add-entry-row"><button class="btn-add-new-entry" onclick="addSectionEntry('${section.id}')"><i class="fa-solid fa-plus"></i> Add Entry</button><button class="delete-section-btn" onclick="deleteSection('${section.id}')"><i class="fa-solid fa-trash-can"></i></button></div></div>`;
                    }
                    if (typeof section.editMode === 'number') {
                        card.innerHTML += getSectionLayoutCustomizationsHTML(section, 'Awards');
                    }
                    container.appendChild(card); return;
                }
                if (section.type === 'organisations') {
                    card.className = 'new-section-card';
                    const oRTE = `<div class="rte-toolbar"><button class="rte-btn" onclick="execRTECommand('bold')"><b>B</b></button><button class="rte-btn" onclick="execRTECommand('italic')"><i>I</i></button><button class="rte-btn" onclick="execRTECommand('underline')"><u>U</u></button><div class="rte-separator"></div><button class="rte-btn" onclick="execRTECommand('insertUnorderedList')"><i class="fa-solid fa-list-ul"></i></button><button class="rte-btn" onclick="execRTECommand('createLink',prompt('Enter URL'))"><i class="fa-solid fa-link"></i></button><div class="rte-separator"></div><button class="rte-btn active" onclick="execRTECommand('justifyLeft')"><i class="fa-solid fa-align-left"></i></button><button class="rte-btn" onclick="execRTECommand('justifyCenter')"><i class="fa-solid fa-align-center"></i></button><button class="rte-btn" onclick="execRTECommand('justifyRight')"><i class="fa-solid fa-align-right"></i></button><button class="rte-btn" onclick="execRTECommand('justifyFull')"><i class="fa-solid fa-align-justify"></i></button></div>`;
                    if (typeof section.editMode === 'number') {
                        const idx = section.editMode; const item = section.items[idx] || {};
                        card.innerHTML = `<div class="edit-entry-mode"><div class="edit-entry-header"><h3>Edit Entry</h3><div class="edit-entry-actions"><button class="action-icon" onclick="toggleSectionMode('${section.id}','default')"><i class="fa-solid fa-eye"></i></button><button class="action-icon" onclick="deleteSectionEntry('${section.id}',${idx});toggleSectionMode('${section.id}','default')"><i class="fa-solid fa-trash-can"></i></button></div></div><div class="form-group" style="margin-bottom:1rem;"><label class="entry-field-label">Organization</label><div style="position:relative;"><input type="text" class="form-input-dark" style="padding-right:60px;" value="${item.name||''}" oninput="updateSectionValue('${section.id}',${idx},'name',this.value)" placeholder="Enter the organization's name"><button style="position:absolute;right:8px;top:50%;transform:translateY(-50%);background:rgba(255,255,255,0.1);border:none;border-radius:4px;padding:0.2rem 0.5rem;color:#d1d5db;cursor:pointer;font-size:0.75rem;display:flex;align-items:center;gap:4px;" onclick="prompt('Enter URL')"><i class="fa-solid fa-link"></i> Link</button></div></div><div class="form-group" style="margin-bottom:1rem;"><label class="entry-field-label">Position</label><input type="text" class="form-input-dark" value="${item.position||''}" oninput="updateSectionValue('${section.id}',${idx},'position',this.value)" placeholder="Enter position at the organization"></div><div class="form-grid-3" style="margin-bottom:1rem;"><div><label class="entry-field-label">Start Date</label><input type="text" class="form-input-dark" value="${(item.dateRange||'').split(' - ')[0]||''}" oninput="updateDateRange('${section.id}',${idx},0,this.value)" placeholder="MM/YYYY"></div><div><label class="entry-field-label">End Date</label><input type="text" class="form-input-dark" value="${(item.dateRange||'').split(' - ')[1]||''}" oninput="updateDateRange('${section.id}',${idx},1,this.value)" placeholder="MM/YYYY"></div><div><label class="entry-field-label">Location</label><input type="text" class="form-input-dark" value="${item.location||''}" oninput="updateSectionValue('${section.id}',${idx},'location',this.value)" placeholder="City, Country"></div></div><label class="entry-field-label">Description</label><div class="rte-container">${oRTE}<div class="rte-content" contenteditable="true" oninput="updateSectionValue('${section.id}',${idx},'desc',this.innerHTML)" placeholder="Describe the organization &amp; your role in it">${item.desc||''}</div></div><div style="padding-top:1rem;border-top:1px solid rgba(255,255,255,0.1);"><button class="btn-done-pink-large" onclick="toggleSectionMode('${section.id}','default')"><i class="fa-solid fa-check"></i> Done</button></div></div>`;
                    } else {
                        card.innerHTML = `<div class="new-section-header" onclick="toggleSectionCollapse('${section.id}')" style="cursor:pointer;"><div class="icon-container"><i class="${headerIcon}"></i></div><h3>${section.title||'Organisations'}</h3><button class="btn-edit-heading" onclick="event.stopPropagation(); toggleSectionMode('${section.id}','heading')"><i class="fa-solid fa-pencil"></i> Edit Heading</button><i class="fa-solid ${chevronClass} toggle-icon"></i></div><div class="new-section-body" style="${collapseStyle}">${(section.items||[]).map((item,idx)=>getEntryRowHTML(section.id, item, idx)).join('')}<div class="add-entry-row"><button class="btn-add-new-entry" onclick="addSectionEntry('${section.id}')"><i class="fa-solid fa-plus"></i> Add Entry</button><button class="delete-section-btn" onclick="deleteSection('${section.id}')"><i class="fa-solid fa-trash-can"></i></button></div></div>`;
                    }
                    if (typeof section.editMode === 'number') {
                        card.innerHTML += getSectionLayoutCustomizationsHTML(section, 'Organisations');
                    }
                    container.appendChild(card); return;
                }
                if (section.type === 'publications') {
                    card.className = 'new-section-card';
                    const pRTE = `<div class="rte-toolbar"><button class="rte-btn" onclick="execRTECommand('bold')"><b>B</b></button><button class="rte-btn" onclick="execRTECommand('italic')"><i>I</i></button><button class="rte-btn" onclick="execRTECommand('underline')"><u>U</u></button><div class="rte-separator"></div><button class="rte-btn" onclick="execRTECommand('insertUnorderedList')"><i class="fa-solid fa-list-ul"></i></button><button class="rte-btn" onclick="execRTECommand('createLink',prompt('Enter URL'))"><i class="fa-solid fa-link"></i></button><div class="rte-separator"></div><button class="rte-btn active" onclick="execRTECommand('justifyLeft')"><i class="fa-solid fa-align-left"></i></button><button class="rte-btn" onclick="execRTECommand('justifyCenter')"><i class="fa-solid fa-align-center"></i></button><button class="rte-btn" onclick="execRTECommand('justifyRight')"><i class="fa-solid fa-align-right"></i></button><button class="rte-btn" onclick="execRTECommand('justifyFull')"><i class="fa-solid fa-align-justify"></i></button></div>`;
                    const days2=[...Array(31)].map((_,i)=>i+1); const months2=['January','February','March','April','May','June','July','August','September','October','November','December']; const years2=[...Array(50)].map((_,i)=>new Date().getFullYear()-i);
                    if (typeof section.editMode === 'number') {
                        const idx = section.editMode; const item = section.items[idx] || {};
                        card.innerHTML = `<div class="edit-entry-mode"><div class="edit-entry-header"><h3>Edit Entry</h3><div class="edit-entry-actions"><button class="action-icon" onclick="toggleSectionMode('${section.id}','default')"><i class="fa-solid fa-eye"></i></button><button class="action-icon" onclick="deleteSectionEntry('${section.id}',${idx});toggleSectionMode('${section.id}','default')"><i class="fa-solid fa-trash-can"></i></button></div></div><div class="form-group" style="margin-bottom:1rem;"><label class="entry-field-label">Title</label><div style="position:relative;"><input type="text" class="form-input-dark" style="padding-right:60px;" value="${item.name||''}" oninput="updateSectionValue('${section.id}',${idx},'name',this.value)" placeholder="Enter the title of your publication"><button style="position:absolute;right:8px;top:50%;transform:translateY(-50%);background:rgba(255,255,255,0.1);border:none;border-radius:4px;padding:0.2rem 0.5rem;color:#d1d5db;cursor:pointer;font-size:0.75rem;display:flex;align-items:center;gap:4px;" onclick="prompt('Enter URL')"><i class="fa-solid fa-link"></i> Link</button></div></div><div class="form-group" style="margin-bottom:1rem;"><label class="entry-field-label">Publisher</label><input type="text" class="form-input-dark" value="${item.publisher||''}" oninput="updateSectionValue('${section.id}',${idx},'publisher',this.value)" placeholder="Enter the publisher's name"></div><label class="entry-field-label">Date</label><div class="form-grid-3" style="margin-bottom:0.5rem;"><div><select class="form-input-dark" onchange="updateSectionValue('${section.id}',${idx},'day',this.value)" style="appearance:auto;cursor:pointer;"><option value="">Day</option>${days2.map(d=>`<option value="${d}" ${item.day==d?'selected':''}>${d}</option>`).join('')}</select></div><div><select class="form-input-dark" onchange="updateSectionValue('${section.id}',${idx},'month',this.value)" style="appearance:auto;cursor:pointer;"><option value="">Month</option>${months2.map(m=>`<option value="${m}" ${item.month===m?'selected':''}>${m}</option>`).join('')}</select></div><div><select class="form-input-dark" onchange="updateSectionValue('${section.id}',${idx},'year',this.value)" style="appearance:auto;cursor:pointer;"><option value="">Year</option>${years2.map(y=>`<option value="${y}" ${item.year==y?'selected':''}>${y}</option>`).join('')}</select></div></div><div style="display:flex;gap:1.5rem;margin-bottom:1rem;"><label style="display:flex;align-items:center;gap:0.5rem;font-size:0.8rem;color:#9ca3af;cursor:pointer;"><input type="checkbox" ${item.hideDay?'checked':''} onchange="updateSectionValue('${section.id}',${idx},'hideDay',this.checked)"> Don't show</label><label style="display:flex;align-items:center;gap:0.5rem;font-size:0.8rem;color:#9ca3af;cursor:pointer;"><input type="checkbox" ${item.hideMonth?'checked':''} onchange="updateSectionValue('${section.id}',${idx},'hideMonth',this.checked)"> Don't show</label></div><label class="entry-field-label">Description</label><div class="rte-container">${pRTE}<div class="rte-content" contenteditable="true" oninput="updateSectionValue('${section.id}',${idx},'desc',this.innerHTML)" placeholder="Describe your publication...">${item.desc||''}</div></div><div style="padding-top:1rem;border-top:1px solid rgba(255,255,255,0.1);"><button class="btn-done-pink-large" onclick="toggleSectionMode('${section.id}','default')"><i class="fa-solid fa-check"></i> Done</button></div></div>`;
                    } else {
                        card.innerHTML = `<div class="new-section-header" onclick="toggleSectionCollapse('${section.id}')" style="cursor:pointer;"><div class="icon-container"><i class="${headerIcon}"></i></div><h3>${section.title||'Publications'}</h3><button class="btn-edit-heading" onclick="event.stopPropagation(); toggleSectionMode('${section.id}','heading')"><i class="fa-solid fa-pencil"></i> Edit Heading</button><i class="fa-solid ${chevronClass} toggle-icon"></i></div><div class="new-section-body" style="${collapseStyle}">${(section.items||[]).map((item,idx)=>getEntryRowHTML(section.id, item, idx)).join('')}<div class="add-entry-row"><button class="btn-add-new-entry" onclick="addSectionEntry('${section.id}')"><i class="fa-solid fa-plus"></i> Add Entry</button><button class="delete-section-btn" onclick="deleteSection('${section.id}')"><i class="fa-solid fa-trash-can"></i></button></div></div>`;
                    }
                    if (typeof section.editMode === 'number') {
                        card.innerHTML += getSectionLayoutCustomizationsHTML(section, 'Publications');
                    }
                    container.appendChild(card);
                    return;
                }
                if (section.type === 'references') {
                    card.className = 'new-section-card';
                    if (typeof section.editMode === 'number') {
                        const idx = section.editMode; const item = section.items[idx] || {};
                        card.innerHTML = `<div class="edit-entry-mode"><div class="edit-entry-header"><h3>Edit Entry</h3><div class="edit-entry-actions"><button class="action-icon" onclick="toggleSectionMode('${section.id}','default')"><i class="fa-solid fa-eye"></i></button><button class="action-icon" onclick="deleteSectionEntry('${section.id}',${idx});toggleSectionMode('${section.id}','default')"><i class="fa-solid fa-trash-can"></i></button></div></div><div class="form-group" style="margin-bottom:1rem;"><label class="entry-field-label">Name</label><div style="position:relative;"><input type="text" class="form-input-dark" style="padding-right:60px;" value="${item.name||''}" oninput="updateSectionValue('${section.id}',${idx},'name',this.value)" placeholder="Enter the full name"><button style="position:absolute;right:8px;top:50%;transform:translateY(-50%);background:rgba(255,255,255,0.1);border:none;border-radius:4px;padding:0.2rem 0.5rem;color:#d1d5db;cursor:pointer;font-size:0.75rem;display:flex;align-items:center;gap:4px;" onclick="prompt('Enter URL')"><i class="fa-solid fa-link"></i> Link</button></div></div><div style="display:grid;grid-template-columns:1fr 1fr;gap:1rem;margin-bottom:1rem;"><div><label class="entry-field-label">Job Title</label><input type="text" class="form-input-dark" value="${item.role||''}" oninput="updateSectionValue('${section.id}',${idx},'role',this.value)" placeholder="Enter job title"></div><div><label class="entry-field-label">Organization</label><input type="text" class="form-input-dark" value="${item.organization||''}" oninput="updateSectionValue('${section.id}',${idx},'organization',this.value)" placeholder="Enter Organization"></div></div><div style="display:grid;grid-template-columns:1fr 1fr;gap:1rem;margin-bottom:1rem;"><div><label class="entry-field-label">Email</label><input type="text" class="form-input-dark" value="${item.email||''}" oninput="updateSectionValue('${section.id}',${idx},'email',this.value)" placeholder="Enter Email"></div><div><label class="entry-field-label">Phone</label><input type="text" class="form-input-dark" value="${item.phone||''}" oninput="updateSectionValue('${section.id}',${idx},'phone',this.value)" placeholder="Enter a phone number"></div></div><div style="padding-top:1rem;border-top:1px solid rgba(255,255,255,0.1);"><button class="btn-done-pink-large" onclick="toggleSectionMode('${section.id}','default')"><i class="fa-solid fa-check"></i> Done</button></div></div>`;
                    } else {
                        card.innerHTML = `<div class="new-section-header" onclick="toggleSectionCollapse('${section.id}')" style="cursor:pointer;"><div class="icon-container"><i class="${headerIcon}"></i></div><h3>${section.title||'References'}</h3><button class="btn-edit-heading" onclick="event.stopPropagation(); toggleSectionMode('${section.id}','heading')"><i class="fa-solid fa-pencil"></i> Edit Heading</button><i class="fa-solid ${chevronClass} toggle-icon"></i></div><div class="new-section-body" style="${collapseStyle}">${(section.items||[]).map((item,idx)=>getEntryRowHTML(section.id, item, idx)).join('')}<div class="add-entry-row"><button class="btn-add-new-entry" onclick="addSectionEntry('${section.id}')"><i class="fa-solid fa-plus"></i> Add Entry</button><button class="delete-section-btn" onclick="deleteSection('${section.id}')"><i class="fa-solid fa-trash-can"></i></button></div></div>`;
                    }
                    container.appendChild(card); return;
                }
                // Declaration
                if (section.type === 'declaration') {
                    card.className = 'new-section-card';
                    if (typeof section.editMode === 'number') {
                        const idx = section.editMode; const item = section.items[idx] || {};
                        const c = section.customizations || {};
                        card.innerHTML = `<div class="edit-entry-mode"><div class="edit-entry-header"><h3>Edit Entry</h3><div class="edit-entry-actions"><button class="action-icon" onclick="toggleSectionMode('${section.id}','default')"><i class="fa-solid fa-eye"></i></button><button class="action-icon" onclick="deleteSectionEntry('${section.id}',${idx});toggleSectionMode('${section.id}','default')"><i class="fa-solid fa-trash-can"></i></button></div></div><div class="form-group" style="margin-bottom:1rem;"><label class="entry-field-label">Text</label><textarea class="form-input-dark" style="min-height:80px;" oninput="updateSectionValue('${section.id}',${idx},'desc',this.value)" placeholder="Enter declaration text">${item.desc||''}</textarea></div><div class="form-group" style="margin-bottom:1rem;"><label class="entry-field-label">Signature</label><button style="background:transparent;border:1px solid rgba(255,255,255,0.2);color:#fff;padding:0.5rem 1rem;border-radius:6px;cursor:pointer;display:inline-flex;align-items:center;gap:8px;" onclick="prompt('Upload Signature')"><i class="fa-solid fa-plus"></i> Create / Upload</button></div><div class="form-group" style="margin-bottom:1rem;"><label class="entry-field-label">Full name</label><input type="text" class="form-input-dark" value="${item.name||''}" oninput="updateSectionValue('${section.id}',${idx},'name',this.value)" placeholder="Enter full name"></div><div style="display:grid;grid-template-columns:1fr 1fr;gap:1rem;margin-bottom:1rem;"><div><label class="entry-field-label">Place</label><input type="text" class="form-input-dark" value="${item.location||''}" oninput="updateSectionValue('${section.id}',${idx},'location',this.value)" placeholder="Enter place"></div><div><label class="entry-field-label">Date</label><input type="text" class="form-input-dark" value="${item.dateRange||''}" oninput="updateSectionValue('${section.id}',${idx},'dateRange',this.value)" placeholder="Enter date"></div></div><div style="padding-top:1rem;border-top:1px solid rgba(255,255,255,0.1);"><button class="btn-done-pink-large" onclick="toggleSectionMode('${section.id}','default')"><i class="fa-solid fa-check"></i> Done</button></div></div>`;
                        const declPos = c.position || 'Left';
                        const declSig = c.signatureLine || 'None';
                        const declCustomHTML = `
                            <div class="customization-trigger-row" onclick="toggleSectionCustomizations('${section.id}')" style="cursor:pointer; display:flex; justify-content:space-between; padding: 1rem; border-top: 1px solid #222; background: #1a1a1a; border-radius: ${section.customizationsOpen ? '0' : '0 0 12px 12px'}; font-size: 0.9rem; color: #fff;">
                                <span><i class="fa-solid fa-sliders" style="margin-right:0.5rem; font-size:0.8rem;"></i> ${section.customizationsOpen ? 'Hide customizations for this section' : 'Show customizations for this section'}</span>
                                <i class="fa-solid ${section.customizationsOpen ? 'fa-chevron-up' : 'fa-chevron-down'}" style="font-size:0.8rem;"></i>
                            </div>
                            <div style="display: ${section.customizationsOpen ? 'block' : 'none'}; padding: 1.5rem; background: #1e1e1e; border-top: 1px solid rgba(255,255,255,0.05); border-radius: 0 0 12px 12px;">
                                <h3 style="margin-bottom: 1rem; font-size: 1.1rem; font-weight: 600; color: #f0f0f0;">Declaration</h3>
                                <div style="display:flex; align-items:center; gap: 12px; margin-bottom: 1rem;">
                                    <input type="checkbox" id="decl-heading-${section.id}" ${c.showHeading !== false ? 'checked' : ''} onchange="updateSectionCustomization('${section.id}', 'showHeading', this.checked, true)" style="width:16px; height:16px; cursor:pointer; accent-color: #EEC30C;">
                                    <label for="decl-heading-${section.id}" style="color: #ccc; font-size:0.9rem; cursor:pointer;">Show section heading</label>
                                </div>
                                <div style="font-size: 0.85rem; font-weight: 600; color: #aaa; margin-bottom: 0.5rem;">Position</div>
                                <div style="display:flex; gap: 8px; margin-bottom: 1rem;">
                                    <button onclick="updateSectionCustomization('${section.id}', 'position', 'Left', true)" style="flex:1; padding:0.5rem; border:1px solid ${declPos === 'Left' ? '#EEC30C' : '#444'}; border-radius:8px; background:${declPos === 'Left' ? 'rgba(238,195,12,0.1)' : 'transparent'}; color:${declPos === 'Left' ? '#EEC30C' : '#ccc'}; cursor:pointer; font-size:0.85rem;">Left</button>
                                    <button onclick="updateSectionCustomization('${section.id}', 'position', 'Right', true)" style="flex:1; padding:0.5rem; border:1px solid ${declPos === 'Right' ? '#EEC30C' : '#444'}; border-radius:8px; background:${declPos === 'Right' ? 'rgba(238,195,12,0.1)' : 'transparent'}; color:${declPos === 'Right' ? '#EEC30C' : '#ccc'}; cursor:pointer; font-size:0.85rem;">Right</button>
                                </div>
                                <div style="font-size: 0.85rem; font-weight: 600; color: #aaa; margin-bottom: 0.5rem;">Signature Line</div>
                                <div style="display:flex; gap: 8px; margin-bottom: 1rem;">
                                    <button onclick="updateSectionCustomization('${section.id}', 'signatureLine', 'None', true)" style="flex:1; padding:0.5rem; border:1px solid ${declSig === 'None' ? '#EEC30C' : '#444'}; border-radius:8px; background:${declSig === 'None' ? 'rgba(238,195,12,0.1)' : 'transparent'}; color:${declSig === 'None' ? '#EEC30C' : '#ccc'}; cursor:pointer; font-size:0.85rem;">None</button>
                                    <button onclick="updateSectionCustomization('${section.id}', 'signatureLine', 'Solid', true)" style="flex:1; padding:0.5rem; border:1px solid ${declSig === 'Solid' ? '#EEC30C' : '#444'}; border-radius:8px; background:${declSig === 'Solid' ? 'rgba(238,195,12,0.1)' : 'transparent'}; color:${declSig === 'Solid' ? '#EEC30C' : '#ccc'}; cursor:pointer; font-size:0.85rem;">Solid</button>
                                </div>
                            </div>
                        `;
                        card.innerHTML += declCustomHTML;
                    } else {
                        card.innerHTML = `<div class="new-section-header" onclick="toggleSectionCollapse('${section.id}')" style="cursor:pointer;"><div class="icon-container"><i class="${headerIcon}"></i></div><h3>${section.title||'Declaration'}</h3><button class="btn-edit-heading" onclick="event.stopPropagation(); toggleSectionMode('${section.id}','heading')"><i class="fa-solid fa-pencil"></i> Edit Heading</button><i class="fa-solid ${chevronClass} toggle-icon"></i></div><div class="new-section-body" style="${collapseStyle}">${(section.items||[]).map((item,idx)=>getEntryRowHTML(section.id, item, idx)).join('')}<div class="add-entry-row"><button class="btn-add-new-entry" onclick="addSectionEntry('${section.id}')"><i class="fa-solid fa-plus"></i> Add Entry</button><button class="delete-section-btn" onclick="deleteSection('${section.id}')"><i class="fa-solid fa-trash-can"></i></button></div></div>`;
                    }
                    container.appendChild(card); return;
                }
                // Custom
                if (section.type === 'custom' || section.type === 'customs') {
                    card.className = 'new-section-card';
                    const cRTE = `<div class="rte-toolbar"><button class="rte-btn" onclick="execRTECommand('bold')"><b>B</b></button><button class="rte-btn" onclick="execRTECommand('italic')"><i>I</i></button><button class="rte-btn" onclick="execRTECommand('underline')"><u>U</u></button><div class="rte-separator"></div><button class="rte-btn" onclick="execRTECommand('insertUnorderedList')"><i class="fa-solid fa-list-ul"></i></button><button class="rte-btn" onclick="execRTECommand('createLink',prompt('Enter URL'))"><i class="fa-solid fa-link"></i></button><div class="rte-separator"></div><button class="rte-btn active" onclick="execRTECommand('justifyLeft')"><i class="fa-solid fa-align-left"></i></button><button class="rte-btn" onclick="execRTECommand('justifyCenter')"><i class="fa-solid fa-align-center"></i></button><button class="rte-btn" onclick="execRTECommand('justifyRight')"><i class="fa-solid fa-align-right"></i></button><button class="rte-btn" onclick="execRTECommand('justifyFull')"><i class="fa-solid fa-align-justify"></i></button></div>`;
                    if (typeof section.editMode === 'number') {
                        const idx = section.editMode; const item = section.items[idx] || {};
                        card.innerHTML = `<div class="edit-entry-mode"><div class="edit-entry-header"><h3>Edit Entry</h3><div class="edit-entry-actions"><button class="action-icon" onclick="toggleSectionMode('${section.id}','default')"><i class="fa-solid fa-eye"></i></button><button class="action-icon" onclick="deleteSectionEntry('${section.id}',${idx});toggleSectionMode('${section.id}','default')"><i class="fa-solid fa-trash-can"></i></button></div></div><div class="form-group" style="margin-bottom:1rem;"><label class="entry-field-label">Title</label><div style="position:relative;"><input type="text" class="form-input-dark" style="padding-right:60px;" value="${item.name||''}" oninput="updateSectionValue('${section.id}',${idx},'name',this.value)" placeholder="Enter title"><button style="position:absolute;right:8px;top:50%;transform:translateY(-50%);background:rgba(255,255,255,0.1);border:none;border-radius:4px;padding:0.2rem 0.5rem;color:#d1d5db;cursor:pointer;font-size:0.75rem;display:flex;align-items:center;gap:4px;" onclick="prompt('Enter URL')"><i class="fa-solid fa-link"></i> Link</button></div></div><div class="form-group" style="margin-bottom:1rem;"><label class="entry-field-label">Subtitle</label><input type="text" class="form-input-dark" value="${item.role||''}" oninput="updateSectionValue('${section.id}',${idx},'role',this.value)" placeholder="Enter subtitle"></div><div class="form-grid-3" style="margin-bottom:1rem;"><div><label class="entry-field-label">Start Date</label><input type="text" class="form-input-dark" value="${(item.dateRange||'').split(' - ')[0]||''}" oninput="updateDateRange('${section.id}',${idx},0,this.value)" placeholder="MM/YYYY"></div><div><label class="entry-field-label">End Date</label><input type="text" class="form-input-dark" value="${(item.dateRange||'').split(' - ')[1]||''}" oninput="updateDateRange('${section.id}',${idx},1,this.value)" placeholder="MM/YYYY"></div><div><label class="entry-field-label">Location</label><input type="text" class="form-input-dark" value="${item.location||''}" oninput="updateSectionValue('${section.id}',${idx},'location',this.value)" placeholder="City, Country"></div></div><label class="entry-field-label">Description</label><div class="rte-container">${cRTE}<div class="rte-content" contenteditable="true" oninput="updateSectionValue('${section.id}',${idx},'desc',this.innerHTML)" placeholder="Add a description...">${item.desc||''}</div></div><div style="padding-top:1rem;border-top:1px solid rgba(255,255,255,0.1);"><button class="btn-done-pink-large" onclick="toggleSectionMode('${section.id}','default')"><i class="fa-solid fa-check"></i> Done</button></div></div>`;
                    } else {
                        card.innerHTML = `<div class="new-section-header" onclick="toggleSectionCollapse('${section.id}')" style="cursor:pointer;"><div class="icon-container"><i class="${headerIcon}"></i></div><h3>${section.title||'Custom'}</h3><button class="btn-edit-heading" onclick="event.stopPropagation(); toggleSectionMode('${section.id}','heading')"><i class="fa-solid fa-pencil"></i> Edit Heading</button><i class="fa-solid ${chevronClass} toggle-icon"></i></div><div class="new-section-body" style="${collapseStyle}">${(section.items||[]).map((item,idx)=>getEntryRowHTML(section.id, item, idx)).join('')}<div class="add-entry-row"><button class="btn-add-new-entry" onclick="addSectionEntry('${section.id}')"><i class="fa-solid fa-plus"></i> Add Entry</button><button class="delete-section-btn" onclick="deleteSection('${section.id}')"><i class="fa-solid fa-trash-can"></i></button></div></div>`;
                    }
                    if (typeof section.editMode === 'number') {
                        card.innerHTML += getSectionLayoutCustomizationsHTML(section, 'Custom Section');
                    }
                    container.appendChild(card); return;
                }

                // Generic list fields fallback
                else {
                    let itemsHTML = '';
                    section.items.forEach((item, idx) => {
                        itemsHTML += `
                            <div class="entry-item">
                                <div class="entry-item-header">
                                    <span class="entry-item-title">${item.name || 'New Item'}</span>
                                    <button class="section-action-btn delete-btn" onclick="deleteSectionEntry('${section.id}', ${idx})"><i class="fa-solid fa-trash-can"></i></button>
                                </div>
                                <div class="section-body">
                                    <div class="form-group">
                                        <label>Name/Title</label>
                                        <input type="text" class="form-input" value="${item.name || ''}" oninput="updateSectionValue('${section.id}', ${idx}, 'name', this.value)">
                                    </div>
                                    <div class="form-group">
                                        <label>Details / Description</label>
                                        <textarea class="form-input" oninput="updateSectionValue('${section.id}', ${idx}, 'desc', this.value)">${item.desc || ''}</textarea>
                                    </div>
                                </div>
                            </div>
                        `;
                    });

                    cardBodyHTML = `
                        <div class="section-body">
                            ${itemsHTML}
                            <button class="btn-add-entry" onclick="addSectionEntry('${section.id}')">
                                <i class="fa-solid fa-plus"></i> Add Entry
                            </button>
                        </div>
                    `;
                }

                card.innerHTML = `
                    <div class="section-header" onclick="toggleAccordion(this.nextElementSibling)">
                        <div class="section-header-left">
                            <i class="fa-solid fa-grip-vertical" style="color:#444; margin-right:5px; cursor:grab;"></i>
                            <h3>${section.title}</h3>
                        </div>
                        <div class="section-actions">
                            <button class="section-action-btn delete-btn" onclick="event.stopPropagation(); deleteSection('${section.id}')">
                                <i class="fa-solid fa-trash-can"></i>
                            </button>
                            <i class="fa-solid fa-chevron-down" style="color:#666; font-size:0.8rem;"></i>
                        </div>
                    </div>
                    <div class="section-body-wrapper">
                        ${cardBodyHTML}
                    </div>
                `;

                container.appendChild(card);
            });
        }-wrapper">
                        ${cardBodyHTML}
                    </div>
                `;

                container.appendChild(card);
            });
        }

        function getSectionHTML(section) {
            if (section.type === 'summary' && section.hidden) return '';
            
            section = {
                ...section,
                items: (section.items || []).filter(item => {
                    if (typeof item === 'object' && item !== null) {
                        return !item.hidden;
                    }
                    return true;
                })
            };

            if (section.type === 'pagebreak') {
                return `
                    <div class="sheet-section" data-id="${section.id}" style="page-break-before: always; margin:1rem 0; width:100%; border-top: 2px dashed #ddd; height:0; padding:0;"></div>
                `;
            }

            let blockContentHTML = '';
            const c = section.customizations || {};
            let showTitle = true;
            
            if (section.type === 'summary' || section.type === 'declaration') {
                if (c.showHeading === false) showTitle = false;
                if (section.type === 'summary' && c.displayInHeader) return '';
                if (section.type === 'summary') {
                    blockContentHTML = `
                        <p class="sheet-summary-text">${section.content || ''}</p>
                    `;
                }
            } else if (section.type === 'education' || section.type === 'experience') {
                const order = c.order || 'title-first';
                const groupPromotions = c.groupPromotions === true;
                let entries = '';
                
                (section.items || []).forEach(item => {
                    if (!item.title && !item.role) return;
                    const dates = item.dateRange ? ` <span style="color:#888;font-size:0.85em;">${item.dateRange}</span>` : '';
                    const loc = item.location ? ` &bull; ${item.location}` : '';
                    
                    let titleHTML = `<span style="font-weight:600;">${item.title || ''}</span>`;
                    let subtitleHTML = item.role ? `<div class="sheet-entry-role">${item.role}${loc}</div>` : '';
                    
                    if (order === 'subtitle-first') {
                        titleHTML = `<span style="font-weight:600;">${item.role || ''}</span>`;
                        subtitleHTML = item.title ? `<div class="sheet-entry-role">${item.title}${loc}</div>` : '';
                    }

                    let groupStyle = '';
                    if (section.type === 'experience' && groupPromotions) {
                        groupStyle = 'padding-left: 1rem; border-left: 2px solid #ddd; margin-left: 0.5rem; margin-bottom: 0.5rem;';
                    } else {
                        groupStyle = 'margin-bottom: 1rem;';
                    }

                    entries += `<div class="sheet-entry" style="${groupStyle}">
                        <div class="sheet-entry-header">
                            ${titleHTML}${dates}
                        </div>
                        ${subtitleHTML}
                        ${item.desc ? `<div class="sheet-entry-desc">${item.desc}</div>` : ''}
                    </div>`;
                });
                blockContentHTML = entries;
            } else if (['skills', 'languages', 'certificates', 'interests'].includes(section.type) || (['projects', 'courses', 'awards', 'organisations', 'publications', 'custom', 'customs'].includes(section.type) && c.layout)) {
                const layout = c.layout || 'Grid';
                
                let html = '';
                
                const formatSubinfo = (desc, style) => {
                    if (!desc || !desc.replace(/<[^>]+>/g, '').trim()) return '';
                    const separator = style === 'Colon' ? ':' : (style === 'Bracket' ? '' : '—');
                    const pre = style === 'Bracket' ? '(' : '';
                    const post = style === 'Bracket' ? ')' : '';
                    return `<span style="font-weight:normal; color:#666;"> ${separator} ${pre}${desc.replace(/<[^>]+>/g, '').trim()}${post}</span>`;
                };

                const formatLevel = (level, style, section) => {
                    if (!level) return '';
                    let score = 3;
                    if(level==='Beginner' || level==='Level 1') score=1;
                    else if(level==='Level 2') score=2;
                    else if(level==='Intermediate' || level==='Level 3') score=3;
                    else if(level==='Advanced' || level==='Level 4') score=4;
                    else if(level==='Expert' || level==='Level 5') score=5;
                    else if(!isNaN(parseInt(level))) score=parseInt(level);

                    if (style === 'Dots') {
                        let dots = '';
                        for(let i=1; i<=5; i++) {
                            dots += `<span style="display:inline-block; width:6px; height:6px; border-radius:50%; margin:0 2px; background:${i<=score ? 'currentColor' : 'rgba(0,0,0,0.15)'};"></span>`;
                        }
                        return `<span>${dots}</span>`;
                    } else if (style === 'Bar') {
                        return `<div style="width:50px; height:4px; background:rgba(0,0,0,0.15); border-radius:2px; display:inline-block; vertical-align:middle;"><div style="width:${(score/5)*100}%; height:100%; background:currentColor; border-radius:2px;"></div></div>`;
                    }
                    
                    let displayText = level;
                    if (level.startsWith('Level ')) {
                        const levelNum = level.replace('Level ', '');
                        displayText = (section.customizations || {})['level' + levelNum] || ['Basic', 'Conversational', 'Proficient', 'Fluent', 'Native/Bilingual'][levelNum - 1] || level;
                    }
                    return `<span style="font-size:0.8em; color:#888;">${displayText}</span>`;
                };

                if (layout === 'Grid') {
                    const cols = c.columns || 2;
                    let gridItems = '';
                    section.items.forEach(skill => {
                        const name = typeof skill === 'object' ? (skill.title || skill.name || skill.role) : skill;
                        const level = typeof skill === 'object' ? skill.level : '';
                        if (name && name.trim()) {
                            gridItems += `<div style="padding: 0.2rem 0; font-weight:600;">
                                ${name}
                            </div>`;
                        }
                    });
                    html = `<div style="display:grid; grid-template-columns: repeat(${cols}, 1fr); gap: 0.5rem;">${gridItems}</div>`;
                } 
                else if (layout === 'Rows') {
                    const spacing = c.rowSpacing === 'Spacious' ? '0.8rem' : '0.4rem';
                    const bullet = c.startBullets ? '• ' : '';
                    let rowItems = '';
                    section.items.forEach(skill => {
                        const name = typeof skill === 'object' ? (skill.title || skill.name || skill.role) : skill;
                        const desc = typeof skill === 'object' ? skill.desc : '';
                        if (name && name.trim()) {
                            rowItems += `<div style="margin-bottom:${spacing}; line-height:1.4;">
                                <span style="font-weight:600;">${bullet}${name}</span>
                                ${formatSubinfo(desc, c.subinfoStyle || 'Dash')}
                            </div>`;
                        }
                    });
                    html = `<div>${rowItems}</div>`;
                }
                else if (layout === 'Compact') {
                    const sepType = c.separator || 'Comma';
                    const sepChar = sepType === 'Bullet' ? ' • ' : (sepType === 'Pipe' ? ' | ' : ', ');
                    let compItems = [];
                    section.items.forEach(skill => {
                        const name = typeof skill === 'object' ? (skill.title || skill.name || skill.role) : skill;
                        const desc = typeof skill === 'object' ? skill.desc : '';
                        if (name && name.trim()) {
                            compItems.push(`<span style="font-weight:600;">${name}</span>${formatSubinfo(desc, c.subinfoStyle || 'Dash')}`);
                        }
                    });
                    html = `<div style="line-height:1.6;">${compItems.join(sepChar)}</div>`;
                }
                else if (layout === 'Bubble') {
                    const styleClass = c.bubbleStyle === 'Outline' ? 'outline' : (c.bubbleStyle === 'Soft' ? 'soft' : 'solid');
                    let bubbleItems = '';
                    section.items.forEach(skill => {
                        const name = typeof skill === 'object' ? (skill.title || skill.name || skill.role) : skill;
                        if (name && name.trim()) {
                            bubbleItems += `<span class="sheet-bubble ${styleClass}">${name}</span>`;
                        }
                    });
                    html = `<div>${bubbleItems}</div>`;
                }
                else if (layout === 'Level') {
                    let levelItems = '';
                    section.items.forEach(skill => {
                        const name = typeof skill === 'object' ? (skill.title || skill.name || skill.role) : skill;
                        const level = typeof skill === 'object' ? skill.level : '';
                        const desc = typeof skill === 'object' ? skill.desc : '';
                        if (name && name.trim()) {
                            levelItems += `<div style="margin-bottom:0.6rem;">
                                <div style="display:flex; justify-content:space-between; align-items:center;">
                                    <span style="font-weight:600;">${name}</span>
                                    ${formatLevel(level, c.levelStyle || 'Dots', section)}
                                </div>
                                ${desc && desc.replace(/<[^>]+>/g, '').trim() ? `<div style="font-size:0.9em; color:#666; margin-top:0.2rem;">${desc.replace(/<[^>]+>/g, '').trim()}</div>` : ''}
                            </div>`;
                        }
                    });
                    html = `<div>${levelItems}</div>`;
                }
                
                blockContentHTML = html;
            } else if (section.type === 'projects') {
                let entries = '';
                section.items.forEach(item => {
                    if (!item.title && !item.role) return;
                    const dates = item.dateRange ? ` <span style="color:#888;font-size:0.85em;">${item.dateRange}</span>` : '';
                    entries += `<div class="sheet-entry">
                        <div class="sheet-entry-header">
                            <span style="font-weight:600;">${item.title || ''}</span>${dates}
                        </div>
                        ${item.role ? `<div class="sheet-entry-role">${item.role}</div>` : ''}
                        ${item.desc ? `<div class="sheet-entry-desc">${item.desc}</div>` : ''}
                    </div>`;
                });
                blockContentHTML = entries;
            } else if (section.type === 'courses') {
                let entries = '';
                section.items.forEach(item => {
                    if (!item.name) return;
                    const dates = item.dateRange ? ` &bull; ${item.dateRange}` : '';
                    const loc = item.location ? ` &bull; ${item.location}` : '';
                    entries += `<div class="sheet-entry">
                        <div class="sheet-entry-header">
                            <span style="font-weight:600;">${item.name}</span>
                        </div>
                        ${item.institution ? `<div class="sheet-entry-role">${item.institution}${dates}${loc}</div>` : ''}
                        ${item.desc ? `<div class="sheet-entry-desc">${item.desc}</div>` : ''}
                    </div>`;
                });
                blockContentHTML = entries;
            } else if (section.type === 'awards') {
                let entries = '';
                section.items.forEach(item => {
                    if (!item.name) return;
                    const dateParts = [!item.hideDay && item.day, !item.hideMonth && item.month, item.year].filter(Boolean);
                    const dateStr = dateParts.join(' ');
                    entries += `<div class="sheet-entry">
                        <div class="sheet-entry-header">
                            <span style="font-weight:600;">${item.name}</span>
                            ${dateStr ? `<span style="color:#888;font-size:0.85em;">${dateStr}</span>` : ''}
                        </div>
                        ${item.issuer ? `<div class="sheet-entry-role">${item.issuer}</div>` : ''}
                        ${item.desc ? `<div class="sheet-entry-desc">${item.desc}</div>` : ''}
                    </div>`;
                });
                blockContentHTML = entries;
            } else if (section.type === 'organisations') {
                let entries = '';
                section.items.forEach(item => {
                    if (!item.name) return;
                    const dates = item.dateRange ? ` &bull; ${item.dateRange}` : '';
                    const loc = item.location ? ` &bull; ${item.location}` : '';
                    entries += `<div class="sheet-entry">
                        <div class="sheet-entry-header">
                            <span style="font-weight:600;">${item.name}</span>
                            ${item.dateRange ? `<span style="color:#888;font-size:0.85em;">${item.dateRange}</span>` : ''}
                        </div>
                        ${item.position ? `<div class="sheet-entry-role">${item.position}${loc}</div>` : ''}
                        ${item.desc ? `<div class="sheet-entry-desc">${item.desc}</div>` : ''}
                    </div>`;
                });
                blockContentHTML = entries;
            } else if (section.type === 'publications') {
                let entries = '';
                section.items.forEach(item => {
                    if (!item.name) return;
                    const dateParts = [!item.hideDay && item.day, !item.hideMonth && item.month, item.year].filter(Boolean);
                    const dateStr = dateParts.join(' ');
                    entries += `<div class="sheet-entry">
                        <div class="sheet-entry-header">
                            <span style="font-weight:600;">${item.name}</span>
                            ${dateStr ? `<span style="color:#888;font-size:0.85em;">${dateStr}</span>` : ''}
                        </div>
                        ${item.publisher ? `<div class="sheet-entry-role">${item.publisher}</div>` : ''}
                        ${item.desc ? `<div class="sheet-entry-desc">${item.desc}</div>` : ''}
                    </div>`;
                });
                blockContentHTML = entries;
            } else if (section.type === 'references') {
                let entries = '';
                section.items.forEach(item => {
                    if (!item.name && !item.role) return;
                    entries += `<div class="sheet-entry">
                        <div class="sheet-entry-header">
                            <span style="font-weight:600;">${item.name || ''}</span>
                        </div>
                        ${item.role ? `<div class="sheet-entry-role">${item.role}</div>` : ''}
                        ${item.organization ? `<div class="sheet-entry-desc">${item.organization}</div>` : ''}
                        ${item.email || item.phone ? `<div class="sheet-entry-desc" style="color:#888;font-size:0.85em;">${[item.email, item.phone].filter(Boolean).join(' &bull; ')}</div>` : ''}
                    </div>`;
                });
                blockContentHTML = entries;
            } else if (section.type === 'declaration') {
                let entries = '';
                const declPos = c.position || 'Left';
                const declSig = c.signatureLine || 'None';
                section.items.forEach(item => {
                    if (!item.name && !item.desc) return;
                    const meta = [item.location, item.dateRange].filter(Boolean).join(', ');
                    
                    let sigHtml = '';
                    if (declSig === 'Solid') {
                        sigHtml = `<div style="border-top: 1px solid #000; width: 200px; margin-top: 30px; margin-bottom: 5px;"></div>`;
                    }
                    
                    const align = declPos === 'Right' ? 'text-align: right; display: flex; flex-direction: column; align-items: flex-end;' : '';
                    
                    entries += `<div class="sheet-entry">
                        ${item.desc ? `<div class="sheet-entry-desc" style="margin-bottom:1rem;">${item.desc}</div>` : ''}
                        <div style="margin-top: 1rem; ${align}">
                            ${sigHtml}
                            ${item.name ? `<div style="font-weight:600;">${item.name}</div>` : ''}
                            ${meta ? `<div style="color:#888;font-size:0.85em;">${meta}</div>` : ''}
                        </div>
                    </div>`;
                });
                blockContentHTML = entries;
            } else if (section.type === 'custom' || section.type === 'customs') {
                let entries = '';
                section.items.forEach(item => {
                    if (!item.name && !item.role) return;
                    const dates = item.dateRange ? ` <span style="color:#888;font-size:0.85em;">${item.dateRange}</span>` : '';
                    const loc = item.location ? ` &bull; ${item.location}` : '';
                    entries += `<div class="sheet-entry">
                        <div class="sheet-entry-header">
                            <span style="font-weight:600;">${item.name || ''}</span>${dates}
                        </div>
                        ${item.role ? `<div class="sheet-entry-role">${item.role}${loc}</div>` : ''}
                        ${item.desc ? `<div class="sheet-entry-desc">${item.desc}</div>` : ''}
                    </div>`;
                });
                blockContentHTML = entries;
            } else {
                let entries = '';
                section.items.forEach(item => {
                    const name = typeof item === 'object' ? item.name : item;
                    const desc = typeof item === 'object' ? item.desc : '';
                    entries += `
                        <div class="sheet-entry">
                            <div class="sheet-entry-header">
                                <span>${name || ''}</span>
                            </div>
                            <div class="sheet-entry-desc">${desc || ''}</div>
                        </div>
                    `;
                });
                blockContentHTML = entries;
            }

            return `
                <div class="sheet-section" data-id="${section.id}">
                    ${showTitle ? `<h2 class="sheet-section-title">${section.title || ''}</h2>` : ''}
                    <div class="sheet-section-content">
                        ${blockContentHTML}
                    </div>
                </div>
            `;
        }

        // Renders right-hand preview page sheet
        function renderPreviewSheet() {
            const container = document.getElementById('sheet-sections-container');
            const sheet = document.getElementById('resumeSheet');
            const header = document.querySelector('.sheet-header');

            // === CRITICAL: If header is inside container, move it out BEFORE clearing container ===
            // container.innerHTML = '' would destroy the header DOM node otherwise
            if (header && container.contains(header)) {
                sheet.insertBefore(header, container);
            }

            container.innerHTML = '';

            // Update photo
            const photoEl = document.getElementById('sheetPhoto');
            if (resumeData.photo) {
                photoEl.src = resumeData.photo;
                photoEl.style.display = 'block';
                document.getElementById('sheet-photo-container').style.display = 'block';
            } else {
                photoEl.style.display = 'none';
                document.getElementById('sheet-photo-container').style.display = 'none';
            }

            // Update primary text headers
            document.getElementById('sheet-fullname').innerText = resumeData.name;

            // Build contact list dynamically including standard details + extraDetails pills
            const contactContainer = document.querySelector('.sheet-contact');
            if (contactContainer) {
                let contactHTML = '';
                if (resumeData.email) {
                    contactHTML += `<span id="sheet-email"><i class="fa-solid fa-envelope" data-default-icon="fa-solid fa-envelope" style="margin-right:4px;"></i> ${resumeData.email}</span>`;
                }
                if (resumeData.phone) {
                    contactHTML += `<span id="sheet-phone"><i class="fa-solid fa-phone" data-default-icon="fa-solid fa-phone" style="margin-right:4px;"></i> ${resumeData.phone}</span>`;
                }
                if (resumeData.address) {
                    contactHTML += `<span id="sheet-address"><i class="fa-solid fa-location-dot" data-default-icon="fa-solid fa-location-dot" style="margin-right:4px;"></i> ${resumeData.address}</span>`;
                }
                
                // Add extra details
                if (resumeData.extraDetails) {
                    Object.keys(resumeData.extraDetails).forEach(key => {
                        const val = resumeData.extraDetails[key];
                        if (val && val.trim()) {
                            const icon = pillIcons[key] || 'fa-solid fa-info';
                            contactHTML += `<span id="sheet-${key}"><i class="${icon}" data-default-icon="${icon}" style="margin-right:4px;"></i> ${val}</span>`;
                        }
                    });
                }
                contactContainer.innerHTML = contactHTML;
            }

            const headerMain = document.getElementById('sheet-header-main');
            const oldSum = document.getElementById('sheet-header-summary');
            if (oldSum) oldSum.remove();

            const sumSec = resumeData.sections.find(s => s.type === 'summary');
            if (sumSec && !sumSec.hidden && sumSec.customizations && sumSec.customizations.displayInHeader) {
                if (headerMain) {
                    const p = document.createElement('p');
                    p.id = 'sheet-header-summary';
                    p.style.marginTop = '0.5rem';
                    p.style.fontSize = '0.9em';
                    p.style.color = 'var(--text-color, #4b5563)';
                    p.style.maxWidth = '100%';
                    p.innerText = sumSec.content || '';
                    headerMain.appendChild(p);
                }
            }

            // Ensure header styles and sheet styles reset
            header.style.gridColumn = '';
            header.style.gridRow = '';
            header.style.marginBottom = '1.5rem';
            sheet.style.display = 'block';
            sheet.style.gridTemplateColumns = '';
            sheet.style.gap = '';
            container.style.gridColumn = '';
            container.style.gridRow = '';
            container.style.display = 'block';
            container.style.gap = '';
            container.style.gridTemplateColumns = '';

            // Ensure header is at sheet top (it was moved out above if needed)
            if (header.parentElement !== sheet) {
                sheet.insertBefore(header, container);
            }

            // Ensure all sections have a column assignment (alternate left/right)
            resumeData.sections.forEach((sec, idx) => {
                if (!sec.column) {
                    sec.column = (idx % 2 === 0) ? 'left' : 'right';
                }
            });

            const leftSections = resumeData.sections.filter(s => s.column === 'left');
            const rightSections = resumeData.sections.filter(s => s.column === 'right');

            if (layoutConfig.columns === 'one') {
                container.style.display = 'flex';
                container.style.flexDirection = 'column';
                container.style.gap = '1.2rem';
                container.innerHTML = resumeData.sections.map(s => getSectionHTML(s)).join('');
            } else if (layoutConfig.columns === 'two') {
                if (layoutConfig.headerPos === 'top') {
                    container.style.display = 'grid';
                    container.style.gridTemplateColumns = `${layoutConfig.leftWidth}% ${layoutConfig.rightWidth}%`;
                    container.style.gap = '2rem';
                    container.style.alignItems = 'start';

                    // Use section.column property so panel arrangement reflects in preview
                    const leftHTML = leftSections.map(s => getSectionHTML(s)).join('');
                    const rightHTML = rightSections.map(s => getSectionHTML(s)).join('');

                    container.innerHTML = `
                        <div class="sheet-column-left" style="display:flex; flex-direction:column; gap:1.2rem;">${leftHTML}</div>
                        <div class="sheet-column-right" style="display:flex; flex-direction:column; gap:1.2rem;">${rightHTML}</div>
                    `;
                } else if (layoutConfig.headerPos === 'left') {
                    container.style.display = 'grid';
                    container.style.gridTemplateColumns = `${layoutConfig.leftWidth}% ${layoutConfig.rightWidth}%`;
                    container.style.gap = '2rem';
                    container.style.alignItems = 'start';

                    header.style.marginBottom = '1.5rem';

                    const leftHTML = leftSections.map(s => getSectionHTML(s)).join('');
                    const rightHTML = rightSections.map(s => getSectionHTML(s)).join('');

                    container.innerHTML = `
                        <div class="sheet-column-left" style="display:flex; flex-direction:column; gap:1.2rem;">
                            <div class="header-placeholder"></div>
                            ${leftHTML}
                        </div>
                        <div class="sheet-column-right" style="display:flex; flex-direction:column; gap:1.2rem;">
                            ${rightHTML}
                        </div>
                    `;
                    const placeholder = container.querySelector('.header-placeholder');
                    placeholder.replaceWith(header);
                } else if (layoutConfig.headerPos === 'right') {
                    container.style.display = 'grid';
                    container.style.gridTemplateColumns = `${layoutConfig.leftWidth}% ${layoutConfig.rightWidth}%`;
                    container.style.gap = '2rem';
                    container.style.alignItems = 'start';

                    header.style.marginBottom = '1.5rem';

                    const leftHTML = leftSections.map(s => getSectionHTML(s)).join('');
                    const rightHTML = rightSections.map(s => getSectionHTML(s)).join('');

                    container.innerHTML = `
                        <div class="sheet-column-left" style="display:flex; flex-direction:column; gap:1.2rem;">
                            ${leftHTML}
                        </div>
                        <div class="sheet-column-right" style="display:flex; flex-direction:column; gap:1.2rem;">
                            <div class="header-placeholder"></div>
                            ${rightHTML}
                        </div>
                    `;
                    const placeholder = container.querySelector('.header-placeholder');
                    placeholder.replaceWith(header);
                }
            } else if (layoutConfig.columns === 'mix') {
                if (resumeData.sections.length === 0) {
                    container.innerHTML = '';
                    if (layoutConfig.headerPos === 'left' || layoutConfig.headerPos === 'right') {
                        container.innerHTML = `
                            <div class="sheet-mix-columns" style="display:grid; grid-template-columns:${layoutConfig.leftWidth}% ${layoutConfig.rightWidth}%; gap:2rem; align-items:start; margin-bottom:1.2rem;">
                                <div class="sheet-column-left" style="display:flex; flex-direction:column; gap:1.2rem;">${layoutConfig.headerPos === 'left' ? '<div class="header-placeholder"></div>' : ''}</div>
                                <div class="sheet-column-right" style="display:flex; flex-direction:column; gap:1.2rem;">${layoutConfig.headerPos === 'right' ? '<div class="header-placeholder"></div>' : ''}</div>
                            </div>
                        `;
                        const placeholder = container.querySelector('.header-placeholder');
                        if (placeholder) placeholder.replaceWith(header);
                    }
                } else {
                    let rows = [];
                    let currentRow = null;
                    for (let sec of resumeData.sections) {
                        let col = sec.column || 'full';
                        if (col === 'full') {
                            if (currentRow) { rows.push(currentRow); currentRow = null; }
                            rows.push({ type: 'full', section: sec });
                        } else if (col === 'left') {
                            if (currentRow) {
                                if (currentRow.left) {
                                    rows.push(currentRow);
                                    currentRow = { type: 'split', left: sec, right: null };
                                } else {
                                    currentRow.left = sec;
                                    rows.push(currentRow);
                                    currentRow = null;
                                }
                            } else {
                                currentRow = { type: 'split', left: sec, right: null };
                            }
                        } else if (col === 'right') {
                            if (currentRow) {
                                if (currentRow.right) {
                                    rows.push(currentRow);
                                    currentRow = { type: 'split', left: null, right: sec };
                                } else {
                                    currentRow.right = sec;
                                    rows.push(currentRow);
                                    currentRow = null;
                                }
                            } else {
                                currentRow = { type: 'split', left: null, right: sec };
                            }
                        }
                    }
                    if (currentRow) {
                        rows.push(currentRow);
                    }

                    let headerInserted = false;
                    if (layoutConfig.headerPos === 'left' || layoutConfig.headerPos === 'right') {
                        header.style.marginBottom = '1.5rem';
                    }

                    let contentHTML = rows.map(row => {
                        if (row.type === 'full') {
                            return `<div class="sheet-full-width-section" style="width:100%; margin-bottom:1.2rem;">${getSectionHTML(row.section)}</div>`;
                        } else {
                            let leftContent = row.left ? getSectionHTML(row.left) : '';
                            let rightContent = row.right ? getSectionHTML(row.right) : '';
                            
                            if (layoutConfig.headerPos === 'left' && !headerInserted) {
                                leftContent = `<div class="header-placeholder"></div>` + leftContent;
                                headerInserted = true;
                            } else if (layoutConfig.headerPos === 'right' && !headerInserted) {
                                rightContent = `<div class="header-placeholder"></div>` + rightContent;
                                headerInserted = true;
                            }

                            return `
                                <div class="sheet-mix-columns" style="display:grid; grid-template-columns:${layoutConfig.leftWidth}% ${layoutConfig.rightWidth}%; gap:2rem; align-items:start; margin-bottom:1.2rem;">
                                    <div class="sheet-column-left" style="display:flex; flex-direction:column; gap:1.2rem;">${leftContent}</div>
                                    <div class="sheet-column-right" style="display:flex; flex-direction:column; gap:1.2rem;">${rightContent}</div>
                                </div>
                            `;
                        }
                    }).join('');
                    
                    if (!headerInserted && (layoutConfig.headerPos === 'left' || layoutConfig.headerPos === 'right')) {
                        contentHTML = `
                            <div class="sheet-mix-columns" style="display:grid; grid-template-columns:${layoutConfig.leftWidth}% ${layoutConfig.rightWidth}%; gap:2rem; align-items:start; margin-bottom:1.2rem;">
                                <div class="sheet-column-left" style="display:flex; flex-direction:column; gap:1.2rem;">${layoutConfig.headerPos === 'left' ? '<div class="header-placeholder"></div>' : ''}</div>
                                <div class="sheet-column-right" style="display:flex; flex-direction:column; gap:1.2rem;">${layoutConfig.headerPos === 'right' ? '<div class="header-placeholder"></div>' : ''}</div>
                            </div>
                        ` + contentHTML;
                    }

                    container.innerHTML = contentHTML;
                    
                    if (layoutConfig.headerPos === 'left' || layoutConfig.headerPos === 'right') {
                        const placeholder = container.querySelector('.header-placeholder');
                        if (placeholder) placeholder.replaceWith(header);
                    }
                }
            }

            // Apply entry layout configuration styles
            applyEntryLayoutStyles();
            applyCurrentHeaderStyles();

            // Re-apply color preferences matching current mode to keep icons & colors in sync
            if (currentColorMode === 'advanced') {
                applyAdvColorPreferences();
            } else {
                applyColorPreferences();
            }
        }

        function applyCurrentHeaderStyles() {
            const activeSepBtn = document.querySelector('button[onclick*="setHeaderSeparator"].active') || document.querySelector('.style-option.active[onclick*="setHeaderSeparator"]');
            if (activeSepBtn) {
                const match = activeSepBtn.getAttribute('onclick').match(/setHeaderSeparator\('([^']+)'/);
                if (match) {
                    setHeaderSeparator(match[1], activeSepBtn);
                }
            }
            const activeIconBtn = document.querySelector('button[onclick*="setHeaderIconStyle"].active') || document.querySelector('.style-option.active[onclick*="setHeaderIconStyle"]');
            if (activeIconBtn) {
                const onclickAttr = activeIconBtn.getAttribute('onclick');
                const match = onclickAttr.match(/setHeaderIconStyle\('([^']+)'/);
                if (match) {
                    setHeaderIconStyle(match[1], activeIconBtn);
                }
            }
            if (typeof applyLinkStyling === 'function') {
                applyLinkStyling();
            }

            // Re-apply section heading styles post-render
            const activeHeadingStyleBtn = document.querySelector('.style-option.active[onclick*="setSectionHeadingStyle"]');
            if (activeHeadingStyleBtn) {
                const match = activeHeadingStyleBtn.getAttribute('onclick').match(/setSectionHeadingStyle\('([^']+)'/);
                if (match) {
                    setSectionHeadingStyle(match[1], activeHeadingStyleBtn);
                }
            }
            const activeHeadingTransformBtn = document.querySelector('.style-option.active[onclick*="setSectionHeadingTransform"]');
            if (activeHeadingTransformBtn) {
                const match = activeHeadingTransformBtn.getAttribute('onclick').match(/setSectionHeadingTransform\('([^']+)'/);
                if (match) {
                    setSectionHeadingTransform(match[1], activeHeadingTransformBtn);
                }
            }
            const activeHeadingSizeBtn = document.querySelector('.style-option.active[onclick*="setSectionHeadingSize"]');
            if (activeHeadingSizeBtn) {
                const match = activeHeadingSizeBtn.getAttribute('onclick').match(/setSectionHeadingSize\('([^']+)'/);
                if (match) {
                    setSectionHeadingSize(match[1], activeHeadingSizeBtn);
                }
            }
            const activeHeadingIconsBtn = document.querySelector('.style-option.active[onclick*="setSectionHeadingIcons"]');
            if (activeHeadingIconsBtn) {
                const match = activeHeadingIconsBtn.getAttribute('onclick').match(/setSectionHeadingIcons\('([^']+)'/);
                if (match) {
                    setSectionHeadingIcons(match[1], activeHeadingIconsBtn);
                }
            }
        }

        // Customizer modifiers
        function changeFont(fontName, element) {
            document.querySelectorAll('.font-option').forEach(opt => opt.classList.remove('selected'));
            element.classList.add('selected');
            document.getElementById('resumeSheet').style.fontFamily = `'${fontName}', sans-serif`;
        }

        function changeSize(size) {
            document.getElementById('val-font-size').innerText = size + 'px';
            document.getElementById('resumeSheet').style.fontSize = size + 'px';
        }

        function changeLineHeight(lh) {
            document.getElementById('val-line-height').innerText = lh;
            document.getElementById('resumeSheet').style.lineHeight = lh;
        }

        let layoutConfig = {
            columns: 'one',
            headerPos: 'top',
            leftWidth: 50,
            rightWidth: 50
        };

        function updateColWidthLabels() {
            document.getElementById('col-width-left-label').innerText = `Left ${layoutConfig.leftWidth}%`;
            document.getElementById('col-width-right-label').innerText = `Right ${layoutConfig.rightWidth}%`;
        }

        function changeColWidth(side, amount) {
            let newLeft = layoutConfig.leftWidth;
            if(side === 'left') {
                newLeft += amount;
            } else {
                newLeft -= amount;
            }
            if(newLeft >= 20 && newLeft <= 80) {
                layoutConfig.leftWidth = newLeft;
                layoutConfig.rightWidth = 100 - newLeft;
                updateColWidthLabels();
                renderPreviewSheet();
            }
        }

        function swapColWidth() {
            const temp = layoutConfig.leftWidth;
            layoutConfig.leftWidth = layoutConfig.rightWidth;
            layoutConfig.rightWidth = temp;
            updateColWidthLabels();
            renderPreviewSheet();
        }

        function setLayoutColumns(type, btn) {
            if (btn) {
                const parent = btn.parentElement;
                Array.from(parent.children).forEach(c => c.classList.remove('active'));
                btn.classList.add('active');
            }
            layoutConfig.columns = type;
            const headerPos = document.getElementById('layout-header-position-container');
            const colWidth = document.getElementById('layout-column-width-container');
            if (type === 'one') {
                if (headerPos) headerPos.style.display = 'none';
                if (colWidth) colWidth.style.display = 'none';
            } else {
                if (headerPos) headerPos.style.display = 'block';
                if (colWidth) colWidth.style.display = 'block';
            }
            renderAll();
        }

        function setHeaderPosition(pos, btn) {
            if (btn) {
                const parent = btn.parentElement;
                Array.from(parent.children).forEach(c => c.classList.remove('active'));
                btn.classList.add('active');
            }
            layoutConfig.headerPos = pos;
            renderAll();
        }

        function changeMargin(margin) {
            if(document.getElementById('val-margin')) document.getElementById('val-margin').innerText = margin + 'mm';
            document.getElementById('resumeSheet').style.padding = margin + 'mm';
        }

        function stepSlider(id, step, min, max) {
            const el = document.getElementById(id);
            if (!el) return;
            let val = parseFloat(el.value) + step;
            val = Math.max(min, Math.min(max, parseFloat(val.toFixed(2))));
            el.value = val;
        }

        function changeSize(size) {
            const pt = parseFloat(size);
            document.querySelectorAll('#val-font-size').forEach(el => el.innerText = pt + 'pt');
            document.getElementById('resumeSheet').style.fontSize = (pt * 1.333) + 'px';
        }

        function changeLineHeight(lh) {
            const v = parseFloat(parseFloat(lh).toFixed(1));
            document.querySelectorAll('#val-line-height').forEach(el => el.innerText = v);
            document.getElementById('resumeSheet').style.lineHeight = v;
        }

        function changeLRMargin(val) {
            document.getElementById('val-lr-margin').innerText = val + 'mm';
            const sheet = document.getElementById('resumeSheet');
            const cur = sheet.style.paddingTop || '14mm';
            sheet.style.paddingLeft = val + 'mm';
            sheet.style.paddingRight = val + 'mm';
        }

        function changeTBMargin(val) {
            document.getElementById('val-tb-margin').innerText = val + 'mm';
            const sheet = document.getElementById('resumeSheet');
            sheet.style.paddingTop = val + 'mm';
            sheet.style.paddingBottom = val + 'mm';
        }

        const entrySpaceLabels = ['[---]', '[----]', '[-----]', '[------]', '[-------]', '[--------]'];
        function changeEntrySpace(val) {
            const idx = Math.min(Math.round(val), entrySpaceLabels.length - 1);
            document.getElementById('val-entry-space').innerText = entrySpaceLabels[idx];
            const px = val * 4;
            document.querySelectorAll('.sheet-entry').forEach(el => { el.style.marginBottom = px + 'px'; });
            document.querySelectorAll('.sheet-section').forEach(el => { el.style.marginBottom = (px * 2) + 'px'; });
        }

        // Entry layout config
        let entryLayoutConfig = {
            layout: 1,
            titleSize: 'm',
            subtitleStyle: 'normal',
            subtitlePlacement: 'same',
            descIndent: false,
            listStyle: 'bullet',
            colWidth: 'auto'
        };

        function setEntryLayout(num, btn) {
            entryLayoutConfig.layout = num;
            document.querySelectorAll('[id^="entry-layout-"]').forEach(b => b.classList.remove('active'));
            if (btn) btn.classList.add('active');
            
            // Hide/Show Column Width section based on layout 4
            const colWidthSection = document.getElementById('column-width-section');
            if (colWidthSection) {
                if (num === 4) {
                    colWidthSection.style.display = 'none';
                } else {
                    colWidthSection.style.display = 'block';
                }
            }
            
            applyEntryLayoutStyles();
        }

        function setEntryColWidth(mode, btn) {
            entryLayoutConfig.colWidth = mode;
            ['col-width-auto','col-width-manual'].forEach(id => {
                const b = document.getElementById(id);
                if (b) b.classList.remove('active');
            });
            if (btn) btn.classList.add('active');
            
            // Show manual options if Manual is selected
            const manualOptions = document.getElementById('manual-col-width-options');
            if (manualOptions) {
                if (mode === 'manual') {
                    manualOptions.style.display = 'flex';
                } else {
                    manualOptions.style.display = 'none';
                }
            }
        }

        function setTitleSize(size, btn) {
            entryLayoutConfig.titleSize = size;
            ['title-size-s','title-size-m','title-size-l'].forEach(id => {
                const b = document.getElementById(id);
                if (b) b.classList.remove('active');
            });
            if (btn) btn.classList.add('active');
            applyEntryLayoutStyles();
        }

        function setSubtitleStyle(style, btn) {
            entryLayoutConfig.subtitleStyle = style;
            ['subtitle-style-normal','subtitle-style-bold','subtitle-style-italic'].forEach(id => {
                const b = document.getElementById(id);
                if (b) b.classList.remove('active');
            });
            if (btn) btn.classList.add('active');
            applyEntryLayoutStyles();
        }

        function setSubtitlePlacement(place, btn) {
            entryLayoutConfig.subtitlePlacement = place;
            ['subtitle-place-same','subtitle-place-next'].forEach(id => {
                const b = document.getElementById(id);
                if (b) b.classList.remove('active');
            });
            if (btn) btn.classList.add('active');
            applyEntryLayoutStyles();
        }

        function setDescIndent(checked) {
            entryLayoutConfig.descIndent = checked;
            applyEntryLayoutStyles();
        }

        function setListStyle(style, btn) {
            entryLayoutConfig.listStyle = style;
            ['list-style-bullet','list-style-hyphen'].forEach(id => {
                const b = document.getElementById(id);
                if (b) b.classList.remove('active');
            });
            if (btn) btn.classList.add('active');
            applyEntryLayoutStyles();
        }

        function adjustManualWidth(side) {
            let leftSpan = document.getElementById('manual-left-percent');
            let rightSpan = document.getElementById('manual-right-percent');
            if (!leftSpan || !rightSpan) return;
            
            let leftVal = parseInt(leftSpan.innerText);
            let rightVal = parseInt(rightSpan.innerText);
            
            if (side === 'left' && leftVal < 80) {
                leftVal += 5;
                rightVal -= 5;
            } else if (side === 'right' && rightVal < 80) {
                rightVal += 5;
                leftVal -= 5;
            }
            
            leftSpan.innerText = leftVal;
            rightSpan.innerText = rightVal;
            
            entryLayoutConfig.colWidth = 'manual';
            entryLayoutConfig.manualLeftWidth = leftVal;
            applyEntryLayoutStyles();
        }

        let lastFocusedFooterInput = null;
        function insertPlaceholder(placeholder) {
            if (lastFocusedFooterInput) {
                lastFocusedFooterInput.value += placeholder;
                updateFooter();
            }
        }

        function updateFooter() {
            let footer = document.getElementById('resume-footer');
            const sheet = document.getElementById('resumeSheet');
            const showPage = document.getElementById('footer-page-numbers')?.checked;
            const showEmail = document.getElementById('footer-email')?.checked;
            const showName = document.getElementById('footer-name')?.checked;
            const useCustom = document.getElementById('footer-custom')?.checked;

            if (showPage || showEmail || showName || useCustom) {
                if (!footer) {
                    footer = document.createElement('div');
                    footer.id = 'resume-footer';
                    footer.style.cssText = 'position:absolute; bottom:24mm; left:24mm; right:24mm; border-top:1px solid #ddd; padding-top:0.5rem; font-size:0.75rem; color:#999; display:flex; justify-content:space-between;';
                    sheet.style.paddingBottom = '35mm';
                    sheet.appendChild(footer);
                }
                
                let leftText = '';
                let centerText = '';
                let rightText = '';
                
                if (useCustom) {
                    leftText = document.getElementById('footer-left-col')?.value || '';
                    centerText = document.getElementById('footer-center-col')?.value || '';
                    rightText = document.getElementById('footer-right-col')?.value || '';
                    
                    const name = document.getElementById('sheet-fullname')?.innerText || 'Your Name';
                    const email = document.getElementById('sheet-email')?.innerText || 'email@example.com';
                    const phone = document.getElementById('sheet-phone')?.innerText || 'Phone';
                    
                    const replacePlaceholders = (text) => text.replace(/\{\{name\}\}/g, name).replace(/\{\{email\}\}/g, email).replace(/\{\{phone\}\}/g, phone).replace(/\{\{page\}\}/g, '1').replace(/\{\{pages\}\}/g, '1');
                    
                    leftText = replacePlaceholders(leftText);
                    centerText = replacePlaceholders(centerText);
                    rightText = replacePlaceholders(rightText);
                } else {
                    if (showName) leftText = document.getElementById('sheet-fullname')?.innerText || 'Your Name';
                    if (showEmail) centerText = document.getElementById('sheet-email')?.innerText || 'email@example.com';
                    if (showPage) rightText = 'Page 1';
                }
                
                footer.innerHTML = `
                    <div style="flex:1; text-align:left;">${leftText}</div>
                    <div style="flex:1; text-align:center;">${centerText}</div>
                    <div style="flex:1; text-align:right;">${rightText}</div>
                `;
            } else {
                if (footer) footer.remove();
                sheet.style.paddingBottom = '24mm';
            }
        }

        // Deprecated alias for backwards compatibility just in case
        function setFooterPageNumbers(checked) {
            updateFooter();
        }

        function applyEntryLayoutStyles() {
            const cfg = entryLayoutConfig;
            const titleSizeMap = { s: '0.8em', m: '0.95em', l: '1.1em' };
            const titleSize = titleSizeMap[cfg.titleSize] || '0.95em';

            document.querySelectorAll('.sheet-entry').forEach(entry => {
                const header = entry.querySelector('.sheet-entry-header');
                const role = entry.querySelector('.sheet-entry-role');
                const desc = entry.querySelector('.sheet-entry-desc');

                // Title size
                if (header) { header.style.fontSize = titleSize; }

                // Subtitle (role) style
                if (role) {
                    role.style.fontWeight = cfg.subtitleStyle === 'bold' ? '700' : '400';
                    role.style.fontStyle = cfg.subtitleStyle === 'italic' ? 'italic' : 'normal';
                }

                // Subtitle placement
                if (role && header) {
                    if (cfg.subtitlePlacement === 'same' && role.innerText.trim()) {
                        role.style.display = 'inline';
                        header.style.flexWrap = 'wrap';
                    } else {
                        role.style.display = 'block';
                    }
                }

                // Description indentation
                if (desc) desc.style.paddingLeft = cfg.descIndent ? '1rem' : '0';

                // Layout arrangement
                entry.style.display = 'flex';
                if (cfg.layout === 1) {
                    entry.style.flexDirection = 'column';
                    entry.style.gap = '0.2rem';
                } else if (cfg.layout === 2) {
                    entry.style.flexDirection = 'row';
                    entry.style.gap = '1rem';
                    entry.style.alignItems = 'flex-start';
                    if (cfg.colWidth === 'manual' && cfg.manualLeftWidth) {
                        if (role) {
                            role.style.flex = `0 0 ${cfg.manualLeftWidth}%`;
                            role.style.minWidth = 'unset';
                        }
                        if (header) {
                            header.style.flex = `0 0 ${100 - cfg.manualLeftWidth}%`;
                            header.style.flexDirection = 'column';
                        }
                    } else {
                        if (header) { header.style.flexDirection = 'column'; header.style.flex = '1'; }
                        if (role) { role.style.minWidth = '80px'; }
                    }
                    if (role) { role.style.textAlign = 'right'; }
                } else if (cfg.layout === 3) {
                    entry.style.flexDirection = 'column';
                    entry.style.gap = '0.2rem';
                    if (header) { header.style.flexDirection = 'row-reverse'; }
                } else if (cfg.layout === 4) {
                    entry.style.flexDirection = 'column';
                    entry.style.gap = '0.1rem';
                    if (header) { header.style.display = 'block'; }
                }

                // List style for desc
                if (desc) {
                    const text = desc.innerText || desc.textContent || '';
                    if (cfg.listStyle === 'hyphen') {
                        desc.style.listStyleType = 'none';
                        desc.querySelectorAll('li').forEach(li => {
                            if (!li.innerText.startsWith('–')) li.innerText = '– ' + li.innerText;
                        });
                    }
                }
            });
        }

        function changeAccentColor(colorHex, element) {
            document.querySelectorAll('.color-dot').forEach(dot => dot.classList.remove('selected'));
            element.classList.add('selected');
            document.getElementById('resumeSheet').style.setProperty('--accent-color', colorHex);
        }

        function toggleDetailVisibility(detailKey, isChecked) {
            const element = document.getElementById('sheet-' + detailKey);
            if (element) {
                element.style.display = isChecked ? 'inline-block' : 'none';
            }
            if (detailKey === 'photo') {
                document.getElementById('sheet-photo-container').style.display = isChecked ? 'block' : 'none';
            }
        }

        // ── Personal Details State Management ──
        let addedPills = {};
        let activeEditingEntry = {};

        function startEditingSectionTitle(sectionId) {
            const h3 = document.getElementById(`section-title-text-${sectionId}`);
            if (!h3) return;
            const currentTitle = h3.innerText;
            const input = document.createElement('input');
            input.type = 'text';
            input.className = 'form-input';
            input.value = currentTitle;
            input.style.width = '160px';
            input.style.display = 'inline-block';
            input.style.padding = '0.2rem 0.5rem';
            input.style.fontSize = '0.95rem';
            input.style.fontWeight = '700';
            input.style.background = '#222';
            input.style.color = '#fff';
            input.style.border = '1px solid #444';
            input.style.borderRadius = '4px';
            
            // Prevent event propagation so clicking inside input doesn't close/toggle accordion
            input.onclick = (e) => e.stopPropagation();
            
            const finishEditing = () => {
                const newTitle = input.value.trim() || currentTitle;
                const section = resumeData.sections.find(s => s.id === sectionId);
                if (section) {
                    section.title = newTitle;
                    saveHistoryState();
                    renderAll();
                } else {
                    h3.innerText = currentTitle;
                }
            };

            input.onblur = finishEditing;
            input.onkeydown = (e) => {
                if (e.key === 'Enter') {
                    finishEditing();
                } else if (e.key === 'Escape') {
                    input.value = currentTitle;
                    input.blur();
                }
            };
            
            h3.replaceWith(input);
            input.focus();
            input.select();
        }


        function toggleSectionDates(sectionId) {
            const section = resumeData.sections.find(s => s.id === sectionId);
            if (section) {
                section.hideDates = !section.hideDates;
                saveHistoryState();
                renderAll();
            }
        }

        function editPersonalDetails() {
            document.getElementById('personal-preview-card').style.display = 'none';
            document.getElementById('personal-edit-card').style.display = 'block';
            document.getElementById('customization-trigger-row').style.display = 'flex';
            const addContentBtn = document.querySelector('.btn-big-add-content');
            if(addContentBtn) addContentBtn.style.display = 'none';
            const activeSections = document.getElementById('active-sections-container');
            if(activeSections) activeSections.style.display = 'none';
            // Sync resumeData values to form inputs
            const nameInput = document.getElementById('input-fullname');
            if (nameInput) nameInput.value = (resumeData.name === 'Your name' ? '' : resumeData.name);
            const roleInput = document.getElementById('input-role');
            if (roleInput) roleInput.value = (resumeData.role === 'Profession/Role' ? '' : resumeData.role);
            const emailInput = document.getElementById('input-email');
            if (emailInput) emailInput.value = (resumeData.email === 'email@example.com' ? '' : resumeData.email);
            const phoneInput = document.getElementById('input-phone');
            if (phoneInput) phoneInput.value = (resumeData.phone === 'Phone' ? '' : resumeData.phone);
            const addrInput = document.getElementById('input-address');
            if (addrInput) addrInput.value = (resumeData.address === 'Address' ? '' : resumeData.address);

            // Populate dynamic pills from resumeData.extraDetails
            const container = document.getElementById('dynamic-pill-inputs');
            if (container) {
                container.innerHTML = '';
                // Reset addedPills state first
                for (let key in addedPills) {
                    addedPills[key] = false;
                    const pillBtn = document.getElementById('pill-' + key);
                    if (pillBtn) pillBtn.classList.remove('added');
                }
                
                if (resumeData.extraDetails) {
                    Object.keys(resumeData.extraDetails).forEach(key => {
                        const val = resumeData.extraDetails[key];
                        toggleDetailPill(key, val);
                    });
                }
            }
        }

        function doneEditingPersonal() {
            document.getElementById('personal-edit-card').style.display = 'none';
            document.getElementById('personal-preview-card').style.display = 'block';
            // Hide trigger row and close customization panels
            document.getElementById('customization-trigger-row').style.display = 'none';
            const addContentBtn = document.querySelector('.btn-big-add-content');
            if(addContentBtn) addContentBtn.style.display = 'flex';
            const activeSections = document.getElementById('active-sections-container');
            if(activeSections) activeSections.style.display = 'flex';
            const panels = document.getElementById('personal-customization-panels');
            if (panels) panels.classList.remove('open');
            const chevron = document.getElementById('customization-trigger-chevron');
            if (chevron) chevron.style.transform = 'rotate(0deg)';
            const label = document.querySelector('#customization-trigger-row span');
            if (label) label.innerHTML = '<i class="fa-solid fa-sliders" style="margin-right:0.5rem; font-size:0.8rem;"></i> Show customizations for this section';
            updatePersonalPreviewCard();
            saveHistoryState();
        }

        function updatePersonalPreviewCard() {
            const previewName = document.getElementById('preview-name');
            const previewEmail = document.getElementById('preview-email');
            const previewPhone = document.getElementById('preview-phone');
            const previewAddress = document.getElementById('preview-address');
            if (previewName) {
                previewName.textContent = resumeData.name || 'Your name';
                previewName.classList.toggle('placeholder', !resumeData.name || resumeData.name === 'Your name');
            }
            if (previewEmail) previewEmail.textContent = resumeData.email || 'Email';
            if (previewPhone) previewPhone.textContent = resumeData.phone || 'Phone';
            if (previewAddress) previewAddress.textContent = resumeData.address || 'Address';
            // Sync photo to preview card
            const previewImg = document.getElementById('preview-photo-img');
            const previewCam = document.getElementById('preview-camera-icon');
            if (resumeData.photo && previewImg) {
                previewImg.src = resumeData.photo;
                previewImg.style.display = 'block';
                if (previewCam) previewCam.style.display = 'none';
            }
        }

        function updatePersonalField(key, value) {
            resumeData[key] = value;
            toggleCustomizationPanels();
            // Live-sync to preview sheet
            if (key === 'email') {
                const el = document.getElementById('sheet-email');
                if (el) el.innerHTML = `<i class="fa-solid fa-envelope" style="margin-right:4px;"></i> ` + value;
            } else if (key === 'phone') {
                const el = document.getElementById('sheet-phone');
                if (el) el.innerHTML = `<i class="fa-solid fa-phone" style="margin-right:4px;"></i> ` + value;
            } else if (key === 'address') {
                const el = document.getElementById('sheet-address');
                if (el) el.innerHTML = `<i class="fa-solid fa-location-dot" style="margin-right:4px;"></i> ` + value;
            } else if (key === 'name') {
                const el = document.getElementById('sheet-fullname');
                if (el) el.innerText = value || 'Your name';
            } else if (key === 'role') {
                const el = document.getElementById('sheet-role');
                if (el) el.innerText = value || 'Profession/Role';
            }
            debounceUpdatePreview();
        }

        // FontAwesome icons mapping for all Personal details & Links/Social profiles pills
        const pillIcons = {
            passport: 'fa-solid fa-id-card',
            nationality: 'fa-solid fa-flag',
            dob: 'fa-solid fa-cake-candles',
            visa: 'fa-solid fa-passport',
            availability: 'fa-solid fa-clock',
            gender: 'fa-solid fa-venus-mars',
            disability: 'fa-solid fa-universal-access',
            workmode: 'fa-solid fa-laptop-house',
            relocation: 'fa-solid fa-truck-moving',
            expectedsalary: 'fa-solid fa-money-bill-wave',
            secondphone: 'fa-solid fa-phone-flip',
            drivinglicense: 'fa-solid fa-id-card-clip',
            securityclearance: 'fa-solid fa-shield-halved',
            marital: 'fa-solid fa-heart-pulse',
            military: 'fa-solid fa-user-shield',
            smoking: 'fa-solid fa-smoking',
            height: 'fa-solid fa-arrows-up-down',
            weight: 'fa-solid fa-weight-scale',

            website: 'fa-solid fa-globe',
            portfolio: 'fa-solid fa-laptop-code',
            linkedin: 'fa-brands fa-linkedin',
            github: 'fa-brands fa-github',
            gitbook: 'fa-solid fa-book',
            medium: 'fa-brands fa-medium',
            orcid: 'fa-brands fa-orcid',
            skype: 'fa-brands fa-skype',
            bluesky: 'fa-solid fa-square-envelope',
            threads: 'fa-brands fa-threads',
            x: 'fa-brands fa-x-twitter',
            discord: 'fa-brands fa-discord',
            dribbble: 'fa-brands fa-dribbble',
            behance: 'fa-brands fa-behance',
            stackoverflow: 'fa-brands fa-stack-overflow',
            gitlab: 'fa-brands fa-gitlab',
            quora: 'fa-brands fa-quora',
            facebook: 'fa-brands fa-facebook',
            instagram: 'fa-brands fa-instagram',
            wechat: 'fa-brands fa-weixin',
            huggingface: 'fa-solid fa-face-smiling-hands',
            kaggle: 'fa-brands fa-kaggle',
            youtube: 'fa-brands fa-youtube',
            tiktok: 'fa-brands fa-tiktok',
            signal: 'fa-solid fa-comment-sms',
            telegram: 'fa-brands fa-telegram',
            whatsapp: 'fa-brands fa-whatsapp',
            paypal: 'fa-brands fa-paypal',
            producthunt: 'fa-brands fa-product-hunt',
            artstation: 'fa-brands fa-artstation',
            codepen: 'fa-brands fa-codepen',
            fiverr: 'fa-solid fa-f',
            hashnode: 'fa-brands fa-hashnode',
            pluralsight: 'fa-solid fa-circle-play',
            researchgate: 'fa-brands fa-researchgate',
            imdb: 'fa-brands fa-imdb',
            qwiklabs: 'fa-solid fa-cloud',
            googleplay: 'fa-brands fa-google-play',
            tumblr: 'fa-brands fa-tumblr',
            tripadvisor: 'fa-brands fa-tripadvisor',
            yelp: 'fa-brands fa-yelp',
            slack: 'fa-brands fa-slack',
            flickr: 'fa-brands fa-flickr',
            reverbnation: 'fa-solid fa-music',
            deviantart: 'fa-brands fa-deviantart',
            vimeo: 'fa-brands fa-vimeo',
            reddit: 'fa-brands fa-reddit',
            pinterest: 'fa-brands fa-pinterest',
            blogger: 'fa-brands fa-blogger',
            spotify: 'fa-brands fa-spotify',
            bitcoin: 'fa-brands fa-bitcoin',
            appstore: 'fa-brands fa-app-store',
            wordpress: 'fa-brands fa-wordpress',
            leetcode: 'fa-solid fa-code',
            codechef: 'fa-solid fa-code',
            codecademy: 'fa-solid fa-graduation-cap',
            codeforces: 'fa-solid fa-code',
            vsco: 'fa-solid fa-image',
            snapchat: 'fa-brands fa-snapchat',
            upwork: 'fa-solid fa-briefcase',
            geeksforgeeks: 'fa-solid fa-code',
            googlescholar: 'fa-solid fa-graduation-cap',
            line: 'fa-brands fa-line',
            tryhackme: 'fa-solid fa-shield-halved',
            coursera: 'fa-solid fa-graduation-cap',
            protonmail: 'fa-solid fa-envelope',
            hackerearth: 'fa-solid fa-code',
            codewars: 'fa-solid fa-code',
            hackthebox: 'fa-solid fa-cube',
            bitbucket: 'fa-brands fa-bitbucket',
            gitea: 'fa-solid fa-code-branch',
            xing: 'fa-brands fa-xing',
            '500px': 'fa-brands fa-500px',
            devto: 'fa-brands fa-dev',
            hackerrank: 'fa-brands fa-hackerrank',
            tencentqq: 'fa-brands fa-qq',
            ethereum: 'fa-brands fa-ethereum',
            stopstalk: 'fa-solid fa-code',
            substack: 'fa-solid fa-bookmark',
            toptal: 'fa-solid fa-briefcase',
            polywork: 'fa-solid fa-briefcase',
            replit: 'fa-solid fa-code',
            credly: 'fa-solid fa-award',
            figma: 'fa-brands fa-figma',
            gmail: 'fa-solid fa-envelope',
            twitch: 'fa-brands fa-twitch',
            trello: 'fa-brands fa-trello',
            evernote: 'fa-solid fa-note-sticky',
            canva: 'fa-solid fa-palette',
            etsy: 'fa-brands fa-etsy',
            googlemaps: 'fa-solid fa-map-pin',
            googlepodcasts: 'fa-solid fa-podcast',
            applepodcasts: 'fa-solid fa-podcast',
            stitcher: 'fa-solid fa-podcast',
            amazonmusic: 'fa-solid fa-music',
            iheartradio: 'fa-solid fa-radio',
            tunein: 'fa-solid fa-radio',
            pocketcasts: 'fa-solid fa-podcast',
            pandora: 'fa-solid fa-music',
            youtubemusic: 'fa-solid fa-music',
            tidal: 'fa-solid fa-music',
            bandcamp: 'fa-brands fa-bandcamp',
            scopus: 'fa-solid fa-book-open',
            disco: 'fa-solid fa-compact-disc',
            handshake: 'fa-solid fa-handshake',
            steam: 'fa-brands fa-steam',
            google: 'fa-brands fa-google',
            calendly: 'fa-solid fa-calendar',
            angellist: 'fa-brands fa-angellist',
            deezer: 'fa-solid fa-music',
            flowcv: 'fa-solid fa-file-invoice',
            khanacademy: 'fa-solid fa-graduation-cap',
            udemy: 'fa-solid fa-graduation-cap',
            udacity: 'fa-solid fa-graduation-cap',
            tableau: 'fa-solid fa-chart-simple',
            npm: 'fa-brands fa-npm',
            hackerone: 'fa-solid fa-shield-halved',
            freelancer: 'fa-solid fa-briefcase',
            datacamp: 'fa-solid fa-laptop-code',
            mastodon: 'fa-brands fa-mastodon',
            letterboxd: 'fa-solid fa-film',
            zoom: 'fa-solid fa-video',
            audioboom: 'fa-solid fa-podcast',
            soundcloud: 'fa-brands fa-soundcloud',
            soundcharts: 'fa-solid fa-chart-line',
            kakaotalk: 'fa-solid fa-comment',
            salesforce: 'fa-brands fa-salesforce',
            itchio: 'fa-brands fa-itch-io',
            sololearn: 'fa-solid fa-graduation-cap',
            opensea: 'fa-solid fa-anchor',
            devpost: 'fa-solid fa-code',
            linktree: 'fa-solid fa-tree',
            codingame: 'fa-solid fa-gamepad',
            codingninjas: 'fa-solid fa-graduation-cap',
            unsplash: 'fa-solid fa-camera',
            indeed: 'fa-solid fa-briefcase'
        };

        // ── Dynamic Detail Pills ──
        function toggleDetailPill(pillName, prefilledValue = null) {
            if (addedPills[pillName]) return;
            addedPills[pillName] = true;

            const pillBtn = document.getElementById('pill-' + pillName);
            if (pillBtn) pillBtn.classList.add('added');

            const labelsMap = {
                linkedin: 'LinkedIn', website: 'Website', nationality: 'Nationality',
                dob: 'Date of Birth', visa: 'Visa', passport: 'Passport or Id',
                availability: 'Availability', gender: 'Gender',
                marital: 'Marital Status', religion: 'Religion'
            };

            const container = document.getElementById('dynamic-pill-inputs');
            if (!container) return;
            const inputRow = document.createElement('div');
            inputRow.className = 'detail-pill-input-row';
            inputRow.id = 'pill-input-row-' + pillName;

            const val = prefilledValue !== null ? prefilledValue : ((resumeData.extraDetails && resumeData.extraDetails[pillName]) ? resumeData.extraDetails[pillName] : '');

            inputRow.innerHTML = `
                <div class="form-group">
                    <label>${labelsMap[pillName] || pillName}</label>
                    <div class="detail-field-row">
                        <input type="text" class="form-input" id="pill-input-${pillName}" placeholder="Enter ${labelsMap[pillName] || pillName}"
                               value="${val.replace(/"/g, '&quot;')}"
                               oninput="if(!resumeData.extraDetails) resumeData.extraDetails = {}; resumeData.extraDetails['${pillName}'] = this.value; debounceUpdatePreview();">
                        <button class="detail-reorder-btn" title="Reorder"><i class="fa-solid fa-up-down"></i></button>
                    </div>
                </div>
                <button class="btn-remove-pill" onclick="removeDetailPill('${pillName}')" title="Remove">
                    <i class="fa-solid fa-trash-can"></i>
                </button>
            `;
            container.appendChild(inputRow);
        }

        function removeDetailPill(pillName) {
            addedPills[pillName] = false;
            const pillBtn = document.getElementById('pill-' + pillName);
            if (pillBtn) pillBtn.classList.remove('added');
            const inputRow = document.getElementById('pill-input-row-' + pillName);
            if (inputRow) inputRow.remove();
            if (resumeData.extraDetails) delete resumeData.extraDetails[pillName];
            renderPreviewSheet();
        }

        function toggleExtraPills(btn) {
            const extra = document.getElementById('extra-pills-container');
            const showBtn = document.getElementById('personal-show-more-btn');
            if (extra) {
                const isShowing = extra.classList.contains('show');
                extra.classList.toggle('show');
                if (showBtn) showBtn.textContent = isShowing ? 'Show More' : 'Show Less';
            }
        }

        function filterLinks() {
            const searchInput = document.getElementById('links-search');
            const missingInput = document.getElementById('missing-search');
            const query = (searchInput ? searchInput.value.toLowerCase() : '') || (missingInput ? missingInput.value.toLowerCase() : '');
            const pills = document.querySelectorAll('.link-pill');
            const extraContainer = document.getElementById('extra-links-pills-container');
            const showMoreBtn = document.getElementById('links-show-more-btn');

            pills.forEach(pill => {
                const text = pill.textContent.trim().toLowerCase();
                pill.style.display = (query === '' || text.includes(query)) ? 'inline-flex' : 'none';
            });

            if (query.trim() !== '') {
                if (extraContainer) { extraContainer.style.display = 'flex'; extraContainer.classList.add('show'); }
                if (showMoreBtn) showMoreBtn.style.display = 'none';
            } else {
                if (extraContainer && !extraContainer.classList.contains('show')) extraContainer.style.display = 'none';
                if (showMoreBtn) showMoreBtn.style.display = 'inline-flex';
            }
        }

        function toggleExtraLinksPills(btn) {
            const extra = document.getElementById('extra-links-pills-container');
            if (extra) {
                const isShowing = extra.classList.contains('show');
                if (isShowing) {
                    extra.classList.remove('show');
                    extra.style.display = 'none';
                    btn.textContent = 'Show More';
                } else {
                    extra.classList.add('show');
                    extra.style.display = 'flex';
                    btn.textContent = 'Show Less';
                }
            }
        }

        function toggleFontGrid(type, element) {
            const parent = element.parentElement;
            parent.querySelectorAll('.style-option').forEach(opt => opt.classList.remove('active'));
            element.classList.add('active');
            const grid = document.getElementById('creative-font-grid');
            if (type === 'creative') {
                grid.style.display = 'grid';
            } else {
                grid.style.display = 'none';
            }
        }

        function toggleCustomizationPanels() {
            const roleContent = document.getElementById('role-custom-content');
            const roleEmpty = document.getElementById('role-empty-message');
            if(roleContent && roleEmpty) {
                if (resumeData.role && resumeData.role.trim() !== '' && resumeData.role !== 'Profession/Role') {
                    roleContent.style.display = 'block';
                    roleEmpty.style.display = 'none';
                } else {
                    roleContent.style.display = 'none';
                    roleEmpty.style.display = 'block';
                }
            }
            const photoContent = document.getElementById('photo-custom-content');
            const photoEmpty = document.getElementById('photo-empty-message');
            if(photoContent && photoEmpty) {
                if (resumeData.photo && resumeData.photo !== '') {
                    photoContent.style.display = 'block';
                    photoEmpty.style.display = 'none';
                } else {
                    photoContent.style.display = 'none';
                    photoEmpty.style.display = 'block';
                }
            }
        }

        // ── Customization Drawer ──
        function toggleCustomizationDrawer(trigger) {
            const content = document.getElementById('customization-drawer-content');
            const chevron = trigger.querySelector('.fa-chevron-down');
            if (content) content.classList.toggle('open');
            if (chevron) {
                chevron.style.transform = (content && content.classList.contains('open')) ? 'rotate(180deg)' : 'rotate(0deg)';
                chevron.style.transition = 'transform 0.3s ease';
            }
        }

        function togglePersonalCustomization() {
            const editCard = document.getElementById('personal-edit-card');
            const panels   = document.getElementById('personal-customization-panels');
            const chevron  = document.getElementById('customization-trigger-chevron');
            const triggerRow = document.getElementById('customization-trigger-row');
            const editorPanel = document.querySelector('.editor-panel');
            const isOpen   = panels && panels.classList.contains('open');

            if (!isOpen) {
                toggleCustomizationPanels();
                // ── Open Customizations: Fade out edit card, fade in panels ──
                if (editCard) {
                    editCard.style.transition = 'opacity 0.2s ease, transform 0.2s ease';
                    editCard.style.opacity = '0';
                    editCard.style.transform = 'translateY(-10px)';
                    setTimeout(() => {
                        editCard.style.display = 'none';
                        if (panels) {
                            panels.classList.add('open');
                            panels.style.animation = 'fadeInUp 0.3s ease forwards';
                        }
                        if (editorPanel) {
                            editorPanel.scrollTo({ top: 0, behavior: 'smooth' });
                        }
                    }, 200);
                } else {
                    if (panels) panels.classList.add('open');
                }
            } else {
                // ── Close Customizations: Fade out panels, fade in edit card ──
                if (panels) {
                    panels.style.animation = 'fadeOutDown 0.2s ease forwards';
                    setTimeout(() => {
                        panels.classList.remove('open');
                        panels.style.animation = '';
                        if (editCard) {
                            editCard.style.display = 'block';
                            // force reflow
                            void editCard.offsetWidth;
                            editCard.style.opacity = '1';
                            editCard.style.transform = 'translateY(0)';
                            
                            // Remove transition after it's done so it doesn't break future display toggles
                            setTimeout(() => {
                                editCard.style.transition = '';
                                editCard.style.transform = '';
                            }, 250);
                        }
                        if (editorPanel) {
                            editorPanel.scrollTo({ top: 0, behavior: 'smooth' });
                        }
                    }, 200);
                }
            }

            if (chevron) {
                chevron.style.transform = isOpen ? 'rotate(0deg)' : 'rotate(180deg)';
            }
            if (triggerRow) {
                const label = triggerRow.querySelector('span');
                if (label) {
                    setTimeout(() => {
                        label.innerHTML = isOpen
                            ? '<i class="fa-solid fa-sliders" style="margin-right:0.5rem; font-size:0.8rem;"></i> Show customizations for this section'
                            : '<i class="fa-solid fa-sliders" style="margin-right:0.5rem; font-size:0.8rem;"></i> Hide customizations for this section';
                    }, 150);
                }
            }
        }

        function setHeaderAlignment(align, el) {
            document.querySelectorAll('.alignment-option').forEach(o => o.classList.remove('active'));
            el.classList.add('active');
            const header = document.querySelector('.sheet-header');
            if (header) {
                if (align === 'center') {
                    header.style.justifyContent = 'center';
                    header.style.flexDirection = 'column';
                    header.style.alignItems = 'center';
                    header.style.textAlign = 'center';
                } else {
                    header.style.justifyContent = 'space-between';
                    header.style.flexDirection = 'row';
                    header.style.alignItems = 'flex-start';
                    header.style.textAlign = 'left';
                }
            }
        }

        function setArrangement(type, el) {
            document.querySelectorAll('.arrangement-option').forEach(o => o.classList.remove('active'));
            el.classList.add('active');
        }

        function setDetailStyle(style, el) {
            document.querySelectorAll('.style-option').forEach(o => o.classList.remove('active'));
            el.classList.add('active');
        }

        function setIconStyle(index, el) {
            document.querySelectorAll('.icon-style-btn').forEach(o => o.classList.remove('active'));
            el.classList.add('active');
        }

        function changeNameSize(size) {
            const valEl = document.getElementById('val-name-size');
            if (valEl) valEl.innerText = size + 'px';
            const nameEl = document.getElementById('sheet-fullname');
            if (nameEl) nameEl.style.fontSize = size + 'px';
        }

        // ── Rearrange Tab ──
        function renderRearrangeTab() {
            const list = document.getElementById('rearrange-list');
            if (!list) return;
            list.innerHTML = '';
            const allSections = [
                { id: 'personal', title: 'Personal Details', icon: 'fa-user', locked: true },
                ...resumeData.sections.map(s => ({ id: s.id, title: s.title, icon: 'fa-file-lines', locked: false }))
            ];
            allSections.forEach((sec, idx) => {
                const item = document.createElement('div');
                item.className = 'rearrange-item';
                const isFirst = idx === 0;
                const isLast = idx === allSections.length - 1;
                item.innerHTML = `
                    <div class="rearrange-item-left">
                        <i class="fa-solid fa-grip-vertical"></i>
                        <span class="rearrange-item-title">${sec.title}</span>
                    </div>
                    <div class="rearrange-arrows">
                        <button class="rearrange-arrow-btn" onclick="moveSection('${sec.id}', -1)" ${isFirst || sec.locked ? 'disabled' : ''}>
                            <i class="fa-solid fa-chevron-up"></i>
                        </button>
                        <button class="rearrange-arrow-btn" onclick="moveSection('${sec.id}', 1)" ${isLast || sec.locked ? 'disabled' : ''}>
                            <i class="fa-solid fa-chevron-down"></i>
                        </button>
                    </div>
                `;
                list.appendChild(item);
            });
        }

        function moveSection(sectionId, direction) {
            if (sectionId === 'personal') return;
            const idx = resumeData.sections.findIndex(s => s.id === sectionId);
            if (idx === -1) return;
            const newIdx = idx + direction;
            if (newIdx < 0 || newIdx >= resumeData.sections.length) return;
            const temp = resumeData.sections[idx];
            resumeData.sections[idx] = resumeData.sections[newIdx];
            resumeData.sections[newIdx] = temp;
            saveHistoryState();
            renderAll();
            renderRearrangeTab();
        }

        // ── Templates Tab ──
        function selectTemplate(el, templateName) {
            document.querySelectorAll('.template-card-mini').forEach(c => {
                c.classList.remove('active-template');
                const badge = c.querySelector('.active-badge');
                if (badge) badge.remove();
            });
            el.classList.add('active-template');
            const info = el.querySelector('.template-card-info');
            if (info) {
                const badge = document.createElement('span');
                badge.className = 'active-badge';
                badge.textContent = 'Active';
                info.appendChild(badge);
            }
        }

        // AI Feature mock call
        function optimizeSummaryAI() {
            const summarySec = resumeData.sections.find(s => s.type === 'summary');
            if (summarySec) {
                summarySec.content = "Detail-oriented Software Engineer with a proven track record of designing, building, and deploying highly scalable web solutions using modern framework architectures. Experienced in collaborating with cross-functional product and engineering teams to identify critical bottlenecks and deliver optimized, high-performance interfaces that maximize engagement.";
                saveHistoryState();
                renderAll();
                alert('✨ AI optimization applied to Summary section successfully!');
            } else {
                alert('Please add a Summary section first to use the AI tool.');
            }
        }

        // ── Drag and Drop Rearrange for Personal Fields ──
        let draggedPersonalField = null;

        function handlePersonalDragStart(e) {
            draggedPersonalField = e.target.closest('.form-group');
            e.dataTransfer.effectAllowed = 'move';
            // Need to set data to allow drag in some browsers
            e.dataTransfer.setData('text/plain', 'drag');
            setTimeout(() => { draggedPersonalField.style.opacity = '0.4'; }, 0);
        }

        function handlePersonalDragOver(e) {
            e.preventDefault();
            e.dataTransfer.dropEffect = 'move';
        }

        // Helpers for section layouts in the Customize tab
        const personalDetailsCardHTML = `
            <div class="style-option" style="padding:1rem; display:flex; flex-direction:column; align-items:center; justify-content:center; gap:0.4rem; background:#121212; border:1px solid #333; border-radius:8px; cursor:default; width:100%; box-sizing:border-box;">
                <div style="display:flex; align-items:center; gap:4px; color:#888; font-size:1.1rem; margin-bottom:0.2rem;">
                    <i class="fa-regular fa-user"></i>
                    <i class="fa-solid fa-bars"></i>
                </div>
                <span style="font-size:0.82rem; font-weight:600; color:#ccc;">Personal Details</span>
            </div>
        `;

        function getSectionCardHTML(sec, index) {
            let icon = 'fa-bars';
            const t = sec.title.toLowerCase();
            let customStyle = "background:#0d0d0d; border:1px solid #333;";

            if (sec.type === 'pagebreak') {
                icon = 'fa-scissors';
                customStyle = "background:transparent; border:1px dashed #555;";
            } else if(t.includes('certificate')) icon = 'fa-certificate';
            else if(t.includes('organisation') || t.includes('experience') || t.includes('work')) icon = 'fa-building';
            else if(t.includes('course') || t.includes('education') || t.includes('school')) icon = 'fa-book';
            else if(t.includes('language')) icon = 'fa-language';
            else if(t.includes('award') || t.includes('honor')) icon = 'fa-trophy';
            else if(t.includes('skill')) icon = 'fa-star';
            else icon = 'fa-grip-vertical';

            return `
                <div class="style-option" draggable="true" 
                     ondragstart="handleSectionDragStart(event, '${sec.id}')" 
                     ondragover="handleSectionDragOver(event)" 
                     ondragend="handleSectionDragEnd(event)" 
                     ondrop="handleSectionDrop(event, '${sec.id}', '${sec.column || 'left'}')" 
                     style="padding:0.7rem 1rem; display:flex; align-items:center; gap:0.8rem; cursor:grab; ${customStyle} border-radius:8px; text-align:left; width:100%; box-sizing:border-box;">
                    <i class="fa-solid fa-grip-vertical" style="color:#555; cursor:grab;"></i>
                    <i class="fa-solid ${icon}" style="color:#888; font-size:0.9rem; width:16px; text-align:center;"></i>
                    <span style="font-size:0.85rem; font-weight:600; color:#ccc; overflow:hidden; text-overflow:ellipsis; white-space:nowrap; flex:1;">${sec.title}</span>
                    ${sec.type === 'pagebreak' ? `<i class="fa-solid fa-trash" style="color:#666; margin-left:auto; cursor:pointer;" onclick="deleteSection('${sec.id}')"></i>` : ''}
                </div>
            `;
        }

        // Customize Change Section Layout Rendering & Drag-Drop 
        function renderCustomizeSectionLayout() {
            const container = document.getElementById('customize-section-layout-list');
            if (!container) return;

            // Ensure all sections have a column assignment
            resumeData.sections.forEach((sec, idx) => {
                if (!sec.column) {
                    // For two-column layouts, alternate left/right so both columns get content
                    sec.column = (idx % 2 === 0) ? 'left' : 'right';
                }
            });

            // Page break template card
            const pageBreakTemplateHTML = `
                <div class="style-option" draggable="true" 
                     ondragstart="handleSectionDragStart(event, 'pagebreak')" 
                     ondragover="handleSectionDragOver(event)" 
                     ondragend="handleSectionDragEnd(event)" 
                     style="padding:0.7rem 1rem; display:flex; align-items:center; gap:0.8rem; cursor:grab; background:transparent; border:1px dashed #555; border-radius:8px; text-align:left; margin-top:0.5rem; width:100%; box-sizing:border-box;">
                    <i class="fa-solid fa-grip-vertical" style="color:#555; cursor:grab;"></i>
                    <i class="fa-solid fa-scissors" style="color:#888; font-size:0.9rem; width:16px; text-align:center;"></i>
                    <span style="font-size:0.85rem; font-weight:600; color:#ccc;">Page break</span>
                </div>
            `;

            const isSingleList = layoutConfig.columns === 'one';

            if (isSingleList) {
                // Render single column vertical list
                let listHTML = personalDetailsCardHTML;
                if (resumeData.sections.length === 0) {
                    listHTML += `
                        <div style="font-size:0.8rem; color:#888; display:flex; align-items:center; gap:0.5rem; margin-top:0.5rem;">
                            You don't have any sections to rearrange yet
                        </div>
                    `;
                } else {
                    resumeData.sections.forEach((sec, index) => {
                        listHTML += getSectionCardHTML(sec, index);
                    });
                }
                listHTML += pageBreakTemplateHTML;
                container.innerHTML = listHTML;
                
            } else if (layoutConfig.columns === 'two' || layoutConfig.columns === 'mix') {

                // ── Special case: Mix Layout ──────────────────────────────────────────
                // Render as a grid representing the actual layout, with dotted drop zones for empty slots
                if (layoutConfig.columns === 'mix') {
                    let mainHTML = '';
                    if (layoutConfig.headerPos === 'top') {
                        mainHTML += `<div style="margin-bottom:0.5rem; width:100%;">${personalDetailsCardHTML}</div>`;
                    } else if (layoutConfig.headerPos === 'left') {
                        mainHTML += `<div style="display:flex; gap:0.8rem; width:100%; margin-bottom:0.5rem; box-sizing:border-box;">
                                        <div style="flex:1;">${personalDetailsCardHTML}</div>
                                        <div style="flex:1;"></div>
                                     </div>`;
                    } else if (layoutConfig.headerPos === 'right') {
                        mainHTML += `<div style="display:flex; gap:0.8rem; width:100%; margin-bottom:0.5rem; box-sizing:border-box;">
                                        <div style="flex:1;"></div>
                                        <div style="flex:1;">${personalDetailsCardHTML}</div>
                                     </div>`;
                    }

                    function getFullDropZone(insertIndex) {
                        return `<div class="mix-drop-zone mix-full-drop-zone" ondragover="handleSectionDragOver(event)" ondrop="handleMixGridDrop(event, ${insertIndex}, 'full')" style="border-radius:8px; display:flex; align-items:center; justify-content:center; color:#666; font-size:0.75rem; width:100%;"></div>`;
                    }
                    
                    function getHalfDropZone(insertIndex, col) {
                        return `<div class="mix-drop-zone mix-half-drop-zone" ondragover="handleSectionDragOver(event)" ondrop="handleMixGridDrop(event, ${insertIndex}, '${col}')" style="border-radius:8px; flex:1; display:flex; align-items:center; justify-content:center; color:#666; font-size:0.75rem; height:50px;"></div>`;
                    }

                    if (resumeData.sections.length === 0) {
                        mainHTML += getFullDropZone(0);
                    } else {
                        let rows = [];
                        let currentRow = null;
                        for (let sec of resumeData.sections) {
                            let col = sec.column || 'full';
                            if (sec.type === 'pagebreak') {
                                if (currentRow) { rows.push(currentRow); currentRow = null; }
                                rows.push({ type: 'full', section: sec });
                            } else if (col === 'full') {
                                if (currentRow) { rows.push(currentRow); currentRow = null; }
                                rows.push({ type: 'full', section: sec });
                            } else if (col === 'left') {
                                if (currentRow) {
                                    if (currentRow.left) {
                                        rows.push(currentRow);
                                        currentRow = { type: 'split', left: sec, right: null };
                                    } else {
                                        currentRow.left = sec;
                                        rows.push(currentRow);
                                        currentRow = null;
                                    }
                                } else {
                                    currentRow = { type: 'split', left: sec, right: null };
                                }
                            } else if (col === 'right') {
                                if (currentRow) {
                                    if (currentRow.right) {
                                        rows.push(currentRow);
                                        currentRow = { type: 'split', left: null, right: sec };
                                    } else {
                                        currentRow.right = sec;
                                        rows.push(currentRow);
                                        currentRow = null;
                                    }
                                } else {
                                    currentRow = { type: 'split', left: null, right: sec };
                                }
                            }
                        }
                        if (currentRow) { rows.push(currentRow); }

                        let secIndex = 0;
                        rows.forEach((row, i) => {
                            if (row.type === 'full') {
                                mainHTML += `<div style="width:100%; margin-bottom:0.5rem;">${getSectionCardHTML(row.section, secIndex)}</div>`;
                                secIndex++;
                            } else {
                                let leftHTML = row.left ? getSectionCardHTML(row.left, secIndex) : getHalfDropZone(secIndex, 'left');
                                if (row.left) secIndex++;
                                
                                let rightHTML = row.right ? getSectionCardHTML(row.right, secIndex) : getHalfDropZone(secIndex, 'right');
                                if (row.right) secIndex++;

                                mainHTML += `
                                    <div style="display:flex; gap:0.8rem; width:100%; margin-bottom:0.5rem; box-sizing:border-box;">
                                        <div style="flex:1; display:flex; flex-direction:column; gap:0.5rem;">${leftHTML}</div>
                                        <div style="flex:1; display:flex; flex-direction:column; gap:0.5rem;">${rightHTML}</div>
                                    </div>
                                `;
                            }

                            if (i < rows.length - 1) {
                                const nextRow = rows[i + 1];
                                if (row.type === 'split' && nextRow.type === 'split') {
                                    mainHTML += getFullDropZone(secIndex);
                                } else if (row.type === 'full' && nextRow.type === 'full') {
                                    mainHTML += `
                                        <div class="mix-drop-zone-row" style="display:flex; gap:0.8rem; width:100%; margin-bottom:0.5rem; box-sizing:border-box;">
                                            ${getHalfDropZone(secIndex, 'left')}
                                            ${getHalfDropZone(secIndex, 'right')}
                                        </div>
                                    `;
                                }
                            }
                        });
                        mainHTML += getFullDropZone(secIndex);
                    }

                    mainHTML += pageBreakTemplateHTML;
                    container.innerHTML = mainHTML;
                    return; // Done – exit renderCustomizeSectionLayout
                }
                // ─────────────────────────────────────────────────────────────────────

                // If mix layout and header position is top, the first section spans full width
                const isMixTop = (layoutConfig.columns === 'mix' && layoutConfig.headerPos === 'top');
                const firstSection = isMixTop && resumeData.sections.length > 0 ? resumeData.sections[0] : null;

                // Filter left and right sections
                const leftSections = resumeData.sections.filter(s => s.column === 'left' && s !== firstSection);
                const rightSections = resumeData.sections.filter(s => s.column === 'right' && s !== firstSection);

                let headerPos = layoutConfig.headerPos;

                // Build left and right column HTML content
                let leftColHTML = leftSections.map((sec, idx) => getSectionCardHTML(sec, idx)).join('');
                let rightColHTML = rightSections.map((sec, idx) => getSectionCardHTML(sec, idx)).join('');

                if (headerPos === 'left') {
                    leftColHTML = personalDetailsCardHTML + leftColHTML;
                } else if (headerPos === 'right') {
                    rightColHTML = personalDetailsCardHTML + rightColHTML;
                }

                // If lists are empty, add helper text
                if (!leftColHTML && headerPos !== 'left') {
                    leftColHTML = `<div style="font-size:0.75rem; color:#666; text-align:center; padding:1rem;">Empty</div>`;
                }
                if (!rightColHTML && headerPos !== 'right') {
                    rightColHTML = `<div style="font-size:0.75rem; color:#666; text-align:center; padding:1rem;">Empty</div>`;
                }

                // Main container HTML structure
                let mainHTML = '';

                // If header is at top, it spans full width
                if (headerPos === 'top') {
                    mainHTML += `<div style="margin-bottom:0.5rem; width:100%;">${personalDetailsCardHTML}</div>`;
                }

                // If mix top, render the first section as a full width drop target
                if (isMixTop && firstSection) {
                    mainHTML += `
                        <div style="font-size:0.75rem; color:#777; font-weight:600; margin: 0.5rem 0 0.2rem 0; width:100%;">FULL WIDTH SECTION</div>
                        <div ondragover="handleSectionDragOver(event)" ondrop="handleFullWidthDrop(event)" style="width:100%; margin-bottom:0.8rem;">
                            ${getSectionCardHTML(firstSection, 0)}
                        </div>
                    `;
                } else if (isMixTop && !firstSection && resumeData.sections.length > 0) {
                    // Empty full width target
                    mainHTML += `
                        <div style="font-size:0.75rem; color:#777; font-weight:600; margin: 0.5rem 0 0.2rem 0; width:100%;">FULL WIDTH SECTION</div>
                        <div ondragover="handleSectionDragOver(event)" ondrop="handleFullWidthDrop(event)" style="border: 1px dashed #444; border-radius: 8px; height: 40px; display:flex; align-items:center; justify-content:center; color:#555; font-size:0.8rem; margin-bottom:0.8rem; width:100%;">
                            Drag a section here to make it full width
                        </div>
                    `;
                }

                // Two columns layout side-by-side
                mainHTML += `
                    <div style="display:flex; gap:0.8rem; width:100%; box-sizing:border-box;">
                        <div id="col-layout-left" ondragover="handleSectionDragOver(event)" ondrop="handleColumnDrop(event, 'left')" style="flex:1; min-height:120px; display:flex; flex-direction:column; gap:0.5rem; border:1px dashed #333; border-radius:8px; padding:0.5rem; background:rgba(0,0,0,0.2); box-sizing:border-box;">
                            <div style="font-size:0.7rem; color:#666; font-weight:700; text-align:center; border-bottom:1px solid #222; padding-bottom:0.3rem; margin-bottom:0.2rem;">LEFT COLUMN</div>
                            ${leftColHTML}
                        </div>
                        <div id="col-layout-right" ondragover="handleSectionDragOver(event)" ondrop="handleColumnDrop(event, 'right')" style="flex:1; min-height:120px; display:flex; flex-direction:column; gap:0.5rem; border:1px dashed #333; border-radius:8px; padding:0.5rem; background:rgba(0,0,0,0.2); box-sizing:border-box;">
                            <div style="font-size:0.7rem; color:#666; font-weight:700; text-align:center; border-bottom:1px solid #222; padding-bottom:0.3rem; margin-bottom:0.2rem;">RIGHT COLUMN</div>
                            ${rightColHTML}
                        </div>
                    </div>
                `;

                mainHTML += pageBreakTemplateHTML;
                container.innerHTML = mainHTML;
            }
        }

        let draggedSectionId = null;

        function handleSectionDragStart(e, id) {
            draggedSectionId = id;
            e.dataTransfer.effectAllowed = 'move';
            e.dataTransfer.setData('text/plain', id);
            setTimeout(() => { e.target.style.opacity = '0.4'; }, 0);
            const container = document.getElementById('customize-section-layout-list');
            if (container) container.classList.add('dragging-active');
        }

        function handleSectionDragEnd(e) {
            e.target.style.opacity = '1';
            draggedSectionId = null;
            const container = document.getElementById('customize-section-layout-list');
            if (container) container.classList.remove('dragging-active');
        }

        function handleSectionDragOver(e) {
            e.preventDefault();
            e.dataTransfer.dropEffect = 'move';
        }

        function handleSectionDrop(e, targetId, targetCol) {
            e.preventDefault();
            e.stopPropagation();
            if (e.target.closest('.style-option')) {
                e.target.closest('.style-option').style.opacity = '1';
            }
            if (!draggedSectionId) return;

            // If we drag pagebreak template (from the bottom)
            if (draggedSectionId === 'pagebreak') {
                const pb = { id: 'pb_' + Date.now(), type: 'pagebreak', title: 'Page break', column: targetCol };
                const targetIdx = resumeData.sections.findIndex(s => s.id === targetId);
                if (targetIdx !== -1) {
                    resumeData.sections.splice(targetIdx, 0, pb);
                } else {
                    resumeData.sections.push(pb);
                }
                saveHistoryState();
                renderAll();
                return;
            }

            if (draggedSectionId === targetId) return;

            const srcIdx = resumeData.sections.findIndex(s => s.id === draggedSectionId);
            const targetIdx = resumeData.sections.findIndex(s => s.id === targetId);
            if (srcIdx === -1 || targetIdx === -1) return;

            const [item] = resumeData.sections.splice(srcIdx, 1);
            item.column = targetCol;

            const newTargetIdx = resumeData.sections.findIndex(s => s.id === targetId);
            resumeData.sections.splice(newTargetIdx, 0, item);

            saveHistoryState();
            renderAll();
        }

        function handleColumnDrop(e, targetCol) {
            e.preventDefault();
            if (!draggedSectionId) return;

            if (draggedSectionId === 'pagebreak') {
                const pb = { id: 'pb_' + Date.now(), type: 'pagebreak', title: 'Page break', column: targetCol };
                resumeData.sections.push(pb);
                saveHistoryState();
                renderAll();
                return;
            }

            const srcIdx = resumeData.sections.findIndex(s => s.id === draggedSectionId);
            if (srcIdx === -1) return;

            const item = resumeData.sections[srcIdx];
            item.column = targetCol;

            resumeData.sections.splice(srcIdx, 1);
            resumeData.sections.push(item);

            saveHistoryState();
            renderAll();
        }

        function handleFullWidthDrop(e) {
            e.preventDefault();
            if (!draggedSectionId) return;

            if (draggedSectionId === 'pagebreak') {
                const pb = { id: 'pb_' + Date.now(), type: 'pagebreak', title: 'Page break', column: 'left' };
                resumeData.sections.unshift(pb);
                saveHistoryState();
                renderAll();
                return;
            }

            const srcIdx = resumeData.sections.findIndex(s => s.id === draggedSectionId);
            if (srcIdx === -1) return;

            const [item] = resumeData.sections.splice(srcIdx, 1);
            resumeData.sections.unshift(item);

            saveHistoryState();
            renderAll();
        }

        function handleMainContainerDrop(e) {
            e.preventDefault();
            if (!draggedSectionId) return;
            if (layoutConfig.columns !== 'one') return; // Handled by col drops

            if (draggedSectionId === 'pagebreak') {
                const pb = { id: 'pb_' + Date.now(), type: 'pagebreak', title: 'Page break', column: 'left' };
                resumeData.sections.push(pb);
                saveHistoryState();
                renderAll();
                return;
            }

            const srcIdx = resumeData.sections.findIndex(s => s.id === draggedSectionId);
            if (srcIdx === -1) return;

            const [item] = resumeData.sections.splice(srcIdx, 1);
            resumeData.sections.push(item);
            saveHistoryState();
            renderAll();
        }

        // Handles dropping a dragged section onto a Mix+Top grid drop zone
        function handleMixGridDrop(e, insertIndex, col) {
            e.preventDefault();
            e.stopPropagation();
            if (!draggedSectionId) return;

            // Pagebreak case
            if (draggedSectionId === 'pagebreak') {
                const pb = { id: 'pb_' + Date.now(), type: 'pagebreak', title: 'Page break', column: col };
                resumeData.sections.splice(insertIndex, 0, pb);
                saveHistoryState();
                renderAll();
                return;
            }

            const srcIdx = resumeData.sections.findIndex(s => s.id === draggedSectionId);
            if (srcIdx === -1) return;

            const [item] = resumeData.sections.splice(srcIdx, 1);
            item.column = col;
            
            let adjustedIndex = insertIndex;
            if (srcIdx < insertIndex) {
                adjustedIndex--;
            }
            
            resumeData.sections.splice(adjustedIndex, 0, item);
            saveHistoryState();
            renderAll();
        }

        function handlePersonalDrop(e) {
            e.preventDefault();
            const target = e.target.closest('.form-group[draggable="true"]');
            if (target && target !== draggedPersonalField) {
                const parent = target.parentNode;
                const allFields = Array.from(parent.querySelectorAll('.form-group[draggable="true"]'));
                const draggedIdx = allFields.indexOf(draggedPersonalField);
                const targetIdx = allFields.indexOf(target);
                
                if (draggedIdx < targetIdx) {
                    parent.insertBefore(draggedPersonalField, target.nextSibling);
                } else {
                    parent.insertBefore(draggedPersonalField, target);
                }

                reorderPreviewContacts();
            }
        }

        function handlePersonalDragEnd(e) {
            if (draggedPersonalField) {
                draggedPersonalField.style.opacity = '1';
                draggedPersonalField = null;
            }
        }

        function reorderPreviewContacts() {
            const container = document.querySelector('.sheet-contact');
            if (!container) return;
            const editorGroups = document.querySelectorAll('#personal-edit-card .form-group[data-key]');
            
            editorGroups.forEach(group => {
                const key = group.getAttribute('data-key');
                const span = document.getElementById('sheet-' + key);
                if (span) {
                    container.appendChild(span);
                }
            });
        }
        const fontsSerif = ['Lora', 'PT Serif', 'Latin Modern', 'Cormorant Garamond', 'Crimson Text', 'Source Serif Pro', 'Literata', 'Aleo', 'Vollkorn', 'Alegreya', 'Zilla Slab', 'EB Garamond', 'Crimson Pro', 'Amiri'];
        const fontsSans = ['Source Sans Pro', 'Lato', 'Barlow', 'Roboto', 'Nunito', 'Karla', 'Titillium Web', 'Jost', 'Rubik', 'Open Sans', 'Mulish', 'Work Sans', 'Fira Sans', 'Asap', 'IBM Plex Sans'];
        const fontsMono = ['Inconsolata', 'Overpass Mono', 'Source Code Pro', 'Space Mono', 'IBM Plex Mono', 'Courier Prime'];

        function renderFontList(type) {
            const container = document.getElementById('font-list-container');
            let list = [];
            if (type === 'serif') list = fontsSerif;
            if (type === 'sans') list = fontsSans;
            if (type === 'mono') list = fontsMono;
            
            ['font-tab-serif', 'font-tab-sans', 'font-tab-mono'].forEach(id => {
                document.getElementById(id).classList.remove('active');
                document.getElementById(id).style.borderColor = '#444';
                document.getElementById(id).style.color = '#ccc';
            });
            const activeTab = document.getElementById('font-tab-' + type);
            activeTab.classList.add('active');
            activeTab.style.borderColor = '#EEC30C';
            activeTab.style.color = '#EEC30C';

            container.innerHTML = list.map(font => `
                <button onclick="applyFont('${font}', this)" class="style-option font-option-btn" style="padding:0.6rem; border-radius:20px; font-size:0.8rem; flex:1; min-width:30%; text-align:center;">${font}</button>
            `).join('');
        }

        function applyFont(fontFamily, btnElement) {
            document.querySelectorAll('.font-option-btn').forEach(btn => btn.classList.remove('active'));
            if (btnElement) btnElement.classList.add('active');
            
            const link = document.createElement('link');
            link.href = 'https://fonts.googleapis.com/css2?family=' + fontFamily.replace(/\s+/g, '+') + ':wght@400;500;600;700&display=swap';
            link.rel = 'stylesheet';
            document.head.appendChild(link);
            
            document.getElementById('resumeSheet').style.fontFamily = `"${fontFamily}", sans-serif`;
        }

        const presetColors = ['#ffffff', '#444444', '#4b7556', '#87a2c7', '#1f828a', '#1e3b6a', '#2961ba', '#539ed3', '#4bc4e0', '#3b1c60', '#631342', '#b3617b', '#d73e72', '#ec4833'];
        let activeAccentColor = '#EEC30C';

        function renderColors() {
            const grid = document.getElementById('colors-grid');
            if(grid) {
                grid.innerHTML = presetColors.map(c => `
                    <div class="color-dot" style="background:${c}; width:32px; height:32px; border-radius:50%; cursor:pointer; border:1px solid #444;" onclick="applyCustomAccentColor('${c}', this)"></div>
                `).join('') + `
                    <div class="color-dot" style="background:conic-gradient(red, yellow, lime, aqua, blue, magenta, red); width:32px; height:32px; border-radius:50%; cursor:pointer; border:1px solid #444;" onclick="document.getElementById('custom-color-picker').click()"></div>
                    <input type="color" id="custom-color-picker" style="display:none;" onchange="applyCustomAccentColor(this.value)">
                `;
            }
        }

        function applyCustomAccentColor(color, btn) {
            activeAccentColor = color;
            document.querySelectorAll('#colors-grid .color-dot').forEach(d => {
                d.innerHTML = '';
                d.style.borderColor = '#444';
            });
            if (btn) {
                btn.innerHTML = '<i class="fa-solid fa-check" style="color:' + (color==='#ffffff'?'#000':'#fff') + '; font-size:12px; display:flex; justify-content:center; align-items:center; height:100%;"></i>';
                btn.style.borderColor = color;
            } else {
                const lastDot = document.getElementById('colors-grid').lastElementChild.previousElementSibling;
                if(lastDot) {
                    lastDot.innerHTML = '<i class="fa-solid fa-check" style="color:#fff; font-size:12px; display:flex; justify-content:center; align-items:center; height:100%;"></i>';
                }
            }
            applyColorPreferences();
        }

        function applyColorPreferences() {
            const nameColor = document.getElementById('color-pref-name')?.checked ? activeAccentColor : '#000';
            const titleColor = document.getElementById('color-pref-job')?.checked ? activeAccentColor : '#666';
            const headingsColor = document.getElementById('color-pref-headings')?.checked ? activeAccentColor : '#000';
            
            document.getElementById('sheet-fullname').style.color = nameColor;
            document.getElementById('sheet-role').style.color = titleColor;
            
            document.querySelectorAll('.sheet-section-title').forEach(t => {
                t.style.color = headingsColor;
                if (document.getElementById('color-pref-lines')?.checked) {
                    t.style.borderBottomColor = activeAccentColor;
                } else {
                    t.style.borderBottomColor = '#000';
                }
            });
            
            const prefIcons = document.getElementById('color-pref-icons')?.checked;
            document.querySelectorAll('.sheet-contact i').forEach(icon => {
                if (icon.classList.contains('link-external-icon')) return;
                
                // Read the active icon style from active button
                const activeIconBtn = document.querySelector('button[onclick*="setHeaderIconStyle"].active') || document.querySelector('.style-option.active[onclick*="setHeaderIconStyle"]');
                let style = 'none';
                if (activeIconBtn) {
                    const match = activeIconBtn.getAttribute('onclick').match(/setHeaderIconStyle\('([^']+)'/);
                    if (match) style = match[1];
                }
                
                if (prefIcons) {
                    if (style.includes('filled')) {
                        icon.style.background = activeAccentColor;
                        icon.style.color = '#fff';
                        icon.style.border = 'none';
                    } else if (style.includes('outline')) {
                        icon.style.border = `1px solid ${activeAccentColor}`;
                        icon.style.color = activeAccentColor;
                        icon.style.background = 'transparent';
                    } else {
                        icon.style.color = activeAccentColor;
                        icon.style.background = 'transparent';
                        icon.style.border = 'none';
                    }
                } else {
                    // Revert to default icon styling matching setHeaderIconStyle
                    icon.style.background = '';
                    icon.style.color = '';
                    icon.style.border = '';
                    if (style === 'circle-filled') {
                        icon.style.background = '#000'; icon.style.color = '#fff';
                    } else if (style === 'gray-circle-filled') {
                        icon.style.background = '#aaa'; icon.style.color = '#fff';
                    } else if (style === 'gray-square-filled') {
                        icon.style.background = '#aaa'; icon.style.color = '#fff';
                    } else if (style === 'circle-outline') {
                        icon.style.border = '1px solid #aaa'; icon.style.color = '#777';
                    } else if (style === 'rounded-square-outline') {
                        icon.style.border = '1px solid #aaa'; icon.style.color = '#777';
                    } else if (style === 'square-outline') {
                        icon.style.border = '1px solid #aaa'; icon.style.color = '#777';
                    }
                }
            });
            
            document.querySelectorAll('.sheet-entry-header').forEach(h => {
                h.style.color = document.getElementById('color-pref-dates')?.checked ? activeAccentColor : 'inherit';
            });
            
            document.querySelectorAll('.sheet-entry-role').forEach(r => {
                r.style.color = document.getElementById('color-pref-subtitle')?.checked ? activeAccentColor : 'inherit';
            });
        }

        // ─── COLOR MODE SWITCHING ──────────────────────────────────────────
        let currentColorMode = 'basic';
        let currentColorSubTab = 'accent';

        const advColorSwatches = ['#ffffff','#1e3a8a','#4b7556','#087e8b','#1e293b','#2961ba','#539ed3','#3b1c60','#631342','#b3617b','#d73e72','#ec4833','#4b5563','#111827'];

        function switchColorMode(mode) {
            currentColorMode = mode;
            ['basic','advanced','border'].forEach(m => {
                document.getElementById('color-panel-' + m).style.display = 'none';
                document.getElementById('mode-circle-' + m).style.borderColor = '#444';
                const lbl = document.getElementById('mode-label-' + m);
                if (lbl) { lbl.style.color = '#888'; lbl.style.fontWeight = ''; }
            });
            document.getElementById('color-panel-' + mode).style.display = '';
            document.getElementById('mode-circle-' + mode).style.borderColor = '#EEC30C';
            const lbl = document.getElementById('mode-label-' + mode);
            if (lbl) { lbl.style.color = '#EEC30C'; lbl.style.fontWeight = '600'; }

            // special label for basic (no element, handled by initial HTML)
            if (mode === 'advanced') { renderAdvancedSwatches(); }
            if (mode === 'border') { renderBorderSwatches(); }
        }

        function switchColorSubTab(tab) {
            currentColorSubTab = tab;
            ['accent','multi','image'].forEach(t => {
                document.getElementById('cpanel-' + t).style.display = 'none';
                document.getElementById('ctab-' + t).classList.remove('active');
            });
            document.getElementById('cpanel-' + tab).style.display = '';
            document.getElementById('ctab-' + tab).classList.add('active');
        }

        function openMultiCustomPicker() {
            const p = document.getElementById('multi-custom-picker');
            p.style.display = p.style.display === 'none' ? '' : 'none';
        }

        function applyMultiPreset(textColor, accentColor) {
            const sheet = document.getElementById('resumeSheet');
            if (!sheet) return;
            sheet.style.color = textColor;
            activeAccentColor = accentColor;
            applyColorPreferences();
        }

        function updateMultiColors() {
            const textColor  = document.getElementById('picker-text-color')?.value  || '#000000';
            const bgColor    = document.getElementById('picker-bg-color')?.value    || '#ffffff';
            const accentColor= document.getElementById('picker-accent-color')?.value|| '#1e3a8a';

            document.getElementById('multi-text-preview').style.background  = textColor;
            document.getElementById('multi-bg-preview').style.background    = bgColor;
            document.getElementById('multi-accent-preview').style.background= accentColor;

            const sheet = document.getElementById('resumeSheet');
            if (!sheet) return;
            sheet.style.color = textColor;
            sheet.style.backgroundColor = bgColor;
            activeAccentColor = accentColor;
            applyColorPreferences();
        }

        function applyHeaderBgImage(input) {
            const file = input.files[0];
            if (!file) return;
            const reader = new FileReader();
            reader.onload = function(e) {
                const header = document.querySelector('#resumeSheet .sheet-header');
                if (header) {
                    header.style.backgroundImage = `url(${e.target.result})`;
                    header.style.backgroundSize = 'cover';
                    header.style.backgroundPosition = 'center';
                }
            };
            reader.readAsDataURL(file);
        }

        // ─── ADVANCED HEADER BACKGROUND ───────────────────────────────────
        
        // Use presetColors for the grid, but add transparent at the front
        const advPresetColors = ['transparent'].concat(presetColors);
        let activeAdvAccentColor = '#1e3a8a';

        function renderAdvancedSwatches() {
            const container = document.getElementById('adv-colors-grid');
            if (!container) return;
            container.innerHTML = advPresetColors.map(c => {
                if (c === 'transparent') {
                    return `<div class="color-dot" style="width:32px; height:32px; border-radius:50%; cursor:pointer; border:1px solid #444; position:relative; overflow:hidden;" onclick="applyAdvancedHeaderBg('transparent', this)">
                        <div style="position:absolute; top:0; left:0; right:0; bottom:0; background:url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAAECAYAAACp8Z5+AAAAIklEQVQIW2NkQAKrVq36zwjjgzhhYWGMYAEYB8RmROaABADeOQ8CXl/xfgAAAABJRU5ErkJggg==');"></div>
                        <div style="position:absolute; top:50%; left:0; right:0; height:1px; background:#ff4444; transform:rotate(-45deg);"></div>
                    </div>`;
                }
                return `<div class="color-dot" style="background:${c}; width:32px; height:32px; border-radius:50%; cursor:pointer; border:1px solid #444;" onclick="applyAdvancedHeaderBg('${c}', this)"></div>`;
            }).join('') + `
                <div class="color-dot" style="background:conic-gradient(red, yellow, lime, aqua, blue, magenta, red); width:32px; height:32px; border-radius:50%; cursor:pointer; border:1px solid #444;" onclick="document.getElementById('adv-custom-color-picker').click()"></div>
                <input type="color" id="adv-custom-color-picker" style="display:none;" onchange="applyAdvancedHeaderBg(this.value, null, true)">
            `;
        }

        function switchAdvColorSubTab(tab) {
            ['accent','multi','image'].forEach(t => {
                document.getElementById('adv-cpanel-' + t).style.display = 'none';
                document.getElementById('adv-ctab-' + t).classList.remove('active');
            });
            document.getElementById('adv-cpanel-' + tab).style.display = '';
            document.getElementById('adv-ctab-' + tab).classList.add('active');
        }

        function applyAdvancedHeaderBg(color, btn, isPicker = false) {
            activeAdvAccentColor = color === 'transparent' ? '#000000' : color;
            document.querySelectorAll('#adv-colors-grid .color-dot').forEach(d => {
                const icon = d.querySelector('i');
                if(icon) icon.remove();
                d.style.borderColor = '#444';
            });
            
            if (btn) {
                btn.innerHTML += '<i class="fa-solid fa-check" style="position:absolute; top:50%; left:50%; transform:translate(-50%,-50%); color:' + (color==='#ffffff'||color==='transparent'?'#000':'#fff') + '; font-size:12px;"></i>';
                btn.style.borderColor = color === 'transparent' ? '#444' : color;
            } else if(isPicker) {
                const lastDot = document.getElementById('adv-colors-grid').lastElementChild.previousElementSibling;
                if(lastDot) {
                    lastDot.innerHTML = '<i class="fa-solid fa-check" style="position:absolute; top:50%; left:50%; transform:translate(-50%,-50%); color:#fff; font-size:12px;"></i>';
                }
            }

            const header = document.querySelector('#resumeSheet .sheet-header');
            if (!header) return;
            
            if (color === 'transparent') {
                header.style.backgroundColor = 'transparent';
                header.style.padding = '0';
                header.style.margin = '0';
                document.getElementById('resumeSheet').style.backgroundColor = '#ffffff';
                document.getElementById('resumeSheet').style.color = '#000000';
            } else {
                header.style.backgroundColor = color;
                header.style.padding = '1.5rem 2rem';
                header.style.margin = '-24mm -24mm 0';
            }

            const isDark = color !== 'transparent' && isColorDark(color);
            header.style.color = isDark ? '#ffffff' : '#000000';
            const name = header.querySelector('#sheet-fullname');
            const role = header.querySelector('#sheet-role');
            const contact = header.querySelector('.sheet-contact');
            if (name) name.style.color = isDark ? '#ffffff' : '#000000';
            if (role) role.style.color = isDark ? 'rgba(255,255,255,0.85)' : '#444';
            if (contact) contact.querySelectorAll('span, i').forEach(s => s.style.color = isDark ? 'rgba(255,255,255,0.85)' : '#555');

            applyAdvColorPreferences();
        }

        function applyAdvColorPreferences() {
            const ac = activeAdvAccentColor;
            const nameColor = document.getElementById('adv-color-pref-name')?.checked ? ac : 'inherit';
            const titleColor = document.getElementById('adv-color-pref-job')?.checked ? ac : 'inherit';
            const headingsColor = document.getElementById('adv-color-pref-headings')?.checked ? ac : '#000';
            
            const name = document.getElementById('sheet-fullname');
            if(name && name.style.color !== '#ffffff' && name.style.color !== 'rgb(255, 255, 255)') {
                name.style.color = nameColor;
            }
            
            const role = document.getElementById('sheet-role');
            if(role && role.style.color !== 'rgba(255, 255, 255, 0.85)') {
                role.style.color = titleColor;
            }
            
            document.querySelectorAll('.sheet-section-title').forEach(t => {
                t.style.color = headingsColor;
                if (document.getElementById('adv-color-pref-lines')?.checked) {
                    t.style.borderBottomColor = ac;
                } else {
                    t.style.borderBottomColor = '#000';
                }
            });
            
            const prefIcons = document.getElementById('adv-color-pref-icons')?.checked;
            document.querySelectorAll('.sheet-contact i').forEach(icon => {
                if (icon.classList.contains('link-external-icon')) return;
                
                const activeIconBtn = document.querySelector('button[onclick*="setHeaderIconStyle"].active') || document.querySelector('.style-option.active[onclick*="setHeaderIconStyle"]');
                let style = 'none';
                if (activeIconBtn) {
                    const match = activeIconBtn.getAttribute('onclick').match(/setHeaderIconStyle\('([^']+)'/);
                    if (match) style = match[1];
                }
                
                if (prefIcons) {
                    if (style.includes('filled')) {
                        icon.style.background = ac;
                        icon.style.color = '#fff';
                        icon.style.border = 'none';
                    } else if (style.includes('outline')) {
                        icon.style.border = `1px solid ${ac}`;
                        icon.style.color = ac;
                        icon.style.background = 'transparent';
                    } else {
                        icon.style.color = ac;
                        icon.style.background = 'transparent';
                        icon.style.border = 'none';
                    }
                } else {
                    icon.style.background = '';
                    icon.style.color = '';
                    icon.style.border = '';
                    if (style === 'circle-filled') {
                        icon.style.background = '#000'; icon.style.color = '#fff';
                    } else if (style === 'gray-circle-filled') {
                        icon.style.background = '#aaa'; icon.style.color = '#fff';
                    } else if (style === 'gray-square-filled') {
                        icon.style.background = '#aaa'; icon.style.color = '#fff';
                    } else if (style === 'circle-outline') {
                        icon.style.border = '1px solid #aaa'; icon.style.color = '#777';
                    } else if (style === 'rounded-square-outline') {
                        icon.style.border = '1px solid #aaa'; icon.style.color = '#777';
                    } else if (style === 'square-outline') {
                        icon.style.border = '1px solid #aaa'; icon.style.color = '#777';
                    }
                }
            });
            
            document.querySelectorAll('.sheet-entry-header').forEach(h => {
                h.style.color = document.getElementById('adv-color-pref-dates')?.checked ? ac : 'inherit';
            });
            
            document.querySelectorAll('.sheet-entry-role').forEach(r => {
                r.style.color = document.getElementById('adv-color-pref-subtitle')?.checked ? ac : 'inherit';
            });
        }

        function openAdvMultiCustomPicker() {
            const p = document.getElementById('adv-multi-custom-picker');
            p.style.display = p.style.display === 'none' ? '' : 'none';
        }

        function applyAdvMultiPreset(hText, hBg, bText, bBg, accent) {
            applyAdvancedHeaderBg(hBg);
            document.getElementById('resumeSheet').style.backgroundColor = bBg;
            document.getElementById('resumeSheet').style.color = bText;
            
            const header = document.querySelector('#resumeSheet .sheet-header');
            if(header) {
                header.style.color = hText;
                const name = header.querySelector('#sheet-fullname');
                const role = header.querySelector('#sheet-role');
                const contact = header.querySelector('.sheet-contact');
                if (name) name.style.color = hText;
                if (role) role.style.color = hText === '#ffffff' ? 'rgba(255,255,255,0.85)' : '#444';
                if (contact) contact.querySelectorAll('span, i').forEach(s => s.style.color = hText === '#ffffff' ? 'rgba(255,255,255,0.85)' : '#555');
            }

            activeAdvAccentColor = accent;
            applyAdvColorPreferences();
        }

        function updateAdvMultiColors() {
            const hText = document.getElementById('adv-h-text-color').value;
            const hBg = document.getElementById('adv-h-bg-color').value;
            const hAcc = document.getElementById('adv-h-accent-color').value; // Usually accent is global, but mock shows 2 accents, we'll use header accent globally for simplicity

            const bText = document.getElementById('adv-b-text-color').value;
            const bBg = document.getElementById('adv-b-bg-color').value;
            
            document.getElementById('adv-h-text-preview').style.background = hText;
            document.getElementById('adv-h-bg-preview').style.background = hBg;
            document.getElementById('adv-h-accent-preview').style.background = hAcc;

            document.getElementById('adv-b-text-preview').style.background = bText;
            document.getElementById('adv-b-bg-preview').style.background = bBg;

            applyAdvMultiPreset(hText, hBg, bText, bBg, hAcc);
        }

        function isColorDark(hex) {
            const c = hex.replace('#','');
            if (c.length < 6) return false;
            const r = parseInt(c.substring(0,2),16);
            const g = parseInt(c.substring(2,4),16);
            const b = parseInt(c.substring(4,6),16);
            return (0.299*r + 0.587*g + 0.114*b) < 128;
        }

        // ─── BORDER COLOR ─────────────────────────────────────────────────
        let currentBorderSize = '8px';
        let currentBorderColor = 'transparent';

        function switchBorderSubTab(tab) {
            ['accent','image'].forEach(t => {
                document.getElementById('border-cpanel-' + t).style.display = 'none';
                document.getElementById('border-ctab-' + t).classList.remove('active');
            });
            document.getElementById('border-cpanel-' + tab).style.display = '';
            document.getElementById('border-ctab-' + tab).classList.add('active');
        }

        function applyPageBorders() {
            const sheetContainer = document.getElementById('resumeSheet');
            if (!sheetContainer) return;
            
            const top = document.getElementById('border-opt-top')?.checked;
            const bottom = document.getElementById('border-opt-bottom')?.checked;
            const left = document.getElementById('border-opt-left')?.checked;
            const right = document.getElementById('border-opt-right')?.checked;
            
            sheetContainer.style.boxSizing = 'border-box';
            sheetContainer.style.borderTop = top && currentBorderColor !== 'transparent' ? `${currentBorderSize} solid ${currentBorderColor}` : 'none';
            sheetContainer.style.borderBottom = bottom && currentBorderColor !== 'transparent' ? `${currentBorderSize} solid ${currentBorderColor}` : 'none';
            sheetContainer.style.borderLeft = left && currentBorderColor !== 'transparent' ? `${currentBorderSize} solid ${currentBorderColor}` : 'none';
            sheetContainer.style.borderRight = right && currentBorderColor !== 'transparent' ? `${currentBorderSize} solid ${currentBorderColor}` : 'none';
        }

        function setBorderSize(size, btn) {
            currentBorderSize = size;
            btn.parentElement.querySelectorAll('button').forEach(b => {
                b.style.color = '#ccc'; b.style.fontWeight = 'normal';
            });
            btn.style.color = '#EEC30C'; btn.style.fontWeight = 'bold';
            applyPageBorders();
        }

        function applyBorderColor(color, swatchEl, isPicker=false) {
            currentBorderColor = color;
            document.querySelectorAll('#border-color-swatches .color-dot').forEach(d => {
                const icon = d.querySelector('i');
                if(icon) icon.remove();
                d.style.borderColor = '#444';
            });
            
            if (swatchEl) {
                swatchEl.innerHTML += '<i class="fa-solid fa-check" style="position:absolute; top:50%; left:50%; transform:translate(-50%,-50%); color:' + (color==='#ffffff'||color==='transparent'?'#000':'#fff') + '; font-size:12px;"></i>';
                swatchEl.style.borderColor = color === 'transparent' ? '#444' : color;
            } else if(isPicker) {
                const lastDot = document.getElementById('border-color-swatches').lastElementChild.previousElementSibling;
                if(lastDot) {
                    lastDot.innerHTML = '<i class="fa-solid fa-check" style="position:absolute; top:50%; left:50%; transform:translate(-50%,-50%); color:#fff; font-size:12px;"></i>';
                }
            }
            applyPageBorders();
        }

        const borderSwatchColors = ['transparent'].concat(presetColors);
        function renderBorderSwatches() {
            const container = document.getElementById('border-color-swatches');
            if (!container) return;
            container.innerHTML = borderSwatchColors.map(c => {
                if (c === 'transparent') {
                    return `<div class="color-dot" style="width:32px; height:32px; border-radius:50%; cursor:pointer; border:1px solid #444; position:relative; overflow:hidden;" onclick="applyBorderColor('transparent', this)">
                        <div style="position:absolute; top:0; left:0; right:0; bottom:0; background:url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAAECAYAAACp8Z5+AAAAIklEQVQIW2NkQAKrVq36zwjjgzhhYWGMYAEYB8RmROaABADeOQ8CXl/xfgAAAABJRU5ErkJggg==');"></div>
                        <div style="position:absolute; top:50%; left:0; right:0; height:1px; background:#ff4444; transform:rotate(-45deg);"></div>
                    </div>`;
                }
                return `<div class="color-dot" style="background:${c}; width:32px; height:32px; border-radius:50%; cursor:pointer; border:1px solid #444;" onclick="applyBorderColor('${c}', this)"></div>`;
            }).join('') + `
                <div class="color-dot" style="background:conic-gradient(red, yellow, lime, aqua, blue, magenta, red); width:32px; height:32px; border-radius:50%; cursor:pointer; border:1px solid #444;" onclick="document.getElementById('border-custom-color-picker').click()"></div>
                <input type="color" id="border-custom-color-picker" style="display:none;" onchange="applyBorderColor(this.value, null, true)">
            `;
        }

        function applyBorderImage(input) {
            const file = input.files[0];
            if (!file) return;
            const reader = new FileReader();
            reader.onload = function(e) {
                const sheetContainer = document.getElementById('resumeSheet');
                if (sheetContainer) {
                    sheetContainer.style.borderImage = `url(${e.target.result}) 30 round`;
                    sheetContainer.style.borderWidth = currentBorderSize;
                    sheetContainer.style.borderStyle = 'solid';
                }
            };
            reader.readAsDataURL(file);
        }

        // ─── NEW ACCORDIONS LOGIC ───────────────────────────────────────
        function setSectionHeadingStyle(style, btn) {
            btn.parentElement.querySelectorAll('button').forEach(b => {
                b.classList.remove('active');
            });
            btn.classList.add('active');
            
            let shStyle = document.getElementById('sh-dynamic-style');
            if(!shStyle) {
                shStyle = document.createElement('style');
                shStyle.id = 'sh-dynamic-style';
                document.head.appendChild(shStyle);
            }
            
            let css = `.sheet-section-title { 
                position: relative; 
                display: block; 
                border-bottom: none; 
                border-top: none; 
                background: transparent; 
                padding: 0; 
                margin-bottom: 0.5rem;
                clear: both;
            }\n`;
            css += `.sheet-section-title::after, .sheet-section-title::before { content: none; display: none; }\n`;
            
            const ac = window.activeAccentColor || '#EEC30C';
            document.querySelectorAll('.flow-heading-icon').forEach(icon => icon.remove());
            
            if (style === 'top-bottom-lines') {
                css += `.sheet-section-title { border-top: 1px solid #ccc; border-bottom: 1px solid #ccc; padding-top: 5px; padding-bottom: 5px; }\n`;
            } else if (style === 'box') {
                css += `.sheet-section-title { background-color: rgba(0,0,0,0.05); padding: 5px 10px; }\n`;
            } else if (style === 'full-underline') {
                css += `.sheet-section-title { border-bottom: 1px solid #ccc; padding-bottom: 5px; }\n`;
            } else if (style === 'short-double-underline') {
                css += `.sheet-section-title { display: inline-block; width: fit-content; padding-bottom: 5px; border-bottom: 3px solid ${ac}; }\n`;
            } else if (style === 'line-text-line') {
                css += `.sheet-section-title { display: flex; align-items: center; white-space: nowrap; }\n`;
                css += `.sheet-section-title::after { content: ''; display: block; flex: 1; height: 1px; background: #ccc; margin-left: 10px; }\n`;
            } else if (style === 'wavy-line') {
                css += `.sheet-section-title { padding-bottom: 8px; background-image: radial-gradient(circle at 2px 2px, transparent 2px, ${ac} 2.5px, ${ac} 3px, transparent 3.5px); background-size: 4px 4px; background-repeat: repeat-x; background-position: bottom left; }\n`;
            } else if (style === 'dashed') {
                css += `.sheet-section-title { border-bottom: 2px dashed #ccc; padding-bottom: 5px; }\n`;
            } else if (style === 'thick-thin') {
                css += `.sheet-section-title { padding-bottom: 8px; border-bottom: 1px solid #ccc; }\n`;
                css += `.sheet-section-title::after { content: ''; display: block; position: absolute; bottom: -1px; left: 0; width: 40%; height: 3px; background: ${ac}; }\n`;
            } else if (style === 'wavy-line-2') {
                css += `.sheet-section-title { padding-bottom: 8px; background-image: radial-gradient(circle at 3px 3px, transparent 3px, ${ac} 3.5px, ${ac} 4px, transparent 4.5px); background-size: 6px 6px; background-repeat: repeat-x; background-position: bottom left; }\n`;
            } else if (style === 'dotted') {
                css += `.sheet-section-title { border-bottom: 2px dotted #ccc; padding-bottom: 5px; }\n`;
            } else if (style === 'flow-icon-heading') {
                css += `.sheet-section-title { display: flex; align-items: center; justify-content: center; gap: 10px; width: 100%; border-top: 1px solid #111; border-bottom: 1px solid #111; padding: 7px 0; background: transparent; text-align: center; }\n`;
            } else if (style === 'flow-short-underline') {
                css += `.sheet-section-title { display: flex; align-items: center; gap: 10px; width: fit-content; border: none; padding: 0; background: transparent; }\n`;
            } else if (style === 'flow-black-underline') {
                css += `.sheet-section-title { display: flex; align-items: center; gap: 10px; width: fit-content; border: none; padding: 0 0 10px 0; background: transparent; }\n`;
                css += `.sheet-section-title::after { content: ''; display: block; position: absolute; left: 0; bottom: 0; width: 70px; height: 5px; background: #111; }\n`;
            } else if (style === 'zigzag-line') {
                css += `.sheet-section-title { padding-bottom: 10px; background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='7' viewBox='0 0 16 7'%3E%3Cpolyline points='0,6 4,1 8,6 12,1 16,6' fill='none' stroke='%23111' stroke-width='1.7'/%3E%3C/svg%3E"); background-size: 16px 7px; background-position: left bottom; background-repeat: repeat-x; }\n`;
            }
            
            shStyle.innerHTML = css;

            if (style === 'flow-icon-heading' || style === 'flow-short-underline' || style === 'flow-black-underline') {
                document.querySelectorAll('.sheet-section').forEach(secContainer => {
                    const secId = secContainer.getAttribute('data-id');
                    const section = resumeData.sections.find(s => s.id === secId);
                    if (!section) return;
                    const el = secContainer.querySelector('.sheet-section-title');
                    if (!el) return;
                    
                    Array.from(el.children).forEach(child => {
                        if (child.tagName.toLowerCase() === 'i') child.remove();
                    });
                    
                    if (section.iconHidden) return;
                    
                    const defaultIcon = getDefaultSectionIconClass(section.type);
                    const currentIcon = section.icon || defaultIcon;
                    
                    const icon = document.createElement('i');
                    icon.className = `flow-heading-icon ${currentIcon}`;
                    icon.style.color = ac;
                    icon.style.fontSize = '1.05em';
                    icon.style.lineHeight = '1';
                    icon.style.marginRight = '8px';
                    el.insertBefore(icon, el.firstChild);
                });
            }
        }

        function setSectionHeadingTransform(transform, btn) {
            btn.parentElement.querySelectorAll('.alignment-option, button').forEach(b => { b.classList.remove('active'); });
            btn.classList.add('active');
            document.querySelectorAll('.sheet-section-title').forEach(el => {
                el.style.textTransform = transform === 'uppercase' ? 'uppercase' : 'capitalize';
            });
        }

        function setSectionHeadingSize(size, btn) {
            btn.parentElement.querySelectorAll('button').forEach(b => { b.classList.remove('active'); b.style.color='#ccc'; });
            btn.classList.add('active'); btn.style.color='#EEC30C';
            document.querySelectorAll('.sheet-section-title').forEach(el => {
                el.style.fontSize = size;
            });
        }

        function setSectionHeadingIcons(type, btn) {
            btn.parentElement.querySelectorAll('.alignment-option, button').forEach(b => { b.classList.remove('active'); });
            btn.classList.add('active');
            
            document.querySelectorAll('.sheet-section').forEach(secContainer => {
                const secId = secContainer.getAttribute('data-id');
                const section = resumeData.sections.find(s => s.id === secId);
                if (!section) return;
                const el = secContainer.querySelector('.sheet-section-title');
                if (!el) return;
                
                let i = el.querySelector('i');
                const isHeadingStyleWithIcons = ['flow-icon-heading', 'flow-short-underline', 'flow-black-underline'].includes(document.querySelector('.style-option.active[onclick*="setSectionHeadingStyle"]')?.getAttribute('onclick')?.match(/setSectionHeadingStyle\('([^']+)'/)?.[1] || '');
                
                if (section.iconHidden) {
                    if (i) i.remove();
                    return;
                }
                
                if (type === 'none' && !isHeadingStyleWithIcons) {
                    if (section.icon) {
                        if (!i) {
                            i = document.createElement('i');
                            i.style.marginRight = '8px';
                            el.insertBefore(i, el.firstChild);
                        }
                        i.className = `flow-heading-icon ${section.icon}`;
                    } else {
                        if (i) i.remove();
                    }
                } else {
                    if (!i) {
                        i = document.createElement('i');
                        i.style.marginRight = '8px';
                        el.insertBefore(i, el.firstChild);
                    }
                    if (section.icon) {
                        i.className = `flow-heading-icon ${section.icon}`;
                    } else {
                        const defaultIcon = getDefaultSectionIconClass(section.type);
                        if (type === 'outline') {
                            i.className = 'fa-regular fa-folder-open';
                        } else if (type === 'filled') {
                            i.className = 'fa-solid fa-folder';
                        } else {
                            i.className = `flow-heading-icon ${defaultIcon}`;
                        }
                    }
                }
            });
        }

        function toggleAdvancedSettings(el) {
            const p = el.nextElementSibling;
            p.style.display = p.style.display === 'none' ? 'block' : 'none';
        }

        function applyLinkStyling() {
            const underline = document.getElementById('link-style-underline')?.checked;
            const blue = document.getElementById('link-style-blue')?.checked;
            const icon = document.getElementById('link-style-icon')?.checked;
            
            document.querySelectorAll('.sheet-contact span').forEach(span => {
                const key = span.id.replace('sheet-', '');
                const text = span.textContent.trim();
                if(!text) return;
                
                const leftChecked = document.getElementById(`link-opt-left-${key}`)?.checked;
                const rightChecked = document.getElementById(`link-opt-right-${key}`)?.checked;
                
                const finalUnderline = underline && leftChecked;
                const finalBlue = blue && rightChecked;
                const finalIcon = icon && (leftChecked || rightChecked);
                
                const aElement = span.querySelector('a');
                const targetElements = aElement ? [aElement] : [span];
                
                targetElements.forEach(target => {
                    target.style.textDecoration = finalUnderline ? 'underline' : 'none';
                    target.style.color = finalBlue ? '#2563eb' : 'inherit';
                });
                
                let i = span.querySelector('.link-external-icon');
                const isPhone = text.includes('+') || text.match(/[0-9]{3}/) || key === 'phone' || key === 'secondphone';
                
                if (finalIcon && !isPhone) {
                    if (!i) {
                        span.innerHTML += ' <i class="fa-solid fa-arrow-up-right-from-square link-external-icon" style="font-size:0.7em;"></i>';
                    }
                } else {
                    if (i) i.remove();
                }
            });
        }
        
        function updateLinkStylingOptions() {
            const leftCol = document.getElementById('link-adv-left-col');
            const rightCol = document.getElementById('link-adv-right-col');
            if(!leftCol || !rightCol) return;
            
            const contactSpans = document.querySelectorAll('.sheet-contact span');
            
            let htmlLeft = `<div style="font-size:0.85rem; color:#ccc; margin-bottom:0.2rem;">All options</div>`;
            let htmlRight = `<div style="font-size:0.85rem; color:#ccc; margin-bottom:0.2rem;">All options</div>`;
            
            contactSpans.forEach(span => {
                if (span.style.display === 'none') return;
                let text = span.textContent.trim();
                if(!text) return;
                let key = span.id.replace('sheet-', '');
                let label = key;
                if(key === 'address') label = 'Location';
                
                const oldLeft = document.getElementById(`link-opt-left-${key}`);
                const checkedLeft = oldLeft ? (oldLeft.checked ? 'checked' : '') : 'checked';
                const oldRight = document.getElementById(`link-opt-right-${key}`);
                const checkedRight = oldRight ? (oldRight.checked ? 'checked' : '') : '';
                
                htmlLeft += `<label style="display:flex; align-items:center; gap:0.5rem; cursor:pointer;"><input type="checkbox" onchange="applyLinkStyling()" id="link-opt-left-${key}" data-key="${key}" style="accent-color:#EEC30C;" ${checkedLeft}><span style="font-size:0.8rem; color:#ccc; text-transform:capitalize;">${label}</span></label>`;
                
                htmlRight += `<label style="display:flex; align-items:center; gap:0.5rem; cursor:pointer;"><input type="checkbox" onchange="applyLinkStyling()" id="link-opt-right-${key}" data-key="${key}" style="accent-color:#EEC30C;" ${checkedRight}><span style="font-size:0.8rem; color:#ccc; text-transform:capitalize;">${label}</span></label>`;
            });
            
            leftCol.innerHTML = htmlLeft;
            rightCol.innerHTML = htmlRight;
        }

        document.addEventListener('DOMContentLoaded', () => {
            const sc = document.querySelector('.sheet-contact');
            if(sc) {
                const sheetContactObserver = new MutationObserver(() => {
                    updateLinkStylingOptions();
                    applyLinkStyling();
                });
                sheetContactObserver.observe(sc, { childList: true, subtree: true, characterData: true });
                updateLinkStylingOptions();
            }
        });

        function setHeaderAlignment(align, btn) {
            btn.parentElement.querySelectorAll('.alignment-option, button').forEach(b => { b.classList.remove('active'); });
            btn.classList.add('active');
            
            const header = document.querySelector('#resumeSheet .sheet-header');
            const main = document.getElementById('sheet-header-main');
            const details = document.getElementById('sheet-header-details');
            if (header) {
                header.style.display = 'flex';
                header.style.gap = align === 'center' ? '0.8rem' : '1.4rem';
                header.style.flexDirection = align === 'center' ? 'column' : 'column';
                header.style.alignItems = align === 'center' ? 'center' : 'flex-start';
                header.style.justifyContent = align === 'center' ? 'center' : 'flex-start';
                header.style.textAlign = align;
                if (main) {
                    main.style.display = 'flex';
                    main.style.alignItems = align === 'center' ? 'center' : 'baseline';
                    main.style.justifyContent = align === 'center' ? 'center' : 'flex-start';
                    main.style.flexWrap = 'wrap';
                    main.style.gap = align === 'center' ? '0.25rem' : '1rem';
                    main.style.width = '100%';
                }
                if (details) {
                    details.style.width = '100%';
                    details.style.justifyContent = align === 'center' ? 'center' : 'flex-start';
                }
                const contact = header.querySelector('.sheet-contact');
                if (contact) {
                    contact.style.justifyContent = align === 'center' ? 'center' : 'flex-start';
                    contact.style.textAlign = align;
                }
            }
        }

        function setHeaderArrangement(arr, btn) {
            btn.parentElement.querySelectorAll('button').forEach(b => { 
                b.classList.remove('active'); 
                b.querySelectorAll('.arr-highlight').forEach(d => d.style.background = '#ccc');
            });
            btn.classList.add('active');
            btn.querySelectorAll('.arr-highlight').forEach(d => d.style.background = '#7e22ce');
            
            const contact = document.querySelector('.sheet-contact');
            if (!contact) return;
            
            if (arr === 'stacked') {
                contact.style.display = 'flex';
                contact.style.flexDirection = 'column';
                contact.style.flexWrap = 'nowrap';
                contact.style.gap = '0.5rem';
                contact.style.gridTemplateColumns = '';
            } else if (arr === 'inline') {
                contact.style.display = 'flex';
                contact.style.flexDirection = 'row';
                contact.style.flexWrap = 'wrap';
                contact.style.gap = '1.5rem';
                contact.style.gridTemplateColumns = '';
            } else if (arr === 'columns') {
                contact.style.display = 'grid';
                contact.style.gridTemplateColumns = '1fr 1fr';
                contact.style.gap = '0.7rem 4rem';
            } else if (arr === 'grid') {
                contact.style.display = 'grid';
                contact.style.gridTemplateColumns = 'repeat(3, max-content)';
                contact.style.gap = '0.75rem 2rem';
                contact.style.alignItems = 'center';
            }
        }

        function setHeaderSeparator(sep, btn) {
            btn.parentElement.querySelectorAll('button').forEach(b => { 
                b.classList.remove('active');
                const i = b.querySelector('.sep-highlight');
                if(i) { i.style.color = '#ccc'; i.style.fontSize = i.tagName.toLowerCase() === 'i' ? '0.7rem' : '1.2em'; }
            });
            btn.classList.add('active');
            const i = btn.querySelector('.sep-highlight');
            if(i) { i.style.color = '#7e22ce'; i.style.fontSize = i.tagName.toLowerCase() === 'i' ? '0.9rem' : '1.4em'; }
            
            let sepStyle = document.getElementById('sh-separator-style');
            if(!sepStyle) {
                sepStyle = document.createElement('style');
                sepStyle.id = 'sh-separator-style';
                document.head.appendChild(sepStyle);
            }
            
            let css = `.sheet-contact > span { position: relative; display: inline-flex; align-items: center; }\n`;
            css += `.sheet-contact > span::after { content: none; display: none; }\n`;
            
            if (sep === 'icon') {
                document.querySelectorAll('.sheet-contact > span > i:not(.link-external-icon)').forEach(i => i.style.display = 'inline-block');
            } else if (sep === 'bullet') {
                document.querySelectorAll('.sheet-contact > span > i:not(.link-external-icon)').forEach(i => i.style.display = 'none');
                css += `.sheet-contact { gap: 0.8rem 1.5rem !important; }\n`;
                css += `.sheet-contact > span:not(:last-child)::after { content: '•'; position: absolute; right: -0.75rem; transform: translateX(50%); color: #ccc; font-size: 1.2em; }\n`;
            } else if (sep === 'bar') {
                document.querySelectorAll('.sheet-contact > span > i:not(.link-external-icon)').forEach(i => i.style.display = 'none');
                css += `.sheet-contact { gap: 0.8rem 1.5rem !important; }\n`;
                css += `.sheet-contact > span:not(:last-child)::after { content: '|'; position: absolute; right: -0.75rem; transform: translateX(50%); color: #ccc; }\n`;
            } else if (sep === 'slash') {
                document.querySelectorAll('.sheet-contact > span > i:not(.link-external-icon)').forEach(i => i.style.display = 'none');
                css += `.sheet-contact { gap: 0.8rem 1.5rem !important; }\n`;
                css += `.sheet-contact > span:not(:last-child)::after { content: '/'; position: absolute; right: -0.75rem; transform: translateX(50%); color: #ccc; }\n`;
            } else if (sep === 'dotbar') {
                document.querySelectorAll('.sheet-contact > span > i:not(.link-external-icon)').forEach(i => i.style.display = 'none');
                css += `.sheet-contact { gap: 0.8rem 1.5rem !important; }\n`;
                css += `.sheet-contact > span:not(:last-child)::after { content: '\\00B7'; position: absolute; right: -0.75rem; transform: translateX(50%); color: #ccc; font-size: 1.25em; }\n`;
            } else if (sep === 'none') {
                document.querySelectorAll('.sheet-contact > span > i:not(.link-external-icon)').forEach(i => i.style.display = 'none');
            }
            sepStyle.innerHTML = css;
        }

        function setHeaderIconStyle(style, btn) {
            btn.parentElement.querySelectorAll('.alignment-option, button').forEach(b => { b.classList.remove('active'); });
            btn.classList.add('active');
            
            const contact = document.querySelector('.sheet-contact');
            if (!contact) return;
            
            contact.querySelectorAll('i').forEach(icon => {
                if (icon.classList.contains('link-external-icon')) return;
                icon.className = icon.dataset.defaultIcon || icon.className;
                icon.style.marginRight = '8px';
                icon.style.width = '';
                icon.style.height = '';
                icon.style.border = '';
                icon.style.borderRadius = '';
                icon.style.background = '';
                icon.style.color = '';
                icon.style.padding = '';
                icon.style.display = style === 'none' ? 'none' : 'inline-flex';
                icon.style.alignItems = 'center';
                icon.style.justifyContent = 'center';

                if (style === 'circle-filled') {
                    icon.style.width = '28px'; icon.style.height = '28px'; icon.style.borderRadius = '50%'; icon.style.background = '#000'; icon.style.color = '#fff'; icon.style.marginRight = '10px';
                } else if (style === 'gray-circle-filled') {
                    icon.style.width = '28px'; icon.style.height = '28px'; icon.style.borderRadius = '50%'; icon.style.background = '#aaa'; icon.style.color = '#fff'; icon.style.marginRight = '10px';
                } else if (style === 'gray-square-filled') {
                    icon.style.width = '28px'; icon.style.height = '28px'; icon.style.background = '#aaa'; icon.style.color = '#fff'; icon.style.marginRight = '10px';
                } else if (style === 'circle-outline') {
                    icon.style.width = '28px'; icon.style.height = '28px'; icon.style.borderRadius = '50%'; icon.style.border = '1px solid #aaa'; icon.style.color = '#777'; icon.style.marginRight = '10px';
                } else if (style === 'rounded-square-outline') {
                    icon.style.width = '28px'; icon.style.height = '28px'; icon.style.borderRadius = '6px'; icon.style.border = '1px solid #aaa'; icon.style.color = '#777'; icon.style.marginRight = '10px';
                } else if (style === 'square-outline') {
                    icon.style.width = '28px'; icon.style.height = '28px'; icon.style.border = '1px solid #aaa'; icon.style.color = '#777'; icon.style.marginRight = '10px';
                }
            });
        }

        function setNameSize(size, btn) {
            btn.parentElement.querySelectorAll('.alignment-option, button').forEach(b => { b.classList.remove('active'); });
            btn.classList.add('active');
            const name = document.getElementById('sheet-fullname');
            if (name) name.style.fontSize = size;
        }

        function setNameBold(isBold) {
            const name = document.getElementById('sheet-fullname');
            if (name) name.style.fontWeight = isBold ? '800' : '500';
        }

        function setNameFont(font, btn) {
            btn.parentElement.querySelectorAll('.alignment-option, button').forEach(b => { b.classList.remove('active'); });
            btn.classList.add('active');
            const name = document.getElementById('sheet-fullname');
            const creativeGrid = document.getElementById('creative-name-fonts');
            if (creativeGrid) creativeGrid.style.display = font === 'creative' ? 'grid' : 'none';
            if (name && font === 'body') {
                name.style.fontFamily = 'inherit';
                name.style.webkitTextStroke = '';
                name.style.textShadow = '';
            } else if (name && font === 'creative') {
                name.style.fontFamily = "'Playfair Display', serif";
            }
        }

        function setCreativeNameFont(font, btn) {
            btn.parentElement.querySelectorAll('.alignment-option, button').forEach(b => { b.classList.remove('active'); });
            btn.classList.add('active');
            const name = document.getElementById('sheet-fullname');
            if (!name) return;
            name.style.fontFamily = `'${font}', cursive`;
            name.style.webkitTextStroke = '';
            name.style.textShadow = '';
            if (font === 'Bungee Shade') {
                name.style.color = window.activeAccentColor || '#4b2a78';
            }
        }

        function setRoleSize(size, btn) {
            btn.parentElement.querySelectorAll('.alignment-option, button').forEach(b => { b.classList.remove('active'); });
            btn.classList.add('active');
            const role = document.getElementById('sheet-role');
            if (role) role.style.fontSize = size;
        }

        function setRolePosition(pos, btn) {
            btn.parentElement.querySelectorAll('.alignment-option, button').forEach(b => { b.classList.remove('active'); });
            btn.classList.add('active');
            const main = document.getElementById('sheet-header-main');
            const role = document.getElementById('sheet-role');
            if (!main || !role) return;
            main.style.display = 'flex';
            main.style.alignItems = pos === 'beside' ? 'baseline' : (main.style.justifyContent === 'center' ? 'center' : 'flex-start');
            main.style.flexDirection = pos === 'beside' ? 'row' : 'column';
            main.style.gap = pos === 'beside' ? '1rem' : '0.25rem';
        }

        document.addEventListener('DOMContentLoaded', () => {
            renderFontList('sans');
            renderColors();
            // init basic mode as active
            const basicMode = document.getElementById('mode-circle-basic');
            if (basicMode) basicMode.style.borderColor = '#EEC30C';
            
            // Handle template mockup preview
            const urlParams = new URLSearchParams(window.location.search);
            const templateImg = urlParams.get('template');
            if (templateImg) {
                const sheet = document.querySelector('.resume-page-sheet');
                if (sheet) {
                    // Replace the HTML resume with the template image for the mockup effect
                    sheet.innerHTML = `<img src="${templateImg}" style="width: 100%; height: auto; display: block; border-radius: 8px; box-shadow: 0 10px 30px rgba(0,0,0,0.5);">`;
                    sheet.style.padding = '0';
                    sheet.style.background = 'transparent';
                    sheet.style.boxShadow = 'none';
                }
            }
        });
    
        function applyPhotoSettingsCust() {
            const show = document.getElementById('photo-show-cust').checked;
            const gray = document.getElementById('photo-grayscale-cust').checked;
            const photoEl = document.getElementById('sheetPhoto');
            if(photoEl) {
                photoEl.style.display = show ? 'block' : 'none';
                photoEl.style.filter = gray ? 'grayscale(100%)' : 'none';
                document.getElementById('sheet-photo-container').style.display = show ? 'block' : 'none';
            }
        }
        function setRoleStyle(style, btn) {
            btn.parentElement.querySelectorAll('.style-option').forEach(b => { b.classList.remove('active'); });
            btn.classList.add('active');
            const role = document.getElementById('sheet-role');
            if (role) role.style.fontStyle = style === 'italic' ? 'italic' : 'normal';
        }

        let certLayout = 'grid';
        let certSpacing = 'tight';
        let certCols = 1;
        function setCertLayout(layout, btn) {
            btn.parentElement.querySelectorAll('.style-option').forEach(b => { b.classList.remove('active'); });
            btn.classList.add('active');
            certLayout = layout;
            renderPreviewSheet();
        }
        function setCertSpacing(spacing, btn) {
            btn.parentElement.querySelectorAll('.style-option').forEach(b => { b.classList.remove('active'); });
            btn.classList.add('active');
            certSpacing = spacing;
            renderPreviewSheet();
        }
        function setCertCols(cols, btn) {
            btn.parentElement.querySelectorAll('.style-option').forEach(b => { b.classList.remove('active'); });
            btn.classList.add('active');
            certCols = cols;
            renderPreviewSheet();
        }

        function getCertificatesStyle() {
            let css = "";
            if (certLayout === 'grid' || certLayout === 'rows') {
                let cols = certLayout === 'grid' ? certCols : 1;
                let gap = certSpacing === 'tight' ? '0.5rem' : '1.5rem';
                css = `display: grid; grid-template-columns: repeat(${cols}, 1fr); gap: ${gap};`;
            } else if (certLayout === 'compact') {
                let gap = certSpacing === 'tight' ? '0.2rem' : '0.8rem';
                css = `display: flex; flex-direction: column; gap: ${gap}; font-size: 0.9em;`;
            } else if (certLayout === 'bubble') {
                let gap = certSpacing === 'tight' ? '0.5rem' : '1rem';
                css = `display: flex; flex-wrap: wrap; gap: ${gap};`;
            }
            return css;
        }
    

        function toggleNameBold(isBold) {
            const nameEl = document.getElementById('sheet-fullname');
            if(nameEl) nameEl.style.fontWeight = isBold ? '800' : '400';
        }
        function setInterestsLayout(layout, btn) {
            btn.parentElement.querySelectorAll('.style-option').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
        }
        function setInterestsCols(cols, btn) {
            btn.parentElement.querySelectorAll('.style-option').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
        }
        function toggleSummaryHeader(showInHeader) {
            console.log('Summary in header:', showInHeader);
        }
        function toggleSummaryHeading(showHeading) {
            const heading = document.querySelector('#section-summary .section-title');
            if(heading) heading.style.display = showHeading ? 'block' : 'none';
        }
        function setWorkExpOrder(order, btn) {
            btn.parentElement.querySelectorAll('.style-option').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
        }
        function setHeaderIconType(type, btn) {
            btn.parentElement.querySelectorAll('.style-option').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
        }

        // ─── DOWNLOAD AS WORD FUNCTIONALITY ───────────────────────────────────
        function downloadWord() {
            const resumeElement = document.getElementById('resumeSheet');
            if (!resumeElement) {
                alert('Resume sheet not found!');
                return;
            }
            
            const content = resumeElement.innerHTML;
            
            // Basic styling for the exported Word Document to keep layout neat
            const styles = `
                body { font-family: 'Arial', sans-serif; color: #000000; padding: 20px; background-color: #ffffff; }
                #resumeSheet { width: 100%; max-width: 100%; background: #ffffff; color: #000000; }
                .sheet-header { border-bottom: 2px solid #333333; padding-bottom: 15px; margin-bottom: 20px; display: table; width: 100%; }
                #sheet-header-main { display: inline-block; width: 60%; vertical-align: top; }
                #sheet-header-details { display: inline-block; width: 40%; text-align: right; vertical-align: top; }
                h1 { font-size: 24pt; margin: 0 0 5px 0; color: #000000; font-weight: bold; }
                h3 { font-size: 13pt; margin: 0; color: #555555; font-weight: normal; }
                .sheet-contact { font-size: 9.5pt; color: #444444; line-height: 1.4; }
                .sheet-contact span { display: block; margin-bottom: 3px; }
                .sheet-photo-container { display: none; }
                .resume-section { margin-bottom: 20px; }
                .section-title { font-size: 13pt; font-weight: bold; border-bottom: 1.5px solid #cccccc; padding-bottom: 4px; margin-bottom: 10px; color: #111111; text-transform: uppercase; }
                .section-body { font-size: 10pt; line-height: 1.5; color: #222222; }
                .work-experience-entry, .education-entry, .project-entry { margin-bottom: 12px; }
                .entry-header { display: table; width: 100%; font-weight: bold; margin-bottom: 2px; }
                .entry-title-left { display: inline-block; width: 70%; text-align: left; }
                .entry-date-right { display: inline-block; width: 30%; text-align: right; font-weight: normal; color: #666666; font-size: 9pt; }
                .entry-subtitle { font-size: 9.5pt; font-style: italic; color: #444444; margin-bottom: 4px; }
                .bullet-list { margin: 5px 0; padding-left: 20px; }
                .bullet-list li { margin-bottom: 3px; }
                .skills-grid, .languages-grid { display: block; margin-top: 5px; }
                .skill-tag, .language-tag { display: inline-block; background: #f0f0f0; padding: 4px 8px; margin: 3px; border-radius: 4px; font-size: 9pt; color: #333333; }
            `;

            const htmlString = 
            '<' + 'html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:w="urn:schemas-microsoft-com:office:word" xmlns="http://www.w3.org/TR/REC-html40">' +
            '<' + 'head>' +
                '<meta charset="utf-8">' +
                '<title>Resume</title>' +
                '<' + 'style>' +
                    styles +
                '<' + '/style>' +
            '<' + '/head>' +
            '<' + 'body>' +
                '<div id="resumeSheet">' +
                    content +
                '</div>' +
            '<' + '/body>' +
            '<' + '/html>';

            const blob = new Blob(['\\ufeff' + htmlString], {
                type: 'application/msword'
            });
            
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            const nameEl = document.getElementById('sheet-fullname');
            const resumeName = nameEl ? nameEl.innerText.trim().replace(/\\s+/g, '_') : 'Resume';
            a.download = resumeName + '.doc';
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
        }

        // ─── TEMPLATES POPUP GALLERY MODAL LOGIC ─────────────────────────────
        let previousActiveTab = 'content';

        // Override switchTab function
        function switchTab(tabId) {
            if (tabId === 'templates') {
                openTemplatesModal();
                return;
            }
            
            previousActiveTab = tabId;
            document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
            document.querySelectorAll('.tab-content').forEach(content => content.classList.remove('show'));
            
            // Activate button
            const activeBtn = Array.from(document.querySelectorAll('.tab-btn')).find(btn => (btn.innerText || btn.textContent || '').toLowerCase().includes(tabId));
            if (activeBtn) activeBtn.classList.add('active');
            
            // Activate content
            const contentPanel = document.getElementById('tab-' + tabId);
            if (contentPanel) contentPanel.classList.add('show');

            // Tab-specific side effects
            if (tabId === 'rearrange') renderRearrangeTab();
        }

        function openTemplatesModal() {
            const modal = document.getElementById('templatesGalleryModal');
            if (modal) {
                modal.classList.add('show');
                // Highlight Templates tab button in header
                document.querySelectorAll('.tab-btn').forEach(btn => {
                    if ((btn.innerText || btn.textContent || '').toLowerCase().includes('templates')) {
                        btn.classList.add('active');
                    } else {
                        btn.classList.remove('active');
                    }
                });
                
                // Initialize filtering once
                initModalFiltering();
            }
        }

        function closeTemplatesModal() {
            const modal = document.getElementById('templatesGalleryModal');
            if (modal) {
                modal.classList.remove('show');
                // Restore previously active tab
                switchTab(previousActiveTab);
            }
        }

        function selectTemplateFromPopup(templateName) {
            const sidebarCards = document.querySelectorAll('#sidebar-templates-grid .template-card-mini');
            let targetCard = null;
            for (let card of sidebarCards) {
                const onclickAttr = card.getAttribute('onclick') || '';
                if (onclickAttr.includes(`'${templateName}'`)) {
                    targetCard = card;
                    break;
                }
            }
            
            if (targetCard) {
                selectTemplate(targetCard, templateName);
            }
            closeTemplatesModal();
            alert(`✨ Applied ${templateName.toUpperCase()} template successfully!`);
        }

        let modalFilteringInitialized = false;

        function initModalFiltering() {
            if (modalFilteringInitialized) return;
            modalFilteringInitialized = true;
            
            const grid = document.querySelector('#templatesGalleryModal .rt-grid');
            if (grid) {
                const initialHTML = grid.innerHTML;
                grid.innerHTML += initialHTML + initialHTML;
            }
            
            const cards = document.querySelectorAll('#templatesGalleryModal .rt-grid .rt-card');
            const dummyKeywords = [
                ['top picks', 'ats'],
                ['modern', 'traditional', 'simple', 'creative', 'minimalist', 'infographic', 'photo'],
                ['one page', 'two page', 'one column', 'two column', 'timeline'],
                ['entry level', 'mid level', 'senior'],
                ['chronological', 'functional', 'hybrid'],
                ['blue', 'gray', 'green', 'red', 'navy'],
                ['photo', 'no photo'],
                ['single', 'double']
            ];

            cards.forEach((card, index) => {
                let dummyText = "";
                dummyKeywords.forEach((group, gIndex) => {
                    dummyText += group[(index + gIndex) % group.length] + " ";
                    if (index % 3 === 0) {
                        dummyText += group[(index + gIndex + 1) % group.length] + " ";
                    }
                });
                card.setAttribute('data-dummy-tags', dummyText.toLowerCase());
            });
            
            // Dropdown triggers
            const dropdownBtns = document.querySelectorAll('#templatesGalleryModal .rt-filter-pill.has-dropdown');
            dropdownBtns.forEach(btn => {
                btn.addEventListener('click', (e) => {
                    e.stopPropagation();
                    dropdownBtns.forEach(otherBtn => {
                        if (otherBtn !== btn) {
                            otherBtn.nextElementSibling.classList.remove('show');
                        }
                    });
                    btn.nextElementSibling.classList.toggle('show');
                });
            });

            document.addEventListener('click', () => {
                document.querySelectorAll('#templatesGalleryModal .rt-dropdown-menu').forEach(menu => {
                    menu.classList.remove('show');
                });
            });

            // Dropdown items
            document.querySelectorAll('#templatesGalleryModal .rt-dd-item').forEach(item => {
                item.addEventListener('click', (e) => {
                    e.preventDefault();
                    const parentMenu = item.closest('.rt-dropdown-menu');
                    const parentBtn = parentMenu.previousElementSibling;
                    
                    parentMenu.querySelectorAll('.rt-dd-item').forEach(i => i.classList.remove('active'));
                    item.classList.add('active');
                    
                    const selectedText = item.textContent.trim();
                    if (selectedText.includes('All')) {
                        parentBtn.classList.remove('active');
                        parentBtn.removeAttribute('data-selected-text');
                    } else {
                        parentBtn.classList.add('active');
                        parentBtn.setAttribute('data-selected-text', selectedText);
                    }
                    
                    parentMenu.classList.remove('show');
                    filterModalCards();
                });
            });

            // Category pills (All, Top Picks, ATS)
            const categoryPills = document.querySelectorAll('#templatesGalleryModal .rt-filter-row-1 > .rt-filter-pill:not(.has-dropdown)');
            categoryPills.forEach(pill => {
                pill.addEventListener('click', () => {
                    categoryPills.forEach(p => p.classList.remove('active'));
                    pill.classList.add('active');

                    if (pill.id === 'modal-filter-all') {
                        // Reset dropdowns
                        document.querySelectorAll('#templatesGalleryModal .rt-filter-pill.has-dropdown').forEach(dd => {
                            dd.classList.remove('active');
                            dd.removeAttribute('data-selected-text');
                            const menu = dd.nextElementSibling;
                            if (menu) {
                                menu.querySelectorAll('.rt-dd-item').forEach(item => item.classList.remove('active'));
                            }
                        });
                        
                        // Reset colors
                        document.querySelectorAll('#templatesGalleryModal .rt-color-btn').forEach(btn => btn.classList.remove('active'));
                        const colorAll = document.getElementById('modal-color-all');
                        if (colorAll) colorAll.classList.add('active');
                        
                        // Reset toggles
                        document.querySelectorAll('#templatesGalleryModal .rt-toggle-group').forEach(group => {
                            group.querySelectorAll('.rt-toggle-btn').forEach(btn => btn.classList.remove('active'));
                            const allBtn = group.querySelector('.rt-toggle-btn[id$="-all"]');
                            if (allBtn) allBtn.classList.add('active');
                        });
                    }

                    filterModalCards();
                });
            });

            // Colors
            const colorBtns = document.querySelectorAll('#templatesGalleryModal .rt-color-btn');
            colorBtns.forEach(btn => {
                btn.addEventListener('click', () => {
                    colorBtns.forEach(b => b.classList.remove('active'));
                    btn.classList.add('active');
                    filterModalCards();
                });
            });

            // Photo / Columns toggles
            const toggleGroups = document.querySelectorAll('#templatesGalleryModal .rt-toggle-group');
            toggleGroups.forEach(group => {
                const btns = group.querySelectorAll('.rt-toggle-btn');
                btns.forEach(btn => {
                    btn.addEventListener('click', () => {
                        btns.forEach(b => b.classList.remove('active'));
                        btn.classList.add('active');
                        filterModalCards();
                    });
                });
            });
        }

        function filterModalCards() {
            let activeFilters = [];
            const searchVal = document.getElementById('modal-search-input').value.toLowerCase().trim();

            const activeTopPill = document.querySelector('#templatesGalleryModal .rt-filter-row-1 > .rt-filter-pill:not(.has-dropdown).active');
            if (activeTopPill && activeTopPill.id !== 'modal-filter-all') {
                activeFilters.push(activeTopPill.textContent.trim().toLowerCase());
            }

            document.querySelectorAll('#templatesGalleryModal .rt-filter-pill.has-dropdown.active').forEach(dd => {
                const selectedText = dd.getAttribute('data-selected-text');
                if (selectedText && !selectedText.includes('All')) {
                    activeFilters.push(selectedText.toLowerCase());
                }
            });

            const activeColor = document.querySelector('#templatesGalleryModal .rt-color-btn.active:not(#modal-color-all)');
            if (activeColor) {
                activeFilters.push(activeColor.getAttribute('data-color').toLowerCase());
            }

            const activePhoto = document.querySelector('#templatesGalleryModal .rt-toggle-group .rt-toggle-btn.active[id^="modal-photo-"]:not(#modal-photo-all)');
            if (activePhoto) {
                activeFilters.push(activePhoto.textContent.trim().toLowerCase());
            }

            const activeCol = document.querySelector('#templatesGalleryModal .rt-toggle-group .rt-toggle-btn.active[id^="modal-col-"]:not(#modal-col-all)');
            if (activeCol) {
                activeFilters.push(activeCol.textContent.trim().toLowerCase());
            }

            const cards = document.querySelectorAll('#templatesGalleryModal .rt-grid .rt-card');
            cards.forEach(card => {
                const tagsAttr = card.getAttribute('data-tags') || '';
                const cardText = (card.innerText + " " + tagsAttr + " " + card.getAttribute('data-dummy-tags')).toLowerCase();
                let isMatch = true;

                if (searchVal && !cardText.includes(searchVal)) {
                    isMatch = false;
                }

                for (let filter of activeFilters) {
                    if (!cardText.includes(filter)) {
                        isMatch = false;
                        break;
                    }
                }

                if (isMatch) {
                    card.style.display = 'flex';
                } else {
                    card.style.display = 'none';
                }
            });
        }


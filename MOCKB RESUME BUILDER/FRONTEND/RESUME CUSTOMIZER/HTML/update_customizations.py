import re

with open('e:/MOCKB RESUME BUILDER/FRONTEND/RESUME CUSTOMIZER/HTML/editor.html', 'r', encoding='utf-8') as f:
    content = f.read()

# 1. Summary Customizations
summary_custom = '''
                    const c = section.customizations || {};
                    card.innerHTML += 
                        <div class="customization-trigger-row" onclick="toggleSectionCustomizations('')" style="cursor:pointer; display:flex; justify-content:space-between; padding: 1rem; border-top: 1px solid #222; background: #1a1a1a; border-radius: 0 0 12px 12px; font-size: 0.9rem; color: #fff;">
                            <span><i class="fa-solid fa-sliders" style="margin-right:0.5rem; font-size:0.8rem;"></i>  customizations for this section</span>
                            <i class="fa-solid " style="font-size:0.8rem; transition: transform 0.3s ease;"></i>
                        </div>
                        <div style="">
                            <h3 style="margin-bottom: 1rem; font-size: 1.2rem; font-weight: 700; color: #111827;">Summary</h3>
                            <div style="display:flex; align-items:center; gap: 12px; margin-bottom: 0.8rem;">
                                <input type="checkbox" id="sum-header-"  onchange="updateSectionCustomization('', 'displayInHeader', this.checked, true)" style="width:18px; height:18px; border:1px solid #d1d5db; border-radius:4px; cursor:pointer;">
                                <label for="sum-header-" style="color: #4b5563; cursor:pointer;">Display summary as part of header</label>
                            </div>
                            <div style="display:flex; align-items:center; gap: 12px;">
                                <input type="checkbox" id="sum-heading-"  onchange="updateSectionCustomization('', 'showHeading', this.checked, true)" style="width:18px; height:18px; border:1px solid #d1d5db; border-radius:4px; cursor:pointer; accent-color: #7b61ff;">
                                <label for="sum-heading-" style="color: #4b5563; cursor:pointer;">Show summary heading</label>
                            </div>
                        </div>
                    ;
'''
content = content.replace('                    container.appendChild(card);\n                    return;\n                }\n\n                // Skills', summary_custom + '                    container.appendChild(card);\n                    return;\n                }\n\n                // Skills')

# 2. Education Customizations
education_custom = '''
                    const c = section.customizations || {};
                    card.innerHTML += 
                        <div class="customization-trigger-row" onclick="toggleSectionCustomizations('')" style="cursor:pointer; display:flex; justify-content:space-between; padding: 1rem; border-top: 1px solid #222; background: #1a1a1a; border-radius: 0 0 12px 12px; font-size: 0.9rem; color: #fff;">
                            <span><i class="fa-solid fa-sliders" style="margin-right:0.5rem; font-size:0.8rem;"></i>  customizations for this section</span>
                            <i class="fa-solid " style="font-size:0.8rem; transition: transform 0.3s ease;"></i>
                        </div>
                        <div style="">
                            <h3 style="margin-bottom: 1.5rem; font-size: 1.2rem; font-weight: 700; color: #111827;">Education</h3>
                            <h4 style="font-size: 0.85rem; font-weight: 700; margin-bottom: 0.5rem; color: #111827;">Title & Subtitle Order</h4>
                            <div style="display:flex; gap: 0.5rem;">
                                <button onclick="updateSectionCustomization('', 'order', 'degree-school', false)" style="flex:1; padding: 0.6rem; border: 1px solid ; border-radius: 8px; background: ; color: ; cursor:pointer;">Degree, School</button>
                                <button onclick="updateSectionCustomization('', 'order', 'school-degree', false)" style="flex:1; padding: 0.6rem; border: 1px solid ; border-radius: 8px; background: ; color: ; cursor:pointer;">School, Degree</button>
                            </div>
                        </div>
                    ;
'''
content = content.replace('                    container.appendChild(card);\n                    return;\n                }\n\n                // Experience', education_custom + '                    container.appendChild(card);\n                    return;\n                }\n\n                // Experience')

# 3. Professional Experience Customizations
experience_custom = '''
                    const c = section.customizations || {};
                    card.innerHTML += 
                        <div class="customization-trigger-row" onclick="toggleSectionCustomizations('')" style="cursor:pointer; display:flex; justify-content:space-between; padding: 1rem; border-top: 1px solid #222; background: #1a1a1a; border-radius: 0 0 12px 12px; font-size: 0.9rem; color: #fff;">
                            <span><i class="fa-solid fa-sliders" style="margin-right:0.5rem; font-size:0.8rem;"></i>  customizations for this section</span>
                            <i class="fa-solid " style="font-size:0.8rem; transition: transform 0.3s ease;"></i>
                        </div>
                        <div style="">
                            <h3 style="margin-bottom: 1.5rem; font-size: 1.2rem; font-weight: 700; color: #111827;">Work Experience</h3>
                            <h4 style="font-size: 0.85rem; font-weight: 700; margin-bottom: 0.5rem; color: #111827;">Order title/subtitle</h4>
                            <div style="display:flex; gap: 0.5rem; margin-bottom: 1.5rem;">
                                <button onclick="updateSectionCustomization('', 'order', 'job-employer', false)" style="flex:1; padding: 0.6rem; border: 1px solid ; border-radius: 8px; background: ; color: ; cursor:pointer;">Job Title - Employer</button>
                                <button onclick="updateSectionCustomization('', 'order', 'employer-job', false)" style="flex:1; padding: 0.6rem; border: 1px solid ; border-radius: 8px; background: ; color: ; cursor:pointer;">Employer - Job Title</button>
                            </div>
                            <h4 style="font-size: 0.85rem; font-weight: 700; margin-bottom: 0.5rem; color: #111827;">Employment History</h4>
                            <div style="display:flex; align-items:center; gap: 12px;">
                                <input type="checkbox" id="exp-promotions-"  onchange="updateSectionCustomization('', 'groupPromotions', this.checked, true)" style="width:18px; height:18px; border:1px solid #d1d5db; border-radius:4px; cursor:pointer; accent-color: #7b61ff;">
                                <label for="exp-promotions-" style="color: #4b5563; cursor:pointer;">Group promotions</label>
                            </div>
                        </div>
                    ;
'''
content = content.replace('                    container.appendChild(card);\n                    return;\n                }\n\n                // Projects', experience_custom + '                    container.appendChild(card);\n                    return;\n                }\n\n                // Projects')


with open('e:/MOCKB RESUME BUILDER/FRONTEND/RESUME CUSTOMIZER/HTML/editor.html', 'w', encoding='utf-8') as f:
    f.write(content)
print("Updated customizations.")

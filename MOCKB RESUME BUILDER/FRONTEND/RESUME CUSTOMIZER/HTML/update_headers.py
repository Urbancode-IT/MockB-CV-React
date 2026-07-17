import re

with open('e:/MOCKB RESUME BUILDER/FRONTEND/RESUME CUSTOMIZER/HTML/editor.html', 'r', encoding='utf-8') as f:
    content = f.read()

# 1. Add JS helper functions
js_funcs = '''
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
'''
if 'function toggleSectionCollapse' not in content:
    content = content.replace('// Update values inside sections', js_funcs + '\n        // Update values inside sections')


# 2. Replace headers to make them collapsible
def repl_header(m):
    block = m.group(0)
    # Add onclick and cursor to header
    block = block.replace('<div class="new-section-header">', '<div class="new-section-header" onclick="toggleSectionCollapse(\'\')" style="cursor:pointer;">')
    # Add stopPropagation to edit button
    block = block.replace('onclick="toggleSectionMode', 'onclick="event.stopPropagation(); toggleSectionMode')
    # Update chevron icon
    block = block.replace('fa-chevron-up toggle-icon"></i>', ' toggle-icon"></i>')
    # Update body display
    block = block.replace('<div class="new-section-body">', '<div class="new-section-body" style="display:">')
    return block

content = re.sub(r'<div class="new-section-header">.*?</button>\s*<i class="fa-solid fa-chevron-up toggle-icon"></i>\s*</div>\s*<div class="new-section-body">', repl_header, content, flags=re.DOTALL)


with open('e:/MOCKB RESUME BUILDER/FRONTEND/RESUME CUSTOMIZER/HTML/editor.html', 'w', encoding='utf-8') as f:
    f.write(content)
print("Updated headers.")

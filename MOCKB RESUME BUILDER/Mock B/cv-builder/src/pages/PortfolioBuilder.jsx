import React, { useState, useRef, useCallback, useEffect } from 'react';
import JSZip from 'jszip';
import './PortfolioBuilder.css';

// ─── Resume Text Extractor (PDF.js) ──────────────────────────────────────────
const loadPdfJs = () => new Promise((resolve) => {
  if (window.pdfjsLib) { resolve(window.pdfjsLib); return; }
  const script = document.createElement('script');
  script.src = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js';
  script.onload = () => {
    window.pdfjsLib.GlobalWorkerOptions.workerSrc =
      'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';
    resolve(window.pdfjsLib);
  };
  document.head.appendChild(script);
});

async function extractTextFromPdf(file) {
  try {
    const pdfjs = await loadPdfJs();
    const arrayBuffer = await file.arrayBuffer();
    const pdf = await pdfjs.getDocument({ data: arrayBuffer }).promise;
    let fullText = '';
    for (let i = 1; i <= Math.min(pdf.numPages, 5); i++) {
      const page = await pdf.getPage(i);
      const content = await page.getTextContent();
      fullText += content.items.map(item => item.str).join(' ') + '\n';
    }
    return fullText;
  } catch (e) {
    console.error('PDF parse error:', e);
    return '';
  }
}

function parseResumeText(text) {
  if (!text || text.length < 30) return { name: '', role: '', skills: '', experience: '', bio: '', email: '', phone: '', location: '', education: '', linkedin: '', github: '' };
  
  const lines = text.split(/[\n]+/).map(l => l.trim()).filter(Boolean);
  const lower = text.toLowerCase();
  const result = { name: '', role: '', skills: '', experience: '', bio: '', email: '', phone: '', location: '', education: '', linkedin: '', github: '' };

  // --- Email
  const emailMatch = text.match(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/);
  if (emailMatch) result.email = emailMatch[0];

  // --- Phone
  const phoneMatch = text.match(/(\+?[\d][\d\s\-().]{7,15}[\d])/);
  if (phoneMatch) result.phone = phoneMatch[0].trim();

  // --- LinkedIn
  const liMatch = text.match(/linkedin\.com\/in\/([\w-]+)/i);
  if (liMatch) result.linkedin = 'https://linkedin.com/in/' + liMatch[1];

  // --- GitHub
  const ghMatch = text.match(/github\.com\/([\w-]+)/i);
  if (ghMatch) result.github = 'https://github.com/' + ghMatch[1];

  // --- Name: try multiple strategies
  // Strategy 1: first line that looks like a person name (2-4 words, letters only)
  for (const line of lines.slice(0, 10)) {
    const clean = line.replace(/[^a-zA-Z\s]/g, '').trim();
    const wordCount = clean.split(/\s+/).filter(w => w.length > 1).length;
    if (wordCount >= 2 && wordCount <= 4 && clean.length > 4 && clean.length < 50 && !/\d/.test(line) && !/[@:|\/\\]/.test(line) && !/http/.test(line) && !/resume|cv|curriculum|vitae|portfolio|engineer|developer|designer|manager|analyst|objective|summary|skills|experience|education|contact/i.test(line)) {
      result.name = clean.split(/\s+/).map(w => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()).join(' ');
      break;
    }
  }

  // --- Role: detect from keywords in the text
  const roleKeywords = [
    ['machine learning engineer','ml engineer','data scientist','data science','ai engineer','nlp engineer','ai/ml','artificial intelligence'],
    ['software engineer','software developer','backend developer','frontend developer','full stack','fullstack','web developer','react developer','node developer','java developer','python developer'],
    ['product designer','ui/ux','ux designer','ui designer','graphic designer','visual designer'],
    ['data analyst','business analyst','business intelligence'],
    ['devops engineer','cloud engineer','site reliability','infrastructure engineer'],
    ['android developer','ios developer','mobile developer','flutter developer'],
    ['project manager','product manager','scrum master','agile coach'],
  ];
  const roleLabels = ['AI/ML Engineer','Software Engineer','Product Designer','Data Analyst','DevOps Engineer','Mobile Developer','Product Manager'];
  let detectedRoleIdx = -1;
  for (let i = 0; i < roleKeywords.length; i++) {
    if (roleKeywords[i].some(kw => lower.includes(kw))) { detectedRoleIdx = i; break; }
  }
  if (detectedRoleIdx >= 0) result.role = roleLabels[detectedRoleIdx];

  // --- Skills: strategy 1 - find Skills section
  const skillSectionMatch = text.match(/(?:technical\s+)?skills?[:\s\n]([\s\S]{10,600}?)(?:\n\s*[A-Z][A-Z\s]{5,}|education|experience|work history|project|certifi|achievement|$)/i);
  if (skillSectionMatch) {
    const raw = skillSectionMatch[1];
    const tokens = raw.split(/[,•|\n\t\|]+/).map(s => s.trim()).filter(s => s.length > 1 && s.length < 50 && !/\d{4}/.test(s));
    if (tokens.length > 0) result.skills = tokens.slice(0, 15).join(', ');
  }
  // Strategy 2: if no skills section, scan for known tech keywords
  if (!result.skills) {
    const techKeywords = ['Python','Java','JavaScript','TypeScript','React','Node','Angular','Vue','Django','Flask','Spring','AWS','Azure','GCP','Docker','Kubernetes','TensorFlow','PyTorch','SQL','NoSQL','MongoDB','PostgreSQL','MySQL','Git','Linux','C++','C#','Golang','Rust','Swift','Kotlin','Flutter','Figma','Sketch','Photoshop','Tableau','Power BI','Hadoop','Spark','Kafka'];
    const found = techKeywords.filter(kw => new RegExp('\\b' + kw + '\\b', 'i').test(text));
    if (found.length > 0) result.skills = found.join(', ');
  }

  // --- Experience: find section
  const expSection = text.match(/(?:work\s+)?experience[:\s\n]([\s\S]{20,1000}?)(?:education|skills|project|certifi|achievement|$)/i);
  if (expSection) {
    const expLines = expSection[1].split('\n').map(l => l.trim()).filter(l => l.length > 4 && l.length < 120 && !/^[-•|]+$/.test(l));
    result.experience = expLines.slice(0, 4).join(' | ');
  }

  // --- Education
  const eduSection = text.match(/education[:\s\n]([\s\S]{10,400}?)(?:experience|skills|project|certifi|achievement|$)/i);
  if (eduSection) {
    const eduLines = eduSection[1].split('\n').map(l => l.trim()).filter(l => l.length > 4 && l.length < 120);
    result.education = eduLines.slice(0, 3).join(', ');
  }

  // --- Location: look for city, state/country patterns
  const locMatch = text.match(/([A-Z][a-z]+(?:\s[A-Z][a-z]+)?),\s*([A-Z]{2}|[A-Z][a-z]+)/);
  if (locMatch && !result.location) result.location = locMatch[0];

  console.log('[MockB Portfolio] Resume parsed:', result);
  return result;
}

// ─── Template Data ────────────────────────────────────────────────────────────
const templatesData = [
  { id: 'creative-glass', name: 'Creative Glassmorphism', category: 'styles', tag: 'Creative Glassmorphic', desc: 'Stunning overlay cards with blurred backdrop frosted filters, gold glowing outlines, and rich color-blend gradients.', icon: 'fa-solid fa-wand-magic-sparkles' },
  { id: 'tech-grid', name: 'Technical Developer Grid', category: 'styles', tag: 'Monospace Tech Grid', desc: 'Ideal for engineers. Monospace styling details, Git repository indicators, terminal layouts, and structured blocks.', icon: 'fa-solid fa-code' },
  { id: 'minimal-editorial', name: 'Minimalist Editorial', category: 'styles', tag: 'Bold Serif Minimalist', desc: 'Stripped-back luxury template focusing on crisp serif web typography, generous spacing, and heavy imagery.', icon: 'fa-solid fa-pen-nib' },
  { id: 'frontend-showcase', name: 'Frontend Engineer Showcase', category: 'roles', tag: 'Frontend & UI/UX Developer', desc: 'Includes native responsive previews, interactive code blocks, CodePen integrations, and real-time animation hooks.', icon: 'fa-brands fa-html5' },
  { id: 'uiux-figma', name: 'UI/UX Figma Case Study', category: 'roles', tag: 'Product Designer & Research', desc: 'Bespoke Case Study roadmap grids, user personas slides, interactive iframe Figma prototype windows.', icon: 'fa-brands fa-figma' },
  { id: 'fullstack-system', name: 'Fullstack System Grid', category: 'roles', tag: 'Fullstack & Cloud Architect', desc: 'Highlights microservices architectures, DB schemas, cloud integration statuses, and API endpoint query logs.', icon: 'fa-solid fa-database' }
];

const themeColors = {
  gold:   { color: '#D4C77A', bg: 'rgba(212, 199, 122,0.1)',  border: 'rgba(212, 199, 122,0.2)',  rgb: '212,199,122',  boxShadow: '0 40px 100px rgba(0,0,0,0.8), 0 0 50px rgba(212, 199, 122,0.05)' },
  blue:   { color: '#2A82E6', bg: 'rgba(42,130,230,0.1)',  border: 'rgba(42,130,230,0.2)',  rgb: '42,130,230',  boxShadow: '0 40px 100px rgba(0,0,0,0.8), 0 0 50px rgba(42,130,230,0.05)' },
  purple: { color: '#9B51E0', bg: 'rgba(155,81,224,0.1)',  border: 'rgba(155,81,224,0.2)',  rgb: '155,81,224',  boxShadow: '0 40px 100px rgba(0,0,0,0.8), 0 0 50px rgba(155,81,224,0.05)' },
  red:    { color: '#EB5757', bg: 'rgba(235,87,87,0.1)',   border: 'rgba(235,87,87,0.2)',   rgb: '235,87,87',   boxShadow: '0 40px 100px rgba(0,0,0,0.8), 0 0 50px rgba(235,87,87,0.05)' }
};

// ─── Enhanced EditableField (Rich Text) ──────────────────────────────────────────
function EditableField({ tag = 'span', value, onChange, editable, placeholder, style, className, multiline = false }) {
  const El = tag;
  const contentRef = useRef(null);
  const [isFocused, setIsFocused] = useState(false);
  
  if (!editable) return <El style={style} className={className} dangerouslySetInnerHTML={{ __html: value || placeholder || '' }} />;
  
  return (
    <div style={{ position: 'relative', display: multiline ? 'block' : 'inline-block' }}>
      
      <El
        ref={contentRef}
        contentEditable
        suppressContentEditableWarning
        data-placeholder={placeholder}
        onFocus={() => setIsFocused(true)}
        onBlur={e => {
          setIsFocused(false);
          onChange(e.currentTarget.innerHTML.trim());
        }}
        onKeyDown={e => {
          if (e.key === 'Enter' && !multiline) { e.preventDefault(); e.currentTarget.blur(); }
          if (e.key === 'Escape') { e.currentTarget.blur(); }
        }}
        dangerouslySetInnerHTML={{ __html: value || '' }}
        style={{
          display: multiline ? 'block' : 'inline-block',
          ...style,
          outline: 'none',
          cursor: editable ? 'text' : 'inherit',
          borderBottom: editable ? '1.5px dashed rgba(125,164,186,0.7)' : 'none',
          minWidth: '20px',
          transition: 'background 0.15s',
          borderRadius: '2px',
        }}
        className={`${className || ''} ${!value && placeholder ? 'show-placeholder' : ''}`}
      />
    </div>
  );
}

// ─── Enhanced EditableBlock (EnhanceCV Style Toolbar) ─────────────────────────────
function EditableBlock({ children, editable, onAdd, onDelete, onMoveUp, onMoveDown, blockType = 'Entry' }) {
  const [hovered, setHovered] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);

  if (!editable) return children;
  return (
    <div 
      className="pb-editable-block-wrapper"
      style={{ position: 'relative', outline: hovered ? '1.5px dashed #27c93f' : '1.5px solid transparent', padding: '6px', margin: '-6px', borderRadius: '6px', transition: 'all 0.15s' }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => { setHovered(false); setShowSettings(false); setShowDatePicker(false); }}
    >
      {hovered && (
        <div className="pb-enhancecv-toolbar" onMouseDown={e => e.preventDefault()}>
          {onAdd && <><button onClick={onAdd} className="add-btn"><i className="fa-solid fa-plus" /> {blockType}</button><div className="divider" /></>}
          {onMoveUp && <button onClick={onMoveUp} title="Move Up"><i className="fa-solid fa-chevron-up" /></button>}
          {onMoveDown && <button onClick={onMoveDown} title="Move Down"><i className="fa-solid fa-chevron-down" /></button>}
          {(onMoveUp || onMoveDown) && <div className="divider" />}
          
          <button onMouseDown={e => { e.preventDefault(); document.execCommand('bold'); }} title="Bold"><i className="fa-solid fa-bold" /></button>
          <button onMouseDown={e => { e.preventDefault(); document.execCommand('italic'); }} title="Italic"><i className="fa-solid fa-italic" /></button>
          <button onMouseDown={e => { e.preventDefault(); document.execCommand('underline'); }} title="Underline"><i className="fa-solid fa-underline" /></button>
          <button onMouseDown={e => { e.preventDefault(); const url = prompt('Link URL:'); if(url) document.execCommand('createLink', false, url); }} title="Link"><i className="fa-solid fa-link" /></button>
          
          <div className="divider" />
          
          <div style={{position: 'relative'}}>
            <button onClick={() => setShowDatePicker(!showDatePicker)} title="Date"><i className="fa-regular fa-calendar" /></button>
            {showDatePicker && (
               <div className="pb-date-picker-dropdown">
                 <div className="tabs"><span className="active">From</span><span>To</span></div>
                 <div className="grid">
                   {['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'].map(m => <div key={m} className="item">{m}</div>)}
                 </div>
               </div>
            )}
          </div>
          {onDelete && <button onClick={onDelete} title="Delete"><i className="fa-solid fa-trash" /></button>}
          <div style={{position: 'relative'}}>
            <button onClick={() => setShowSettings(!showSettings)} title="Settings"><i className="fa-solid fa-gear" /></button>
            {showSettings && (
              <div className="pb-settings-dropdown">
                {['Title', 'Company Name', 'Description', 'Bullets', 'Location', 'Date Period', 'Link', 'Company Logo'].map(setting => (
                  <label key={setting} className="pb-toggle-row">
                    <span>{setting}</span>
                    <div className="toggle-switch"><input type="checkbox" defaultChecked /><span className="slider"></span></div>
                  </label>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
      {children}
    </div>
  );
}

// ─── Build initial portfolioContent from merged/generated data ──────────────────────
function buildPortfolioContent(merged, userRoleType, templateName) {
  const name = merged.name || 'Alex Carter';
  const firstName = name.split(' ')[0] || 'Alex';
  const slug = name.toLowerCase().replace(/[^a-z0-9]/g, '-');

  const isAI   = userRoleType.includes('ai') || userRoleType.includes('data');
  const isDev  = userRoleType === 'developer' || userRoleType.includes('engineer') || userRoleType.includes('software');

  const bigTitle    = isAI ? 'ai/ml'     : isDev ? 'developer' : 'designer';
  const folder1     = isAI ? 'machine learning' : isDev ? 'frontend'   : 'web design';
  const folder2     = isAI ? 'data analysis'    : isDev ? 'backend'    : 'social media';
  const specialty1  = isAI
    ? 'Machine Learning — building predictive models, neural networks, and LLMs'
    : isDev
    ? 'Frontend — building responsive web applications using React and Tailwind'
    : 'Web design — creating websites (landing pages, portfolio sites, multi-page websites)';
  const specialty2  = isAI
    ? 'Data Science — visualizing insights, creating data pipelines, and analytics'
    : isDev
    ? 'Backend — designing scalable APIs and managing databases'
    : 'UI/UX — post design, reels covers, creating content plans in Notion';

  const defaultSkillsArr = isAI ? ['Python','PyTorch','TensorFlow','SQL','AWS SageMaker','Scikit-learn']
    : isDev ? ['React.js','Node.js','TypeScript','Docker','AWS','PostgreSQL']
    : ['Figma','Sketch','Adobe CC','Prototyping','User Research','Notion'];
  const skillsArr = merged.skills ? (Array.isArray(merged.skills) ? merged.skills : merged.skills.split(',').map(s => s.trim()).filter(Boolean)) : defaultSkillsArr;

  const defaultExpArr = isAI
    ? [{ role: 'Senior AI Engineer', company: 'DeepMind', period: '2022 – Present', desc: 'Built production LLM pipelines serving 1M+ users.' },
       { role: 'Data Scientist', company: 'Google', period: '2019 – 2022', desc: 'Analyzed large-scale datasets for ads targeting.' }]
    : isDev
    ? [{ role: 'Senior Software Engineer', company: 'TechCorp Inc.', period: '2022 – Present', desc: 'Led microservices architecture serving 2M+ daily active users.' },
       { role: 'Full Stack Developer', company: 'StartupXYZ', period: '2020 – 2022', desc: 'Built product from 0 to 100K users.' }]
    : [{ role: 'Product Designer', company: 'Figma', period: '2021 – Present', desc: 'Designed comprehensive design systems.' },
       { role: 'UI/UX Designer', company: 'Apple', period: '2018 – 2021', desc: 'Led iOS app design for 50M+ users.' }];
  const expArr = merged.experience
    ? (Array.isArray(merged.experience) ? merged.experience : merged.experience.split('|').map(e => { const [r, c] = e.split(' at '); return { role: r?.trim() || e.trim(), company: c?.trim() || '', period: '2023 – Present', desc: '' }; }))
    : defaultExpArr;

  const bio = merged.bio ||
    (isAI  ? `Passionate ${name.split(' ')[0]} is an AI/ML engineer specializing in building intelligent systems and scalable data pipelines. Focused on delivering impactful solutions using cutting-edge machine learning.`
    : isDev ? `Passionate ${name.split(' ')[0]} is a software engineer who builds performant, user-centered applications. Expert in modern web technologies and cloud architecture.`
    :         `Passionate ${name.split(' ')[0]} is a creative designer crafting beautiful digital experiences. Specializing in UI/UX, branding, and visual storytelling.`);

  return {
    name, firstName, slug,
    bigTitle, folder1, folder2,
    specialty1, specialty2,
    bio,
    email:    merged.email    || `${slug}@gmail.com`,
    phone:    merged.phone    || '',
    location: merged.location || '',
    linkedin: merged.linkedin || `linkedin.com/in/${slug}`,
    github:   merged.github   || `github.com/${slug}`,
    education:merged.education|| '',
    telegram: `@${slug}`,
    instagram:`${slug}.portfolio`,
    skills: skillsArr,
    experience: expArr,
    heroRole: merged.heroRole || merged.role || (isAI ? 'AI/ML Engineer & Data Scientist' : isDev ? 'Senior Software Engineer' : 'Product Designer & UX Researcher'),
    heroBio: bio,
  };
}

// ─── Live Portfolio Preview Component ────────────────────────────────────────

// ─── Right Click Context Menu ──────────────────────────────────────────
function ContextMenu({ x, y, onClose, onAction }) {
  return (
    <div className="pb-context-menu" style={{ top: y, left: x }} onMouseLeave={onClose}>
      <div className="menu-item" onClick={() => onAction('copy')}><i className="fa-regular fa-copy" /> Copy</div>
      <div className="menu-item" onClick={() => onAction('paste')}><i className="fa-regular fa-paste" /> Paste</div>
      <div className="menu-divider" />
      <div className="menu-item" onClick={() => onAction('duplicate')}><i className="fa-regular fa-clone" /> Duplicate</div>
      <div className="menu-item" onClick={() => onAction('delete')}><i className="fa-solid fa-trash" /> Delete</div>
      <div className="menu-divider" />
      <div className="menu-item" onClick={() => onAction('settings')}><i className="fa-solid fa-gear" /> Settings</div>
    </div>
  );
}

// ─── Icon Picker Modal ──────────────────────────────────────────────
function IconPickerModal({ isOpen, onClose, onSelect }) {
  const [search, setSearch] = useState('');
  if (!isOpen) return null;
  const faBrands = ['react','angular','vuejs','node-js','python','java','figma','aws','docker','github','html5','css3-alt','js','sass','bootstrap','npm','yarn','git','gitlab','bitbucket','linux','apple','windows','android','slack','discord','linkedin','twitter','facebook','instagram','youtube','twitch','tiktok','medium','dev','codepen','dribbble','behance','pinterest','reddit','spotify','stripe','paypal','cc-visa','cc-mastercard','cc-amex'];
  const faSolid = ['database','cloud','code','laptop-code','terminal','bug','hammer','wrench','gear','server','network-wired','microchip','memory','wifi','shield-halved','lock','key','user','users','briefcase','graduation-cap','certificate','award','trophy','star','heart','thumbs-up','comment','envelope','phone','location-dot','map','globe','house','bell','calendar','clock','camera','video','music','image','palette','pen','pencil','eraser','paperclip','link','folder','file','file-code','file-pdf','file-word','file-excel','file-image','file-audio','file-video','arrow-up','arrow-down','arrow-left','arrow-right','check','xmark','plus','minus','magnifying-glass','power-off','rotate','trash','trash-can','download','upload','share','share-nodes','print','cart-shopping','bag-shopping','credit-card','wallet','money-bill','coins','chart-line','chart-bar','chart-pie','table','list','list-ol','list-ul','align-left','align-center','align-right','align-justify','bold','italic','underline','strikethrough','font','text-height','text-width','superscript','subscript','indent','outdent','heading','paragraph','quote-left','quote-right','link-slash','crop','cut','copy','paste','save','floppy-disk','eye','eye-slash','glasses','graduation-cap','book','book-open','bookmark','tag','tags','ticket','plane','car','bus','train','ship','bicycle','motorcycle','rocket','space-shuttle','moon','sun','cloud-rain','cloud-showers-heavy','bolt','snowflake','fire','leaf','tree','paw','bone','fish','bug','spider','crown','gem','gift','box','cube','cubes','puzzle-piece','gamepad','dice','chess','trophy','medal','futbol','basketball','baseball','volleyball','tennis','table-tennis-paddle-ball','hockey-puck','golf-ball-tee','bowling-ball','dumbbell','person-running','person-swimming','person-biking','person-hiking','person-snowboarding','person-skiing','person-skating','person-walking','wheelchair','baby-carriage','bed','bath','shower','toilet','sink','soap','pump-medical','prescription-bottle-medical','pills','syringe','stethoscope','heart-pulse','truck-medical','hospital','ambulance','tooth','brain','lungs','eye','hand','hands','hand-holding','handshake','thumbs-up','thumbs-down','hand-point-up','hand-point-down','hand-point-left','hand-point-right','hand-peace','hand-spock','hand-lizard','hand-scissors','hand-rock','hand-paper','hand-pointer','hand-middle-finger'];
  const icons = [...faBrands.map(i => 'fa-brands fa-' + i), ...faSolid.map(i => 'fa-solid fa-' + i)];
  return (
    <div className="pb-modal-overlay" onClick={onClose}>
      <div className="pb-icon-picker-modal" onClick={e => e.stopPropagation()}>
        <div className="header">
          <h3><i className="fa-solid fa-icons" /> Select Icon</h3>
          <button onClick={onClose} className="close-btn"><i className="fa-solid fa-xmark" /></button>
        </div>
        <div className="search-bar">
          <i className="fa-solid fa-search" />
          <input type="text" placeholder="Search 1000+ icons..." value={search} onChange={e => setSearch(e.target.value)} />
        </div>
        <div className="icon-grid">
          {icons.filter(i => i.includes(search.toLowerCase())).map(icon => (
            <div key={icon} className="icon-item" onClick={() => { onSelect(icon); onClose(); }}>
              <i className={icon} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function LivePortfolioPreview({ theme, templateName, isGenerated, editable = false, portfolioContent, onChange, onAction, setIconPicker }) {
  const pc = portfolioContent;
  const tc = themeColors[theme];
  const isAI = pc ? (pc.bigTitle === 'ai/ml' || pc.heroRole?.toLowerCase().includes('ai') || pc.heroRole?.toLowerCase().includes('data')) : false;
  const isDev = pc ? (pc.bigTitle === 'developer' || pc.heroRole?.toLowerCase().includes('engineer') || pc.heroRole?.toLowerCase().includes('developer')) : false;
  const icon1 = pc.icon1 || (isAI ? 'fa-brands fa-python' : isDev ? 'fa-brands fa-react' : 'fa-brands fa-figma');
  const icon2 = pc.icon2 || (isAI ? 'fa-solid fa-brain'   : isDev ? 'fa-brands fa-node-js' : 'fa-brands fa-safari');
  const icon1Color = isAI ? '#3776ab' : isDev ? '#61dafb' : '#F24E1E';
  const icon2Color = isAI ? '#f97316' : isDev ? '#68a063' : '#007AFF';

  const E = (props) => <EditableField editable={editable} onChange={v => onChange && onChange(props.field, v)} {...props} />;

  if (!pc) {
    // Placeholder state before generate
    return (
      <div style={{ background: '#F5F2EB', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: '12px', color: '#9A8E8A' }}>
        <i className="fa-solid fa-wand-magic-sparkles" style={{ fontSize: '2rem', opacity: 0.4 }} />
        <p style={{ fontSize: '0.9rem', textAlign: 'center', padding: '0 2rem' }}>Fill your details or upload a resume, then click <strong>Generate My Portfolio</strong> to preview here.</p>
      </div>
    );
  }

  if (templateName === 'Minimalist Editorial' || templateName === 'UI/UX Figma Case Study') {
    return (
      <div className="pb-designer-portfolio" style={{ backgroundColor: '#F5F2EB', color: '#3A2E2A', fontFamily: 'var(--font-main)', overflow: 'hidden', position: 'relative', height: '100%', display: 'flex', flexDirection: 'column' }}>
        {/* Browser Chrome */}
        <div className="pb-browser-chrome" style={{ borderBottom: '1px solid rgba(0,0,0,0.1)', background: '#F5F2EB' }}>
          <div className="pb-browser-dots">
            <span className="pb-dot red" /><span className="pb-dot yellow" /><span className="pb-dot green" />
          </div>
          <div className="pb-browser-url" style={{ color: '#3A2E2A', background: 'rgba(0,0,0,0.05)' }}>
            <i className="fa-solid fa-lock" style={{ fontSize: '0.6rem', color: '#3A2E2A', marginRight: '6px' }} />
            mockb.cv/{pc.slug}
          </div>
          <div className="pb-browser-actions" style={{ color: '#3A2E2A' }}><i className="fa-solid fa-arrow-rotate-right" /></div>
        </div>

        <div style={{ overflowY: 'auto', flex: 1, paddingBottom: '3rem' }}>
          {/* Hero Section */}
          <div style={{ position: 'relative', height: '400px', display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '2rem' }}>
            <h1 style={{ fontSize: '4.5rem', fontWeight: 800, lineHeight: 0.85, zIndex: 2, letterSpacing: '-2px', textTransform: 'lowercase', margin: 0 }}>
              <E field="bigTitle" placeholder="Role/Title" tag="span" value={pc.bigTitle} style={{ fontFamily: 'Georgia, serif', fontStyle: 'italic', fontWeight: 400, color: '#7DA4BA', display: 'block', fontSize: '3rem', marginBottom: '-5px' }} />
              portfolio
            </h1>

            {/* Floating Folder 1 */}
            <div style={{ position: 'absolute', top: '15%', left: '15%', width: '90px', height: '70px', background: '#7DA4BA', borderRadius: '0 8px 8px 8px', display: 'flex', flexDirection: 'column', boxShadow: '0 10px 20px rgba(125,164,186,0.3)' }}>
              <div style={{ background: '#7DA4BA', width: '35px', height: '12px', borderTopLeftRadius: '8px', borderTopRightRadius: '8px', position: 'absolute', top: '-12px', left: 0 }} />
              <E field="folder1" placeholder="Folder 1" tag="span" value={pc.folder1} style={{ marginTop: 'auto', textAlign: 'center', fontSize: '0.65rem', paddingBottom: '6px', color: '#fff', fontWeight: 600 }} />
            </div>

            {/* Floating Folder 2 */}
            <div style={{ position: 'absolute', bottom: '15%', right: '15%', width: '100px', height: '80px', background: '#7DA4BA', borderRadius: '0 8px 8px 8px', display: 'flex', flexDirection: 'column', boxShadow: '0 10px 20px rgba(125,164,186,0.3)' }}>
              <div style={{ background: '#7DA4BA', width: '40px', height: '14px', borderTopLeftRadius: '8px', borderTopRightRadius: '8px', position: 'absolute', top: '-14px', left: 0 }} />
              <E field="folder2" placeholder="Folder 2" tag="span" value={pc.folder2} style={{ marginTop: 'auto', textAlign: 'center', fontSize: '0.65rem', paddingBottom: '8px', color: '#fff', fontWeight: 600 }} />
            </div>

            <div style={{ position: 'absolute', top: '25%', right: '25%', background: '#fff', padding: '12px', borderRadius: '15px', boxShadow: '0 10px 20px rgba(0,0,0,0.08)' }}>
              <i className={icon1} style={{ fontSize: '1.8rem', color: icon1Color, cursor: editable ? 'pointer' : 'inherit' }} onClick={() => editable && setIconPicker && setIconPicker({isOpen:true, targetField:'icon1'})} />
            </div>
            <div style={{ position: 'absolute', bottom: '25%', left: '25%', background: '#fff', padding: '12px', borderRadius: '15px', boxShadow: '0 10px 20px rgba(0,0,0,0.08)' }}>
              <i className={icon2} style={{ fontSize: '1.8rem', color: icon2Color, cursor: editable ? 'pointer' : 'inherit' }} onClick={() => editable && setIconPicker && setIconPicker({isOpen:true, targetField:'icon2'})} />
            </div>
          </div>

          {/* About Section */}
          <div style={{ display: 'grid', gridTemplateColumns: '0.8fr 1.2fr', gap: '2rem', padding: '0 3rem', marginTop: '1rem' }}>
            <div>
              <div style={{ position: 'relative', width: '100%', maxWidth: '240px', margin: '0 auto' }}>
                <h2 style={{ position: 'absolute', top: '-30px', left: '-20px', fontFamily: 'Georgia, serif', fontStyle: 'italic', fontSize: '2.8rem', color: '#fff', textShadow: '2px 2px 0 #3A2E2A, -2px -2px 0 #3A2E2A, 2px -2px 0 #3A2E2A, -2px 2px 0 #3A2E2A, 0 4px 10px rgba(0,0,0,0.2)', zIndex: 3, transform: 'rotate(-5deg)' }}>about me</h2>
                <div className="pb-image-upload-wrapper" style={{ position: 'relative', width: '100%', aspectRatio: '4/5', background: '#ccc', borderRadius: '24px', overflow: 'hidden', border: '3px solid #3A2E2A', boxShadow: '8px 8px 0 rgba(58,46,42,0.1)', cursor: editable ? 'pointer' : 'default' }}>
                  <img src={pc.profileImage || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"} alt="Portrait" style={{ width: '100%', height: '100%', objectFit: 'cover', filter: pc.profileImage ? 'none' : 'grayscale(100%) contrast(1.1)' }} />
                  {editable && (
                    <label className="pb-image-overlay" style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.6)', color: '#fff', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', opacity: 0, transition: 'opacity 0.2s', cursor: 'pointer' }}>
                      <i className="fa-solid fa-camera" style={{ fontSize: '2rem', marginBottom: '8px' }} />
                      <span style={{ fontWeight: 600 }}>Upload Photo</span>
                      <input type="file" accept="image/*" style={{ display: 'none' }} onChange={e => {
                        const file = e.target.files[0];
                        if (file) {
                          const reader = new FileReader();
                          reader.onloadend = () => {
                            if (onChange) onChange('profileImage', reader.result);
                          };
                          reader.readAsDataURL(file);
                        }
                      }} />
                    </label>
                  )}
                </div>
              </div>
            </div>

            <div>
              <h2 style={{ fontFamily: 'Georgia, serif', fontStyle: 'italic', fontSize: '2.5rem', marginBottom: '1rem', fontWeight: 400, color: '#3A2E2A' }}>Hi, I'm <E field="firstName" placeholder="First Name" tag="span" value={pc.firstName} style={{ color: '#3A2E2A' }} />!</h2>
              <E field="bio" tag="p" value={pc.bio} multiline placeholder="Your professional bio..." style={{ fontSize: '1rem', lineHeight: 1.6, marginBottom: '1.5rem', color: '#4A3E3A' }} />

              <h3 style={{ fontSize: '1.1rem', marginBottom: '1rem', fontWeight: 700, color: '#3A2E2A' }}>What I specialize in:</h3>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                <EditableBlock editable={editable} onAdd={() => {}} onDelete={() => {}} blockType="Specialty"><li style={{ marginBottom: "1rem", display: "flex", gap: "12px", alignItems: "flex-start" }}><i className="fa-solid fa-star-of-life" style={{ color: "#7DA4BA", fontSize: "0.8rem", marginTop: "4px", flexShrink: 0 }}/><E field="specialty1" placeholder="Add specialty description..." tag="span" value={pc.specialty1} multiline style={{ fontSize: '0.95rem', lineHeight: 1.5, color: '#4A3E3A' }} /></li></EditableBlock>
                <EditableBlock editable={editable} onAdd={() => {}} onDelete={() => {}} blockType="Specialty"><li style={{ marginBottom: "1rem", display: "flex", gap: "12px", alignItems: "flex-start" }}><i className="fa-solid fa-star-of-life" style={{ color: "#7DA4BA", fontSize: "0.8rem", marginTop: "4px", flexShrink: 0 }}/><E field="specialty2" placeholder="Add another specialty..." tag="span" value={pc.specialty2} multiline style={{ fontSize: '0.95rem', lineHeight: 1.5, color: '#4A3E3A' }} /></li></EditableBlock>
              </ul>
            </div>
          </div>

          {/* Grid of Info */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem', padding: '3rem', marginTop: '2rem' }}>
            <div>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 800, marginBottom: '1.2rem', color: '#3A2E2A' }}>Experience</h3>
              {pc.experience.map((exp, i) => (
                <EditableBlock key={i} editable={editable} onAdd={() => onAction('ADD_EXP', {index: i})} onDelete={() => onAction('DEL_EXP', {index: i})} onMoveUp={() => onAction('UP_EXP', {index: i})} onMoveDown={() => onAction('DOWN_EXP', {index: i})}>
                  <div style={{ marginBottom: '1.2rem' }}>
                    <E field={`exp_${i}_period`} tag="div" value={exp.period} style={{ fontSize: '0.8rem', opacity: 0.7, marginBottom: '4px', fontFamily: 'Georgia, serif', fontStyle: 'italic' }} />
                    <E field={`exp_${i}_role`} tag="div" value={exp.role} style={{ fontWeight: 600, fontSize: '0.9rem', color: '#3A2E2A', lineHeight: 1.3 }} />
                    <E field={`exp_${i}_company`} tag="div" value={exp.company} style={{ fontSize: '0.85rem', color: '#6A5E5A', marginTop: '2px' }} />
                  </div>
                </EditableBlock>
              ))}
            </div>
            <div>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 800, marginBottom: '1.2rem', color: '#3A2E2A' }}>Skills</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {pc.skills.slice(0, 8).map((s, i) => (<EditableBlock key={i} editable={editable} blockType="Skill" onAdd={() => {}} onDelete={() => {}}><E field={`skill_${i}`} tag="div" value={s} style={{ fontSize: "0.9rem", color: "#4A3E3A" }} /></EditableBlock>))}
              </div>
            </div>
            <div>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 800, marginBottom: '1.2rem', color: '#3A2E2A' }}>Contacts</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '0.9rem', color: '#4A3E3A' }}><i className="fa-regular fa-envelope" style={{ fontSize: '1.1rem', flexShrink: 0 }} /><E field="email" tag="span" value={pc.email} /></div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '0.9rem', color: '#4A3E3A' }}><i className="fa-brands fa-linkedin" style={{ fontSize: '1.1rem', flexShrink: 0 }} /><E field="linkedin" tag="span" value={pc.linkedin} /></div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '0.9rem', color: '#4A3E3A' }}><i className="fa-brands fa-github" style={{ fontSize: '1.1rem', flexShrink: 0 }} /><E field="github" tag="span" value={pc.github} /></div>
                {pc.phone && <div style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '0.9rem', color: '#4A3E3A' }}><i className="fa-solid fa-phone" style={{ fontSize: '1.1rem', flexShrink: 0 }} /><E field="phone" tag="span" value={pc.phone} /></div>}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Dark mode layout for other templates
  const skills = pc.skills;
  const experience = pc.experience;
  const projects = [
    { name: pc.heroRole?.split(' ')[0] + ' Project', desc: 'A featured project showcasing core expertise.', tech: pc.skills.slice(0, 3) },
    { name: 'Open Source Contribution', desc: 'Active contributor to the developer community.', tech: pc.skills.slice(1, 4) },
    { name: 'Client Case Study', desc: 'End-to-end project delivered for a key client.', tech: pc.skills.slice(2, 5) },
  ];
  const firstName = pc.firstName;
  const slug = pc.slug;

  return (
    <div className="pb-live-preview-root" style={{ '--accent': tc.color, '--accent-bg': tc.bg, '--accent-border': tc.border, '--accent-rgb': tc.rgb }}>
      <div className="pb-browser-chrome">
        <div className="pb-browser-dots">
          <span className="pb-dot red" /><span className="pb-dot yellow" /><span className="pb-dot green" />
        </div>
        <div className="pb-browser-url">
          <i className="fa-solid fa-lock" style={{ fontSize: '0.6rem', color: '#27c93f', marginRight: '6px' }} />
          mockb.cv/{slug}
        </div>
        <div className="pb-browser-actions"><i className="fa-solid fa-arrow-rotate-right" /></div>
      </div>

      <div className="pb-site-body">
        <nav className="pb-site-nav">
          <div className="pb-site-logo" style={{ color: tc.color }}><E field="firstName" placeholder="First Name" tag="span" value={pc.firstName} style={{ color: tc.color }} /><span style={{ color: '#fff' }}>.dev</span></div>
          <div className="pb-site-navlinks">{['About', 'Projects', 'Skills', 'Contact'].map(l => <a key={l}> {l} </a>)}</div>
          <button className="pb-site-cta" style={{ background: tc.color, color: '#000' }}>Hire Me</button>
        </nav>

        <section className="pb-site-hero">
          <div className="pb-hero-glow" style={{ background: `radial-gradient(circle, rgba(${tc.rgb},0.15) 0%, transparent 70%)` }} />
          <div className="pb-hero-badge" style={{ background: tc.bg, border: `1px solid ${tc.border}`, color: tc.color }}>
            <span className="pb-pulse" style={{ background: tc.color }} /> Available for Opportunities
          </div>
          <h1 className="pb-hero-name">
            Hi, I'm <E field="firstName" placeholder="First Name" tag="span" value={pc.firstName} style={{ color: tc.color }} /><br />
            <E field="name" placeholder="Last Name" tag="span" value={pc.name.split(' ').slice(1).join(' ')} className="pb-hero-last" />
          </h1>
          <E field="heroRole" placeholder="Your Professional Role" tag="p" value={pc.heroRole} className="pb-hero-role" />
          <E field="heroBio" tag="p" value={pc.heroBio} multiline className="pb-hero-bio" />
          <div className="pb-hero-btns">
            <button className="pb-btn-primary" style={{ background: tc.color, color: '#000' }}>View My Work</button>
            <button className="pb-btn-secondary" style={{ border: `1px solid ${tc.border}`, color: tc.color }}>Download CV</button>
          </div>
          <div className="pb-hero-socials">
            {['fa-brands fa-github', 'fa-brands fa-linkedin-in', 'fa-brands fa-x-twitter'].map(icon => (
              <a key={icon} className="pb-social-icon" style={{ border: `1px solid ${tc.border}` }}><i className={icon} /></a>
            ))}
          </div>
        </section>

        <div className="pb-stats-bar" style={{ borderTop: `1px solid ${tc.border}`, borderBottom: `1px solid ${tc.border}` }}>
          {[['5+', 'Years Exp.'], ['30+', 'Projects'], ['15+', 'Clients'], ['99%', 'Satisfaction']].map(([val, label], i, arr) => (
            <React.Fragment key={label}>
              <div className="pb-stat"><span style={{ color: tc.color }}>{val}</span><p>{label}</p></div>
              {i < arr.length - 1 && <div className="pb-stat-divider" />}
            </React.Fragment>
          ))}
        </div>

        <section className="pb-skills-section">
          <div className="pb-section-label" style={{ color: tc.color }}>// EXPERTISE</div>
          <h2 className="pb-section-title">Technical <span style={{ color: tc.color }}>Skills</span></h2>
          <div className="pb-skills-grid">
            {skills.map((s, i) => (
              <E key={i} field={`skill_${i}`} tag="div" value={s} className="pb-skill-chip" style={{ background: tc.bg, border: `1px solid ${tc.border}`, color: tc.color }} />
            ))}
          </div>
        </section>

        <section className="pb-projects-section">
          <div className="pb-section-label" style={{ color: tc.color }}>// PORTFOLIO</div>
          <h2 className="pb-section-title">Featured <span style={{ color: tc.color }}>Projects</span></h2>
          <div className="pb-projects-grid">
            {projects.map((p, i) => (
              <div key={i} className="pb-project-card" style={{ borderTop: `2px solid ${tc.color}` }}>
                <div className="pb-project-icon" style={{ background: tc.bg, color: tc.color }}><i className="fa-solid fa-code" /></div>
                <h3 className="pb-project-title">{p.name}</h3>
                <p className="pb-project-desc">{p.desc}</p>
                <div className="pb-project-techs">{p.tech.map(t => <span key={t} className="pb-tech-badge" style={{ background: tc.bg, color: tc.color }}>{t}</span>)}</div>
                <div className="pb-project-links"><a style={{ color: tc.color }}>Live Demo <i className="fa-solid fa-arrow-up-right-from-square" /></a><a style={{ color: '#888' }}>GitHub</a></div>
              </div>
            ))}
          </div>
        </section>

        <section className="pb-exp-section">
          <div className="pb-section-label" style={{ color: tc.color }}>// EXPERIENCE</div>
          <h2 className="pb-section-title">Work <span style={{ color: tc.color }}>History</span></h2>
          <div className="pb-timeline">
            {experience.map((exp, i) => (
              <div key={i} className="pb-timeline-item">
                <div className="pb-timeline-dot" style={{ background: tc.color, boxShadow: `0 0 10px rgba(${tc.rgb},0.5)` }} />
                <div className="pb-timeline-content">
                  <div className="pb-timeline-header">
                    <E field={`exp_${i}_role`} tag="h3" value={exp.role} />
                    <E field={`exp_${i}_period`} tag="span" value={exp.period} style={{ color: tc.color }} />
                  </div>
                  <E field={`exp_${i}_company`} tag="p" value={exp.company} className="pb-timeline-company" />
                  <E field={`exp_${i}_desc`} tag="p" value={exp.desc} multiline className="pb-timeline-desc" />
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="pb-contact-section" style={{ background: `linear-gradient(135deg, rgba(${tc.rgb},0.08) 0%, transparent 100%)`, border: `1px solid ${tc.border}` }}>
          <h2>Let's <span style={{ color: tc.color }}>Work Together</span></h2>
          <p>Open to full-time roles, freelance projects, and exciting collaborations.</p>
          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', justifyContent: 'center', marginTop: '8px', fontSize: '0.85rem', color: '#888' }}>
            {pc.email && <span><i className="fa-regular fa-envelope" style={{ color: tc.color, marginRight: '6px' }} />{pc.email}</span>}
            {pc.location && <span><i className="fa-solid fa-location-dot" style={{ color: tc.color, marginRight: '6px' }} />{pc.location}</span>}
          </div>
          <button className="pb-btn-primary" style={{ background: tc.color, color: '#000', marginTop: '1rem' }}>Get In Touch <i className="fa-solid fa-arrow-right" /></button>
        </section>

        <footer className="pb-site-footer">
          <span style={{ color: tc.color }}>{firstName}.dev</span> · Crafted with MockB CV
        </footer>
      </div>
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────
export default function PortfolioBuilder() {
  const [view, setView] = useState('landing');
  const [activeCategory, setActiveCategory] = useState('styles');
  const [selectedTemplate, setSelectedTemplate] = useState('Creative Glassmorphism');
  const [landingTheme, setLandingTheme] = useState('gold');
  const [selectedTheme, setSelectedTheme] = useState('gold');
  const [dragOver, setDragOver] = useState(false);
  const [uploadedFile, setUploadedFile] = useState(null);
  const [showOverlay, setShowOverlay] = useState(false);
  const [processingStep, setProcessingStep] = useState(1);
  const [userName, setUserName] = useState('Alex Carter');
  const [isCopied, setIsCopied] = useState(false);
  const [downloadModal, setDownloadModal] = useState({ show: false });
  const [manualDetails, setManualDetails] = useState({ name: '', role: '', experience: '', skills: '', email: '', phone: '', location: '', bio: '', education: '', linkedin: '', github: '', projects: '' });
  const [generatedData, setGeneratedData] = useState(null);
  const [portfolioContent, setPortfolioContent] = useState(() => buildPortfolioContent({name: 'Alex Carter'}, 'designer', 'Creative Glassmorphism'));
  const [editMode, setEditMode] = useState(false);
  const [contextMenu, setContextMenu] = useState(null);
  const [iconPicker, setIconPicker] = useState({ isOpen: false, targetField: null });
  const [extractedResumeData, setExtractedResumeData] = useState(null);
  const [isParsing, setIsParsing] = useState(false);
  const fileInputRef = useRef(null);

  const scrollTo = (id, e) => { e && e.preventDefault(); document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' }); };
  const getIcon = name => { const t = templatesData.find(t => t.name === name); return t ? t.icon : 'fa-solid fa-wand-magic-sparkles'; };

  const handleDragEnter = e => { e.preventDefault(); e.stopPropagation(); setDragOver(true); };
  const handleDragOver  = e => { e.preventDefault(); e.stopPropagation(); setDragOver(true); };
  const handleDragLeave = e => { e.preventDefault(); e.stopPropagation(); setDragOver(false); };
  const handleDrop = e => { e.preventDefault(); e.stopPropagation(); setDragOver(false); if (e.dataTransfer.files[0]) processFile(e.dataTransfer.files[0]); };
  const handleFileChange = e => { if (e.target.files[0]) processFile(e.target.files[0]); };

  const processFile = async (file) => {
    setUploadedFile(file);
    setExtractedResumeData(null);
    setIsParsing(true);
    try {
      const text = await extractTextFromPdf(file);
      const parsed = parseResumeText(text);
      // Fallback: if name not found from text, use file name
      if (!parsed.name) {
        const cleaned = file.name.replace(/\.[^/.]+$/, '').replace(/[-_]/g, ' ');
        parsed.name = cleaned.split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
      }
      setExtractedResumeData(parsed);
      setUserName(parsed.name || userName);

      const roleStr = (parsed.role || '').toLowerCase();
      let roleType = 'designer';
      if (roleStr.includes('ai') || roleStr.includes('ml') || roleStr.includes('data') || roleStr.includes('machine') || roleStr.includes('nlp')) roleType = 'ai & data scientist';
      else if (roleStr.includes('develop') || roleStr.includes('engineer') || roleStr.includes('software') || roleStr.includes('fullstack') || roleStr.includes('frontend') || roleStr.includes('backend')) roleType = 'developer';
      setPortfolioContent(buildPortfolioContent(parsed, roleType, selectedTemplate));
      
    } catch (e) {
      console.error('Error parsing PDF:', e);
    }
    setIsParsing(false);
  };

  useEffect(() => {
    // Re-run the theme/layout adapter when the template changes, but preserve current content
    if (view === 'configure' || view === 'output') {
      const roleStr = (portfolioContent?.heroRole || '').toLowerCase();
      let roleType = 'designer';
      if (roleStr.includes('ai') || roleStr.includes('data')) roleType = 'ai & data scientist';
      else if (roleStr.includes('develop') || roleStr.includes('engineer')) roleType = 'developer';
      setPortfolioContent(prev => buildPortfolioContent(prev || {name: 'Alex Carter'}, roleType, selectedTemplate));
    }
  }, [selectedTemplate]);

  const handleGenerate = () => {
    setShowOverlay(true);
    setProcessingStep(1);
    setTimeout(() => setProcessingStep(2), 800);
    setTimeout(() => setProcessingStep(3), 1600);
    setTimeout(() => setProcessingStep(4), 2400);
    setTimeout(() => { setProcessingStep(5); setTimeout(() => { setShowOverlay(false); setView('output'); }, 800); }, 3200);
  };

  const handlePortfolioChange = (field, value) => {
    setPortfolioContent(prev => {
      if (!prev) return prev;
      // Handle nested fields: exp_0_role, exp_0_company, exp_0_period, exp_0_desc, skill_0, etc.
      if (field.startsWith('exp_')) {
        const parts = field.split('_'); // ['exp', '0', 'role']
        const idx = parseInt(parts[1]);
        const key = parts[2];
        const newExp = prev.experience.map((e, i) => i === idx ? { ...e, [key]: value } : e);
        return { ...prev, experience: newExp };
      }
      if (field.startsWith('skill_')) {
        const idx = parseInt(field.split('_')[1]);
        const newSkills = prev.skills.map((s, i) => i === idx ? value : s);
        return { ...prev, skills: newSkills };
      }
      return { ...prev, [field]: value };
    });
  };

  const handlePortfolioAction = (action, payload) => {
    setPortfolioContent(prev => {
      if (!prev) return prev;
      let newExp = [...prev.experience];
      if (action === 'ADD_EXP') {
        newExp.splice(payload.index + 1, 0, { role: 'New Role', company: 'New Company', period: 'Date period', desc: 'Highlight your accomplishments.' });
        return { ...prev, experience: newExp };
      }
      if (action === 'DEL_EXP') {
        newExp.splice(payload.index, 1);
        if (newExp.length === 0) newExp.push({ role: 'Role', company: 'Company', period: 'Date', desc: '' }); // keep at least one
        return { ...prev, experience: newExp };
      }
      if (action === 'UP_EXP' && payload.index > 0) {
        const temp = newExp[payload.index - 1];
        newExp[payload.index - 1] = newExp[payload.index];
        newExp[payload.index] = temp;
        return { ...prev, experience: newExp };
      }
      if (action === 'DOWN_EXP' && payload.index < newExp.length - 1) {
        const temp = newExp[payload.index + 1];
        newExp[payload.index + 1] = newExp[payload.index];
        newExp[payload.index] = temp;
        return { ...prev, experience: newExp };
      }
      return prev;
    });
  };

  const handleCopyLink = () => {
    const slug = userName.toLowerCase().replace(/[^a-z0-9]/g, '-');
    navigator.clipboard.writeText(`https://mockb.cv/${slug}`);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 1500);
  };

  // ── Full React Project Download ─────────────────────────────────────────────
  const handleDownload = async () => {
    setDownloadModal({ show: true });
    const zip = new JSZip();
    const tc = themeColors[selectedTheme];
    const safeName = userName.replace(/\s+/g, '_');
    const firstName = userName.split(' ')[0] || 'Dev';
    const lastName = userName.split(' ').slice(1).join(' ') || '';
    const slug = userName.toLowerCase().replace(/[^a-z0-9]/g, '-');
    const role = selectedTemplate === 'Technical Developer Grid' ? 'Senior Software Engineer & Cloud Architect' :
                 selectedTemplate === 'UI/UX Figma Case Study' ? 'Product Designer & UX Researcher' :
                 selectedTemplate === 'Frontend Engineer Showcase' ? 'Frontend Engineer & UI Specialist' :
                 'Full-Stack Developer & Tech Innovator';

    // README.md
    zip.file('README.md', `# ${userName} — Personal Portfolio\n\n> Generated by **MockB CV** | Template: ${selectedTemplate} | Theme: ${selectedTheme}\n\n## 🚀 Quick Start\n\n\`\`\`bash\nnpm install\nnpm run dev\n\`\`\`\n\nOpen [http://localhost:5173](http://localhost:5173)\n\n## 📦 Build for Production\n\n\`\`\`bash\nnpm run build\n\`\`\`\n\n## ☁️ Deploy\n\n| Platform | How |\n|---|---|\n| **Netlify** | Drag & drop \`dist/\` at netlify.com/drop |\n| **Vercel** | \`npx vercel --prod\` |\n| **GitHub Pages** | Push \`dist/\` to \`gh-pages\` branch |\n\n---\nMade with ❤️ using [MockB CV](https://mockb.cv)\n`);

    // package.json
    zip.file('package.json', JSON.stringify({
      name: `${safeName.toLowerCase()}-portfolio`, version: '1.0.0', type: 'module',
      scripts: { dev: 'vite', build: 'vite build', preview: 'vite preview' },
      dependencies: { react: '^18.2.0', 'react-dom': '^18.2.0' },
      devDependencies: { '@vitejs/plugin-react': '^4.0.3', vite: '^4.4.5' }
    }, null, 2));

    // vite.config.js
    zip.file('vite.config.js', `import { defineConfig } from 'vite'\nimport react from '@vitejs/plugin-react'\nexport default defineConfig({ plugins: [react()] })\n`);

    // .gitignore
    zip.file('.gitignore', `node_modules\ndist\n.DS_Store\n*.local\n`);

    // index.html
    zip.file('index.html', `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="description" content="${userName} — Professional Portfolio" />
    <title>${userName} | Portfolio</title>
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet" />
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css" />
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.jsx"></script>
  </body>
</html>
`);

    const src = zip.folder('src');

    // src/main.jsx
    src.file('main.jsx', `import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
`);

    // src/data.js — editable portfolio content
    src.file('data.js', `// ✏️ Edit this file to update your portfolio content

export const data = {
  name: '${userName}',
  firstName: '${firstName}',
  lastName: '${lastName}',
  role: '${role}',
  bio: 'Passionate engineer with expertise in building scalable products that reach millions. I specialize in crafting elegant solutions to complex problems and love working on impactful projects.',
  email: 'hello@${slug}.dev',
  github: 'https://github.com/${slug}',
  linkedin: 'https://linkedin.com/in/${slug}',
  twitter: 'https://twitter.com/${slug}',
  skills: [
    'React.js', 'Node.js', 'TypeScript', 'Python',
    'AWS', 'Docker', 'GraphQL', 'PostgreSQL', 'Next.js', 'TailwindCSS'
  ],
  projects: [
    {
      name: 'AI Analytics Dashboard',
      description: 'Real-time data visualization platform with ML insights powering smarter business decisions.',
      tech: ['React', 'Python', 'TensorFlow', 'D3.js'],
      live: '#', github: '#'
    },
    {
      name: 'E-Commerce Platform',
      description: 'Full-stack marketplace with payment integration, real-time inventory, and admin dashboard.',
      tech: ['Next.js', 'Node.js', 'Stripe', 'PostgreSQL'],
      live: '#', github: '#'
    },
    {
      name: 'DevOps Pipeline Tool',
      description: 'Automated CI/CD workflow system that cut deployment time by 70% across 30+ microservices.',
      tech: ['Docker', 'AWS', 'Jenkins', 'Kubernetes'],
      live: '#', github: '#'
    },
    {
      name: 'Mobile Fitness App',
      description: 'Cross-platform fitness tracker with AI-powered workout recommendations and social features.',
      tech: ['React Native', 'Firebase', 'TensorFlow Lite'],
      live: '#', github: '#'
    }
  ],
  experience: [
    {
      role: 'Senior Software Engineer',
      company: 'TechCorp Inc.',
      period: '2022 – Present',
      description: 'Led development of microservices architecture serving 2M+ daily active users. Reduced API latency by 60%.'
    },
    {
      role: 'Full Stack Developer',
      company: 'StartupXYZ',
      period: '2020 – 2022',
      description: 'Built and launched product from 0 to 100K users in 18 months. Architected the entire frontend and backend.'
    },
    {
      role: 'Junior Developer',
      company: 'Digital Agency Co.',
      period: '2018 – 2020',
      description: 'Delivered 20+ client websites. Introduced React to the team tech stack.'
    }
  ],
  stats: { years: '5+', projects: '30+', clients: '15+', satisfaction: '99%' }
}
`);

    // src/App.jsx — full working portfolio
    src.file('App.jsx', `${newAppJsx}`);

    // src/index.css — complete, professional styles with the user's chosen accent color
    src.file('index.css', `${newIndexCss}`);

    zip.folder('public');

    // Trigger download
    const blob = await zip.generateAsync({ type: 'blob' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = `${safeName}_Portfolio.zip`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    setDownloadModal({ show: false });
  };

  // ─── LANDING VIEW ──────────────────────────────────────────────────────────
  if (view === 'landing') {
    const filtered = templatesData.filter(t => t.category === activeCategory);
    return (
      <main className="portfolio-builder-page">
        <section className="portfolio-hero">
          <div className="container">
            <div className="pb-hero-content">
              <h1 className="animate-reveal">Stand Out Instantly with <span>AI Web Portfolios</span></h1>
              <p className="animate-reveal">Transform your achievements and projects into a stunning, responsive personal website. Optimized for SEO, ATS keyword compliance, and recruiters' attention.</p>
              <div className="pb-hero-buttons animate-reveal">
                <a href="#templates-showcase" className="btn btn-primary" onClick={e => { e.preventDefault(); document.getElementById('templates-showcase')?.scrollIntoView({ behavior: 'smooth' }); }}>Build Your Portfolio <i className="fa-solid fa-arrow-right" /></a>
                <a href="#how-it-works" className="btn btn-secondary" onClick={e => scrollTo('how-it-works', e)}>See How it Works</a>
              </div>
              <div className="pb-trust-stats animate-reveal">
                <div className="pb-stat-item"><h3>1-Click</h3><p>Sync from Resume</p></div>
                <div className="pb-stat-divider" />
                <div className="pb-stat-item"><h3>100%</h3><p>SEO &amp; Search Optimized</p></div>
                <div className="pb-stat-divider" />
                <div className="pb-stat-item"><h3>99.9%</h3><p>Hosted Uptime</p></div>
              </div>
            </div>
          </div>
        </section>

        <section className="showcase-section" style={{ paddingBottom: '8rem', textAlign: 'center' }}>
          <div className="container">
            <div className="hero-showcase animate-reveal" style={{ animationDelay: '0.2s' }}>
              <div className="showcase-window" style={{ boxShadow: themeColors[landingTheme].boxShadow }}>
                <div className="window-bar">
                  <div className="window-dot red" /><div className="window-dot yellow" /><div className="window-dot green" />
                  <div className="window-url">mockb.cv/alex-dev</div>
                </div>
                <div className="window-body">
                  <div className="mock-nav">
                    <div className="mock-logo" style={{ color: themeColors[landingTheme].color }}>AD</div>
                    <div className="mock-links"><span>Projects</span><span>Experience</span><span>Contact</span></div>
                  </div>
                  <div className="mock-hero">
                    <div className="mock-avatar" style={{ color: themeColors[landingTheme].color, background: themeColors[landingTheme].bg, borderColor: themeColors[landingTheme].border, boxShadow: `0 0 20px ${themeColors[landingTheme].bg}` }}>
                      <i className="fa-solid fa-code" />
                    </div>
                    <h2>Alex Carter</h2><p>Senior Fullstack Engineer</p>
                    <div className="mock-tags"><span>React</span><span>NodeJS</span><span>AWS</span></div>
                  </div>
                </div>
              </div>
              <div className="showcase-glow" style={{ background: `radial-gradient(circle, ${themeColors[landingTheme].bg} 0%, transparent 60%)` }} />
            </div>
          </div>
        </section>

        <section className="explanation-section" id="how-it-works">
          <div className="container">
            <div className="section-header">
              <h2>Why a Modern Portfolio is <span>Critical</span></h2>
              <p>In today's market, a static PDF is not enough. Recruiters want dynamic proof of your expertise.</p>
            </div>
            <div className="explanation-grid">
              <div className="explanation-card"><div className="card-icon"><i className="fa-solid fa-globe" /></div><h3>Interactive Live Showcase</h3><p>Allow hiring managers to run your demos and interact with your designs from their browser.</p></div>
              <div className="explanation-card"><div className="card-icon"><i className="fa-solid fa-share-nodes" /></div><h3>Professional Personal Brand</h3><p>Own a unified link containing your resume, achievements, and projects that looks breathtaking.</p></div>
              <div className="explanation-card"><div className="card-icon"><i className="fa-solid fa-arrow-up-right-dots" /></div><h3>SEO & Hiring Advantage</h3><p>Get discovered organically on Google. Fully integrated with automated resume linking.</p></div>
            </div>
          </div>
        </section>

        <section className="pb-templates-section" id="templates-showcase">
          <div className="container">
            <div className="section-header">
              <h2>Select Your <span>Portfolio Template</span></h2>
              <p>Gorgeous layouts tailored by design style or career industry.</p>
            </div>
            <div className="filter-tabs">
              <button className={`tab-btn ${activeCategory === 'styles' ? 'active' : ''}`} onClick={() => setActiveCategory('styles')}>Style-wise Designs</button>
              <button className={`tab-btn ${activeCategory === 'roles' ? 'active' : ''}`} onClick={() => setActiveCategory('roles')}>Job Role-wise Designs</button>
            </div>
            <div className="templates-grid">
              {filtered.map((item, i) => (
                <div key={item.id} className="pb-template-showcard animate-reveal" style={{ animationDelay: `${i * 0.1}s` }}>
                  <div className="pb-template-preview">
                    {item.name === 'Minimalist Editorial' || item.name === 'UI/UX Figma Case Study' ? (
                      <div style={{ position: 'relative', width: '100%', height: '100%', background: '#F5F2EB', overflow: 'hidden' }}>
                        {/* Mini editorial layout */}
                        <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
                          <div style={{ fontSize: '0.6rem', fontStyle: 'italic', color: '#7DA4BA', letterSpacing: '1px', fontFamily: 'Georgia, serif' }}>designer</div>
                          <div style={{ fontSize: '1.2rem', fontWeight: 800, color: '#3A2E2A', textTransform: 'lowercase', lineHeight: 1 }}>portfolio</div>
                        </div>
                        {/* Folder top-left */}
                        <div style={{ position: 'absolute', top: '18%', left: '8%', width: '28%', height: '22%', background: '#7DA4BA', borderRadius: '0 4px 4px 4px' }}>
                          <div style={{ position: 'absolute', top: '-4px', left: 0, width: '40%', height: '4px', background: '#7DA4BA', borderRadius: '2px 2px 0 0' }} />
                          <div style={{ position: 'absolute', bottom: '4px', left: 0, right: 0, textAlign: 'center', fontSize: '0.4rem', color: '#fff', fontWeight: 700 }}>web design</div>
                        </div>
                        {/* Folder bottom-right */}
                        <div style={{ position: 'absolute', bottom: '18%', right: '8%', width: '30%', height: '24%', background: '#7DA4BA', borderRadius: '0 4px 4px 4px' }}>
                          <div style={{ position: 'absolute', top: '-4px', left: 0, width: '40%', height: '4px', background: '#7DA4BA', borderRadius: '2px 2px 0 0' }} />
                          <div style={{ position: 'absolute', bottom: '4px', left: 0, right: 0, textAlign: 'center', fontSize: '0.4rem', color: '#fff', fontWeight: 700 }}>social media</div>
                        </div>
                        {/* Icon badges */}
                        <div style={{ position: 'absolute', top: '28%', right: '18%', background: '#fff', borderRadius: '6px', padding: '4px', boxShadow: '0 2px 6px rgba(0,0,0,0.1)' }}>
                          <i className="fa-brands fa-figma" style={{ fontSize: '0.7rem', color: '#F24E1E' }} />
                        </div>
                        <div style={{ position: 'absolute', bottom: '28%', left: '18%', background: '#fff', borderRadius: '6px', padding: '4px', boxShadow: '0 2px 6px rgba(0,0,0,0.1)' }}>
                          <i className="fa-brands fa-safari" style={{ fontSize: '0.7rem', color: '#007AFF' }} />
                        </div>
                        <button onClick={() => { setSelectedTemplate(item.name); setView('configure'); }} className="btn btn-primary btn-sm" style={{ position: 'absolute', bottom: '12px', left: '50%', transform: 'translateX(-50%)', zIndex: 10, fontSize: '0.7rem', padding: '6px 12px', whiteSpace: 'nowrap' }}>Select Template</button>
                      </div>
                    ) : (
                      <>
                        <div className="pb-preview-overlay">
                          <div className="pb-preview-content">
                            <div className="pb-preview-nav"><span>Portfolio Demo</span><i className={item.icon} /></div>
                            <div className="pb-preview-hero"><div className="pb-p-line pb-accent" /><div className="pb-p-line" /></div>
                            <div className="pb-preview-grid"><div className="pb-preview-box" /><div className="pb-preview-box" /><div className="pb-preview-box" /></div>
                          </div>
                          <button onClick={() => { setSelectedTemplate(item.name); setView('configure'); }} className="btn btn-primary btn-sm" style={{ position: 'absolute', bottom: '20px', zIndex: 10 }}>Select Template</button>
                        </div>
                        <div className="mock-avatar"><i className={item.icon} /></div>
                      </>
                    )}
                  </div>
                  <div className="pb-template-details">
                    <span className="tag">{item.tag}</span>
                    <h3>{item.name}</h3>
                    <p>{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="publishing-roadmap-section">
          <div className="container">
            <div className="section-header">
              <h2>Go Live in <span>3 Easy Steps</span></h2>
              <p>Generating your digital presence takes under 5 minutes.</p>
            </div>
            <div className="roadmap-grid">
              <div className="roadmap-step"><div className="step-badge">01</div><h3>Import Your Resume</h3><p>Upload a PDF to automatically fill skills, experience, and background parameters.</p></div>
              <div className="roadmap-step"><div className="step-badge">02</div><h3>Choose Design Theme</h3><p>Pick from premium glassmorphic, developer grid, or minimalist portfolio styles.</p></div>
              <div className="roadmap-step"><div className="step-badge">03</div><h3>Download React Code</h3><p>Get a complete React + Vite project. Open in VS Code and deploy anywhere in minutes.</p></div>
            </div>
          </div>
        </section>
      </main>
    );
  }

  // ─── CONFIGURE VIEW ────────────────────────────────────────────────────────
  if (view === 'configure') {
    const tc = themeColors[selectedTheme];
    return (
      <div className="pb-workspace">
        <div className="pb-topbar">
          <button onClick={() => setView('landing')} className="pb-back-btn"><i className="fa-solid fa-arrow-left" /> Back</button>
          <div className="pb-topbar-center">
            <div className="pb-template-badge"><i className={getIcon(selectedTemplate)} /> {selectedTemplate}</div>
          </div>
          <div className="pb-topbar-actions">
            <div className="pb-theme-dots">
              {Object.entries(themeColors).map(([key, val]) => (
                <button key={key} className="pb-theme-dot" style={{ background: val.color, boxShadow: selectedTheme === key ? `0 0 0 2px #fff, 0 0 0 4px ${val.color}` : 'none' }} onClick={() => setSelectedTheme(key)} title={key} />
              ))}
            </div>
          </div>
        </div>

        <div className="pb-workspace-body">
          <div className="pb-preview-pane">
            <div className="pb-preview-pane-header">
              <div className="pb-live-badge"><span className="pulse-dot" /> LIVE PREVIEW</div>
              <span className="pb-preview-note">Click any text to edit inline! →</span>
            </div>
            <div className="pb-preview-scroll" 
      onContextMenu={e => {
        if (editMode) {
          e.preventDefault();
          setContextMenu({ x: e.pageX, y: e.pageY });
        }
      }}
      onClick={() => setContextMenu(null)}
  >
    {contextMenu && <ContextMenu x={contextMenu.x} y={contextMenu.y} onClose={() => setContextMenu(null)} onAction={a => { console.log('Context action:', a); setContextMenu(null); }} />}
    <IconPickerModal isOpen={iconPicker.isOpen} onClose={() => setIconPicker({ isOpen: false, targetField: null })} onSelect={icon => { handlePortfolioChange(iconPicker.targetField, icon); setIconPicker({ isOpen: false, targetField: null }); }} />
              <LivePortfolioPreview 
                theme={selectedTheme} 
                templateName={selectedTemplate} 
                isGenerated={false} 
                editable={true}
                portfolioContent={portfolioContent}
                onChange={handlePortfolioChange}
                onAction={handlePortfolioAction}
                setIconPicker={setIconPicker}
              />
            </div>
          </div>

          <div className="pb-controls-pane">
            <div className="pb-controls-inner">
              <div className="pb-controls-header">
                <h2>Configure <span style={{ color: tc.color }}>Portfolio</span></h2>
                <p>Upload your resume to pre-fill data, and edit text directly in the live preview!</p>
              </div>

              {/* Step 1: Upload Resume */}
              <div className="pb-config-step">
                <div className="pb-step-num" style={{ background: tc.bg, color: tc.color, border: `1px solid ${tc.border}` }}>1</div>
                <div className="pb-step-body">
                  <h4>Upload Your Resume</h4>
                  <p className="pb-step-desc">AI will extract your data into the preview instantly</p>
                  <div
                    className={`pb-dropzone ${dragOver ? 'dragover' : ''} ${uploadedFile ? 'has-file' : ''}`}
                    style={{ borderColor: uploadedFile ? tc.color : dragOver ? tc.color : 'rgba(255,255,255,0.1)', background: uploadedFile ? tc.bg : dragOver ? tc.bg : 'rgba(255,255,255,0.02)', cursor: uploadedFile ? 'default' : 'pointer' }}
                    onClick={() => !uploadedFile && fileInputRef.current.click()}
                    onDragEnter={handleDragEnter} onDragOver={handleDragOver} onDragLeave={handleDragLeave} onDrop={handleDrop}
                  >
                    <input type="file" accept=".pdf,.doc,.docx" className="hidden-input" ref={fileInputRef} onChange={handleFileChange} />
                    {!uploadedFile ? (
                      <div className="pb-dropzone-inner">
                        <div className="pb-upload-icon" style={{ color: tc.color }}><i className="fa-solid fa-cloud-arrow-up" /></div>
                        <p className="pb-upload-title">Drop your resume here</p>
                        <p className="pb-upload-sub">PDF, DOCX up to 10MB</p>
                        <button type="button" className="pb-browse-btn" style={{ border: `1px solid ${tc.border}`, color: tc.color }} onClick={e => { e.stopPropagation(); fileInputRef.current.click(); }}>Browse Files</button>
                      </div>
                    ) : isParsing ? (
                      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px', padding: '16px' }}>
                        <i className="fa-solid fa-circle-notch fa-spin" style={{ color: tc.color, fontSize: '1.5rem' }} />
                        <p style={{ color: '#aaa', fontSize: '0.85rem', margin: 0 }}>Reading your resume...</p>
                      </div>
                    ) : (
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', padding: '4px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                          <div style={{ background: tc.bg, border: `1px solid ${tc.border}`, borderRadius: '10px', padding: '10px 12px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <i className="fa-solid fa-file-pdf" style={{ color: '#ff5f56', fontSize: '1.2rem' }} />
                          </div>
                          <div style={{ flex: 1, minWidth: 0 }}>
                            <span style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, color: '#fff', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{uploadedFile.name}</span>
                            <span style={{ color: tc.color, fontSize: '0.75rem' }}><i className="fa-solid fa-circle-check" /> {extractedResumeData ? 'Extracted successfully' : 'Uploaded'}</span>
                          </div>
                          <button onClick={e => { e.stopPropagation(); setUploadedFile(null); setExtractedResumeData(null); }} title="Remove file" style={{ background: 'rgba(255,87,87,0.15)', border: '1px solid rgba(255,87,87,0.4)', color: '#ff5756', width: '28px', height: '28px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', fontSize: '0.8rem', flexShrink: 0 }}><i className="fa-solid fa-xmark" /></button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Step 2: Customization */}
              <div className="pb-config-step">
                <div className="pb-step-num" style={{ background: tc.bg, color: tc.color, border: `1px solid ${tc.border}` }}>2</div>
                <div className="pb-step-body">
                  <h4>Edit Content & Theme</h4>
                  <p style={{ fontSize: '0.85rem', color: '#aaa', lineHeight: 1.5, marginBottom: '10px' }}>
                    1. <strong>Click any text</strong> in the live preview on the left to edit it instantly.<br/>
                    2. Select your accent color in the top right corner.
                  </p>
                  <div className="pb-selected-template-display" style={{ background: tc.bg, border: `1px solid ${tc.border}` }}>
                    <i className={getIcon(selectedTemplate)} style={{ color: tc.color }} />
                    <span>{selectedTemplate}</span>
                    <button onClick={() => setView('landing')} style={{ marginLeft: 'auto', fontSize: '0.75rem', color: tc.color, background: 'none', border: 'none', cursor: 'pointer' }}>Change</button>
                  </div>
                </div>
              </div>

              <div className="pb-generate-wrap">
                <button
                  className="pb-generate-btn"
                  style={{ background: tc.color, color: '#000', boxShadow: `0 8px 30px rgba(${tc.rgb},0.4)` }}
                  onClick={handleGenerate}
                >
                  <i className="fa-solid fa-bolt" /> Generate My Portfolio
                </button>
                <p className="pb-generate-note" style={{ color: tc.color }}>
                  ✓ Live edits are saved automatically. Click Generate to download code.
                </p>
              </div>
            </div>
          </div>
        </div>

        {showOverlay && (
          <div className="ai-processing-overlay">
            <div className="processing-content glass-card">
              <div className="pb-processing-icon" style={{ color: themeColors[selectedTheme].color }}><i className="fa-solid fa-microchip fa-spin" /></div>
              <h2>AI Building Your Portfolio</h2>
              <p>Analyzing resume & generating a personalized portfolio...</p>
              <div className="process-steps">
                {['Parsing resume text structure...', 'Extracting skills & milestone nodes...', 'Applying custom theme variables...', 'Compiling production-ready portfolio...'].map((label, i) => {
                  const step = i + 1;
                  return (
                    <div key={i} className={`step-line${processingStep === step ? ' active' : ''}${processingStep > step ? ' success' : ''}`}>
                      <i className={processingStep === step ? 'fa-solid fa-circle-notch fa-spin' : processingStep > step ? 'fa-solid fa-circle-check' : 'fa-solid fa-circle'} />
                      <span>{label}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  // ─── OUTPUT VIEW ───────────────────────────────────────────────────────────
  if (view === 'output') {
    const tc = themeColors[selectedTheme];
    const slug = userName.toLowerCase().replace(/[^a-z0-9]/g, '-');
    const features = [
      'Complete React + Vite Source Code',
      'Editable data.js — update all content in one file',
      'Professional CSS with your chosen accent color',
      'Mobile-Responsive Design',
      'SEO-Optimized HTML Structure',
      'Google Fonts + FontAwesome Icons included',
      'Deploy-ready: Netlify, Vercel, GitHub Pages'
    ];
    return (
      <div className="pb-workspace">
        <div className="pb-topbar">
          <button onClick={() => setView('configure')} className="pb-back-btn"><i className="fa-solid fa-arrow-left" /> Adjust Settings</button>
          <div className="pb-topbar-center">
            <div className="pb-live-badge" style={{ padding: '6px 16px', borderRadius: '20px', background: 'rgba(39,201,63,0.1)', border: '1px solid rgba(39,201,63,0.2)' }}>
              <span className="pulse-dot" /><span style={{ color: '#27c93f', fontWeight: 700, fontSize: '0.85rem', letterSpacing: '1px' }}>PORTFOLIO GENERATED</span>
            </div>
          </div>
          <div className="pb-topbar-actions">
            <button className="pb-download-quick-btn" style={{ background: tc.color, color: '#000' }} onClick={handleDownload}>
              <i className="fa-solid fa-download" /> Download .zip
            </button>
          </div>
        </div>

        <div className="pb-workspace-body">
          <div className="pb-preview-pane">
            <div className="pb-preview-pane-header">
              <div className="pb-live-badge"><span className="pulse-dot" /> LIVE PREVIEW — {selectedTemplate}</div>
              <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                <button
                  onClick={() => setEditMode(m => !m)}
                  style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '5px 14px', borderRadius: '8px', fontSize: '0.78rem', fontWeight: 600, cursor: 'pointer', transition: 'all 0.2s', border: `1px solid ${editMode ? '#27c93f' : tc.border}`, background: editMode ? 'rgba(39,201,63,0.15)' : tc.bg, color: editMode ? '#27c93f' : tc.color }}
                >
                  <i className={editMode ? 'fa-solid fa-check-circle' : 'fa-solid fa-pen-to-square'} />
                  {editMode ? 'Editing ON — Click any text' : 'Edit Text'}
                </button>
                <span className="pb-preview-note">mockb.cv/{slug}</span>
              </div>
            </div>
            {editMode && (
              <div style={{ padding: '6px 14px', background: 'rgba(39,201,63,0.08)', borderBottom: '1px solid rgba(39,201,63,0.2)', fontSize: '0.78rem', color: '#27c93f', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <i className="fa-solid fa-circle-info" />
                <span>Click on any text in the preview to edit it. Press <kbd style={{ background: 'rgba(255,255,255,0.1)', padding: '1px 5px', borderRadius: '3px', fontSize: '0.72rem' }}>Enter</kbd> or click away to save.</span>
              </div>
            )}
            <div className="pb-preview-scroll">
              <LivePortfolioPreview 
                theme={selectedTheme} 
                templateName={selectedTemplate} 
                isGenerated={true} 
                editable={editMode}
                portfolioContent={portfolioContent}
                onChange={handlePortfolioChange}
                onAction={handlePortfolioAction}
                setIconPicker={setIconPicker}
              />
            </div>
          </div>

          <div className="pb-controls-pane">
            <div className="pb-controls-inner">
              <div className="pb-output-success-header">
                <div className="pb-success-badge" style={{ background: 'rgba(39,201,63,0.1)', border: '1px solid rgba(39,201,63,0.2)' }}>
                  <i className="fa-solid fa-circle-check" style={{ color: '#27c93f', fontSize: '2rem' }} />
                </div>
                <h2>Your Portfolio is <span style={{ color: '#27c93f' }}>Ready!</span></h2>
                <p>A complete React portfolio has been generated. Download the ZIP, open in VS Code, run <code style={{ color: tc.color, background: tc.bg, padding: '1px 6px', borderRadius: '4px', fontSize: '0.8rem' }}>npm install && npm run dev</code> and it works.</p>
              </div>

              <div className="pb-url-box" style={{ background: tc.bg, border: `1px solid ${tc.border}` }}>
                <div className="pb-url-label"><i className="fa-solid fa-link" style={{ color: tc.color }} /> Your Portfolio URL (after deploy)</div>
                <div className="pb-url-row">
                  <span className="pb-url-text" style={{ color: tc.color }}>mockb.cv/{slug}</span>
                  <button className="pb-copy-btn" style={{ background: tc.color, color: '#000' }} onClick={handleCopyLink}>
                    {isCopied ? <><i className="fa-solid fa-check" /> Copied!</> : <><i className="fa-solid fa-copy" /> Copy</>}
                  </button>
                </div>
              </div>

              {/* How to use */}
              <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '10px', padding: '14px' }}>
                <h4 style={{ color: '#fff', fontSize: '0.82rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '10px' }}>How to Use in VS Code</h4>
                {[
                  { num: '1', text: 'Extract the downloaded .zip file' },
                  { num: '2', text: 'Open folder in VS Code' },
                  { num: '3', text: 'Run: npm install' },
                  { num: '4', text: 'Run: npm run dev — opens at localhost:5173' },
                  { num: '5', text: 'Edit src/data.js to update your info' },
                ].map(s => (
                  <div key={s.num} style={{ display: 'flex', gap: '10px', alignItems: 'center', padding: '6px 0', borderBottom: '1px solid rgba(255,255,255,0.04)', fontSize: '0.82rem', color: '#aaa' }}>
                    <span style={{ background: tc.bg, color: tc.color, width: '20px', height: '20px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.65rem', fontWeight: 800, flexShrink: 0 }}>{s.num}</span>
                    {s.text}
                  </div>
                ))}
              </div>

              <div className="pb-features-list">
                <h4 style={{ color: '#fff', marginBottom: '1rem', fontSize: '0.82rem', textTransform: 'uppercase', letterSpacing: '1px' }}>What's in the ZIP</h4>
                {features.map((f, i) => (
                  <div key={i} className="pb-feature-item">
                    <i className="fa-solid fa-check" style={{ color: tc.color }} /><span>{f}</span>
                  </div>
                ))}
              </div>

              <div className="pb-download-group">
                <button className="pb-dl-primary" style={{ background: tc.color, color: '#000', boxShadow: `0 8px 30px rgba(${tc.rgb},0.4)` }} onClick={handleDownload}>
                  <i className="fa-solid fa-file-zipper" /> Download React Project (.zip)
                </button>
                <button className="pb-dl-secondary" onClick={() => setView('configure')}>
                  <i className="fa-solid fa-palette" /> Customize Further
                </button>
              </div>

              <div className="pb-deploy-info">
                <div className="pb-deploy-label"><i className="fa-solid fa-rocket" style={{ color: tc.color }} /> Deploy in seconds with:</div>
                <div className="pb-deploy-platforms">
                  <div className="pb-platform"><i className="fa-brands fa-github" /><span>GitHub Pages</span></div>
                  <div className="pb-platform"><i className="fa-solid fa-cloud" /><span>Netlify</span></div>
                  <div className="pb-platform"><i className="fa-solid fa-bolt" style={{ color: tc.color }} /><span>Vercel</span></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {downloadModal.show && (
          <div className="download-modal">
            <div className="modal-content glass-card">
              <i className="fa-solid fa-circle-down download-spinner" style={{ color: tc.color }} />
              <h3>Packaging React Project...</h3>
              <p>Generating all source files, styles, and components — zipping everything up!</p>
            </div>
          </div>
        )}
      </div>
    );
  }

  return null;
}

import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './CoverLetterCustomizer.css';

export default function CoverLetterCustomizer() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('customize'); // 'ai', 'templates', 'customize'
  const [sidebarOpen, setSidebarOpen] = useState(true);

  // Design Settings
  const [margins, setMargins] = useState(5);
  const [spacing, setSpacing] = useState(3);
  const [accentColor, setAccentColor] = useState('#D4C77A');
  const [fontStyle, setFontStyle] = useState('Satoshi');
  const [fontSize, setFontSize] = useState('M'); // XS, S, M, L, XL
  const [lineHeight, setLineHeight] = useState(1.4);
  const [bgPattern, setBgPattern] = useState('pat-blank');
  const [documentSize, setDocumentSize] = useState('a4');
  const [selectedTemplate, setSelectedTemplate] = useState('modern');

  // Custom Color Picker box state
  const [showPicker, setShowPicker] = useState(false);
  const [pickerTab, setPickerTab] = useState('primary');
  const [hue, setHue] = useState(48);
  const [rgbVal, setRgbVal] = useState({ r: 238, g: 195, b: 12 });

  // Photo state
  const [showPhoto, setShowPhoto] = useState(false);
  const [photoImg, setPhotoImg] = useState('');
  const [photoGray, setPhotoGray] = useState(false);
  const [photoStyle, setPhotoStyle] = useState('round'); // round, square
  const [showPhotoUploadModal, setShowPhotoUploadModal] = useState(false);
  const fileInputRef = useRef(null);

  // Header Field Toggles
  const [fields, setFields] = useState({
    title: true,
    phone: true,
    link: true,
    extralink: false,
    email: true,
    location: true,
    uppercase: false,
    extrafield: false,
    dob: false,
    nationality: false
  });

  // Header field values
  const [fullName, setFullName] = useState('YOUR NAME');
  const [professionalTitle, setProfessionalTitle] = useState('Senior Software Engineer');
  const [phoneVal, setPhoneVal] = useState('Phone');
  const [emailVal, setEmailVal] = useState('Email');
  const [linkedinVal, setLinkedinVal] = useState('LinkedIn/Portfolio');
  const [locationVal, setLocationVal] = useState('Location');
  const [dobVal, setDobVal] = useState('Date of Birth');
  const [nationalityVal, setNationalityVal] = useState('Nationality');
  const [extralinkVal, setExtralinkVal] = useState('Extra Link');
  const [extrafieldVal, setExtrafieldVal] = useState('Extra Field');

  // Text formatting
  const [textAlignment, setTextAlignment] = useState('left');
  const [detailsLayout, setDetailsLayout] = useState('stacked'); // stacked, columns
  const [detailsSeparator, setDetailsSeparator] = useState('icon'); // icon, bullet, bar
  const [iconStyle, setIconStyle] = useState(1);
  const [nameSize, setNameSize] = useState('L'); // XS, S, M, L, XL
  const [nameBold, setNameBold] = useState(true);
  const [nameFont, setNameFont] = useState('body'); // body, creative
  const [titleSize, setTitleSize] = useState('M'); // S, M, L
  const [titlePosition, setTitlePosition] = useState('below'); // sameline, below
  const [titleStyle, setTitleStyle] = useState('normal'); // normal, italic

  // Popups
  const [showHeaderPopup, setShowHeaderPopup] = useState(false);
  const [showTextEditPopup, setShowTextEditPopup] = useState(false);

  // Download actions
  const [showDownloadDropdown, setShowDownloadDropdown] = useState(false);

  // List of content blocks
  const [blocks, setBlocks] = useState([
    { id: 'b1', type: 'text', title: 'May 30, 2026', content: 'May 30, 2026' },
    { id: 'b2', type: 'recipient', recipientName: 'Hiring Team', company: 'Target Company Name', address: 'Company Address Line' },
    { id: 'b3', type: 'text', title: 'Greeting', content: 'Dear Hiring Manager,' },
    { 
      id: 'b4', 
      type: 'body', 
      content: "I am writing to express my strong interest in the open position at your company. With my background in building scalability tools and collaborating with engineering teams, I am confident in my ability to drive valuable solutions.\n\nOver the course of my career, I have focused on modern development practices and performance. Applying these core frameworks to your targets will directly support your platform roadmap.\n\nThank you for your time. I look forward to speaking soon." 
    },
    { id: 'b5', type: 'signature', signText: 'Sincerely,', nameText: 'YOUR NAME' }
  ]);

  const handleBlockChange = (id, field, value) => {
    setBlocks(blocks.map(b => b.id === id ? { ...b, [field]: value } : b));
  };

  const moveBlockUp = (index) => {
    if (index > 0) {
      const updated = [...blocks];
      const temp = updated[index];
      updated[index] = updated[index - 1];
      updated[index - 1] = temp;
      setBlocks(updated);
    }
  };

  const moveBlockDown = (index) => {
    if (index < blocks.length - 1) {
      const updated = [...blocks];
      const temp = updated[index];
      updated[index] = updated[index + 1];
      updated[index + 1] = temp;
      setBlocks(updated);
    }
  };

  const handlePhotoUploadClick = () => {
    setShowPhotoUploadModal(true);
  };

  const handlePhotoInputChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (uploadEvent) => {
        setPhotoImg(uploadEvent.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const savePhotoModal = () => {
    setShowPhoto(true);
    setShowPhotoUploadModal(false);
  };

  const deletePhoto = () => {
    setPhotoImg('');
    setShowPhoto(false);
  };

  const resetDesign = () => {
    setMargins(5);
    setSpacing(3);
    setAccentColor('#D4C77A');
    setFontStyle('Satoshi');
    setFontSize('M');
    setLineHeight(1.4);
    setBgPattern('pat-blank');
    setSelectedTemplate('modern');
    setTextAlignment('left');
    setDetailsLayout('stacked');
  };

  const downloadPDF = () => {
    alert('Compiling Cover Letter PDF...');
    const element = document.createElement("a");
    const file = new Blob([getPlainLetterText()], {type: 'text/plain'});
    element.href = URL.createObjectURL(file);
    element.download = `${fullName.replace(/\s+/g, '_')}_Customized_Cover_Letter.pdf`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const downloadDOC = () => {
    alert('Compiling Cover Letter Word Document...');
    const element = document.createElement("a");
    const file = new Blob([getPlainLetterText()], {type: 'application/msword'});
    element.href = URL.createObjectURL(file);
    element.download = `${fullName.replace(/\s+/g, '_')}_Customized_Cover_Letter.doc`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const getPlainLetterText = () => {
    let letterContent = '';
    blocks.forEach(b => {
      if (b.type === 'text') letterContent += `${b.content}\n\n`;
      else if (b.type === 'recipient') letterContent += `${b.recipientName}\n${b.company}\n${b.address}\n\n`;
      else if (b.type === 'body') letterContent += `${b.content}\n\n`;
      else if (b.type === 'signature') letterContent += `${b.signText}\n\n${b.nameText}`;
    });
    return `${fullName}\n${professionalTitle}\n${phoneVal} | ${emailVal}\n\n${letterContent}`;
  };

  const handleAIEngine = () => {
    alert('AI is optimizing the body copy...');
    const updatedBlocks = blocks.map(b => {
      if (b.type === 'body') {
        return {
          ...b,
          content: "I am writing to express my strong interest in the open Senior Developer position. With over 6 years of expertise building scalable React applications and leading cross-functional teams, I am confident in my ability to contribute to your engineering goals.\n\nMy background in TypeScript, performance optimization, and AWS aligns directly with your platform roadmap. I am particularly excited about your focus on modern developer tooling and would love to bring my drive for clean infrastructure to your organization.\n\nThank you for considering my application. I look forward to discussing the role details in an interview."
        };
      }
      return b;
    });
    setBlocks(updatedBlocks);
  };

  return (
    <main className="clc-page">
      {/* Editor Header */}
      <header className="editor-header">
        <div className="header-left">
          <a href="/" className="logo-link" onClick={(e) => { e.preventDefault(); navigate('/'); }}>
            <i className="fa-solid fa-bee"></i>
            <span>MockB CV</span>
          </a>
          <button className="btn-back" style={{ background: 'none', border: 'none', cursor: 'pointer' }} onClick={() => navigate('/')}>
            <i className="fa-solid fa-chevron-left"></i> Home
          </button>
        </div>

        <div className="toolbar-tabs">
          <button className={`tab-btn ${activeTab === 'ai' ? 'active' : ''}`} onClick={() => { setActiveTab('ai'); setSidebarOpen(true); }}>
            <i className="fa-solid fa-wand-magic-sparkles"></i> Improve text
          </button>
          <button className={`tab-btn ${activeTab === 'templates' ? 'active' : ''}`} onClick={() => { setActiveTab('templates'); setSidebarOpen(true); }}>
            <i className="fa-solid fa-layer-group"></i> Templates
          </button>
          <button className={`tab-btn ${activeTab === 'customize' ? 'active' : ''}`} onClick={() => { setActiveTab('customize'); setSidebarOpen(true); }}>
            <i className="fa-solid fa-sliders"></i> Design & Font
          </button>
        </div>

        <div className="header-right"></div>
      </header>

      {/* Editor workspace split */}
      <div className="workspace">
        {/* Left Sidebar controls */}
        {sidebarOpen && (
          <aside className="sidebar">
            <div className="sidebar-header">
              <h3>{activeTab === 'customize' ? 'Design & Font' : activeTab === 'templates' ? 'Templates' : 'Improve Text'}</h3>
              <button className="btn-close-sidebar" onClick={() => setSidebarOpen(false)}>
                <i className="fa-solid fa-xmark"></i>
              </button>
            </div>

            <div className="sidebar-content">
              {activeTab === 'customize' && (
                <div className="panel-tab active">
                  {/* Page Margins */}
                  <div className="control-group">
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.4rem' }}>
                      <span className="control-label">Page Margins</span>
                      <span className="slider-val">{margins}</span>
                    </div>
                    <div className="slider-row">
                      <input type="range" min="1" max="10" value={margins} className="slider-input" onChange={(e) => setMargins(parseInt(e.target.value))} />
                      <button onClick={() => setMargins(Math.max(1, margins - 1))} className="btn-step"><i className="fa-solid fa-minus"></i></button>
                      <button onClick={() => setMargins(Math.min(10, margins + 1))} className="btn-step"><i className="fa-solid fa-plus"></i></button>
                    </div>
                  </div>

                  {/* Section Spacing */}
                  <div className="control-group">
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.4rem' }}>
                      <span className="control-label">Section Spacing</span>
                      <span className="slider-val">{spacing}</span>
                    </div>
                    <div className="slider-row">
                      <input type="range" min="1" max="8" value={spacing} className="slider-input" onChange={(e) => setSpacing(parseInt(e.target.value))} />
                      <button onClick={() => setSpacing(Math.max(1, spacing - 1))} className="btn-step"><i className="fa-solid fa-minus"></i></button>
                      <button onClick={() => setSpacing(Math.min(8, spacing + 1))} className="btn-step"><i className="fa-solid fa-plus"></i></button>
                    </div>
                  </div>

                  {/* Preset Colors */}
                  <div className="control-group">
                    <span className="control-label">Colors</span>
                    <div className="color-grid">
                      {['#D4C77A', '#4A4A4A', '#2E7D32', '#D84315', '#1565C0', '#283593', '#FF5722', '#6A1B9A', '#00838F', '#6D4C41'].map(c => (
                        <div 
                          key={c} 
                          className={`color-option ${accentColor === c ? 'active' : ''}`} 
                          style={{ background: c }}
                          onClick={() => setAccentColor(c)}
                        />
                      ))}
                    </div>
                    <button className="color-custom-link" onClick={() => setShowPicker(!showPicker)}>
                      {showPicker ? 'Close custom picker' : 'Use custom color'}
                    </button>

                    {showPicker && (
                      <div className="custom-picker-box">
                        <div className="picker-header">
                          <span className="picker-header-title">Color Picker</span>
                          <button className="picker-header-close" onClick={() => setShowPicker(false)}><i className="fa-solid fa-xmark"></i></button>
                        </div>
                        <div className="picker-tabs">
                          <button className={`picker-tab ${pickerTab === 'primary' ? 'active' : ''}`} onClick={() => setPickerTab('primary')}>Primary</button>
                          <button className={`picker-tab ${pickerTab === 'secondary' ? 'active' : ''}`} onClick={() => setPickerTab('secondary')}>Secondary</button>
                        </div>
                        <div className="picker-body">
                          <div 
                            className="spectrum-area" 
                            style={{ '--base-hue': `hsl(${hue}, 100%, 50%)` }}
                            onClick={(e) => {
                              const rect = e.currentTarget.getBoundingClientRect();
                              const s = (e.clientX - rect.left) / rect.width;
                              const v = 1 - (e.clientY - rect.top) / rect.height;
                              // Approximate conversion back to hex or simple selection
                              setAccentColor(`hsl(${hue}, ${Math.round(s*100)}%, ${Math.round(v*50)}%)`);
                            }}
                          >
                            <div className="spectrum-cursor" style={{ left: '80%', top: '20%' }}></div>
                          </div>
                          <div className="hue-slider-wrap">
                            <input type="range" className="hue-slider" min="0" max="360" value={hue} onChange={(e) => setHue(parseInt(e.target.value))} />
                          </div>
                          <div className="picker-inputs-row">
                            <select className="input-select" defaultValue="hex">
                              <option value="hex">HEX</option>
                              <option value="rgb">RGB</option>
                            </select>
                            <input 
                              type="text" 
                              className="picker-val-field" 
                              value={accentColor} 
                              onChange={(e) => setAccentColor(e.target.value)} 
                            />
                          </div>
                          <button className="btn-save-color" onClick={() => setShowPicker(false)}>Apply Color</button>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Font Style */}
                  <div className="control-group">
                    <span className="control-label">Font Style</span>
                    <select className="font-select" value={fontStyle} onChange={(e) => setFontStyle(e.target.value)}>
                      <option value="Satoshi">Satoshi</option>
                      <option value="Inter">Inter</option>
                      <option value="Rubik">Rubik</option>
                      <option value="Lato">Lato</option>
                      <option value="Raleway">Raleway</option>
                      <option value="Montserrat">Montserrat</option>
                      <option value="Playfair Display">Playfair Display</option>
                    </select>
                  </div>

                  {/* Font Size */}
                  <div className="control-group">
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.4rem' }}>
                      <span className="control-label">Font Size</span>
                      <span className="slider-val">{fontSize}</span>
                    </div>
                    <div className="slider-row">
                      <input 
                        type="range" 
                        min="1" 
                        max="5" 
                        value={['XS', 'S', 'M', 'L', 'XL'].indexOf(fontSize) + 1} 
                        className="slider-input" 
                        onChange={(e) => setFontSize(['XS', 'S', 'M', 'L', 'XL'][parseInt(e.target.value) - 1])} 
                      />
                    </div>
                  </div>

                  {/* Line Height */}
                  <div className="control-group">
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.4rem' }}>
                      <span className="control-label">Line Height</span>
                      <span className="slider-val">{lineHeight}</span>
                    </div>
                    <div className="slider-row">
                      <input type="range" min="10" max="20" value={lineHeight * 10} className="slider-input" onChange={(e) => setLineHeight(parseInt(e.target.value) / 10)} />
                    </div>
                  </div>

                  {/* Backgrounds */}
                  <div className="control-group">
                    <span className="control-label">Backgrounds</span>
                    <div className="bg-grid">
                      {['pat-blank', 'pat-dots', 'pat-grid', 'pat-hexagons', 'pat-lines', 'pat-waves', 'pat-stripes', 'pat-diagonal'].map(pat => (
                        <div 
                          key={pat} 
                          className={`bg-option ${bgPattern === pat ? 'active' : ''}`}
                          onClick={() => setBgPattern(pat)}
                        >
                          <div className={`bg-pattern-thumb ${pat}`}></div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <button className="btn-sidebar-footer" onClick={resetDesign}>
                    <i className="fa-solid fa-arrow-rotate-left"></i> Reset settings
                  </button>
                </div>
              )}

              {activeTab === 'templates' && (
                <div className="panel-tab active">
                  <p style={{ color: '#888', fontSize: '0.84rem', marginBottom: '1rem' }}>Select a cover letter template style:</p>
                  
                  <div className="templates-list">
                    {[
                      { id: 'modern', label: 'Modern Style', bg: '#D4C77A' },
                      { id: 'traditional', label: 'Traditional Serif', bg: '#1b2a47' },
                      { id: 'creative', label: 'Creative Accent', bg: '#e91e63' },
                      { id: 'minimalist', label: 'Minimalist', bg: '#111111' }
                    ].map(tmpl => (
                      <div 
                        key={tmpl.id}
                        className={`template-card ${selectedTemplate === tmpl.id ? 'active' : ''}`}
                        onClick={() => setSelectedTemplate(tmpl.id)}
                      >
                        <div className="template-card-preview">
                          <div style={{ background: '#fff', width: '100%', height: '100%', padding: '8px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                            <div style={{ height: '12px', background: tmpl.bg }}></div>
                            <div style={{ height: '6px', width: '40%', background: '#eee' }}></div>
                            <div style={{ height: '4px', width: '100%', background: '#f5f5f5' }}></div>
                          </div>
                        </div>
                        <h4>{tmpl.label}</h4>
                      </div>
                    ))}
                  </div>

                  <div className="control-group" style={{ marginTop: '1.5rem' }}>
                    <span className="control-label">Document Size</span>
                    <div className="size-switcher">
                      <button className={`size-btn ${documentSize === 'a4' ? 'active' : ''}`} onClick={() => setDocumentSize('a4')}>A4</button>
                      <button className={`size-btn ${documentSize === 'letter' ? 'active' : ''}`} onClick={() => setDocumentSize('letter')}>US Letter</button>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'ai' && (
                <div className="panel-tab active">
                  <div className="ai-box">
                    <span className="control-label">Optimize text with AI</span>
                    <textarea className="ai-input" placeholder="Improve tone, enhance narrative structure..." />
                    <button className="btn-ai-generate" onClick={handleAIEngine}>
                      <i className="fa-solid fa-wand-magic-sparkles"></i> Improve Letter
                    </button>
                  </div>

                  <div className="control-group" style={{ borderTop: '1px solid #222', paddingTop: '1.5rem' }}>
                    <span className="control-label">Photo Settings</span>
                    <div style={{ marginBottom: '1rem' }}>
                      <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', marginBottom: '0.6rem' }}>
                        <input type="checkbox" checked={showPhoto} onChange={(e) => setShowPhoto(e.target.checked)} style={{ width: '16px', height: '16px', accentColor: 'var(--primary-color)' }} />
                        <span style={{ fontSize: '0.85rem', color: '#ccc' }}>Show Profile Picture</span>
                      </label>
                      <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', marginBottom: '0.6rem' }}>
                        <input type="checkbox" checked={photoGray} onChange={(e) => setPhotoGray(e.target.checked)} style={{ width: '16px', height: '16px', accentColor: 'var(--primary-color)' }} />
                        <span style={{ fontSize: '0.85rem', color: '#ccc' }}>Grayscale Filter</span>
                      </label>
                      {showPhoto && (
                        <button onClick={deletePhoto} className="btn-step" style={{ width: '100%', padding: '0.5rem', color: '#ff4444', background: 'rgba(255,68,68,0.05)', border: '1px solid rgba(255, 68, 68, 0.2)' }}>
                          <i className="fa-solid fa-trash"></i> Delete Photo
                        </button>
                      )}
                    </div>

                    {!showPhoto && (
                      <button onClick={handlePhotoUploadClick} className="btn-sidebar-footer" style={{ background: 'rgba(212, 199, 122,0.1)', border: '1px solid var(--primary-color)', color: 'var(--primary-color)' }}>
                        <i className="fa-solid fa-camera"></i> Upload Profile Picture
                      </button>
                    )}
                  </div>
                </div>
              )}
            </div>
          </aside>
        )}

        {/* Right Preview Workspace */}
        <main className="preview-panel">
          {/* Floating actions */}
          <div className="floating-actions">
            {/* Download with dropdown options */}
            <div className="floating-btn-container">
              <button className="btn-floating" onClick={() => setShowDownloadDropdown(!showDownloadDropdown)}>
                <i className="fa-solid fa-download"></i>
              </button>
              {showDownloadDropdown && (
                <div className="download-dropdown">
                  <button className="download-dropdown-item" onClick={downloadPDF}>
                    <i className="fa-solid fa-file-pdf"></i> Download PDF
                  </button>
                  <button className="download-dropdown-item" onClick={downloadDOC}>
                    <i className="fa-solid fa-file-word"></i> Download Word (DOC)
                  </button>
                </div>
              )}
            </div>
            
            <button className="btn-floating" onClick={() => setSidebarOpen(!sidebarOpen)}>
              <i className="fa-solid fa-sliders"></i>
            </button>
          </div>

          {/* Cover Letter Document Sheet */}
          <div 
            className={`cover-letter-sheet ${selectedTemplate} ${bgPattern}`}
            style={{ 
              padding: `${margins * 10}px`,
              lineHeight: lineHeight,
              fontFamily: fontStyle,
              fontSize: fontSize === 'XS' ? '0.78rem' : fontSize === 'S' ? '0.84rem' : fontSize === 'M' ? '0.9rem' : fontSize === 'L' ? '0.96rem' : '1.05rem'
            }}
          >
            {/* Header controls popup trigger */}
            <div className="sheet-header-wrapper">
              <div className="header-controls-tab">
                <button className="header-ctrl-btn" onClick={handlePhotoUploadClick} title="Change Photo"><i className="fa-solid fa-camera"></i></button>
                <button className="header-ctrl-btn" onClick={() => setShowTextEditPopup(!showTextEditPopup)} title="Edit Text Styles"><i className="fa-solid fa-font"></i></button>
                <button className="header-ctrl-btn" onClick={() => setShowHeaderPopup(!showHeaderPopup)} title="Settings"><i className="fa-solid fa-gear"></i></button>
              </div>

              {/* Header Info Panel */}
              <div className="sheet-header" style={{ borderBottomColor: accentColor }}>
                <div className="sheet-header-left" style={{ textAlign: textAlignment }}>
                  <div 
                    className="editable-field sheet-fullname" 
                    contentEditable 
                    suppressContentEditableWarning
                    onBlur={(e) => setFullName(e.currentTarget.innerText)}
                    style={{ 
                      fontSize: nameSize === 'XS' ? '1.2rem' : nameSize === 'S' ? '1.4rem' : nameSize === 'M' ? '1.6rem' : nameSize === 'L' ? '1.8rem' : '2.1rem',
                      fontWeight: nameBold ? 900 : 400,
                      textTransform: fields.uppercase ? 'uppercase' : 'none'
                    }}
                  >
                    {fullName}
                  </div>
                  
                  {fields.title && (
                    <div 
                      className="editable-field sheet-role" 
                      contentEditable 
                      suppressContentEditableWarning
                      onBlur={(e) => setProfessionalTitle(e.currentTarget.innerText)}
                      style={{ 
                        fontSize: titleSize === 'S' ? '0.95rem' : titleSize === 'M' ? '1.1rem' : '1.25rem',
                        fontStyle: titleStyle === 'italic' ? 'italic' : 'normal',
                        marginTop: titlePosition === 'sameline' ? '0' : '5px'
                      }}
                    >
                      {professionalTitle}
                    </div>
                  )}
                </div>

                <div className="sheet-header-right" style={{ display: detailsLayout === 'columns' ? 'flex' : 'block', flexDirection: 'row', gap: '15px' }}>
                  {showPhoto && photoImg && (
                    <div 
                      className="sheet-photo-wrapper" 
                      style={{ 
                        display: 'block', 
                        borderRadius: photoStyle === 'round' ? '50%' : '8px',
                        filter: photoGray ? 'grayscale(1)' : 'none'
                      }}
                    >
                      <img src={photoImg} alt="Profile" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    </div>
                  )}
                  
                  {fields.phone && (
                    <div className="sheet-contact-item">
                      {detailsSeparator === 'icon' && <i className="fa-solid fa-phone" style={{ color: accentColor }}></i>}
                      <span className="editable-field" contentEditable suppressContentEditableWarning onBlur={(e) => setPhoneVal(e.currentTarget.innerText)}>{phoneVal}</span>
                    </div>
                  )}

                  {fields.email && (
                    <div className="sheet-contact-item">
                      {detailsSeparator === 'icon' && <i className="fa-solid fa-envelope" style={{ color: accentColor }}></i>}
                      <span className="editable-field" contentEditable suppressContentEditableWarning onBlur={(e) => setEmailVal(e.currentTarget.innerText)}>{emailVal}</span>
                    </div>
                  )}

                  {fields.link && (
                    <div className="sheet-contact-item">
                      {detailsSeparator === 'icon' && <i className="fa-brands fa-linkedin-in" style={{ color: accentColor }}></i>}
                      <span className="editable-field" contentEditable suppressContentEditableWarning onBlur={(e) => setLinkedinVal(e.currentTarget.innerText)}>{linkedinVal}</span>
                    </div>
                  )}

                  {fields.location && (
                    <div className="sheet-contact-item">
                      {detailsSeparator === 'icon' && <i className="fa-solid fa-location-dot" style={{ color: accentColor }}></i>}
                      <span className="editable-field" contentEditable suppressContentEditableWarning onBlur={(e) => setLocationVal(e.currentTarget.innerText)}>{locationVal}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Text formatting options Popup */}
              {showTextEditPopup && (
                <div className="header-options-popup text-edit-popup active" style={{ top: '60px' }}>
                  <div className="text-edit-section">
                    <div className="text-edit-title">Text alignment</div>
                    <div className="text-edit-btn-group">
                      <button className={`text-edit-btn ${textAlignment === 'left' ? 'active' : ''}`} onClick={() => setTextAlignment('left')}>Left</button>
                      <button className={`text-edit-btn ${textAlignment === 'center' ? 'active' : ''}`} onClick={() => setTextAlignment('center')}>Center</button>
                    </div>
                  </div>
                  <div className="text-edit-section">
                    <div className="text-edit-title">Details Arrangement</div>
                    <div className="text-edit-btn-group">
                      <button className={`text-edit-btn ${detailsLayout === 'stacked' ? 'active' : ''}`} onClick={() => setDetailsLayout('stacked')}>Stacked</button>
                      <button className={`text-edit-btn ${detailsLayout === 'columns' ? 'active' : ''}`} onClick={() => setDetailsLayout('columns')}>Columns</button>
                    </div>
                  </div>
                  <div className="text-edit-section">
                    <div className="text-edit-title">Name Size</div>
                    <div className="text-edit-btn-group">
                      {['XS', 'S', 'M', 'L', 'XL'].map(sz => (
                        <button key={sz} className={`size-btn ${nameSize === sz ? 'active' : ''}`} onClick={() => setNameSize(sz)}>{sz}</button>
                      ))}
                    </div>
                  </div>
                  <button className="btn-save-color" style={{ marginTop: '10px' }} onClick={() => setShowTextEditPopup(false)}>Save Styles</button>
                </div>
              )}

              {/* Field toggles Popup */}
              {showHeaderPopup && (
                <div className="header-options-popup active" style={{ top: '60px', left: '100px' }}>
                  {Object.keys(fields).map(fld => (
                    <div key={fld} className="header-opt-row">
                      <span className="header-opt-label" style={{ textTransform: 'capitalize' }}>{fld}</span>
                      <label className="toggle-switch">
                        <input type="checkbox" checked={fields[fld]} onChange={(e) => setFields({ ...fields, [fld]: e.target.checked })} />
                        <span className="toggle-slider"></span>
                      </label>
                    </div>
                  ))}
                  <button className="btn-save-color" style={{ marginTop: '10px' }} onClick={() => setShowHeaderPopup(false)}>Close settings</button>
                </div>
              )}
            </div>

            {/* Document Blocks List */}
            <div className="sheet-blocks-container">
              {blocks.map((block, index) => (
                <div key={block.id} className="content-block">
                  <div className="block-display">
                    {block.type === 'text' && (
                      <div 
                        className="editable-field block-title-display" 
                        contentEditable 
                        suppressContentEditableWarning
                        onBlur={(e) => handleBlockChange(block.id, 'content', e.currentTarget.innerText)}
                      >
                        {block.content}
                      </div>
                    )}
                    
                    {block.type === 'recipient' && (
                      <div className="block-recipient-fields">
                        <div 
                          className="editable-field block-title-display" 
                          contentEditable 
                          suppressContentEditableWarning
                          onBlur={(e) => handleBlockChange(block.id, 'recipientName', e.currentTarget.innerText)}
                        >
                          {block.recipientName}
                        </div>
                        <div 
                          className="editable-field block-subtitle-display" 
                          contentEditable 
                          suppressContentEditableWarning
                          onBlur={(e) => handleBlockChange(block.id, 'company', e.currentTarget.innerText)}
                        >
                          {block.company}
                        </div>
                        <div 
                          className="editable-field block-meta-display" 
                          contentEditable 
                          suppressContentEditableWarning
                          onBlur={(e) => handleBlockChange(block.id, 'address', e.currentTarget.innerText)}
                        >
                          {block.address}
                        </div>
                      </div>
                    )}

                    {block.type === 'body' && (
                      <textarea
                        value={block.content}
                        onChange={(e) => handleBlockChange(block.id, 'content', e.target.value)}
                        style={{ 
                          width: '100%', 
                          border: 'none', 
                          resize: 'vertical', 
                          background: 'transparent', 
                          outline: 'none', 
                          fontFamily: 'inherit',
                          fontSize: 'inherit',
                          lineHeight: 'inherit',
                          color: '#333333'
                        }}
                        rows={8}
                      />
                    )}

                    {block.type === 'signature' && (
                      <div className="block-signature-fields">
                        <div 
                          className="editable-field" 
                          contentEditable 
                          suppressContentEditableWarning
                          onBlur={(e) => handleBlockChange(block.id, 'signText', e.currentTarget.innerText)}
                        >
                          {block.signText}
                        </div>
                        <br/>
                        <div 
                          className="editable-field" 
                          style={{ fontWeight: 'bold' }} 
                          contentEditable 
                          suppressContentEditableWarning
                          onBlur={(e) => handleBlockChange(block.id, 'nameText', e.currentTarget.innerText)}
                        >
                          {block.nameText}
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="block-nav-buttons">
                    <button className="block-nav-btn" onClick={() => moveBlockUp(index)} title="Move Up"><i className="fa-solid fa-chevron-up"></i></button>
                    <button className="block-nav-btn" onClick={() => moveBlockDown(index)} title="Move Down"><i className="fa-solid fa-chevron-down"></i></button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>

      {/* Photo Upload Popup Modal */}
      {showPhotoUploadModal && (
        <div className="photo-upload-modal" style={{ display: 'flex' }}>
          <div className="photo-upload-modal-box">
            <button className="photo-modal-close" onClick={() => setShowPhotoUploadModal(false)}><i className="fa-solid fa-xmark"></i></button>
            <h3 className="photo-modal-title">Upload photo</h3>
            <div className="photo-modal-preview" onClick={() => fileInputRef.current?.click()} style={{ cursor: 'pointer' }}>
              {photoImg ? (
                <img src={photoImg} alt="Preview" style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '50%' }} />
              ) : (
                <i className="fa-solid fa-user photo-modal-placeholder-icon"></i>
              )}
            </div>
            <p className="photo-modal-hint">Click on the icon to browse.</p>
            <div className="photo-modal-actions">
              <button className="photo-modal-btn photo-modal-btn-upload" onClick={() => fileInputRef.current?.click()}>Browse</button>
              <button className="photo-modal-btn photo-modal-btn-save" onClick={savePhotoModal}>Apply</button>
            </div>
            <input ref={fileInputRef} type="file" onChange={handlePhotoInputChange} accept="image/*" style={{ display: 'none' }} />
          </div>
        </div>
      )}
    </main>
  );
}

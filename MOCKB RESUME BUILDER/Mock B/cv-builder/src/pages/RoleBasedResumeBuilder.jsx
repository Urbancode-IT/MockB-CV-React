import React, { useState } from 'react';
import './RoleBasedResumeBuilder.css';

// Sub-components
import RBHeroSlider from '../components/resume builder/role based resume building/hero/RBHeroSlider';
import RBWhySection from '../components/resume builder/role based resume building/why-section/RBWhySection';
import RBRolesGrid from '../components/resume builder/role based resume building/roles-grid/RBRolesGrid';
import RBRolesList from '../components/resume builder/role based resume building/roles-list/RBRolesList';
import RBTemplatesGallery from '../components/resume builder/role based resume building/templates-gallery/RBTemplatesGallery';
import RBFeaturesSection from '../components/resume builder/role based resume building/features-section/RBFeaturesSection';
import RBGeneratorWizard from '../components/resume builder/role based resume building/generator/RBGeneratorWizard';
import RBResumePreview from '../components/resume builder/role based resume building/preview/RBResumePreview';

export default function RoleBasedResumeBuilder() {
  const [view, setView] = useState('landing'); // 'landing' | 'roles-list' | 'generate' | 'preview'
  const [selectedCatId, setSelectedCatId] = useState('fullstack');
  const [targetRole, setTargetRole] = useState('Senior Frontend Developer');

  // Generator state
  const [generatorStep, setGeneratorStep] = useState(1);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    experienceLevel: 'mid',
    skills: '',
    bio: '',
    template: 'modern'
  });
  const [isGenerating, setIsGenerating] = useState(false);

  // Handle Category selection -> goes to roles list
  const handleSelectCategory = (catId) => {
    setSelectedCatId(catId);
    setView('roles-list');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Handle Sub-Role selection -> goes to generator wizard
  const handleSelectSubRole = (roleName) => {
    setTargetRole(roleName);

    // Auto-populate based on role
    let suggestedSkills = '';
    let suggestedBio = '';
    if (roleName.includes('React') || roleName.includes('Angular') || roleName.includes('Frontend')) {
      suggestedSkills = 'React, TypeScript, JavaScript (ES6+), HTML5, CSS3, Tailwind CSS, Jest, Git';
      suggestedBio = 'Highly motivated Frontend Developer with experience building responsive web applications. Passionate about crafting pixel-perfect interfaces and optimizing client-side performance.';
    } else if (roleName.includes('Python') || roleName.includes('Backend') || roleName.includes('Node')) {
      suggestedSkills = 'Node.js, Express.js, Python, Django, REST APIs, PostgreSQL, MongoDB, Docker';
      suggestedBio = 'Backend Software Engineer skilled in building scalable microservices, relational databases, and secure authentication pipelines. Committed to writing clean, maintainable server code.';
    } else if (roleName.includes('Tester') || roleName.includes('QA') || roleName.includes('SDET')) {
      suggestedSkills = 'Selenium, Playwright, Java, TypeScript, API Testing, JIRA, Test Cases, CI/CD';
      suggestedBio = 'Detail-oriented Quality Assurance Engineer experienced in UI and API automation, bug tracking, and writing extensive test cases to ensure zero-defect production releases.';
    } else {
      suggestedSkills = 'SQL, Git, Docker, System Design, Communication, Problem Solving';
      suggestedBio = 'Results-driven IT Specialist with deep expertise in systems administration and engineering. Adept at identifying technical bottlenecks and deploying automation scripts.';
    }

    setFormData(prev => ({ ...prev, skills: suggestedSkills, bio: suggestedBio }));
    setGeneratorStep(1);
    setView('generate');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Handle form field change
  const handleFormChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  // Wizard step next
  const handleNextStep = () => {
    if (generatorStep < 5) {
      setGeneratorStep(prev => prev + 1);
    } else {
      setIsGenerating(true);
      setTimeout(() => {
        setIsGenerating(false);
        setView('preview');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }, 3000);
    }
  };

  // Wizard step back
  const handlePrevStep = () => {
    if (generatorStep > 1) {
      setGeneratorStep(prev => prev - 1);
    }
  };

  // Download resume
  const handleDownloadResume = (type) => {
    alert(`Preparing your ${type.toUpperCase()} file for download...`);
    setTimeout(() => {
      const safeName = formData.fullName ? formData.fullName.replace(/\s+/g, '_') : 'Alex_Rivera';
      const roleSlug = targetRole.toLowerCase().replace(/\s+/g, '_');

      const content = `========================================================
MockB CV Premium Role-Based Resume Document
Generated on: ${new Date().toLocaleDateString()}
========================================================

Name: ${formData.fullName || 'Alex Rivera'}
Target Role: ${targetRole}
Contact: ${formData.email || 'alex.rivera@example.com'} | ${formData.phone || '+1 234 567 890'}
Experience: ${formData.experienceLevel === 'entry' ? 'Entry Level (0-2 years)' : (formData.experienceLevel === 'senior' ? 'Senior/Lead (7+ years)' : 'Mid-Senior (3-6 years)')}

--------------------------------------------------------
PROFESSIONAL SUMMARY
--------------------------------------------------------
${formData.bio || 'Dynamic and detail-oriented developer with extensive experience building scalable application components.'}

--------------------------------------------------------
TECHNICAL SKILLS
--------------------------------------------------------
${formData.skills || 'React, TypeScript, Redux, Node.js, Webpack, SASS, Docker, Jenkins, Git'}

--------------------------------------------------------
WORK MILESTONES (TAILORED FOR ${targetRole.toUpperCase()})
--------------------------------------------------------
- Senior Systems Analyst / Engineer | TechSolutions Inc. (2020 - Present)
  * Architected high-performance layout modules using clean server-rendering pipelines.
  * Reduced overall package build footprint by 35% through dynamic code-splitting.
  * Mentored junior developer nodes and established unified automated lint workflows.

--------------------------------------------------------
EDUCATION
--------------------------------------------------------
B.S. in Computer Science | University of Technology (2014 - 2018)`;

      const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
      const element = document.createElement('a');
      element.href = URL.createObjectURL(blob);
      element.download = `Resume_${safeName}_${roleSlug}.${type === 'pdf' ? 'pdf' : 'docx'}`;
      document.body.appendChild(element);
      element.click();
      document.body.removeChild(element);
    }, 1000);
  };

  // ─── LANDING VIEW ────────────────────────────────────────────────────────────
  if (view === 'landing') {
    return (
      <main className="rbrb-page">
        <RBHeroSlider />
        <RBWhySection />
        <RBRolesGrid onSelectCategory={handleSelectCategory} />
        <RBTemplatesGallery onUseTemplate={handleSelectSubRole} />
        <RBFeaturesSection />
      </main>
    );
  }

  // ─── ROLES LIST VIEW ─────────────────────────────────────────────────────────
  if (view === 'roles-list') {
    return (
      <main className="rbrb-page">
        <RBRolesList
          selectedCatId={selectedCatId}
          onBack={() => { setView('landing'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
          onSelectSubRole={handleSelectSubRole}
        />
      </main>
    );
  }

  // ─── GENERATOR WIZARD VIEW ───────────────────────────────────────────────────
  if (view === 'generate') {
    return (
      <RBGeneratorWizard
        targetRole={targetRole}
        generatorStep={generatorStep}
        formData={formData}
        isGenerating={isGenerating}
        onFormChange={handleFormChange}
        onNextStep={handleNextStep}
        onPrevStep={handlePrevStep}
        onExit={() => { setView('landing'); setGeneratorStep(1); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
      />
    );
  }

  // ─── PREVIEW VIEW ────────────────────────────────────────────────────────────
  if (view === 'preview') {
    return (
      <RBResumePreview
        formData={formData}
        targetRole={targetRole}
        onBackToDashboard={() => { setView('landing'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
        onDownload={handleDownloadResume}
      />
    );
  }

  return null;
}

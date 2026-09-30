/** Portfolio content JSON helpers — import/export like resume JSON. */

export function portfolioExportPayload(content = {}) {
  return {
    name: content.name || '',
    initials: content.initials || '',
    role: content.role || '',
    tagline: content.tagline || '',
    bio: content.bio || '',
    introQuote: content.introQuote || '',
    email: content.email || '',
    phone: content.phone || '',
    whatsapp: content.whatsapp || '',
    location: content.location || '',
    linkedin: content.linkedin || '',
    github: content.github || '',
    website: content.website || '',
    profileImage: content.profileImage || '',
    techStack: Array.isArray(content.techStack) ? content.techStack : [],
    skills: Array.isArray(content.skills) ? content.skills : [],
    stats: {
      years: content.stats?.years || '',
      projects: content.stats?.projects || '',
      clients: content.stats?.clients || '',
      satisfaction: content.stats?.satisfaction || '',
    },
    philosophy: {
      label: content.philosophy?.label || 'PORTFOLIO',
      title: content.philosophy?.title || '',
    },
    projects: (content.projects || []).map((p) => ({
      name: p.name || '',
      description: p.description || '',
      roleTag: p.roleTag || '',
      category: p.category || '',
      year: p.year || '',
      tech: Array.isArray(p.tech) ? p.tech : [],
      live: p.live || '',
      github: p.github || '',
      image: p.image || '',
    })),
    experience: (content.experience || []).map((e) => ({
      role: e.role || '',
      company: e.company || '',
      period: e.period || '',
      description: e.description || '',
    })),
    features: (content.features || []).map((f) => ({
      title: f.title || '',
      description: f.description || '',
    })),
  };
}

export function portfolioJsonString(content = {}, space = 2) {
  return JSON.stringify(portfolioExportPayload(content), null, space);
}

export function mergePortfolioImportJson(current = {}, incoming = {}) {
  if (!incoming || typeof incoming !== 'object' || Array.isArray(incoming)) {
    throw new Error('JSON must be an object');
  }
  const base = portfolioExportPayload(current);
  const next = { ...base };

  const scalars = [
    'name', 'initials', 'role', 'tagline', 'bio', 'introQuote', 'email', 'phone', 'whatsapp',
    'location', 'linkedin', 'github', 'website', 'profileImage',
  ];
  scalars.forEach((key) => {
    if (incoming[key] !== undefined) next[key] = incoming[key] ?? '';
  });

  if (incoming.techStack !== undefined) {
    next.techStack = Array.isArray(incoming.techStack)
      ? incoming.techStack
      : String(incoming.techStack || '').split(',').map((s) => s.trim()).filter(Boolean);
  }
  if (incoming.skills !== undefined) {
    next.skills = Array.isArray(incoming.skills)
      ? incoming.skills
      : String(incoming.skills || '').split(',').map((s) => s.trim()).filter(Boolean);
  }
  if (incoming.stats && typeof incoming.stats === 'object') {
    next.stats = { ...next.stats, ...incoming.stats };
  }
  if (incoming.philosophy && typeof incoming.philosophy === 'object') {
    next.philosophy = { ...next.philosophy, ...incoming.philosophy };
  }
  if (Array.isArray(incoming.projects)) next.projects = incoming.projects;
  if (Array.isArray(incoming.experience)) next.experience = incoming.experience;
  if (Array.isArray(incoming.features)) next.features = incoming.features;

  // Keep resume binary fields from current (not in JSON)
  return {
    ...current,
    ...next,
    resumeFileData: current.resumeFileData || '',
    resumeFileName: current.resumeFileName || '',
    headlineSegments: incoming.headlineSegments
      || (incoming.tagline ? [{ text: incoming.tagline, bold: false }] : current.headlineSegments),
  };
}

export function buildAiPortfolioJsonPrompt(content = {}) {
  const sample = portfolioJsonString(content, 2);
  return `Update this portfolio JSON for a personal site. Keep the same keys and structure. Return only valid JSON.\n\n${sample}`;
}

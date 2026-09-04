export function scrollToSection(root, sectionId) {
  if (!root) return;
  const el = root.querySelector(`#${sectionId}`);
  if (el) {
    el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}

export function formatWhatsAppNumber(input) {
  return String(input || '').replace(/\D/g, '');
}

export function openWhatsApp(number, message = '') {
  const digits = formatWhatsAppNumber(number);
  if (!digits) return false;
  const url = `https://wa.me/${digits}${message ? `?text=${encodeURIComponent(message)}` : ''}`;
  window.open(url, '_blank', 'noopener,noreferrer');
  return true;
}

export function openTalkChannel(data) {
  const message = `Hi${data.name ? ` ${data.name}` : ''}, I came across your portfolio and would like to connect.`;
  if (data.whatsapp && openWhatsApp(data.whatsapp, message)) return;
  if (data.phone && openWhatsApp(data.phone, message)) return;
  if (data.email) {
    window.location.href = `mailto:${data.email}?subject=Project%20inquiry`;
    return;
  }
}

export function downloadResumeFile(data) {
  if (data.resumeFileData) {
    const link = document.createElement('a');
    link.href = data.resumeFileData;
    link.download = data.resumeFileName || 'Resume.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    return;
  }

  if (data.resumeFile) {
    const link = document.createElement('a');
    link.href = data.resumeFile;
    link.download = data.resumeFileName || 'Resume.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    return;
  }

  const lines = [
    data.name,
    data.role,
    '',
    data.tagline,
    '',
    `Email: ${data.email}`,
    data.phone ? `Phone: ${data.phone}` : '',
    data.whatsapp ? `WhatsApp: ${data.whatsapp}` : '',
    data.location ? `Location: ${data.location}` : '',
    '',
    'Experience',
    ...(data.experience || []).map(
      (e) => `${e.role} — ${e.company} (${e.period})\n${e.description || ''}`,
    ),
    '',
    'Projects',
    ...(data.projects || []).map(
      (p) => `${p.name}\n${p.description}\nStack: ${(p.tech || []).join(', ')}`,
    ),
  ].filter(Boolean);

  const blob = new Blob([lines.join('\n')], { type: 'text/plain;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `${(data.name || 'resume').replace(/\s+/g, '_')}_Resume.txt`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

export function openExternal(url) {
  if (!url || url === '#') return;
  window.open(url, '_blank', 'noopener,noreferrer');
}

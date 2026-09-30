const PORTFOLIOS_KEY = 'mockb.pm.userPortfolios';
const TEMPLATES_KEY = 'mockb.pm.userPortfolioTemplates';

const readJson = (key, fallback) => {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
};

const clone = (value) => JSON.parse(JSON.stringify(value || {}));

export const listUserPortfolios = () => {
  const list = readJson(PORTFOLIOS_KEY, []);
  return Array.isArray(list) ? list : [];
};

export const portfolioDisplayName = (title, content, baseName) => {
  const typed = (title || '').trim();
  if (typed && typed.toLowerCase() !== 'untitled portfolio') return typed;
  const person = (content?.name || '').trim();
  if (person) return `${person} – Portfolio`;
  return `${baseName || 'Portfolio'} – Your portfolio`;
};

export const upsertUserPortfolio = ({
  id,
  title,
  selectedTemplate,
  content,
  design,
  baseName,
  userTemplateId,
  userTemplateName,
}) => {
  const list = listUserPortfolios();
  const existing = list.find((item) => id && item.id === id);
  const entry = {
    id: existing?.id || `pm-${Date.now()}`,
    name: portfolioDisplayName(title, content, baseName),
    title: title || 'Untitled Portfolio',
    selectedTemplate,
    userTemplateId: userTemplateId || existing?.userTemplateId || null,
    userTemplateName: userTemplateName || existing?.userTemplateName || '',
    content: clone(content),
    design: clone(design),
    createdAt: existing?.createdAt || new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  const next = existing
    ? list.map((item) => (item.id === existing.id ? entry : item))
    : [entry, ...list];
  localStorage.setItem(PORTFOLIOS_KEY, JSON.stringify(next));
  return entry;
};

export const deleteUserPortfolio = (id) => {
  const next = listUserPortfolios().filter((item) => item.id !== id);
  localStorage.setItem(PORTFOLIOS_KEY, JSON.stringify(next));
  return next;
};

export const getUserPortfolio = (id) =>
  listUserPortfolios().find((item) => item.id === id) || null;

export const listUserPortfolioTemplates = () => {
  const list = readJson(TEMPLATES_KEY, []);
  return Array.isArray(list) ? list : [];
};

export const saveUserPortfolioTemplate = ({ name, baseTemplate, design }) => {
  const list = listUserPortfolioTemplates();
  const trimmed = (name || '').trim() || 'My portfolio template';
  const existingIndex = list.findIndex(
    (item) => item.name.toLowerCase() === trimmed.toLowerCase()
      && item.baseTemplate === baseTemplate,
  );
  const entry = {
    id: existingIndex >= 0 ? list[existingIndex].id : `pmt-${Date.now()}`,
    name: trimmed,
    baseTemplate,
    design: clone(design),
    createdAt: existingIndex >= 0 ? list[existingIndex].createdAt : new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  const next = existingIndex >= 0
    ? list.map((item, index) => (index === existingIndex ? entry : item))
    : [entry, ...list];
  localStorage.setItem(TEMPLATES_KEY, JSON.stringify(next));
  return entry;
};

export const updateUserPortfolioTemplate = (id, patch) => {
  if (!id) return null;
  const list = listUserPortfolioTemplates();
  let updated = null;
  const next = list.map((item) => {
    if (item.id !== id) return item;
    updated = {
      ...item,
      ...patch,
      id: item.id,
      design: patch.design ? clone(patch.design) : item.design,
      updatedAt: new Date().toISOString(),
    };
    return updated;
  });
  if (!updated) return null;
  localStorage.setItem(TEMPLATES_KEY, JSON.stringify(next));
  return updated;
};

export const deleteUserPortfolioTemplate = (id) => {
  const next = listUserPortfolioTemplates().filter((item) => item.id !== id);
  localStorage.setItem(TEMPLATES_KEY, JSON.stringify(next));
  return next;
};

import { RESUME_JSON_CONTENT_KEYS, toResumeImportJson } from './resumeJson';

export const RESUME_FILE_ACCEPT = '.pdf,.docx,.txt,.png,.jpg,.jpeg,.webp,application/pdf,application/vnd.openxmlformats-officedocument.wordprocessingml.document,text/plain,image/png,image/jpeg,image/webp';

export const SECTION_LABELS = {
    personal: 'Contact details',
    summary: 'Summary',
    experience: 'Experience',
    education: 'Education',
    skills: 'Skills',
    projects: 'Projects',
    certifications: 'Certifications',
    languages: 'Languages',
    interests: 'Interests',
    courses: 'Courses',
    awards: 'Awards',
    organisations: 'Organisations',
    publications: 'Publications',
    references: 'References',
    declaration: 'Declaration',
    custom: 'Custom section',
    profileBullets: 'Profile highlights',
    competencies: 'Core competencies',
};

/* ───────────────────────── Text extraction ───────────────────────── */

const fileExt = (file) => (file?.name || '').toLowerCase().split('.').pop();

const hasEnoughText = (text) => Boolean(text) && text.replace(/\s/g, '').length >= 40;

/* OCR bullets often come back as "e", "«", "°", "©" etc. at the start of a line. */
const normalizeOcrText = (text) => text
    .split('\n')
    .map((line) => line
        .replace(/^\s*(?:[e«»°©®¢*+>•·]|[oO0](?=\s))\s+(?=[A-Z0-9])/, '• ')
        .replace(/[|]{2,}/g, '|')
        .trimEnd())
    .join('\n');

const createOcr = async (onProgress) => {
    let createWorker;
    try {
        const pkg = 'tesseract.js';
        const tesseract = await import(/* @vite-ignore */ pkg);
        createWorker = tesseract.createWorker;
    } catch (e) {
        throw new Error('OCR library (tesseract.js) failed to load. Please try uploading a text PDF, Word doc (.docx), or JSON resume instead.');
    }
    let label = '';
    const worker = await createWorker('eng', 1, {
        logger: (m) => {
            if (m.status === 'recognizing text') onProgress?.(`${label} ${Math.round((m.progress || 0) * 100)}%`);
            else if (/loading|initializ/i.test(m.status || '')) onProgress?.('Preparing text recognition…');
        },
    });
    // Keep column gaps (e.g. "Role    Jan 2020 – Present", chip rows) as runs of spaces.
    await worker.setParameters({ preserve_interword_spaces: '1' });
    return {
        read: async (image, nextLabel) => {
            label = nextLabel;
            const { data } = await worker.recognize(image);
            return data.text || '';
        },
        done: () => worker.terminate(),
    };
};

const ocrPdfPages = async (doc, onProgress) => {
    const ocr = await createOcr(onProgress);
    try {
        const pages = [];
        for (let p = 1; p <= doc.numPages; p += 1) {
            const page = await doc.getPage(p);
            const viewport = page.getViewport({ scale: 2.5 });
            const canvas = document.createElement('canvas');
            canvas.width = Math.ceil(viewport.width);
            canvas.height = Math.ceil(viewport.height);
            const ctx = canvas.getContext('2d');
            ctx.fillStyle = '#fff';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            await page.render({ canvasContext: ctx, canvas, viewport }).promise;
            pages.push(await ocr.read(canvas, `Reading page ${p} of ${doc.numPages}…`));
            canvas.width = 0;
            canvas.height = 0;
        }
        return normalizeOcrText(pages.join('\n'));
    } finally {
        await ocr.done();
    }
};

const extractImageText = async (file, onProgress) => {
    const ocr = await createOcr(onProgress);
    try {
        return normalizeOcrText(await ocr.read(file, 'Reading image…'));
    } finally {
        await ocr.done();
    }
};

const extractPdfText = async (file, onProgress) => {
    const pdfjs = await import('pdfjs-dist');
    pdfjs.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version || '3.11.174'}/pdf.worker.min.js`;

    const doc = await pdfjs.getDocument({ data: await file.arrayBuffer() }).promise;
    const text = await extractPdfTextLayer(doc);
    if (hasEnoughText(text)) return text;

    onProgress?.('No text layer — using text recognition…');
    return ocrPdfPages(doc, onProgress);
};

const extractPdfTextLayer = async (doc) => {
    const pages = [];
    for (let p = 1; p <= doc.numPages; p += 1) {
        const page = await doc.getPage(p);
        const { items } = await page.getTextContent();
        const lines = [];
        let current = null;
        items.forEach((item) => {
            if (!('str' in item)) return;
            const y = Math.round(item.transform[5]);
            const x = item.transform[4];
            if (!current || Math.abs(current.y - y) > 3) {
                current = { y, parts: [] };
                lines.push(current);
            }
            current.parts.push({ x, str: item.str, w: item.width || 0 });
            if (item.hasEOL) current = null;
        });
        const text = lines
            .sort((a, b) => b.y - a.y)
            .map((line) => {
                const parts = line.parts.sort((a, b) => a.x - b.x);
                let out = '';
                let lastEnd = null;
                parts.forEach((part) => {
                    if (lastEnd != null && part.x - lastEnd > 18 && out && !out.endsWith(' ')) out += '   ';
                    else if (lastEnd != null && part.x - lastEnd > 1.5 && out && !out.endsWith(' ') && !part.str.startsWith(' ')) out += ' ';
                    out += part.str;
                    lastEnd = part.x + part.w;
                });
                return out;
            })
            .join('\n');
        pages.push(text);
    }
    return pages.join('\n');
};

const extractDocxText = async (file) => {
    const mammoth = (await import('mammoth')).default;
    const { value: html } = await mammoth.convertToHtml({ arrayBuffer: await file.arrayBuffer() });
    const doc = new DOMParser().parseFromString(html, 'text/html');
    const lines = [];
    doc.body.querySelectorAll('p, li, h1, h2, h3, h4, h5, h6, td').forEach((node) => {
        if (node.tagName === 'TD' && node.querySelector('p, li')) return;
        if (node.tagName === 'P' && node.closest('li')) return;
        const text = node.textContent.replace(/\s+/g, ' ').trim();
        if (!text) return;
        lines.push(node.tagName === 'LI' ? `• ${text}` : text);
    });
    return lines.join('\n');
};

const IMAGE_EXTS = ['png', 'jpg', 'jpeg', 'webp', 'bmp'];

/** Pull plain text out of a PDF, DOCX, TXT, or image resume (OCR for image-only files). */
export const extractResumeText = async (file, onProgress) => {
    const ext = fileExt(file);
    let text;
    if (ext === 'pdf' || file.type === 'application/pdf') text = await extractPdfText(file, onProgress);
    else if (ext === 'docx') text = await extractDocxText(file);
    else if (ext === 'txt' || file.type === 'text/plain') text = await file.text();
    else if (IMAGE_EXTS.includes(ext) || file.type.startsWith('image/')) text = await extractImageText(file, onProgress);
    else throw new Error('Unsupported file type. Upload a PDF, DOCX, TXT, or image of your resume.');

    if (!hasEnoughText(text)) {
        throw new Error('No readable text found in this file, even with text recognition. Try a clearer file or a DOCX.');
    }
    return text;
};

/* ───────────────────────── Parsing helpers ───────────────────────── */

const HEADINGS = {
    summary: ['summary', 'professional summary', 'profile', 'profile summary', 'professional profile', 'about', 'about me', 'objective', 'career objective', 'career summary', 'personal statement', 'overview'],
    experience: ['experience', 'work experience', 'professional experience', 'employment', 'employment history', 'work history', 'career history', 'internships', 'internship', 'internship experience', 'relevant experience'],
    education: ['education', 'academic background', 'academics', 'academic qualifications', 'educational qualifications', 'qualifications', 'education and training'],
    skills: ['skills', 'technical skills', 'key skills', 'core skills', 'skills and tools', 'tools', 'technologies', 'tech stack', 'expertise', 'areas of expertise', 'skill set', 'skillset'],
    competencies: ['core competencies', 'competencies'],
    projects: ['projects', 'personal projects', 'academic projects', 'key projects', 'selected projects', 'project experience'],
    certifications: ['certifications', 'certification', 'certificates', 'licenses', 'licenses and certifications', 'licences'],
    languages: ['languages', 'language', 'languages known'],
    interests: ['interests', 'hobbies', 'hobbies and interests', 'interests and hobbies'],
    courses: ['courses', 'coursework', 'relevant coursework', 'training', 'trainings', 'online courses'],
    awards: ['awards', 'achievements', 'honors', 'honours', 'awards and achievements', 'accomplishments', 'key achievements', 'honors and awards'],
    organisations: ['organisations', 'organizations', 'volunteering', 'volunteer experience', 'volunteer', 'leadership', 'activities', 'extracurricular activities', 'extra curricular activities', 'memberships', 'positions of responsibility'],
    publications: ['publications', 'papers', 'research'],
    references: ['references', 'referees'],
    declaration: ['declaration'],
};

const HEADING_LOOKUP = new Map();
Object.entries(HEADINGS).forEach(([id, names]) => names.forEach((name) => HEADING_LOOKUP.set(name, id)));

const normHeading = (line) => line
    .toLowerCase()
    .replace(/&/g, 'and')
    .replace(/[^a-z ]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();

const headingFor = (line) => {
    if (line.length > 45) return null;
    return HEADING_LOOKUP.get(normHeading(line)) || null;
};

const BULLET_RE = /^\s*(?:[•●○◦▪▫■□►▸‣⁃∙·*–—-]|\d+[.)])\s+/;
const isBullet = (line) => BULLET_RE.test(line);
const stripBullet = (line) => line.replace(BULLET_RE, '').trim();

const EMAIL_RE = /[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/i;
const PHONE_RE = /(?:\+?\d[\d\s().-]{7,}\d)/;
const LINKEDIN_RE = /(?:https?:\/\/)?(?:[a-z]{2,3}\.)?linkedin\.com\/[^\s|,;]+/i;
const GITHUB_RE = /(?:https?:\/\/)?(?:www\.)?github\.com\/[^\s|,;]+/i;
const URL_RE = /(?:https?:\/\/)?(?:www\.)?[a-z0-9-]+(?:\.[a-z0-9-]+)*\.(?:com|dev|io|me|in|net|org|co|app|design|tech|ai|site|xyz|portfolio)(?:\/[^\s|,;]*)?/i;

const MONTH = '(?:jan(?:uary)?|feb(?:ruary)?|mar(?:ch)?|apr(?:il)?|may|jun(?:e)?|jul(?:y)?|aug(?:ust)?|sep(?:t(?:ember)?)?|oct(?:ober)?|nov(?:ember)?|dec(?:ember)?)';
const DATE_PART = `(?:${MONTH}\\.?\\s*,?\\s*\\d{4}|\\d{1,2}[/.-]\\d{4}|\\d{4})`;
const END_PART = `(?:${DATE_PART}|present|current|now|till date|ongoing|today)`;
const RANGE_RE = new RegExp(`(${DATE_PART})\\s*(?:-|–|—|to|until)\\s*(${END_PART})`, 'i');
const SINGLE_DATE_RE = new RegExp(`(${MONTH}\\.?\\s*,?\\s*\\d{4}|\\b(?:19|20)\\d{2}\\b)`, 'i');

const clean = (s) => String(s || '')
    .replace(/\s+/g, ' ')
    .replace(/^[\s|,;:·•–—-]+|[\s|,;:·•–—-]+$/g, '')
    .trim();

const titleCaseDate = (s) => clean(s).replace(/\b([a-z])/g, (m) => m.toUpperCase());

/* Like clean() but keeps inner runs of spaces — they mark column gaps. */
const trimEdges = (s) => String(s || '').replace(/^[\s|,;:·•–—-]+|[\s|,;:·•–—-]+$/g, '');

const pullRange = (text) => {
    const match = text.match(RANGE_RE);
    if (!match) return { rest: text, start: '', end: '' };
    return {
        rest: trimEdges(text.replace(match[0], '  ')),
        start: titleCaseDate(match[1]),
        end: titleCaseDate(match[2]),
    };
};

const pullSingleDate = (text) => {
    const match = text.match(SINGLE_DATE_RE);
    if (!match) return { rest: text, date: '' };
    return { rest: trimEdges(text.replace(match[0], '  ').replace(/\(\s*\)/g, '')), date: titleCaseDate(match[1]) };
};

/* OCR / text layers read the pronoun "I" as "|" in prose. */
const fixPipeI = (s) => String(s || '').replace(/(^|[.!?]\s+|\s)\|(?=\s+[a-z])/g, '$1I');

const splitList = (text) => text
    .split(/\s*(?:[,;|•●▪·]|\s{2,}|\n)\s*/)
    .map((s) => clean(s.replace(/^[^:]{1,30}:\s*/, '')))
    .filter((s) => s && s.length <= 48);

/* A header line like "Role | Company | City" or "Role at Company". */
const splitHeaderParts = (line) => {
    const at = line.match(/^(.+?)\s+(?:at|@)\s+(.+)$/i);
    if (at) return [clean(at[1]), clean(at[2])];
    return line.split(/\s*(?:\||·|•|\s[–—-]\s|\s{2,})\s*/).map(clean).filter(Boolean);
};

const LOCATION_WORDS = 'remote|hybrid|onsite|on-site|india|usa|uk|canada|germany|singapore|dubai|uae|bengaluru|bangalore|mumbai|pune|delhi|new delhi|chennai|hyderabad|kolkata|noida|gurgaon|gurugram|kochi|coimbatore|ahmedabad|jaipur|trichy|vellore|madurai|london|new york|san francisco|seattle|toronto|berlin|sydney';
const TRAILING_LOCATION_RE = new RegExp(`^(.*\\S)\\s+((?:${LOCATION_WORDS})(?:,\\s*[A-Za-z ]+)?)$`, 'i');

/** "Full Stack Developer Chennai" → ["Full Stack Developer", "Chennai"] when OCR drops the separator. */
const splitTrailingLocation = (text) => {
    const m = String(text || '').match(TRAILING_LOCATION_RE);
    return m ? [clean(m[1]), clean(m[2])] : [text, ''];
};

const TECH_SHAPE_RE = /^(?:[A-Z]{2,}[a-z0-9]*|[A-Z][a-z]+[A-Z][A-Za-z]*)$/;
const TECH_VOCAB_RE = /^(?:[a-z0-9]+\.(?:js|io|net)|\.net|c\+\+|c#|react|node|nestjs|next|nuxt|vue|angular|svelte|postgres|postgresql|mysql|mongodb|redis|kafka|rabbitmq|jest|vitest|cypress|playwright|docker|kubernetes|helm|terraform|ansible|linux|git|github|gitlab|jenkins|actions|python|java|go|golang|rust|ruby|rails|php|laravel|swift|kotlin|flutter|dart|django|flask|fastapi|spring|express|tailwind|sass|less|html|css|figma|sketch|firebase|supabase|vite|webpack|storybook|prisma|stripe|twilio|pandas|numpy|pytorch|tensorflow|keras|spark|airflow|snowflake|bigquery|tableau|looker|dbt|excel|powerbi|salesforce|hubspot|jira|notion|grafana|prometheus|elasticsearch|nginx|serverless|lambda|websocket|websockets|openai|langchain)$/i;
const isTechWord = (word) => {
    const w = word.replace(/[(),]/g, '');
    return TECH_SHAPE_RE.test(w) || TECH_VOCAB_RE.test(w);
};

const listParts = (line) => clean(line).split(/\s*(?:[,|·•/]|\s[–—-]\s)\s*/).map(clean).filter(Boolean);

/** A short line that is just a stack list, e.g. "React · NestJS · Postgres" (or OCR'd "React NestJS Postgres"). */
const isTechLine = (line, { loose = false } = {}) => {
    const text = clean(line);
    if (!text || text.length > 90 || /[.!?]$/.test(text) || /\b(?:19|20)\d{2}\b/.test(text)) return false;
    const parts = listParts(line).length > 1 ? listParts(line) : text.split(/\s{2,}/);
    if (parts.length > 1 && parts.every((p) => p.split(/\s+/).length <= 3)) return true;
    const words = text.split(/\s+/);
    const techWords = words.filter(isTechWord).length;
    return words.length >= 2 && techWords / words.length >= (loose ? 0.5 : 0.75);
};

const isSentenceLine = (line) => {
    const text = clean(line);
    return /[.!?]$/.test(text) || /^[a-z(]/.test(text) || text.length > 70 || text.split(/\s+/).length >= 9;
};

const findPhone = (text) => {
    const re = new RegExp(PHONE_RE.source, 'g');
    let m = re.exec(text);
    while (m) {
        const digits = m[0].replace(/\D/g, '');
        const plus = m[0].trim().startsWith('+');
        const looksLikeYears = /^(?:19|20)\d{2}\D+(?:19|20)\d{2}$/.test(m[0].trim());
        if (!looksLikeYears && digits.length <= 15 && (digits.length >= 10 || (plus && digits.length >= 8))) return clean(m[0]);
        m = re.exec(text);
    }
    return '';
};

const looksLikeEntryHeader = (line) => line.length <= 70 && !/[.;]$/.test(line) && !/^[a-z]/.test(line);

const LOCATION_HINT = /\b(remote|hybrid|india|usa|uk|canada|germany|singapore|dubai|uae|bengaluru|bangalore|mumbai|pune|delhi|chennai|hyderabad|kolkata|noida|gurgaon|gurugram|london|new york|san francisco|seattle|toronto|berlin|sydney)\b/i;
const looksLikeLocation = (s) => LOCATION_HINT.test(s) || /^[A-Z][A-Za-z .]+,\s*[A-Z][A-Za-z .]+$/.test(s);

const COMPANY_HINT = /\b(inc|ltd|llc|llp|pvt|private|limited|corp|corporation|technologies|technology|solutions|systems|labs|software|services|consulting|group|studio|bank|university|college|institute|agency|company)\b/i;
const ROLE_HINT = /\b(engineer|developer|manager|designer|analyst|intern|lead|architect|consultant|specialist|associate|executive|director|officer|scientist|administrator|coordinator|head|founder|trainee|assistant|representative|advisor|writer|editor|marketer|accountant|teacher|sre|devops)\b/i;

/* Group section lines into entries: a non-bullet line after bullets (or a new date range) starts a new entry. */
const groupEntries = (lines, { maxHeaderLines = 3 } = {}) => {
    const entries = [];
    let cur = null;
    let lastWasBullet = false;
    const start = () => {
        cur = { header: [], body: [] };
        entries.push(cur);
    };
    lines.forEach((line) => {
        if (isBullet(line)) {
            if (!cur) start();
            cur.body.push(stripBullet(line));
            lastWasBullet = true;
            return;
        }
        const hasRange = RANGE_RE.test(line);
        const headerHasRange = cur?.header.some((h) => RANGE_RE.test(h));

        if (cur && cur.body.length && !hasRange) {
            const last = cur.body[cur.body.length - 1];
            const wrapped = lastWasBullet && (/^[a-z(&,%]/.test(line) || (!/[.!?]$/.test(last) && !looksLikeEntryHeader(line)));
            if (wrapped) {
                cur.body[cur.body.length - 1] = `${last} ${line}`;
                return;
            }
            if (!lastWasBullet && !looksLikeEntryHeader(line)) {
                cur.body.push(line);
                return;
            }
        }
        lastWasBullet = false;

        const lastHeader = cur?.header[cur.header.length - 1] || '';
        const afterSentence = /[.!?]$/.test(lastHeader) && looksLikeEntryHeader(line);

        if (!cur || cur.body.length || (hasRange && headerHasRange) || afterSentence) {
            start();
        } else if (cur.header.length >= maxHeaderLines) {
            if (!hasRange) {
                cur.body.push(line);
                return;
            }
            start();
        }
        cur.header.push(line);
    });
    return entries;
};

/* ───────────────────────── Section parsers ───────────────────────── */

const parseExperience = (lines) => groupEntries(lines).map(({ header, body }) => {
    let startDate = '';
    let endDate = '';
    const parts = [];
    header.forEach((line) => {
        const r = pullRange(line);
        if (r.start && !startDate) {
            startDate = r.start;
            endDate = r.end;
        }
        splitHeaderParts(r.rest).forEach((p) => p && parts.push(p));
    });
    let location = '';
    const locIdx = parts.findIndex((p, i) => i > 0 && looksLikeLocation(p));
    if (locIdx >= 0) location = parts.splice(locIdx, 1)[0];

    let role = parts[0] || '';
    let company = parts[1] || '';
    if (role && company && !ROLE_HINT.test(role)) {
        if (ROLE_HINT.test(company) || (COMPANY_HINT.test(role) && !COMPANY_HINT.test(company))) [role, company] = [company, role];
    }
    if (!location) {
        const [roleOnly, roleLoc] = splitTrailingLocation(role);
        const [companyOnly, companyLoc] = splitTrailingLocation(company);
        if (roleLoc && roleOnly) {
            role = roleOnly;
            location = roleLoc;
        } else if (companyLoc && companyOnly) {
            company = companyOnly;
            location = companyLoc;
        }
    }

    const extra = parts.slice(2).join(' · ');
    const description = [extra, ...body].filter(Boolean).map(fixPipeI).join('\n');
    return { role, company, startDate, endDate, location, description };
}).filter((e) => e.role || e.company);

const DEGREE_WORD_RE = /\b(b\.?\s?tech|m\.?\s?tech|b\.e\.?|m\.e\.?|b\.?\s?sc|m\.?\s?sc|b\.?\s?com|m\.?\s?com|b\.a\.?|m\.a\.?|bca|mca|bba|mba|pgdm|ph\.?\s?d|doctorate|bachelor(?:'s)?|master(?:'s)?|associate(?:'s)? degree|diploma|high school|higher secondary|senior secondary|secondary school|hsc|ssc|cbse|icse|class\s+(?:x|xii|10|12)(?:th)?|(?:10|12)th|a[- ]levels?|gcse)(?![a-z])/i;
const DEGREE_ABBR_RE = /\b(BE|BA|MA|ME|BS|MS|BSc|MSc|BEng|MEng)\b/;
const DEGREE_RE = { test: (s) => DEGREE_WORD_RE.test(s) || DEGREE_ABBR_RE.test(s) };
const INSTITUTION_RE = /\b(university|college|institute|school|academy|iit|nit|iiit|iim|bits|vit|polytechnic|vidyalaya|campus)\b/i;
const GPA_RE = /(?:\b(?:c?gpa|cpi|sgpa|percentage|grade|score|marks)\s*[:-]?\s*\d+(?:\.\d+)?(?:\s*\/\s*\d+(?:\.\d+)?)?\s*%?|\b\d{1,3}(?:\.\d+)?\s*%|\b\d{1,2}(?:\.\d+)?\s*\/\s*(?:10|4|5)(?:\.0)?\b)/i;

const parseEducation = (lines) => {
    const entries = [];
    let cur = null;
    const push = () => {
        cur = { degree: '', field: '', institution: '', location: '', startYear: '', endYear: '', gpa: '' };
        entries.push(cur);
    };
    lines.forEach((raw) => {
        let line = isBullet(raw) ? stripBullet(raw) : raw;
        const gpa = line.match(GPA_RE);
        if (gpa) line = clean(line.replace(gpa[0], ' '));
        const r = pullRange(line);
        line = r.rest;
        let single = '';
        if (!r.start) {
            const s = pullSingleDate(line);
            if (s.date && /\d{4}/.test(s.date)) {
                single = s.date;
                line = s.rest;
            }
        }
        const isDegree = DEGREE_RE.test(line);
        const isInst = INSTITUTION_RE.test(line);
        if (!cur || (isDegree && cur.degree) || (isInst && !isDegree && cur.institution && cur.degree)) push();

        if (gpa && !cur.gpa) cur.gpa = clean(gpa[0]);
        if (r.start && !cur.startYear) {
            cur.startYear = r.start;
            cur.endYear = r.end;
        } else if (single && !cur.endYear) cur.endYear = single;

        splitHeaderParts(line).forEach((part) => {
            if (!part) return;
            if (DEGREE_RE.test(part) && !cur.degree) {
                const m = part.match(/^(.*?)\s+(?:in|of)\s+(.+)$/i) || part.match(/^(.*?)\s*[(,]\s*([^)]+)\)?$/);
                if (m && DEGREE_RE.test(m[1])) {
                    cur.degree = clean(m[1]);
                    if (INSTITUTION_RE.test(m[2]) && !cur.institution) cur.institution = clean(m[2]);
                    else cur.field = clean(m[2]);
                } else cur.degree = part;
            } else if (INSTITUTION_RE.test(part) && !cur.institution) cur.institution = part;
            else if (looksLikeLocation(part) && !cur.location) cur.location = part;
            else if (!cur.degree && !INSTITUTION_RE.test(part)) cur.degree = part;
            else if (!cur.institution) cur.institution = part;
            else if (!cur.field) cur.field = part;
        });
    });
    return entries.filter((e) => e.degree || e.institution);
};

const techList = (line) => {
    const parts = listParts(line);
    if (parts.length > 1) return parts;
    const gapParts = line.trim().split(/\s{2,}/).map(clean).filter(Boolean);
    if (gapParts.length > 1) return gapParts;
    // No separators survived: keep known tech words apart, join the rest ("Style Dictionary").
    const grouped = [];
    clean(line).split(/\s+/).forEach((word) => {
        const last = grouped[grouped.length - 1];
        if (!isTechWord(word) && last && !last.tech) last.text += ` ${word}`;
        else grouped.push({ text: word, tech: isTechWord(word) });
    });
    return grouped.map((g) => g.text);
};

/**
 * Projects are usually "Name [date]" → description → optional stack line, or "Name | stack" → description.
 * A short line after a description is the stack when the next line is not a description.
 */
const parseProjects = (lines) => {
    const out = [];
    let cur = null;
    const startProject = (line) => {
        const range = pullRange(line);
        const s = range.start ? { rest: range.rest, date: '' } : pullSingleDate(line);
        const parts = splitHeaderParts(s.rest);
        cur = {
            name: parts.shift() || '',
            date: range.start ? `${range.start} – ${range.end}` : s.date,
            description: [],
            technologies: [],
            link: '',
        };
        const techIdx = parts.findIndex((p) => isTechLine(p, { loose: true }) || p.includes(','));
        if (techIdx >= 0) cur.technologies = techList(parts.splice(techIdx, 1)[0]);
        cur.description.push(...parts);
        out.push(cur);
    };

    lines.forEach((raw, i) => {
        const bullet = isBullet(raw);
        const line = bullet ? stripBullet(raw) : raw;
        const next = lines[i + 1];

        const techLabel = line.match(/^(?:tech(?:nologies)?(?:\s*stack)?|tools|stack|built with)\s*[:-]\s*(.+)$/i);
        if (techLabel && cur) {
            cur.technologies = splitList(techLabel[1]);
            return;
        }
        const url = line.match(GITHUB_RE) || line.match(URL_RE);
        if (cur && !cur.link && url && url[0].length > clean(line).length * 0.6) {
            cur.link = url[0];
            return;
        }
        if (!cur) {
            startProject(line);
            return;
        }
        if (bullet || isSentenceLine(line)) {
            cur.description.push(line);
            return;
        }
        if (!cur.technologies.length) {
            const nextIsDescription = next != null && !isBullet(next) && isSentenceLine(next);
            const strongTech = isTechLine(line);
            if (strongTech || (cur.description.length && !nextIsDescription) || (!cur.description.length && isTechLine(line, { loose: true }))) {
                cur.technologies = techList(line);
                return;
            }
        }
        startProject(line);
    });

    return out
        .map((p) => ({ ...p, description: p.description.map(clean).filter(Boolean).join('\n') }))
        .filter((p) => p.name);
};

const parseSkills = (lines) => {
    const seen = new Set();
    const out = [];
    lines.forEach((line) => splitList(stripBullet(line)).forEach((name) => {
        const key = name.toLowerCase();
        if (seen.has(key) || name.split(' ').length > 5) return;
        seen.add(key);
        out.push({ name });
    }));
    return out.slice(0, 40);
};

const PROFICIENCY = '(?:native(?:\\s*\\/\\s*bilingual)?|bilingual|mother tongue|fluent|full professional(?: proficiency)?|professional(?: working)?(?: proficiency)?|limited working(?: proficiency)?|conversational|intermediate|advanced|proficient|competent|basic|beginner|elementary|working knowledge|read(?:ing)?\\s*\\/\\s*writ(?:e|ing)|[ABC][12])';
const LANGUAGE_PAIR_RE = new RegExp(`([A-Z][A-Za-z\\u00C0-\\u024F]+(?:\\s[A-Z][a-z]+)?)\\s*(?:[(:\\-–—]\\s*)?(${PROFICIENCY})\\)?`, 'gi');

const parseLanguages = (lines) => {
    const text = lines.map(stripBullet).join('  ');
    const pairs = [...text.matchAll(LANGUAGE_PAIR_RE)]
        .map((m) => ({ name: clean(m[1]), proficiency: clean(m[2]).replace(/\b([a-z])/g, (c) => c.toUpperCase()) }))
        .filter((p) => !new RegExp(`^${PROFICIENCY}$`, 'i').test(p.name));
    if (pairs.length) return pairs;

    const out = [];
    lines.forEach((line) => stripBullet(line)
        .split(/\s*[,;|•·]\s*/)
        .forEach((chunk) => {
            const text = clean(chunk);
            if (!text) return;
            const m = text.match(/^([A-Za-z\u00C0-\u024F ]+?)\s*(?:\(([^)]+)\)|[:–—-]\s*(.+))$/);
            if (m) out.push({ name: clean(m[1]), proficiency: clean(m[2] || m[3]) });
            else if (text.split(' ').length <= 3) out.push({ name: text, proficiency: '' });
        }));
    return out;
};

/**
 * Items shaped like  Name [date] → Issuer / Institution [date] → optional description,
 * or single lines like "Name · Issuer · 2022".
 */
const parseMetaItems = (lines) => {
    const items = [];
    let cur = null;
    const splitLine = (line) => {
        const range = pullRange(line);
        const s = range.start ? { rest: range.rest, date: range.end || range.start } : pullSingleDate(line);
        let parts = splitHeaderParts(s.rest);
        if (parts.length === 1 && /,\s/.test(parts[0])) parts = parts[0].split(/,\s+/).map(clean).filter(Boolean);
        return { parts, date: s.date };
    };
    const start = (line) => {
        const { parts, date } = splitLine(line);
        cur = { name: parts[0] || clean(line), meta: parts.slice(1).join(' · '), date, description: [] };
        items.push(cur);
    };

    lines.forEach((raw) => {
        const bullet = isBullet(raw);
        const line = bullet ? stripBullet(raw) : raw;
        if (!clean(line)) return;
        if (!cur) {
            start(line);
            return;
        }
        const { parts, date } = splitLine(line);
        const sentence = isSentenceLine(line) || bullet;
        const hasOnlyName = !cur.meta && !cur.description.length;

        if (sentence) {
            cur.description.push(line);
            return;
        }
        if (date) {
            // "Issuer · 2023" under a name that had no date belongs to that item.
            if (!cur.date && hasOnlyName && parts.length <= 2) {
                cur.date = date;
                cur.meta = parts.join(' · ');
                return;
            }
            start(line);
            return;
        }
        if (hasOnlyName && parts.length <= 2 && clean(line).split(/\s+/).length <= 5) {
            cur.meta = parts.join(' · ');
            return;
        }
        start(line);
    });

    return items.map((item) => ({
        name: clean(item.name),
        meta: clean(item.meta),
        date: item.date,
        description: item.description.map(clean).join(' '),
    })).filter((item) => item.name);
};

const parseCertifications = (lines) => parseMetaItems(lines).map(({ name, meta, date, description }) => ({
    name, issuer: meta, date, link: '', ...(description ? { description } : {}),
}));

const parseAwards = (lines) => parseMetaItems(lines).map(({ name, meta, date, description }) => ({
    name, issuer: meta, date, description,
}));

const parseCourses = (lines) => parseMetaItems(lines).map(({ name, meta, date, description }) => ({
    name, institution: meta, date, description,
}));

const parseOrganisations = (lines) => groupEntries(lines, { maxHeaderLines: 2 }).map(({ header, body }) => {
    const r = pullRange(header.join(' | '));
    const parts = splitHeaderParts(r.rest);
    return {
        name: parts[1] ? parts[1] : parts[0] || '',
        role: parts[1] ? parts[0] : '',
        startDate: r.start,
        endDate: r.end,
        description: body.join('\n'),
    };
}).filter((o) => o.name);

const parsePublications = (lines) => parseMetaItems(lines).map(({ name, meta, date, description }) => ({
    name, publisher: meta, date, description,
}));

const parseReferences = (lines) => {
    if (lines.some((l) => /available (?:up)?on request/i.test(l))) return [];
    return groupEntries(lines, { maxHeaderLines: 1 }).map(({ header, body }) => {
        const all = [...header, ...body].join(' | ');
        const email = (all.match(EMAIL_RE) || [''])[0];
        const phone = (all.match(PHONE_RE) || [''])[0];
        const parts = splitHeaderParts(all.replace(email, ' ').replace(phone, ' ')).filter(Boolean);
        return { name: parts[0] || '', title: parts[1] || '', company: parts[2] || '', email, phone: clean(phone) };
    }).filter((r) => r.name);
};

/* ───────────────────────── Main parser ───────────────────────── */

const parsePersonal = (headerLines, allText) => {
    const personal = {};
    const email = allText.match(EMAIL_RE);
    if (email) personal.email = email[0];
    const linkedin = allText.match(LINKEDIN_RE);
    if (linkedin) personal.linkedin = linkedin[0].replace(/^https?:\/\/(www\.)?/i, '').replace(/\/$/, '');
    const github = allText.match(GITHUB_RE);
    if (github) personal.github = github[0].replace(/^https?:\/\/(www\.)?/i, '').replace(/\/$/, '');

    const phone = findPhone(headerLines.join('\n')) || findPhone(allText);
    if (phone) personal.phone = phone;

    const leftovers = [];
    headerLines.forEach((line) => {
        splitHeaderParts(line).forEach((part) => {
            let p = part;
            [EMAIL_RE, LINKEDIN_RE, GITHUB_RE].forEach((re) => { p = p.replace(re, ' '); });
            if (phone) p = p.replace(phone, ' ');
            p = clean(p.replace(/\b(?:email|e-mail|phone|mobile|tel|linkedin|github|portfolio|website)\s*:?/gi, ' '));
            if (!p) return;
            const site = p.match(URL_RE);
            if (site && !personal.website && site[0].length >= p.length * 0.8) {
                personal.website = site[0].replace(/^https?:\/\/(www\.)?/i, '').replace(/\/$/, '');
                return;
            }
            leftovers.push(p);
        });
    });

    const nameIdx = leftovers.findIndex((p) => /^[A-Za-z\u00C0-\u024F.' -]{3,40}$/.test(p) && p.split(/\s+/).length <= 5);
    if (nameIdx >= 0) {
        const raw = leftovers.splice(nameIdx, 1)[0];
        personal.name = raw === raw.toUpperCase()
            ? raw.toLowerCase().replace(/\b([a-z])/g, (m) => m.toUpperCase())
            : raw;
    }
    const locIdx = leftovers.findIndex(looksLikeLocation);
    if (locIdx >= 0) personal.location = leftovers.splice(locIdx, 1)[0];
    const titleIdx = leftovers.findIndex((p) => p.length <= 60 && !/\d{3,}/.test(p));
    if (titleIdx >= 0) personal.jobTitle = leftovers.splice(titleIdx, 1)[0];

    return { personal, headerExtra: leftovers.filter((p) => p.length > 60) };
};

/**
 * Heuristically convert plain resume text into MockB resume JSON (content keys only).
 */
export const parseResumeText = (text) => {
    const lines = String(text || '')
        .replace(/\r/g, '')
        .replace(/\u00A0/g, ' ')
        .split('\n')
        .map((l) => l.replace(/\s+$/g, '').replace(/^\s+/, ''))
        .filter((l) => l.trim());

    const buckets = { _header: [] };
    let currentKey = '_header';
    lines.forEach((line) => {
        const inline = currentKey === 'skills' || currentKey === 'competencies'
            ? null
            : line.match(/^([A-Za-z &/]{3,40}):\s+(.+)$/);
        const id = headingFor(line) || (inline && headingFor(inline[1]));
        if (id) {
            currentKey = id;
            buckets[id] = buckets[id] || [];
            if (inline && !headingFor(line)) buckets[id].push(inline[2]);
            return;
        }
        buckets[currentKey].push(line);
    });

    const { personal, headerExtra } = parsePersonal(buckets._header.slice(0, 8), lines.join('\n'));
    const out = { personal };

    const summaryLines = [...(buckets.summary || []), ...(buckets.summary ? [] : headerExtra)];
    if (!buckets.summary && buckets._header.length > 8) summaryLines.push(...buckets._header.slice(8));
    if (summaryLines.length) out.summary = fixPipeI(clean(summaryLines.map(stripBullet).join(' ')));

    if (buckets.experience) out.experience = parseExperience(buckets.experience);
    if (buckets.education) out.education = parseEducation(buckets.education);
    if (buckets.skills) out.skills = parseSkills(buckets.skills);
    if (buckets.competencies) out.competencies = parseSkills(buckets.competencies).map((s) => s.name);
    if (buckets.projects) out.projects = parseProjects(buckets.projects);
    if (buckets.certifications) out.certifications = parseCertifications(buckets.certifications);
    if (buckets.languages) out.languages = parseLanguages(buckets.languages);
    if (buckets.interests) out.interests = parseSkills(buckets.interests);
    if (buckets.courses) out.courses = parseCourses(buckets.courses);
    if (buckets.awards) out.awards = parseAwards(buckets.awards);
    if (buckets.organisations) out.organisations = parseOrganisations(buckets.organisations);
    if (buckets.publications) out.publications = parsePublications(buckets.publications);
    if (buckets.references) out.references = parseReferences(buckets.references);
    if (buckets.declaration) out.declaration = [{ text: clean(buckets.declaration.join(' ')) }];

    return toResumeImportJson(out);
};

/* ───────────────────────── Template fill ───────────────────────── */

const hasItems = (value) => (Array.isArray(value) ? value.length > 0 : Boolean(value && String(value).trim()));

/**
 * Keep everything parsed from the user's resume; for sections the selected template
 * shows (per its sample) that the resume lacks, copy the template's sample content.
 * Returns the merged JSON plus which sections were filled with sample content.
 */
export const fillFromTemplateSample = (parsed = {}, templateSample = null) => {
    const sample = templateSample ? toResumeImportJson(templateSample) : {};
    const data = { ...parsed };
    const filled = [];

    RESUME_JSON_CONTENT_KEYS.forEach((key) => {
        if (key === 'personal' || key === 'custom') return;
        if (hasItems(data[key]) || !hasItems(sample[key])) return;
        data[key] = sample[key];
        filled.push(key);
    });

    const personal = { ...(data.personal || {}) };
    const samplePersonal = sample.personal || {};
    const filledPersonal = [];
    ['name', 'jobTitle', 'email', 'phone', 'location'].forEach((field) => {
        if (!personal[field] && samplePersonal[field]) {
            personal[field] = samplePersonal[field];
            filledPersonal.push(field);
        }
    });
    data.personal = personal;
    if (filledPersonal.length) filled.unshift('personal');

    return { data, filled, filledPersonal };
};

/** Full pipeline: file → text → parsed JSON → template-filled JSON. */
export const importResumeFile = async (file, templateSample, onProgress) => {
    const text = await extractResumeText(file, onProgress);
    const parsed = parseResumeText(text);
    const found = Object.keys(parsed).filter((key) => key !== 'personal' && hasItems(parsed[key]));
    const { data, filled, filledPersonal } = fillFromTemplateSample(parsed, templateSample);
    return { data, found, filled, filledPersonal };
};

export const describeSections = (keys = []) => keys.map((k) => SECTION_LABELS[k] || k);

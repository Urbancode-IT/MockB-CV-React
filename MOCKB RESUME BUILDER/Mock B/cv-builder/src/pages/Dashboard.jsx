import { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthProvider';
import { updateUserProfile } from '../services/authService';
import { getTemplateById } from '../config/templates';
import {
    deleteUserResume,
    deleteUserTemplate,
    listUserResumes,
    listUserTemplates,
} from '../utils/userLibrary';
import { fileToDataUrl, getLocalProfile, saveLocalProfile } from '../utils/userProfile';
import './Dashboard.css';

const TOOLS = [
    {
        to: '/resume/templates',
        title: 'Resume builder',
        desc: 'Pick a template and craft a polished resume with live preview.',
        icon: 'fa-file-lines',
    },
    {
        to: '/cover-letter/templates',
        title: 'Cover letter builder',
        desc: 'Write a matching cover letter in minutes.',
        icon: 'fa-envelope-open-text',
    },
    {
        to: '/portfolio-maker',
        title: 'Portfolio maker',
        desc: 'Create a personal site you can download as a ZIP.',
        icon: 'fa-globe',
    },
];

const formatWhen = (iso) => {
    if (!iso) return '';
    try {
        return new Date(iso).toLocaleString();
    } catch {
        return '';
    }
};

export default function Dashboard() {
    const { user, setUser, logout } = useAuth();
    const navigate = useNavigate();
    const fileRef = useRef(null);

    const [resumes, setResumes] = useState(() => listUserResumes());
    const [templates, setTemplates] = useState(() => listUserTemplates());
    const [editing, setEditing] = useState(false);
    const [saving, setSaving] = useState(false);
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    const [form, setForm] = useState({
        name: '',
        email: '',
        title: '',
        phone: '',
        location: '',
        bio: '',
        avatar: '',
    });

    useEffect(() => {
        const stored = getLocalProfile(user);
        setForm({
            name: stored.name || user?.name || '',
            email: stored.email || user?.email || '',
            title: stored.title || '',
            phone: stored.phone || '',
            location: stored.location || '',
            bio: stored.bio || '',
            avatar: stored.avatar || user?.avatar || user?.photo || '',
        });
    }, [user]);

    const displayName = form.name?.trim() || user?.name?.trim() || user?.email || 'there';
    const yourWorkTemplates = templates.filter(
        (item) => item.kind === 'your-work' || / – Your work( \d+)?$/i.test(item.name || ''),
    );

    const handleLogout = async () => {
        await logout();
        navigate('/login');
    };

    const onPickAvatar = async (event) => {
        const file = event.target.files?.[0];
        event.target.value = '';
        if (!file) return;
        try {
            const dataUrl = await fileToDataUrl(file);
            setForm((prev) => ({ ...prev, avatar: dataUrl }));
            setError('');
        } catch (err) {
            setError(err.message || 'Could not upload image');
        }
    };

    const saveProfile = async (event) => {
        event.preventDefault();
        setSaving(true);
        setError('');
        setMessage('');
        const payload = {
            name: form.name.trim(),
            email: form.email.trim(),
            title: form.title.trim(),
            phone: form.phone.trim(),
            location: form.location.trim(),
            bio: form.bio.trim(),
            avatar: form.avatar,
        };
        if (payload.name.length < 2) {
            setError('Please enter your name.');
            setSaving(false);
            return;
        }

        saveLocalProfile(user, payload);

        const apiResult = await updateUserProfile({
            name: payload.name,
            email: payload.email || undefined,
        });

        if (apiResult?.success && (apiResult.data?.user || apiResult.data)) {
            const nextUser = apiResult.data?.user || apiResult.data;
            setUser?.({ ...user, ...nextUser, name: payload.name, email: payload.email || nextUser.email });
        } else {
            setUser?.({ ...user, name: payload.name, email: payload.email || user?.email });
        }

        setMessage(apiResult?.success ? 'Profile updated.' : 'Profile saved on this device.');
        setEditing(false);
        setSaving(false);
    };

    const openResume = (item) => {
        navigate('/resume/customizer', {
            state: {
                restoreUserResume: item,
                userResumeId: item.id,
                selectedTemplate: item.selectedTemplate,
            },
        });
    };

    const openTemplate = (item) => {
        navigate('/resume/customizer', {
            state: {
                selectedTemplate: item.baseTemplate,
                userTemplateId: item.id,
                restoreDesign: item.design,
                themeColor: item.themeColor,
                sectionOrder: item.sectionOrder,
                columnSections: item.columnSections,
            },
        });
    };

    return (
        <main className="ud-page">
            <header className="ud-top">
                <Link to="/" className="ud-brand">
                    <span className="ud-brand-mark">
                        <i className="fa-solid fa-file-lines"></i>
                    </span>
                    MockB <span>CV</span>
                </Link>
                <div className="ud-top-actions">
                    <span className="ud-user">{displayName}</span>
                    <button type="button" className="ud-logout" onClick={handleLogout}>
                        Logout
                    </button>
                </div>
            </header>

            <section className="ud-hero">
                <p className="ud-eyebrow">Your dashboard</p>
                <h1>Welcome back, {displayName.split(' ')[0]}</h1>
                <p className="ud-lead">
                    Manage your profile, reopen saved work, and jump into resume, cover letter, or portfolio tools.
                </p>
            </section>

            <section className="ud-profile" aria-label="Profile">
                <div className="ud-profile-card">
                    <div className="ud-avatar-wrap">
                        {form.avatar ? (
                            <img src={form.avatar} alt="" className="ud-avatar" />
                        ) : (
                            <span className="ud-avatar ud-avatar--fallback">
                                {(displayName || 'U').charAt(0).toUpperCase()}
                            </span>
                        )}
                        {editing && (
                            <>
                                <input
                                    ref={fileRef}
                                    type="file"
                                    accept="image/*"
                                    hidden
                                    onChange={onPickAvatar}
                                />
                                <button
                                    type="button"
                                    className="ud-avatar-btn"
                                    onClick={() => fileRef.current?.click()}
                                >
                                    Change photo
                                </button>
                                {form.avatar && (
                                    <button
                                        type="button"
                                        className="ud-avatar-btn ud-avatar-btn--ghost"
                                        onClick={() => setForm((prev) => ({ ...prev, avatar: '' }))}
                                    >
                                        Remove
                                    </button>
                                )}
                            </>
                        )}
                    </div>

                    {!editing ? (
                        <div className="ud-profile-view">
                            <h2>{displayName}</h2>
                            <p className="ud-profile-meta">{form.email || user?.email}</p>
                            {(form.title || form.location || form.phone) && (
                                <p className="ud-profile-meta">
                                    {[form.title, form.location, form.phone].filter(Boolean).join(' · ')}
                                </p>
                            )}
                            {form.bio && <p className="ud-profile-bio">{form.bio}</p>}
                            <button type="button" className="ud-edit-btn" onClick={() => setEditing(true)}>
                                Edit profile
                            </button>
                        </div>
                    ) : (
                        <form className="ud-profile-form" onSubmit={saveProfile}>
                            <div className="ud-form-row">
                                <label htmlFor="ud-name">Full name</label>
                                <input
                                    id="ud-name"
                                    value={form.name}
                                    onChange={(e) => setForm((prev) => ({ ...prev, name: e.target.value }))}
                                    required
                                />
                            </div>
                            <div className="ud-form-row">
                                <label htmlFor="ud-email">Email</label>
                                <input
                                    id="ud-email"
                                    type="email"
                                    value={form.email}
                                    onChange={(e) => setForm((prev) => ({ ...prev, email: e.target.value }))}
                                />
                            </div>
                            <div className="ud-form-grid">
                                <div className="ud-form-row">
                                    <label htmlFor="ud-title">Role / title</label>
                                    <input
                                        id="ud-title"
                                        value={form.title}
                                        onChange={(e) => setForm((prev) => ({ ...prev, title: e.target.value }))}
                                        placeholder="e.g. Product Designer"
                                    />
                                </div>
                                <div className="ud-form-row">
                                    <label htmlFor="ud-phone">Phone</label>
                                    <input
                                        id="ud-phone"
                                        value={form.phone}
                                        onChange={(e) => setForm((prev) => ({ ...prev, phone: e.target.value }))}
                                    />
                                </div>
                            </div>
                            <div className="ud-form-row">
                                <label htmlFor="ud-location">Location</label>
                                <input
                                    id="ud-location"
                                    value={form.location}
                                    onChange={(e) => setForm((prev) => ({ ...prev, location: e.target.value }))}
                                />
                            </div>
                            <div className="ud-form-row">
                                <label htmlFor="ud-bio">About</label>
                                <textarea
                                    id="ud-bio"
                                    rows={3}
                                    value={form.bio}
                                    onChange={(e) => setForm((prev) => ({ ...prev, bio: e.target.value }))}
                                    placeholder="Short bio for your dashboard"
                                />
                            </div>
                            {error && <p className="ud-form-error">{error}</p>}
                            <div className="ud-form-actions">
                                <button type="button" className="ud-logout" onClick={() => setEditing(false)}>
                                    Cancel
                                </button>
                                <button type="submit" className="ud-edit-btn" disabled={saving}>
                                    {saving ? 'Saving…' : 'Save changes'}
                                </button>
                            </div>
                        </form>
                    )}
                    {message && !editing && <p className="ud-form-ok">{message}</p>}
                </div>
            </section>

            <section className="ud-block" aria-label="Tools">
                <div className="ud-block-head">
                    <h2>Quick start</h2>
                </div>
                <div className="ud-grid">
                    {TOOLS.map((tool) => (
                        <Link key={tool.to} to={tool.to} className="ud-card">
                            <span className="ud-card-icon" aria-hidden="true">
                                <i className={`fa-solid ${tool.icon}`}></i>
                            </span>
                            <h3>{tool.title}</h3>
                            <p>{tool.desc}</p>
                            <span className="ud-card-go">Open</span>
                        </Link>
                    ))}
                </div>
            </section>

            <section className="ud-block" aria-label="Your work">
                <div className="ud-block-head">
                    <h2>Your work</h2>
                    <Link to="/resume/templates" className="ud-block-link">
                        Browse templates
                    </Link>
                </div>

                <h3 className="ud-subhead">Saved resumes</h3>
                {resumes.length === 0 ? (
                    <p className="ud-empty">No saved resumes yet. Build one and click Save in the editor.</p>
                ) : (
                    <div className="ud-work-list">
                        {resumes.map((item) => {
                            const base = getTemplateById(item.selectedTemplate);
                            return (
                                <div key={item.id} className="ud-work-row">
                                    <button type="button" className="ud-work-main" onClick={() => openResume(item)}>
                                        <strong>{item.name}</strong>
                                        <span>
                                            {base?.name || item.selectedTemplate}
                                            {item.updatedAt ? ` · ${formatWhen(item.updatedAt)}` : ''}
                                        </span>
                                    </button>
                                    <button
                                        type="button"
                                        className="ud-work-delete"
                                        aria-label={`Delete ${item.name}`}
                                        onClick={() => setResumes(deleteUserResume(item.id))}
                                    >
                                        <i className="fa-solid fa-trash"></i>
                                    </button>
                                </div>
                            );
                        })}
                    </div>
                )}

                <h3 className="ud-subhead">Your templates</h3>
                {yourWorkTemplates.length === 0 && templates.length === 0 ? (
                    <p className="ud-empty">No saved templates yet. Customize a design and save it as a template.</p>
                ) : (
                    <div className="ud-work-list">
                        {(yourWorkTemplates.length ? yourWorkTemplates : templates).map((item) => {
                            const base = getTemplateById(item.baseTemplate);
                            return (
                                <div key={item.id} className="ud-work-row">
                                    <button type="button" className="ud-work-main" onClick={() => openTemplate(item)}>
                                        <strong>{item.name}</strong>
                                        <span>
                                            Based on {base?.name || item.baseTemplate}
                                            {item.updatedAt ? ` · ${formatWhen(item.updatedAt)}` : ''}
                                        </span>
                                    </button>
                                    <button
                                        type="button"
                                        className="ud-work-delete"
                                        aria-label={`Delete ${item.name}`}
                                        onClick={() => setTemplates(deleteUserTemplate(item.id))}
                                    >
                                        <i className="fa-solid fa-trash"></i>
                                    </button>
                                </div>
                            );
                        })}
                    </div>
                )}
            </section>
        </main>
    );
}

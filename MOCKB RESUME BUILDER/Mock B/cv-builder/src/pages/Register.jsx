import { useState } from 'react';
import { useNavigate, Link, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthProvider';
import PageLoader from '../components/common/PageLoader';
import './Auth.css';

const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [submitting, setSubmitting] = useState(false);
    const navigate = useNavigate();
    const { register, user, loading } = useAuth();

    if (loading) return <PageLoader label="Checking session…" />;
    if (user) return <Navigate to="/" replace />;

    const handleRegister = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');
        const normalizedName = name.trim();
        const normalizedEmail = email.trim().toLowerCase();
        if (normalizedName.length < 2) {
            setError('Please enter your full name.');
            return;
        }
        if (!normalizedEmail) {
            setError('Please enter your email address.');
            return;
        }
        if (password.length < 6) {
            setError('Password must be at least 6 characters long.');
            return;
        }
        setSubmitting(true);
        try {
            const res = await register({ name: normalizedName, email: normalizedEmail, password });
            if (res?.success) {
                setSuccess('Account created. Taking you home…');
                setTimeout(() => navigate('/'), 500);
            } else {
                setError(res?.message || 'Registration failed. Please try again.');
            }
        } catch (err) {
            setError(err.message || 'Registration failed. Please try again.');
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="auth-page auth-page--solo">
            <div className="auth-form-panel">
                <div className="auth-grid-bg" aria-hidden="true" />
                <div className="auth-form-inner">
                    <Link to="/" className="auth-brand-link">
                        <span className="logo-icon-wrap">
                            <i className="fa-solid fa-file-lines"></i>
                        </span>
                        MockB <span>CV</span>
                    </Link>

                    <div className="auth-form-header">
                        <h1>Create your <span>account</span></h1>
                        <p>
                            Already have an account?{' '}
                            <Link to="/login">Sign in</Link>
                        </p>
                    </div>

                    {error && (
                        <div className="auth-error" role="alert">
                            <i className="fa-solid fa-circle-exclamation"></i>
                            {error}
                        </div>
                    )}

                    {success && (
                        <div className="auth-success" role="status">
                            <i className="fa-solid fa-circle-check"></i>
                            {success}
                        </div>
                    )}

                    <form className="auth-form" onSubmit={handleRegister} noValidate>
                        <div className="auth-field">
                            <label htmlFor="register-name">Full name</label>
                            <div className="auth-input-wrap">
                                <input
                                    id="register-name"
                                    type="text"
                                    placeholder="Your full name"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    required
                                    autoComplete="name"
                                />
                            </div>
                        </div>

                        <div className="auth-field">
                            <label htmlFor="register-email">Email address</label>
                            <div className="auth-input-wrap">
                                <input
                                    id="register-email"
                                    type="email"
                                    placeholder="you@example.com"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                    autoComplete="email"
                                />
                            </div>
                        </div>

                        <div className="auth-field">
                            <label htmlFor="register-password">Password</label>
                            <div className="auth-input-wrap">
                                <input
                                    id="register-password"
                                    className="has-password-toggle"
                                    type={showPassword ? 'text' : 'password'}
                                    placeholder="At least 6 characters"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                    minLength={6}
                                    autoComplete="new-password"
                                />
                                <button
                                    type="button"
                                    className="auth-password-toggle"
                                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                                    onClick={() => setShowPassword((visible) => !visible)}
                                >
                                    <i className={`fa-solid ${showPassword ? 'fa-eye-slash' : 'fa-eye'}`}></i>
                                </button>
                            </div>
                        </div>

                        <button
                            id="register-submit-btn"
                            type="submit"
                            className="auth-submit-btn"
                            disabled={submitting}
                        >
                            {submitting ? (
                                <>
                                    <span className="btn-spinner"></span>
                                    Creating account…
                                </>
                            ) : (
                                'Create Account'
                            )}
                        </button>
                    </form>

                    <p className="auth-footer-link">
                        Already have an account?{' '}
                        <Link to="/login">Sign in</Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Register;

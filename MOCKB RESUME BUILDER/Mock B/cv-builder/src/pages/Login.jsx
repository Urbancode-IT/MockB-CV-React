import { useState } from 'react';
import { useNavigate, Link, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthProvider';
import PageLoader from '../components/common/PageLoader';
import './Auth.css';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const [submitting, setSubmitting] = useState(false);
    const navigate = useNavigate();
    const { login, user, loading } = useAuth();

    if (loading) return <PageLoader label="Checking session…" />;
    if (user) return <Navigate to="/" replace />;

    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');
        const normalizedEmail = email.trim().toLowerCase();
        if (!normalizedEmail || !password) {
            setError('Enter your email address and password.');
            return;
        }
        setSubmitting(true);
        try {
            const res = await login({ email: normalizedEmail, password });
            if (res?.success) {
                navigate('/');
            } else {
                setError(res?.message || 'Login failed. Please try again.');
            }
        } catch (err) {
            setError(err.message || 'Login failed. Please try again.');
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
                        <h1>Welcome <span>back</span></h1>
                        <p>
                            Don&apos;t have an account?{' '}
                            <Link to="/register">Create one free</Link>
                        </p>
                    </div>

                    {error && (
                        <div className="auth-error" role="alert">
                            <i className="fa-solid fa-circle-exclamation"></i>
                            {error}
                        </div>
                    )}

                    <form className="auth-form" onSubmit={handleLogin} noValidate>
                        <div className="auth-field">
                            <label htmlFor="login-email">Email address</label>
                            <div className="auth-input-wrap">
                                <input
                                    id="login-email"
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
                            <label htmlFor="login-password">Password</label>
                            <div className="auth-input-wrap">
                                <input
                                    id="login-password"
                                    className="has-password-toggle"
                                    type={showPassword ? 'text' : 'password'}
                                    placeholder="Enter your password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                    autoComplete="current-password"
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
                            id="login-submit-btn"
                            type="submit"
                            className="auth-submit-btn"
                            disabled={submitting}
                        >
                            {submitting ? (
                                <>
                                    <span className="btn-spinner"></span>
                                    Signing in…
                                </>
                            ) : (
                                'Sign In'
                            )}
                        </button>
                    </form>

                    <p className="auth-footer-link">
                        Don&apos;t have an account?{' '}
                        <Link to="/register">Register here</Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Login;

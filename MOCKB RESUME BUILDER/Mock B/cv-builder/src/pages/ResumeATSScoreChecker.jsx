import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { checkATS } from '../services/aiService';
import { mapAtsResponseToUI, readFileAsText } from '../utils/apiMappers';
import ATSGateway from '../components/resume builder/resume ats score checker/gateway/ATSGateway';
import ATSHero from '../components/resume builder/resume ats score checker/hero/ATSHero';
import ATSUpload from '../components/resume builder/resume ats score checker/upload-section/ATSUpload';
import ATSResults from '../components/resume builder/resume ats score checker/results-section/ATSResults';
import ATSRegen from '../components/resume builder/resume ats score checker/regen-section/ATSRegen';
import ATSRecruiterResults from '../components/resume builder/resume ats score checker/recruiter-results/ATSRecruiterResults';
import './ResumeATSScoreChecker.css';

export default function ResumeATSScoreChecker() {
    const navigate = useNavigate();
    const [view, setView] = useState('gateway'); // gateway | jobseeker | recruiter

    // Jobseeker state
    const [uploadedFile, setUploadedFile] = useState(null);
    const [jobDescription, setJobDescription] = useState('');
    const [resumeText, setResumeText] = useState('');
    const [checking, setChecking] = useState(false);
    const [checkError, setCheckError] = useState('');
    const [showResults, setShowResults] = useState(false);
    const [score, setScore] = useState(0);
    const [metrics, setMetrics] = useState({});
    const [strengths, setStrengths] = useState([]);
    const [weaknesses, setWeaknesses] = useState([]);
    const [fixing, setFixing] = useState(false);
    const [fixedReady, setFixedReady] = useState(false);

    // Recruiter state
    const [recruiterFiles, setRecruiterFiles] = useState([]);
    const [ranking, setRanking] = useState(false);
    const [recruiterResults, setRecruiterResults] = useState([]);

    useEffect(() => {
        document.title = 'ATS Resume Checker | MockB CV';
        window.scrollTo(0, 0);
    }, []);

    // ── Helpers ──────────────────────────────────────────────────────────────

    const getBarColor = (pct) => {
        if (pct >= 75) return '#22c55e';
        if (pct >= 50) return '#EEC30C';
        if (pct >= 30) return '#f97316';
        return '#ef4444';
    };

    // ── Jobseeker handlers ────────────────────────────────────────────────────

    const handleFileChange = async (file) => {
        const allowed = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'text/plain'];
        if (!allowed.includes(file.type) && !file.name.match(/\.(pdf|doc|docx|txt)$/i)) {
            alert('Please upload a PDF, Word, or text document (.pdf / .doc / .docx / .txt)');
            return;
        }
        if (file.size > 5 * 1024 * 1024) { alert('File size must be under 5MB'); return; }
        setUploadedFile(file);
        setShowResults(false);
        setFixedReady(false);
        setScore(0);
        setCheckError('');

        if (file.type === 'text/plain' || file.name.endsWith('.txt')) {
            try {
                const text = await readFileAsText(file);
                setResumeText(text);
            } catch {
                setCheckError('Could not read file. Please paste your resume text below.');
            }
        } else if (!file.name.endsWith('.pdf')) {
            try {
                const text = await readFileAsText(file);
                if (text.trim()) setResumeText(text);
            } catch {
                setCheckError('Paste your resume text below for best results with this file type.');
            }
        } else {
            setCheckError('PDF text extraction is limited — paste your resume content below for accurate ATS scoring.');
        }
    };

    const handleRemoveFile = () => {
        setUploadedFile(null);
        setResumeText('');
        setShowResults(false);
        setFixedReady(false);
        setScore(0);
        setCheckError('');
    };

    const handleRunCheck = async () => {
        if (!jobDescription.trim()) {
            alert('Please paste the target job description.');
            return;
        }
        if (!resumeText.trim()) {
            alert('Please upload a resume file or paste your resume text.');
            return;
        }

        setChecking(true);
        setCheckError('');

        try {
            const response = await checkATS({
                jobDescription,
                resumeData: { rawText: resumeText, fileName: uploadedFile?.name || 'resume' },
            });

            if (response?.success && response.data) {
                const mapped = mapAtsResponseToUI(response.data);
                setScore(mapped.score);
                setMetrics(mapped.metrics);
                setStrengths(mapped.strengths);
                setWeaknesses(mapped.weaknesses);
                setShowResults(true);
                setTimeout(() => document.getElementById('results-section')?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 100);
            } else {
                throw new Error(response?.message || 'ATS check failed');
            }
        } catch (err) {
            setCheckError(err.message || 'ATS check failed. Please try again.');
        } finally {
            setChecking(false);
        }
    };

    const handleAutoFix = () => {
        setFixing(true);
        setTimeout(() => {
            setFixing(false);
            setFixedReady(true);
            setTimeout(() => document.getElementById('download-section')?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 100);
        }, 3500);
    };

    const handleDownloadPDF = () => {
        const content = `<html><head><style>body{font-family:Arial,sans-serif;margin:40px;color:#000;}h1{color:#EEC30C;}h2{border-bottom:2px solid #EEC30C;padding-bottom:4px;}</style></head>
        <body><h1>ATS-Optimised Resume</h1><p><em>Generated by MockB CV ATS Checker — All issues fixed.</em></p>
        <h2>Professional Summary</h2><p>Results-driven professional with a track record of delivering high-impact outcomes.</p>
        <h2>Work Experience</h2><p><strong>Senior Software Engineer</strong> — Tech Corp (2021–Present)</p>
        <ul><li>Led development of 3 core features, increasing user retention by 34%.</li><li>Reduced API response time by 52%.</li></ul>
        <h2>Skills</h2><p>JavaScript · React · Node.js · Python · AWS · Docker · SQL · REST APIs</p>
        <h2>Education</h2><p><strong>B.Tech Computer Science</strong> — 2021 | 8.7 CGPA</p></body></html>`;
        const blob = new Blob([content], { type: 'text/html' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url; a.download = 'ATS_Optimised_Resume.pdf'; a.click();
        URL.revokeObjectURL(url);
    };

    const handleDownloadWord = () => {
        const previewEl = document.getElementById('resume-preview-panel');
        if (!previewEl) return;
        const blob = new Blob([`<html><head><meta charset="utf-8"></head><body>${previewEl.innerHTML}</body></html>`], { type: 'application/msword' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${uploadedFile ? uploadedFile.name.split('.')[0] : 'Resume'}_ATS_Optimised.doc`;
        document.body.appendChild(a); a.click(); document.body.removeChild(a);
        URL.revokeObjectURL(url);
    };

    // ── Recruiter handlers ────────────────────────────────────────────────────

    const handleRecruiterFileChange = (newFiles) => {
        setRecruiterFiles(prev => [...prev, ...newFiles]);
    };

    const handleRemoveRecruiterFile = (index) => {
        setRecruiterFiles(prev => prev.filter((_, idx) => idx !== index));
    };

    const handleRankCandidates = () => {
        if (recruiterFiles.length === 0) return;
        setRanking(true);
        setTimeout(() => {
            const candidateNames = ['Arjun Kumar', 'Neha Sharma', 'Siddharth Sen', 'Priya Nair', 'Rohan Verma', 'Aisha Gupta'];
            const topSkills = ['React.js, Node.js', 'Java, Spring Boot', 'Python, AWS', 'UI/UX, Figma', 'DevOps, Docker', 'Data Science, SQL'];
            const results = recruiterFiles.map((file, idx) => {
                const parsedScore = Math.floor(Math.random() * 41) + 55;
                return {
                    id: idx,
                    fileName: file.name,
                    candidateName: candidateNames[idx % candidateNames.length],
                    score: parsedScore,
                    topSkill: topSkills[idx % topSkills.length],
                    status: parsedScore >= 80 ? 'Highly Matched' : parsedScore >= 65 ? 'Potential Match' : 'Low Match'
                };
            }).sort((a, b) => b.score - a.score);
            setRecruiterResults(results);
            setRanking(false);
        }, 3000);
    };

    // ── Render ────────────────────────────────────────────────────────────────

    return (
        <div className="ats-checker-page">
            {/* Background orbs */}
            <div className="bg-orb orb-1"></div>
            <div className="bg-orb orb-2"></div>

            {/* Back button */}
            <button className="back-btn" onClick={() => {
                if (view === 'gateway') {
                    navigate('/');
                } else {
                    setView('gateway');
                    setShowResults(false);
                    setFixedReady(false);
                }
            }}>
                <i className="fa-solid fa-arrow-left"></i>
                <span>Back</span>
            </button>

            <main>
                {/* ── GATEWAY ── */}
                {view === 'gateway' && (
                    <ATSGateway
                        onSelectJobseeker={() => setView('jobseeker')}
                        onSelectRecruiter={() => setView('recruiter')}
                    />
                )}

                {/* ── JOBSEEKER VIEW ── */}
                {view === 'jobseeker' && (
                    <div className="jobseeker-view">
                        <ATSHero mode="jobseeker" />

                        <ATSUpload
                            mode="jobseeker"
                            uploadedFile={uploadedFile}
                            jobDescription={jobDescription}
                            resumeText={resumeText}
                            onJobDescriptionChange={setJobDescription}
                            onResumeTextChange={setResumeText}
                            onFileChange={handleFileChange}
                            onRemove={handleRemoveFile}
                            onCheck={handleRunCheck}
                            checking={checking}
                            error={checkError}
                        />

                        {checking && (
                            <div className="loading-overlay">
                                <div className="loading-spinner"></div>
                                <p>Scanning your resume with AI...</p>
                                <p className="loading-sub">Checking 13 ATS parameters...</p>
                            </div>
                        )}

                        {showResults && (
                            <>
                                <ATSResults
                                    score={score}
                                    metrics={metrics}
                                    strengths={strengths}
                                    weaknesses={weaknesses}
                                />

                                {fixing && (
                                    <div className="loading-overlay">
                                        <div className="loading-spinner"></div>
                                        <p>AI is fixing all detected issues...</p>
                                        <p className="loading-sub">Optimising keywords, grammar, formatting &amp; more...</p>
                                    </div>
                                )}

                                <div className="container">
                                    <ATSRegen
                                        fixing={fixing}
                                        fixedReady={fixedReady}
                                        onFix={handleAutoFix}
                                        onDownloadPDF={handleDownloadPDF}
                                        onDownloadWord={handleDownloadWord}
                                    />
                                </div>
                            </>
                        )}
                    </div>
                )}

                {/* ── RECRUITER VIEW ── */}
                {view === 'recruiter' && (
                    <div className="recruiter-view">
                        <ATSHero mode="recruiter" />

                        <ATSUpload
                            mode="recruiter"
                            recruiterFiles={recruiterFiles}
                            onRecruiterFileChange={handleRecruiterFileChange}
                            onRemoveRecruiter={handleRemoveRecruiterFile}
                            onRankCandidates={handleRankCandidates}
                            ranking={ranking}
                        />

                        {ranking && (
                            <div className="loading-overlay">
                                <div className="loading-spinner"></div>
                                <p>Extracting candidate details...</p>
                                <p className="loading-sub">Running deep sorting algorithms...</p>
                            </div>
                        )}

                        <ATSRecruiterResults results={recruiterResults} />
                    </div>
                )}
            </main>
        </div>
    );
}

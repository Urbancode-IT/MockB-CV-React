import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import MainLayout from "./components/common/MainLayout";
import ProtectedRoute from "./components/common/ProtectedRoute";
import { AuthProvider } from "./context/AuthProvider";

import "./styles/variables.css";

// Existing Pages
import Home from "./pages/Home";
import About from "./pages/About";
import Login from "./pages/Login";
import Register from "./pages/Register";

import AIResumeBuilder from "./pages/AIResumeBuilder";
import AICoverLetterBuilder from "./pages/AICoverLetterBuilder";
import ResumeATSScoreChecker from "./pages/ResumeATSScoreChecker";
import CoverLetterATSScoreChecker from "./pages/CoverLetterATSScoreChecker";
import ResumeGuidelines from "./pages/ResumeGuidelines";
import CoverLetterGuidelines from "./pages/CoverLetterGuidelines";
import WhyPortfolio from "./pages/WhyPortfolio";

// Migrated Pages
import PortfolioBuilder from "./pages/PortfolioBuilder";
import RoleBasedResumeBuilder from "./pages/RoleBasedResumeBuilder";
import RoleBasedCoverLetterBuilder from "./pages/RoleBasedCoverLetterBuilder";
import JDResumeBuilder from "./pages/JDResumeBuilder";
import JDCoverLetterBuilder from "./pages/JDCoverLetterBuilder";
import ResumeUpgrader from "./pages/ResumeUpgrader";
import CoverLetterUpgrader from "./pages/CoverLetterUpgrader";
// Legacy component removed from imports
import CoverLetterCustomizer from "./pages/CoverLetterCustomizer";
import ResumeTemplates from "./pages/ResumeTemplates";
import CoverLetterTemplates from "./pages/CoverLetterTemplates";

// Dynamic Resume Template System
import ResumeBuilder from "./pages/ResumeBuilder";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>

          <Route element={<MainLayout />}>

            {/* Public Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            {/* Protected Routes */}
            <Route element={<ProtectedRoute />}>

              {/* Resume */}
              <Route path="/resume/ai-builder" element={<AIResumeBuilder />} />
              <Route path="/resume/ats-checker" element={<ResumeATSScoreChecker />} />
              <Route path="/resume/ats_checker" element={<ResumeATSScoreChecker />} />
              <Route path="/resume/role-based" element={<RoleBasedResumeBuilder />} />
              <Route path="/resume/jd-builder" element={<JDResumeBuilder />} />
              <Route path="/resume/guidelines" element={<ResumeGuidelines />} />
              {/* Dynamic Resume Builder mapped to /resume/customizer */}
              <Route path="/resume/customizer" element={<ResumeBuilder />} />
              <Route path="/resume/customizer/:id" element={<ResumeBuilder />} />
              <Route path="/resume/templates" element={<ResumeTemplates />} />

              {/* Cover Letter */}
              <Route path="/cover-letter/ai-builder" element={<AICoverLetterBuilder />} />
              <Route path="/cover-letter/ats-checker" element={<CoverLetterATSScoreChecker />} />
              <Route path="/cover-letter/ats_checker" element={<CoverLetterATSScoreChecker />} />
              <Route path="/cover-letter/role-based" element={<RoleBasedCoverLetterBuilder />} />
              <Route path="/cover-letter/jd-builder" element={<JDCoverLetterBuilder />} />
              <Route path="/cover-letter/guidelines" element={<CoverLetterGuidelines />} />
              <Route path="/cover-letter/upgrader" element={<CoverLetterUpgrader />} />
              <Route path="/cover-letter/customizer" element={<CoverLetterCustomizer />} />
              <Route path="/cover-letter/templates" element={<CoverLetterTemplates />} />

              {/* Portfolio */}
              <Route path="/portfolio-builder" element={<PortfolioBuilder />} />
              <Route path="/why-portfolio" element={<WhyPortfolio />} />

              {/* Legacy Routes */}
              <Route path="/ai-resume-builder" element={<AIResumeBuilder />} />
              <Route path="/ai-cover-letter-builder" element={<AICoverLetterBuilder />} />
              <Route path="/resume-customizer" element={<ResumeBuilder />} />
              <Route path="/cover-letter-customizer" element={<CoverLetterCustomizer />} />

            </Route>

          </Route>

        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;

import { createBrowserRouter, RouterProvider } from "react-router-dom";

import MainLayout from "./components/common/MainLayout";
import ProtectedRoute from "./components/common/ProtectedRoute";
import { AuthProvider } from "./context/AuthProvider";

import "./styles/variables.css";

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

import PortfolioBuilder from "./pages/PortfolioBuilder";
import RoleBasedResumeBuilder from "./pages/RoleBasedResumeBuilder";
import RoleBasedCoverLetterBuilder from "./pages/RoleBasedCoverLetterBuilder";
import JDResumeBuilder from "./pages/JDResumeBuilder";
import JDCoverLetterBuilder from "./pages/JDCoverLetterBuilder";
import ResumeUpgrader from "./pages/ResumeUpgrader";
import CoverLetterUpgrader from "./pages/CoverLetterUpgrader";
import CoverLetterCustomizer from "./pages/CoverLetterCustomizer";
import ResumeTemplates from "./pages/ResumeTemplates";
import CoverLetterTemplates from "./pages/CoverLetterTemplates";
import ResumeBuilder from "./pages/ResumeBuilder";

const router = createBrowserRouter([
    {
        element: <MainLayout />,
        children: [
            { path: "/", element: <Home /> },
            { path: "/about", element: <About /> },
            { path: "/login", element: <Login /> },
            { path: "/register", element: <Register /> },
            {
                element: <ProtectedRoute />,
                children: [
                    { path: "/resume/ai-builder", element: <AIResumeBuilder /> },
                    { path: "/resume/ats-checker", element: <ResumeATSScoreChecker /> },
                    { path: "/resume/ats_checker", element: <ResumeATSScoreChecker /> },
                    { path: "/resume/role-based", element: <RoleBasedResumeBuilder /> },
                    { path: "/resume/jd-builder", element: <JDResumeBuilder /> },
                    { path: "/resume/guidelines", element: <ResumeGuidelines /> },
                    { path: "/resume/customizer", element: <ResumeBuilder /> },
                    { path: "/resume/customizer/:id", element: <ResumeBuilder /> },
                    { path: "/resume/templates", element: <ResumeTemplates /> },
                    { path: "/cover-letter/ai-builder", element: <AICoverLetterBuilder /> },
                    { path: "/cover-letter/ats-checker", element: <CoverLetterATSScoreChecker /> },
                    { path: "/cover-letter/ats_checker", element: <CoverLetterATSScoreChecker /> },
                    { path: "/cover-letter/role-based", element: <RoleBasedCoverLetterBuilder /> },
                    { path: "/cover-letter/jd-builder", element: <JDCoverLetterBuilder /> },
                    { path: "/cover-letter/guidelines", element: <CoverLetterGuidelines /> },
                    { path: "/cover-letter/upgrader", element: <CoverLetterUpgrader /> },
                    { path: "/cover-letter/customizer", element: <CoverLetterCustomizer /> },
                    { path: "/cover-letter/templates", element: <CoverLetterTemplates /> },
                    { path: "/portfolio-builder", element: <PortfolioBuilder /> },
                    { path: "/why-portfolio", element: <WhyPortfolio /> },
                    { path: "/ai-resume-builder", element: <AIResumeBuilder /> },
                    { path: "/ai-cover-letter-builder", element: <AICoverLetterBuilder /> },
                    { path: "/resume-customizer", element: <ResumeBuilder /> },
                    { path: "/cover-letter-customizer", element: <CoverLetterCustomizer /> },
                ],
            },
        ],
    },
]);

function App() {
    return (
        <AuthProvider>
            <RouterProvider router={router} />
        </AuthProvider>
    );
}

export default App;

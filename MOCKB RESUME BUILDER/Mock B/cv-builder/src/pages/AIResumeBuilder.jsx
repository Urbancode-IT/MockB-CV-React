import React, { useEffect } from 'react';
import AIBHero from '../components/resume builder/ai resume builder ats friendly/hero/AIBHero';
import AIBHowItWorks from '../components/resume builder/ai resume builder ats friendly/how-it-works/AIBHowItWorks';
import AIBFeatures from '../components/resume builder/ai resume builder ats friendly/features/AIBFeatures';
import AIBPromptSection from '../components/resume builder/ai resume builder ats friendly/prompt-section/AIBPromptSection';
import AIBDownloadOptions from '../components/resume builder/ai resume builder ats friendly/download-options/AIBDownloadOptions';
import AIBFaq from '../components/resume builder/ai resume builder ats friendly/faq/AIBFaq';
import AIBCta from '../components/resume builder/ai resume builder ats friendly/cta/AIBCta';
import './AIResumeBuilder.css';

export default function AIResumeBuilder() {
  useEffect(() => {
    document.title = "AI Resume Builder ATS Friendly | MockB CV";
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="ai-builder-page fade-in">
      <main>
        <AIBHero />
        <AIBHowItWorks />
        <AIBFeatures />
        <AIBPromptSection />
        <AIBDownloadOptions />
        <AIBFaq />
        <AIBCta />
      </main>
    </div>
  );
}

import React from 'react';
import GLHero from '../components/resume builder/how to build resume key words and guidelines/hero/GLHero';
import GLGuidelines from '../components/resume builder/how to build resume key words and guidelines/guidelines/GLGuidelines';
import GLCta from '../components/resume builder/how to build resume key words and guidelines/cta/GLCta';
import './ResumeGuidelines.css';

export default function ResumeGuidelines() {
    return (
        <div className="guidelines-page-container fade-in">
            <main>
                <GLHero />
                <GLGuidelines />
                <GLCta />
            </main>
        </div>
    );
}

import { useEffect } from 'react';
import './JDResumeBuilder.css';

// Import newly created modular components
import JDHero from '../components/resume builder/creating resume based on job description/hero/JDHero';
import JDHowItWorks from '../components/resume builder/creating resume based on job description/how-it-works/JDHowItWorks';
import JDBuilderSection from '../components/resume builder/creating resume based on job description/builder-section/JDBuilderSection';
import JDFeatures from '../components/resume builder/creating resume based on job description/features/JDFeatures';
import JDTestimonials from '../components/resume builder/creating resume based on job description/testimonials/JDTestimonials';
import JDFaq from '../components/resume builder/creating resume based on job description/faq/JDFaq';
import JDCta from '../components/resume builder/creating resume based on job description/cta/JDCta';

export default function JDResumeBuilder() {
  // Intersection Observer for scroll animations (fade up effects)
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
        }
      });
    }, { threshold: 0.1 });

    const elements = document.querySelectorAll('.step-card, .feat-card, .testimonial-card, .input-card');
    elements.forEach(el => {
      el.style.opacity = '0';
      el.style.transform = 'translateY(30px)';
      el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <main className="jdrb-page">
      <JDHero />
      <JDHowItWorks />
      <JDBuilderSection />
      <JDFeatures />
      <JDTestimonials />
      <JDFaq />
      <JDCta />
    </main>
  );
}

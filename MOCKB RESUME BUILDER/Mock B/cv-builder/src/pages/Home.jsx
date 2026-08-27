import React, { useEffect } from 'react';
import './Home.css';
import Navbar from '../components/home/navbar/Navbar';
import Hero from '../components/home/hero/Hero';
import Features from '../components/home/features/Features';
import Showcase from '../components/home/showcase/Showcase';
import DetailedFeatures from '../components/home/detailed-features/DetailedFeatures';
import TemplatesGallery from '../components/home/templates-gallery/TemplatesGallery';
import CoreFeatures from '../components/home/core-features/CoreFeatures';
import CombinedFeatures from '../components/home/combined-features/CombinedFeatures';
import Testimonials from '../components/home/testimonials/Testimonials';
import TemplatesPromo from '../components/home/templates-promo/TemplatesPromo';
import HowItWorks from '../components/home/how-it-works/HowItWorks';
import UseCases from '../components/home/use-cases/UseCases';
import Footer from '../components/home/footer/Footer';

export default function Home() {
  useEffect(() => {
    // Simple Scroll Reveal Animation matching script.js
    const observerOptions = {
      threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('reveal-active');
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    const revealElements = document.querySelectorAll(
      '.feature-card, .highlight-section, .split-row, .bento-item, .review-card, .accordion-item, .templates-section'
    );
    
    revealElements.forEach(el => {
      el.classList.add('reveal-item');
      observer.observe(el);
    });

    return () => {
      revealElements.forEach(el => observer.unobserve(el));
    };
  }, []);

  return (
    <div className="home-page fade-in">
      <Navbar />
      <main>
        <Hero />
        <TemplatesGallery />
        <Features />
        <CoreFeatures />
        <CombinedFeatures />
        <Testimonials />
        <TemplatesPromo />
        <HowItWorks />
        <UseCases />
      </main>
      <Footer />
    </div>
  );
}

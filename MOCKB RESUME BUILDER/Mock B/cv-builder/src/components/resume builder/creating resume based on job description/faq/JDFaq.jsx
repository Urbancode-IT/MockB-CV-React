import React, { useState } from 'react';
import './JDFaq.css';

export default function JDFaq() {
  const [faqOpen, setFaqOpen] = useState({});

  const toggleFaq = (idx) => {
    setFaqOpen(prev => ({
      ...prev,
      [idx]: !prev[idx]
    }));
  };

  const faqs = [
    { q: 'Which job portals are supported?', a: 'You can paste job descriptions from any platform — LinkedIn, Naukri, Indeed, Monster, Glassdoor, company websites, or any other source. Just copy and paste the text.' },
    { q: 'Is the generated resume ATS-friendly?', a: 'Yes! Our AI is specifically trained to optimize resumes for Applicant Tracking Systems by embedding the right keywords in the right density and format.' },
    { q: 'Can I download in both PDF and Word?', a: 'Absolutely. After generating your resume, you can download it in either PDF format (ideal for most online applications) or Word format (great for further editing).' },
    { q: "I'm a fresh graduate with no experience. Can I still use this tool?", a: 'Absolutely! Even without full-time experience, you can paste the job description for an entry-level role or internship. Our AI will help you highlight your academic projects, internships, and relevant coursework that match the specific skills the employer is looking for.' },
    { q: 'Can I use this for internships or part-time roles?', a: 'Yes, the tool is perfect for all types of opportunities. Whether it\'s a high-stakes internship or a campus part-time job, tailoring your resume to the specific job description increases your chances of getting noticed by recruiters.' },
    { q: 'Will the AI write things I haven\'t actually done?', a: 'No, the AI is designed to rephrase and optimize your existing experience. It helps you describe your background using the specific terminology and keywords from the job description to ensure you pass ATS filters without compromising your honesty.' },
    { q: 'Is my data safe?', a: 'We take privacy seriously. Your resume data is processed in-session and is never stored on our servers or shared with third parties.' },
    { q: 'Can I use my own template?', a: 'Yes, you can choose from our curated template library including Modern, Classic, Minimal, and Bold styles — all designed to be ATS-compatible and visually impressive.' }
  ];

  return (
    <section className="faq-section container">
      <h2 className="section-title text-center">Frequently Asked <span>Questions</span></h2>
      <div className="faq-list">
        {faqs.map((item, idx) => (
          <div key={idx} className={`faq-item ${faqOpen[idx] ? 'open' : ''}`} onClick={() => toggleFaq(idx)}>
            <div className="faq-q">
              <span>{item.q}</span>
              <i className="fa-solid fa-plus"></i>
            </div>
            <div className="faq-a">{item.a}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

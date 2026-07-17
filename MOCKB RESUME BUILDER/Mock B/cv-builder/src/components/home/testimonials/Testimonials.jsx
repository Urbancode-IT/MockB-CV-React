import React from 'react';
import './Testimonials.css';

const REVIEWS = [
  {
    stars: 5,
    time: '2 days ago',
    text: '"MockB CV\'s AI tailored every bullet point to match the job description. I landed three interviews in one week — something that never happened before with my old resume."',
    avatar: 'RK',
    name: 'Rahul K.',
    role: 'Senior Software Engineer'
  },
  {
    stars: 5,
    time: '5 days ago',
    text: '"The ATS score checker is a game-changer. I could see exactly why my resume was being filtered out and fix it instantly. Got my first C-suite interview within a week."',
    avatar: 'SP',
    name: 'Sarah P.',
    role: 'VP of Operations'
  },
  {
    stars: 5,
    time: '1 week ago',
    text: '"As a fresh graduate I had no idea how to write a resume. MockB CV walked me through everything. The cover letter generator alone saved me hours of stress."',
    avatar: 'AM',
    name: 'Aisha M.',
    role: 'Recent Graduate, CS'
  },
  {
    stars: 4.5,
    time: '2 weeks ago',
    text: '"I was switching industries and didn\'t know how to reframe my experience. MockB CV\'s JD matching tool helped me present my skills in exactly the way recruiters were looking for."',
    avatar: 'JT',
    name: 'James T.',
    role: 'Career Changer → Product Manager'
  },
  {
    stars: 5,
    time: '3 weeks ago',
    text: '"The multi-language support is brilliant. I was able to create my resume in both English and French, which opened up so many more opportunities across Europe."',
    avatar: 'LB',
    name: 'Léa B.',
    role: 'Marketing Director'
  },
  {
    stars: 5,
    time: '1 month ago',
    text: '"Premium templates, real AI, and actual results. My ATS score went from 48 to 91 in under 10 minutes. This is the only resume tool you\'ll ever need."',
    avatar: 'DC',
    name: 'David C.',
    role: 'Finance Manager'
  }
];

export default function Testimonials() {
  return (
    <section id="testimonials" className="container">
      <div className="home-testimonials-header">
        <p className="home-testimonials-label">What People Say</p>
        <h2>Turn Your Resume into Real Opportunities Faster Than Ever</h2>
      </div>

      <div className="home-reviews-grid">
        {REVIEWS.map((rev, index) => (
          <div className="home-review-card" key={index}>
            <div className="home-review-top">
              <div className="home-review-stars">
                {[...Array(5)].map((_, i) => {
                  const starValue = i + 1;
                  if (starValue <= rev.stars) {
                    return <i key={i} className="fa-solid fa-star"></i>;
                  } else if (starValue - 0.5 === rev.stars) {
                    return <i key={i} className="fa-solid fa-star-half-stroke"></i>;
                  } else {
                    return <i key={i} className="fa-regular fa-star"></i>;
                  }
                })}
              </div>
              <span className="home-review-time">{rev.time}</span>
            </div>
            <p className="home-review-text">{rev.text}</p>
            <div className="home-review-author">
              <div className="home-author-avatar">{rev.avatar}</div>
              <div>
                <p className="home-author-name">{rev.name}</p>
                <p className="home-author-role">{rev.role}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

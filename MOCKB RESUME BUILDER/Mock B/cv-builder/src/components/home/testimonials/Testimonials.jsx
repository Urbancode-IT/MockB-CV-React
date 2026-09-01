import React from 'react';
import './Testimonials.css';

const REVIEWS = [
  {
    stars: 5,
    time: '2 days ago',
    text: '"The live preview made it easy to see exactly how my resume would look. I updated the layout and downloaded a clean PDF in one sitting."',
    avatar: 'RK',
    name: 'Rahul K.',
    role: 'Senior Software Engineer'
  },
  {
    stars: 5,
    time: '5 days ago',
    text: '"I liked being able to switch templates without losing my content. The two-page layout gave me enough room for projects and certifications."',
    avatar: 'SP',
    name: 'Sarah P.',
    role: 'VP of Operations'
  },
  {
    stars: 5,
    time: '1 week ago',
    text: '"As a fresh graduate I had no idea how to structure a resume. The sample templates showed me what to include and where."',
    avatar: 'AM',
    name: 'Aisha M.',
    role: 'Recent Graduate, CS'
  },
  {
    stars: 4.5,
    time: '2 weeks ago',
    text: '"I was switching industries and needed a cleaner format. Reordering sections and renaming headings helped me tell a better story."',
    avatar: 'JT',
    name: 'James T.',
    role: 'Career Changer → Product Manager'
  },
  {
    stars: 5,
    time: '3 weeks ago',
    text: '"The cover letter templates matched my resume style, so my application looked consistent from start to finish."',
    avatar: 'LB',
    name: 'Léa B.',
    role: 'Marketing Director'
  },
  {
    stars: 5,
    time: '1 month ago',
    text: '"Simple workflow: pick a template, edit sections, customize spacing, preview, download. Exactly what I needed."',
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
        <h2>Build a resume you are proud to send</h2>
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

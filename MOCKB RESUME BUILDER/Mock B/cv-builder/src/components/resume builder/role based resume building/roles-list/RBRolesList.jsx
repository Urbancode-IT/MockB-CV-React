import React from 'react';
import './RBRolesList.css';
import { categoryData } from '../data/roleData';

export default function RBRolesList({ selectedCatId, onBack, onSelectSubRole }) {
  const activeCategoryData = categoryData[selectedCatId] || categoryData.fullstack;

  const handleMouseMove = (e, card) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = (y - centerY) / 10;
    const rotateY = (centerX - x) / 10;
    card.style.transform = `translateY(-15px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  };

  const handleMouseLeave = (card) => {
    card.style.transform = `translateY(0) rotateX(0) rotateY(0)`;
  };

  return (
    <section className="roles-grid-section container">
      <div className="back-nav-wrapper">
        <button onClick={onBack} className="back-link">
          <i className="fa-solid fa-arrow-left-long"></i> Back to Role Selection
        </button>
      </div>
      <div className="section-header" style={{ textAlign: 'center', marginBottom: '0.5rem' }}>
        <h2 style={{ marginTop: 0, fontSize: '3rem', marginBottom: '0.1rem' }}>
          {activeCategoryData.title}
        </h2>
        <p style={{ marginTop: 0 }}>{activeCategoryData.desc}</p>
      </div>

      <div className="roles-container">
        {activeCategoryData.roles.map((role, idx) => (
          <div
            key={idx}
            className="role-card"
            onClick={() => onSelectSubRole(role.name)}
            onMouseMove={(e) => handleMouseMove(e, e.currentTarget)}
            onMouseLeave={(e) => handleMouseLeave(e.currentTarget)}
          >
            <div className="card-inner">
              <i className={`${role.icon} role-icon`}></i>
              <h3>{role.name}</h3>
              <p>{role.desc}</p>
              <button className="generate-btn">Generate</button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

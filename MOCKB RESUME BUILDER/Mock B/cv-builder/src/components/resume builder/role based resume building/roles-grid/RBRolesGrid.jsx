import React, { useEffect, useRef } from 'react';
import './RBRolesGrid.css';
import { categoriesList } from '../data/roleData';

export default function RBRolesGrid({ onSelectCategory }) {
  const slideshowRef = useRef(null);
  const animationRef = useRef(null);
  const scrollRef = useRef(0);

  // Infinite marquee animation
  useEffect(() => {
    const slideshow = slideshowRef.current;
    if (!slideshow) return;

    // Clone all items for seamless infinite scroll
    const items = Array.from(slideshow.children);
    items.forEach(item => {
      const clone = item.cloneNode(true);
      // Attach click handler to clone as well
      clone.addEventListener('click', () => {
        const catId = clone.getAttribute('data-cat-id');
        if (catId) onSelectCategory(catId);
      });
      slideshow.appendChild(clone);
    });

    let speed = 0.5;

    const animate = () => {
      scrollRef.current += speed;
      const halfWidth = slideshow.scrollWidth / 2;
      if (scrollRef.current >= halfWidth) scrollRef.current = 0;
      slideshow.scrollLeft = scrollRef.current;
      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    const pause = () => cancelAnimationFrame(animationRef.current);
    const resume = () => { animationRef.current = requestAnimationFrame(animate); };

    slideshow.addEventListener('mouseenter', pause);
    slideshow.addEventListener('mouseleave', resume);

    return () => {
      cancelAnimationFrame(animationRef.current);
      slideshow.removeEventListener('mouseenter', pause);
      slideshow.removeEventListener('mouseleave', resume);
    };
  }, [onSelectCategory]);

  // 3D Parallax hover for cards
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
    <section className="roles-grid-section container" id="role-selection">
      <div className="section-header">
        <h2>Select Your Job Role</h2>
        <p>Choose your specific career path to generate a tailored resume that matches industry expectations.</p>
      </div>

      {/* Horizontal Infinite Marquee Slideshow */}
      <div className="tabs-slideshow-container">
        <div className="role-tabs categories-slideshow" ref={slideshowRef}>
          {categoriesList.map(cat => (
            <div
              key={cat.id}
              className="role-tab"
              data-cat-id={cat.id}
              onClick={() => onSelectCategory(cat.id)}
            >
              {cat.label}
            </div>
          ))}
        </div>
      </div>

      {/* Role Cards Grid */}
      <div className="roles-container">
        {categoriesList.map((cat) => (
          <div
            key={cat.id}
            className="role-card"
            onClick={() => onSelectCategory(cat.id)}
            onMouseMove={(e) => handleMouseMove(e, e.currentTarget)}
            onMouseLeave={(e) => handleMouseLeave(e.currentTarget)}
          >
            <div className="card-inner">
              <i className={`fa-solid ${cat.icon} role-icon`}></i>
              <h3>{cat.label}</h3>
              <p>{cat.desc}</p>
              <button className="generate-btn">Open</button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

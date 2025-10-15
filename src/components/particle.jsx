import React, { useEffect } from 'react';
import './Particle.css'; // Create this file for particle-specific styles

const Particle = ({ x, y, size, color, speedX, speedY }) => {
  return (
    <div
      className="particle"
      style={{
        left: `${x}px`,
        top: `${y}px`,
        width: `${size}px`,
        height: `${size}px`,
        backgroundColor: color,
        transform: `translate(${speedX}px, ${speedY}px)`
      }}
    ></div>
  );
};

const ParticleSystem = () => {
  useEffect(() => {
    // This is a simple example. You can replace it with a more sophisticated particle system.
    const particles = [];
    const container = document.getElementById('particle-container');

    for (let i = 0; i < 50; i++) {
      const particle = {
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        size: Math.random() * 2 + 0.5,
        color: `rgba(${Math.floor(Math.random() * 100 + 155)}, ${Math.floor(Math.random() * 100 + 155)}, 255, ${Math.random() * 0.4 + 0.1})`, // Light blue-ish
        speedX: (Math.random() - 0.5) * 0.5,
        speedY: (Math.random() - 0.5) * 0.5
      };
      particles.push(particle);
    }

    const animateParticles = () => {
      particles.forEach(particle => {
        particle.x += particle.speedX;
        particle.y += particle.speedY;

        if (particle.x > window.innerWidth || particle.x < 0) particle.speedX = -particle.speedX;
        if (particle.y > window.innerHeight || particle.y < 0) particle.speedY = -particle.speedY;
      });

      // Re-render the particles
      const particleElements = particles.map((particle, index) => (
        <Particle key={index} {...particle} />
      ));

      container.innerHTML = '';
      container.appendChild(document.createElement('div')).innerHTML = particleElements.map(el => el.outerHTML).join('');

      requestAnimationFrame(animateParticles);
    };

    animateParticles();
  }, []);

  return (
    <div id="particle-container" className="particle-container"></div>
  );
};

export default ParticleSystem;
'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';

interface HeroProps {
  onCTA?: () => void;
}

export default function Hero({ onCTA }: HeroProps) {
  const parallaxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (parallaxRef.current) {
        const scrolled = window.scrollY;
        parallaxRef.current.style.transform = `translateY(${scrolled * 0.5}px)`;
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section id="hero" className="hero-section" style={{ marginTop: '-100px', paddingTop: '100px' }}>
      <div 
        ref={parallaxRef}
        className="hero-background parallax-layer"
        style={{ height: 'calc(100% + 100px)' }}
      >
        <Image 
          src="/ima/hero2.jpeg" 
          alt="Tiasa Hero"
          fill
          priority
          style={{ objectFit: 'cover' }}
        />
      </div>
      <div className="hero-overlay" />
      
      <div className="hero-content fade-in">
        <h1 className="hero-title">
          TAI<strong>SA</strong>
        </h1>
        <p className="hero-subtitle">
          Experience excellence in every detail. Where quality meets passion, and dreams become reality.
        </p>
        <button 
          onClick={onCTA}
          className="btn btn--accent mt-8"
        >
          Ayo Bergabung
        </button>
      </div>
      
      <div className="scroll-indicator">
        <div className="scroll-indicator-text">Scroll</div>
        <svg className="w-8 h-auto mx-auto" viewBox="0 0 48 23" fill="white">
          <path d="M24 0 L24 20 M12 14 L24 22 L36 14" stroke="currentColor" strokeWidth="2" fill="none"/>
        </svg>
      </div>
    </section>
  );
}

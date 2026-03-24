'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';

interface HeroProps {
  onCTA?: () => void;
}

export default function Hero({ onCTA }: HeroProps) {
  const parallaxRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Set --vh CSS variable to actual viewport height
    // Most compatible fix for mobile browsers (including Mi Browser)
    const setVh = () => {
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty('--vh', `${vh}px`);
    };
    setVh();
    window.addEventListener('resize', setVh);

    const handleScroll = () => {
      if (parallaxRef.current) {
        const scrolled = window.scrollY;
        parallaxRef.current.style.transform = `translateY(${scrolled * 0.5}px)`;
      }
    };

    // Trigger entrance animation after mount
    setTimeout(() => {
      setIsVisible(true);
    }, 100);

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', setVh);
    };
  }, []);

  return (
    <section id="hero" className="hero-section" style={{ marginTop: '-100px', paddingTop: '100px', height: 'calc(var(--vh, 1vh) * 100 + 100px)' }}>
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
      
      <div className={`hero-content fade-in ${isVisible ? 'visible' : ''}`}>
        <h1 className="hero-title">
          TIA<strong>SA</strong>
        </h1>
        <p className="hero-subtitle">
          Wujudkan impian anak Anda bersama kami. Kualitas terbaik, bimbingan penuh kasih sayang, dan masa depan cerah.
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

'use client';

import React, { useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface SectionProps {
  id: string;
  title: React.ReactNode;
  description: React.ReactNode;
  image: string;
  reverse?: boolean;
  buttonText?: string;
  buttonLink?: string;
  accentButton?: boolean;
  onCTA?: () => void;
}

export default function Section({
  id,
  title,
  description,
  image,
  reverse = false,
  buttonText,
  buttonLink = '#contact',
  accentButton = false,
  onCTA,
}: SectionProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;
      
      const rect = sectionRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      
      if (rect.top < windowHeight && rect.bottom > 0) {
        // Parallax effect for the section
        const yOffset = (rect.top - windowHeight / 2) * 0.1;
        if (contentRef.current) {
          contentRef.current.style.transform = `translateY(${yOffset}px)`;
        }
      }
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const elements = entry.target.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right');
            elements.forEach((el, index) => {
              setTimeout(() => {
                el.classList.add('visible');
              }, index * 100);
            });
          }
        });
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    window.addEventListener('scroll', handleScroll);
    handleScroll();

    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <section id={id} ref={sectionRef} className="section">
      <div className="absolute inset-0 bg-gradient-to-br from-[#faf8f5] to-white" />
      
      <div className="section-content relative z-10">
        <div className={`section-grid ${reverse ? 'section-grid--reverse' : ''}`}>
          <div ref={imageRef} className="section-image slide-in-left">
            <Image 
              src={image} 
              alt={typeof title === 'string' ? title : id}
              width={720}
              height={720}
              style={{ objectFit: 'cover' }}
            />
          </div>
          <div ref={contentRef} className="section-text slide-in-right">
            <h2 className="section-title">{title}</h2>
            <div className="section-description">{description}</div>
            {buttonText && (
              <div className="btn-container">
                {onCTA ? (
                  <button 
                    onClick={onCTA}
                    className={`btn ${accentButton ? 'btn--accent' : ''}`}
                  >
                    {buttonText}
                  </button>
                ) : (
                  <Link href={buttonLink} className={`btn ${accentButton ? 'btn--accent' : ''}`}>
                    {buttonText}
                  </Link>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

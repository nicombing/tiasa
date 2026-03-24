'use client';

import React, { useEffect, useRef } from 'react';
import Link from 'next/link';

export default function CTASection({ onCTA }: { onCTA?: () => void }) {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const content = entry.target.querySelector('.cta-content');
            if (content) content.classList.add('visible');
          }
        });
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    // Fallback Timer
    const timer = setTimeout(() => {
      const content = sectionRef.current?.querySelector('.cta-content');
      if (content && !content.classList.contains('visible')) {
        content.classList.add('visible');
      }
    }, 2000);

    return () => {
      observer.disconnect();
      clearTimeout(timer);
    };
  }, []);

  return (
    <section id="contact" ref={sectionRef} className="cta-section">
      <div className="cta-content fade-in">
        <h2 className="cta-title">Siap untuk memulai petualangan baru?</h2>
        <p className="cta-description">
          Kami senang mendengar dari Anda. Jika ada pertanyaan atau sekadar ingin menyapa, kami ada untuk Anda.
        </p>
        {onCTA ? (
          <button 
            onClick={onCTA}
            className="btn" 
            style={{ borderColor: 'white', color: 'white' }}
          >
            Bergabung Sekarang
          </button>
        ) : (
          <Link href="mailto:tiasaenglish@gmail.com" className="btn" style={{ borderColor: 'white', color: 'white' }}>
            Hubungi Kami
          </Link>
        )}
      </div>
    </section>
  );
}

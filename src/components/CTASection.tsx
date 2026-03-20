'use client';

import Link from 'next/link';

export default function CTASection({ onCTA }: { onCTA?: () => void }) {
  return (
    <section id="contact" className="cta-section">
      <div className="cta-content fade-in">
        <h2 className="cta-title">Ready to start your journey?</h2>
        <p className="cta-description">
          We&apos;d love to hear from you. Whether you have a question or just want to say hello, we&apos;re here for you.
        </p>
        {onCTA ? (
          <button 
            onClick={onCTA}
            className="btn" 
            style={{ borderColor: 'white', color: 'white' }}
          >
            Bersabung Sekarang
          </button>
        ) : (
          <Link href="mailto:hello@tiasa.com" className="btn" style={{ borderColor: 'white', color: 'white' }}>
            Get In Touch
          </Link>
        )}
      </div>
    </section>
  );
}

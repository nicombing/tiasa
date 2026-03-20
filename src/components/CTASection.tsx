'use client';

import Link from 'next/link';

export default function CTASection({ onCTA }: { onCTA?: () => void }) {
  return (
    <section id="contact" className="cta-section">
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

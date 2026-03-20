'use client';

import Image from 'next/image';

export default function Footer() {
  return (
    <footer className="footer py-16 px-4 bg-white border-t border-gray-50">
      <div className="max-w-4xl mx-auto flex flex-col items-center text-center">
        <div className="footer-logo mb-8">
          <Image 
            src="/ima/logo-tiasa.png" 
            alt="Tiasa English" 
            width={80} 
            height={60}
            className="opacity-70 grayscale hover:grayscale-0 transition-all duration-500"
          />
        </div>
        
        <div className="footer-info mb-10 space-y-1">
          <p className="text-[#9ea4b0] text-[15px] font-primary">
            © 2024 Tiasa English.
          </p>
          <p className="text-[#9ea4b0] text-[15px] font-primary">
            Membangun Masa Depan Melalui Bahasa.
          </p>
          <div className="pt-4">
            <a href="mailto:tiasaenglish@gmail.com" className="text-[#9ea4b0] hover:text-accent transition-colors text-sm font-primary">
              tiasaenglish@gmail.com
            </a>
          </div>
        </div>

        <div className="footer-links flex gap-8 items-center">
          <a 
            href="https://instagram.com/tiasaenglish" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="text-[#9ea4b0] hover:text-accent text-[15px] transition-colors font-primary"
          >
            @tiasaenglish
          </a>
          <a 
            href="#" 
            className="text-[#9ea4b0] hover:text-accent text-[15px] transition-colors font-primary"
          >
            TikTok
          </a>
          <a 
            href="#" 
            className="text-[#9ea4b0] hover:text-accent text-[15px] transition-colors font-primary"
          >
            YouTube
          </a>
        </div>
      </div>
    </footer>
  );
}

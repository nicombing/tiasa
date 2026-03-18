'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';

const navItems = [
  { href: '#about', label: 'About' },
  { href: '#services', label: 'Services' },
];

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {/* Desktop Header */}
      <header className={`header ${isScrolled ? '' : 'header--overlay'} hidden lg:block`}>
        <div className="header-inner">
          <nav className="header-nav">
            {navItems.map((item) => (
              <Link key={item.href} href={item.href} className={`header-nav-item ${!isScrolled ? 'text-white' : ''}`}>
                {item.label}
              </Link>
            ))}
          </nav>
          
          <Link href="/" className="header-branding">
            <Image 
              src="/ima/logo-tiasa.png" 
              alt="Tiasa" 
              width={120} 
              height={80}
              priority
            />
          </Link>
          
          <nav className="header-nav">
            <Link href="#contact" className={`header-nav-item ${!isScrolled ? 'text-white' : ''}`}>
              Contact
            </Link>
          </nav>
        </div>
      </header>

      {/* Mobile Header */}
      <div className="fixed top-0 left-0 w-full z-[1000] bg-transparent lg:hidden">
        <div className="flex justify-between items-center p-4">
          <Link href="/" className="relative z-[1001]">
            <Image 
              src="/ima/logo-tiasa.png" 
              alt="Tiasa" 
              width={100} 
              height={60}
              priority
            />
          </Link>
          <button 
            className="mobile-menu-btn relative z-[1001] text-white"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            <svg viewBox="0 0 24 18" className="w-6 h-6" fill="currentColor">
              <rect x="0" y="0" width="24" height="2"/>
              <rect x="0" y="8" width="24" height="2"/>
              <rect x="0" y="16" width="24" height="2"/>
            </svg>
          </button>
        </div>

        {/* Mobile Menu Overlay */}
        <div className={`mobile-menu ${mobileMenuOpen ? 'active' : ''}`}>
          <button 
            className="mobile-close absolute top-4 right-4 text-4xl"
            onClick={() => setMobileMenuOpen(false)}
          >
            &times;
          </button>
          <Link href="#about" onClick={() => setMobileMenuOpen(false)}>About</Link>
          <Link href="#services" onClick={() => setMobileMenuOpen(false)}>Services</Link>
          <Link href="#contact" onClick={() => setMobileMenuOpen(false)}>Contact</Link>
        </div>
      </div>
    </>
  );
}

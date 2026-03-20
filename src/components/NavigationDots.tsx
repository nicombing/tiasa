'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

const navItems = [
  { href: '#hero', label: 'Beranda' },
  { href: '#about', label: 'Tentang' },
  { href: '#services', label: 'Layanan' },
  { href: '#quality', label: 'Kualitas' },
  { href: '#innovation', label: 'Inovasi' },
  { href: '#testimonials', label: 'Cerita' },
  { href: '#contact', label: 'Kontak' },
];

export default function NavigationDots() {
  const [activeSection, setActiveSection] = useState('#hero');

  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll('section[id]');
      const scrollPos = window.scrollY + window.innerHeight / 3;

      sections.forEach((section) => {
        const htmlSection = section as HTMLElement;
        const sectionTop = htmlSection.offsetTop;
        const sectionHeight = htmlSection.offsetHeight;
        const sectionId = `#${section.getAttribute('id')}`;

        if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
          setActiveSection(sectionId);
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className="index-nav hidden lg:block">
      <div className="index-nav-inner">
        {navItems.map((item) => (
          <Link 
            key={item.href} 
            href={item.href} 
            className={`index-nav-item ${activeSection === item.href ? 'active' : ''}`}
          >
            <div className="index-nav-indicator" />
            <div className="index-nav-text">
              <span>{item.label}</span>
            </div>
          </Link>
        ))}
      </div>
    </nav>
  );
}

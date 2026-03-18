import { Chivo, Chewy } from 'next/font/google';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Section from '@/components/Section';
import CTASection from '@/components/CTASection';
import Footer from '@/components/Footer';
import NavigationDots from '@/components/NavigationDots';
import './globals.css';

const chivo = Chivo({
  subsets: ['latin'],
  weight: ['400', '700', '900'],
  variable: '--font-chivo',
  display: 'swap',
});

const chewy = Chewy({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-chewy',
  display: 'swap',
});

const sections = [
  {
    id: 'about',
    title: 'Old traditions, fresh beginnings.',
    description: "From celebrations to everyday moments, we've been your trusted partner in creating memories that last. Our commitment to quality and innovation sets us apart in everything we do.",
    image: 'https://images.squarespace-cdn.com/content/v1/599c75ede9bfdfe898f03f2a/d6f78351-7110-4362-8807-bb6cb6ef65db/Hearts.gif',
    reverse: false,
    buttonText: 'Learn More',
    buttonLink: '#contact',
    accentButton: true,
  },
  {
    id: 'services',
    title: 'Discover our world.',
    description: "Think of our services as the foundation of something extraordinary. Whether you're looking for inspiration, expertise, or partnership, we're here to make it happen.",
    image: 'https://images.squarespace-cdn.com/content/v1/599c75ede9bfdfe898f03f2a/4d1cbdc3-0601-4c48-b328-09ff93d8953b/New+Flavors.gif',
    reverse: true,
    buttonText: 'Explore',
    buttonLink: '#contact',
    accentButton: false,
  },
  {
    id: 'quality',
    title: 'Craft like the masters.',
    description: "Quality isn't just a word for us—it's our promise. Every detail matters, every moment counts, and every experience is designed to exceed your expectations.",
    image: 'https://images.squarespace-cdn.com/content/v1/599c75ede9bfdfe898f03f2a/dc17e2bf-4553-4e91-8058-30d7b45a27a5/Morsels.gif',
    reverse: false,
    buttonText: 'Get Started',
    buttonLink: '#contact',
    accentButton: true,
  },
  {
    id: 'innovation',
    title: 'Same vision, new horizons.',
    description: "Innovation drives us forward while staying true to our roots. We're constantly evolving, always improving, and forever committed to bringing you the best.",
    image: 'https://images.squarespace-cdn.com/content/v1/599c75ede9bfdfe898f03f2a/4a73d7b4-33ad-4ed3-a2bb-3f4c33ecd3b0/Holiday+Food+Colors.png',
    reverse: true,
    buttonText: 'Discover',
    buttonLink: '#contact',
    accentButton: false,
  },
  {
    id: 'testimonials',
    title: 'Words that inspire us.',
    description: "We're grateful for the trust you place in us. Your stories, your feedback, and your support drive us to keep raising the bar and deliver excellence in everything we do.",
    image: 'https://images.squarespace-cdn.com/content/v1/599c75ede9bfdfe898f03f2a/224a9585-2dc2-4928-b69d-c5d72bf1fc20/Promix-Whey-Promix-Puff-Bar-Birthday-Cake-2-2+copy.png',
    reverse: false,
    buttonText: 'Connect',
    buttonLink: '#contact',
    accentButton: true,
  },
];

export default function Home() {
  return (
    <div className={`${chivo.variable} ${chewy.variable}`} style={{ fontFamily: 'var(--font-chivo), sans-serif' }}>
      <Header />
      <main>
        <Hero />
        {sections.map((section) => (
          <Section key={section.id} {...section} />
        ))}
        <CTASection />
      </main>
      <Footer />
      <NavigationDots />
    </div>
  );
}

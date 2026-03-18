import { Chivo, Chewy } from 'next/font/google';
import Image from 'next/image';
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
    title: 'Anak sudah les bertahun-tahun, tapi masih malu bicara?',
    description: (
      <>
        Kebanyakan metode hanya fokus pada nilai ujian dan tata bahasa yang kaku, menciptakan <i>Silent Learners</i> (Anak yang pasif). Tiasa English hadir di Cisarua dengan pendekatan berbeda: Kami memprioritaskan Kepercayaan Diri di atas segalanya.
      </>
    ),
    image: '/ima/block1.png',
    reverse: false,
    buttonText: 'Learn More',
    buttonLink: '#contact',
    accentButton: true,
  },
  {
    id: 'services',
    title: 'Rahasia Kami: Jago Baca & Berani Cerita.',
    description: (
      <div className="flex flex-col gap-6 mt-8">
        <div className="flex items-center gap-6 p-6 bg-white rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow group">
          <div className="flex-shrink-0 w-24 h-24 bg-[#faf8f5] rounded-full flex items-center justify-center p-4 group-hover:bg-white transition-colors">
            <Image src="/ima/services1.png" alt="Phonics icon" width={80} height={80} className="object-contain" />
          </div>
          <div>
            <h3 className="font-display text-xl mb-1 text-black">Phonics: Kunci Jago Baca.</h3>
            <p className="text-gray-600 text-sm md:text-base leading-relaxed">
              Kami tidak menyuruh anak menghafal kata. Kami mengajarkan 42 bunyi suara bahasa Inggris. <b>Hasilnya?</b> Anak bisa merangkai dan membaca buku cerita apa pun secara mandiri!
            </p>
          </div>
        </div>
        
        <div className="flex items-center gap-6 p-6 bg-white rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow group">
          <div className="flex-shrink-0 w-24 h-24 bg-[#faf8f5] rounded-full flex items-center justify-center p-4 group-hover:bg-white transition-colors">
            <Image src="/ima/services2.png" alt="SFL icon" width={80} height={80} className="object-contain" />
          </div>
          <div>
            <h3 className="font-display text-xl mb-1 text-black">SFL: Kekuatan Berekspresi.</h3>
            <p className="text-gray-600 text-sm md:text-base leading-relaxed">
              Kami tidak mengajarkan rumus "Subject + Verb". Kami mengajarkan fungsi: bagaimana cara menyebutkan nama benda, menceritakan perasaan, dan menjelaskan aktivitas sehari-hari dengan natural.
            </p>
          </div>
        </div>
      </div>
    ),
    image: '/ima/block2.png',
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

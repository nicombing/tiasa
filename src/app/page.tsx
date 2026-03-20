'use client';

import React, { useState } from 'react';
import { Chivo, Chewy } from 'next/font/google';
import Image from 'next/image';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Section from '@/components/Section';
import CTASection from '@/components/CTASection';
import Footer from '@/components/Footer';
import NavigationDots from '@/components/NavigationDots';
import RegistrationModal from '@/components/RegistrationModal';
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
    buttonText: 'Ayo Bergabung',
    buttonLink: '#',
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
              Kami tidak mengajarkan rumus &quot;Subject + Verb&quot;. Kami mengajarkan fungsi: bagaimana cara menyebutkan nama benda, menceritakan perasaan, dan menjelaskan aktivitas sehari-hari dengan natural.
            </p>
          </div>
        </div>
      </div>
    ),
    image: '/ima/block2.png',
    reverse: true,
    buttonText: 'Ayo Bergabung',
    buttonLink: '#',
    accentButton: false,
  },
  {
    id: 'quality',
    title: 'Membangun Masa Depan Cerah.',
    description: "Kualitas bukan sekadar kata bagi kami—itu adalah janji kami. Setiap detail sangat berarti, setiap momen berharga, dan setiap pengalaman dirancang untuk melampaui harapan Anda.",
    image: '/ima/block4.png',
    reverse: false,
    buttonText: 'Ayo Bergabung',
    buttonLink: '#',
    accentButton: true,
  },
  {
    id: 'innovation',
    title: 'Pantau Keberanian Anak Anda Langsung dari Layar HP',
    description: "Tinggalkan buku raport yang membosankan. Melalui Tiasa Digital Tracker, orangtua akan menerima notifikasi mingguan berisi perkembangan anak anda. orangtua akan bisa melihat langsung kata apa yang sudah mereka kuasai dan seberapa lantang suara mereka hari ini.",
    image: '/ima/block6.png',
    reverse: true,
    buttonText: 'Ayo Bergabung',
    buttonLink: '#',
    accentButton: false,
  },
];


export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div className={`${chivo.variable} ${chewy.variable}`} style={{ fontFamily: 'var(--font-chivo), sans-serif' }}>
      <Header />
      <main>
        <Hero onCTA={openModal} />
        {sections.map((section) => (
          <Section key={section.id} {...section} onCTA={openModal} />
        ))}
        <CTASection onCTA={openModal} />
      </main>
      <Footer />
      <NavigationDots />
      
      <RegistrationModal isOpen={isModalOpen} onClose={closeModal} />
    </div>
  );
}

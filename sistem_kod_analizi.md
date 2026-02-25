# HASINDER-MEGA PROJESİ KOD ANALİZİ

## Dosya: app/page.tsx
```tsx
'use client';

import { useState } from 'react';
import HeroSection from './HeroSection';
import StatsSection from './StatsSection';
import PlatformFeatures from './PlatformFeatures';
import OpportunitiesSlider from './OpportunitiesSlider';
import MembershipPlans from './MembershipPlans';
import AboutSection from './AboutSection';
import MissionVision from './MissionVision';
import BusinessStats from './BusinessStats';
import SuccessStories from './SuccessStories';
import NewsSection from './NewsSection';
import MembershipModal from '../components/MembershipModal';

export default function Home() {
  const [showMembershipModal, setShowMembershipModal] = useState(false);

  const openMembershipModal = () => {
    setShowMembershipModal(true);
  };

  return (
    <main className="min-h-screen">
      <div className="pt-16">
        {/* Hero Section */}
        <HeroSection onMembershipClick={openMembershipModal} />
        <StatsSection />
        <PlatformFeatures />
        <OpportunitiesSlider />
        <NewsSection />
        <div id="uyelik">
          <MembershipPlans />
        </div>
        <div id="hakkimizda">
          {/* About Section */}
          <AboutSection />
        </div>
        <MissionVision />
        <BusinessStats />
        <SuccessStories />
      </div>

      <MembershipModal 
        isOpen={showMembershipModal} 
        onClose={() => setShowMembershipModal(false)} 
      />
    </main>
  );
}
```

## Dosya: app/layout.tsx
```tsx

import type { Metadata } from "next";
import { Geist, Geist_Mono, Pacifico } from "next/font/google";
import Header from "../components/Header";
import Footer from "../components/Footer";

const pacifico = Pacifico({
  weight: '400',
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-pacifico',
})

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Hatay İş Platformu",
  description: "Hatay'da iş fırsatları ve şirket tanıtımları",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr" suppressHydrationWarning={true}>
      <head>
        <link href="https://cdnjs.cloudflare.com/ajax/libs/remixicon/4.5.0/remixicon.min.css" rel="stylesheet" />
        <script src="https://cdn.tailwindcss.com"></script>
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${pacifico.variable} antialiased`}
      >
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
```

## Dosya: tailwind.config.js
```tsx
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./{app,components,libs,pages,hooks}/**/*.{html,js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [],
}

```

## Dosya: components/Header.tsx
```tsx
'use client';

import { useState } from 'react';
import Link from 'next/link';
import MembershipModal from './MembershipModal';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [language, setLanguage] = useState('TR');
  const [showLanguageDropdown, setShowLanguageDropdown] = useState(false);
  const [showMembershipModal, setShowMembershipModal] = useState(false);

  const toggleLanguage = (lang: string) => {
    setLanguage(lang);
    setShowLanguageDropdown(false);
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  const scrollToMembership = () => {
    // Ana sayfada değilsek önce ana sayfaya git
    if (window.location.pathname !== '/') {
      window.location.href = '/#uyelik';
    } else {
      // Ana sayfadaysak direkt scroll yap
      scrollToSection('uyelik');
    }
  };

  const openMembershipModal = () => {
    setShowMembershipModal(true);
    setIsMenuOpen(false);
  };

  return (
    <>
      <header className="bg-white shadow-sm border-b border-gray-100 fixed w-full top-0 z-50">
        <div className="mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Mobile Menu Button - Sol tarafta */}
            <div className="flex items-center">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="lg:hidden p-2 text-gray-700 hover:text-[#1B365D] cursor-pointer mr-3"
              >
                <i className={`${isMenuOpen ? 'ri-close-line' : 'ri-menu-line'} w-6 h-6 flex items-center justify-center`}></i>
              </button>

              {/* Logo */}
              <Link href="/" className="flex items-center">
                <div className="flex items-center space-x-3">
                  <img 
                    src="https://readdy.ai/api/search-image?query=Professional%20business%20handshake%20logo%20design%2C%20modern%20corporate%20partnership%20symbol%2C%20blue%20and%20gold%20colors%2C%20circular%20emblem%20with%20connected%20hands%20representing%20collaboration%20and%20business%20cooperation%2C%20clean%20minimalist%20background%2C%20professional%20branding%20style&width=60&height=60&seq=header-logo-001&orientation=squarish"
                    alt="Hatay İş Birliği Platformu Logo"
                    className="w-10 h-10 object-contain"
                  />
                  <div className="text-xl font-bold text-[#1B365D]" style={{fontFamily: 'Pacifico, serif'}}>
                    Hatay Platform
                  </div>
                </div>
              </Link>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-8">
              <Link href="/" className="text-gray-700 hover:text-[#1B365D] font-medium">
                Ana Sayfa
              </Link>
              <Link href="/hakkimizda" className="text-gray-700 hover:text-[#1B365D] font-medium">
                Hakkımızda
              </Link>
              <button
                onClick={openMembershipModal}
                className="text-gray-700 hover:text-[#1B365D] font-medium cursor-pointer"
              >
                Üyelik
              </button>
              <Link href="/akilli-eslestirme" className="text-gray-700 hover:text-[#1B365D] font-medium">
                Akıllı Eşleştirme
              </Link>
              <Link href="/kesfet" className="text-gray-700 hover:text-[#1B365D] font-medium">
                Firmaların Keşfet
              </Link>
              <Link href="/firsatlar/akilli-tarim" className="text-gray-700 hover:text-[#1B365D] font-medium">
                İş Birliği Fırsatları
              </Link>
              <Link href="/etkinlikler" className="text-gray-700 hover:text-[#1B365D] font-medium">
                Etkinlikler
              </Link>
              <Link href="/iletisim" className="text-gray-700 hover:text-[#1B365D] font-medium">
                İletişim
              </Link>
              <Link href="/haberler" className="text-gray-700 hover:text-[#1B365D] font-medium">
                Haberler
              </Link>
            </nav>

            {/* Right Side */}
            <div className="flex items-center space-x-4">
              {/* Language Selector */}
              <div className="relative">
                <button
                  onClick={() => setShowLanguageDropdown(!showLanguageDropdown)}
                  className="flex items-center text-gray-700 hover:text-[#1B365D] font-medium cursor-pointer"
                >
                  <span className="mr-1">{language}</span>
                  <i className={`ri-arrow-down-s-line w-4 h-4 flex items-center justify-center transition-transform ${showLanguageDropdown ? 'rotate-180' : ''}`}></i>
                </button>

                {showLanguageDropdown && (
                  <div className="absolute top-full right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg py-2 min-w-[80px] z-50">
                    <button
                      onClick={() => toggleLanguage('TR')}
                      className={`w-full px-4 py-2 text-left hover:bg-gray-50 cursor-pointer ${language === 'TR' ? 'bg-[#1B365D]/5 text-[#1B365D] font-medium' : 'text-gray-700'}`}
                    >
                      TR
                    </button>
                    <button
                      onClick={() => toggleLanguage('EN')}
                      className={`w-full px-4 py-2 text-left hover:bg-gray-50 cursor-pointer ${language === 'EN' ? 'bg-[#1B365D]/5 text-[#1B365D] font-medium' : 'text-gray-700'}`}
                    >
                      EN
                    </button>
                  </div>
                )}
              </div>

              {/* Auth Buttons */}
              <div className="hidden lg:flex items-center space-x-3">
                <Link
                  href="/giris"
                  className="text-[#1B365D] hover:text-[#D4AF37] font-medium whitespace-nowrap cursor-pointer"
                >
                  Üye Girişi
                </Link>
                <button
                  onClick={openMembershipModal}
                  className="bg-[#D4AF37] text-white px-4 py-2 rounded-lg hover:bg-[#B8941F] font-medium whitespace-nowrap cursor-pointer"
                >
                  Üye Ol
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden bg-white border-t border-gray-100">
            <div className="px-4 py-4 space-y-4">
              <Link href="/" className="block text-gray-700 hover:text-[#1B365D] font-medium">
                Ana Sayfa
              </Link>
              <Link href="/hakkimizda" className="block text-gray-700 hover:text-[#1B365D] font-medium">
                Hakkımızda
              </Link>
              <button
                onClick={openMembershipModal}
                className="block text-gray-700 hover:text-[#1B365D] font-medium text-left"
              >
                Üyelik
              </button>
              <Link href="/akilli-eslestirme" className="block text-gray-700 hover:text-[#1B365D] font-medium">
                Akıllı Eşleştirme
              </Link>
              <Link href="/kesfet" className="block text-gray-700 hover:text-[#1B365D] font-medium">
                Firmaların Keşfet
              </Link>
              <Link href="/firsatlar/akilli-tarim" className="block text-gray-700 hover:text-[#1B365D] font-medium">
                İş Birliği Fırsatları
              </Link>
              <Link href="/etkinlikler" className="block text-gray-700 hover:text-[#1B365D] font-medium">
                Etkinlikler
              </Link>
              <Link href="/iletisim" className="block text-gray-700 hover:text-[#1B365D] font-medium">
                İletişim
              </Link>
              <Link href="/haberler" className="block text-gray-700 hover:text-[#1B365D] font-medium">
                Haberler
              </Link>

              {/* Mobile Language Selector */}
              <div className="pt-2 border-t border-gray-100">
                <div className="text-sm text-gray-500 mb-2">Dil / Language</div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => toggleLanguage('TR')}
                    className={`px-3 py-1 rounded text-sm cursor-pointer ${language === 'TR' ? 'bg-[#1B365D] text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
                  >
                    TR
                  </button>
                  <button
                    onClick={() => toggleLanguage('EN')}
                    className={`px-3 py-1 rounded text-sm cursor-pointer ${language === 'EN' ? 'bg-[#1B365D] text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
                  >
                    EN
                  </button>
                </div>
              </div>

              <div className="pt-4 border-t border-gray-100 space-y-3">
                <Link
                  href="/giris"
                  className="block text-[#1B365D] hover:text-[#D4AF37] font-medium"
                >
                  Üye Girişi
                </Link>
                <button
                  onClick={openMembershipModal}
                  className="block bg-[#D4AF37] text-white px-4 py-2 rounded-lg hover:bg-[#B8941F] font-medium text-center w-full"
                >
                  Üye Ol
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Dropdown dışına tıklandığında kapatmak için overlay */}
        {showLanguageDropdown && (
          <div 
            className="fixed inset-0 z-40"
            onClick={() => setShowLanguageDropdown(false)}
          />
        )}
      </header>

      {/* Membership Modal */}
      <MembershipModal 
        isOpen={showMembershipModal} 
        onClose={() => setShowMembershipModal(false)} 
      />
    </>
  );
}
```

## Dosya: components/Footer.tsx
```tsx
'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function Footer() {
  const [email, setEmail] = useState('');

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Newsletter kayıt işlemi
    console.log('Newsletter kayıt:', email);
    setEmail('');
  };

  return (
    <footer className="bg-[#1B365D] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Logo ve Açıklama */}
          <div className="lg:col-span-1">
            <div className="flex items-center space-x-3 mb-4">
              <img 
                src="https://readdy.ai/api/search-image?query=Professional%20business%20handshake%20logo%20design%2C%20modern%20corporate%20partnership%20symbol%2C%20blue%20and%20gold%20colors%2C%20circular%20emblem%20with%20connected%20hands%20representing%20collaboration%20and%20business%20cooperation%2C%20clean%20minimalist%20background%2C%20professional%20branding%20style&width=50&height=50&seq=footer-logo-001&orientation=squarish"
                alt="Hatay İş Birliği Platformu Logo"
                className="w-8 h-8 object-contain"
              />
              <div className="text-xl font-bold text-[#D4AF37]" style={{fontFamily: 'Pacifico, serif'}}>
                Hatay Platform
              </div>
            </div>
            <p className="text-gray-300 mb-6">
              Hatay'ın geleceğine yön veren iş birliği platformu. Yatırımcılar ve girişimcileri bir araya getiriyoruz.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-300 hover:text-[#D4AF37] cursor-pointer">
                <i className="ri-facebook-fill w-5 h-5 flex items-center justify-center"></i>
              </a>
              <a href="#" className="text-gray-300 hover:text-[#D4AF37] cursor-pointer">
                <i className="ri-twitter-fill w-5 h-5 flex items-center justify-center"></i>
              </a>
              <a href="#" className="text-gray-300 hover:text-[#D4AF37] cursor-pointer">
                <i className="ri-linkedin-fill w-5 h-5 flex items-center justify-center"></i>
              </a>
              <a href="#" className="text-gray-300 hover:text-[#D4AF37] cursor-pointer">
                <i className="ri-instagram-fill w-5 h-5 flex items-center justify-center"></i>
              </a>
            </div>
          </div>

          {/* Hızlı Linkler */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Hızlı Linkler</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/hakkimizda" className="text-gray-300 hover:text-[#D4AF37] cursor-pointer">
                  Hakkımızda
                </Link>
              </li>
              <li>
                <Link href="/uyeligin" className="text-gray-300 hover:text-[#D4AF37] cursor-pointer">
                  Üyelik
                </Link>
              </li>
              <li>
                <Link href="/firsatlar" className="text-gray-300 hover:text-[#D4AF37] cursor-pointer">
                  İş Birliği Fırsatları
                </Link>
              </li>
              <li>
                <Link href="/etkinlikler" className="text-gray-300 hover:text-[#D4AF37] cursor-pointer">
                  Etkinlikler
                </Link>
              </li>
              <li>
                <Link href="/haberler" className="text-gray-300 hover:text-[#D4AF37] transition-colors">
                  Haberler
                </Link>
              </li>
            </ul>
          </div>

          {/* Hizmetler */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Hizmetler</h3>
            <ul className="space-y-3">
              <li>
                <a href="#" className="text-gray-300 hover:text-[#D4AF37] cursor-pointer">
                  Yatırımcı Eşleştirme
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-[#D4AF37] cursor-pointer">
                  Proje Danışmanlığı
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-[#D4AF37] cursor-pointer">
                  İş Geliştirme
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-[#D4AF37] cursor-pointer">
                  Eğitim Programları
                </a>
              </li>
            </ul>
          </div>

          {/* İletişim ve Bülten */}
          <div>
            <h3 className="text-lg font-semibold mb-4">İletişim</h3>
            <div className="space-y-3 mb-6">
              <div className="flex items-start space-x-3">
                <i className="ri-map-pin-line w-5 h-5 flex items-center justify-center mt-1 text-[#D4AF37]"></i>
                <span className="text-gray-300 text-sm">
                  Antakya Teknokent, Hatay Mustafa Kemal Üniversitesi Kampüsü
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <i className="ri-phone-line w-5 h-5 flex items-center justify-center text-[#D4AF37]"></i>
                <span className="text-gray-300 text-sm">+90 326 123 45 67</span>
              </div>
              <div className="flex items-center space-x-3">
                <i className="ri-mail-line w-5 h-5 flex items-center justify-center text-[#D4AF37]"></i>
                <span className="text-gray-300 text-sm">info@hatayplatform.com</span>
              </div>
            </div>

            {/* Bülten Kayıt */}
            <div>
              <h4 className="font-medium mb-3">Bülten Kayıt</h4>
              <form onSubmit={handleNewsletterSubmit} className="flex">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="E-posta adresiniz"
                  className="flex-1 px-3 py-2 text-sm bg-white/10 border border-white/20 rounded-l-lg focus:outline-none focus:border-[#D4AF37] text-white placeholder-gray-400"
                  required
                />
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#D4AF37] hover:bg-[#B8941F] rounded-r-lg whitespace-nowrap cursor-pointer"
                >
                  <i className="ri-send-plane-line w-4 h-4 flex items-center justify-center"></i>
                </button>
              </form>
            </div>
          </div>
        </div>

        <div className="border-t border-white/20 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">
            © 2024 Hatay İş Birliği Platformu. Tüm hakları saklıdır.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link href="/gizlilik" className="text-gray-400 hover:text-[#D4AF37] text-sm cursor-pointer">
              Gizlilik Politikası
            </Link>
            <Link href="/kullanim" className="text-gray-400 hover:text-[#D4AF37] text-sm cursor-pointer">
              Kullanım Şartları
            </Link>
            <Link href="/site-haritasi" className="text-gray-400 hover:text-[#D4AF37] text-sm cursor-pointer">
              Site Haritası
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
```

## Dosya: package.json
```tsx
{
  "name": "hasinder",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint"
  },
  "dependencies": {
    "@neondatabase/serverless": "^1.0.2",
    "@prisma/client": "^6.19.0",
    "axios": "^1.13.4",
    "facebook-nodejs-business-sdk": "^24.0.1",
    "form-data": "^4.0.5",
    "googleapis": "^170.1.0",
    "next": "^15.5.3",
    "react": "19.0.0",
    "react-dom": "19.0.0",
    "twitter-api-v2": "^1.29.0"
  },
  "devDependencies": {
    "@types/node": "^20",
    "@types/react": "^19",
    "@types/react-dom": "^19",
    "autoprefixer": "^10.4.21",
    "eslint": "^8",
    "eslint-config-next": "15.1.3",
    "postcss": "^8.5.6",
    "prisma": "^6.19.0",
    "tailwindcss": "^3.4.17",
    "typescript": "^5"
  }
}
```


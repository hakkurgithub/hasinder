
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
              <Link href="/basinda-biz" className="text-gray-700 hover:text-[#1B365D] font-medium">
                Son Dakika Ekonomi Haberleri
              </Link>
              <Link href="/iletisim" className="text-gray-700 hover:text-[#1B365D] font-medium">
                İletişim
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
              <Link href="/basinda-biz" className="block text-gray-700 hover:text-[#1B365D] font-medium">
                Son Dakika Ekonomi Haberleri
              </Link>
              <Link href="/iletisim" className="block text-gray-700 hover:text-[#1B365D] font-medium">
                İletişim
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

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

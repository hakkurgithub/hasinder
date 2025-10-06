'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

const slides = [
  {
    id: 1,
    title: "Hatay İş Dünyasının Dijital Merkezi",
    subtitle: "İş insanları, üreticiler ve yatırımcıları bir araya getiren güçlü B2B ağı",
    image: "https://readdy.ai/api/search-image?query=Modern%20business%20networking%20platform%20with%20diverse%20Turkish%20professionals%20connecting%20and%20collaborating%20in%20bright%20corporate%20environment%2C%20Mediterranean%20business%20district%20with%20modern%20offices%20and%20networking%20events%2C%20clean%20professional%20atmosphere%20with%20handshakes%20and%20digital%20connectivity&width=1920&height=1080&seq=b2bhero1&orientation=landscape",
    cta: "Hemen Üye Ol"
  },
  {
    id: 2,
    title: "Dijital Kartvizitiniz Hazır",
    subtitle: "Firmanızı dijital ortamda profesyonelce tanıtın, yeni iş fırsatları yakalayın",
    image: "https://readdy.ai/api/search-image?query=Digital%20business%20card%20and%20online%20profile%20showcase%20with%20modern%20interface%20displaying%20company%20information%2C%20bright%20clean%20design%20with%20Turkish%20business%20professionals%20using%20digital%20platforms%2C%20contemporary%20office%20space%20with%20technology%20integration&width=1920&height=1080&seq=b2bhero2&orientation=landscape",
    cta: "Profil Oluştur"
  },
  {
    id: 3,
    title: "İş Birliği Fırsatları Sizi Bekliyor",
    subtitle: "Sektörünüzdeki diğer firmalarla ortaklık kurun, birlikte büyüyün",
    image: "https://readdy.ai/api/search-image?query=Business%20partnership%20and%20collaboration%20opportunities%20with%20entrepreneurs%20meeting%20in%20modern%20conference%20room%2C%20bright%20professional%20environment%20with%20contract%20signing%20and%20partnership%20agreements%2C%20successful%20business%20collaboration%20in%20Mediterranean%20setting&width=1920&height=1080&seq=b2bhero3&orientation=landscape",
    cta: "Fırsatları Keşfet"
  }
];

interface HeroSectionProps {
  onMembershipClick?: () => void;
}

export default function HeroSection({ onMembershipClick }: HeroSectionProps) {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  return (
    <section className="relative h-screen overflow-hidden">
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentSlide ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: `url(${slide.image})` }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-[#1B365D]/80 to-[#1B365D]/40"></div>
          </div>

          <div className="relative z-10 h-full flex items-center">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
              <div className="max-w-3xl">
                <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
                  {slide.title}
                </h1>
                <p className="text-xl md:text-2xl text-gray-200 mb-8 leading-relaxed">
                  {slide.subtitle}
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link
                    href="/firsatlar/1"
                    className="bg-[#D4AF37] text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-[#B8941F] hover:scale-105 hover:shadow-lg transition-all duration-300 whitespace-nowrap cursor-pointer inline-block text-center transform"
                  >
                    Fırsatları Keşfet
                  </Link>
                  <button
                    onClick={onMembershipClick}
                    className="bg-white/20 backdrop-blur-sm border-2 border-white text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-white hover:text-[#1B365D] hover:scale-105 hover:shadow-lg transition-all duration-300 whitespace-nowrap cursor-pointer inline-block text-center transform"
                  >
                    Hemen Üye Ol
                  </button>
                  <Link
                    href="/kesfet"
                    className="bg-transparent border-2 border-[#D4AF37] text-[#D4AF37] px-8 py-4 rounded-lg text-lg font-semibold hover:bg-[#D4AF37] hover:text-white hover:scale-105 hover:shadow-lg transition-all duration-300 whitespace-nowrap cursor-pointer inline-block text-center transform"
                  >
                    Firmaları Keşfet
                  </Link>
                  {/*  /basinda-biz butonu tamamen çıkarıldı  */}
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Quick Stats */}
      <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 z-20 hidden md:block">
        <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-6 shadow-lg">
          <div className="grid grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-2xl font-bold text-[#1B365D] mb-1">850+</div>
              <div className="text-gray-600 text-sm">Aktif Firma</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-[#D4AF37] mb-1">320+</div>
              <div className="text-gray-600 text-sm">İş Birliği</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-[#1B365D] mb-1">45+</div>
              <div className="text-gray-600 text-sm">Sektör</div>
            </div>
          </div>
        </div>
      </div>

      {/* Slide Indicators */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20">
        <div className="flex space-x-3">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full transition-colors cursor-pointer ${
                index === currentSlide ? 'bg-[#D4AF37]' : 'bg-white/50'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={() => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)}
        className="absolute left-6 top-1/2 transform -translate-y-1/2 z-20 bg-white/20 hover:bg-white/30 text-white p-3 rounded-full backdrop-blur-sm cursor-pointer"
      >
        <i className="ri-arrow-left-line w-6 h-6 flex items-center justify-center"></i>
      </button>
      <button
        onClick={() => setCurrentSlide((prev) => (prev + 1) % slides.length)}
        className="absolute right-6 top-1/2 transform -translate-y-1/2 z-20 bg-white/20 hover:bg-white/30 text-white p-3 rounded-full backdrop-blur-sm cursor-pointer"
      >
        <i className="ri-arrow-right-line w-6 h-6 flex items-center justify-center"></i>
      </button>
    </section>
  );
}


'use client';

import { useState, useEffect } from 'react';

const stats = [
  {
    id: 1,
    number: 1250,
    label: "Aktif Üye",
    icon: "ri-team-line",
    color: "text-[#D4AF37]"
  },
  {
    id: 2,
    number: 89,
    label: "Tamamlanan Proje",
    icon: "ri-checkbox-circle-line",
    color: "text-[#1B365D]"
  },
  {
    id: 3,
    number: 245,
    label: "Toplam Yatırım (Milyon ₺)",
    icon: "ri-money-dollar-circle-line",
    color: "text-[#D4AF37]"
  },
  {
    id: 4,
    number: 156,
    label: "Başarılı Ortaklık",
    icon: "ri-handshake-line",
    color: "text-[#1B365D]"
  }
];

export default function StatsSection() {
  const [animatedNumbers, setAnimatedNumbers] = useState<{[key: number]: number}>({});
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true);
          animateNumbers();
        }
      },
      { threshold: 0.3 }
    );

    const section = document.getElementById('stats-section');
    if (section) {
      observer.observe(section);
    }

    return () => observer.disconnect();
  }, [isVisible]);

  const animateNumbers = () => {
    stats.forEach((stat) => {
      let current = 0;
      const increment = stat.number / 50;
      const timer = setInterval(() => {
        current += increment;
        if (current >= stat.number) {
          current = stat.number;
          clearInterval(timer);
        }
        setAnimatedNumbers(prev => ({
          ...prev,
          [stat.id]: Math.floor(current)
        }));
      }, 40);
    });
  };

  return (
    <section id="stats-section" className="py-12 bg-[#1B365D]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-white mb-3">
            Öne Çıkan Rakamlar
          </h2>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Platformumuzun başarısını gösteren güçlü veriler
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat) => (
            <div
              key={stat.id}
              className="text-center bg-white/5 backdrop-blur-sm rounded-xl p-6 hover:bg-white/10 transition-colors"
            >
              <div className="flex items-center justify-center mb-3">
                <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center">
                  <i className={`${stat.icon} w-6 h-6 flex items-center justify-center text-[#D4AF37]`}></i>
                </div>
              </div>
              <div className={`text-3xl font-bold mb-2 ${stat.color}`}>
                {animatedNumbers[stat.id] || 0}
                {stat.label.includes('Milyon') && '+'}
              </div>
              <div className="text-gray-300 font-medium text-sm">
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 max-w-3xl mx-auto">
            <h3 className="text-xl font-bold text-white mb-3">
              Büyümeye Devam Ediyoruz
            </h3>
            <p className="text-gray-300 mb-4 leading-relaxed text-sm">
              Her geçen gün daha fazla girişimci ve yatırımcı platformumuza katılıyor. 
              Birlikte Hatay'ın ekonomik geleceğini şekillendiriyoruz.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-xl font-bold text-[#D4AF37] mb-1">%89</div>
                <div className="text-gray-300 text-xs">Başarı Oranı</div>
              </div>
              <div>
                <div className="text-xl font-bold text-[#D4AF37] mb-1">24/7</div>
                <div className="text-gray-300 text-xs">Platform Erişimi</div>
              </div>
              <div>
                <div className="text-xl font-bold text-[#D4AF37] mb-1">15+</div>
                <div className="text-gray-300 text-xs">Farklı Sektör</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

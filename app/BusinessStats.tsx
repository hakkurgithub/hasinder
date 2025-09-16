'use client';

import { useState, useEffect } from 'react';

const stats = [
  {
    id: 1,
    number: 850,
    label: "Aktif Firma",
    icon: "ri-building-line",
    color: "text-[#D4AF37]",
    suffix: "+"
  },
  {
    id: 2,
    number: 320,
    label: "Başarılı İş Birliği",
    icon: "ri-handshake-line",
    color: "text-[#1B365D]",
    suffix: "+"
  },
  {
    id: 3,
    number: 45,
    label: "Farklı Sektör",
    icon: "ri-pie-chart-line",
    color: "text-[#D4AF37]",
    suffix: "+"
  },
  {
    id: 4,
    number: 125,
    label: "Milyon ₺ İş Hacmi",
    icon: "ri-money-dollar-circle-line",
    color: "text-[#1B365D]",
    suffix: "M+"
  }
];

const sectors = [
  { name: "Gıda & Tarım", companies: 185, icon: "ri-plant-line" },
  { name: "İnşaat & Gayrimenkul", companies: 142, icon: "ri-building-4-line" },
  { name: "Teknoloji & Yazılım", companies: 89, icon: "ri-computer-line" },
  { name: "Turizm & Konaklama", companies: 76, icon: "ri-hotel-line" },
  { name: "Lojistik & Nakliye", companies: 68, icon: "ri-truck-line" },
  { name: "Üretim & Sanayi", companies: 52, icon: "ri-settings-3-line" }
];

export default function BusinessStats() {
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

    const section = document.getElementById('business-stats');
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
    <section id="business-stats" className="py-20 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-[#1B365D] mb-4">
            Hatay'ın Güçlü İş Ağı
          </h2>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto font-medium">
            Bölgenin en büyük B2B platformunda binlerce firma bir arada
          </p>
        </div>

        {/* Ana İstatistikler */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {stats.map((stat) => (
            <div
              key={stat.id}
              className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow text-center border border-gray-100"
            >
              <div className="flex items-center justify-center mb-4">
                <div className="w-16 h-16 bg-[#D4AF37]/10 rounded-full flex items-center justify-center">
                  <i className={`${stat.icon} w-8 h-8 flex items-center justify-center ${stat.color}`}></i>
                </div>
              </div>
              <div className={`text-4xl lg:text-5xl font-bold mb-2 ${stat.color}`}>
                {animatedNumbers[stat.id] || 0}{stat.suffix}
              </div>
              <div className="text-gray-700 font-medium">
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* Sektör Dağılımı */}
        <div className="bg-white rounded-2xl p-8 shadow-lg">
          <h3 className="text-2xl font-bold text-[#1B365D] mb-8 text-center">
            Sektör Dağılımı
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sectors.map((sector, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-[#D4AF37]/10 rounded-full flex items-center justify-center">
                    <i className={`${sector.icon} w-5 h-5 flex items-center justify-center text-[#D4AF37]`}></i>
                  </div>
                  <span className="font-medium text-[#1B365D]">{sector.name}</span>
                </div>
                <span className="text-[#D4AF37] font-bold">{sector.companies}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-16 text-center">
          <div className="bg-gradient-to-r from-[#1B365D] to-[#2A4A6B] rounded-2xl p-8 text-white">
            <h3 className="text-2xl font-bold mb-4">
              Platform Büyümeye Devam Ediyor
            </h3>
            <p className="text-gray-300 mb-6 leading-relaxed max-w-3xl mx-auto">
              Her ay yeni firmalar katılıyor, yeni iş birlikleri kuruluyor. 
              Hatay'ın dijital iş dünyasının bir parçası olun.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-2xl mx-auto">
              <div>
                <div className="text-2xl font-bold text-[#D4AF37] mb-1">%35</div>
                <div className="text-gray-300 text-sm">Aylık Büyüme</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-[#D4AF37] mb-1">7/24</div>
                <div className="text-gray-300 text-sm">Platform Erişimi</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-[#D4AF37] mb-1">%92</div>
                <div className="text-gray-300 text-sm">Üye Memnuniyeti</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
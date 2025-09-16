
'use client';

import { useState } from 'react';
import Link from 'next/link';

const opportunities = [
  {
    id: 1,
    title: "Akıllı Tarım Yönetim Sistemi",
    category: "Teknoloji & Tarım",
    investment: "3.8M ₺",
    duration: "24 ay",
    description: "Hatay'ın zeytin, narenciye ve sebze üretiminde IoT sensörleri, yapay zeka ve otonom robotlarla tam entegre akıllı tarım çözümü",
    image: "https://readdy.ai/api/search-image?query=Advanced%20smart%20agriculture%20system%20with%20IoT%20sensors%20monitoring%20olive%20and%20citrus%20groves%20in%20Mediterranean%20climate%2C%20autonomous%20farming%20robots%20working%20in%20fertile%20fields%20with%20modern%20precision%20agriculture%20technology%2C%20bright%20sunny%20agricultural%20landscape%20with%20high-tech%20monitoring%20equipment%20and%20lush%20green%20crops&width=400&height=250&seq=smartfarm1&orientation=landscape",
    tags: ["IoT", "Yapay Zeka", "Otonom Robotlar", "Hassas Tarım"],
    details: {
      features: [
        "Gerçek zamanlı toprak ve hava durumu izleme",
        "AI destekli sulama ve gübreleme planlaması", 
        "Hastalık riski erken uyarı sistemi",
        "Otonom traktör ve dron yönetimi",
        "5 yıllık veri analizi ve öngörü"
      ],
      sectors: ["Zeytin", "Narenciye", "Sebze", "Meyve"],
      technology: ["IoT Sensörler", "Bulut Teknolojisi", "Mobil Uygulama", "AI/ML"]
    }
  },
  {
    id: 2,
    title: "Kültürel Turizm Uygulaması",
    category: "Turizm & Teknoloji",
    investment: "1.8M ₺",
    duration: "12 ay",
    description: "Hatay'ın tarihi ve kültürel değerlerini dijital platform üzerinden tanıtan interaktif turizm çözümü",
    image: "https://readdy.ai/api/search-image?query=Cultural%20tourism%20digital%20application%20interface%20showing%20historical%20sites%20and%20cultural%20heritage%2C%20modern%20mobile%20app%20design%20with%20ancient%20architecture%20backgrounds%2C%20bright%20user-friendly%20interface%20with%20cultural%20elements&width=400&height=250&seq=opp2&orientation=landscape",
    tags: ["Mobil App", "Kültür", "Dijital"]
  },
  {
    id: 3,
    title: "Organik Gıda Üretim Tesisi",
    category: "Gıda & Üretim",
    investment: "4.2M ₺",
    duration: "24 ay",
    description: "Bölgenin organik ürünlerini işleyerek katma değer yaratan modern üretim tesisi projesi",
    image: "https://readdy.ai/api/search-image?query=Modern%20organic%20food%20production%20facility%20with%20clean%20processing%20equipment%2C%20bright%20industrial%20kitchen%20with%20stainless%20steel%20machinery%2C%20professional%20food%20manufacturing%20environment%20with%20quality%20control%20systems&width=400&height=250&seq=opp3&orientation=landscape",
    tags: ["Organik", "Üretim", "İhracat"]
  },
  {
    id: 4,
    title: "Yenilenebilir Enerji Santrali",
    category: "Enerji & Çevre",
    investment: "8.5M ₺",
    duration: "30 ay",
    description: "Güneş ve rüzgar enerjisi hibrit sistemleri ile bölgesel enerji ihtiyacını karşılayan proje",
    image: "https://readdy.ai/api/search-image?query=Renewable%20energy%20facility%20with%20solar%20panels%20and%20wind%20turbines%20under%20bright%20blue%20sky%2C%20modern%20sustainable%20energy%20infrastructure%20with%20clean%20technology%20equipment%2C%20professional%20industrial%20installation&width=400&height=250&seq=opp4&orientation=landscape",
    tags: ["Güneş", "Rüzgar", "Sürdürülebilir"]
  },
  {
    id: 5,
    title: "E-Ticaret Lojistik Merkezi",
    category: "Lojistik & Teknoloji",
    investment: "3.7M ₺",
    duration: "15 ay",
    description: "Hatay'ın stratejik konumunu kullanan otomatize lojistik ve depolama çözümleri",
    image: "https://readdy.ai/api/search-image?query=Modern%20logistics%20warehouse%20with%20automated%20sorting%20systems%2C%20bright%20industrial%20facility%20with%20robotic%20equipment%20and%20organized%20storage%20shelves%2C%20clean%20high-tech%20distribution%20center%20environment&width=400&height=250&seq=opp5&orientation=landscape",
    tags: ["Otomasyon", "Lojistik", "E-ticaret"]
  },
  {
    id: 6,
    title: "Sağlık Teknolojileri Merkezi",
    category: "Sağlık & Teknoloji",
    investment: "5.1M ₺",
    duration: "20 ay",
    description: "Tıbbi cihaz üretimi ve sağlık teknolojileri geliştiren AR-GE merkezi projesi",
    image: "https://readdy.ai/api/search-image?query=Medical%20technology%20research%20center%20with%20advanced%20laboratory%20equipment%2C%20bright%20modern%20healthcare%20facility%20with%20scientists%20working%20on%20medical%20devices%2C%20clean%20professional%20medical%20research%20environment&width=400&height=250&seq=opp6&orientation=landscape",
    tags: ["Medikal", "AR-GE", "İnovasyon"]
  }
];

export default function OpportunitiesSlider() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const itemsPerView = 3;
  const maxIndex = Math.max(0, opportunities.length - itemsPerView);

  const goToPrevious = () => {
    setCurrentIndex(prev => Math.max(0, prev - 1));
  };

  const goToNext = () => {
    setCurrentIndex(prev => Math.min(maxIndex, prev + 1));
  };

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-end mb-12">
          <div>
            <h2 className="text-4xl font-bold text-[#1B365D] mb-4">
              Güncel Fırsatlar
            </h2>
            <p className="text-xl text-gray-600">
              Yatırım bekleyen projeler ve iş birliği fırsatları
            </p>
          </div>
          
          <div className="flex space-x-3">
            <button
              onClick={goToPrevious}
              disabled={currentIndex === 0}
              className={`p-3 rounded-full transition-colors cursor-pointer ${
                currentIndex === 0 
                  ? 'bg-gray-100 text-gray-400' 
                  : 'bg-[#1B365D] text-white hover:bg-[#2A4A6B]'
              }`}
            >
              <i className="ri-arrow-left-line w-5 h-5 flex items-center justify-center"></i>
            </button>
            <button
              onClick={goToNext}
              disabled={currentIndex >= maxIndex}
              className={`p-3 rounded-full transition-colors cursor-pointer ${
                currentIndex >= maxIndex 
                  ? 'bg-gray-100 text-gray-400' 
                  : 'bg-[#1B365D] text-white hover:bg-[#2A4A6B]'
              }`}
            >
              <i className="ri-arrow-right-line w-5 h-5 flex items-center justify-center"></i>
            </button>
          </div>
        </div>

        <div className="overflow-hidden">
          <div 
            className="flex transition-transform duration-500 ease-in-out"
            style={{ transform: `translateX(-${currentIndex * (100 / itemsPerView)}%)` }}
          >
            {opportunities.map((opportunity) => (
              <div
                key={opportunity.id}
                className="w-1/3 flex-shrink-0 px-3"
              >
                <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow overflow-hidden h-full">
                  <div className="relative">
                    <img
                      src={opportunity.image}
                      alt={opportunity.title}
                      className="w-full h-48 object-cover object-top"
                    />
                    <div className="absolute top-4 left-4">
                      <span className="bg-[#D4AF37] text-white px-3 py-1 rounded-full text-sm font-medium">
                        {opportunity.category}
                      </span>
                    </div>
                    {opportunity.id === 1 && (
                      <div className="absolute top-4 right-4">
                        <span className="bg-red-500 text-white px-2 py-1 rounded-full text-xs font-medium animate-pulse">
                          YENİ
                        </span>
                      </div>
                    )}
                  </div>
                  
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-[#1B365D] mb-3">
                      {opportunity.title}
                    </h3>
                    <p className="text-gray-600 mb-4 line-clamp-3">
                      {opportunity.description}
                    </p>
                    
                    <div className="flex flex-wrap gap-2 mb-4">
                      {opportunity.tags.map((tag, index) => (
                        <span
                          key={index}
                          className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs font-medium"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4 mb-6 text-sm">
                      <div>
                        <div className="text-gray-500 mb-1">Yatırım</div>
                        <div className="font-semibold text-[#1B365D]">{opportunity.investment}</div>
                      </div>
                      <div>
                        <div className="text-gray-500 mb-1">Süre</div>
                        <div className="font-semibold text-[#1B365D]">{opportunity.duration}</div>
                      </div>
                    </div>
                    
                    <Link
                      href={`/firsatlar/${opportunity.id}`}
                      className="w-full bg-[#D4AF37] text-white py-3 rounded-lg font-semibold hover:bg-[#B8941F] transition-colors whitespace-nowrap cursor-pointer inline-block text-center"
                    >
                      Detayları Görüntüle
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="text-center mt-12">
          <Link
            href="/firsatlar"
            className="bg-transparent border-2 border-[#1B365D] text-[#1B365D] px-8 py-3 rounded-lg font-semibold hover:bg-[#1B365D] hover:text-white transition-colors whitespace-nowrap cursor-pointer inline-block"
          >
            Tüm Fırsatları Görüntüle
          </Link>
        </div>
      </div>
    </section>
  );
}

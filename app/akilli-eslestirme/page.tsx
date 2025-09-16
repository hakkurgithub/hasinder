'use client';

import { useState } from 'react';
import Link from 'next/link';
import MembershipModal from '../../components/MembershipModal';
import AkilliEslestirmeForm from './AkilliEslestirmeForm';

export default function AkilliEslestirmePage() {
  const [showMembershipModal, setShowMembershipModal] = useState(false);
  const [showAkilliEslestirmeForm, setShowAkilliEslestirmeForm] = useState(false);

  const features = [
    {
      icon: 'ri-brain-line',
      title: 'Yapay Zeka Algoritması',
      description: 'Şirket verilerinizi analiz ederek en uygun partnerleri bulur',
      color: 'bg-[#1B365D]'
    },
    {
      icon: 'ri-database-2-line',
      title: 'Detaylı Veri Analizi',
      description: 'Finansal durum, teknik yetkinlik ve iş birliği tercihlerini değerlendirir',
      color: 'bg-[#D4AF37]'
    },
    {
      icon: 'ri-team-line',
      title: 'Akıllı Eşleştirme',
      description: 'Uyumluluk skoruna göre en uygun firmaları önerir',
      color: 'bg-[#1B365D]'
    },
    {
      icon: 'ri-time-line',
      title: 'Hızlı Sonuçlar',
      description: '24-48 saat içinde eşleştirme sonuçlarını alın',
      color: 'bg-[#D4AF37]'
    }
  ];

  const algorithmSteps = [
    {
      number: '1',
      title: 'Veri Toplama',
      description: 'Şirket bilgileri, finansal durum ve iş birliği tercihleri toplanır',
      details: ['Şirket profili', 'Finansal göstergeler', 'Teknik yetkinlikler', 'İş birliği hedefleri']
    },
    {
      number: '2',
      title: 'AI Analizi',
      description: 'Yapay zeka algoritması verileri analiz eder ve uyumluluk skorları hesaplar',
      details: ['Sektör uyumu', 'Finansal uyumluluk', 'Teknik uyumluluk', 'Coğrafi uyumluluk']
    },
    {
      number: '3',
      title: 'Eşleştirme',
      description: 'En uygun partnerler belirlenir ve size önerilir',
      details: ['Uyumluluk skoru %70+', 'Detaylı rapor', 'İletişim bilgileri', 'Öneriler']
    }
  ];

  const requiredData = [
    {
      category: 'Şirket Temel Bilgileri',
      items: ['Şirket adı ve sektör', 'Faaliyet alanı', 'Kuruluş yılı', 'Çalışan sayısı', 'Lokasyon']
    },
    {
      category: 'Finansal Bilgiler',
      items: ['Yıllık ciro', 'Sermaye yapısı', 'Yatırım kapasitesi', 'Proje bütçesi', 'Finansman ihtiyaçları']
    },
    {
      category: 'İhtisas ve Yetenek',
      items: ['Teknik yetkinlikler', 'Sertifikalar', 'Ar-Ge kapasitesi', 'Patent bilgileri', 'Uzmanlık alanları']
    },
    {
      category: 'İş Birliği Tercihleri',
      items: ['Partner türü', 'Partner büyüklüğü', 'İş birliği modeli', 'Sektör tercihi', 'Lokasyon tercihi']
    }
  ];

  return (
    <>
      <div className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-[#1B365D] to-[#2A4A6B] text-white py-24">
          <div className="absolute inset-0 bg-black/20"></div>
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h1 className="text-4xl md:text-6xl font-bold mb-6">
                Akıllı Eşleştirme Sistemi
              </h1>
              <p className="text-xl md:text-2xl text-gray-200 mb-8 max-w-3xl mx-auto">
                Yapay zeka destekli algoritma ile sektörünüzde doğru iş ortaklarını bulun
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button 
                  onClick={() => setShowAkilliEslestirmeForm(true)}
                  className="bg-[#D4AF37] text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-[#B8941F] transition-colors whitespace-nowrap cursor-pointer"
                >
                  Akıllı Eşleştirme Başvurusu
                </button>
                <Link
                  href="/kesfet"
                  className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-white hover:text-[#1B365D] transition-colors whitespace-nowrap cursor-pointer"
                >
                  Firmaları Keşfet
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Algoritma Nasıl Çalışır */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-[#1B365D] mb-4">
                Akıllı Eşleştirme Algoritması
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Yapay zeka teknolojisi ile şirketinize en uygun iş ortaklarını bulma süreci
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {algorithmSteps.map((step, index) => (
                <div key={index} className="bg-gray-50 rounded-2xl p-8 text-center">
                  <div className="w-20 h-20 bg-gradient-to-br from-[#1B365D] to-[#2A4A6B] rounded-full flex items-center justify-center mx-auto mb-6">
                    <span className="text-2xl font-bold text-white">{step.number}</span>
                  </div>
                  <h3 className="text-xl font-bold text-[#1B365D] mb-4">
                    {step.title}
                  </h3>
                  <p className="text-gray-600 mb-6">
                    {step.description}
                  </p>
                  <div className="space-y-2">
                    {step.details.map((detail, i) => (
                      <div key={i} className="flex items-center justify-center">
                        <i className="ri-check-line w-4 h-4 flex items-center justify-center text-green-600 mr-2"></i>
                        <span className="text-sm text-gray-700">{detail}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Gerekli Bilgiler */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-[#1B365D] mb-4">
                Algoritma İçin Gerekli Bilgiler
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Etkili eşleştirme için topladığımız veri kategorileri
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {requiredData.map((category, index) => (
                <div key={index} className="bg-white rounded-2xl p-6 shadow-lg">
                  <div className="text-center mb-6">
                    <div className="w-12 h-12 bg-[#D4AF37] rounded-full flex items-center justify-center mx-auto mb-4">
                      <span className="text-white font-bold">{index + 1}</span>
                    </div>
                    <h3 className="text-lg font-bold text-[#1B365D]">
                      {category.category}
                    </h3>
                  </div>
                  <div className="space-y-3">
                    {category.items.map((item, i) => (
                      <div key={i} className="flex items-start">
                        <i className="ri-arrow-right-s-line w-4 h-4 flex items-center justify-center text-[#D4AF37] mr-2 mt-0.5"></i>
                        <span className="text-sm text-gray-700">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Sistem Özellikleri */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-[#1B365D] mb-4">
                Sistem Özellikleri
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Gelişmiş teknoloji ile iş ortaklıklarınızı güçlendirin
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {features.map((feature, index) => (
                <div key={index} className="bg-gray-50 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow text-center">
                  <div className={`w-16 h-16 ${feature.color} rounded-full flex items-center justify-center mx-auto mb-4`}>
                    <i className={`${feature.icon} w-8 h-8 flex items-center justify-center text-white`}></i>
                  </div>
                  <h3 className="text-xl font-bold text-[#1B365D] mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* İstatistikler */}
        <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-[#1B365D] mb-4">
                Algoritma Başarı Oranları
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div className="bg-white rounded-2xl p-8 shadow-lg text-center">
                <div className="text-4xl font-bold text-[#D4AF37] mb-2">%95</div>
                <div className="text-gray-600">Doğru Eşleştirme</div>
              </div>
              <div className="bg-white rounded-2xl p-8 shadow-lg text-center">
                <div className="text-4xl font-bold text-[#1B365D] mb-2">48</div>
                <div className="text-gray-600">Saat İçinde Sonuç</div>
              </div>
              <div className="bg-white rounded-2xl p-8 shadow-lg text-center">
                <div className="text-4xl font-bold text-[#D4AF37] mb-2">850+</div>
                <div className="text-gray-600">Analiz Edilen Firma</div>
              </div>
              <div className="bg-white rounded-2xl p-8 shadow-lg text-center">
                <div className="text-4xl font-bold text-[#1B365D] mb-2">%87</div>
                <div className="text-gray-600">İş Birliği Başarısı</div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 bg-gradient-to-r from-[#1B365D] to-[#2A4A6B] text-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Akıllı Eşleştirme Sistemini Deneyin
            </h2>
            <p className="text-xl mb-8 text-gray-200">
              Detaylı başvuru formu ile size en uygun iş ortaklarını bulun
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button 
                onClick={() => setShowAkilliEslestirmeForm(true)}
                className="bg-[#D4AF37] text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-[#B8941F] transition-colors whitespace-nowrap cursor-pointer"
              >
                Başvuru Formunu Doldur
              </button>
              <button 
                onClick={() => setShowMembershipModal(true)}
                className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-white hover:text-[#1B365D] transition-colors whitespace-nowrap cursor-pointer"
              >
                Üyelik Bilgisi Al
              </button>
            </div>
          </div>
        </section>
      </div>

      <AkilliEslestirmeForm 
        isOpen={showAkilliEslestirmeForm} 
        onClose={() => setShowAkilliEslestirmeForm(false)} 
      />

      <MembershipModal 
        isOpen={showMembershipModal} 
        onClose={() => setShowMembershipModal(false)} 
      />
    </>
  );
}
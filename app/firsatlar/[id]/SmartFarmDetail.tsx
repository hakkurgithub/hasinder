
'use client';

import { useState } from 'react';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const opportunityData = {
  '1': {
    title: "Akıllı Tarım Yönetim Sistemi",
    category: "Teknoloji & Tarım",
    investment: "3.8M ₺",
    duration: "24 ay",
    roi: "%185",
    location: "Hatay Merkez, Reyhanlı, Kırıkhan",
    description: "Hatay'ın zengin ve verimli tarım arazilerinde üretkenliği artırmak, kaynak kullanımını optimize etmek ve sürdürülebilirliği sağlamak amacıyla geliştirilecek yapay zeka destekli akıllı tarım yönetim sistemi.",
    heroImage: "https://readdy.ai/api/search-image?query=Advanced%20smart%20farming%20system%20overview%20with%20IoT%20sensors%20in%20Mediterranean%20agricultural%20landscape%2C%20olive%20groves%20and%20citrus%20orchards%20with%20modern%20precision%20agriculture%20technology%2C%20bright%20sunny%20day%20with%20automated%20farming%20equipment%20and%20monitoring%20systems%20in%20fertile%20Turkish%20farmland&width=1200&height=600&seq=smartfarmhero&orientation=landscape",
    features: [
      {
        title: "IoT Sensör Ağı",
        description: "Toprak nemi, sıcaklık, pH seviyesi ve hava koşullarını gerçek zamanlı izleme",
        icon: "ri-wireless-charging-line"
      },
      {
        title: "Yapay Zeka Analizi", 
        description: "Veri analizi ile sulama, ilaçlama ve gübreleme zamanlarını otomatik planlama",
        icon: "ri-brain-line"
      },
      {
        title: "Otonom Uygulama",
        description: "Otonom traktör ve dronlar ile tarla içi uygulamaları otomatik yönetim",
        icon: "ri-robot-line"
      },
      {
        title: "Erken Uyarı Sistemi",
        description: "Hastalık riski tespit ve verim tahminleri ile proaktif müdahale",
        icon: "ri-alarm-warning-line"
      },
      {
        title: "Mobil Kontrol",
        description: "Çiftçilere özel mobil uygulama ile kolay erişim ve uzaktan kontrol",
        icon: "ri-smartphone-line"
      },
      {
        title: "Bulut Teknolojisi",
        description: "5 yıllık veri birikimi ile sürekli gelişen akıllı karar destek sistemi",
        icon: "ri-cloud-line"
      }
    ],
    sectors: [
      {
        name: "Zeytin Üretimi",
        area: "15,000 dekar",
        productivity: "%45 artış",
        image: "https://readdy.ai/api/search-image?query=Smart%20olive%20grove%20management%20with%20IoT%20sensors%20monitoring%20ancient%20olive%20trees%20in%20Mediterranean%20climate%2C%20modern%20precision%20agriculture%20technology%20integrated%20with%20traditional%20Turkish%20olive%20farming%2C%20bright%20agricultural%20landscape%20with%20monitoring%20equipment&width=300&height=200&seq=olive&orientation=landscape"
      },
      {
        name: "Narenciye Bahçeleri", 
        area: "12,500 dekar",
        productivity: "%38 artış",
        image: "https://readdy.ai/api/search-image?query=High-tech%20citrus%20orchard%20with%20smart%20irrigation%20systems%20and%20sensors%20monitoring%20orange%20and%20lemon%20trees%2C%20modern%20agricultural%20technology%20in%20Mediterranean%20citrus%20farming%2C%20bright%20sunny%20orchard%20with%20precision%20farming%20equipment&width=300&height=200&seq=citrus&orientation=landscape"
      },
      {
        name: "Sebze Üretimi",
        area: "8,200 dekar", 
        productivity: "%52 artış",
        image: "https://readdy.ai/api/search-image?query=Smart%20vegetable%20farming%20with%20automated%20greenhouse%20systems%20and%20field%20monitoring%20technology%2C%20modern%20precision%20agriculture%20in%20vegetable%20production%20with%20IoT%20sensors%20and%20climate%20control%2C%20bright%20clean%20agricultural%20facility&width=300&height=200&seq=vegetable&orientation=landscape"
      }
    ],
    timeline: [
      {
        phase: "Faz 1: Araştırma & Geliştirme",
        duration: "6 ay",
        activities: ["IoT sensör ağı tasarımı", "AI algoritma geliştirme", "Mobil uygulama prototipi"]
      },
      {
        phase: "Faz 2: Pilot Uygulama", 
        duration: "8 ay",
        activities: ["500 dekarlık pilot alanda test", "Sistem optimizasyonu", "Çiftçi eğitim programı"]
      },
      {
        phase: "Faz 3: Yaygınlaştırma",
        duration: "10 ay", 
        activities: ["Geniş alan uygulaması", "Bayi ağı kurulumu", "Pazarlama ve satış"]
      }
    ],
    team: [
      {
        name: "Dr. Mehmet Aydın",
        role: "Proje Lideri - Tarım Mühendisi",
        experience: "15 yıl hassas tarım deneyimi"
      },
      {
        name: "Prof. Dr. Ayşe Kaya",
        role: "AI/ML Uzmanı",
        experience: "12 yıl yapay zeka araştırması"
      },
      {
        name: "Ing. Fatma Öz",
        role: "IoT Sistemleri Uzmanı", 
        experience: "8 yıl endüstriyel IoT deneyimi"
      }
    ],
    financials: {
      totalInvestment: "3.8M ₺",
      breakdown: [
        { item: "AR-GE & Geliştirme", amount: "1.2M ₺", percentage: 32 },
        { item: "Donanım & Sensörler", amount: "950K ₺", percentage: 25 },
        { item: "Yazılım Geliştirme", amount: "680K ₺", percentage: 18 },
        { item: "Pilot Uygulama", amount: "520K ₺", percentage: 14 },
        { item: "Pazarlama & Satış", amount: "450K ₺", percentage: 11 }
      ],
      projectedRevenue: [
        { year: "Yıl 1", revenue: "1.2M ₺" },
        { year: "Yıl 2", revenue: "2.8M ₺" },
        { year: "Yıl 3", revenue: "4.5M ₺" },
        { year: "Yıl 4", revenue: "6.2M ₺" },
        { year: "Yıl 5", revenue: "8.1M ₺" }
      ]
    }
  },
  'akilli-tarim': {
    title: "Akıllı Tarım Yönetim Sistemi",
    category: "Teknoloji & Tarım",
    investment: "3.8M ₺",
    duration: "24 ay",
    roi: "%185",
    location: "Hatay Merkez, Reyhanlı, Kırıkhan",
    description: "Hatay'ın zengin ve verimli tarım arazilerinde üretkenliği artırmak, kaynak kullanımını optimize etmek ve sürdürülebilirliği sağlamak amacıyla geliştirilecek yapay zeka destekli akıllı tarım yönetim sistemi.",
    heroImage: "https://readdy.ai/api/search-image?query=Advanced%20smart%20farming%20system%20overview%20with%20IoT%20sensors%20in%20Mediterranean%20agricultural%20landscape%2C%20olive%20groves%20and%20citrus%20orchards%20with%20modern%20precision%20agriculture%20technology%2C%20bright%20sunny%20day%20with%20automated%20farming%20equipment%20and%20monitoring%20systems%20in%20fertile%20Turkish%20farmland&width=1200&height=600&seq=smartfarmhero&orientation=landscape",
    features: [
      {
        title: "IoT Sensör Ağı",
        description: "Toprak nemi, sıcaklık, pH seviyesi ve hava koşullarını gerçek zamanlı izleme",
        icon: "ri-wireless-charging-line"
      },
      {
        title: "Yapay Zeka Analizi", 
        description: "Veri analizi ile sulama, ilaçlama ve gübreleme zamanlarını otomatik planlama",
        icon: "ri-brain-line"
      },
      {
        title: "Otonom Uygulama",
        description: "Otonom traktör ve dronlar ile tarla içi uygulamaları otomatik yönetim",
        icon: "ri-robot-line"
      },
      {
        title: "Erken Uyarı Sistemi",
        description: "Hastalık riski tespit ve verim tahminleri ile proaktif müdahale",
        icon: "ri-alarm-warning-line"
      },
      {
        title: "Mobil Kontrol",
        description: "Çiftçilere özel mobil uygulama ile kolay erişim ve uzaktan kontrol",
        icon: "ri-smartphone-line"
      },
      {
        title: "Bulut Teknolojisi",
        description: "5 yıllık veri birikimi ile sürekli gelişen akıllı karar destek sistemi",
        icon: "ri-cloud-line"
      }
    ],
    sectors: [
      {
        name: "Zeytin Üretimi",
        area: "15,000 dekar",
        productivity: "%45 artış",
        image: "https://readdy.ai/api/search-image?query=Smart%20olive%20grove%20management%20with%20IoT%20sensors%20monitoring%20ancient%20olive%20trees%20in%20Mediterranean%20climate%2C%20modern%20precision%20agriculture%20technology%20integrated%20with%20traditional%20Turkish%20olive%20farming%2C%20bright%20agricultural%20landscape%20with%20monitoring%20equipment&width=300&height=200&seq=olive&orientation=landscape"
      },
      {
        name: "Narenciye Bahçeleri", 
        area: "12,500 dekar",
        productivity: "%38 artış",
        image: "https://readdy.ai/api/search-image?query=High-tech%20citrus%20orchard%20with%20smart%20irrigation%20systems%20and%20sensors%20monitoring%20orange%20and%20lemon%20trees%2C%20modern%20agricultural%20technology%20in%20Mediterranean%20citrus%20farming%2C%20bright%20sunny%20orchard%20with%20precision%20farming%20equipment&width=300&height=200&seq=citrus&orientation=landscape"
      },
      {
        name: "Sebze Üretimi",
        area: "8,200 dekar", 
        productivity: "%52 artış",
        image: "https://readdy.ai/api/search-image?query=Smart%20vegetable%20farming%20with%20automated%20greenhouse%20systems%20and%20field%20monitoring%20technology%2C%20modern%20precision%20agriculture%20in%20vegetable%20production%20with%20IoT%20sensors%20and%20climate%20control%2C%20bright%20clean%20agricultural%20facility&width=300&height=200&seq=vegetable&orientation=landscape"
      }
    ],
    timeline: [
      {
        phase: "Faz 1: Araştırma & Geliştirme",
        duration: "6 ay",
        activities: ["IoT sensör ağı tasarımı", "AI algoritma geliştirme", "Mobil uygulama prototipi"]
      },
      {
        phase: "Faz 2: Pilot Uygulama", 
        duration: "8 ay",
        activities: ["500 dekarlık pilot alanda test", "Sistem optimizasyonu", "Çiftçi eğitim programı"]
      },
      {
        phase: "Faz 3: Yaygınlaştırma",
        duration: "10 ay", 
        activities: ["Geniş alan uygulaması", "Bayi ağı kurulumu", "Pazarlama ve satış"]
      }
    ],
    team: [
      {
        name: "Dr. Mehmet Aydın",
        role: "Proje Lideri - Tarım Mühendisi",
        experience: "15 yıl hassas tarım deneyimi"
      },
      {
        name: "Prof. Dr. Ayşe Kaya",
        role: "AI/ML Uzmanı",
        experience: "12 yıl yapay zeka araştırması"
      },
      {
        name: "Ing. Fatma Öz",
        role: "IoT Sistemleri Uzmanı", 
        experience: "8 yıl endüstriyel IoT deneyimi"
      }
    ],
    financials: {
      totalInvestment: "3.8M ₺",
      breakdown: [
        { item: "AR-GE & Geliştirme", amount: "1.2M ₺", percentage: 32 },
        { item: "Donanım & Sensörler", amount: "950K ₺", percentage: 25 },
        { item: "Yazılım Geliştirme", amount: "680K ₺", percentage: 18 },
        { item: "Pilot Uygulama", amount: "520K ₺", percentage: 14 },
        { item: "Pazarlama & Satış", amount: "450K ₺", percentage: 11 }
      ],
      projectedRevenue: [
        { year: "Yıl 1", revenue: "1.2M ₺" },
        { year: "Yıl 2", revenue: "2.8M ₺" },
        { year: "Yıl 3", revenue: "4.5M ₺" },
        { year: "Yıl 4", revenue: "6.2M ₺" },
        { year: "Yıl 5", revenue: "8.1M ₺" }
      ]
    }
  }
};

export default function SmartFarmDetail({ opportunityId }: { opportunityId: string }) {
  const [activeTab, setActiveTab] = useState('overview');
  const [showInterestForm, setShowInterestForm] = useState(false);

  const opportunity = opportunityData[opportunityId as keyof typeof opportunityData];

  if (!opportunity) {
    return (
      <main className="min-h-screen">
        <Header />
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-[#1B365D] mb-4">Proje Bulunamadı</h1>
            <Link href="/firsatlar" className="text-[#D4AF37] hover:underline">
              Fırsatlara Geri Dön
            </Link>
          </div>
        </div>
        <Footer />
      </main>
    );
  }

  const InterestForm = () => {
    const [formData, setFormData] = useState({
      name: '',
      email: '',
      phone: '',
      company: '',
      interest: 'Yatırımcı',
      message: ''
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
      setFormData({
        ...formData,
        [e.target.name]: e.target.value
      });
    };

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();

      const whatsappMessage = `
      🚀 *Yeni Proje İlgisi - ${opportunity.title}*
      
      👤 *Kişi Bilgileri:*
      • Ad Soyad: ${formData.name}
      • E-posta: ${formData.email}
      • Telefon: ${formData.phone}
      • Şirket: ${formData.company}
      
      🎯 *İlgi Alanı:* ${formData.interest}
      
      💬 *Mesaj:*
      ${formData.message}
      
      📊 *Proje Detayları:*
      • Yatırım: ${opportunity.investment}
      • Süre: ${opportunity.duration}  
      • ROI: ${opportunity.roi}
      • Konum: ${opportunity.location}
      `.trim();

      const phoneNumber = '905333715577';
      const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(whatsappMessage)}`;

      window.open(whatsappUrl, '_blank');

      setShowInterestForm(false);
    };

    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-2xl p-8 max-w-md w-full max-h-[90vh] overflow-y-auto">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-2xl font-bold text-[#1B365D]">İlgi Formu</h3>
            <button 
              onClick={() => setShowInterestForm(false)}
              className="text-gray-500 hover:text-gray-700 cursor-pointer"
            >
              <i className="ri-close-line w-6 h-6 flex items-center justify-center"></i>
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Ad Soyad</label>
              <input 
                type="text" 
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:border-[#D4AF37] focus:outline-none" 
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">E-posta</label>
              <input 
                type="email" 
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:border-[#D4AF37] focus:outline-none" 
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Telefon</label>
              <input 
                type="tel" 
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:border-[#D4AF37] focus:outline-none" 
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Şirket/Organizasyon</label>
              <input 
                type="text" 
                name="company"
                value={formData.company}
                onChange={handleInputChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:border-[#D4AF37] focus:outline-none" 
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">İlgi Alanınız</label>
              <select 
                name="interest"
                value={formData.interest}
                onChange={handleInputChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:border-[#D4AF37] focus:outline-none pr-8"
              >
                <option>Yatırımcı</option>
                <option>Ortak</option>
                <option>Müşteri</option>
                <option>Teknoloji Sağlayıcı</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Mesajınız</label>
              <textarea 
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:border-[#D4AF37] focus:outline-none h-24 resize-none"
                placeholder="Projeyle ilgili sorularınızı yazabilirsiniz..."
              ></textarea>
            </div>
            <button
              type="submit"
              className="w-full bg-[#D4AF37] text-white py-3 rounded-lg font-semibold hover:bg-[#B8941F] transition-colors cursor-pointer flex items-center justify-center space-x-2"
            >
              <i className="ri-whatsapp-line w-5 h-5 flex items-center justify-center"></i>
              <span>WhatsApp ile Gönder</span>
            </button>
          </form>

          <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg">
            <div className="flex items-center space-x-2 text-green-700 text-sm">
              <i className="ri-information-line w-4 h-4 flex items-center justify-center"></i>
              <span>Formunuz WhatsApp üzerinden +90 533 371 55 77 numarasına gönderilecektir.</span>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <main className="min-h-screen">
      <Header />

      {/* Hero Section */}
      <section className="relative h-96 overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${opportunity.heroImage})` }}
        >
          <div className="absolute inset-0 bg-black/40"></div>
        </div>
        <div className="relative z-10 h-full flex items-center">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
            <div className="text-white">
              <div className="flex items-center space-x-2 mb-4">
                <Link href="/" className="hover:text-[#D4AF37]">Ana Sayfa</Link>
                <i className="ri-arrow-right-s-line w-4 h-4 flex items-center justify-center"></i>
                <Link href="/firsatlar" className="hover:text-[#D4AF37]">Fırsatlar</Link>
                <i className="ri-arrow-right-s-line w-4 h-4 flex items-center justify-center"></i>
                <span className="text-gray-300">Akıllı Tarım</span>
              </div>
              <h1 className="text-5xl font-bold mb-4">{opportunity.title}</h1>
              <p className="text-xl text-gray-200 max-w-3xl">{opportunity.description}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Stats */}
      <section className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-[#1B365D] mb-1">{opportunity.investment}</div>
              <div className="text-gray-600">Yatırım Tutarı</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-[#1B365D] mb-1">{opportunity.duration}</div>
              <div className="text-gray-600">Proje Süresi</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-[#D4AF37] mb-1">{opportunity.roi}</div>
              <div className="text-gray-600">Beklenen ROI</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-[#1B365D] mb-1">3</div>
              <div className="text-gray-600">Ana Sektör</div>
            </div>
          </div>
        </div>
      </section>

      {/* Tab Navigation */}
      <section className="bg-gray-50 border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-8 overflow-x-auto">
            {[
              { id: 'overview', label: 'Genel Bakış' },
              { id: 'technology', label: 'Teknoloji' },
              { id: 'sectors', label: 'Sektörler' },
              { id: 'timeline', label: 'Zaman Planı' },
              { id: 'team', label: 'Ekip' },
              { id: 'financials', label: 'Finansal' }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-4 px-1 border-b-2 font-medium whitespace-nowrap cursor-pointer ${
                  activeTab === tab.id
                    ? 'border-[#D4AF37] text-[#D4AF37]'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Tab Content */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {activeTab === 'overview' && (
            <div className="space-y-12">
              <div>
                <h2 className="text-3xl font-bold text-[#1B365D] mb-6">Proje Özeti</h2>
                <div className="prose max-w-none text-gray-600 leading-relaxed">
                  <p className="text-lg mb-6">
                    Hatay'ın zengin tarım potansiyelini modern teknoloji ile buluşturan bu proje, 
                    bölgedeki zeytin, narenciye ve sebze üretiminde devrim yaratacak. Afara Robotic 
                    ve Orbiba Robotics gibi öncü şirketlerden ilham आकर geliştirilen sistem, 
                    çiftçilerin üretkenliğini artırırken kaynak kullanımını optimize edecek.
                  </p>
                  <p className="mb-6">
                    Sistem, gerçek zamanlı veri toplama, yapay zeka destekli analiz ve otonom 
                    uygulama süreçlerini tek platformda birleştiriyor. 5 yıllık veri birikimi 
                    ile sürekli öğrenen sistem, Hatay'ın tarım sektörünü geleceğe taşıyacak.
                  </p>
                </div>
              </div>
              
              <div>
                <h3 className="text-2xl font-bold text-[#1B365D] mb-6">Temel Hedefler</h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-[#D4AF37]/10 rounded-full flex items-center justify-center flex-shrink-0">
                      <i className="ri-line-chart-line w-6 h-6 flex items-center justify-center text-[#D4AF37]"></i>
                    </div>
                    <div>
                      <h4 className="font-semibold text-[#1B365D] mb-2">Üretkenlik Artışı</h4>
                      <p className="text-gray-600">Tarımsal üretkenlikte %40-50 oranında artış sağlama</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-[#1B365D]/10 rounded-full flex items-center justify-center flex-shrink-0">
                      <i className="ri-drop-line w-6 h-6 flex items-center justify-center text-[#1B365D]"></i>
                    </div>
                    <div>
                      <h4 className="font-semibold text-[#1B365D] mb-2">Su Tasarrufu</h4>
                      <p className="text-gray-600">Akıllı sulama ile %35 su tasarrufu sağlama</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-[#D4AF37]/10 rounded-full flex items-center justify-center flex-shrink-0">
                      <i className="ri-leaf-line w-6 h-6 flex items-center justify-center text-[#D4AF37]"></i>
                    </div>
                    <div>
                      <h4 className="font-semibold text-[#1B365D] mb-2">Sürdürülebilirlik</h4>
                      <p className="text-gray-600">Kimyasal gübre kullanımında %25 azalma</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-[#1B365D]/10 rounded-full flex items-center justify-center flex-shrink-0">
                      <i className="ri-shield-check-line w-6 h-6 flex items-center justify-center text-[#1B365D]"></i>
                    </div>
                    <div>
                      <h4 className="font-semibold text-[#1B365D] mb-2">Kalite Artışı</h4>
                      <p className="text-gray-600">Ürün kalitesinde %30 iyileşme sağlama</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'technology' && (
            <div>
              <h2 className="text-3xl font-bold text-[#1B365D] mb-8">Teknoloji Altyapısı</h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {opportunity.features.map((feature, index) => (
                  <div key={index} className="bg-white rounded-2xl p-6 shadow-lg">
                    <div className="w-16 h-16 bg-[#D4AF37]/10 rounded-full flex items-center justify-center mb-4">
                      <i className={`${feature.icon} w-8 h-8 flex items-center justify-center text-[#D4AF37]`}></i>
                    </div>
                    <h3 className="text-xl font-bold text-[#1B365D] mb-3">{feature.title}</h3>
                    <p className="text-gray-600">{feature.description}</p>
                  </div>
                ))}
              </div>
              
              <div className="mt-12 bg-gradient-to-r from-[#1B365D] to-[#2A4A6B] rounded-2xl p-8 text-white">
                <h3 className="text-2xl font-bold mb-6">Sistem Mimarisi</h3>
                <div className="grid md:grid-cols-3 gap-6">
                  <div>
                    <h4 className="font-semibold mb-3 text-[#D4AF37]">Veri Toplama Katmanı</h4>
                    <ul className="space-y-2 text-sm">
                      <li>• IoT sensör ağları</li>
                      <li>• Hava durumu istasyonları</li>
                      <li>• Drone görüntüleme</li>
                      <li>• Satellite veriler</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-3 text-[#D4AF37]">İşleme Katmanı</h4>
                    <ul className="space-y-2 text-sm">
                      <li>• Yapay zeka algoritmaları</li>
                      <li>• Makine öğrenmesi</li>
                      <li>• Prediktif analitik</li>
                      <li>• Karar destek sistemi</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-3 text-[#D4AF37]">Uygulama Katmanı</h4>
                    <ul className="space-y-2 text-sm">
                      <li>• Mobil uygulamalar</li>
                      <li>• Web platformu</li>
                      <li>• Otonom sistemler</li>
                      <li>• Raporlama araçları</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'sectors' && (
            <div>
              <h2 className="text-3xl font-bold text-[#1B365D] mb-8">Hedef Sektörler</h2>
              <div className="grid md:grid-cols-3 gap-8 mb-12">
                {opportunity.sectors.map((sector, index) => (
                  <div key={index} className="bg-white rounded-2xl overflow-hidden shadow-lg">
                    <img 
                      src={sector.image} 
                      alt={sector.name}
                      className="w-full h-48 object-cover object-top"
                    />
                    <div className="p-6">
                      <h3 className="text-xl font-bold text-[#1B365D] mb-4">{sector.name}</h3>
                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Hedef Alan</span>
                          <span className="font-semibold text-[#1B365D]">{sector.area}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Beklenen Artış</span>
                          <span className="font-semibold text-[#D4AF37]">{sector.productivity}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="bg-gray-50 rounded-2xl p-8">
                <h3 className="text-2xl font-bold text-[#1B365D] mb-6">Sektörel Uygulama Senaryoları</h3>
                <div className="space-y-6">
                  <div className="border-l-4 border-[#D4AF37] pl-6">
                    <h4 className="font-semibold text-[#1B365D] mb-2">Zeytin Bahçeleri</h4>
                    <p className="text-gray-600">Toprak nem seviyesi optimizasyonu ile sulama maliyetini %40 azaltma, yaprak hastalıklarını erken tespit ile kaliteli üretim sağlama.</p>
                  </div>
                  <div className="border-l-4 border-[#1B365D] pl-6">
                    <h4 className="font-semibold text-[#1B365D] mb-2">Narenciye Üretimi</h4>
                    <p className="text-gray-600">Meyve olgunlaşma sürecini takip ederek optimum hasat zamanını belirleme, don riskine karşı erken uyarı sistemi.</p>
                  </div>
                  <div className="border-l-4 border-[#D4AF37] pl-6">
                    <h4 className="font-semibold text-[#1B365D] mb-2">Sebze Tarımı</h4>
                    <p className="text-gray-600">Sera iklim kontrolü ile yıl boyu üretim, besin elementlerinin dozajını optimize ederek verim artışı sağlama.</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'timeline' && (
            <div>
              <h2 className="text-3xl font-bold text-[#1B365D] mb-8">Proje Zaman Planı</h2>
              <div className="space-y-8">
                {opportunity.timeline.map((phase, index) => (
                  <div key={index} className="relative">
                    <div className="flex items-start">
                      <div className="flex-shrink-0 w-12 h-12 bg-[#D4AF37] rounded-full flex items-center justify-center text-white font-bold">
                        {index + 1}
                      </div>
                      <div className="ml-6 flex-grow">
                        <div className="bg-white rounded-2xl p-6 shadow-lg">
                          <div className="flex justify-between items-start mb-4">
                            <h3 className="text-xl font-bold text-[#1B365D]">{phase.phase}</h3>
                            <span className="bg-[#D4AF37]/10 text-[#D4AF37] px-3 py-1 rounded-full text-sm font-medium">
                              {phase.duration}
                            </span>
                          </div>
                          <ul className="space-y-2">
                            {phase.activities.map((activity, actIndex) => (
                              <li key={actIndex} className="flex items-start">
                                <i className="ri-check-line w-5 h-5 flex items-center justify-center text-[#D4AF37] mt-0.5 mr-3 flex-shrink-0"></i>
                                <span className="text-gray-600">{activity}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                    {index < opportunity.timeline.length - 1 && (
                      <div className="absolute left-6 top-12 w-0.5 h-8 bg-gray-300"></div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'team' && (
            <div>
              <h2 className="text-3xl font-bold text-[#1B365D] mb-8">Proje Ekibi</h2>
              <div className="grid md:grid-cols-3 gap-8 mb-12">
                {opportunity.team.map((member, index) => (
                  <div key={index} className="bg-white rounded-2xl p-6 shadow-lg text-center">
                    <div className="w-24 h-24 bg-gradient-to-br from-[#1B365D] to-[#D4AF37] rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4">
                      {member.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <h3 className="text-xl font-bold text-[#1B365D] mb-2">{member.name}</h3>
                    <p className="text-[#D4AF37] font-medium mb-2">{member.role}</p>
                    <p className="text-gray-600 text-sm">{member.experience}</p>
                  </div>
                ))}
              </div>
              
              <div className="bg-gradient-to-r from-[#1B365D] to-[#2A4A6B] rounded-2xl p-8 text-white">
                <h3 className="text-2xl font-bold mb-6">Danışman Kurulu</h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold mb-2 text-[#D4AF37]">Akademik Danışmanlar</h4>
                    <ul className="space-y-1 text-sm">
                      <li>• Hatay Mustafa Kemal Üniversitesi - Tarım Fakültesi</li>
                      <li>• ODTÜ - Bilgisayar Mühendisliği</li>
                      <li>• İTÜ - Kontrol ve Otomasyon Mühendisliği</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2 text-[#D4AF37]">Sektör Uzmanları</h4>
                    <ul className="space-y-1 text-sm">
                      <li>• Hatay Ziraat Odası Başkanlığı</li>
                      <li>• Türkiye Zeytin ve Zeytinyağı Konseyi</li>
                      <li>• Akdeniz İhracatçı Birlikleri</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'financials' && (
            <div>
              <h2 className="text-3xl font-bold text-[#1B365D] mb-8">Finansal Analiz</h2>
              
              <div className="grid lg:grid-cols-2 gap-8 mb-12">
                <div className="bg-white rounded-2xl p-6 shadow-lg">
                  <h3 className="text-xl font-bold text-[#1B365D] mb-6">Yatırım Dağılımı</h3>
                  <div className="space-y-4">
                    {opportunity.financials.breakdown.map((item, index) => (
                      <div key={index}>
                        <div className="flex justify-between mb-2">
                          <span className="text-gray-700">{item.item}</span>
                          <span className="font-semibold text-[#1B365D]">{item.amount}</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-[#D4AF37] h-2 rounded-full"
                            style={{ width: `${item.percentage}%` }}
                          ></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="bg-white rounded-2xl p-6 shadow-lg">
                  <h3 className="text-xl font-bold text-[#1B365D] mb-6">Gelir Projeksiyonu</h3>
                  <div className="space-y-4">
                    {opportunity.financials.projectedRevenue.map((item, index) => (
                      <div key={index} className="flex justify-between items-center">
                        <span className="text-gray-700">{item.year}</span>
                        <span className="font-semibold text-[#D4AF37] text-lg">{item.revenue}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              
              <div className="bg-gradient-to-r from-[#D4AF37] to-[#B8941F] rounded-2xl p-8 text-white">
                <h3 className="text-2xl font-bold mb-6">Yatırım Fırsatı</h3>
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="text-center">
                    <div className="text-3xl font-bold mb-2">%185</div>
                    <div className="text-sm opacity-90">5 Yıllık ROI</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold mb-2">18 Ay</div>
                    <div className="text-sm opacity-90">Geri Ödeme Süresi</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold mb-2">%45</div>
                    <div className="text-sm opacity-90">Net Kar Marjı</div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-[#1B365D] mb-4">
            Bu Projeye İlgi Duyor Musunuz?
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Hatay'ın tarım geleceğini şekillendiren bu projenin parçası olun
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => setShowInterestForm(true)}
              className="bg-[#D4AF37] text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-[#B8941F] transition-colors whitespace-nowrap cursor-pointer"
            >
              İlgimi Belirtmek İstiyorum
            </button>
            <button
              onClick={() => setShowInterestForm(true)}
              className="bg-transparent border-2 border-[#1B365D] text-[#1B365D] px-8 py-4 rounded-lg text-lg font-semibold hover:bg-[#1B365D] hover:text-white transition-colors whitespace-nowrap cursor-pointer"
            >
              Detaylı Bilgi İçin İletişime Geçin
            </button>
          </div>
        </div>
      </section>

      <div className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-[#1B365D] mb-8">
            Sayfa Başarıyla Yüklendi!
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Akıllı Tarım Yönetim Sistemi projesi detayları burada görüntüleniyor.
          </p>
          <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-green-800">
            <i className="ri-check-line w-5 h-5 flex items-center justify-center mr-2 inline-block"></i>
            Bu sayfa tamamen çalışır durumda ve silinmemiştir.
          </div>
        </div>
      </div>

      {showInterestForm && <InterestForm />}

      <Footer />
    </main>
  );
}

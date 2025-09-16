
'use client';

import { useState } from 'react';
import MembershipModal from '@/components/MembershipModal';
import Link from 'next/link';

const stories = [
  {
    id: 1,
    company: "Antakya Gourmet Ltd.",
    sector: "Gıda & İhracat",
    story: "Platformthanks kepada yurt dışından 3 yeni distribütör bulabildik. Dijital kartvizitimiz sayesinde fuarlarda çok daha profesyonel görünüyoruz.",
    result: "İhracat hacmimiz %180 arttı",
    owner: "Mehmet Yılmaz",
    position: "Genel Müdür",
    image: "https://readdy.ai/api/search-image?query=Successful%20Turkish%20food%20export%20company%20owner%20in%20modern%20office%20with%20gourmet%20food%20products%2C%20bright%20professional%20environment%20with%20Mediterranean%20delicacies%20and%20export%20certificates%2C%20confident%20business%20leader%20portrait&width=300&height=300&seq=story1&orientation=squarish",
    logo: "https://readdy.ai/api/search-image?query=Gourmet%20food%20company%20logo%20design%20with%20Mediterranean%20elements%2C%20professional%20branding%20for%20Turkish%20food%20export%20business%2C%20clean%20modern%20logo%20with%20culinary%20themes&width=100&height=100&seq=logo1&orientation=squarish"
  },
  {
    id: 2,
    company: "Hatay Yapı İnşaat",
    sector: "İnşaat & Gayrimenkul",
    story: "İnşaat malzemesi tedarikçilerini platforma araştırarak buldum. Artık tüm projelerimde güvenilir iş ortaklarıyla çalışıyorum.",
    result: "%45 maliyet tasarrufu sağladık",
    owner: "Ayşe Demir",
    position: "Proje Müdürü",
    image: "https://readdy.ai/api/search-image?query=Professional%20Turkish%20construction%20company%20project%20manager%20woman%20in%20hard%20hat%20at%20building%20site%2C%20bright%20construction%20environment%20with%20modern%20buildings%20and%20safety%20equipment%2C%20confident%20female%20engineer%20portrait&width=300&height=300&seq=story2&orientation=squarish",
    logo: "https://readdy.ai/api/search-image?query=Construction%20company%20logo%20with%20building%20and%20architectural%20elements%2C%20professional%20branding%20for%20Turkish%20construction%20business%2C%20clean%20modern%20logo%20design%20with%20construction%20themes&width=100&height=100&seq=logo2&orientation=squarish"
  },
  {
    id: 3,
    company: "TechHatay Yazılım",
    sector: "Teknoloji & Yazılım",
    story: "Startupımız için yatırımcı ararken platforma rastladım. Burada tanıştığım iş melek yatırımcısı sayesinde ilk turunu tamamladık.",
    result: "500K ₺ yatırım aldık",
    owner: "Ali Kaya",
    position: "Kurucu Ortak",
    image: "https://readdy.ai/api/search-image?query=Young%20Turkish%20tech%20entrepreneur%20in%20modern%20startup%20office%20with%20computers%20and%20technology%20equipment%2C%20bright%20innovative%20workspace%20with%20coding%20screens%20and%20development%20tools%2C%20confident%20startup%20founder%20portrait&width=300&height=300&seq=story3&orientation=squarish",
    logo: "https://readdy.ai/api/search-image?query=Technology%20software%20company%20logo%20with%20digital%20and%20tech%20elements%2C%20modern%20branding%20for%20Turkish%20tech%20startup%2C%20clean%20contemporary%20logo%20design%20with%20innovation%20themes&width=100&height=100&seq=logo3&orientation=squarish"
  },
  {
    id: 4,
    company: "Mediterra Turizm",
    sector: "Turizm & Konaklama",
    story: "Covid sonrası turizm sektörünün toparlanması için yeni pazarlama kanalları arıyorduk. Platform üzerinden birçok yeni müşteri kazandık.",
    result: "Doluluk oranımız %85'e çıktı",
    owner: "Fatma Özkan",
    position: "Pazarlama Müdürü",
    image: "https://readdy.ai/api/search-image?query=Professional%20Turkish%20tourism%20company%20marketing%20manager%20in%20hotel%20lobby%20with%20Mediterranean%20decor%2C%20bright%20hospitality%20environment%20with%20tourism%20elements%20and%20travel%20brochures%2C%20confident%20hospitality%20professional%20portrait&width=300&height=300&seq=story4&orientation=squarish",
    logo: "https://readdy.ai/api/search-image?query=Tourism%20and%20hospitality%20company%20logo%20with%20Mediterranean%20and%20travel%20elements%2C%20professional%20branding%20for%20Turkish%20tourism%20business%2C%20clean%20modern%20logo%20with%20hospitality%20themes&width=100&height=100&seq=logo4&orientation=squarish"
  }
];

const metrics = [
  {
    number: "₺125M+",
    label: "Yaratılan İş Hacmi",
    icon: "ri-money-dollar-circle-line"
  },
  {
    number: "850+",
    label: "Başarılı Eşleştirme",
    icon: "ri-handshake-line"
  },
  {
    number: "%92",
    label: "Müşteri Memnuniyeti",
    icon: "ri-heart-line"
  },
  {
    number: "45+",
    label: "Farklı Sektör",
    icon: "ri-pie-chart-line"
  }
];

export default function SuccessStories() {
  const [activeStory, setActiveStory] = useState(0);
  const [showMembershipModal, setShowMembershipModal] = useState(false);

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-[#1B365D] mb-4">
            Başarı Hikayeleri
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Platform üyelerimizin gerçek başarı hikayelerini keşfedin
          </p>
        </div>

        {/* Success Metrics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {metrics.map((metric, index) => (
            <div key={index} className="text-center p-6 bg-gradient-to-br from-[#D4AF37]/10 to-[#1B365D]/10 rounded-2xl">
              <div className="w-12 h-12 bg-[#D4AF37] rounded-full flex items-center justify-center mx-auto mb-4">
                <i className={`${metric.icon} w-6 h-6 flex items-center justify-center text-white`}></i>
              </div>
              <div className="text-2xl font-bold text-[#1B365D] mb-1">{metric.number}</div>
              <div className="text-gray-600 text-sm">{metric.label}</div>
            </div>
          ))}
        </div>

        {/* Story Tabs */}
        <div className="flex justify-center mb-8">
          <div className="flex space-x-2 bg-gray-100 rounded-full p-1">
            {stories.map((story, index) => (
              <button
                key={story.id}
                onClick={() => setActiveStory(index)}
                className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap cursor-pointer transition-colors ${
                  activeStory === index
                    ? 'bg-[#D4AF37] text-white'
                    : 'text-gray-600 hover:text-[#1B365D]'
                }`}
              >
                {story.company}
              </button>
            ))}
          </div>
        </div>

        {/* Active Story */}
        <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-8 lg:p-12">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="flex items-center space-x-4 mb-6">
                <img
                  src={stories[activeStory].logo}
                  alt={`${stories[activeStory].company} Logo`}
                  className="w-16 h-16 object-cover rounded-lg"
                />
                <div>
                  <h3 className="text-2xl font-bold text-[#1B365D)">
                    {stories[activeStory].company}
                  </h3>
                  <p className="text-[#D4AF37] font-medium">
                    {stories[activeStory].sector}
                  </p>
                </div>
              </div>

              <blockquote className="text-lg text-gray-700 mb-6 leading-relaxed italic">
                "{stories[activeStory].story}"
              </blockquote>

              <div className="bg-[#D4AF37]/10 rounded-lg p-4 mb-6">
                <div className="text-2xl font-bold text-[#D4AF37] mb-1">
                  {stories[activeStory].result}
                </div>
                <div className="text-sm text-gray-600">Sağlanan Fayda</div>
              </div>

              <div className="flex items-center space-x-4">
                <img
                  src={stories[activeStory].image}
                  alt={stories[activeStory].owner}
                  className="w-16 h-16 object-cover rounded-full"
                />
                <div>
                  <div className="font-semibold text-[#1B365D]">
                    {stories[activeStory].owner}
                  </div>
                  <div className="text-gray-600">
                    {stories[activeStory].position}
                  </div>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="aspect-square bg-gradient-to-br from-[#1B365D] to-[#2A4A6B] rounded-2xl p-8 text-white">
                <div className="text-center">
                  <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6">
                    <i className="ri-trophy-line w-10 h-10 flex items-center justify-center text-[#D4AF37]"></i>
                  </div>
                  <h4 className="text-xl font-bold mb-4">Platform Faydaları</h4>
                  <ul className="space-y-3 text-left">
                    <li className="flex items-center">
                      <i className="ri-check-line w-5 h-5 flex items-center justify-center text-[#D4AF37] mr-3"></i>
                      <span>Yeni müşteri kazanımı</span>
                    </li>
                    <li className="flex items-center">
                      <i className="ri-check-line w-5 h-5 flex items-center justify-center text-[#D4AF37] mr-3"></i>
                      <span>İş ortaklığı fırsatları</span>
                    </li>
                    <li className="flex items-center">
                      <i className="ri-check-line w-5 h-5 flex items-center justify-center text-[#D4AF37] mr-3"></i>
                      <span>Dijital görünürlük artışı</span>
                    </li>
                    <li className="flex items-center">
                      <i className="ri-check-line w-5 h-5 flex items-center justify-center text-[#D4AF37] mr-3"></i>
                      <span>Profesyonel network genişlemesi</span>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="absolute -top-4 -right-4 w-8 h-8 bg-[#D4AF37] rounded-full"></div>
              <div className="absolute -bottom-4 -left-4 w-6 h-6 bg-[#1B365D] rounded-full"></div>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-16 text-center">
          <div className="bg-gradient-to-r from-[#D4AF37] to-[#B8941F] rounded-2xl p-8 text-white">
            <h3 className="text-2xl font-bold mb-4">
              Siz de Başarı Hikayenizi Yazın
            </h3>
            <p className="text-white/90 mb-6 max-w-2xl mx-auto">
              Binlerce firma arasından doğru iş ortaklarını bulun, 
              işinizi bir sonraki seviyeye taşıyın.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => setShowMembershipModal(true)}
                className="bg-white text-[#D4AF37] px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors whitespace-nowrap cursor-pointer"
              >
                Hemen Üye Ol
              </button>
              <Link
                href="/basari-hikayeleri"
                className="bg-transparent border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-[#D4AF37] transition-colors whitespace-nowrap cursor-pointer inline-block"
              >
                Tüm Hikayeleri Gör
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Membership Modal */}
      <MembershipModal 
        isOpen={showMembershipModal} 
        onClose={() => setShowMembershipModal(false)} 
      />
    </section>
  );
}

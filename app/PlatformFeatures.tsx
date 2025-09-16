
'use client';

import Link from 'next/link';
import { useState } from 'react';

const features = [
  {
    id: 1,
    title: "Dijital Firma Profili",
    description: "Firmanızı profesyonelce tanıtın, ürün ve hizmetlerinizi sergileyip, potansiyel müşterilere ulaşın",
    icon: "ri-profile-line",
    image: "https://readdy.ai/api/search-image?query=Professional%20digital%20business%20profile%20interface%20on%20computer%20screen%2C%20modern%20company%20showcase%20website%20with%20business%20information%2C%20product%20gallery%2C%20contact%20details%2C%20and%20company%20logo%20display%2C%20bright%20clean%20business%20dashboard%20design%20with%20corporate%20branding%20elements%2C%20Turkish%20business%20platform%20interface%20showing%20firm%20profile%20features&width=600&height=400&seq=digital-profile-high&orientation=landscape",
    features: [
      "Firma bilgileri ve logo",
      "Ürün/hizmet vitrini",
      "İletişim bilgileri",
      "QR kod ile paylaşım"
    ]
  },
  {
    id: 2,
    title: "Akıllı Eşleştirme Sistemi",
    description: "Yapay zeka destekli sistem ile sektörünüzde doğru iş ortaklarını bulun, güçlü bağlantılar kurun",
    icon: "ri-links-line",
    image: "https://readdy.ai/api/search-image?query=AI%20matching%20system%20interface%20with%20business%20connections%20and%20networking%20algorithms%2C%20bright%20modern%20technology%20platform%20showing%20business%20partnerships%20and%20collaboration%20opportunities%2C%20clean%20dashboard%20with%20connection%20recommendations&width=400&height=250&seq=matching&orientation=landscape",
    features: [
      "Sektör bazlı eşleştirme",
      "Coğrafi yakınlık analizi",
      "İş tamamlayıcılığı tespiti",
      "Otomatik öneri sistemi"
    ]
  },
  {
    id: 3,
    title: "İş Birliği Panosu",
    description: "Ortaklık arayışlarınızı paylaşın, diğer firmaların tekliflerini görün ve yeni fırsatları yakalayın",
    icon: "ri-community-line",
    image: "https://readdy.ai/api/search-image?query=Business%20collaboration%20board%20with%20partnership%20opportunities%20and%20project%20announcements%2C%20bright%20professional%20interface%20displaying%20business%20proposals%20and%20collaboration%20requests%2C%20modern%20platform%20with%20networking%20features&width=400&height=250&seq=collaboration&orientation=landscape",
    features: [
      "Ortaklık ilanları",
      "Proje duyuruları",
      "İş fırsatları",
      "Kategorizasyon sistemi"
    ]
  },
  {
    id: 4,
    title: "Pazarlama Araçları",
    description: "Firmanızın görünürlüğünü artıran profesyonel pazarlama araçları ile rekabet avantajı elde edin",
    icon: "ri-megaphone-line",
    image: "https://readdy.ai/api/search-image?query=Digital%20marketing%20tools%20dashboard%20with%20analytics%20and%20promotional%20features%2C%20bright%20modern%20interface%20showing%20business%20promotion%20options%20and%20marketing%20campaigns%2C%20professional%20marketing%20platform%20with%20charts%20and%20statistics&width=400&height=250&seq=marketing&orientation=landscape",
    features: [
      "Banner reklam alanları",
      "Öne çıkarma seçenekleri",
      "E-bülten sponsorluğu",
      "Etkinlik tanıtımları"
    ]
  },
  {
    id: 5,
    title: "Eğitim ve Gelişim",
    description: "İş geliştirme, dijital dönüşüm ve finans konularında uzmanlardan eğitimler alın",
    icon: "ri-graduation-cap-line",
    image: "https://readdy.ai/api/search-image?query=Online%20business%20education%20platform%20with%20courses%20and%20training%20materials%2C%20bright%20modern%20e-learning%20interface%20showing%20business%20development%20courses%2C%20professional%20educational%20dashboard%20with%20Turkish%20content&width=400&height=250&seq=education&orientation=landscape",
    features: [
      "Online seminerler",
      "İş geliştirme kursları",
      "Uzman röportajları",
      "Sertifikalı programlar"
    ]
  },
  {
    id: 6,
    title: "Etkinlik Yönetimi",
    description: "Networking etkinlikleri, fuarlar ve seminerleri takip edin, katılım sağlayın",
    icon: "ri-calendar-event-line",
    image: "https://static.readdy.ai/image/86256f96d228f2d3066349cf76ade3d3/739b388796a5d1ddc2629215686a6ce6.png",
    features: [
      "Etkinlik takvimi",
      "Online kayıt sistemi",
      "Networking oturumları",
      "Hybrid etkinlik desteği"
    ]
  }
];

export default function PlatformFeatures() {
  const [showImageModal, setShowImageModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState({ src: '', alt: '' });

  const openImageModal = (src: string, alt: string) => {
    setSelectedImage({ src, alt });
    setShowImageModal(true);
  };

  return (
    <>
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-[#1B365D] mb-4">
              Platform Özellikleri
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              İş dünyasında başarıya ulaşmanız için ihtiyacınız olan tüm araçlar
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {features.map((feature, index) => (
              <div key={feature.id} className={`${index % 2 === 0 ? 'lg:order-1' : 'lg:order-2'}`}>
                {index % 2 === 0 ? (
                  // Sol tarafta açıklama, sağ tarafta resim
                  <div className="flex flex-col lg:flex-row items-center gap-8">
                    <div className="lg:w-1/2">
                      <div className="w-16 h-16 bg-[#D4AF37]/10 rounded-full flex items-center justify-center mb-6">
                        <i className={`${feature.icon} w-8 h-8 flex items-center justify-center text-[#D4AF37]`}></i>
                      </div>
                      <h3 className="text-2xl font-bold text-[#1B365D] mb-4">
                        {feature.title}
                      </h3>
                      <p className="text-gray-600 mb-6 leading-relaxed">
                        {feature.description}
                      </p>
                      <ul className="space-y-3 mb-6">
                        {feature.features.map((item, idx) => (
                          <li key={idx} className="flex items-center">
                            <i className="ri-check-line w-5 h-5 flex items-center justify-center text-[#D4AF37] mr-3"></i>
                            <span className="text-gray-700">{item}</span>
                          </li>
                        ))}
                      </ul>
                      {feature.id === 1 && (
                        <Link
                          href="/firma-profili"
                          className="inline-flex items-center text-[#D4AF37] font-semibold hover:text-[#B8941F] transition-colors cursor-pointer"
                        >
                          Detayları İncele
                          <i className="ri-arrow-right-line w-5 h-5 flex items-center justify-center ml-2"></i>
                        </Link>
                      )}
                      {feature.id === 2 && (
                        <Link
                          href="/akilli-eslestirme"
                          className="inline-flex items-center text-[#D4AF37] font-semibold hover:text-[#B8941F] transition-colors cursor-pointer"
                        >
                          Detayları İncele
                          <i className="ri-arrow-right-line w-5 h-5 flex items-center justify-center ml-2"></i>
                        </Link>
                      )}
                      {feature.id === 4 && (
                        <Link
                          href="/pazarlama-araclari"
                          className="inline-flex items-center text-[#D4AF37] font-semibold hover:text-[#B8941F] transition-colors cursor-pointer"
                        >
                          Detayları İncele
                          <i className="ri-arrow-right-line w-5 h-5 flex items-center justify-center ml-2"></i>
                        </Link>
                      )}
                      {feature.id === 6 && (
                        <Link
                          href="/akilli-eslestirme"
                          className="inline-flex items-center text-[#D4AF37] font-semibold hover:text-[#B8941F] transition-colors cursor-pointer"
                        >
                          Detayları İncele
                          <i className="ri-arrow-right-line w-5 h-5 flex items-center justify-center ml-2"></i>
                        </Link>
                      )}
                    </div>
                    <div className="lg:w-1/2">
                      <img
                        src={feature.image}
                        alt={feature.title}
                        className="w-full h-64 object-cover object-top rounded-2xl shadow-lg cursor-pointer hover:opacity-90 transition-opacity"
                        onClick={() => openImageModal(feature.image, feature.title)}
                      />
                    </div>
                  </div>
                ) : (
                  // Sol tarafta resim, sağ tarafta açıklama
                  <div className="flex flex-col lg:flex-row items-center gap-8">
                    <div className="lg:w-1/2 order-2 lg:order-1">
                      <img
                        src={feature.image}
                        alt={feature.title}
                        className="w-full h-64 object-cover object-top rounded-2xl shadow-lg cursor-pointer hover:opacity-90 transition-opacity"
                        onClick={() => openImageModal(feature.image, feature.title)}
                      />
                    </div>
                    <div className="lg:w-1/2 order-1 lg:order-2">
                      <div className="w-16 h-16 bg-[#1B365D]/10 rounded-full flex items-center justify-center mb-6">
                        <i className={`${feature.icon} w-8 h-8 flex items-center justify-center text-[#1B365D]`}></i>
                      </div>
                      <h3 className="text-2xl font-bold text-[#1B365D] mb-4">
                        {feature.title}
                      </h3>
                      <p className="text-gray-600 mb-6 leading-relaxed">
                        {feature.description}
                      </p>
                      <ul className="space-y-3 mb-6">
                        {feature.features.map((item, idx) => (
                          <li key={idx} className="flex items-center">
                            <i className="ri-check-line w-5 h-5 flex items-center justify-center text-[#1B365D] mr-3"></i>
                            <span className="text-gray-700">{item}</span>
                          </li>
                        ))}
                      </ul>
                      {feature.id === 1 && (
                        <Link
                          href="/firma-profili"
                          className="inline-flex items-center text-[#1B365D] font-semibold hover:text-[#2C4F7C] transition-colors cursor-pointer"
                        >
                          Detayları İncele
                          <i className="ri-arrow-right-line w-5 h-5 flex items-center justify-center ml-2"></i>
                        </Link>
                      )}
                      {feature.id === 2 && (
                        <Link
                          href="/akilli-eslestirme"
                          className="inline-flex items-center text-[#1B365D] font-semibold hover:text-[#2C4F7C] transition-colors cursor-pointer"
                        >
                          Detayları İncele
                          <i className="ri-arrow-right-line w-5 h-5 flex items-center justify-center ml-2"></i>
                        </Link>
                      )}
                      {feature.id === 4 && (
                        <Link
                          href="/pazarlama-araclari"
                          className="inline-flex items-center text-[#1B365D] font-semibold hover:text-[#2C4F7C] transition-colors cursor-pointer"
                        >
                          Detayları İncele
                          <i className="ri-arrow-right-line w-5 h-5 flex items-center justify-center ml-2"></i>
                        </Link>
                      )}
                      {feature.id === 6 && (
                        <Link
                          href="/akilli-eslestirme"
                          className="inline-flex items-center text-[#1B365D] font-semibold hover:text-[#2C4F7C] transition-colors cursor-pointer"
                        >
                          Detayları İncele
                          <i className="ri-arrow-right-line w-5 h-5 flex items-center justify-center ml-2"></i>
                        </Link>
                      )}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="mt-20 text-center">
            <div className="bg-gradient-to-r from-[#D4AF37] to-[#B8941F] rounded-2xl p-8 text-white">
              <h3 className="text-2xl font-bold mb-4">
                Tüm Özellikleri Keşfetmeye Hazır Mısınız?
              </h3>
              <p className="text-white/90 mb-6 max-w-2xl mx-auto">
                Ücretsiz hesabınızı oluşturun ve Hatay'ın en güçlü iş ağının parçası olun.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="/kayit"
                  className="bg-white text-[#D4AF37] px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors whitespace-nowrap cursor-pointer inline-block"
                >
                  Ücretsiz Başla
                </a>
                <a
                  href="/demo"
                  className="bg-transparent border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-[#D4AF37] transition-colors whitespace-nowrap cursor-pointer inline-block"
                >
                  Demo İzle
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Image Modal */}
      {showImageModal && (
        <div
          className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4"
          onClick={() => setShowImageModal(false)}
        >
          <div className="relative max-w-4xl max-h-full">
            <button
              onClick={() => setShowImageModal(false)}
              className="absolute -top-10 right-0 text-white hover:text-gray-300 text-2xl font-bold cursor-pointer"
            >
              <i className="ri-close-line w-8 h-8 flex items-center justify-center"></i>
            </button>
            <img
              src={selectedImage.src}
              alt={`${selectedImage.alt} - Tam Boy`}
              className="max-w-full max-h-full object-contain rounded-lg"
              onClick={(e) => e.stopPropagation()}
            />
          </div>
        </div>
      )}
    </>
  );
}

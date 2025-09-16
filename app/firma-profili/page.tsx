'use client';

import { useState, useEffect } from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

export default function FirmaProfilPage() {
  const [activeProductIndex, setActiveProductIndex] = useState(0);
  const [currentUrl, setCurrentUrl] = useState('');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setCurrentUrl(window.location.href);
    }
  }, []);

  const products = [
    {
      id: 1,
      name: "Web Tasarım Hizmetleri",
      description: "Modern ve kullanıcı dostu web siteleri tasarlıyoruz. Responsive tasarım ile tüm cihazlarda mükemmel görünüm.",
      image: "https://readdy.ai/api/search-image?query=modern%20web%20design%20interface%20on%20computer%20screen%2C%20professional%20website%20layout%20design%2C%20clean%20user%20interface%2C%20responsive%20web%20development%2C%20digital%20design%20workspace%20with%20multiple%20devices%20showing%20website&width=400&height=300&seq=web-design-service&orientation=landscape",
      features: ["Responsive Tasarım", "SEO Optimizasyonu", "Hız Optimizasyonu", "Mobil Uyumlu"]
    },
    {
      id: 2,
      name: "E-Ticaret Çözümleri",
      description: "Online satış platformları ve e-ticaret siteleri geliştiriyoruz. Güvenli ödeme sistemleri ve stok yönetimi.",
      image: "https://readdy.ai/api/search-image?query=e-commerce%20online%20shopping%20website%20interface%2C%20digital%20marketplace%20design%2C%20shopping%20cart%20and%20product%20pages%2C%20online%20store%20development%2C%20professional%20e-commerce%20platform%20design&width=400&height=300&seq=ecommerce-solution&orientation=landscape",
      features: ["Güvenli Ödeme", "Stok Yönetimi", "Sipariş Takibi", "Müşteri Paneli"]
    },
    {
      id: 3,
      name: "Mobil Uygulama Geliştirme",
      description: "iOS ve Android platformları için native ve hybrid mobil uygulamalar geliştiriyoruz.",
      image: "https://readdy.ai/api/search-image?query=mobile%20app%20development%20interface%20on%20smartphone%20screens%2C%20iOS%20and%20Android%20app%20design%2C%20mobile%20user%20interface%20development%2C%20app%20development%20workspace%20with%20phones%20and%20tablets&width=400&height=300&seq=mobile-app-dev&orientation=landscape",
      features: ["Native Geliştirme", "Cross Platform", "App Store Yayınlama", "Bakım Desteği"]
    },
    {
      id: 4,
      name: "Dijital Pazarlama",
      description: "SEO, sosyal medya yönetimi ve Google Ads ile dijital varlığınızı güçlendiriyoruz.",
      image: "https://readdy.ai/api/search-image?query=digital%20marketing%20analytics%20dashboard%2C%20social%20media%20management%20interface%2C%20SEO%20optimization%20tools%2C%20online%20advertising%20campaigns%2C%20digital%20marketing%20workspace%20with%20charts%20and%20graphs&width=400&height=300&seq=digital-marketing&orientation=landscape",
      features: ["SEO Optimizasyonu", "Sosyal Medya", "Google Ads", "Analitik Raporlama"]
    },
    {
      id: 5,
      name: "Grafik Tasarım",
      description: "Logo tasarımı, kurumsal kimlik ve tüm görsel iletişim materyallerinizi tasarlıyoruz.",
      image: "https://readdy.ai/api/search-image?query=graphic%20design%20workspace%20with%20creative%20tools%2C%20logo%20design%20process%2C%20brand%20identity%20materials%2C%20professional%20graphic%20design%20studio%2C%20design%20software%20interface%20with%20creative%20projects&width=400&height=300&seq=graphic-design&orientation=landscape",
      features: ["Logo Tasarımı", "Kurumsal Kimlik", "Baskı Tasarımları", "Sosyal Medya Görselleri"]
    },
    {
      id: 6,
      name: "IT Danışmanlığı",
      description: "Teknoloji altyapınızı güçlendirmek için profesyonel danışmanlık hizmetleri sunuyoruz.",
      image: "https://readdy.ai/api/search-image?query=IT%20consulting%20meeting%20room%2C%20technology%20infrastructure%20planning%2C%20professional%20IT%20consultants%20working%20with%20laptops%2C%20network%20servers%20and%20technology%20equipment%2C%20business%20technology%20solutions&width=400&height=300&seq=it-consulting&orientation=landscape",
      features: ["Altyapı Planlaması", "Güvenlik Danışmanlığı", "Sistem Integration", "Teknik Destek"]
    }
  ];

  const companyInfo = {
    name: "TechSolutions Digital",
    logo: "https://readdy.ai/api/search-image?query=modern%20tech%20company%20logo%20design%2C%20digital%20technology%20symbol%2C%20blue%20and%20purple%20gradient%20colors%2C%20clean%20geometric%20design%2C%20professional%20corporate%20branding%2C%20minimalist%20technology%20logo%20on%20white%20background&width=200&height=200&seq=techsolutions-logo&orientation=squarish",
    description: "10 yıllık deneyimimizle dijital dönüşüm yolculuğunuzda yanınızdayız. Web tasarım, mobil uygulama geliştirme ve dijital pazarlama alanlarında uzman ekibimizle işletmenizi geleceğe taşıyoruz.",
    sector: "Bilişim Teknolojileri",
    foundedYear: "2014",
    employeeCount: "25",
    address: "Maslak Mahallesi, Teknoloji Caddesi No:42/8, Sarıyer/İstanbul",
    phone: "+90 212 555 0123",
    email: "info@techsolutions.com.tr",
    website: "www.techsolutions.com.tr",
    socialMedia: {
      linkedin: "https://linkedin.com/company/techsolutions",
      instagram: "https://instagram.com/techsolutions",
      twitter: "https://twitter.com/techsolutions",
      facebook: "https://facebook.com/techsolutions"
    }
  };

  const generateQRCode = () => {
    if (!currentUrl) return '';
    return `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(currentUrl)}`;
  };

  const handleShare = () => {
    if (typeof window === 'undefined') return;

    if (navigator.share) {
      navigator.share({
        title: companyInfo.name,
        text: companyInfo.description,
        url: currentUrl
      });
    } else {
      navigator.clipboard.writeText(currentUrl).then(() => {
        alert('Link panoya kopyalandı!');
      });
    }
  };

  const handleQRDownload = () => {
    if (typeof window === 'undefined') return;

    const qrImage = generateQRCode();
    if (!qrImage) return;

    const link = document.createElement('a');
    link.href = qrImage;
    link.download = `${companyInfo.name}-QR-Kod.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="pt-16">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-[#1B365D] to-[#2E5984] py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Firmanızı Profesyonelce Tanıtın
            </h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              Ürün ve hizmetlerinizi sergileyin, potansiyel müşterilere kolayca ulaşın.
            </p>
          </div>
        </section>

        {/* Company Info Card */}
        <section className="py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-white rounded-2xl shadow-lg p-8 mb-12">
              <div className="flex flex-col md:flex-row items-center md:items-start space-y-6 md:space-y-0 md:space-x-8">
                <div className="flex-shrink-0">
                  <img
                    src={companyInfo.logo}
                    alt={`${companyInfo.name} Logo`}
                    className="w-32 h-32 rounded-xl object-contain bg-gray-50 p-4"
                  />
                </div>
                <div className="flex-1 text-center md:text-left">
                  <div className="flex flex-col md:flex-row md:items-center md:space-x-4 mb-4">
                    <h2 className="text-3xl font-bold text-gray-900 mb-2 md:mb-0">
                      {companyInfo.name}
                    </h2>
                    <span className="bg-[#D4AF37]/10 text-[#B8941F] px-4 py-2 rounded-full text-sm font-medium">
                      {companyInfo.sector}
                    </span>
                  </div>
                  <p className="text-gray-600 leading-relaxed mb-6">
                    {companyInfo.description}
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                    <div className="flex items-center justify-center md:justify-start">
                      <i className="ri-calendar-line w-4 h-4 flex items-center justify-center mr-2 text-[#1B365D]"></i>
                      <span><strong>Kuruluş:</strong> {companyInfo.foundedYear}</span>
                    </div>
                    <div className="flex items-center justify-center md:justify-start">
                      <i className="ri-team-line w-4 h-4 flex items-center justify-center mr-2 text-[#1B365D]"></i>
                      <span><strong>Ekip:</strong> {companyInfo.employeeCount} kişi</span>
                    </div>
                    <div className="flex items-center justify-center md:justify-start">
                      <i className="ri-global-line w-4 h-4 flex items-center justify-center mr-2 text-[#1B365D]"></i>
                      <span><strong>Web:</strong> {companyInfo.website}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Products/Services Showcase */}
        <section className="py-12 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Ürün ve Hizmet Vitrini
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Teknoloji ve yaratıcılığı bir araya getirerek size özel çözümler sunuyoruz
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {products.map((product, index) => (
                <div 
                  key={product.id}
                  className="bg-gray-50 rounded-xl overflow-hidden hover:shadow-lg transition-all duration-300 cursor-pointer"
                  onClick={() => setActiveProductIndex(index)}
                >
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover object-top hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-4 right-4 bg-[#1B365D] text-white px-3 py-1 rounded-full text-xs font-medium">
                      #{index + 1}
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-3">
                      {product.name}
                    </h3>
                    <p className="text-gray-600 mb-4 line-clamp-3">
                      {product.description}
                    </p>
                    <div className="space-y-2">
                      {product.features.slice(0, 2).map((feature, featureIndex) => (
                        <div key={featureIndex} className="flex items-center text-sm text-gray-700">
                          <i className="ri-check-line w-4 h-4 flex items-center justify-center mr-2 text-green-600"></i>
                          <span>{feature}</span>
                        </div>
                      ))}
                      {product.features.length > 2 && (
                        <div className="text-xs text-gray-500">
                          +{product.features.length - 2} özellik daha
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Information */}
        <section className="py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Contact Details */}
              <div className="bg-white rounded-xl shadow-sm p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  İletişim Bilgileri
                </h2>
                <div className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-[#1B365D]/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <i className="ri-map-pin-line w-6 h-6 flex items-center justify-center text-[#1B365D]"></i>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">Adres</h3>
                      <p className="text-gray-600">{companyInfo.address}</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-[#1B365D]/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <i className="ri-phone-line w-6 h-6 flex items-center justify-center text-[#1B365D]"></i>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">Telefon</h3>
                      <a href={`tel:${companyInfo.phone}`} className="text-[#1B365D] hover:text-[#D4AF37] cursor-pointer">
                        {companyInfo.phone}
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-[#1B365D]/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <i className="ri-mail-line w-6 h-6 flex items-center justify-center text-[#1B365D]"></i>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">E-posta</h3>
                      <a href={`mailto:${companyInfo.email}`} className="text-[#1B365D] hover:text-[#D4AF37] cursor-pointer">
                        {companyInfo.email}
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-[#1B365D]/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <i className="ri-global-line w-6 h-6 flex items-center justify-center text-[#1B365D]"></i>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">Website</h3>
                      <a 
                        href={`https://${companyInfo.website}`} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-[#1B365D] hover:text-[#D4AF37] cursor-pointer"
                      >
                        {companyInfo.website}
                      </a>
                    </div>
                  </div>

                  {/* Social Media */}
                  <div className="pt-6 border-t border-gray-200">
                    <h3 className="font-semibold text-gray-900 mb-4">Sosyal Medya</h3>
                    <div className="flex space-x-4">
                      <a
                        href={companyInfo.socialMedia.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-10 h-10 bg-[#0077B5] text-white rounded-lg flex items-center justify-center hover:opacity-80 transition-opacity cursor-pointer"
                      >
                        <i className="ri-linkedin-fill w-5 h-5 flex items-center justify-center"></i>
                      </a>
                      <a
                        href={companyInfo.socialMedia.instagram}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg flex items-center justify-center hover:opacity-80 transition-opacity cursor-pointer"
                      >
                        <i className="ri-instagram-fill w-5 h-5 flex items-center justify-center"></i>
                      </a>
                      <a
                        href={companyInfo.socialMedia.twitter}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-10 h-10 bg-[#1DA1F2] text-white rounded-lg flex items-center justify-center hover:opacity-80 transition-opacity cursor-pointer"
                      >
                        <i className="ri-twitter-fill w-5 h-5 flex items-center justify-center"></i>
                      </a>
                      <a
                        href={companyInfo.socialMedia.facebook}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-10 h-10 bg-[#4267B2] text-white rounded-lg flex items-center justify-center hover:opacity-80 transition-opacity cursor-pointer"
                      >
                        <i className="ri-facebook-fill w-5 h-5 flex items-center justify-center"></i>
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              {/* QR Code Sharing */}
              <div className="bg-white rounded-xl shadow-sm p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  QR Kod Paylaşımı
                </h2>
                <div className="text-center">
                  <div className="bg-gray-50 rounded-xl p-8 mb-6">
                    {currentUrl && (
                      <img
                        src={generateQRCode()}
                        alt="Firma Profili QR Kod"
                        className="mx-auto mb-4"
                        style={{ width: '200px', height: '200px' }}
                      />
                    )}
                    <p className="text-gray-600 mb-4">
                      Firmanızı paylaşmak için bu QR kodu okutun
                    </p>
                    <div className="text-sm text-gray-500">
                      QR kodu telefonunuzla okutarak bu profil sayfasını hızlıca paylaşabilirsiniz
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <button 
                      onClick={handleShare}
                      className="w-full bg-[#1B365D] text-white py-3 px-6 rounded-lg hover:bg-[#2E5984] font-medium whitespace-nowrap cursor-pointer flex items-center justify-center"
                    >
                      <i className="ri-share-line w-4 h-4 flex items-center justify-center mr-2"></i>
                      Profili Paylaş
                    </button>
                    
                    <button 
                      onClick={handleQRDownload}
                      className="w-full bg-[#D4AF37] text-white py-3 px-6 rounded-lg hover:bg-[#B8941F] font-medium whitespace-nowrap cursor-pointer flex items-center justify-center"
                    >
                      <i className="ri-download-line w-4 h-4 flex items-center justify-center mr-2"></i>
                      QR Kodu İndir
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-16 bg-gradient-to-r from-[#1B365D] to-[#2E5984]">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold text-white mb-4">
              Projelerinizi Hayata Geçirelim
            </h2>
            <p className="text-xl text-blue-100 mb-8">
              Uzman ekibimizle dijital dönüşüm yolculuğunuza başlayın
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href={`tel:${companyInfo.phone}`}
                className="bg-[#D4AF37] text-white px-8 py-3 rounded-lg font-semibold hover:bg-[#B8941F] transition-colors whitespace-nowrap cursor-pointer flex items-center justify-center"
              >
                <i className="ri-phone-line w-4 h-4 flex items-center justify-center mr-2"></i>
                Hemen Arayın
              </a>
              <a
                href={`mailto:${companyInfo.email}`}
                className="bg-white text-[#1B365D] px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors whitespace-nowrap cursor-pointer flex items-center justify-center"
              >
                <i className="ri-mail-line w-4 h-4 flex items-center justify-center mr-2"></i>
                E-posta Gönderin
              </a>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

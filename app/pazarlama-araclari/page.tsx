
'use client';
import Link from 'next/link';

const marketingTools = [
  {
    id: 1,
    title: "Banner Reklam Alanları",
    description: "Firmanızın görünürlüğünü maksimum seviyeye çıkaran stratejik banner reklam pozisyonları",
    icon: "ri-advertisement-line",
    image: "https://readdy.ai/api/search-image?query=Professional%20banner%20advertisement%20display%20system%20on%20Turkish%20business%20platform%2C%20bright%20modern%20digital%20advertising%20interface%20showing%20strategic%20banner%20placements%2C%20clean%20promotional%20dashboard%20with%20marketing%20analytics%20and%20business%20advertisements&width=500&height=300&seq=banner2&orientation=landscape",
    features: [
      "Ana sayfa üst banner",
      "Kategori sayfaları yan banner",
      "Firma profil sayfaları alt banner",
      "Mobil responsive banner tasarımı"
    ],
    benefits: [
      "Günde ortalama 10,000+ görüntülenme",
      "Hedefli kullanıcı kitlesine ulaşım",
      "Tıklama oranları ve analitik raporlar",
      "Profesyonel tasarım desteği"
    ]
  },
  {
    id: 2,
    title: "Öne Çıkarma Seçenekleri",
    description: "Firmanızı rakiplerinizden ayıran özel görünürlük ve öncelik sistemleri",
    icon: "ri-star-line",
    image: "https://readdy.ai/api/search-image?query=Business%20highlighting%20premium%20features%20on%20Turkish%20platform%2C%20bright%20professional%20interface%20displaying%20featured%20business%20listings%20with%20golden%20highlights%2C%20modern%20premium%20promotion%20system%20with%20business%20cards%20and%20special%20badges&width=500&height=300&seq=featured2&orientation=landscape",
    features: [
      "Arama sonuçlarında üst sıralama",
      "Altın çerçeve ile öne çıkarma",
      "Premium profil rozeti",
      "Kategori başında listeleme"
    ],
    benefits: [
      "5 kat daha fazla profil ziyareti",
      "Potansiyel müşteri artışı",
      "Marka kredibilitesi artışı",
      "Rekabet avantajı"
    ]
  },
  {
    id: 3,
    title: "E-bülten Sponsorluğu",
    description: "Haftalık e-bültenlerimizde firmanızı binlerce iş insanına tanıtın",
    icon: "ri-mail-line",
    image: "https://readdy.ai/api/search-image?query=Professional%20email%20newsletter%20marketing%20platform%20showing%20Turkish%20business%20sponsorship%20opportunities%2C%20bright%20modern%20email%20template%20interface%20with%20business%20promotional%20content%2C%20clean%20newsletter%20design%20with%20subscriber%20analytics&width=500&height=300&seq=newsletter2&orientation=landscape",
    features: [
      "Haftalık 15,000+ abone kitlesine ulaşım",
      "Özel sponsor bölümü",
      "Firmanızın haberlerini yayınlama",
      "Direkt link ve iletişim bilgileri"
    ],
    benefits: [
      "Yüksek açılma oranları (%35+)",
      "Doğrudan hedef kitleye ulaşım",
      "Uzun vadeli marka bilinirliği",
      "Lead generation artışı"
    ]
  },
  {
    id: 4,
    title: "Etkinlik Tanıtımları",
    description: "Düzenlediğiniz etkinlikleri platformumuzda etkili şekilde tanıtın ve katılımcı sayınızı artırın",
    icon: "ri-calendar-event-line",
    image: "https://readdy.ai/api/search-image?query=Turkish%20business%20event%20promotion%20platform%20with%20conference%20and%20networking%20event%20management%2C%20bright%20professional%20event%20marketing%20interface%20showing%20business%20seminars%20and%20trade%20shows%2C%20modern%20event%20calendar%20system&width=500&height=300&seq=events2&orientation=landscape",
    features: [
      "Etkinlik takviminde öne çıkarma",
      "Detaylı etkinlik sayfası oluşturma",
      "Sosyal medya entegrasyonu",
      "Katılımcı kayıt sistemi"
    ],
    benefits: [
      "Hedefli katılımcı artışı",
      "Networking fırsatları",
      "Marka pozisyonlandırması",
      "Müşteri etkileşimi artışı"
    ]
  }
];

const pricingPlans = [
  {
    name: "Başlangıç Paketi",
    price: "1,500",
    period: "aylık",
    description: "Küçük işletmeler için ideal pazarlama çözümü",
    features: [
      "2 adet yan banner alanı",
      "Arama sonuçlarında öne çıkarma",
      "Aylık 1 e-bülten sponsorluğu",
      "Temel analitik raporlar"
    ]
  },
  {
    name: "Profesyonel Paketi",
    price: "3,000",
    period: "aylık",
    popular: true,
    description: "Orta ölçekli firmalar için kapsamlı tanıtım",
    features: [
      "Ana sayfa banner + 4 yan banner",
      "Premium öne çıkarma seçenekleri",
      "Haftalık e-bülten sponsorluğu",
      "2 adet etkinlik tanıtımı",
      "Detaylı analitik raporlar",
      "Tasarım desteği"
    ]
  },
  {
    name: "Kurumsal Paket",
    price: "5,500",
    period: "aylık",
    description: "Büyük firmalar için özel tanıtım çözümleri",
    features: [
      "Tüm banner alanları",
      "VIP öne çıkarma",
      "Özel e-bülten bölümü",
      "Sınırsız etkinlik tanıtımı",
      "Özel landing sayfası",
      "Kişisel hesap yöneticisi",
      "7/24 destek"
    ]
  }
];

export default function MarketingToolsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-[#1B365D] to-[#2C4F7C] text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-5xl font-bold mb-6">
              Pazarlama Araçları
            </h1>
            <p className="text-xl text-white/90 max-w-3xl mx-auto mb-8">
              Firmanızın görünürlüğünü artıran profesyonel pazarlama araçları ile rekabet avantajı elde edin
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-[#D4AF37] text-white px-8 py-3 rounded-lg font-semibold hover:bg-[#B8941F] transition-colors whitespace-nowrap cursor-pointer">
                Hemen Başla
              </button>
              <button className="bg-transparent border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-[#1B365D] transition-colors whitespace-nowrap cursor-pointer">
                Demo Talep Et
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Marketing Tools Detail */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-[#1B365D] mb-4">
              Pazarlama Araçları Detayları
            </h2>
            <p className="text-xl text-gray-600">
              Her bir pazarlama aracının size sunduğu avantajları keşfedin
            </p>
          </div>

          <div className="space-y-20">
            {marketingTools.map((tool, index) => (
              <div key={tool.id} className={`flex flex-col ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} items-center gap-12`}>
                <div className="lg:w-1/2">
                  <div className="w-16 h-16 bg-[#D4AF37]/10 rounded-full flex items-center justify-center mb-6">
                    <i className={`${tool.icon} w-8 h-8 flex items-center justify-center text-[#D4AF37]`}></i>
                  </div>
                  <h3 className="text-3xl font-bold text-[#1B365D] mb-4">
                    {tool.title}
                  </h3>
                  <p className="text-gray-600 mb-8 text-lg leading-relaxed">
                    {tool.description}
                  </p>

                  <div className="grid md:grid-cols-2 gap-8">
                    <div>
                      <h4 className="text-lg font-semibold text-[#1B365D] mb-4">Özellikler</h4>
                      <ul className="space-y-3">
                        {tool.features.map((feature, idx) => (
                          <li key={idx} className="flex items-start">
                            <i className="ri-check-line w-5 h-5 flex items-center justify-center text-[#D4AF37] mr-3 mt-0.5"></i>
                            <span className="text-gray-700">{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h4 className="text-lg font-semibold text-[#1B365D] mb-4">Faydalar</h4>
                      <ul className="space-y-3">
                        {tool.benefits.map((benefit, idx) => (
                          <li key={idx} className="flex items-start">
                            <i className="ri-star-line w-5 h-5 flex items-center justify-center text-[#D4AF37] mr-3 mt-0.5"></i>
                            <span className="text-gray-700">{benefit}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="lg:w-1/2">
                  <img
                    src={tool.image}
                    alt={tool.title}
                    className="w-full h-80 object-cover object-top rounded-2xl shadow-xl"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-[#1B365D] mb-4">
              Pazarlama Paketleri
            </h2>
            <p className="text-xl text-gray-600">
              İhtiyaçlarınıza uygun paketi seçin ve hemen başlayın
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {pricingPlans.map((plan, index) => (
              <div key={index} className={`bg-white rounded-2xl shadow-lg p-8 relative ${plan.popular ? 'ring-4 ring-[#D4AF37] scale-105' : ''}`}>
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-[#D4AF37] text-white px-4 py-2 rounded-full text-sm font-semibold">
                      En Popüler
                    </span>
                  </div>
                )}

                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold text-[#1B365D] mb-2">{plan.name}</h3>
                  <p className="text-gray-600 mb-4">{plan.description}</p>
                  <div className="flex items-baseline justify-center">
                    <span className="text-4xl font-bold text-[#1B365D]">₺{plan.price}</span>
                    <span className="text-gray-600 ml-2">/{plan.period}</span>
                  </div>
                </div>

                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start">
                      <i className="ri-check-line w-5 h-5 flex items-center justify-center text-[#D4AF37] mr-3 mt-0.5"></i>
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>

                <button className={`w-full py-3 rounded-lg font-semibold transition-colors whitespace-nowrap cursor-pointer ${
                  plan.popular
                    ? 'bg-[#D4AF37] text-white hover:bg-[#B8941F]'
                    : 'bg-gray-100 text-[#1B365D] hover:bg-gray-200'
                }`}>
                  Paketi Seç
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Success Stories */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-[#1B365D] mb-4">
              Başarı Hikayeleri
            </h2>
            <p className="text-xl text-gray-600">
              Pazarlama araçlarımız ile başarıya ulaşan firmalarımız
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {[{
              company: "Antakya Gıda A.Ş.",
              result: "%300 Web Trafiği Artışı",
              story: "Banner reklamları sayesinde günlük web sitesi ziyaretçi sayımız 3 katına çıktı. Yeni müşteri kazanımımız %200 arttı.",
              image: "https://readdy.ai/api/search-image?query=Successful%20Turkish%20food%20company%20office%20building%20with%20modern%20architecture%2C%20bright%20professional%20business%20environment%20showing%20growth%20and%20success%2C%20clean%20corporate%20headquarters&width=300&height=200&seq=success1&orientation=landscape"
            },
            {
              company: "Hatay İnşaat Ltd.",
              result: "%250 Lead Artışı",
              story: "E-bülten sponsorluğu ile hedef kitlemize doğrudan ulaştık. Proje taleplerimiz %250 arttı.",
              image: "https://readdy.ai/api/search-image?query=Modern%20Turkish%20construction%20company%20with%20successful%20building%20projects%2C%20bright%20professional%20construction%20site%20and%20office%2C%20clean%20corporate%20success%20story&width=300&height=200&seq=success2&orientation=landscape"
            },
            {
              company: "Defne Tekstil",
              result: "%400 Etkinlik Katılımı",
              story: "Öne çıkarma seçenekleri ile marka bilinirliğimiz arttı. Düzenlediğimiz fuara katılım 4 kat arttı.",
              image: "https://readdy.ai/api/search-image?query=Successful%20Turkish%20textile%20company%20showroom%20with%20modern%20fashion%20displays%2C%20bright%20professional%20retail%20environment%20showing%20business%20growth%2C%20clean%20corporate%20textile%20facility&width=300&height=200&seq=success3&orientation=landscape"
            }
            ].map((story, index) => (
              <div key={index} className="bg-white rounded-2xl p-6 shadow-lg">
                <img
                  src={story.image}
                  alt={story.company}
                  className="w-full h-48 object-cover object-top rounded-lg mb-6"
                />
                <h3 className="text-xl font-bold text-[#1B365D] mb-2">
                  {story.company}
                </h3>
                <div className="text-2xl font-bold text-[#D4AF37] mb-4">
                  {story.result}
                </div>
                <p className="text-gray-600 italic">
                  "{story.story}"
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-[#D4AF37] to-[#B8941F]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Pazarlama Araçlarımız ile Büyümeye Başlayın
          </h2>
          <p className="text-xl text-white/90 mb-8">
            Firmanızın potansiyelini açığa çıkarın ve rekabet avantajı elde edin
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-[#D4AF37] px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors whitespace-nowrap cursor-pointer">
              Ücretsiz Danışmanlık Al
            </button>
            <Link href="/" className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-[#D4AF37] transition-colors whitespace-nowrap cursor-pointer inline-block">
              Ana Sayfaya Dön
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

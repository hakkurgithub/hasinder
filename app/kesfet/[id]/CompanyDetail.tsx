
'use client';

import { useState } from 'react';
import Link from 'next/link';
import ContactModal from './ContactModal';

const companies = [
  {
    id: 1,
    name: "AgroTech Tarım Teknolojileri",
    logo: "https://readdy.ai/api/search-image?query=modern%20agricultural%20technology%20company%20logo%20with%20green%20and%20blue%20colors%2C%20simple%20geometric%20design%2C%20professional%20corporate%20identity%2C%20clean%20white%20background%2C%20minimalist%20style&width=200&height=200&seq=agrotech-logo&orientation=squarish",
    heroImage: "https://readdy.ai/api/search-image?query=modern%20agricultural%20technology%20farm%20with%20IoT%20sensors%2C%20smart%20farming%20equipment%2C%20green%20fields%2C%20blue%20sky%2C%20professional%20photography%20style%2C%20high%20quality%20corporate%20image%2C%20technology%20innovation%20in%20agriculture&width=1200&height=400&seq=agrotech-hero&orientation=landscape",
    description: "AgroTech, 2019 yılında kurulan ve tarım sektöründe dijital dönüşümü önde gelen bir teknoloji firmasıdır. IoT sensörleri, yapay zeka destekli tarım robotları ve bulut tabanlı analitik çözümlerle çiftçilerin verimini %40'a kadar artırmayı başarmıştır. Şirket, sürdürülebilir tarım uygulamalarını destekleyerek hem çevreye hem de çiftçilere fayda sağlamayı misyon edinmiştir.",
    sector: "Tarım Teknolojisi",
    location: "İstanbul",
    foundedYear: "2019",
    employeeCount: "45 kişi",
    phone: "+90 212 555 0123",
    email: "info@agrotech.com.tr",
    website: "www.agrotech.com.tr",
    address: "Maslak Mahallesi, Teknoloji Caddesi No:15, AVM Teknokent B Blok Kat:8 Daire:12, Sarıyer/İstanbul",
    certifications: ["ISO 9001:2015", "ISO 14001:2015", "TSE COVID-19 Güvenli Hizmet"],
    awards: ["TÜBİTAK Girişimcilik Ödülü 2022", "Ar-Ge Merkezi Belgesi", "Teknoloji Geliştirme Bölgesi Sertifikası"],
    detailedDescription: `AgroTech Tarım Teknolojileri, Türkiye\'nin tarım sektöründeki dijital dönüşümüne öncülük eden bir teknoloji şirketidir. 
** 
Vizyonumuz:** Tarımda teknoloji kullanımını yaygınlaştırarak, çiftçilerimizin verimini artırmak ve sürdürülebilir tarım uygulamalarını desteklemek.
** 
Misyonumuz:** En son teknolojileri kullanarak çiftçilerin karar alma süreçlerini iyileştirmek, kaynak kullanımını optimize etmek ve tarımsal üretimde çevresel etkiyi minimize etmek.
** 
Teknolojik Altyapımız:**
- 15.000+ IoT sensör ağı
- AI/ML algoritmaları ile 7/24 veri analizi
- Bulut tabanlı platform altyapısı
- Mobil uygulama ve web dashboard
- Gerçek zamanlı alarm ve bildirim sistemi
** 
Başarı Hikayemiz:**
Son 4 yılda 2.500+ çiftçi ile çalışarak 850.000 dekar alanda hizmet verdik. Müşterilerimiz ortalama %38 verim artışı ve %45 su tasarrufu elde etti.`,
    services: [
      {
        name: "Akıllı Sulama Sistemleri",
        description: "Toprak nem sensörleri ve hava durumu verilerini kullanarak otomatik sulama kontrolü",
        features: ["7/24 toprak izleme", "Otomatik sulama kontrolü", "Su tasarrufu %45'e kadar", "Mobil uygulama kontrolü"]
      },
      {
        name: "IoT Tarım Sensörleri",
        description: "Toprak, hava ve bitki sağlığını izleyen gelişmiş sensör teknolojileri",
        features: ["Toprak pH, nem, sıcaklık ölçümü", "Hava kalitesi analizi", "Bitki stres seviyesi tespiti", "Hastalık riski erken uyarısı"]
      },
      {
        name: "Drone ile Tarla İzleme",
        description: "Multispektral kameralar ile bitki sağlığı analizi ve harita oluşturma",
        features: ["Bitki sağlığı haritası", "Verim tahmini", "Zararlı tespit", "Gübreleme haritası"]
      },
      {
        name: "Yapay Zeka Destekli Analiz",
        description: "Büyük veri analizi ile üretim optimizasyonu ve tahmin modellemesi",
        features: ["Verim tahmin modeli", "Hastalık risk analizi", "Maliyet optimizasyonu", "Pazarlama zamanı önerisi"]
      },
      {
        name: "Tarım Danışmanlığı",
        description: "Uzman ziraat mühendisleri ile birebir danışmanlık hizmeti",
        features: ["Kişiselleştirilmiş öneriler", "Sezon planlaması", "Tohum ve gübre seçimi", "7/24 teknik destek"]
      }
    ],
    socialLinks: {
      linkedin: "https://linkedin.com/company/agrotech",
      twitter: "https://twitter.com/agrotech",
      instagram: "https://instagram.com/agrotech"
    },
    gallery: [
      "https://readdy.ai/api/search-image?query=smart%20agriculture%20IoT%20sensors%20in%20field%20monitoring%20tomato%20plants%2C%20modern%20farming%20technology%20with%20digital%20displays%20showing%20real-time%20data%2C%20green%20greenhouse%20environment&width=400&height=300&seq=agrotech-1&orientation=landscape",
      "https://readdy.ai/api/search-image?query=automated%20irrigation%20system%20with%20smart%20valves%20and%20sensors%20in%20agricultural%20field%2C%20precision%20farming%20equipment%2C%20water%20management%20technology%2C%20professional%20agricultural%20setup&width=400&height=300&seq=agrotech-2&orientation=landscape",
      "https://readdy.ai/api/search-image?query=agricultural%20drone%20flying%20over%20crops%20with%20multispectral%20camera%2C%20aerial%20view%20of%20organized%20farmland%2C%20precision%20agriculture%20technology%2C%20modern%20farming%20innovation&width=400&height=300&seq=agrotech-3&orientation=landscape",
      "https://readdy.ai/api/search-image?query=farmers%20using%20tablet%20and%20mobile%20app%20to%20monitor%20crop%20data%2C%20agricultural%20technology%20interface%2C%20digital%20farming%20dashboard%2C%20modern%20agricultural%20workplace&width=400&height=300&seq=agrotech-4&orientation=landscape"
    ],
    clients: ["Tarım ve Orman Bakanlığı", "Migros", "Carrefour", "Ülker Bisküvi", "Pınar Süt"],
    projects: [
      {
        name: "Akdeniz Sera Projesi",
        description: "250 dekar sera alanında tam otomatik iklim ve sulama kontrolü",
        year: "2023",
        result: "%52 verim artışı"
      },
      {
        name: "Çukurova Pamuk İzleme",
        description: "5.000 dekar pamuk tarlasında drone ile izleme sistemi",
        year: "2022",
        result: "%38 maliyet tasarrufu"
      }
    ],
    team: [
      {
        name: "Dr. Mehmet Yılmaz",
        position: "Genel Müdür & Kurucu",
        experience: "Ziraat Mühendisi, 15 yıl tarım sektörü deneyimi"
      },
      {
        name: "Ayşe Demir",
        position: "Teknoloji Direktörü",
        experience: "Yazılım Mühendisi, IoT uzmanı"
      }
    ]
  },
  {
    id: 2,
    name: "SolarMax Enerji Çözümleri",
    logo: "https://readdy.ai/api/search-image?query=solar%20energy%20company%20logo%20with%20sun%20symbol%2C%20yellow%20and%20orange%20gradient%20colors%2C%20modern%20clean%20design%2C%20renewable%20energy%20theme%2C%20white%20background%2C%20professional%20corporate%20branding&width=200&height=200&seq=solarmax-logo&orientation=squarish",
    heroImage: "https://readdy.ai/api/search-image?query=large%20scale%20solar%20panel%20installation%20on%20commercial%20building%20rooftop%2C%20renewable%20energy%20system%20with%20blue%20sky%20background%2C%20professional%20photography%20of%20solar%20energy%20facility%2C%20clean%20energy%20technology&width=1200&height=400&seq=solarmax-hero&orientation=landscape",
    description: "SolarMax Enerji Çözümleri, 2018 yılında kurulan ve Türkiye\'nin güneş enerjisi sektöründe öncü firmalarından biridir. 500+ başarılı proje ile 50MW kurulu güç kapasitesi oluşturmuş, binlerce aileye ve işletmeye temiz enerji sağlamaktadır.",
    sector: "Yenilenebilir Enerji",
    location: "Ankara",
    foundedYear: "2018",
    employeeCount: "75 kişi",
    phone: "+90 312 555 0456",
    email: "bilgi@solarmax.com.tr",
    website: "www.solarmax.com.tr",
    address: "Çankaya Mahallesi, Enerji Bulvarı No:42, Plaza Center A Blok Kat:15, Çankaya/Ankara",
    certifications: ["ISO 9001:2015", "ISO 45001:2018", "EPDK Elektrik Üretim Lisansı"],
    awards: ["Enerji Verimliliği Ödülü 2023", "İhracat Şampiyonu 2022", "Yeşil Teknoloji Ödülü"],
    detailedDescription: `SolarMax Enerji Çözümleri, Türkiye\'nin güneş enerjisi alanındaki en deneyimli ve güvenilir firmalarından biridir.
** 
Vizyonumuz:** Türkiye\'yi güneş enerjisinde bölgesel lider yapmak ve sürdürülebilir enerji geleceğini şekillendirmek.
** 
Misyonumuz:** En kaliteli güneş enerjisi çözümleri sunarak müşterilerimizin enerji maliyetlerini azaltmak ve çevreye olan katkılarını artırmak.
** 
Teknolojik Üstünlüklerimiz:**
- Tier-1 panel üreticileri ile çalışma
- Alman inverter teknolojisi
- 25 yıl performans garantisi
- Uzaktan izleme ve bakım sistemi
- Hibrit enerji depolama çözümleri
** 
Sektördeki Konumumuz:**
Türkiye güneş enerjisi sektöründe %8 pazar payı ile ilk 10 firma arasındayız. Konut, ticari ve endüstriyel segmentlerde güçlü referanslarımız bulunmaktadır.
** 
Sürdürülebilirlik:**
Projelerimiz sayesinde yılda 28.000 ton CO2 emisyon azaltımı sağlanmaktadır.`,
    services: [
      {
        name: "Çatı Üstü Güneş Enerjisi Sistemi",
        description: "Konut ve işyerleri için özel tasarım güneş paneli kurulumu",
        features: ["Ücretsiz keşif ve proje", "Anahtar teslim kurulum", "25 yıl garanti", "Uzaktan izleme sistemi"]
      },
      {
        name: "Endüstriyel GES Projeleri",
        description: "Büyük ölçekli güneş enerjisi santralleri ve fabrika çözümleri",
        features: ["MW ölçeğinde projeler", "EPC hizmetleri", "Finansman desteği", "O&M bakım hizmetleri"]
      },
      {
        name: "Enerji Depolama Sistemleri",
        description: "Lityum batarya teknolojisi ile enerji depolama çözümleri",
        features: ["Tesla Powerwall", "Hibrit sistem kurulumu", "Akıllı şebeke entegrasyonu", "Acil güç desteği"]
      },
      {
        name: "Tarımsal Sulama GES",
        description: "Tarım arazilerinde sulama için güneş enerjisi çözümleri",
        features: ["Su pompaları için enerji", "Tarla sulama otomasyonu", "Çiftçi dostu finansman", "Verimlilik artışı"]
      },
      {
        name: "Enerji Danışmanlığı",
        description: "Enerji verimliliği ve güneş enerjisi yatırım danışmanlığı",
        features: ["Fizibilite etüdü", "Yatırım analizi", "Teşvik başvuruları", "Proje yönetimi"]
      }
    ],
    socialLinks: {
      linkedin: "https://linkedin.com/company/solarmax",
      facebook: "https://facebook.com/solarmax",
      instagram: "https://instagram.com/solarmax"
    },
    gallery: [
      "https://readdy.ai/api/search-image?query=residential%20solar%20panel%20installation%20on%20house%20roof%20with%20installers%20working%2C%20professional%20solar%20installation%20process%2C%20clean%20energy%20home%20upgrade%2C%20bright%20sunny%20day&width=400&height=300&seq=solarmax-1&orientation=landscape",
      "https://readdy.ai/api/search-image?query=large%20commercial%20solar%20farm%20with%20hundreds%20of%20panels%20in%20organized%20rows%2C%20industrial%20scale%20renewable%20energy%20facility%2C%20blue%20sky%20and%20green%20environment&width=400&height=300&seq=solarmax-2&orientation=landscape",
      "https://readdy.ai/api/search-image?query=modern%20energy%20storage%20battery%20system%20in%20clean%20white%20room%2C%20Tesla%20Powerwall%20installation%2C%20advanced%20energy%20storage%20technology%2C%20professional%20indoor%20setup&width=400&height=300&seq=solarmax-3&orientation=landscape",
      "https://readdy.ai/api/search-image?query=agricultural%20solar%20irrigation%20system%20with%20water%20pumps%20and%20solar%20panels%2C%20farming%20technology%20integration%2C%20sustainable%20agriculture%20solution%2C%20rural%20landscape&width=400&height=300&seq=solarmax-4&orientation=landscape"
    ],
    clients: ["Türkiye Elektrik Dağıtım A.Ş.", "ENKA İnşaat", "Eczacıbaşı", "Koç Holding", "Anadolu Grubu"],
    projects: [
      {
        name: "Ankara Ticaret Merkezi GES",
        description: "2.5 MW çatı üstü güneş enerjisi santrali kurulumu",
        year: "2023",
        result: "Yıllık 4.2 GWh enerji üretimi"
      },
      {
        name: "Konya Tarımsal Sulama Projesi",
        description: "150 çiftçi için güneş enerjili sulama sistemi",
        year: "2022",
        result: "%65 elektrik maliyeti azaltımı"
      }
    ],
    team: [
      {
        name: "İng. Fatma Özkan",
        position: "Genel Müdür",
        experience: "Elektrik Mühendisi, 18 yıl enerji sektörü deneyimi"
      },
      {
        name: "Ali Kaya",
        position: "Proje Direktörü",
        experience: "Güneş enerjisi uzmanı, PMP sertifikalı"
      }
    ]
  },
  {
    id: 7,
    name: "TechFlow Digital",
    logo: "https://readdy.ai/api/search-image?query=modern%20digital%20technology%20company%20logo%20with%20gradient%20blue%20and%20purple%20colors%2C%20tech%20flow%20symbol%2C%20sleek%20geometric%20design%2C%20professional%20corporate%20identity%2C%20clean%20white%20background%2C%20minimalist%20style&width=200&height=200&seq=techflow-logo&orientation=squarish",
    heroImage: "https://readdy.ai/api/search-image?query=modern%20digital%20transformation%20workspace%20with%20multiple%20screens%2C%20software%20development%20team%20coding%2C%20blue%20and%20purple%20lighting%2C%20contemporary%20office%20environment%2C%20technology%20innovation%20atmosphere%2C%20professional%20photography%20style&width=1200&height=400&seq=techflow-hero&orientation=landscape",
    description: "TechFlow Digital, 2020 yılında kurulan ve işletmelerin dijital dönüşümünde öncü rol oynayan bir teknoloji firmasıdır. Web geliştirme, mobil uygulama tasarımı ve dijital pazarlama alanlarında uzman ekibiyle müşterilerine yenilikçi çözümler sunmaktadır.",
    sector: "Dijital Teknoloji",
    location: "İstanbul",
    foundedYear: "2020",
    employeeCount: "32 kişi",
    phone: "+90 212 555 1234",
    email: "info@techflow.digital",
    website: "www.techflow.digital",
    address: "Maslak Mahallesi, Büyükdere Caddesi No:201, Teknopark İstanbul A Blok Kat:12, Sarıyer/İstanbul",
    certifications: ["ISO 27001:2013", "Google Partner", "Microsoft Certified Partner"],
    awards: ["En İyi Dijital Ajans 2023", "Startup İstanbul Ödülü 2022", "Teknoloji İnovasyonu Ödülü"],
    detailedDescription: `TechFlow Digital, işletmelerin dijital dönüşüm sürecinde güvenilir teknoloji partneri olarak hizmet vermektedir.
** 
Vizyonumuz:** Dijital teknolojilerle işletmelerin potansiyelini maksimize etmek ve sürdürülebilir büyüme sağlamak.
** 
Misyonumuz:** Müşterilerimizin dijital varlıklarını güçlendirerek rekabet avantajı kazanmalarını sağlamak.
** 
Teknolojik Uzmanlıklarımız:**
- React, Angular, Vue.js ile modern web geliştirme
- React Native ve Flutter ile mobil uygulama geliştirme
- Node.js, Python, .NET backend çözümleri
- AWS, Azure, Google Cloud altyapı hizmetleri
- SEO, SEM, sosyal medya pazarlama
** 
Çalışma Prensipleri:**
- Agile/Scrum metodolojileri
- CI/CD pipeline ve DevOps uygulamaları
- Responsive ve kullanıcı dostu tasarım
- Performans ve güvenlik odaklı geliştirme
** 
Başarı Hikayemiz:**
Son 3 yılda 150+ proje tamamladık. Müşterilerimizin dijital satışlarında ortalama %65 artış sağladık.`,
    services: [
      {
        name: "Web Geliştirme",
        description: "Modern web teknolojileri kullanarak responsive ve hızlı web siteleri geliştirme",
        features: ["React/Angular/Vue.js", "Responsive tasarım", "SEO optimizasyonu", "CMS entegrasyonu"]
      },
      {
        name: "Mobil Uygulama Geliştirme",
        description: "iOS ve Android platformları için native ve cross-platform mobil uygulamalar",
        features: ["React Native", "Flutter", "Native iOS/Android", "App Store optimizasyonu"]
      },
      {
        name: "E-Ticaret Çözümleri",
        description: "Kapsamlı e-ticaret platformları ve online satış sistemleri",
        features: ["Özel e-ticaret", "Ödeme sistemi entegrasyonu", "Stok yönetimi", "Analytics ve raporlama"]
      },
      {
        name: "Dijital Pazarlama",
        description: "SEO, SEM, sosyal medya ve içerik pazarlama hizmetleri",
        features: ["Google Ads", "Facebook/Instagram Ads", "SEO optimizasyonu", "İçerik pazarlama"]
      },
      {
        name: "Bulut Altyapı",
        description: "AWS, Azure ve Google Cloud platformlarında altyapı kurulumu ve yönetimi",
        features: ["Cloud migration", "DevOps services", "Güvenlik yapılandırması", "Monitoring ve backup"]
      }
    ],
    socialLinks: {
      linkedin: "https://linkedin.com/company/techflow-digital",
      twitter: "https://twitter.com/techflow",
      instagram: "https://instagram.com/techflow"
    },
    gallery: [
      "https://readdy.ai/api/search-image?query=modern%20software%20development%20team%20working%20on%20multiple%20monitors%2C%20coding%20workspace%20with%20blue%20ambient%20lighting%2C%20contemporary%20office%20setup%2C%20developers%20collaborating%20on%20projects&width=400&height=300&seq=techflow-1&orientation=landscape",
      "https://readdy.ai/api/search-image?query=web%20development%20process%20showing%20responsive%20design%20on%20different%20devices%2C%20mobile%20and%20desktop%20screens%2C%20UI%2FUX%20design%20mockups%2C%20professional%20development%20environment&width=400&height=300&seq=techflow-2&orientation=landscape",
      "https://readdy.ai/api/search-image?query=digital%20marketing%20analytics%20dashboard%20on%20computer%20screen%2C%20social%20media%20management%20interface%2C%20advertising%20campaign%20metrics%2C%20professional%20marketing%20workspace&width=400&height=300&seq=techflow-3&orientation=landscape",
      "https://readdy.ai/api/search-image?query=cloud%20computing%20infrastructure%20visualization%2C%20server%20room%20with%20modern%20equipment%2C%20network%20systems%20and%20data%20centers%2C%20technology%20infrastructure%20concept&width=400&height=300&seq=techflow-4&orientation=landscape"
    ],
    clients: ["Turkcell", "Akbank", "Migros", "Boyner", "Teknosa"],
    projects: [
      {
        name: "E-Ticaret Platformu Geliştirme",
        description: "Büyük ölçekli retail firması için kapsamlı e-ticaret çözümü",
        year: "2023",
        result: "%80 online satış artışı"
      },
      {
        name: "Mobil Banking Uygulaması",
        description: "Finans kuruluşu için güvenli mobil bankacılık uygulaması",
        year: "2022",
        result: "1M+ aktif kullanıcı"
      }
    ],
    team: [
      {
        name: "Can Yılmaz",
        position: "Genel Müdür & Kurucu",
        experience: "Bilgisayar Mühendisi, 10 yıl yazılım geliştirme deneyimi"
      },
      {
        name: "Elif Kaya",
        position: "Teknoloji Direktörü",
        experience: "Full-stack developer, proje yönetimi uzmanı"
      }
    ]
  }
];

interface CompanyDetailProps {
  companyId: string;
}

export default function CompanyDetail({ companyId }: CompanyDetailProps) {
  const [showContactModal, setShowContactModal] = useState(false);
  const [activeTab, setActiveTab] = useState('hakkinda');
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const company = companies.find(c => c.id === parseInt(companyId));

  if (!company) {
    return (
      <div className="min-h-screen bg-gray-50">
        <main className="pt-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Firma Bulunamadı</h1>
            <Link
              href="/kesfet"
              className="text-[#1B365D] hover:text-[#D4AF37] font-medium cursor-pointer"
            >
              Firmaları Keşfet sayfasına dön
            </Link>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="pt-16">
        {/* Hero Section */}
        <section className="relative h-96 overflow-hidden">
          <img
            src={company.heroImage}
            alt={company.name}
            className="w-full h-full object-cover object-top"
          />
          <div className="absolute inset-0 bg-black/40"></div>
          <div className="absolute inset-0 flex items-center">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
              <div className="flex items-center space-x-6">
                <img
                  src={company.logo}
                  alt={`${company.name} logo`}
                  className="w-24 h-24 rounded-xl bg-white p-2 object-cover"
                />
                <div>
                  <h1 className="text-4xl font-bold text-white mb-2">
                    {company.name}
                  </h1>
                  <div className="flex items-center space-x-4 text-white/90 mb-2">
                    <span className="bg-[#D4AF37] px-3 py-1 rounded-full text-sm font-medium">
                      {company.sector}
                    </span>
                    <div className="flex items-center">
                      <i className="ri-map-pin-line w-4 h-4 flex items-center justify-center mr-1"></i>
                      {company.location}
                    </div>
                    <div className="flex items-center">
                      <i className="ri-calendar-line w-4 h-4 flex items-center justify-center mr-1"></i>
                      {company.foundedYear} kuruluş
                    </div>
                  </div>
                  <div className="flex items-center space-x-4 text-white/90 text-sm">
                    <div className="flex items-center">
                      <i className="ri-team-line w-4 h-4 flex items-center justify-center mr-1"></i>
                      {company.employeeCount}
                    </div>
                    {company.awards && company.awards.length > 0 && (
                      <div className="flex items-center">
                        <i className="ri-award-line w-4 h-4 flex items-center justify-center mr-1"></i>
                        {company.awards.length} ödül
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Navigation Tabs */}
        <section className="bg-white shadow-sm border-b border-gray-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <nav className="flex space-x-8">
              <button
                onClick={() => setActiveTab('hakkinda')}
                className={`py-4 px-1 border-b-2 font-medium text-sm cursor-pointer ${
                  activeTab === 'hakkinda'
                    ? 'border-[#1B365D] text-[#1B365D]'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Hakkında
              </button>
              <button
                onClick={() => setActiveTab('hizmetler')}
                className={`py-4 px-1 border-b-2 font-medium text-sm cursor-pointer ${
                  activeTab === 'hizmetler'
                    ? 'border-[#1B365D] text-[#1B365D]'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Hizmetler & Çözümler
              </button>
              <button
                onClick={() => setActiveTab('projeler')}
                className={`py-4 px-1 border-b-2 font-medium text-sm cursor-pointer ${
                  activeTab === 'projeler'
                    ? 'border-[#1B365D] text-[#1B365D]'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Projeler & Referanslar
              </button>
              <button
                onClick={() => setActiveTab('galeri')}
                className={`py-4 px-1 border-b-2 font-medium text-sm cursor-pointer ${
                  activeTab === 'galeri'
                    ? 'border-[#1B365D] text-[#1B365D]'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Galeri
              </button>
              <button
                onClick={() => setActiveTab('iletisim')}
                className={`py-4 px-1 border-b-2 font-medium text-sm cursor-pointer ${
                  activeTab === 'iletisim'
                    ? 'border-[#1B365D] text-[#1B365D]'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                İletişim
              </button>
            </nav>
          </div>
        </section>

        {/* Content */}
        <section className="py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Main Content */}
              <div className="lg:col-span-2">
                {activeTab === 'hakkinda' && (
                  <div className="space-y-8">
                    <div className="bg-white rounded-xl shadow-sm p-8">
                      <h2 className="text-2xl font-bold text-gray-900 mb-6">Firma Hakkında</h2>
                      <div className="prose max-w-none">
                        <div className="text-gray-700 leading-relaxed space-y-4">
                          {company.detailedDescription
                            ?.split('\n\n')
                            .map((paragraph, index) => (
                              <div key={index}>
                                {paragraph.startsWith('**') &&
                                  paragraph.endsWith('**') ? (
                                  <h3 className="text-lg font-semibold text-[#1B365D] mt-6 mb-3">
                                    {paragraph.replace(/\*\*/g, '')}
                                  </h3>
                                ) : paragraph.startsWith('- ') ? (
                                  <ul className="list-disc list-inside space-y-1 ml-4">
                                    {paragraph
                                      .split('\n')
                                      .map((item, i) => (
                                        <li key={i} className="text-gray-700">
                                          {item.replace('- ', '')}
                                        </li>
                                      ))}
                                  </ul>
                                ) : (
                                  <p className="text-gray-700 leading-relaxed">
                                    {paragraph}
                                  </p>
                                )}
                              </div>
                            ))}
                        </div>
                      </div>
                    </div>

                    {/* Company Stats */}
                    <div className="bg-white rounded-xl shadow-sm p-8">
                      <h3 className="text-xl font-bold text-gray-900 mb-6">Firma Bilgileri</h3>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                        <div className="text-center">
                          <div className="text-2xl font-bold text-[#1B365D] mb-1">
                            {company.foundedYear}
                          </div>
                          <div className="text-gray-600 text-sm">Kuruluş Yılı</div>
                        </div>
                        <div className="text-center">
                          <div className="text-2xl font-bold text-[#1B365D] mb-1">
                            {company.employeeCount}
                          </div>
                          <div className="text-gray-600 text-sm">Çalışan Sayısı</div>
                        </div>
                        {company.certifications && (
                          <div className="text-center">
                            <div className="text-2xl font-bold text-[#1B365D] mb-1">
                              {company.certifications.length}
                            </div>
                            <div className="text-gray-600 text-sm">Sertifika</div>
                          </div>
                        )}
                        {company.awards && (
                          <div className="text-center">
                            <div className="text-2xl font-bold text-[#1B365D] mb-1">
                              {company.awards.length}
                            </div>
                            <div className="text-gray-600 text-sm">Ödül</div>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Certifications & Awards */}
                    {(company.certifications || company.awards) && (
                      <div className="grid md:grid-cols-2 gap-6">
                        {company.certifications && (
                          <div className="bg-white rounded-xl shadow-sm p-6">
                            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                              <i className="ri-medal-line w-5 h-5 flex items-center justify-center text-[#D4AF37] mr-2"></i>
                              Sertifikalar
                            </h3>
                            <div className="space-y-2">
                              {company.certifications.map((cert, index) => (
                                <div key={index} className="flex items-center p-2 bg-gray-50 rounded-lg">
                                  <i className="ri-check-line w-4 h-4 flex items-center justify-center text-green-600 mr-2"></i>
                                  <span className="text-gray-800 text-sm">{cert}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        {company.awards && (
                          <div className="bg-white rounded-xl shadow-sm p-6">
                            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                              <i className="ri-trophy-line w-5 h-5 flex items-center justify-center text-[#D4AF37] mr-2"></i>
                              Ödüller
                            </h3>
                            <div className="space-y-2">
                              {company.awards.map((award, index) => (
                                <div key={index} className="flex items-center p-2 bg-gray-50 rounded-lg">
                                  <i className="ri-star-line w-4 h-4 flex items-center justify-center text-[#D4AF37] mr-2"></i>
                                  <span className="text-gray-800 text-sm">{award}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                )}

                {activeTab === 'hizmetler' && (
                  <div className="bg-white rounded-xl shadow-sm p-8">
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">Hizmetler & Çözümler</h2>
                    <div className="space-y-6">
                      {company.services.map((service, index) => (
                        <div key={index} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                          <h3 className="text-lg font-semibold text-[#1B365D] mb-3">{service.name}</h3>
                          <p className="text-gray-600 mb-4">{service.description}</p>
                          {service.features && (
                            <div className="grid md:grid-cols-2 gap-2">
                              {service.features.map((feature, i) => (
                                <div key={i} className="flex items-center">
                                  <i className="ri-check-line w-4 h-4 flex items-center justify-center text-green-600 mr-2"></i>
                                  <span className="text-gray-700 text-sm">{feature}</span>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {activeTab === 'projeler' && (
                  <div className="space-y-6">
                    {/* Client References */}
                    {company.clients && (
                      <div className="bg-white rounded-xl shadow-sm p-8">
                        <h2 className="text-2xl font-bold text-gray-900 mb-6">Müşteri Referansları</h2>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                          {company.clients.map((client, index) => (
                            <div key={index} className="bg-gray-50 rounded-lg p-4 text-center">
                              <span className="text-gray-800 font-medium">{client}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Featured Projects */}
                    {company.projects && (
                      <div className="bg-white rounded-xl shadow-sm p-8">
                        <h2 className="text-2xl font-bold text-gray-900 mb-6">Başarılı Projeler</h2>
                        <div className="space-y-6">
                          {company.projects.map((project, index) => (
                            <div key={index} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                              <div className="flex justify-between items-start mb-3">
                                <h3 className="text-lg font-semibold text-[#1B365D]">{project.name}</h3>
                                <span className="bg-[#D4AF37]/10 text-[#B8941F] px-3 py-1 rounded-full text-sm font-medium">
                                  {project.year}
                                </span>
                              </div>
                              <p className="text-gray-600 mb-4">{project.description}</p>
                              <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                                <div className="flex items-center">
                                  <i className="ri-line-chart-line w-4 h-4 flex items-center justify-center text-green-600 mr-2"></i>
                                  <span className="text-green-800 font-medium">Sonuç: {project.result}</span>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Team Members */}
                    {company.team && (
                      <div className="bg-white rounded-xl shadow-sm p-8">
                        <h2 className="text-2xl font-bold text-gray-900 mb-6">Ekibimiz</h2>
                        <div className="grid md:grid-cols-2 gap-6">
                          {company.team.map((member, index) => (
                            <div key={index} className="flex items-center p-4 bg-gray-50 rounded-lg">
                              <div className="w-12 h-12 bg-[#1B365D] rounded-full flex items-center justify-center mr-4">
                                <i className="ri-user-line w-6 h-6 flex items-center justify-center text-white"></i>
                              </div>
                              <div>
                                <h3 className="font-semibold text-gray-900">{member.name}</h3>
                                <p className="text-[#D4AF37] text-sm font-medium">{member.position}</p>
                                <p className="text-gray-600 text-xs">{member.experience}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {activeTab === 'galeri' && (
                  <div className="bg-white rounded-xl shadow-sm p-8">
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">Galeri</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {company.gallery.map((image, index) => (
                        <div key={index} className="rounded-lg overflow-hidden cursor-pointer" onClick={() => setSelectedImage(image)}>
                          <img
                            src={image}
                            alt={`${company.name} galeri ${index + 1}`}
                            className="w-full h-48 object-cover object-top hover:scale-105 transition-transform duration-300"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {activeTab === 'iletisim' && (
                  <div className="bg-white rounded-xl shadow-sm p-8">
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">İletişim Bilgileri</h2>
                    <div className="space-y-6">
                      <div className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-4">
                          <div className="flex items-center">
                            <i className="ri-phone-line w-5 h-5 flex items-center justify-center text-gray-400 mr-3"></i>
                            <div>
                              <div className="text-sm text-gray-500">Telefon</div>
                              <div className="text-gray-800 font-medium">{company.phone}</div>
                            </div>
                          </div>
                          <div className="flex items-center">
                            <i className="ri-mail-line w-5 h-5 flex items-center justify-center text-gray-400 mr-3"></i>
                            <div>
                              <div className="text-sm text-gray-500">E-posta</div>
                              <div className="text-gray-800 font-medium">{company.email}</div>
                            </div>
                          </div>
                          <div className="flex items-center">
                            <i className="ri-global-line w-5 h-5 flex items-center justify-center text-gray-400 mr-3"></i>
                            <div>
                              <div className="text-sm text-gray-500">Website</div>
                              <a
                                href={`https://${company.website}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-[#1B365D] hover:text-[#D4AF37] cursor-pointer font-medium"
                              >
                                {company.website}
                              </a>
                            </div>
                          </div>
                        </div>
                        <div>
                          <div className="flex items-start">
                            <i className="ri-map-pin-line w-5 h-5 flex items-center justify-center text-gray-400 mr-3 mt-1"></i>
                            <div>
                              <div className="text-sm text-gray-500 mb-1">Adres</div>
                              <div className="text-gray-800 leading-relaxed">{company.address}</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                {/* Contact Card */}
                <div className="bg-white rounded-xl shadow-sm p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">İletişime Geç</h3>
                  <button
                    onClick={() => setShowContactModal(true)}
                    className="w-full bg-[#1B365D] text-white py-3 rounded-lg hover:bg-[#2E5984] transition-colors font-medium mb-3 cursor-pointer"
                  >
                    <i className="ri-mail-line w-4 h-4 flex items-center justify-center mr-2 inline-flex"></i>
                    Mesaj Gönder
                  </button>
                  <a
                    href={`tel:${company.phone}`}
                    className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition-colors font-medium flex items-center justify-center cursor-pointer"
                  >
                    <i className="ri-phone-line w-4 h-4 flex items-center justify-center mr-2"></i>
                    Hemen Ara
                  </a>
                </div>

                {/* Quick Info */}
                <div className="bg-white rounded-xl shadow-sm p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Hızlı Bilgi</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Sektör:</span>
                      <span className="font-medium text-gray-900">{company.sector}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Kuruluş:</span>
                      <span className="font-medium text-gray-900">{company.foundedYear}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Çalışan:</span>
                      <span className="font-medium text-gray-900">{company.employeeCount}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Konum:</span>
                      <span className="font-medium text-gray-900">{company.location}</span>
                    </div>
                  </div>
                </div>

                {/* Social Links */}
                <div className="bg-white rounded-xl shadow-sm p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Sosyal Medya</h3>
                  <div className="flex space-x-3">
                    {company.socialLinks.linkedin && (
                      <a
                        href={company.socialLinks.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-10 h-10 flex items-center justify-center bg-[#0077B5] text-white rounded-lg hover:opacity-80 transition-opacity cursor-pointer"
                      >
                        <i className="ri-linkedin-fill w-5 h-5 flex items-center justify-center"></i>
                      </a>
                    )}
                    {company.socialLinks.twitter && (
                      <a
                        href={company.socialLinks.twitter}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-10 h-10 flex items-center justify-center bg-[#1DA1F2] text-white rounded-lg hover:opacity-80 transition-opacity cursor-pointer"
                      >
                        <i className="ri-twitter-fill w-5 h-5 flex items-center justify-center"></i>
                      </a>
                    )}
                    {company.socialLinks.instagram && (
                      <a
                        href={company.socialLinks.instagram}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-10 h-10 flex items-center justify-center bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg hover:opacity-80 transition-opacity cursor-pointer"
                      >
                        <i className="ri-instagram-fill w-5 h-5 flex items-center justify-center"></i>
                      </a>
                    )}
                    {company.socialLinks.facebook && (
                      <a
                        href={company.socialLinks.facebook}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-10 h-10 flex items-center justify-center bg-[#4267B2] text-white rounded-lg hover:opacity-80 transition-opacity cursor-pointer"
                      >
                        <i className="ri-facebook-fill w-5 h-5 flex items-center justify-center"></i>
                      </a>
                    )}
                  </div>
                </div>

                {/* Back to List */}
                <Link
                  href="/kesfet"
                  className="block bg-gray-100 hover:bg-gray-200 text-gray-700 py-3 px-4 rounded-lg transition-colors font-medium text-center cursor-pointer"
                >
                  <i className="ri-arrow-left-line w-4 h-4 flex items-center justify-center mr-2 inline-flex"></i>
                  Firmalara Geri Dön
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Image Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4"
          onClick={() => setSelectedImage(null)}
        >
          <div className="relative max-w-4xl max-h-full">
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute -top-10 right-0 text-white hover:text-gray-300 text-2xl font-bold cursor-pointer"
            >
              <i className="ri-close-line w-8 h-8 flex items-center justify-center"></i>
            </button>
            <img
              src={selectedImage}
              alt="Büyük görsel"
              className="max-w-full max-h-full object-contain rounded-lg"
              onClick={(e) => e.stopPropagation()}
            />
          </div>
        </div>
      )}

      {/* Contact Modal */}
      <ContactModal
        isOpen={showContactModal}
        onClose={() => setShowContactModal(false)}
        company={company}
      />
    </div>
  );
}

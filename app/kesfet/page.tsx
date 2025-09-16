
'use client';

import { useState } from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import CompanyCard from './CompanyCard';
import SearchFilters from './SearchFilters';

const companies = [
  {
    id: 1,
    name: "AgroTech Tarım Teknolojileri",
    logo: "https://readdy.ai/api/search-image?query=modern%20agricultural%20technology%20company%20logo%20with%20green%20and%20blue%20colors%2C%20simple%20geometric%20design%2C%20professional%20corporate%20identity%2C%20clean%20white%20background%2C%20minimalist%20style&width=200&height=200&seq=agrotech-logo&orientation=squarish",
    description: "Akıllı tarım çözümleri ve IoT sensör teknolojileri ile sürdürülebilir tarım",
    sector: "Tarım",
    location: "İstanbul",
    phone: "+90 212 555 0123",
    email: "info@agrotech.com.tr",
    website: "www.agrotech.com.tr",
    socialLinks: {
      linkedin: "https://linkedin.com/company/agrotech",
      twitter: "https://twitter.com/agrotech",
      instagram: "https://instagram.com/agrotech"
    }
  },
  {
    id: 2,
    name: "SolarMax Enerji Çözümleri",
    logo: "https://readdy.ai/api/search-image?query=solar%20energy%20company%20logo%20with%20sun%20symbol%2C%20yellow%20and%20orange%20gradient%20colors%2C%20modern%20clean%20design%2C%20renewable%20energy%20theme%2C%20white%20background%2C%20professional%20corporate%20branding&width=200&height=200&seq=solarmax-logo&orientation=squarish",
    description: "Güneş enerjisi panelleri ve hibrit enerji sistemleri uzmanı",
    sector: "Enerji",
    location: "Ankara",
    phone: "+90 312 555 0456",
    email: "bilgi@solarmax.com.tr",
    website: "www.solarmax.com.tr",
    socialLinks: {
      linkedin: "https://linkedin.com/company/solarmax",
      facebook: "https://facebook.com/solarmax",
      instagram: "https://instagram.com/solarmax"
    }
  },
  {
    id: 3,
    name: "FinTech Pro Dijital Bankacılık",
    logo: "https://readdy.ai/api/search-image?query=fintech%20financial%20technology%20company%20logo%2C%20blue%20and%20purple%20gradient%2C%20digital%20banking%20theme%2C%20geometric%20shapes%2C%20modern%20minimalist%20design%2C%20white%20background%2C%20professional%20corporate%20identity&width=200&height=200&seq=fintech-logo&orientation=squarish",
    description: "Dijital ödeme sistemleri ve blockchain tabanlı finansal çözümler",
    sector: "Finans",
    location: "İzmir",
    phone: "+90 232 555 0789",
    email: "destek@fintechpro.com.tr",
    website: "www.fintechpro.com.tr",
    socialLinks: {
      linkedin: "https://linkedin.com/company/fintechpro",
      twitter: "https://twitter.com/fintechpro"
    }
  },
  {
    id: 4,
    name: "EcoGreen Sürdürülebilir Ambalaj",
    logo: "https://readdy.ai/api/search-image?query=eco-friendly%20packaging%20company%20logo%20with%20green%20leaf%20symbol%2C%20natural%20green%20colors%2C%20sustainable%20theme%2C%20circular%20design%2C%20clean%20white%20background%2C%20environmental%20corporate%20branding&width=200&height=200&seq=ecogreen-logo&orientation=squarish",
    description: "Çevre dostu ambalaj çözümleri ve geri dönüştürülebilir malzemeler",
    sector: "Çevre",
    location: "Bursa",
    phone: "+90 224 555 0321",
    email: "info@ecogreen.com.tr",
    website: "www.ecogreen.com.tr",
    socialLinks: {
      linkedin: "https://linkedin.com/company/ecogreen",
      instagram: "https://instagram.com/ecogreen",
      facebook: "https://facebook.com/ecogreen"
    }
  },
  {
    id: 5,
    name: "MedTech İnovasyon Sağlık",
    logo: "https://readdy.ai/api/search-image?query=medical%20technology%20company%20logo%20with%20cross%20symbol%2C%20blue%20and%20red%20colors%2C%20healthcare%20theme%2C%20modern%20clean%20design%2C%20white%20background%2C%20professional%20medical%20branding&width=200&height=200&seq=medtech-logo&orientation=squarish",
    description: "Tıbbi cihazlar ve sağlık teknolojileri geliştirme",
    sector: "Sağlık",
    location: "Ankara",
    phone: "+90 312 555 0654",
    email: "bilgi@medtech.com.tr",
    website: "www.medtech.com.tr",
    socialLinks: {
      linkedin: "https://linkedin.com/company/medtech",
      twitter: "https://twitter.com/medtech"
    }
  },
  {
    id: 6,
    name: "CloudSoft Yazılım Çözümleri",
    logo: "https://readdy.ai/api/search-image?query=cloud%20software%20company%20logo%20with%20cloud%20symbol%2C%20blue%20and%20purple%20gradient%2C%20technology%20theme%2C%20modern%20geometric%20design%2C%20white%20background%2C%20tech%20corporate%20branding&width=200&height=200&seq=cloudsoft-logo&orientation=squarish",
    description: "Bulut tabanlı yazılım çözümleri ve SaaS platformları",
    sector: "Teknoloji",
    location: "İstanbul",
    phone: "+90 216 555 0987",
    email: "info@cloudsoft.com.tr",
    website: "www.cloudsoft.com.tr",
    socialLinks: {
      linkedin: "https://linkedin.com/company/cloudsoft",
      github: "https://github.com/cloudsoft",
      twitter: "https://twitter.com/cloudsoft"
    }
  },
  {
    id: 7,
    name: "TechFlow Digital",
    logo: "https://readdy.ai/api/search-image?query=modern%20digital%20technology%20company%20logo%20with%20gradient%20blue%20and%20purple%20colors%2C%20tech%20flow%20symbol%2C%20sleek%20geometric%20design%2C%20professional%20corporate%20identity%2C%20clean%20white%20background%2C%20minimalist%20style&width=200&height=200&seq=techflow-logo&orientation=squarish",
    description: "Dijital dönüşüm ve yazılım geliştirme hizmetleri ile işletmeleri geleceğe hazırlıyoruz",
    sector: "Teknoloji",
    location: "İstanbul",
    phone: "+90 212 555 1234",
    email: "info@techflow.digital",
    website: "www.techflow.digital",
    socialLinks: {
      linkedin: "https://linkedin.com/company/techflow-digital",
      twitter: "https://twitter.com/techflow",
      instagram: "https://instagram.com/techflow"
    }
  }
];

const sectors = ["Tümü", "Tarım", "Enerji", "Finans", "Çevre", "Sağlık", "Teknoloji"];

export default function KesfetPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSector, setSelectedSector] = useState('Tümü');
  const [selectedLocation, setSelectedLocation] = useState('Tümü');

  const locations = ["Tümü", ...Array.from(new Set(companies.map(c => c.location)))];

  const filteredCompanies = companies.filter(company => {
    const matchesSearch = company.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         company.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSector = selectedSector === 'Tümü' || company.sector === selectedSector;
    const matchesLocation = selectedLocation === 'Tümü' || company.location === selectedLocation;
    
    return matchesSearch && matchesSector && matchesLocation;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="pt-16">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-[#1B365D] to-[#2E5984] py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Firmaları Keşfet
            </h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              Platformumuzdaki tüm firmaları keşfedin. Sektöre göre filtreleyerek aradığınız iş ortağını bulun.
            </p>
          </div>
        </section>

        {/* Search and Filters */}
        <SearchFilters
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          selectedSector={selectedSector}
          setSelectedSector={setSelectedSector}
          selectedLocation={selectedLocation}
          setSelectedLocation={setSelectedLocation}
          sectors={sectors}
          locations={locations}
        />

        {/* Results */}
        <section className="py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-2xl font-bold text-gray-900">
                {filteredCompanies.length} Firma Bulundu
              </h2>
              <div className="text-sm text-gray-600">
                {searchTerm && (
                  <span className="bg-[#D4AF37]/10 text-[#B8941F] px-3 py-1 rounded-full">
                    "{searchTerm}" için sonuçlar
                  </span>
                )}
              </div>
            </div>

            {filteredCompanies.length === 0 ? (
              <div className="text-center py-16">
                <div className="w-16 h-16 flex items-center justify-center mx-auto mb-4 bg-gray-100 rounded-full">
                  <i className="ri-search-line w-8 h-8 flex items-center justify-center text-gray-400"></i>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Sonuç Bulunamadı
                </h3>
                <p className="text-gray-600">
                  Arama kriterlerinizi değiştirerek tekrar deneyin.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredCompanies.map((company) => (
                  <CompanyCard key={company.id} company={company} />
                ))}
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

'use client';

import { useState } from 'react';

interface AkilliEslestirmeFormProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AkilliEslestirmeForm({ isOpen, onClose }: AkilliEslestirmeFormProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    // Şirket Temel Bilgileri
    companyName: '',
    sector: '',
    subSector: '',
    activityArea: '',
    establishmentYear: '',
    employeeCount: '',
    location: '',
    serviceArea: '',
    
    // Finansal Bilgiler
    annualRevenue: '',
    capitalStructure: '',
    investmentCapacity: '',
    budgetRange: '',
    financingNeeds: [] as string[],
    
    // İhtisas ve Yetenek Bilgileri
    technicalCompetencies: [] as string[],
    certifications: '',
    rdCapacity: '',
    patents: '',
    specializations: [] as string[],
    
    // İş Birliği Tercihleri
    partnerType: [] as string[],
    partnerSize: '',
    cooperationModel: [] as string[],
    preferredSectors: [] as string[],
    preferredLocations: [] as string[],
    
    // İletişim Bilgileri
    contactName: '',
    contactTitle: '',
    email: '',
    phone: '',
    
    // Ek Bilgiler
    additionalInfo: '',
    urgency: '',
    expectations: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [submitMessage, setSubmitMessage] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    
    if (name === 'additionalInfo' && value.length > 500) {
      return;
    }
    
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleMultiSelectChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: (prev[field as keyof typeof prev] as string[]).includes(value)
        ? (prev[field as keyof typeof prev] as string[]).filter(item => item !== value)
        : [...(prev[field as keyof typeof prev] as string[]), value]
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');
    setSubmitMessage('');

    try {
      const formDataToSend = new URLSearchParams();
      
      // Şirket Temel Bilgileri
      formDataToSend.append('companyName', formData.companyName);
      formDataToSend.append('sector', formData.sector);
      formDataToSend.append('subSector', formData.subSector);
      formDataToSend.append('activityArea', formData.activityArea);
      formDataToSend.append('establishmentYear', formData.establishmentYear);
      formDataToSend.append('employeeCount', formData.employeeCount);
      formDataToSend.append('location', formData.location);
      formDataToSend.append('serviceArea', formData.serviceArea);
      
      // Finansal Bilgiler
      formDataToSend.append('annualRevenue', formData.annualRevenue);
      formDataToSend.append('capitalStructure', formData.capitalStructure);
      formDataToSend.append('investmentCapacity', formData.investmentCapacity);
      formDataToSend.append('budgetRange', formData.budgetRange);
      formDataToSend.append('financingNeeds', formData.financingNeeds.join(', '));
      
      // İhtisas ve Yetenek Bilgileri
      formDataToSend.append('technicalCompetencies', formData.technicalCompetencies.join(', '));
      formDataToSend.append('certifications', formData.certifications);
      formDataToSend.append('rdCapacity', formData.rdCapacity);
      formDataToSend.append('patents', formData.patents);
      formDataToSend.append('specializations', formData.specializations.join(', '));
      
      // İş Birliği Tercihleri
      formDataToSend.append('partnerType', formData.partnerType.join(', '));
      formDataToSend.append('partnerSize', formData.partnerSize);
      formDataToSend.append('cooperationModel', formData.cooperationModel.join(', '));
      formDataToSend.append('preferredSectors', formData.preferredSectors.join(', '));
      formDataToSend.append('preferredLocations', formData.preferredLocations.join(', '));
      
      // İletişim Bilgileri
      formDataToSend.append('contactName', formData.contactName);
      formDataToSend.append('contactTitle', formData.contactTitle);
      formDataToSend.append('email', formData.email);
      formDataToSend.append('phone', formData.phone);
      
      // Ek Bilgiler
      formDataToSend.append('additionalInfo', formData.additionalInfo);
      formDataToSend.append('urgency', formData.urgency);
      formDataToSend.append('expectations', formData.expectations);
      
      formDataToSend.append('timestamp', new Date().toISOString());

      const response = await fetch('https://readdy.ai/api/form/akilli-eslestirme-basvuru', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: formDataToSend.toString()
      });

      if (response.ok) {
        setSubmitStatus('success');
        setSubmitMessage('Akıllı eşleştirme başvurunuz başarıyla alınmıştır!');
      } else {
        setSubmitStatus('error');
        setSubmitMessage('Form gönderiminde sorun yaşandı, lütfen tekrar deneyin.');
      }
    } catch (error) {
      setSubmitStatus('error');
      setSubmitMessage('Bağlantı hatası oluştu, lütfen tekrar deneyin.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const nextStep = () => {
    if (currentStep < 5) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleClose = () => {
    if (!isSubmitting) {
      setCurrentStep(1);
      setFormData({
        companyName: '',
        sector: '',
        subSector: '',
        activityArea: '',
        establishmentYear: '',
        employeeCount: '',
        location: '',
        serviceArea: '',
        annualRevenue: '',
        capitalStructure: '',
        investmentCapacity: '',
        budgetRange: '',
        financingNeeds: [],
        technicalCompetencies: [],
        certifications: '',
        rdCapacity: '',
        patents: '',
        specializations: [],
        partnerType: [],
        partnerSize: '',
        cooperationModel: [],
        preferredSectors: [],
        preferredLocations: [],
        contactName: '',
        contactTitle: '',
        email: '',
        phone: '',
        additionalInfo: '',
        urgency: '',
        expectations: ''
      });
      setSubmitStatus('idle');
      setSubmitMessage('');
      onClose();
    }
  };

  if (!isOpen) return null;

  const sectorOptions = [
    'Tarım ve Hayvancılık',
    'Gıda ve İçecek',
    'Tekstil ve Konfeksiyon',
    'İnşaat ve Emlak',
    'Otomotiv',
    'Teknoloji ve Yazılım',
    'Sağlık ve Tıp',
    'Eğitim',
    'Turizm ve Otelcilik',
    'Lojistik ve Nakliye',
    'Enerji',
    'Finans ve Bankacılık',
    'İmalat Sanayi',
    'Ticaret',
    'Diğer'
  ];

  const technicalCompetenciesOptions = [
    'Yazılım Geliştirme',
    'Veri Analizi',
    'Yapay Zeka',
    'IoT Teknolojileri',
    'Blockchain',
    'Siber Güvenlik',
    'Otomatik Sistemler',
    'Robotik',
    'Makine Öğrenmesi',
    'Bulut Teknolojileri',
    '3D Baskı',
    'Nano Teknoloji',
    'Biyoteknoloji',
    'Yeşil Teknoloji'
  ];

  const specializationOptions = [
    'Ar-Ge ve İnovasyon',
    'Üretim ve İmalat',
    'Pazarlama ve Satış',
    'İhracat ve Dış Ticaret',
    'Lojistik ve Tedarik',
    'Finansal Danışmanlık',
    'Hukuki Danışmanlık',
    'İnsan Kaynakları',
    'Dijital Pazarlama',
    'Kalite Yönetimi',
    'Çevre ve Sürdürülebilirlik',
    'Enerji Verimliliği'
  ];

  const partnerTypeOptions = [
    'Startup',
    'KOBİ',
    'Büyük Şirket',
    'Kamu Kurumu',
    'Üniversite',
    'Araştırma Enstitüsü',
    'Yatırım Fonu',
    'Teknoloji Şirketi',
    'Üretici Firma',
    'Distribütör'
  ];

  const cooperationModelOptions = [
    'Stratejik Ortaklık',
    'Joint Venture',
    'Lisans Anlaşması',
    'Distribütörlük',
    'Bayilik',
    'Yatırım Ortaklığı',
    'Ar-Ge Ortaklığı',
    'Üretim Ortaklığı',
    'Pazarlama Ortaklığı',
    'Teknoloji Transferi'
  ];

  const financingNeedsOptions = [
    'Sermaye Artırımı',
    'İşletme Kredisi',
    'Yatırım Kredisi',
    'Ihracat Kredisi',
    'Ar-Ge Desteği',
    'Teşvik ve Hibeler',
    'Melek Yatırımcı',
    'Girişim Sermayesi',
    'Leasing',
    'Faktoring'
  ];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl max-w-4xl w-full mx-4 shadow-2xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="bg-gradient-to-r from-[#1B365D] to-[#2A4A6B] rounded-t-2xl p-6 text-white relative">
          <button
            onClick={handleClose}
            className="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors cursor-pointer"
            disabled={isSubmitting}
          >
            <i className="ri-close-line w-6 h-6 flex items-center justify-center"></i>
          </button>
          <h2 className="text-2xl font-bold mb-2">Akıllı Eşleştirme Sistemi Başvurusu</h2>
          <p className="text-gray-200">Yapay zeka destekli algoritma ile size uygun iş ortaklarını bulun</p>
          
          {/* Progress Bar */}
          <div className="mt-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-200">Adım {currentStep} / 5</span>
              <span className="text-sm text-gray-200">{Math.round((currentStep / 5) * 100)}%</span>
            </div>
            <div className="w-full bg-white/20 rounded-full h-2">
              <div 
                className="bg-[#D4AF37] h-2 rounded-full transition-all duration-300"
                style={{ width: `${(currentStep / 5) * 100}%` }}
              ></div>
            </div>
          </div>
        </div>

        <div className="p-6">
          {submitStatus === 'success' ? (
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="ri-check-line w-8 h-8 flex items-center justify-center text-green-600"></i>
              </div>
              <h3 className="text-xl font-bold text-[#1B365D] mb-3">Başvurunuz Başarıyla Alındı!</h3>
              <p className="text-gray-700 leading-relaxed mb-6">
                Akıllı eşleştirme algoritması verilerinizi analiz ediyor. <br />
                Size uygun iş ortakları bulunduğunda en kısa sürede bilgilendirileceğiz.
              </p>
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                <p className="text-blue-800 text-sm">
                  📊 <strong>Algoritma Analizi:</strong> Verileriniz 24-48 saat içinde işlenecek<br />
                  🎯 <strong>Eşleştirme:</strong> Uygun partnerler bulunduğunda bildirim alacaksınız<br />
                  📞 <strong>Danışmanlık:</strong> Gerekirse uzman ekibimiz sizinle iletişime geçecek
                </p>
              </div>
              <button
                onClick={handleClose}
                className="bg-[#D4AF37] text-white px-6 py-3 rounded-lg font-medium hover:bg-[#B8941F] transition-colors whitespace-nowrap cursor-pointer"
              >
                Tamam
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} id="akilli-eslestirme-form">
              {/* Step 1: Şirket Temel Bilgileri */}
              {currentStep === 1 && (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold text-[#1B365D] mb-4">Şirket Temel Bilgileri</h3>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Şirket Adı *
                        </label>
                        <input
                          type="text"
                          name="companyName"
                          value={formData.companyName}
                          onChange={handleInputChange}
                          required
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#D4AF37] focus:border-[#D4AF37] outline-none transition-colors text-sm"
                          placeholder="ABC Teknoloji A.Ş."
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Ana Sektör *
                        </label>
                        <select
                          name="sector"
                          value={formData.sector}
                          onChange={handleInputChange}
                          required
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#D4AF37] focus:border-[#D4AF37] outline-none transition-colors text-sm pr-8"
                        >
                          <option value="">Sektör seçiniz</option>
                          {sectorOptions.map((sector) => (
                            <option key={sector} value={sector}>{sector}</option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Alt Sektör
                        </label>
                        <input
                          type="text"
                          name="subSector"
                          value={formData.subSector}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#D4AF37] focus:border-[#D4AF37] outline-none transition-colors text-sm"
                          placeholder="Örn: Mobil Uygulama Geliştirme"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Faaliyet Alanı *
                        </label>
                        <input
                          type="text"
                          name="activityArea"
                          value={formData.activityArea}
                          onChange={handleInputChange}
                          required
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#D4AF37] focus:border-[#D4AF37] outline-none transition-colors text-sm"
                          placeholder="Örn: E-ticaret yazılım çözümleri"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Kuruluş Yılı *
                        </label>
                        <input
                          type="number"
                          name="establishmentYear"
                          value={formData.establishmentYear}
                          onChange={handleInputChange}
                          required
                          min="1900"
                          max="2024"
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#D4AF37] focus:border-[#D4AF37] outline-none transition-colors text-sm"
                          placeholder="2020"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Çalışan Sayısı *
                        </label>
                        <select
                          name="employeeCount"
                          value={formData.employeeCount}
                          onChange={handleInputChange}
                          required
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#D4AF37] focus:border-[#D4AF37] outline-none transition-colors text-sm pr-8"
                        >
                          <option value="">Çalışan sayısı seçiniz</option>
                          <option value="1-9">1-9 (Mikro İşletme)</option>
                          <option value="10-49">10-49 (Küçük İşletme)</option>
                          <option value="50-249">50-249 (Orta İşletme)</option>
                          <option value="250+">250+ (Büyük İşletme)</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Şirket Lokasyonu *
                        </label>
                        <input
                          type="text"
                          name="location"
                          value={formData.location}
                          onChange={handleInputChange}
                          required
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#D4AF37] focus:border-[#D4AF37] outline-none transition-colors text-sm"
                          placeholder="İstanbul, Türkiye"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Hizmet Alanı
                        </label>
                        <input
                          type="text"
                          name="serviceArea"
                          value={formData.serviceArea}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#D4AF37] focus:border-[#D4AF37] outline-none transition-colors text-sm"
                          placeholder="Örn: Türkiye geneli, EMEA bölgesi"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Step 2: Finansal Bilgiler */}
              {currentStep === 2 && (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold text-[#1B365D] mb-4">Finansal Bilgiler</h3>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Yıllık Ciro *
                        </label>
                        <select
                          name="annualRevenue"
                          value={formData.annualRevenue}
                          onChange={handleInputChange}
                          required
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#D4AF37] focus:border-[#D4AF37] outline-none transition-colors text-sm pr-8"
                        >
                          <option value="">Ciro aralığı seçiniz</option>
                          <option value="0-1M">0-1 Milyon TL</option>
                          <option value="1-5M">1-5 Milyon TL</option>
                          <option value="5-25M">5-25 Milyon TL</option>
                          <option value="25-125M">25-125 Milyon TL</option>
                          <option value="125M+">125 Milyon TL+</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Sermaye Yapısı *
                        </label>
                        <select
                          name="capitalStructure"
                          value={formData.capitalStructure}
                          onChange={handleInputChange}
                          required
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#D4AF37] focus:border-[#D4AF37] outline-none transition-colors text-sm pr-8"
                        >
                          <option value="">Sermaye yapısı seçiniz</option>
                          <option value="Yerli Sermaye">%100 Yerli Sermaye</option>
                          <option value="Yabancı Sermaye">%100 Yabancı Sermaye</option>
                          <option value="Karma Sermaye">Karma Sermaye</option>
                          <option value="Kamu Sermayesi">Kamu Sermayesi</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Yatırım Kapasitesi *
                        </label>
                        <select
                          name="investmentCapacity"
                          value={formData.investmentCapacity}
                          onChange={handleInputChange}
                          required
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#D4AF37] focus:border-[#D4AF37] outline-none transition-colors text-sm pr-8"
                        >
                          <option value="">Yatırım kapasitesi seçiniz</option>
                          <option value="0-100K">0-100 Bin TL</option>
                          <option value="100K-500K">100-500 Bin TL</option>
                          <option value="500K-2M">500 Bin - 2 Milyon TL</option>
                          <option value="2M-10M">2-10 Milyon TL</option>
                          <option value="10M+">10 Milyon TL+</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Proje Bütçe Aralığı *
                        </label>
                        <select
                          name="budgetRange"
                          value={formData.budgetRange}
                          onChange={handleInputChange}
                          required
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#D4AF37] focus:border-[#D4AF37] outline-none transition-colors text-sm pr-8"
                        >
                          <option value="">Bütçe aralığı seçiniz</option>
                          <option value="0-50K">0-50 Bin TL</option>
                          <option value="50K-200K">50-200 Bin TL</option>
                          <option value="200K-1M">200 Bin - 1 Milyon TL</option>
                          <option value="1M-5M">1-5 Milyon TL</option>
                          <option value="5M+">5 Milyon TL+</option>
                        </select>
                      </div>
                    </div>

                    <div className="mt-6">
                      <label className="block text-sm font-medium text-gray-700 mb-3">
                        Finansman İhtiyaçları
                      </label>
                      <div className="grid md:grid-cols-2 gap-3">
                        {financingNeedsOptions.map((need) => (
                          <label key={need} className="flex items-center space-x-2 cursor-pointer">
                            <input
                              type="checkbox"
                              checked={formData.financingNeeds.includes(need)}
                              onChange={() => handleMultiSelectChange('financingNeeds', need)}
                              className="text-[#D4AF37] focus:ring-[#D4AF37] rounded"
                            />
                            <span className="text-sm text-gray-700">{need}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Step 3: İhtisas ve Yetenek Bilgileri */}
              {currentStep === 3 && (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold text-[#1B365D] mb-4">İhtisas ve Yetenek Bilgileri</h3>
                    
                    <div className="mb-6">
                      <label className="block text-sm font-medium text-gray-700 mb-3">
                        Teknik Yetkinlikler
                      </label>
                      <div className="grid md:grid-cols-2 gap-3">
                        {technicalCompetenciesOptions.map((competency) => (
                          <label key={competency} className="flex items-center space-x-2 cursor-pointer">
                            <input
                              type="checkbox"
                              checked={formData.technicalCompetencies.includes(competency)}
                              onChange={() => handleMultiSelectChange('technicalCompetencies', competency)}
                              className="text-[#D4AF37] focus:ring-[#D4AF37] rounded"
                            />
                            <span className="text-sm text-gray-700">{competency}</span>
                          </label>
                        ))}
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Sertifikalar ve Standartlar
                        </label>
                        <textarea
                          name="certifications"
                          value={formData.certifications}
                          onChange={handleInputChange}
                          rows={3}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#D4AF37] focus:border-[#D4AF37] outline-none transition-colors text-sm resize-none"
                          placeholder="Örn: ISO 9001, ISO 27001, PMP, Scrum Master..."
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Ar-Ge Kapasitesi
                        </label>
                        <select
                          name="rdCapacity"
                          value={formData.rdCapacity}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#D4AF37] focus:border-[#D4AF37] outline-none transition-colors text-sm pr-8"
                        >
                          <option value="">Ar-Ge kapasitesi seçiniz</option>
                          <option value="Ar-Ge Merkezi">Ar-Ge Merkezi</option>
                          <option value="Ar-Ge Departmanı">Ar-Ge Departmanı</option>
                          <option value="Ar-Ge Personeli">Ar-Ge Personeli</option>
                          <option value="Dış Ar-Ge">Dış Ar-Ge Ortaklığı</option>
                          <option value="Ar-Ge Yok">Ar-Ge Kapasitesi Yok</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Patent ve Fikri Mülkiyet
                        </label>
                        <input
                          type="text"
                          name="patents"
                          value={formData.patents}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#D4AF37] focus:border-[#D4AF37] outline-none transition-colors text-sm"
                          placeholder="Örn: 5 patent, 10 faydalı model, 3 marka tescili"
                        />
                      </div>
                    </div>

                    <div className="mt-6">
                      <label className="block text-sm font-medium text-gray-700 mb-3">
                        Özel Uzmanlık Alanları
                      </label>
                      <div className="grid md:grid-cols-2 gap-3">
                        {specializationOptions.map((specialization) => (
                          <label key={specialization} className="flex items-center space-x-2 cursor-pointer">
                            <input
                              type="checkbox"
                              checked={formData.specializations.includes(specialization)}
                              onChange={() => handleMultiSelectChange('specializations', specialization)}
                              className="text-[#D4AF37] focus:ring-[#D4AF37] rounded"
                            />
                            <span className="text-sm text-gray-700">{specialization}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Step 4: İş Birliği Tercihleri */}
              {currentStep === 4 && (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold text-[#1B365D] mb-4">İş Birliği Tercihleri</h3>
                    
                    <div className="mb-6">
                      <label className="block text-sm font-medium text-gray-700 mb-3">
                        Aradığınız Partner Türü *
                      </label>
                      <div className="grid md:grid-cols-2 gap-3">
                        {partnerTypeOptions.map((type) => (
                          <label key={type} className="flex items-center space-x-2 cursor-pointer">
                            <input
                              type="checkbox"
                              checked={formData.partnerType.includes(type)}
                              onChange={() => handleMultiSelectChange('partnerType', type)}
                              className="text-[#D4AF37] focus:ring-[#D4AF37] rounded"
                            />
                            <span className="text-sm text-gray-700">{type}</span>
                          </label>
                        ))}
                      </div>
                    </div>

                    <div className="mb-6">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Tercih Edilen Partner Büyüklüğü *
                      </label>
                      <select
                        name="partnerSize"
                        value={formData.partnerSize}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#D4AF37] focus:border-[#D4AF37] outline-none transition-colors text-sm pr-8"
                      >
                        <option value="">Partner büyüklüğü seçiniz</option>
                        <option value="Mikro">Mikro İşletme (1-9 kişi)</option>
                        <option value="Küçük">Küçük İşletme (10-49 kişi)</option>
                        <option value="Orta">Orta İşletme (50-249 kişi)</option>
                        <option value="Büyük">Büyük İşletme (250+ kişi)</option>
                        <option value="Fark Etmez">Büyüklük Fark Etmez</option>
                      </select>
                    </div>

                    <div className="mb-6">
                      <label className="block text-sm font-medium text-gray-700 mb-3">
                        İş Birliği Modeli *
                      </label>
                      <div className="grid md:grid-cols-2 gap-3">
                        {cooperationModelOptions.map((model) => (
                          <label key={model} className="flex items-center space-x-2 cursor-pointer">
                            <input
                              type="checkbox"
                              checked={formData.cooperationModel.includes(model)}
                              onChange={() => handleMultiSelectChange('cooperationModel', model)}
                              className="text-[#D4AF37] focus:ring-[#D4AF37] rounded"
                            />
                            <span className="text-sm text-gray-700">{model}</span>
                          </label>
                        ))}
                      </div>
                    </div>

                    <div className="mb-6">
                      <label className="block text-sm font-medium text-gray-700 mb-3">
                        Tercih Edilen Partner Sektörleri
                      </label>
                      <div className="grid md:grid-cols-2 gap-3">
                        {sectorOptions.map((sector) => (
                          <label key={sector} className="flex items-center space-x-2 cursor-pointer">
                            <input
                              type="checkbox"
                              checked={formData.preferredSectors.includes(sector)}
                              onChange={() => handleMultiSelectChange('preferredSectors', sector)}
                              className="text-[#D4AF37] focus:ring-[#D4AF37] rounded"
                            />
                            <span className="text-sm text-gray-700">{sector}</span>
                          </label>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Tercih Edilen Partner Lokasyonları
                      </label>
                      <input
                        type="text"
                        name="preferredLocations"
                        value={formData.preferredLocations.join(', ')}
                        onChange={(e) => setFormData(prev => ({
                          ...prev,
                          preferredLocations: e.target.value.split(', ').filter(loc => loc.trim())
                        }))}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#D4AF37] focus:border-[#D4AF37] outline-none transition-colors text-sm"
                        placeholder="Örn: İstanbul, Ankara, Avrupa, Uzakdoğu"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Step 5: İletişim ve Ek Bilgiler */}
              {currentStep === 5 && (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold text-[#1B365D] mb-4">İletişim ve Ek Bilgiler</h3>
                    
                    <div className="grid md:grid-cols-2 gap-4 mb-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          İletişim Kişisi *
                        </label>
                        <input
                          type="text"
                          name="contactName"
                          value={formData.contactName}
                          onChange={handleInputChange}
                          required
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#D4AF37] focus:border-[#D4AF37] outline-none transition-colors text-sm"
                          placeholder="Ahmet Yılmaz"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Ünvanı *
                        </label>
                        <input
                          type="text"
                          name="contactTitle"
                          value={formData.contactTitle}
                          onChange={handleInputChange}
                          required
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#D4AF37] focus:border-[#D4AF37] outline-none transition-colors text-sm"
                          placeholder="Genel Müdür"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          E-posta *
                        </label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          required
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#D4AF37] focus:border-[#D4AF37] outline-none transition-colors text-sm"
                          placeholder="ahmet@sirket.com"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Telefon *
                        </label>
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          required
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#D4AF37] focus:border-[#D4AF37] outline-none transition-colors text-sm"
                          placeholder="0532 123 45 67"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Aciliyet Durumu *
                        </label>
                        <select
                          name="urgency"
                          value={formData.urgency}
                          onChange={handleInputChange}
                          required
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#D4AF37] focus:border-[#D4AF37] outline-none transition-colors text-sm pr-8"
                        >
                          <option value="">Aciliyet durumu seçiniz</option>
                          <option value="Acil">Acil (1 ay içinde)</option>
                          <option value="Orta">Orta (3 ay içinde)</option>
                          <option value="Düşük">Düşük (6 ay içinde)</option>
                          <option value="Planlama">Planlama aşamasında</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Beklentiler *
                        </label>
                        <input
                          type="text"
                          name="expectations"
                          value={formData.expectations}
                          onChange={handleInputChange}
                          required
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#D4AF37] focus:border-[#D4AF37] outline-none transition-colors text-sm"
                          placeholder="Örn: Teknoloji ortaklığı, yeni pazarlara giriş"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Ek Bilgiler ve Açıklamalar
                      </label>
                      <textarea
                        name="additionalInfo"
                        value={formData.additionalInfo}
                        onChange={handleInputChange}
                        maxLength={500}
                        rows={4}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#D4AF37] focus:border-[#D4AF37] outline-none transition-colors text-sm resize-none"
                        placeholder="Şirketiniz hakkında ek bilgiler, özel durumlar, proje detayları... (maksimum 500 karakter)"
                      />
                      <div className="flex justify-between items-center mt-1">
                        <div className={`text-xs ${formData.additionalInfo.length >= 500 ? 'text-red-500' : 'text-gray-500'}`}>
                          {formData.additionalInfo.length}/500 karakter
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Submit Status Messages */}
              {submitMessage && (
                <div className={`rounded-lg p-3 ${
                  submitStatus === 'error' 
                    ? 'bg-red-50 border border-red-200' 
                    : 'bg-green-50 border border-green-200'
                }`}>
                  <p className={`text-sm ${
                    submitStatus === 'error' ? 'text-red-600' : 'text-green-600'
                  }`}>
                    {submitMessage}
                  </p>
                </div>
              )}

              {/* Navigation Buttons */}
              <div className="flex justify-between pt-6">
                <button
                  type="button"
                  onClick={prevStep}
                  disabled={currentStep === 1 || isSubmitting}
                  className="px-6 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                >
                  Önceki
                </button>

                <div className="flex space-x-3">
                  {currentStep < 5 ? (
                    <button
                      type="button"
                      onClick={nextStep}
                      className="px-6 py-3 bg-[#1B365D] text-white rounded-lg hover:bg-[#2E5984] transition-colors font-medium cursor-pointer"
                    >
                      Sonraki
                    </button>
                  ) : (
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="px-6 py-3 bg-[#D4AF37] text-white rounded-lg hover:bg-[#B8941F] transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer whitespace-nowrap"
                    >
                      {isSubmitting ? 'Gönderiliyor...' : 'Başvuruyu Gönder'}
                    </button>
                  )}
                </div>
              </div>

              {/* Info Box */}
              <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <div className="flex items-start space-x-3">
                  <i className="ri-information-line w-5 h-5 flex items-center justify-center text-blue-600 mt-0.5"></i>
                  <div className="text-blue-800 text-sm">
                    <p className="font-medium mb-1">Akıllı Eşleştirme Algoritması Hakkında:</p>
                    <ul className="space-y-1 text-xs">
                      <li>• Verileriniz yapay zeka algoritması ile analiz edilir</li>
                      <li>• Uyumluluk skoru %70 ve üzeri olan firmalar önerilir</li>
                      <li>• Eşleştirme süreci 24-48 saat içinde tamamlanır</li>
                      <li>• Sonuçlar e-posta ve platform üzerinden bildirilir</li>
                    </ul>
                  </div>
                </div>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
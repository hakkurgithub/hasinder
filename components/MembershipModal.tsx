
'use client';

import { useState } from 'react';

interface MembershipModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function MembershipModal({ isOpen, onClose }: MembershipModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    sector: '',
    employeeCount: '',
    interests: [] as string[],
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [submitStatus, setSubmitStatus] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleInterestChange = (interest: string) => {
    setFormData(prev => ({
      ...prev,
      interests: prev.interests.includes(interest)
        ? prev.interests.filter(i => i !== interest)
        : [...prev.interests, interest]
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError('');
    
    try {
      const formDataToSend = new URLSearchParams();
      formDataToSend.append('name', formData.name);
      formDataToSend.append('email', formData.email);
      formDataToSend.append('phone', formData.phone);
      formDataToSend.append('company', formData.company);
      formDataToSend.append('sector', formData.sector);
      formDataToSend.append('employeeCount', formData.employeeCount);
      formDataToSend.append('interests', formData.interests.join(', '));
      formDataToSend.append('message', formData.message);

      const response = await fetch('https://readdy.ai/api/form/d1jeno65iq446fkc13bg', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: formDataToSend.toString()
      });

      if (response.ok) {
        setSubmitStatus('success');
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      setSubmitStatus('error');
    }

    const whatsappMessage = `
      🏢 *Kurumsal Üyelik Başvurusu*
      
      👤 *Başvuran Bilgileri:*
      • Ad Soyad: ${formData.name || 'Belirtilmemiş'}
      • E-posta: ${formData.email || 'Belirtilmamış'}
      • Telefon: ${formData.phone || 'Belirtilmemiş'}
      
      🏭 *Şirket Bilgileri:*
      • Şirket Adı: ${formData.company || 'Belirtilmemiş'}
      • Sektör: ${formData.sector || 'Belirtilmemiş'}
      • Çalışan Sayısı: ${formData.employeeCount || 'Belirtilmemiş'}
      
      🎯 *İlgi Alanları:*
      ${formData.interests.length > 0 ? formData.interests.join(', ') : 'Belirtilmemiş'}
      
      💬 *Mesaj:*
      ${formData.message || 'Belirtilmemiş'}
    `.trim();

    const phoneNumber = '905333715577';
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(whatsappMessage)}`;

    try {
      window.open(whatsappUrl, '_blank');
    } catch (error) {
      const link = document.createElement('a');
      link.href = whatsappUrl;
      link.target = '_blank';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }

    if (submitStatus === 'success') {
      setIsSubmitted(true);
      setTimeout(() => {
        setIsSubmitted(false);
        setFormData({
          name: '',
          email: '',
          phone: '',
          company: '',
          sector: '',
          employeeCount: '',
          interests: [],
          message: ''
        });
        onClose();
      }, 3000);
    } else {
      setSubmitError('Form gönderiminde sorun yaşandı, lütfen tekrar deneyin.');
    }

    setIsSubmitting(false);
  };

  const handleClose = () => {
    if (!isSubmitting) {
      setIsSubmitted(false);
      setFormData({
        name: '',
        email: '',
        phone: '',
        company: '',
        sector: '',
        employeeCount: '',
        interests: [],
        message: ''
      });
      setSubmitError('');
      setSubmitStatus('');
      onClose();
    }
  };

  if (!isOpen) return null;

  const interestOptions = [
    'Yatırım Fırsatları',
    'İş Ortaklıkları',
    'Teknoloji Transferi',
    'İhracat Desteği',
    'Eğitim ve Seminerler',
    'Networking Etkinlikleri',
    'AR-GE Projeleri',
    'Finansman Desteği'
  ];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl max-w-2xl w-full mx-4 shadow-2xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="bg-gradient-to-r from-[#1B365D] to-[#2A4A6B] rounded-t-2xl p-6 text-white relative">
          <button
            onClick={handleClose}
            className="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors cursor-pointer"
            disabled={isSubmitting}
          >
            <i className="ri-close-line w-6 h-6 flex items-center justify-center"></i>
          </button>
          <h2 className="text-2xl font-bold mb-2">Kurumsal Üyelik Başvurusu</h2>
          <p className="text-gray-200">Hatay İş İnsanları Platformu'na kurumsal üye olarak katılın</p>
        </div>

        <div className="p-6">
          {!isSubmitted ? (
            <form onSubmit={handleSubmit} className="space-y-4" id="corporate-membership-form" data-readdy-form>
              {/* Error Message */}
              {submitError && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-3 text-red-700 text-sm">
                  {submitError}
                </div>
              )}

              {/* Company Information Section */}
              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="text-lg font-semibold text-[#1B365D] mb-4">Şirket Bilgileri</h3>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-2">
                      Şirket Adı *
                    </label>
                    <input
                      type="text"
                      id="company"
                      name="company"
                      value={formData.company}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#D4AF37] focus:border-[#D4AF37] outline-none transition-colors text-sm"
                      placeholder="ABC Ltd. Şti."
                      disabled={isSubmitting}
                    />
                  </div>

                  <div>
                    <label htmlFor="sector" className="block text-sm font-medium text-gray-700 mb-2">
                      Faaliyet Sektörü *
                    </label>
                    <select
                      id="sector"
                      name="sector"
                      value={formData.sector}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#D4AF37] focus:border-[#D4AF37] outline-none transition-colors text-sm pr-8"
                      disabled={isSubmitting}
                    >
                      <option value="">Sektör seçiniz</option>
                      <option value="Tarım ve Hayvancılık">Tarım ve Hayvancılık</option>
                      <option value="Gıda ve İçecek">Gıda ve İçecek</option>
                      <option value="Tekstil ve Konfeksiyon">Tekstil ve Konfeksiyon</option>
                      <option value="İnşaat ve Emlak">İnşaat ve Emlak</option>
                      <option value="Otomotiv">Otomotiv</option>
                      <option value="Teknoloji ve Yazılım">Teknoloji ve Yazılım</option>
                      <option value="Sağlık ve Tıp">Sağlık ve Tıp</option>
                      <option value="Eğitim">Eğitim</option>
                      <option value="Turizm ve Otelcilik">Turizm ve Otelcilik</option>
                      <option value="Lojistik ve Nakliye">Lojistik ve Nakliye</option>
                      <option value="Enerji">Enerji</option>
                      <option value="Finans ve Bankacılık">Finans ve Bankacılık</option>
                      <option value="İmalat Sanayi">İmalat Sanayi</option>
                      <option value="Ticaret">Ticaret</option>
                      <option value="Diğer">Diğer</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="employeeCount" className="block text-sm font-medium text-gray-700 mb-2">
                      Çalışan Sayısı *
                    </label>
                    <select
                      id="employeeCount"
                      name="employeeCount"
                      value={formData.employeeCount}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#D4AF37] focus:border-[#D4AF37] outline-none transition-colors text-sm pr-8"
                      disabled={isSubmitting}
                    >
                      <option value="">Çalışan sayısı seçiniz</option>
                      <option value="1-9">1-9</option>
                      <option value="10-49">10-49</option>
                      <option value="50-249">50-249</option>
                      <option value="250+">250+</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Contact Information Section */}
              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="text-lg font-semibold text-[#1B365D] mb-4">İletişim Bilgileri</h3>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                      Ad Soyad *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#D4AF37] focus:border-[#D4AF37] outline-none transition-colors text-sm"
                      placeholder="Adınız ve soyadınız"
                      disabled={isSubmitting}
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                      E-posta *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#D4AF37] focus:border-[#D4AF37] outline-none transition-colors text-sm"
                      placeholder="ornek@sirket.com"
                      disabled={isSubmitting}
                    />
                  </div>

                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                      Telefon *
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#D4AF37] focus:border-[#D4AF37] outline-none transition-colors text-sm"
                      placeholder="0532 123 45 67"
                      disabled={isSubmitting}
                    />
                  </div>
                </div>
              </div>

              {/* Interest Areas Section */}
              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="text-lg font-semibold text-[#1B365D] mb-4">İlgi Alanları</h3>

                <div className="grid md:grid-cols-2 gap-3">
                  {interestOptions.map((interest) => (
                    <label key={interest} className="flex items-center space-x-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formData.interests.includes(interest)}
                        onChange={() => handleInterestChange(interest)}
                        className="text-[#D4AF37] focus:ring-[#D4AF37] rounded"
                        disabled={isSubmitting}
                      />
                      <span className="text-sm text-gray-700">{interest}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Message Section */}
              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="text-lg font-semibold text-[#1B365D] mb-4">Mesaj</h3>

                <div className="grid md:grid-cols-1 gap-3">
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#D4AF37] focus:border-[#D4AF37] outline-none transition-colors text-sm"
                    placeholder="Mesajınız"
                    disabled={isSubmitting}
                  />
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-[#D4AF37] text-white py-3 rounded-lg font-semibold hover:bg-[#B8941F] transition-colors disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap flex items-center justify-center"
              >
                {isSubmitting ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent mr-2"></div>
                    Gönderiliyor...
                  </>
                ) : (
                  'Kurumsal Üyelik Başvurusu Gönder'
                )}
              </button>

              {/* Contact Info */}
              <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                <div className="flex items-center space-x-2 text-blue-700 text-sm">
                  <i className="ri-information-line w-4 h-4 flex items-center justify-center"></i>
                  <span>Başvurunuz iletilecektir.</span>
                </div>
              </div>
            </form>
          ) : (
            /* Success Message */
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="ri-check-line w-8 h-8 flex items-center justify-center text-green-600"></i>
              </div>
              <h3 className="text-xl font-bold text-[#1B365D] mb-3">Kurumsal Üyelik Başvurusu Alındı!</h3>
              <p className="text-gray-700 leading-relaxed">
                <strong>Başvurunuz başarıyla alınmıştır.</strong>
                <br />
                Kurumsal üyelik süreciniz için en kısa sürede sizinle iletişime geçeceğiz.
                <br />
                <span className="text-sm text-gray-600">Ayrıca WhatsApp üzerinden de bildirim gönderilmiştir.</span>
              </p>
              <div className="mt-6">
                <button
                  onClick={handleClose}
                  className="bg-[#D4AF37] text-white px-6 py-2 rounded-lg font-medium hover:bg-[#B8941F] transition-colors whitespace-nowrap cursor-pointer"
                >
                  Tamam
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

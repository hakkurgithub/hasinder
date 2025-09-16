
'use client';

import { useState } from 'react';

export default function IletisimPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Form verilerini hazırla
      const formDataToSend = new URLSearchParams();
      formDataToSend.append('name', formData.name);
      formDataToSend.append('email', formData.email);
      formDataToSend.append('phone', formData.phone);
      formDataToSend.append('subject', formData.subject);
      formDataToSend.append('message', formData.message);

      // Form verilerini gönder
      const response = await fetch('https://readdy.ai/api/form/contact-form-main', {
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

      // E-posta gönderimi için WhatsApp mesajı hazırla
      const whatsappMessage = `
📧 *İletişim Formu Mesajı*

👤 *Gönderen Bilgileri:*
• Ad Soyad: ${formData.name || 'Belirtilmemiş'}
• E-posta: ${formData.email || 'Belirtilmemiş'}
• Telefon: ${formData.phone || 'Belirtilmemiş'}
• Konu: ${formData.subject || 'Belirtilmemiş'}

💬 *Mesaj:*
${formData.message || 'Belirtilmemiş'}

📨 *E-posta Adresi:* kurt.hakki@gmail.com
      `.trim();

      // WhatsApp'a gönder
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

      // E-posta gönderimi (mailto link)
      const emailSubject = `İletişim Formu: ${formData.subject}`;
      const emailBody = `
Gönderen: ${formData.name}
E-posta: ${formData.email}
Telefon: ${formData.phone}
Konu: ${formData.subject}

Mesaj:
${formData.message}
      `.trim();

      const mailtoUrl = `mailto:kurt.hakki@gmail.com?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`;

      try {
        window.location.href = mailtoUrl;
      } catch (error) {
        console.log('E-posta gönderimi başarısız');
      }

      setIsSubmitted(true);
      setTimeout(() => {
        setIsSubmitted(false);
        setFormData({
          name: '',
          email: '',
          phone: '',
          subject: '',
          message: ''
        });
        setSubmitStatus('');
      }, 3000);

    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const offices = [
    {
      title: "Ana Ofis - Antakya",
      address: "Antakya Teknokent, Hatay Mustafa Kemal Üniversitesi Kampüsü, Antakya/Hatay",
      phone: "+90 326 123 45 67",
      email: "info@hatayplatform.com",
      hours: "Pazartesi - Cuma: 09:00 - 18:00"
    },
    {
      title: "İskenderun Temsilciliği",
      address: "İskenderun Serbest Bölgesi, Payas/Hatay",
      phone: "+90 326 987 65 43",
      email: "iskenderun@hatayplatform.com",
      hours: "Pazartesi - Cuma: 09:00 - 17:00"
    }
  ];

  const contacts = [
    {
      department: "Genel Bilgi",
      email: "info@hatayplatform.com",
      phone: "+90 326 123 45 67",
      icon: "ri-information-line"
    },
    {
      department: "Üyelik İşlemleri",
      email: "uyelik@hatayplatform.com",
      phone: "+90 326 123 45 68",
      icon: "ri-user-add-line"
    },
    {
      department: "Yatırımcı İlişkileri",
      email: "yatirimci@hatayplatform.com",
      phone: "+90 326 123 45 69",
      icon: "ri-money-dollar-circle-line"
    },
    {
      department: "Etkinlik Organizasyonu",
      email: "etkinlik@hatayplatform.com",
      phone: "+90 326 123 45 70",
      icon: "ri-calendar-event-line"
    },
    {
      department: "Teknik Destek",
      email: "destek@hatayplatform.com",
      phone: "+90 326 123 45 71",
      icon: "ri-customer-service-line"
    },
    {
      department: "Basın ve Medya",
      email: "basin@hatayplatform.com",
      phone: "+90 326 123 45 72",
      icon: "ri-newspaper-line"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-[#1B365D] to-[#2C5F7D] text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">İletişim</h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              Sorularınız, önerileriniz veya iş birliği teklifleriniz için bizimle iletişime geçin
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Contact Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-sm p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Bize Yazın</h2>

              {!isSubmitted ? (
                <form id="contact-form" onSubmit={handleSubmit} className="space-y-6">
                  {/* Error/Success Messages */}
                  {submitStatus === 'error' && (
                    <div className="bg-red-50 border border-red-200 rounded-lg p-3 text-red-700 text-sm">
                      Mesaj gönderilirken bir hata oluştu. Lütfen tekrar deneyin.
                    </div>
                  )}

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                        disabled={isSubmitting}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1B365D] focus:border-transparent"
                        placeholder="Adınızı ve soyadınızı girin"
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
                        disabled={isSubmitting}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1B365D] focus:border-transparent"
                        placeholder="E-posta adresinizi girin"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                        Telefon
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        disabled={isSubmitting}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1B365D] focus:border-transparent"
                        placeholder="Telefon numaranızı girin"
                      />
                    </div>

                    <div>
                      <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                        Konu *
                      </label>
                      <select
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleInputChange}
                        required
                        disabled={isSubmitting}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1B365D] focus:border-transparent pr-8"
                      >
                        <option value="">Konu seçin</option>
                        <option value="genel-bilgi">Genel Bilgi</option>
                        <option value="uyelik">Üyelik İşlemleri</option>
                        <option value="yatirim">Yatırım Fırsatları</option>
                        <option value="etkinlik">Etkinlik Organizasyonu</option>
                        <option value="teknik-destek">Teknik Destek</option>
                        <option value="basin">Basın ve Medya</option>
                        <option value="is-birligi">İş Birliği Teklifi</option>
                        <option value="diger">Diğer</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                      Mesajınız *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                      disabled={isSubmitting}
                      rows={6}
                      maxLength={500}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1B365D] focus:border-transparent resize-none"
                      placeholder="Mesajınızı detaylı bir şekilde yazın..."
                    />
                    <div className="text-sm text-gray-500 mt-1">
                      {formData.message.length}/500 karakter
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-[#1B365D] text-white py-3 px-6 rounded-lg hover:bg-[#2C5F7D] font-medium whitespace-nowrap cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent mr-2"></div>
                        Gönderiliyor...
                      </>
                    ) : (
                      'Mesajı Gönder'
                    )}
                  </button>

                  {/* Info Message */}
                  <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                    <div className="flex items-center space-x-2 text-blue-700 text-sm">
                      <i className="ri-information-line w-4 h-4 flex items-center justify-center"></i>
                      <span>Mesajınız e-posta ve WhatsApp üzerinden iletilecektir.</span>
                    </div>
                  </div>
                </form>
              ) : (
                /* Success Message */
                <div className="text-center py-8">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <i className="ri-check-line w-8 h-8 flex items-center justify-center text-green-600"></i>
                  </div>
                  <h3 className="text-xl font-bold text-[#1B365D] mb-3">Mesajınız Gönderildi!</h3>
                  <p className="text-gray-700 leading-relaxed">
                    <strong>Mesajınız başarıyla iletildi.</strong>
                    <br />
                    En kısa sürede size dönüş yapacağız.
                    <br />
                    <span className="text-sm text-gray-600">E-posta ve WhatsApp üzerinden bildirim gönderilmiştir.</span>
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Contact Info */}
          <div className="space-y-8">
            {/* Office Locations */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-6">Ofis Lokasyonları</h3>
              <div className="space-y-6">
                {offices.map((office, index) => (
                  <div key={index} className="pb-6 border-b border-gray-200 last:border-b-0 last:pb-0">
                    <h4 className="font-semibold text-gray-900 mb-3">{office.title}</h4>
                    <div className="space-y-2 text-sm text-gray-600">
                      <div className="flex items-start">
                        <i className="ri-map-pin-line w-4 h-4 flex items-center justify-center mt-0.5 mr-2 text-[#1B365D]"></i>
                        <span>{office.address}</span>
                      </div>
                      <div className="flex items-center">
                        <i className="ri-phone-line w-4 h-4 flex items-center justify-center mr-2 text-[#1B365D]"></i>
                        <span>{office.phone}</span>
                      </div>
                      <div className="flex items-center">
                        <i className="ri-mail-line w-4 h-4 flex items-center justify-center mr-2 text-[#1B365D]"></i>
                        <span>{office.email}</span>
                      </div>
                      <div className="flex items-center">
                        <i className="ri-time-line w-4 h-4 flex items-center justify-center mr-2 text-[#1B365D]"></i>
                        <span>{office.hours}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Contacts */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-6">Hızlı İletişim</h3>
              <div className="space-y-4">
                {contacts.map((contact, index) => (
                  <div key={index} className="flex items-start p-3 rounded-lg hover:bg-gray-50">
                    <i className={`${contact.icon} w-5 h-5 flex items-center justify-center mt-0.5 mr-3 text-[#1B365D]`}></i>
                    <div className="flex-1">
                      <div className="font-medium text-gray-900 text-sm">{contact.department}</div>
                      <div className="text-xs text-gray-600 mt-1">
                        <div>{contact.email}</div>
                        <div>{contact.phone}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Social Media */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-6">Sosyal Medya</h3>
              <div className="grid grid-cols-2 gap-4">
                <a href="#" className="flex items-center p-3 rounded-lg border border-gray-200 hover:border-[#1B365D] cursor-pointer">
                  <i className="ri-facebook-fill w-5 h-5 flex items-center justify-center mr-3 text-blue-600"></i>
                  <span className="text-sm font-medium">Facebook</span>
                </a>
                <a href="#" className="flex items-center p-3 rounded-lg border border-gray-200 hover:border-[#1B365D] cursor-pointer">
                  <i className="ri-twitter-fill w-5 h-5 flex items-center justify-center mr-3 text-blue-400"></i>
                  <span className="text-sm font-medium">Twitter</span>
                </a>
                <a href="#" className="flex items-center p-3 rounded-lg border border-gray-200 hover:border-[#1B365D] cursor-pointer">
                  <i className="ri-linkedin-fill w-5 h-5 flex items-center justify-center mr-3 text-blue-700"></i>
                  <span className="text-sm font-medium">LinkedIn</span>
                </a>
                <a href="#" className="flex items-center p-3 rounded-lg border border-gray-200 hover:border-[#1B365D] cursor-pointer">
                  <i className="ri-instagram-fill w-5 h-5 flex items-center justify-center mr-3 text-pink-600"></i>
                  <span className="text-sm font-medium">Instagram</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Map */}
        <div className="mt-16">
          <div className="bg-white rounded-xl shadow-sm p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">Bizi Ziyaret Edin</h3>
            <div className="rounded-lg overflow-hidden">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3194.8951775736847!2d36.15543931526184!3d36.20297398007193!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x15256b3c9c5b7c8d%3A0x3d4b8f8c4c4b4b4b!2sHatay%20Mustafa%20Kemal%20%C3%9Cniversitesi!5e0!3m2!1str!2str!4v1647890123456!5m2!1str!2str"
                width="100%"
                height="400"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

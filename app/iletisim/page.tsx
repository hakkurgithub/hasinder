'use client';

import { useState } from 'react';

export default function ContactPage() {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<{type: string, text: string} | null>(null);

  const adminPhone = "905333715577"; // WhatsApp Numarası
  const adminEmail = "kurt.hakki@gmail.com";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // 1. WhatsApp'a Yönlendirme Metni Hazırlığı
    const waText = `Merhaba Hakkı Bey, ben ${formData.name}. TİB Ağı üzerinden size ulaşıyorum.%0A%0A*Konu:* ${formData.subject}%0A*Mesaj:* ${formData.message}%0A*E-posta:* ${formData.email}`;
    
    // 2. Formu Mail API'sine gönderme (Simülasyon/Hazırlık)
    try {
      // Not: Canlıda nodemailer kurulduğunda burası aktif çalışır.
      // Şimdilik doğrudan WhatsApp'a yönlendiriyoruz ki anında iletişim kurulsun.
      setStatus({ type: 'success', text: '✅ Mesajınız işleme alındı. Lütfen açılan WhatsApp penceresinden gönderimi onaylayın.' });
      
      setTimeout(() => {
        window.open(`https://wa.me/${adminPhone}?text=${waText}`, '_blank');
        setFormData({ name: '', email: '', subject: '', message: '' });
        setLoading(false);
      }, 1500);

    } catch (error) {
      setStatus({ type: 'error', text: '❌ Sistemsel bir hata oluştu.' });
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-extrabold text-[#1B365D]">Bize Ulaşın</h1>
          <p className="mt-4 text-xl text-gray-500">TİB Ağı Premium Destek ve Yönetim Merkezi</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* İletişim Bilgileri */}
          <div className="bg-[#1B365D] rounded-2xl p-10 text-white shadow-xl">
            <h3 className="text-2xl font-bold mb-8 text-[#D4AF37]">Genel Merkez</h3>
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <i className="ri-map-pin-fill text-3xl text-[#D4AF37]"></i>
                <div>
                  <p className="font-bold text-lg">Adres</p>
                  <p className="text-blue-100">Adile Naşit Caddesi<br/>OLCAY SEVALİSTA RESİDENCE Kat 2<br/>Esenyurt / İstanbul</p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <i className="ri-phone-fill text-3xl text-[#D4AF37]"></i>
                <div>
                  <p className="font-bold text-lg">GSM / WhatsApp Destek</p>
                  <p className="text-blue-100">+90 533 371 55 77</p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <i className="ri-mail-fill text-3xl text-[#D4AF37]"></i>
                <div>
                  <p className="font-bold text-lg">E-posta</p>
                  <p className="text-blue-100">{adminEmail}</p>
                </div>
              </div>
            </div>
          </div>

          {/* İletişim Formu */}
          <div className="bg-white rounded-2xl p-10 shadow-xl border border-gray-100">
            <h3 className="text-2xl font-bold mb-6 text-[#1B365D]">Hızlı İletişim Formu</h3>
            {status && <div className={`p-4 rounded-lg mb-6 font-bold text-sm ${status.type === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>{status.text}</div>}
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-700">Adınız / Firma Adı</label>
                <input type="text" required value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="mt-1 w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-[#D4AF37] focus:border-[#D4AF37]" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">E-posta Adresiniz</label>
                <input type="email" required value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} className="mt-1 w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-[#D4AF37] focus:border-[#D4AF37]" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Konu</label>
                <select required value={formData.subject} onChange={e => setFormData({...formData, subject: e.target.value})} className="mt-1 w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-[#D4AF37] focus:border-[#D4AF37] bg-white">
                  <option value="">Seçiniz...</option>
                  <option value="Premium Üyelik Talebi">Premium Üyelik Talebi</option>
                  <option value="Sistem Destek">Sistem Destek / Onay Süreci</option>
                  <option value="Kurumsal İşbirliği">Kurumsal İşbirliği</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Mesajınız</label>
                <textarea required rows={4} value={formData.message} onChange={e => setFormData({...formData, message: e.target.value})} className="mt-1 w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-[#D4AF37] focus:border-[#D4AF37]"></textarea>
              </div>
              <button type="submit" disabled={loading} className="w-full bg-[#D4AF37] text-white font-bold py-4 rounded-lg hover:bg-[#B8941F] transition-all flex justify-center items-center shadow-md">
                {loading ? 'Yönlendiriliyor...' : <><i className="ri-whatsapp-line text-2xl mr-2"></i> WhatsApp İle Gönder</>}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
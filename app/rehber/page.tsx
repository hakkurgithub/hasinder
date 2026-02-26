'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function GuidePage() {
  const [activeFaq, setActiveFaq] = useState<number | null>(0);

  const faqs = [
    {
      q: "TİB Ağı'na nasıl üye olabilirim?",
      a: "Sisteme sadece 'Vergi Levhası' olan resmi işletmeler ve onaylı aracılar katılabilir. 'Kurumsal Kayıt' bölümünden bilgilerinizi girdikten sonra, başvurunuz Genel Merkez (Admin) onayına sunulur. Onaylandığında SMS/E-posta ile bilgilendirilirsiniz."
    },
    {
      q: "Sıfır Sermaye ile nasıl komisyon kazanırım?",
      a: "Panelinizdeki 'Aktif Talepler' bölümünde örneğin '20 Ton İnşaat Demiri Aranıyor' fırsatını gördünüz. Çevrenizdeki bir demir tüccarını (platforma resmi kayıtlı olmalı) bu talebe satıcı olarak eklersiniz. Ticaret onaylandığında, sistem otomatik olarak toplam tutarın %2'sini 'Hakediş Cüzdanınıza' yansıtır."
    },
    {
      q: "Platform hangi sektörlere hizmet veriyor?",
      a: "Şu an için sadece somut ve denetlenebilir ticaretin döndüğü Toptan Gıda & Tarım, İnşaat & Yapı Malzemeleri ve Lojistik (Boş Kapasite Eşleştirme) sektörlerinde faaliyet gösteriyoruz."
    },
    {
      q: "Lojistik Ağı (Boş Kamyon Radarı) nasıl çalışır?",
      a: "Hatay'dan İstanbul'a giden ve boş dönecek olan bir aracınız varsa, Lojistik panelinden 'Boş Kapasite' ilanı açarsınız. Yük sahipleri sizi sistem üzerinden bulur ve eşleşme sağlanır. Böylece araçların boş dönüş maliyeti sıfırlanır."
    },
    {
      q: "Cüzdanımdaki komisyon hakedişlerini nasıl çekerim?",
      a: "Ticaret başarıyla sonuçlanıp ödemeler güvence altına alındığında, Yönetim Kurulu ticareti onaylar. Bakiyeniz kesinleştiğinde, sistemde kayıtlı kurumsal IBAN numaranıza ödemeniz gerçekleştirilir."
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Başlık Alanı */}
        <div className="text-center mb-16">
          <span className="bg-[#D4AF37] text-white px-4 py-1 rounded-full text-sm font-bold tracking-wider uppercase shadow-md">Kullanım Rehberi</span>
          <h1 className="mt-6 text-4xl font-extrabold text-[#1B365D] sm:text-5xl">TİB Ağı Nasıl Çalışır?</h1>
          <p className="mt-4 text-xl text-gray-600">Ticaret ağınızı kurun, eşleştirin ve sıfır sermaye ile kazanmaya başlayın.</p>
        </div>

        {/* Adım Adım İşleyiş Kartları */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <div className="bg-white rounded-2xl p-8 shadow-lg border-t-4 border-[#1B365D] text-center">
            <div className="w-16 h-16 bg-blue-50 text-[#1B365D] rounded-full flex items-center justify-center mx-auto mb-6 text-3xl">
              <i className="ri-user-add-line"></i>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">1. Resmi Kayıt</h3>
            <p className="text-gray-600 text-sm">Vergi numaranızla sisteme başvurun. Genel Merkez onayının ardından B2B ağının kapıları size açılsın.</p>
          </div>
          
          <div className="bg-white rounded-2xl p-8 shadow-lg border-t-4 border-[#D4AF37] text-center">
            <div className="w-16 h-16 bg-yellow-50 text-[#D4AF37] rounded-full flex items-center justify-center mx-auto mb-6 text-3xl">
              <i className="ri-links-line"></i>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">2. Akıllı Eşleştirme</h3>
            <p className="text-gray-600 text-sm">Açık taleplere tedarikçi bulun veya lojistik rotalarındaki boş kamyonlarla yükünüzü eşleştirin.</p>
          </div>

          <div className="bg-white rounded-2xl p-8 shadow-lg border-t-4 border-green-500 text-center">
            <div className="w-16 h-16 bg-green-50 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6 text-3xl">
              <i className="ri-wallet-3-line"></i>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">3. Güvenli Kazanç</h3>
            <p className="text-gray-600 text-sm">Gerçekleşen her ticaret ve yönlendirmeden sistemin belirlediği (%2) şeffaf komisyonunuzu kurumsal cüzdanınıza alın.</p>
          </div>
        </div>

        {/* SSS Akordiyon */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
          <div className="bg-[#1B365D] px-8 py-6">
            <h2 className="text-2xl font-bold text-white"><i className="ri-question-answer-line mr-2"></i>Sıkça Sorulan Sorular</h2>
          </div>
          <div className="divide-y divide-gray-100">
            {faqs.map((faq, index) => (
              <div key={index} className="p-2">
                <button 
                  onClick={() => setActiveFaq(activeFaq === index ? null : index)}
                  className="w-full text-left px-6 py-4 flex justify-between items-center focus:outline-none"
                >
                  <span className="font-bold text-gray-800 text-lg">{faq.q}</span>
                  <i className={`ri-arrow-down-s-line text-2xl transition-transform ${activeFaq === index ? 'rotate-180 text-[#D4AF37]' : 'text-gray-400'}`}></i>
                </button>
                {activeFaq === index && (
                  <div className="px-6 pb-6 pt-2 text-gray-600 leading-relaxed border-l-4 border-[#D4AF37] ml-6 mb-4">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Yönlendirme */}
        <div className="mt-12 text-center">
          <Link href="/giris" className="inline-flex items-center justify-center px-8 py-4 text-base font-bold text-white bg-[#1B365D] hover:bg-blue-900 rounded-xl shadow-lg transition-all">
            Hemen Platforma Katılın <i className="ri-arrow-right-line ml-2"></i>
          </Link>
        </div>

      </div>
    </div>
  );
}

'use client';

import { useState } from 'react';
import MembershipModal from '../components/MembershipModal';

export default function AboutSection() {
  const [showMembershipModal, setShowMembershipModal] = useState(false);
  const [showImageModal, setShowImageModal] = useState(false);
  const [showPresidentImageModal, setShowPresidentImageModal] = useState(false);

  return (
    <>
      <section id="hakkimizda" className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-[#1B365D] mb-4">
              Hakkımızda
            </h2>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto font-medium">
              Hatay'nın ekonomik kalkınmasına öncülük eden platform
            </p>
          </div>

          {/* Ana Açıklama */}
          <div className="bg-white rounded-2xl p-8 lg:p-12 shadow-lg mb-12">
            <div className="max-w-4xl mx-auto text-center">
              <p className="text-lg text-gray-700 leading-relaxed mb-8">
                <strong className="text-[#1B365D]">Hatay İş İnsanları İş Birliği ve Yatırım Platformu</strong>, bölgenin ekonomik ve toplumsal kalkınmasına katkı sağlamak amacıyla kurulmuş, tarafsız ve katılımcı bir girişimdir. Temel hedefimiz; Hatay'daki iş insanlarını bir araya getirerek, ortak akılla yatırım olanaklarını geliştirmek, sürdürülebilir iş birlikleri kurmak ve yerel kalkınmaya yön vermektir.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed">
                Platformumuz; kriz dönemlerinin ardından yeniden yapılanma sürecine katkı sunmayı, üretimden ihracata, girişimcilikten sosyal sorumluluk projelerine kadar birçok alanda iş dünyasını desteklemeyi amaçlar. Aynı zamanda <strong className="text-[#D4AF37]">Hatay'ın tarihi, kültürel ve ekonomik mirasını yaşatarak geleceğe taşımayı</strong> da görev edinmiştir.
              </p>
            </div>
          </div>

          {/* Başkan ve Yönetim */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Başkan */}
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <div className="text-center mb-6">
                <div className="w-32 h-32 mx-auto mb-6 rounded-full bg-gradient-to-br from-[#D4AF37] to-[#B8941F] flex items-center justify-center">
                  <img 
                    src="https://static.readdy.ai/image/86256f96d228f2d3066349cf76ade3d3/948774a2b1714a23b0a8770298673acc.jfif"
                    alt="Hakkı Kurt"
                    className="w-28 h-28 rounded-full object-cover object-top cursor-pointer hover:opacity-90 transition-opacity"
                    onClick={() => setShowPresidentImageModal(true)}
                  />
                </div>
                <h3 className="text-2xl font-bold text-[#1B365D] mb-2">Hakkı Kurt</h3>
                <p className="text-[#D4AF37] font-semibold">Kurucu Başkan</p>
              </div>
              <p className="text-gray-700 leading-relaxed">
                Hatay İş İnsanları İş Birliği ve Yatırım Platformu'nun kurucu başkanıdır. Bölge iş dünyasında <strong>uzun yıllara dayanan deneyimiyle</strong> tanınan Hakkı Kurt, platformun vizyonunu şekillendiren isimdir. Liderliği, birliktelik ruhuna ve karşılıklı güvene dayanmaktadır. Yenilikçi çözümler ve güçlü iş ağları ile <strong className="text-[#D4AF37]">Hatay'ı yatırım ve girişimcilik açısından yeniden cazibe merkezi haline getirme</strong> hedefini kararlılıkla sürdürmektedir.
              </p>
            </div>

            {/* Yönetim Kurulu */}
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <div className="text-center mb-6">
                <div 
                  className="w-full h-48 mb-6 rounded-lg overflow-hidden cursor-pointer hover:opacity-90 transition-opacity"
                  onClick={() => setShowImageModal(true)}
                >
                  <img 
                    src="https://static.readdy.ai/image/86256f96d228f2d3066349cf76ade3d3/8e81931611aecc20fa65e653c1919369.png"
                    alt="Yönetim Kurulu Toplantısı"
                    className="w-full h-full object-cover object-top"
                  />
                </div>
                <h3 className="text-2xl font-bold text-[#1B365D] mb-2">Yönetim Kurulumuz</h3>
                <p className="text-[#D4AF37] font-semibold">Başkan Hakkı Kurt Liderliğinde</p>
              </div>
              <p className="text-gray-700 leading-relaxed">
                Yönetim kurulumuz; <strong>Başkan Hakkı Kurt'un liderliğinde</strong> düzenli olarak bir araya gelerek platformun stratejik kararlarını almaktadır. <strong>Hatay'ın farklı ilçelerinden ve sektörlerinden</strong> gelen deneyimli iş insanlarından oluşan kurulumuz, bölgenin kalkınması için ortak akılla çalışmaktadır. <strong className="text-[#D4AF37]">Şeffaflık, kapsayıcılık ve sürdürülebilirlik</strong> ilkeleri doğrultusunda yapılan toplantılarda, her geçen gün daha geniş bir etki alanı yaratma vizyonuyla stratejiler belirlenmektedir.
              </p>
            </div>
          </div>

          {/* Değerlerimiz */}
          <div className="mt-16">
            <h3 className="text-3xl font-bold text-[#1B365D] text-center mb-12">
              Değerlerimiz
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white rounded-2xl p-6 shadow-lg text-center hover:shadow-xl transition-shadow">
                <div className="w-16 h-16 bg-[#D4AF37]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <i className="ri-handshake-line w-8 h-8 flex items-center justify-center text-[#D4AF37]"></i>
                </div>
                <h4 className="text-xl font-bold text-[#1B365D] mb-3">İş Birliği</h4>
                <p className="text-gray-700">
                  Güçlü ortaklıklar kurarak birlikte büyüme
                </p>
              </div>
              <div className="bg-white rounded-2xl p-6 shadow-lg text-center hover:shadow-xl transition-shadow">
                <div className="w-16 h-16 bg-[#1B365D]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <i className="ri-lightbulb-line w-8 h-8 flex items-center justify-center text-[#1B365D]"></i>
                </div>
                <h4 className="text-xl font-bold text-[#1B365D] mb-3">Yenilikçilik</h4>
                <p className="text-gray-700">
                  Dijital çözümlerle iş dünyasını dönüştürme
                </p>
              </div>
              <div className="bg-white rounded-2xl p-6 shadow-lg text-center hover:shadow-xl transition-shadow">
                <div className="w-16 h-16 bg-[#D4AF37]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <i className="ri-earth-line w-8 h-8 flex items-center justify-center text-[#D4AF37]"></i>
                </div>
                <h4 className="text-xl font-bold text-[#1B365D] mb-3">Sürdürülebilirlik</h4>
                <p className="text-gray-700">
                  Gelecek nesiller için yeşil ekonomi
                </p>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="mt-16 text-center">
            <div className="bg-gradient-to-r from-[#1B365D] to-[#2A4A6B] rounded-2xl p-8 text-white">
              <h3 className="text-2xl font-bold mb-4">
                Hatay'ın Geleceğini Birlikte Şekillendirelim
              </h3>
              <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
                Siz de bu büyük vizyon'un bir parçası olun. Platform üyelerimiz arasına katılın ve bölgenin kalkınmasına katkı sağlayın.
              </p>
              <button 
                onClick={() => setShowMembershipModal(true)}
                className="bg-[#D4AF37] text-white px-8 py-3 rounded-lg font-semibold hover:bg-[#B8941F] transition-colors whitespace-nowrap cursor-pointer"
              >
                Hemen Üye Ol
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* President Image Modal */}
      {showPresidentImageModal && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4"
          onClick={() => setShowPresidentImageModal(false)}
        >
          <div className="relative max-w-2xl max-h-full">
            <button
              onClick={() => setShowPresidentImageModal(false)}
              className="absolute -top-10 right-0 text-white hover:text-gray-300 text-2xl font-bold cursor-pointer"
            >
              <i className="ri-close-line w-8 h-8 flex items-center justify-center"></i>
            </button>
            <img 
              src="https://static.readdy.ai/image/86256f96d228f2d3066349cf76ade3d3/948774a2b1714a23b0a8770298673acc.jfif"
              alt="Hakkı Kurt - Kurucu Başkan"
              className="max-w-full max-h-full object-contain rounded-lg"
              onClick={(e) => e.stopPropagation()}
            />
          </div>
        </div>
      )}

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
              src="https://static.readdy.ai/image/86256f96d228f2d3066349cf76ade3d3/8e81931611aecc20fa65e653c1919369.png"
              alt="Yönetim Kurulu Toplantısı - Tam Boy"
              className="max-w-full max-h-full object-contain rounded-lg"
              onClick={(e) => e.stopPropagation()}
            />
          </div>
        </div>
      )}

      {/* Membership Modal */}
      <MembershipModal 
        isOpen={showMembershipModal} 
        onClose={() => setShowMembershipModal(false)} 
      />
    </>
  );
}

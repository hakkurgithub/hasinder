
'use client';

import { useState } from 'react';
import MembershipModal from '@/components/MembershipModal';

export default function MembershipPlans() {
  const [showMembershipModal, setShowMembershipModal] = useState(false);

  const plans = [
    {
      name: 'Kurumsal Üyelik',
      price: '',
      period: '',
      description: 'İş dünyasında başarılı bir gelecek için',
      features: [
        'Gelişmiş profil özellikleri',
        'Sınırsız ürün/hizmet ekleme',
        'Özel mesajlaşma',
        'İş fırsatları paylaşımı',
        'Etkinliklere katılım',
        'Network toplantıları',
        'Pazarlama desteği',
        'İş danışmanlığı'
      ],
      buttonText: 'Hemen Üye Ol',
      popular: true
    }
  ];

  return (
    <>
      <section id="uyelik" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-[#1B365D] mb-4">
              Üyelik Planları
            </h2>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto">
              İhtiyacınıza uygun paketi seçin ve platformun tüm avantajlarından yararlanın
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-1 gap-8 max-w-md mx-auto">
            {plans.map((plan, index) => (
              <div
                key={index}
                className={`relative bg-white rounded-2xl shadow-lg border-2 hover:shadow-xl transition-all duration-300 ${
                  plan.popular ? 'border-[#D4AF37] scale-105' : 'border-gray-200'
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-[#D4AF37] text-white px-6 py-2 rounded-full text-sm font-semibold whitespace-nowrap">
                      En Popüler
                    </span>
                  </div>
                )}

                <div className="p-8">
                  <div className="text-center mb-8">
                    <h3 className="text-2xl font-bold text-[#1B365D] mb-2">
                      {plan.name}
                    </h3>
                    <p className="text-gray-600 mb-4">
                      {plan.description}
                    </p>
                    <div className="mb-6">
                      <span className="text-4xl font-bold text-[#1B365D]">
                        {plan.price}
                      </span>
                      <span className="text-gray-600">
                        {plan.period}
                      </span>
                    </div>
                  </div>

                  <ul className="space-y-4 mb-8">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-start">
                        <div className="flex-shrink-0 w-5 h-5 bg-green-100 rounded-full flex items-center justify-center mr-3 mt-0.5">
                          <i className="ri-check-line w-3 h-3 flex items-center justify-center text-green-600"></i>
                        </div>
                        <span className="text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <button
                    onClick={() => setShowMembershipModal(true)}
                    className={`w-full py-3 px-6 rounded-lg font-semibold transition-colors whitespace-nowrap cursor-pointer ${
                      plan.popular
                        ? 'bg-[#D4AF37] text-white hover:bg-[#B8941F]'
                        : 'bg-gray-100 text-[#1B365D] hover:bg-gray-200'
                    }`}
                  >
                    {plan.buttonText}
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Additional Services */}
          <div className="mt-16 bg-gradient-to-r from-gray-50 to-blue-50 rounded-2xl p-8">
            <h3 className="text-2xl font-bold text-[#1B365D] text-center mb-8">
              Ek Hizmetlerimiz
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white rounded-xl p-6 text-center shadow-md">
                <div className="w-12 h-12 bg-[#D4AF37]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <i className="ri-store-2-line w-6 h-6 flex items-center justify-center text-[#D4AF37]"></i>
                </div>
                <h4 className="font-semibold text-[#1B365D] mb-2">E-Ticaret Desteği</h4>
                <p className="text-sm text-gray-600">Online mağaza kurulumu ve yönetimi</p>
              </div>

              <div className="bg-white rounded-xl p-6 text-center shadow-md">
                <div className="w-12 h-12 bg-[#1B365D]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <i className="ri-megaphone-line w-6 h-6 flex items-center justify-center text-[#1B365D]"></i>
                </div>
                <h4 className="font-semibold text-[#1B365D] mb-2">Dijital Pazarlama</h4>
                <p className="text-sm text-gray-600">Sosyal medya ve reklam yönetimi</p>
              </div>

              <div className="bg-white rounded-xl p-6 text-center shadow-md">
                <div className="w-12 h-12 bg-[#D4AF37]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <i className="ri-user-settings-line w-6 h-6 flex items-center justify-center text-[#D4AF37]"></i>
                </div>
                <h4 className="font-semibold text-[#1B365D] mb-2">İş Danışmanlığı</h4>
                <p className="text-sm text-gray-600">Uzman danışmanlarla birebir görüşme</p>
              </div>
            </div>
          </div>

          {/* FAQ */}
          <div className="mt-16">
            <h3 className="text-2xl font-bold text-[#1B365D] text-center mb-8">
              Sıkça Sorulan Sorular
            </h3>
            <div className="max-w-3xl mx-auto space-y-4">
              <div className="bg-gray-50 rounded-lg p-6">
                <h4 className="font-semibold text-[#1B365D] mb-2">
                  Üyelik iptali nasıl yapılır?
                </h4>
                <p className="text-gray-700">
                  Üyeliğinizi istediğiniz zaman iptal edebilirsiniz. Destek ekibimizle iletişime geçmeniz yeterlidir.
                </p>
              </div>

              <div className="bg-gray-50 rounded-lg p-6">
                <h4 className="font-semibold text-[#1B365D] mb-2">
                  Ödeme güvenli mi?
                </h4>
                <p className="text-gray-700">
                  Tüm ödemeleriniz SSL şifrelemesi ile korunmaktadır. Kredi kartı bilgileriniz güvenle saklanır.
                </p>
              </div>

              <div className="bg-gray-50 rounded-lg p-6">
                <h4 className="font-semibold text-[#1B365D] mb-2">
                  Plan değişikliği yapabilir miyim?
                </h4>
                <p className="text-gray-700">
                  Evet, istediğiniz zaman planınızı yükseltebilir veya düşürebilirsiniz. Fark tutarları eşit olarak dağıtılır.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Membership Modal */}
      <MembershipModal
        isOpen={showMembershipModal}
        onClose={() => setShowMembershipModal(false)}
      />
    </>
  );
}

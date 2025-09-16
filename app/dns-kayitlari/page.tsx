
'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function DNSKayitlariPage() {
  const [copiedRecord, setCopiedRecord] = useState('');

  const copyToClipboard = (text, recordName) => {
    navigator.clipboard.writeText(text);
    setCopiedRecord(recordName);
    setTimeout(() => setCopiedRecord(''), 2000);
  };

  // Sadece gerekli DNS kayıtları - sıralı
  const dnsRecords = [
    {
      step: 1,
      type: 'A',
      name: '@',
      value: 'publish.readdy.site',
      ttl: 3600,
      description: 'Ana domain için publish.readdy.site\'e yönlendirme',
      required: true
    },
    {
      step: 2,
      type: 'CNAME',
      name: 'www',
      value: 'publish.readdy.site',
      ttl: 3600,
      description: 'www subdomain için publish.readdy.site\'e yönlendirme',
      required: true
    },
    {
      step: 3,
      type: 'CNAME',
      name: '_domainconnect',
      value: 'SİL',
      ttl: 0,
      description: 'Bu kayıt varsa silinmelidir',
      required: false,
      delete: true
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      {/* Hero Section */}
      <div 
        className="bg-gradient-to-r from-[#1B365D] to-[#2C5F7D] text-white py-20"
        style={{
          backgroundImage: `url('https://readdy.ai/api/search-image?query=Modern%20DNS%20server%20infrastructure%20technology%20network%20configuration%20digital%20hosting%20environment%20professional%20technical%20setup%20with%20server%20racks%20and%20network%20cables%20clean%20minimalist%20design%20blue%20gradient%20background&width=1920&height=600&seq=dnssetup2024&orientation=landscape')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-[#1B365D]/90 to-[#2C5F7D]/90"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              DNS Kayıt Ayarları
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 max-w-4xl mx-auto mb-8">
              Sitenizi yayınlamak için sadece bu 3 adımı uygulayın
            </p>
            <div className="flex items-center justify-center gap-4">
              <div className="bg-green-500 w-3 h-3 rounded-full animate-pulse"></div>
              <span className="text-green-200">Publish.readdy.site Hazır</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        
        {/* Critical Steps */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Sitenizi Yayınlamak İçin DNS Ayarları
          </h2>

          <div className="space-y-8">
            {dnsRecords.map((record, index) => (
              <div key={index} className={`border-l-4 ${record.required ? 'border-red-500 bg-red-50' : record.delete ? 'border-yellow-500 bg-yellow-50' : 'border-blue-500 bg-blue-50'} p-6 rounded-r-lg`}>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center">
                    <div className={`w-10 h-10 ${record.required ? 'bg-red-500' : record.delete ? 'bg-yellow-500' : 'bg-blue-500'} text-white rounded-full flex items-center justify-center font-bold text-lg mr-4`}>
                      {record.step}
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900">
                        {record.type} Kaydı {record.delete ? '(Sil)' : '(Ekle/Güncelle)'}
                      </h3>
                      <p className="text-gray-600">{record.description}</p>
                    </div>
                  </div>
                  {!record.delete && (
                    <button
                      onClick={() => copyToClipboard(record.value, record.type + record.name)}
                      className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 cursor-pointer flex items-center whitespace-nowrap"
                    >
                      {copiedRecord === record.type + record.name ? (
                        <>
                          <i className="ri-check-line w-4 h-4 flex items-center justify-center mr-2"></i>
                          Kopyalandı
                        </>
                      ) : (
                        <>
                          <i className="ri-file-copy-line w-4 h-4 flex items-center justify-center mr-2"></i>
                          Kopyala
                        </>
                      )}
                    </button>
                  )}
                </div>

                <div className="bg-white rounded-lg p-4 border border-gray-200">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                    <div>
                      <span className="font-semibold text-gray-700">Kayıt Tipi:</span>
                      <div className="font-mono text-lg text-gray-900">{record.type}</div>
                    </div>
                    <div>
                      <span className="font-semibold text-gray-700">Ad/Host:</span>
                      <div className="font-mono text-lg text-gray-900">{record.name}</div>
                    </div>
                    <div>
                      <span className="font-semibold text-gray-700">Değer:</span>
                      <div className={`font-mono text-lg ${record.delete ? 'text-red-600' : 'text-green-600'}`}>
                        {record.value}
                      </div>
                    </div>
                  </div>
                </div>

                {record.required && (
                  <div className="mt-4 bg-red-100 border border-red-200 rounded-lg p-3">
                    <p className="text-red-800 font-medium">⚠️ Bu kayıt olmadan siteniz çalışmaz!</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Simple Instructions */}
        <div className="bg-gradient-to-r from-[#1B365D] to-[#2C5F7D] text-white rounded-xl p-8 mb-8">
          <h3 className="text-2xl font-bold mb-6 text-center">Nasıl Yapılır?</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="ri-login-circle-line w-8 h-8 flex items-center justify-center text-white"></i>
              </div>
              <h4 className="font-bold mb-2">1. Panele Giriş</h4>
              <p className="text-blue-100">Domain sağlayıcınızın (GoDaddy, Natro vs.) paneline giriş yapın</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="ri-settings-3-line w-8 h-8 flex items-center justify-center text-white"></i>
              </div>
              <h4 className="font-bold mb-2">2. DNS Ayarları</h4>
              <p className="text-blue-100">DNS yönetimi veya DNS ayarları bölümünü bulun</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="ri-check-double-line w-8 h-8 flex items-center justify-center text-white"></i>
              </div>
              <h4 className="font-bold mb-2">3. Kayıtları Ekle</h4>
              <p className="text-blue-100">Yukarıdaki 3 adımı sırayla uygulayın</p>
            </div>
          </div>
        </div>

        {/* Important Notes */}
        <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6 mb-8">
          <h3 className="text-lg font-bold text-yellow-800 mb-4 flex items-center">
            <i className="ri-lightbulb-line w-6 h-6 flex items-center justify-center mr-2"></i>
            Önemli Notlar
          </h3>
          <ul className="space-y-2 text-yellow-800">
            <li>• NS kayıtlarına (ns23.domaincontrol.com, ns24.domaincontrol.com) dokunmayın</li>
            <li>• DNS değişiklikleri 5-15 dakika içinde aktif olur</li>
            <li>• Tamamen yayılması 24-48 saat sürebilir</li>
            <li>• Kayıtları ekledikten sonra değişiklik yapmanız gerekmez</li>
          </ul>
        </div>

        {/* Status Check */}
        <div className="bg-white rounded-xl shadow-sm p-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            DNS Kontrolü
          </h3>
          <div className="text-center">
            <p className="text-gray-600 mb-4">
              DNS ayarlarınızı yaptıktan sonra aşağıdaki araçla kontrol edebilirsiniz:
            </p>
            <a 
              href="https://www.whatsmydns.net/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 cursor-pointer font-semibold"
            >
              DNS Durumunu Kontrol Et
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

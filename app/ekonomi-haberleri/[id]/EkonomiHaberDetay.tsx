
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

interface EkonomiHaberDetayProps {
  haberId: string;
}

export default function EkonomiHaberDetay({ haberId }: EkonomiHaberDetayProps) {
  const [haber, setHaber] = useState(null);
  const [benzerHaberler, setBenzerHaberler] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedNews = localStorage.getItem('ekonomiHaberleri');
    if (savedNews) {
      const allNews = JSON.parse(savedNews);
      const currentNews = allNews.find(item => item.id.toString() === haberId);
      
      if (currentNews) {
        setHaber(currentNews);
        
        // Benzer haberleri bul (aynı kategori)
        const similarNews = allNews
          .filter(item => 
            item.id.toString() !== haberId && 
            item.category === currentNews.category
          )
          .slice(0, 3);
        setBenzerHaberler(similarNews);
      }
    }
    setLoading(false);
  }, [haberId]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 pt-16 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-2 border-[#1B365D] border-t-transparent"></div>
      </div>
    );
  }

  if (!haber) {
    return (
      <div className="min-h-screen bg-gray-50 pt-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
          <div className="bg-white rounded-xl p-12 shadow-sm">
            <i className="ri-file-search-line w-16 h-16 flex items-center justify-center mx-auto mb-6 text-gray-300"></i>
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Haber Bulunamadı</h1>
            <p className="text-gray-600 mb-8">Aradığınız haber mevcut değil veya kaldırılmış olabilir.</p>
            <Link 
              href="/basinda-biz"
              className="bg-[#1B365D] text-white px-6 py-3 rounded-lg hover:bg-[#2C5F7D] cursor-pointer inline-block"
            >
              Tüm Haberler
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const getCategoryName = (category) => {
    const categories = {
      'makroekonomi': 'Makro Ekonomi',
      'parapolisi': 'Para Politisi',
      'disticaret': 'Dış Ticaret',
      'calisma': 'Çalışma Hayatı',
      'finans': 'Finans',
      'enerji': 'Enerji',
      'tarim': 'Tarım'
    };
    return categories[category] || category;
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      {/* Breadcrumb */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <nav className="flex items-center text-sm text-gray-500">
            <Link href="/" className="hover:text-gray-700 cursor-pointer">Ana Sayfa</Link>
            <i className="ri-arrow-right-s-line w-4 h-4 flex items-center justify-center mx-2"></i>
            <Link href="/basinda-biz" className="hover:text-gray-700 cursor-pointer">Ekonomi Haberleri</Link>
            <i className="ri-arrow-right-s-line w-4 h-4 flex items-center justify-center mx-2"></i>
            <span className="text-gray-900">{getCategoryName(haber.category)}</span>
          </nav>
        </div>
      </div>

      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Article Header */}
        <header className="mb-8">
          <div className="flex items-center mb-4">
            <span className="bg-[#1B365D] text-white px-3 py-1 rounded-full text-sm font-medium mr-4">
              {getCategoryName(haber.category)}
            </span>
            {haber.featured && (
              <span className="bg-red-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                ÖZEL HABER
              </span>
            )}
          </div>
          
          <h1 className="text-4xl font-bold text-gray-900 mb-6 leading-tight">
            {haber.title}
          </h1>
          
          <div className="flex items-center justify-between text-gray-600 mb-6">
            <div className="flex items-center">
              <div className="w-10 h-10 bg-[#1B365D] rounded-full flex items-center justify-center mr-3">
                <i className="ri-user-line w-5 h-5 flex items-center justify-center text-white"></i>
              </div>
              <div>
                <div className="font-medium text-gray-900">{haber.author || 'Ekonomi Editörü'}</div>
                <div className="text-sm">{haber.source}</div>
              </div>
            </div>
            
            <div className="text-right">
              <div className="font-medium">{new Date(haber.date).toLocaleDateString('tr-TR', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}</div>
              <div className="text-sm">
                {new Date(haber.publishedAt).toLocaleTimeString('tr-TR', {
                  hour: '2-digit',
                  minute: '2-digit'
                })}
              </div>
            </div>
          </div>

          <p className="text-xl text-gray-700 leading-relaxed mb-8 font-medium">
            {haber.excerpt}
          </p>
        </header>

        {/* Article Image */}
        <div className="mb-8">
          <img
            src={haber.image}
            alt={haber.title}
            className="w-full h-64 md:h-96 object-cover object-top rounded-xl"
          />
        </div>

        {/* Article Content */}
        <div className="bg-white rounded-xl p-8 shadow-sm mb-12">
          <div className="prose prose-lg prose-gray max-w-none">
            {haber.content.split('\n').map((paragraph, index) => (
              <p key={index} className="mb-6 text-gray-800 leading-relaxed">
                {paragraph}
              </p>
            ))}
          </div>
          
          {/* Share & Actions */}
          <div className="border-t border-gray-200 pt-8 mt-8">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <span className="text-gray-700 font-medium">Paylaş:</span>
                <button className="flex items-center px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm cursor-pointer">
                  <i className="ri-facebook-fill w-4 h-4 flex items-center justify-center mr-2"></i>
                  Facebook
                </button>
                <button className="flex items-center px-3 py-2 bg-sky-500 text-white rounded-lg hover:bg-sky-600 text-sm cursor-pointer">
                  <i className="ri-twitter-fill w-4 h-4 flex items-center justify-center mr-2"></i>
                  Twitter
                </button>
                <button className="flex items-center px-3 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 text-sm cursor-pointer">
                  <i className="ri-whatsapp-fill w-4 h-4 flex items-center justify-center mr-2"></i>
                  WhatsApp
                </button>
              </div>
              
              <div className="flex items-center space-x-2">
                <button className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 cursor-pointer">
                  <i className="ri-bookmark-line w-5 h-5 flex items-center justify-center text-gray-600"></i>
                </button>
                <button className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 cursor-pointer">
                  <i className="ri-printer-line w-5 h-5 flex items-center justify-center text-gray-600"></i>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Similar News */}
        {benzerHaberler.length > 0 && (
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Benzer Haberler</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {benzerHaberler.map((item) => (
                <Link
                  key={item.id}
                  href={`/ekonomi-haberleri/${item.id}`}
                  className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
                >
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-40 object-cover object-top"
                  />
                  <div className="p-4">
                    <div className="text-xs text-[#1B365D] font-medium mb-2">
                      {getCategoryName(item.category)}
                    </div>
                    <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">
                      {item.title}
                    </h3>
                    <p className="text-gray-600 text-sm line-clamp-2">
                      {item.excerpt}
                    </p>
                    <div className="flex items-center justify-between mt-3 text-xs text-gray-500">
                      <span>{item.source}</span>
                      <span>{new Date(item.date).toLocaleDateString('tr-TR')}</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* Back to News */}
        <div className="text-center">
          <Link 
            href="/basinda-biz"
            className="bg-[#1B365D] text-white px-8 py-3 rounded-lg hover:bg-[#2C5F7D] cursor-pointer inline-flex items-center"
          >
            <i className="ri-arrow-left-line w-4 h-4 flex items-center justify-center mr-2"></i>
            Tüm Haberlere Dön
          </Link>
        </div>
      </article>
    </div>
  );
}

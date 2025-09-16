
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { newsService } from '../../lib/newsService';

export default function BasindaBizPage() {
  const [selectedCategory, setSelectedCategory] = useState('tumu');
  const [newsItems, setNewsItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isUpdating, setIsUpdating] = useState(false);
  const [selectedNews, setSelectedNews] = useState(null);
  const [showNewsModal, setShowNewsModal] = useState(false);
  const [lastUpdateTime, setLastUpdateTime] = useState(new Date());
  const [nextUpdateTime, setNextUpdateTime] = useState(new Date());

  // Her saat başında AA.com.tr'den haber çekme
  const loadAANews = async (showLoading = false) => {
    if (showLoading) setIsUpdating(true);

    try {
      const realTimeNews = await newsService.getLatestNews();
      setNewsItems(realTimeNews);
      setLastUpdateTime(new Date());
      
      // Sonraki güncelleme zamanını hesapla
      const nextHour = new Date();
      nextHour.setHours(nextHour.getHours() + 1, 0, 0, 0);
      setNextUpdateTime(nextHour);

      console.log(`AA.com.tr'den ${realTimeNews.length} haber yüklendi`);
    } catch (error) {
      console.error('Haber yükleme hatası:', error);
    } finally {
      if (showLoading) setIsUpdating(false);
    }
  };

  // Sayfa yüklendiğinde
  useEffect(() => {
    // İlk yükleme
    loadAANews();
    setLoading(false);

    // Otomatik güncelleme sistemini başlat
    newsService.startAutoUpdate();

    // Sayfa görünürlüğü değiştiğinde güncelle
    const handleVisibilityChange = () => {
      if (!document.hidden) {
        loadAANews();
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      newsService.stopAutoUpdate();
    };
  }, []);

  // Manuel güncelleme
  const handleManualUpdate = async () => {
    await loadAANews(true);
  };

  const categories = [
    { id: 'tumu', name: 'Tümü' },
    { id: 'makroekonomi', name: 'Makro Ekonomi' },
    { id: 'parapolisi', name: 'Para Politisi' },
    { id: 'disticaret', name: 'Dış Ticaret' },
    { id: 'calisma', name: 'Çalışma Hayatı' },
    { id: 'finans', name: 'Finans' },
    { id: 'enerji', name: 'Enerji' },
    { id: 'tarim', name: 'Tarım' }
  ];

  const filteredNews = selectedCategory === 'tumu'
    ? newsItems
    : newsItems.filter(item => item.category === selectedCategory);

  // Haber detayını göster
  const showNewsDetail = (news) => {
    setSelectedNews(news);
    setShowNewsModal(true);
  };

  // Modal kapat
  const closeNewsModal = () => {
    setShowNewsModal(false);
    setSelectedNews(null);
  };

  // Ekonomik etki göstergesi
  const getEconomicImpactBadge = (impact) => {
    switch (impact) {
      case 'pozitif':
        return 'bg-green-100 text-green-800';
      case 'negatif':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getEconomicImpactIcon = (impact) => {
    switch (impact) {
      case 'pozitif':
        return 'ri-arrow-up-line';
      case 'negatif':
        return 'ri-arrow-down-line';
      default:
        return 'ri-subtract-line';
    }
  };

  // Sonraki güncellemeye kalan süre
  const getTimeUntilNextUpdate = () => {
    const now = new Date();
    const diff = nextUpdateTime.getTime() - now.getTime();
    const minutes = Math.floor(diff / 60000);
    const seconds = Math.floor((diff % 60000) / 1000);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 pt-16 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-2 border-[#1B365D] border-t-transparent mx-auto mb-4"></div>
          <p className="text-gray-600">AA.com.tr'den haberler yükleniyor...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      {/* Live Update Banner */}
      <div className="bg-gradient-to-r from-red-600 to-red-700 text-white p-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="flex items-center">
                <div className="w-3 h-3 bg-red-300 rounded-full mr-3 animate-pulse"></div>
                <span className="bg-white text-red-600 px-3 py-1 rounded-full text-sm font-bold mr-4">
                  CANLI
                </span>
              </div>
              <div className="text-sm">
                <span className="font-semibold">AA.com.tr Otomatik Güncelleme</span>
                <span className="mx-2">•</span>
                <span>Her saat başında yeni haberler</span>
                <span className="mx-2">•</span>
                <span>Son güncelleme: {lastUpdateTime.toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' })}</span>
              </div>
            </div>
            <div className="text-sm">
              <span>Sonraki güncelleme: {getTimeUntilNextUpdate()}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <div className="bg-gradient-to-r from-[#1B365D] to-[#2C5F7D] text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">Basında Biz</h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto mb-6">
              AA.com.tr ekonomi sayfasından her saat başında otomatik olarak güncellenen son dakika haberleri
            </p>
            <div className="flex items-center justify-center gap-6 text-sm">
              <div className="flex items-center">
                <div className="bg-green-500 w-2 h-2 rounded-full mr-2 animate-pulse"></div>
                <span>Otomatik Güncelleme Aktif</span>
              </div>
              <div className="flex items-center">
                <i className="ri-newspaper-line w-4 h-4 flex items-center justify-center mr-2"></i>
                <span>{newsItems.length} Aktif Haber</span>
              </div>
              <div className="flex items-center">
                <i className="ri-time-line w-4 h-4 flex items-center justify-center mr-2"></i>
                <span>Saatlik Güncelleme</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">

        {/* Control Panel */}
        <div className="bg-white rounded-xl p-6 shadow-sm mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-xl font-bold text-gray-900">AA.com.tr Otomatik Haber Sistemi</h2>
              <p className="text-gray-600">Her saat başında otomatik güncelleme • Yeni haberler üstte • Eski haberler korunuyor</p>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={handleManualUpdate}
                disabled={isUpdating}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 text-sm cursor-pointer flex items-center disabled:opacity-50 whitespace-nowrap"
              >
                {isUpdating ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent mr-2"></div>
                    Güncelleniyor...
                  </>
                ) : (
                  <>
                    <i className="ri-refresh-line w-4 h-4 flex items-center justify-center mr-2"></i>
                    Manuel Güncelle
                  </>
                )}
              </button>
            </div>
          </div>

          {/* System Status */}
          <div className="bg-green-50 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="w-2 h-2 bg-green-500 rounded-full mr-3 animate-pulse"></div>
                <span className="font-medium text-green-900">AA.com.tr Bağlantısı Aktif</span>
              </div>
              <div className="text-sm text-green-700">
                <span>Toplam: {newsItems.length} haber</span>
                <span className="mx-2">•</span>
                <span>Sonraki güncelleme: {nextUpdateTime.toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' })}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Category Filters */}
        <div className="mb-8">
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap cursor-pointer transition-colors ${
                  selectedCategory === category.id
                    ? 'bg-[#1B365D] text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
                }`}
              >
                {category.name}
                {selectedCategory === category.id && (
                  <span className="ml-2 bg-white/20 text-white px-2 py-0.5 rounded-full text-xs">
                    {selectedCategory === 'tumu' ? newsItems.length : newsItems.filter(item => item.category === category.id).length}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* News Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredNews.map((news) => (
            <div key={news.id} className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-lg transition-shadow">
              <div className="relative">
                <img
                  src={news.image}
                  alt={news.title}
                  className="w-full h-48 object-cover object-top"
                />
                <div className="absolute top-4 left-4 flex items-center gap-2">
                  <span className="bg-red-600 text-white px-2 py-1 rounded-full text-xs font-bold">
                    AA
                  </span>
                  {news.economicImpact && (
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getEconomicImpactBadge(news.economicImpact.impact)}`}>
                      <i className={`${getEconomicImpactIcon(news.economicImpact.impact)} w-3 h-3 flex items-center justify-center mr-1`}></i>
                      {news.economicImpact.impact.toUpperCase()}
                    </span>
                  )}
                </div>
              </div>

              <div className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs text-[#1B365D] font-medium">
                    {categories.find(c => c.id === news.category)?.name}
                  </span>
                  <span className="text-xs text-gray-500">
                    {new Date(news.publishedAt).toLocaleString('tr-TR', { 
                      day: '2-digit',
                      month: '2-digit',
                      hour: '2-digit', 
                      minute: '2-digit' 
                    })}
                  </span>
                </div>

                <h3 className="text-lg font-semibold text-gray-900 mb-3 line-clamp-2 cursor-pointer hover:text-[#1B365D]"
                    onClick={() => showNewsDetail(news)}>
                  {news.title}
                </h3>

                <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                  {news.excerpt}
                </p>

                <div className="flex items-center justify-between">
                  <div className="flex items-center text-xs text-gray-500">
                    <span className="mr-2">{news.source}</span>
                    <span>•</span>
                    <span className="ml-2">{news.author}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => showNewsDetail(news)}
                      className="text-[#1B365D] hover:text-[#D4AF37] font-medium text-sm cursor-pointer"
                    >
                      Detay
                    </button>
                    {news.originalUrl && (
                      <a
                        href={news.originalUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-400 hover:text-gray-600 cursor-pointer"
                      >
                        <i className="ri-external-link-line w-4 h-4 flex items-center justify-center"></i>
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredNews.length === 0 && (
          <div className="text-center py-16">
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-8">
              <i className="ri-newspaper-line w-16 h-16 flex items-center justify-center mx-auto mb-4 text-yellow-600"></i>
              <h3 className="text-xl font-semibold text-yellow-800 mb-2">Bu Kategoride Haber Yok</h3>
              <p className="text-yellow-700 mb-4">
                Seçilen kategoride henüz haber bulunmuyor. Sistem her saat başında otomatik güncellenmektedir.
              </p>
              <button
                onClick={() => setSelectedCategory('tumu')}
                className="bg-yellow-600 text-white px-6 py-2 rounded-lg hover:bg-yellow-700 cursor-pointer whitespace-nowrap"
              >
                Tüm Haberleri Gör
              </button>
            </div>
          </div>
        )}

        {/* News Detail Modal */}
        {showNewsModal && selectedNews && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
              <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
                <div className="flex items-center">
                  <span className="bg-red-600 text-white px-3 py-1 rounded-full text-sm font-bold mr-3">
                    AA
                  </span>
                  <span className="text-gray-600 text-sm">
                    {new Date(selectedNews.publishedAt).toLocaleString('tr-TR')}
                  </span>
                </div>
                <button
                  onClick={closeNewsModal}
                  className="text-gray-400 hover:text-gray-600 cursor-pointer"
                >
                  <i className="ri-close-line w-6 h-6 flex items-center justify-center"></i>
                </button>
              </div>

              <div className="p-6">
                <div className="mb-6">
                  <h1 className="text-3xl font-bold mb-4">{selectedNews.title}</h1>

                  <div className="flex items-center gap-4 mb-4">
                    <span className="bg-[#1B365D] text-white px-3 py-1 rounded-full text-sm font-medium">
                      {categories.find(c => c.id === selectedNews.category)?.name}
                    </span>
                    {selectedNews.economicImpact && (
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${getEconomicImpactBadge(selectedNews.economicImpact.impact)}`}>
                        <i className={`${getEconomicImpactIcon(selectedNews.economicImpact.impact)} w-4 h-4 flex items-center justify-center mr-1`}></i>
                        Ekonomik Etki: {selectedNews.economicImpact.impact}
                      </span>
                    )}
                  </div>
                </div>

                <div className="mb-6">
                  <img
                    src={selectedNews.image}
                    alt={selectedNews.title}
                    className="w-full h-64 md:h-80 object-cover object-top rounded-lg"
                  />
                </div>

                <div className="prose prose-lg prose-gray max-w-none mb-8">
                  {selectedNews.content.split('\\n').map((paragraph, index) => (
                    <p key={index} className="mb-4 text-gray-800 leading-relaxed">
                      {paragraph}
                    </p>
                  ))}
                </div>

                <div className="border-t border-gray-200 pt-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className="text-gray-700 font-medium">{selectedNews.source}</span>
                      <span className="text-gray-500 text-sm">{selectedNews.author}</span>
                    </div>
                    {selectedNews.originalUrl && (
                      <a
                        href={selectedNews.originalUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-[#1B365D] text-white px-4 py-2 rounded-lg hover:bg-[#2C5F7D] text-sm cursor-pointer whitespace-nowrap"
                      >
                        AA.com.tr'de Oku
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Admin Panel Link */}
        <div className="mt-16 text-center">
          <Link
            href="/admin/haberler"
            className="bg-[#D4AF37] text-white px-8 py-3 rounded-lg hover:bg-yellow-600 font-medium cursor-pointer inline-flex items-center whitespace-nowrap"
          >
            <i className="ri-admin-line w-5 h-5 flex items-center justify-center mr-2"></i>
            Haber Yönetimi
          </Link>
        </div>
      </div>
    </div>
  );
}

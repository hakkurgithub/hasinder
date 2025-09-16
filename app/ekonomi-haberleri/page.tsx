
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { newsService } from '../../lib/newsService';

export default function EkonomiHaberleriPage() {
  const [selectedCategory, setSelectedCategory] = useState('tumu');
  const [newsItems, setNewsItems] = useState([]);
  const [analyzedHeadlines, setAnalyzedHeadlines] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isUpdating, setIsUpdating] = useState(false);
  const [selectedNews, setSelectedNews] = useState(null);
  const [showNewsModal, setShowNewsModal] = useState(false);
  const [showAnalysisModal, setShowAnalysisModal] = useState(false);
  const [lastUpdateTime, setLastUpdateTime] = useState(new Date());
  const [autoUpdateEnabled, setAutoUpdateEnabled] = useState(true);

  // Gerçek zamanlı haber yükleme
  const loadRealTimeNews = async (showLoading = false) => {
    if (showLoading) setIsUpdating(true);

    try {
      const realTimeNews = await newsService.getLatestNews();
      setNewsItems(realTimeNews);
      setLastUpdateTime(new Date());

      // Analiz sistemini çalıştır
      const analysis = analyzeHeadlines(realTimeNews);
      setAnalyzedHeadlines(analysis);

      console.log(`${realTimeNews.length} güncel haber yüklendi`);
    } catch (error) {
      console.error('Haber yükleme hatası:', error);
    } finally {
      if (showLoading) setIsUpdating(false);
    }
  };

  // Haber başlık analiz algoritması
  const analyzeHeadlines = (newsData) => {
    const analysis = {
      totalNews: newsData.length,
      categoryCounts: {},
      economicImpacts: { positive: 0, negative: 0, neutral: 0 },
      sourceCounts: {},
      recentNews: 0,
      topKeywords: [],
      summary: '',
      lastUpdate: new Date().toISOString()
    };

    newsData.forEach(news => {
      // Kategori analizi
      analysis.categoryCounts[news.category] = (analysis.categoryCounts[news.category] || 0) + 1;

      // Kaynak analizi
      analysis.sourceCounts[news.source] = (analysis.sourceCounts[news.source] || 0) + 1;

      // Ekonomik etki analizi
      if (news.economicImpact) {
        analysis.economicImpacts[news.economicImpact.impact] = (analysis.economicImpacts[news.economicImpact.impact] || 0) + 1;
      }

      // Son 1 saat içindeki haberler
      const newsTime = new Date(news.publishedAt);
      const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000);
      if (newsTime > oneHourAgo) {
        analysis.recentNews++;
      }
    });

    // Özet oluştur
    const dominantCategory = Object.entries(analysis.categoryCounts).sort(([,a], [,b]) => b - a)[0];
    const dominantSource = Object.entries(analysis.sourceCounts).sort(([,a], [,b]) => b - a)[0];

    analysis.summary = `${analysis.totalNews} ekonomi haberi analiz edildi. En aktif kategori: ${dominantCategory?.[0] || 'Yok'} (${dominantCategory?.[1] || 0} haber). 
    Kaynak dağılımı: ${Object.entries(analysis.sourceCounts).map(([k,v]) => `${k}: ${v}`).join(', ')}. 
    Son 1 saat içinde ${analysis.recentNews} yeni haber. 
    Ekonomik etki: ${analysis.economicImpacts.positive} pozitif, ${analysis.economicImpacts.negative} negatif, ${analysis.economicImpacts.neutral} nötr.`;

    return analysis;
  };

  // Component yüklendiğinde
  useEffect(() => {
    // İlk yükleme
    loadRealTimeNews();
    setLoading(false);

    // Otomatik güncelleme sistemini başlat
    if (autoUpdateEnabled) {
      newsService.startAutoUpdate();
    }

    // Her 30 saniyede bir kontrol et
    const interval = setInterval(() => {
      if (autoUpdateEnabled) {
        loadRealTimeNews();
      }
    }, 30000);

    // Sayfa görünürlüğü değiştiğinde güncelle
    const handleVisibilityChange = () => {
      if (!document.hidden && autoUpdateEnabled) {
        loadRealTimeNews();
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      clearInterval(interval);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [autoUpdateEnabled]);

  // Manuel güncelleme
  const handleManualUpdate = async () => {
    setIsUpdating(true);
    try {
      // Force fetch new data regardless of time interval
      newsService.lastFetchTime = 0; // Reset to force immediate fetch
      await loadRealTimeNews(false);
      
      // Show success feedback
      const successMessage = document.createElement('div');
      successMessage.className = 'fixed top-20 right-4 bg-green-600 text-white px-6 py-3 rounded-lg shadow-lg z-50 flex items-center';
      successMessage.innerHTML = `
        <i class="ri-check-line w-5 h-5 mr-2"></i>
        Haberler başarıyla güncellendi!
      `;
      document.body.appendChild(successMessage);
      
      setTimeout(() => {
        document.body.removeChild(successMessage);
      }, 3000);
      
    } catch (error) {
      console.error('Manuel güncelleme hatası:', error);
      
      // Show error feedback
      const errorMessage = document.createElement('div');
      errorMessage.className = 'fixed top-20 right-4 bg-red-600 text-white px-6 py-3 rounded-lg shadow-lg z-50 flex items-center';
      errorMessage.innerHTML = `
        <i class="ri-error-warning-line w-5 h-5 mr-2"></i>
        Güncelleme sırasında hata oluştu!
      `;
      document.body.appendChild(errorMessage);
      
      setTimeout(() => {
        document.body.removeChild(errorMessage);
      }, 3000);
    } finally {
      setIsUpdating(false);
    }
  };

  // Otomatik güncelleme toggle
  const toggleAutoUpdate = () => {
    setAutoUpdateEnabled(!autoUpdateEnabled);
    if (!autoUpdateEnabled) {
      newsService.startAutoUpdate();
    } else {
      newsService.stopAutoUpdate();
    }
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

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 pt-16 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-2 border-[#1B365D] border-t-transparent mx-auto mb-4"></div>
          <p className="text-gray-600">Gerçek zamanlı haberler yükleniyor...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      {/* Live News Ticker */}
      <div className="bg-red-600 text-white p-3 overflow-hidden">
        <div className="flex items-center">
          <span className="bg-white text-red-600 px-3 py-1 rounded text-lg font-bold mr-4 whitespace-nowrap">
            CANLI YAYIN
          </span>
          <div className="flex items-center">
            <div className="w-2 h-2 bg-red-300 rounded-full mr-2 animate-pulse"></div>
            <span className="text-lg">
              {newsItems.length} güncel haber • Son güncelleme: {lastUpdateTime.toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' })} • 
              {autoUpdateEnabled ? ' Otomatik güncelleme açık' : ' Otomatik güncelleme kapalı'}
            </span>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <div className="bg-gradient-to-r from-[#1B365D] to-[#2C5F7D] text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">Gerçek Zamanlı Ekonomi Haberleri</h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto mb-6">
              AA, BusinessWeek ve BloombergHT kaynaklarından her 5 dakikada güncellenen son dakika haberleri
            </p>
            <div className="flex items-center justify-center gap-4">
              <div className="bg-green-500 w-3 h-3 rounded-full animate-pulse"></div>
              <span className="text-green-200 text-sm">Canlı • {newsItems.length} Aktif Haber</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">

        {/* Real-time Control Panel */}
        <div className="bg-white rounded-xl p-6 shadow-sm mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-xl font-bold text-gray-900">Gerçek Zamanlı Haber Sistemi</h2>
              <p className="text-gray-600">3 kaynak • 5 dakikada bir güncelleme • Otomatik analiz</p>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={toggleAutoUpdate}
                className={`px-4 py-2 rounded-lg text-sm font-medium cursor-pointer transition-colors ${
                  autoUpdateEnabled
                    ? 'bg-green-100 text-green-700 hover:bg-green-200'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <i className={`${autoUpdateEnabled ? 'ri-pause-circle-line' : 'ri-play-circle-line'} w-4 h-4 flex items-center justify-center mr-2`}></i>
                {autoUpdateEnabled ? 'Otomatik Güncelleme Açık' : 'Otomatik Güncelleme Kapalı'}
              </button>
              <button
                onClick={handleManualUpdate}
                disabled={isUpdating}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50 text-sm font-medium transition-colors cursor-pointer whitespace-nowrap"
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

          {/* Source Status */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-green-50 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="font-medium text-green-900">Anadolu Ajansı</span>
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              </div>
              <div className="text-sm text-green-700">
                {newsItems.filter(n => n.source === 'Anadolu Ajansı').length} haber aktif
              </div>
            </div>
            <div className="bg-blue-50 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="font-medium text-blue-900">BusinessWeek</span>
                <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
              </div>
              <div className="text-sm text-blue-700">
                {newsItems.filter(n => n.source === 'BusinessWeek Türkiye').length} haber aktif
              </div>
            </div>
            <div className="bg-purple-50 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="font-medium text-purple-900">BloombergHT</span>
                <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse"></div>
              </div>
              <div className="text-sm text-purple-700">
                {newsItems.filter(n => n.source === 'BloombergHT').length} haber aktif
              </div>
            </div>
          </div>
        </div>

        {/* Analysis Panel */}
        <div className="bg-gradient-to-r from-green-600 to-blue-600 text-white rounded-xl p-8 mb-8 text-center">
          <div className="flex items-center justify-center mb-4">
            <i className="ri-line-chart-line w-8 h-8 flex items-center justify-center mr-3"></i>
            <h2 className="text-3xl font-bold">GERÇEK ZAMANLI ANALİZ</h2>
          </div>
          <div className="text-2xl font-bold mb-2">
            {analyzedHeadlines.totalNews} HABER ANALİZ EDİLDİ
          </div>
          <div className="text-lg opacity-90 mb-4">
            3 kaynak • Her 5 dakikada güncellenen ekonomik etki analizi
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-6">
            <div className="bg-white/20 rounded-lg p-4">
              <div className="text-2xl font-bold text-green-300">{analyzedHeadlines.economicImpacts?.positive || 0}</div>
              <div className="text-sm">Pozitif Etki</div>
            </div>
            <div className="bg-white/20 rounded-lg p-4">
              <div className="text-2xl font-bold text-red-300">{analyzedHeadlines.economicImpacts?.negative || 0}</div>
              <div className="text-sm">Negatif Etki</div>
            </div>
            <div className="bg-white/20 rounded-lg p-4">
              <div className="text-2xl font-bold text-yellow-300">{analyzedHeadlines.recentNews || 0}</div>
              <div className="text-sm">Son 1 Saat</div>
            </div>
            <div className="bg-white/20 rounded-lg p-4">
              <div className="text-2xl font-bold">{Object.keys(analyzedHeadlines.categoryCounts || {}).length}</div>
              <div className="text-sm">Kategori</div>
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
              </button>
            ))}
          </div>
        </div>

        {/* Real-time News Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredNews.map((news) => (
            <div key={news.id} className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-lg transition-shadow">
              <div className="relative">
                <img
                  src={news.image}
                  alt={news.title}
                  className="w-full h-48 md:h-80 object-cover object-top"
                />
                <div className="absolute top-4 left-4 flex items-center gap-2">
                  <span className="bg-red-600 text-white px-2 py-1 rounded text-xs font-medium">
                    CANLI
                  </span>
                  {news.economicImpact && (
                    <span className={`px-2 py-1 rounded text-xs font-medium ${getEconomicImpactBadge(news.economicImpact.impact)}`}>
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
                    {new Date(news.publishedAt).toLocaleTimeString('tr-TR', { 
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

                {news.economicImpact && (
                  <div className="bg-gray-50 rounded-lg p-3 mb-4">
                    <div className="text-xs text-gray-500 mb-1">Ekonomik Etki:</div>
                    <div className="text-sm text-gray-700">{news.economicImpact.explanation}</div>
                  </div>
                )}

                <div className="flex items-center justify-between">
                  <div className="flex items-center text-xs text-gray-500">
                    <span className="mr-2">{news.source}</span>
                    <span>•</span>
                    <span className="ml-2">{news.author}</span>
                  </div>
                  <button
                    onClick={() => showNewsDetail(news)}
                    className="text-[#1B365D] hover:text-[#D4AF37] font-medium text-sm cursor-pointer"
                  >
                    Detay
                  </button>
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
                Seçilen kategoride henüz haber bulunmuyor. Sistem her 5 dakikada güncellenmektedir.
              </p>
              <Link
                href="/ekonomi-haberleri"
                className="bg-yellow-600 text-white px-6 py-2 rounded-lg hover:bg-yellow-700 cursor-pointer whitespace-nowrap"
              >
                Tüm Haberleri Gör
              </Link>
            </div>
          </div>
        )}

        {/* News Detail Modal */}
        {showNewsModal && selectedNews && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
              <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
                <div className="flex items-center">
                  <span className="bg-red-600 text-white px-3 py-1 rounded-full text-sm font-medium mr-3">
                    CANLI HABER
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
                        className="bg-[#1B365D] text-white px-4 py-2 rounded-lg hover:bg-[#2C5F7D] text-sm cursor-pointer"
                      >
                        Orijinal Haberi Gör
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
            className="bg-[#D4AF37] text-white px-8 py-3 rounded-lg hover:bg-yellow-600 font-medium cursor-pointer inline-flex items-center"
          >
            <i className="ri-admin-line w-5 h-5 flex items-center justify-center mr-2"></i>
            Admin Paneli
          </Link>
        </div>
      </div>
    </div>
  );
}
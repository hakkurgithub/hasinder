
'use client';

// AA.com.tr Haber Çekme Servisi
export class NewsService {
  constructor() {
    this.sources = {
      aa: 'https://www.aa.com.tr/tr/ekonomi'
    };

    this.categories = {
      'makroekonomi': ['büyüme', 'gsyh', 'enflasyon', 'makro', 'ekonomi', 'üretim', 'kalkınma'],
      'parapolisi': ['faiz', 'merkez-bankasi', 'tcmb', 'para-politikasi', 'politika', 'döviz'],
      'disticaret': ['ihracat', 'ithalat', 'dis-ticaret', 'export', 'ticaret', 'gümrük'],
      'calisma': ['asgari-ucret', 'istihdam', 'calisma', 'isci', 'çalışma', 'emek'],
      'finans': ['borsa', 'dolar', 'euro', 'finans', 'piyasa', 'yatırım', 'bist'],
      'enerji': ['enerji', 'petrol', 'dogalgaz', 'elektrik', 'güneş', 'rüzgar'],
      'tarim': ['tarim', 'gida', 'hayvancilik', 'ziraat', 'tarım', 'çiftçi']
    };

    this.economicImpactKeywords = {
      positive: ['arttı', 'yükseldi', 'büyüdü', 'gelişti', 'iyileşti', 'rekor', 'başarı', 'kazanç'],
      negative: ['düştü', 'azaldı', 'geriledi', 'kriz', 'sorun', 'risk', 'zarar', 'düşüş'],
      neutral: ['kararlı', 'sabit', 'beklemede', 'değişmedi', 'sürdü', 'devam']
    };

    this.lastFetchTime = 0;
    this.fetchInterval = 60 * 60 * 1000; // 1 saat
    this.duplicateFilter = new Set();
    this.isAutoUpdateRunning = false;
    this.allNewsStorage = [];
    this.autoUpdateInterval = null;
  }

  // AA.com.tr sitesinden haber çekme
  async fetchAANews() {
    try {
      console.log('AA.com.tr sitesinden haberler çekiliyor...');
      
      // CORS proxy kullanarak AA sitesini çek
      const proxyUrl = 'https://api.allorigins.win/get?url=';
      const targetUrl = encodeURIComponent('https://www.aa.com.tr/tr/ekonomi');
      
      const response = await fetch(proxyUrl + targetUrl);
      const data = await response.json();
      
      if (data.contents) {
        const htmlContent = data.contents;
        return this.parseAAContent(htmlContent);
      }
      
      // Proxy başarısız olursa mock data döndür
      return this.getMockAANews();
      
    } catch (error) {
      console.error('AA haber çekme hatası:', error);
      return this.getMockAANews();
    }
  }

  // AA.com.tr HTML içeriğini parse et
  parseAAContent(htmlContent) {
    try {
      // HTML parser oluştur
      const parser = new DOMParser();
      const doc = parser.parseFromString(htmlContent, 'text/html');
      
      // Haber elementlerini bul
      const newsElements = doc.querySelectorAll('.news-card, .story-card, .media-card, article');
      const parsedNews = [];
      
      newsElements.forEach((element, index) => {
        try {
          // Başlık
          const titleElement = element.querySelector('h3, h2, .title, .headline');
          const title = titleElement ? titleElement.textContent.trim() : '';
          
          // Link
          const linkElement = element.querySelector('a');
          const link = linkElement ? linkElement.href : '';
          
          // Tarih
          const dateElement = element.querySelector('.date, .time, time');
          const dateText = dateElement ? dateElement.textContent.trim() : '';
          
          // Özet
          const summaryElement = element.querySelector('.summary, .description, p');
          const summary = summaryElement ? summaryElement.textContent.trim() : '';
          
          if (title && title.length > 10) {
            const newsItem = {
              id: Date.now() + index,
              title: title,
              excerpt: this.generateExcerpt(title, summary),
              content: this.generateDetailedContent(title, summary),
              category: this.determineCategory(title),
              source: 'Anadolu Ajansı',
              author: 'AA Ekonomi Editörü',
              publishedAt: this.parseAADate(dateText),
              originalUrl: link.startsWith('http') ? link : `https://www.aa.com.tr${link}`,
              hash: this.generateNewsHash(title, 'Anadolu Ajansı'),
              economicImpact: this.analyzeEconomicImpact(title, summary),
              image: this.generateImageUrl(title, this.determineCategory(title)),
              featured: false
            };
            
            parsedNews.push(newsItem);
          }
        } catch (error) {
          console.warn('Haber parse hatası:', error);
        }
      });
      
      console.log(`AA.com.tr'den ${parsedNews.length} haber parse edildi`);
      return parsedNews.slice(0, 20); // En fazla 20 haber
      
    } catch (error) {
      console.error('HTML parse hatası:', error);
      return this.getMockAANews();
    }
  }

  // AA tarih formatını parse et
  parseAADate(dateText) {
    try {
      if (!dateText) return new Date().toISOString();
      
      const now = new Date();
      
      // "X dakika önce" formatı
      if (dateText.includes('dakika önce')) {
        const minutes = parseInt(dateText.match(/\d+/)[0]);
        now.setMinutes(now.getMinutes() - minutes);
        return now.toISOString();
      }
      
      // "X saat önce" formatı
      if (dateText.includes('saat önce')) {
        const hours = parseInt(dateText.match(/\d+/)[0]);
        now.setHours(now.getHours() - hours);
        return now.toISOString();
      }
      
      // "Bugün XX:XX" formatı
      if (dateText.includes('bugün') || dateText.includes('Bugün')) {
        const timeMatch = dateText.match(/(\d{1,2}):(\d{2})/);
        if (timeMatch) {
          now.setHours(parseInt(timeMatch[1]), parseInt(timeMatch[2]), 0, 0);
          return now.toISOString();
        }
      }
      
      // Diğer tarih formatları
      const parsed = new Date(dateText);
      if (!isNaN(parsed.getTime())) {
        return parsed.toISOString();
      }
      
      return new Date().toISOString();
      
    } catch (error) {
      return new Date().toISOString();
    }
  }

  // Özet oluştur
  generateExcerpt(title, summary) {
    if (summary && summary.length > 20) {
      // Özeti 2 cümleye kısalt
      const sentences = summary.split(/[.!?]+/).filter(s => s.trim().length > 0);
      const shortSummary = sentences.slice(0, 2).join('. ');
      return shortSummary.length > 10 ? shortSummary + '.' : this.getDefaultExcerpt(title);
    }
    
    return this.getDefaultExcerpt(title);
  }

  // Varsayılan özet
  getDefaultExcerpt(title) {
    const templates = [
      `${title} konusunda son dakika gelişmeleri yaşanıyor. Ekonomi çevrelerinden gelen bilgilere göre detaylar netleşmeye devam ediyor.`,
      `${title} ile ilgili önemli açıklamalar yapıldı. Piyasa katılımcıları gelişmeleri yakından takip ediyor.`,
      `${title} hakkında uzmanlardan değerlendirmeler geliyor. Sektör temsilcileri konuyu analiz ediyor.`,
      `${title} konusunda resmi açıklama yapıldı. İlgili kurumlar durumu değerlendirmeye aldı.`
    ];
    
    return templates[Math.floor(Math.random() * templates.length)];
  }

  // Otomatik güncelleme sistemini başlat
  startAutoUpdate() {
    if (this.isAutoUpdateRunning) return;

    this.isAutoUpdateRunning = true;
    console.log('AA.com.tr otomatik haber çekme sistemi başlatıldı (1 saat aralık)');

    // İlk çekme
    this.fetchAllNews();

    // Her saat başında güncelle
    this.autoUpdateInterval = setInterval(() => {
      console.log('Saatlik otomatik haber güncelleme çalışıyor...');
      this.fetchAllNews();
    }, this.fetchInterval);

    // Sayfa yenileme için event listener
    this.setupAutoRefresh();
  }

  // Otomatik sayfa yenileme
  setupAutoRefresh() {
    // Her saat başında sayfayı yenile
    const now = new Date();
    const nextHour = new Date(now.getFullYear(), now.getMonth(), now.getDate(), now.getHours() + 1, 0, 0);
    const timeToNextHour = nextHour.getTime() - now.getTime();

    setTimeout(() => {
      if (typeof window !== 'undefined' && window.location.pathname === '/basinda-biz') {
        console.log('Saatlik sayfa yenileme...');
        window.location.reload();
      }
      
      // Sonraki saatler için interval kur
      setInterval(() => {
        if (typeof window !== 'undefined' && window.location.pathname === '/basinda-biz') {
          console.log('Saatlik sayfa yenileme...');
          window.location.reload();
        }
      }, 60 * 60 * 1000); // 1 saat
      
    }, timeToNextHour);
  }

  // Otomatik güncelleme sistemini durdur
  stopAutoUpdate() {
    if (this.autoUpdateInterval) {
      clearInterval(this.autoUpdateInterval);
      this.autoUpdateInterval = null;
    }
    this.isAutoUpdateRunning = false;
    console.log('Otomatik haber güncelleme sistemi durduruldu');
  }

  // Ekonomik etki analizi
  analyzeEconomicImpact(title, content) {
    const text = (title + ' ' + content).toLowerCase();
    let impact = 'nötr';
    let explanation = '';

    // Pozitif etkiler
    if (this.economicImpactKeywords.positive.some(word => text.includes(word))) {
      if (text.includes('faiz') && text.includes('düştü')) {
        impact = 'pozitif';
        explanation = 'Faiz düşüşü yatırımları ve tüketimi artırabilir';
      } else if (text.includes('ihracat') && text.includes('arttı')) {
        impact = 'pozitif';
        explanation = 'İhracat artışı döviz gelirlerini artırır';
      } else if (text.includes('büyüme') || text.includes('gsyh')) {
        impact = 'pozitif';
        explanation = 'Ekonomik büyüme genel refah seviyesini artırır';
      } else if (text.includes('istihdam') && text.includes('arttı')) {
        impact = 'pozitif';
        explanation = 'İstihdam artışı iç talebi canlandırabilir';
      } else {
        impact = 'pozitif';
        explanation = 'Ekonomik göstergeler olumlu yönde gelişiyor';
      }
    }
    // Negatif etkiler
    else if (this.economicImpactKeywords.negative.some(word => text.includes(word))) {
      if (text.includes('enflasyon') && text.includes('arttı')) {
        impact = 'negatif';
        explanation = 'Enflasyon artışı satın alma gücünü olumsuz etkileyebilir';
      } else if (text.includes('faiz') && text.includes('arttı')) {
        impact = 'negatif';
        explanation = 'Faiz artışı yatırım maliyetlerini artırabilir';
      } else if (text.includes('ihracat') && text.includes('düştü')) {
        impact = 'negatif';
        explanation = 'İhracat düşüşü cari dengeyi olumsuz etkiler';
      } else if (text.includes('işsizlik') && text.includes('arttı')) {
        impact = 'negatif';
        explanation = 'İşsizlik artışı iç talebi azaltabilir';
      } else {
        impact = 'negatif';
        explanation = 'Ekonomik göstergeler olumsuz yönde gelişiyor';
      }
    }
    // Nötr etkiler
    else {
      impact = 'nötr';
      explanation = 'Ekonomik göstergeler dengeli bir seyir izliyor';
    }

    return { impact, explanation };
  }

  // Haber hash oluştur
  generateNewsHash(title, source) {
    return btoa(encodeURIComponent(title.toLowerCase().trim() + source)).replace(/[^a-zA-Z0-9]/g, '').substring(0, 16);
  }

  // Mevcut haberleri yükle
  loadAllStoredNews() {
    try {
      const stored = localStorage.getItem('allEkonomiHaberleri');
      if (stored) {
        this.allNewsStorage = JSON.parse(stored);
      }
      
      const adminNews = this.getAdminNews();
      if (adminNews.length > 0) {
        adminNews.forEach(adminHaber => {
          const existingIndex = this.allNewsStorage.findIndex(item => item.id === adminHaber.id);
          if (existingIndex === -1) {
            this.allNewsStorage.push(adminHaber);
          }
        });
      }
    } catch (error) {
      console.error('Haber yükleme hatası:', error);
      this.allNewsStorage = [];
    }
  }

  // Haberleri kaydet
  saveAllNews() {
    try {
      localStorage.setItem('allEkonomiHaberleri', JSON.stringify(this.allNewsStorage));
    } catch (error) {
      console.error('Haber kaydetme hatası:', error);
    }
  }

  // Yeni haberleri ekle
  addNewsToStorage(newNews) {
    if (!Array.isArray(newNews)) return;

    newNews.forEach(news => {
      const existingIndex = this.allNewsStorage.findIndex(item => 
        item.hash === news.hash || 
        (item.title === news.title && item.source === news.source)
      );

      if (existingIndex === -1) {
        this.allNewsStorage.unshift({
          ...news,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        });
      } else {
        this.allNewsStorage[existingIndex].updated_at = new Date().toISOString();
      }
    });

    // Tarih sırasına göre sırala (en yeni üstte)
    this.allNewsStorage.sort((a, b) => {
      const dateA = new Date(a.created_at || a.publishedAt);
      const dateB = new Date(b.created_at || b.publishedAt);
      return dateB.getTime() - dateA.getTime();
    });

    this.saveAllNews();
  }

  // Tüm haberleri getir
  async fetchAllNews() {
    const now = Date.now();
    
    try {
      console.log('AA.com.tr sitesinden haberler çekiliyor...');

      this.loadAllStoredNews();

      const newNews = await this.fetchAANews();
      
      if (newNews.length > 0) {
        console.log(`${newNews.length} yeni haber bulundu`);
        this.addNewsToStorage(newNews);
      }

      const displayNews = this.allNewsStorage.slice(0, 100);
      
      this.lastFetchTime = now;

      console.log(`Toplam ${this.allNewsStorage.length} haber, ${displayNews.length} haber görüntüleniyor`);
      return displayNews;

    } catch (error) {
      console.error('Haber çekme hatası:', error);
      return this.getStoredNews();
    }
  }

  // Kategori belirleme
  determineCategory(text) {
    const textLower = text.toLowerCase();

    for (const [category, keywords] of Object.entries(this.categories)) {
      if (keywords.some(keyword => textLower.includes(keyword))) {
        return category;
      }
    }

    return 'makroekonomi';
  }

  // Detaylı içerik oluştur
  generateDetailedContent(title, excerpt) {
    const economicAnalysis = this.analyzeEconomicImpact(title, excerpt);
    
    return `${excerpt}\n\n📊 **Ekonomik Etki Analizi:**\n${economicAnalysis.explanation}\n\nAnadolu Ajansı'ndan gelen son dakika bilgilere göre, ${title.toLowerCase()} konusunda önemli gelişmeler yaşanıyor. Ekonomi uzmanları bu durumun sektörel ve makroekonomik etkilerini analiz ediyor.\n\nPiyasa katılımcılarından gelen değerlendirmelere göre, bu gelişme hem yurt içi hem de uluslararası yatırımcılar tarafından dikkatle takip ediliyor.\n\n**Uzman Görüşleri:**\nSektör temsilcileri gelişmeleri genel olarak ${economicAnalysis.impact === 'pozitif' ? 'olumlu' : economicAnalysis.impact === 'negatif' ? 'dikkatli' : 'dengeli'} karşılarken, analistler durumun uzun vadeli ekonomik etkilerini değerlendirmeye devam ediyor.\n\nBu gelişmeler Türkiye ekonomisinin genel performansı açısından önemli bir gösterge niteliğinde ve uzmanlar tarafından sürekli olarak izleniyor.`;
  }

  // Görsel URL oluştur
  generateImageUrl(title, category) {
    const categoryDescriptions = {
      'makroekonomi': 'Turkish macroeconomic indicators and economic data visualization',
      'parapolisi': 'Turkish Central Bank TCMB monetary policy announcement',
      'disticaret': 'Turkish international trade and export statistics',
      'calisma': 'Turkish employment and labor market statistics',
      'finans': 'Turkish financial markets and Istanbul stock exchange',
      'enerji': 'Turkish energy sector and infrastructure development',
      'tarim': 'Turkish agriculture and farming industry'
    };

    const description = categoryDescriptions[category] || 'Turkish economic news';
    const prompt = `${description}, professional economic news photography, modern Turkish business environment, high quality realistic image, economic indicators, charts and graphs, clean background`;

    return `https://readdy.ai/api/search-image?query=$%7BencodeURIComponent%28prompt%29%7D&width=600&height=400&seq=aanews${Date.now()}&orientation=landscape`;
  }

  // Admin haberleri al
  getAdminNews() {
    try {
      const stored = localStorage.getItem('ekonomiHaberleri');
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  }

  // Kayıtlı haberleri al
  getStoredNews() {
    try {
      this.loadAllStoredNews();
      return this.allNewsStorage.slice(0, 50);
    } catch {
      return this.getMockAANews();
    }
  }

  // Mock AA haberleri
  getMockAANews() {
    const mockNews = [
      {
        id: Date.now() + 1,
        title: "TCMB Faiz Kararı Açıklandı: Politika Faizi %45 Seviyesinde Tutuldu",
        excerpt: "Merkez Bankası Para Politikası Kurulu toplantısında politika faizini %45 seviyesinde sabit tutma kararı aldı. Enflasyon verilerindeki gelişmeler yakından takip ediliyor.",
        category: 'parapolisi',
        source: 'Anadolu Ajansı',
        author: 'AA Ekonomi Editörü',
        publishedAt: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString(),
        hash: this.generateNewsHash("TCMB Faiz Kararı", 'Anadolu Ajansı'),
        originalUrl: 'https://www.aa.com.tr/tr/ekonomi/tcmb-faiz-karari'
      },
      {
        id: Date.now() + 2,
        title: "Türkiye İhracatı Mart Ayında %15.2 Artışla 22.1 Milyar Dolara Ulaştı",
        excerpt: "Türkiye İhracatçılar Meclisi verilerine göre mart ayı ihracatı geçen yılın aynı dönemine göre %15.2 artış gösterdi. Otomotiv sektörü öne çıkan alanlar arasında yer aldı.",
        category: 'disticaret',
        source: 'Anadolu Ajansı',
        author: 'AA Ekonomi Editörü',
        publishedAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
        hash: this.generateNewsHash("Türkiye İhracatı", 'Anadolu Ajansı'),
        originalUrl: 'https://www.aa.com.tr/tr/ekonomi/turkiye-ihracati'
      },
      {
        id: Date.now() + 3,
        title: "Sanayi Üretimi Şubat Ayında %12.4 Artış Kaydetti",
        excerpt: "TÜİK verilerine göre sanayi üretim endeksi şubat ayında geçen yılın aynı ayına göre %12.4 oranında arttı. İmalat sanayi alt sektörlerinde genelde pozitif performans gözlendi.",
        category: 'makroekonomi',
        source: 'Anadolu Ajansı',
        author: 'AA Ekonomi Editörü',
        publishedAt: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString(),
        hash: this.generateNewsHash("Sanayi Üretimi", 'Anadolu Ajansı'),
        originalUrl: 'https://www.aa.com.tr/tr/ekonomi/sanayi-uretimi'
      },
      {
        id: Date.now() + 4,
        title: "Borsa İstanbul Güne %3.2 Artışla 10.850 Seviyesinde Başladı",
        excerpt: "BIST 100 endeksi güne %3.2 artışla 10.850 seviyesinde başladı. Bankacılık endeksi %4.1 artışla öne çıkarken, teknoloji hisseleri de yükselişte.",
        category: 'finans',
        source: 'Anadolu Ajansı',
        author: 'AA Ekonomi Editörü',
        publishedAt: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(),
        hash: this.generateNewsHash("Borsa İstanbul", 'Anadolu Ajansı'),
        originalUrl: 'https://www.aa.com.tr/tr/ekonomi/borsa-istanbul'
      },
      {
        id: Date.now() + 5,
        title: "Dolar/TL Kuru 32.15 Seviyesinde Seyrediyor",
        excerpt: "Dolar/TL kuru günün ilk saatlerinde 32.15 seviyesinde seyrediyor. Piyasa katılımcıları Fed toplantısı öncesi gelişmeleri yakından takip ediyor.",
        category: 'finans',
        source: 'Anadolu Ajansı',
        author: 'AA Ekonomi Editörü',
        publishedAt: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
        hash: this.generateNewsHash("Dolar/TL Kuru", 'Anadolu Ajansı'),
        originalUrl: 'https://www.aa.com.tr/tr/ekonomi/dolar-tl-kuru'
      }
    ];

    return mockNews.map(news => ({
      ...news,
      content: this.generateDetailedContent(news.title, news.excerpt),
      date: new Date().toISOString().split('T')[0],
      image: this.generateImageUrl(news.title, news.category),
      featured: false,
      economicImpact: this.analyzeEconomicImpact(news.title, news.excerpt)
    }));
  }

  // Ana servis fonksiyonu
  async getLatestNews() {
    return await this.fetchAllNews();
  }
}

// Servis instance'ı
export const newsService = new NewsService();

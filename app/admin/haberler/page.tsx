
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function AdminHaberlerPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [newsItems, setNewsItems] = useState([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingNews, setEditingNews] = useState(null);

  // Form verileri
  const [formData, setFormData] = useState({
    title: '',
    excerpt: '',
    content: '',
    category: 'makroekonomi',
    source: '',
    author: '',
    image: '',
    featured: false
  });

  const categories = [
    { id: 'makroekonomi', name: 'Makro Ekonomi' },
    { id: 'parapolisi', name: 'Para Politisi' },
    { id: 'disticaret', name: 'Dış Ticaret' },
    { id: 'calisma', name: 'Çalışma Hayatı' },
    { id: 'finans', name: 'Finans' },
    { id: 'enerji', name: 'Enerji' },
    { id: 'tarim', name: 'Tarım' }
  ];

  useEffect(() => {
    // Giriş kontrolü
    const adminAuth = localStorage.getItem('adminAuth');
    if (adminAuth === 'true') {
      setIsAuthenticated(true);
      loadNews();
    }
  }, []);

  const loadNews = () => {
    const savedNews = localStorage.getItem('ekonomiHaberleri');
    if (savedNews) {
      setNewsItems(JSON.parse(savedNews));
    }
  };

  const handleLogin = (e) => {
    e.preventDefault();

    // WordPress tarzı admin kontrolü
    if (email === 'admin@hatayplatform.com' && password === 'admin123') {
      setIsAuthenticated(true);
      localStorage.setItem('adminAuth', 'true');
      setMessage('Giriş başarılı!');
      loadNews();
    } else {
      setMessage('Yanlış e-posta veya şifre!');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('adminAuth');
    setEmail('');
    setPassword('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.title || !formData.excerpt || !formData.content) {
      setMessage('Lütfen tüm alanları doldurun!');
      return;
    }

    try {
      // Prepare form data for submission
      const formDataToSend = new URLSearchParams();
      formDataToSend.append('title', formData.title);
      formDataToSend.append('excerpt', formData.excerpt);
      formDataToSend.append('content', formData.content);
      formDataToSend.append('category', formData.category);
      formDataToSend.append('source', formData.source || '');
      formDataToSend.append('author', formData.author || '');
      formDataToSend.append('image', formData.image || '');
      formDataToSend.append('featured', formData.featured ? 'true' : 'false');
      formDataToSend.append('date', new Date().toISOString().split('T')[0]);
      formDataToSend.append('publishedAt', new Date().toISOString());

      // Submit to API
      const response = await fetch('https://readdy.ai/api/form/d1uu14efl5e5sapljk0g', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: formDataToSend.toString()
      });

      // Handle response
      if (response.ok) {
        setMessage('Form successfully submitted to server!');
      } else {
        setMessage('Form submission failed. Please try again.');
      }
    } catch (error) {
      console.error('Form submission error:', error);
      setMessage('Form submission error occurred. Please try again.');
    }

    // Continue with local storage logic
    const newNews = {
      id: editingNews ? editingNews.id : Date.now(),
      ...formData,
      date: editingNews ? editingNews.date : new Date().toISOString().split('T')[0],
      publishedAt: editingNews ? editingNews.publishedAt : new Date().toISOString(),
      image: formData.image || `https://readdy.ai/api/search-image?query=Economic%20news%20about%20${formData.category}%20professional%20business%20environment%20modern%20office%20setting&width=400&height=250&seq=admin${Date.now()}&orientation=landscape`
    };

    let updatedNews;
    if (editingNews) {
      // Edit mode
      updatedNews = newsItems.map(item => item.id === editingNews.id ? newNews : item);
      setMessage('News updated and submitted successfully!');
    } else {
      // Add mode - ADD TO TOP
      updatedNews = [newNews, ...newsItems];
      setMessage('News successfully published and submitted, now appearing at the top of the site!');
    }

    // Update local state
    setNewsItems(updatedNews);

    // Save admin panel data
    localStorage.setItem('ekonomiHaberleri', JSON.stringify(updatedNews));

    // Reset form
    setFormData({
      title: '',
      excerpt: '',
      content: '',
      category: 'makroekonomi',
      source: '',
      author: '',
      image: '',
      featured: false
    });
    setShowAddForm(false);
    setEditingNews(null);
  };

  const handleEdit = (news) => {
    setEditingNews(news);
    setFormData({
      title: news.title,
      excerpt: news.excerpt,
      content: news.content,
      category: news.category,
      source: news.source,
      author: news.author,
      image: news.image,
      featured: news.featured
    });
    setShowAddForm(true);
  };

  const handleDelete = (id) => {
    if (confirm('Bu haberi silmek istediğinizden emin misiniz?')) {
      const updatedNews = newsItems.filter(item => item.id !== id);
      setNewsItems(updatedNews);
      localStorage.setItem('ekonomiHaberleri', JSON.stringify(updatedNews));
      setMessage('Haber silindi!');
    }
  };

  const cancelEdit = () => {
    setEditingNews(null);
    setFormData({
      title: '',
      excerpt: '',
      content: '',
      category: 'makroekonomi',
      source: '',
      author: '',
      image: '',
      featured: false
    });
    setShowAddForm(false);
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50 pt-16">
        <div className="flex items-center justify-center py-12 px-4">
          <div className="max-w-md w-full">
            <div className="text-center mb-8">
              <div className="text-3xl font-bold text-[#1B365D] mb-2" style={{fontFamily: 'Pacifico, serif'}}>
                logo
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Admin Paneli</h2>
              <p className="text-gray-600">Ekonomi haberleri yönetimi</p>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-8">
              <form onSubmit={handleLogin} className="space-y-6">
                {message && (
                  <div className={`p-3 rounded-lg text-sm ${message.includes('başarılı') ? 'bg-green-50 text-green-700 border border-green-200' : 'bg-red-50 text-red-700 border border-red-200'}`}>
                    {message}
                  </div>
                )}

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Admin E-posta
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1B365D] focus:border-transparent"
                    placeholder="admin@hatayplatform.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Admin Şifresi
                  </label>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1B365D] focus:border-transparent"
                    placeholder="Admin şifrenizi girin"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-[#1B365D] text-white py-3 px-4 rounded-lg hover:bg-[#2C5F7D] font-medium cursor-pointer"
                >
                  Admin Girişi
                </button>
              </form>

              <div className="bg-blue-50 rounded-lg p-4 mt-6">
                <div className="flex items-center mb-2">
                  <i className="ri-information-line w-4 h-4 flex items-center justify-center mr-2 text-blue-600"></i>
                  <span className="font-medium text-blue-900">Demo Admin Bilgileri</span>
                </div>
                <div className="text-sm text-blue-700">
                  <p><strong>E-posta:</strong> admin@hatayplatform.com</p>
                  <p><strong>Şifre:</strong> admin123</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Ekonomi Haberleri Yönetimi</h1>
            <p className="text-gray-600 mt-2">Günlük ekonomi haberlerini buradan yönetin</p>
          </div>
          <div className="flex items-center gap-4">
            <Link 
              onClick={handleLogout}
              className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 cursor-pointer"
            >
              Çıkış Yap
            </button>
          </div>
        </div>

        {/* Message */}
        {message && (
          <div className={`p-4 rounded-lg mb-6 ${message.includes('başarılı') || message.includes('eklendi') || message.includes('güncellendi') || message.includes('silindi') ? 'bg-green-50 text-green-700 border border-green-200' : 'bg-red-50 text-red-700 border border-red-200'}`}>
            {message}
          </div>
        )}

        {/* Add News Button */}
        <div className="mb-8">
          <button
            onClick={() => setShowAddForm(!showAddForm)}
            className="bg-[#1B365D] text-white px-6 py-3 rounded-lg hover:bg-[#2C5F7D] cursor-pointer flex items-center"
          >
            <i className="ri-add-line w-5 h-5 flex items-center justify-center mr-2"></i>
            {showAddForm ? 'Formu Kapat' : 'Yeni Haber Ekle'}
          </button>
        </div>

        {/* Add/Edit Form */}
        {showAddForm && (
          <div className="bg-white rounded-xl p-8 shadow-sm mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              {editingNews ? 'Haber Düzenle' : 'Yeni Haber Ekle'}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-6" id="news-admin-form" data-readdy-form>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Başlık *
                  </label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={(e) => setFormData({...formData, title: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1B365D] focus:border-transparent"
                    placeholder="Haber başlığını girin"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Kategori *
                  </label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={(e) => setFormData({...formData, category: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1B365D] focus:border-transparent pr-8"
                  >
                    {categories.map(cat => (
                      <option key={cat.id} value={cat.id}>{cat.name}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Özet *
                </label>
                <textarea
                  name="excerpt"
                  value={formData.excerpt}
                  onChange={(e) => setFormData({...formData, excerpt: e.target.value})}
                  rows={3}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1B365D] focus:border-transparent"
                  placeholder="Haber özetini girin (2-3 cümle)"
                  maxLength={500}
                  required
                />
                <div className="text-sm text-gray-500 mt-1">
                  {formData.excerpt.length}/500 characters
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  İçerik *
                </label>
                <textarea
                  name="content"
                  value={formData.content}
                  onChange={(e) => setFormData({...formData, content: e.target.value})}
                  rows={8}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1B365D] focus:border-transparent"
                  placeholder="Haberin tam içeriğini girin"
                  maxLength={500}
                  required
                />
                <div className="text-sm text-gray-500 mt-1">
                  {formData.content.length}/500 characters
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Kaynak
                  </label>
                  <input
                    type="text"
                    name="source"
                    value={formData.source}
                    onChange={(e) => setFormData({...formData, source: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1B365D] focus:border-transparent"
                    placeholder="Haber kaynağı (örn: TÜİK, TCMB)"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Yazar
                  </label>
                  <input
                    type="text"
                    name="author"
                    value={formData.author}
                    onChange={(e) => setFormData({...formData, author: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1B365D] focus:border-transparent"
                    placeholder="Haberi yazan kişi"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Görsel URL (İsteğe bağlı)
                </label>
                <input
                  type="url"
                  name="image"
                  value={formData.image}
                  onChange={(e) => setFormData({...formData, image: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1B365D] focus:border-transparent"
                  placeholder="Boş bırakılırsa otomatik görsel oluşturulur"
                />
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="featured"
                  name="featured"
                  checked={formData.featured}
                  onChange={(e) => setFormData({...formData, featured: e.target.checked})}
                  className="w-4 h-4 text-[#1B365D] border-gray-300 rounded focus:ring-[#1B365D]"
                />
                <label htmlFor="featured" className="ml-2 text-sm text-gray-700">
                  Öne çıkan haber olarak işaretle
                </label>
              </div>

              <div className="flex items-center gap-4">
                <button
                  type="submit"
                  className="bg-[#1B365D] text-white px-8 py-3 rounded-lg hover:bg-[#2C5F7D] cursor-pointer whitespace-nowrap"
                >
                  {editingNews ? 'Haberi Güncelle' : 'Haberi Yayınla'}
                </button>

                {editingNews && (
                  <button
                    type="button"
                    onClick={cancelEdit}
                    className="bg-gray-600 text-white px-8 py-3 rounded-lg hover:bg-gray-700 cursor-pointer whitespace-nowrap"
                  >
                    İptal Et
                  </button>
                )}
              </div>
            </form>
          </div>
        )}

        {/* News List */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">
              Yayınlanan Haberler ({newsItems.length})
            </h3>
          </div>

          <div className="divide-y divide-gray-200">
            {newsItems.map((news) => (
              <div key={news.id} className="p-6 hover:bg-gray-50">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center mb-2">
                      <span className={`px-2 py-1 text-xs font-medium rounded-full mr-3 ${news.featured ? 'bg-red-100 text-red-800' : 'bg-blue-100 text-blue-800'}`}>
                        {news.featured ? 'ÖNE ÇIKAN' : categories.find(c => c.id === news.category)?.name}
                      </span>
                      <span className="text-gray-500 text-sm">
                        {new Date(news.date).toLocaleDateString('tr-TR')}
                      </span>
                    </div>

                    <h4 className="text-lg font-semibold text-gray-900 mb-2">{news.title}</h4>
                    <p className="text-gray-600 text-sm mb-3 line-clamp-2">{news.excerpt}</p>

                    <div className="flex items-center text-sm text-gray-500">
                      <span className="mr-4">Kaynak: {news.source || 'Bilinmiyor'}</span>
                      <span>Yazar: {news.author || 'Anonim'}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 ml-4">
                    <button
                      onClick={() => handleEdit(news)}
                      className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg cursor-pointer"
                      title="Düzenle"
                    >
                      <i className="ri-edit-line w-4 h-4 flex items-center justify-center"></i>
                    </button>
                    <button
                      onClick={() => handleDelete(news.id)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-lg cursor-pointer"
                      title="Sil"
                    >
                      <i className="ri-delete-bin-line w-4 h-4 flex items-center justify-center"></i>
                    </button>
                  </div>
                </div>
              </div>
            ))}

            {newsItems.length === 0 && (
              <div className="p-12 text-center text-gray-500">
                <i className="ri-newspaper-line w-12 h-12 flex items-center justify-center mx-auto mb-4 text-gray-300"></i>
                <p>Henüz haber yayınlanmamış.</p>
                <p className="text-sm mt-2">İlk haberi eklemek için yukarıdaki "Yeni Haber Ekle" butonunu kullanın.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

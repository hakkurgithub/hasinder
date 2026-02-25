'use client';

import { useState } from 'react';

export default function SocialMediaDashboard() {
  const [message, setMessage] = useState('');
  const [link, setLink] = useState('');
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<{type: string, text: string} | null>(null);

  const handlePublish = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setStatus(null);

    try {
      const response = await fetch('/api/publish', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message, link }),
      });

      const result = await response.json();

      if (result.success) {
        setStatus({ 
          type: 'success', 
          text: '✅ Başarılı! İçerik tüm platformlarda yayına alındı.' 
        });
        setMessage('');
        setLink('');
      } else {
        throw new Error(result.error || 'Bilinmeyen bir hata oluştu.');
      }
    } catch (error: any) {
      setStatus({ 
        type: 'error', 
        text: '❌ Hata: ' + error.message 
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center py-10 px-4">
      <div className="max-w-2xl w-full bg-white shadow-lg rounded-xl overflow-hidden">
        <div className="bg-blue-800 p-6 text-white text-center">
          <h1 className="text-2xl font-bold">Hatay Sanayici Veri Havuzu</h1>
          <p className="text-blue-200 text-sm mt-1">Sosyal Medya Komuta Merkezi</p>
        </div>
        <div className="p-8">
          <form onSubmit={handlePublish} className="space-y-6">
            <div>
              <label className="block text-gray-700 font-medium mb-2">Paylaşılacak Mesaj</label>
              <textarea
                className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition h-32"
                placeholder="Yatırım duyurusu veya haberinizi buraya yazın..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
              ></textarea>
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-2">Haber Linki (Opsiyonel)</label>
              <input
                type="url"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
                placeholder="https://hasinder.com/haber/..."
                value={link}
                onChange={(e) => setLink(e.target.value)}
              />
            </div>
            {status && (
              <div className={`p-4 rounded-lg text-sm font-semibold ${status.type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                {status.text}
              </div>
            )}
            <button
              type="submit"
              disabled={loading}
              className={`w-full py-4 text-white font-bold text-lg rounded-lg shadow-md transition-all 
                ${loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700 hover:shadow-lg'}`}
            >
              {loading ? '��� Yayına Alınıyor...' : '��� TÜM PLATFORMLARDA PAYLAŞ'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

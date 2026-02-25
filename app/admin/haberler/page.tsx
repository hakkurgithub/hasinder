'use client';

import { useState, useEffect } from 'react';

export default function AdminHaberler() {
  const [haberler, setHaberler] = useState([]);
  const [baslik, setBaslik] = useState('');
  const [icerik, setIcerik] = useState('');
  const [resim, setResim] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchHaberler();
  }, []);

  const fetchHaberler = async () => {
    try {
      const res = await fetch('/api/haberler');
      const data = await res.json();
      setHaberler(Array.isArray(data) ? data : []);
    } catch (err) {
      setMessage('Haberler yüklenemedi');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/haberler', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ baslik, icerik, resim }),
      });
      const data = await res.json();
      setMessage(data.message || 'Haber eklendi');
      setBaslik('');
      setIcerik('');
      setResim('');
      fetchHaberler();
    } catch (err) {
      setMessage('Haber eklenirken hata oluştu');
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Silmek istediğinize emin misiniz?')) return;
    try {
      const res = await fetch(`/api/haberler/${id}`, { method: 'DELETE' });
      const data = await res.json();
      setMessage(data.message || 'Haber silindi');
      fetchHaberler();
    } catch (err) {
      setMessage('Haber silinirken hata oluştu');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('adminAuth');
    window.location.href = '/admin';
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800">Yönetim Paneli</h1>
          <button
            onClick={handleLogout}
            className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 cursor-pointer"
          >
            Çıkış Yap
          </button>
        </div>

        {message && (
          <div className={`p-4 rounded-lg mb-6 ${message.includes('başarılı') || message.includes('eklendi') || message.includes('güncellendi') || message.includes('silindi') ? 'bg-green-50 text-green-700 border border-green-200' : 'bg-red-50 text-red-700 border border-red-200'}`}>
            {message}
          </div>
        )}

        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">Yeni Haber Ekle</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              placeholder="Başlık"
              value={baslik}
              onChange={(e) => setBaslik(e.target.value)}
              className="w-full p-3 border rounded-lg"
              required
            />
            <textarea
              placeholder="İçerik"
              value={icerik}
              onChange={(e) => setIcerik(e.target.value)}
              className="w-full p-3 border rounded-lg h-32"
              required
            />
            <input
              type="text"
              placeholder="Resim URL (isteğe bağlı)"
              value={resim}
              onChange={(e) => setResim(e.target.value)}
              className="w-full p-3 border rounded-lg"
            />
            <button
              type="submit"
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
            >
              Haber Ekle
            </button>
          </form>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Haberler</h2>
          {haberler.length === 0 ? (
            <p className="text-gray-500">Henüz haber yok</p>
          ) : (
            <div className="space-y-4">
              {haberler.map((haber: any) => (
                <div key={haber.id} className="border rounded-lg p-4 flex justify-between items-center">
                  <div>
                    <h3 className="font-semibold">{haber.baslik}</h3>
                    <p className="text-sm text-gray-600">{haber.icerik.slice(0, 100)}...</p>
                  </div>
                  <button
                    onClick={() => handleDelete(haber.id)}
                    className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
                  >
                    Sil
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

interface Haber {
  id: string;
  baslik: string;
  icerik: string;
  resim?: string;
  createdAt: string;
}

export default function HaberlerPage() {
  const [haberler, setHaberler] = useState<Haber[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchHaberler();
  }, []);

  const fetchHaberler = async () => {
    try {
      const res = await fetch('/api/haberler');
      const data = await res.json();
      
      // Array kontrolü ekle
      if (Array.isArray(data)) {
        setHaberler(data);
      } else {
        console.error('API yanıtı array değil:', data);
        setHaberler([]);
      }
      
      setLoading(false);
    } catch (err) {
      console.error('Haberler yüklenemedi:', err);
      setHaberler([]);
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('tr-TR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Haberler</h1>

        {loading ? (
          <div className="text-center py-12">
            <div className="animate-pulse text-gray-600">Haberler yükleniyor...</div>
          </div>
        ) : haberler.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600">Henüz haber bulunmuyor.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {haberler.map((haber) => (
              <div
                key={haber.id}
                className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
              >
                {haber.resim && (
                  <div className="h-48 overflow-hidden">
                    <img
                      src={haber.resim}
                      alt={haber.baslik}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                )}
                <div className="p-6">
                  <div className="text-sm text-gray-500 mb-2">
                    {formatDate(haber.createdAt)}
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">
                    {haber.baslik}
                  </h3>
                  <p className="text-gray-600 mb-4 line-clamp-3">
                    {haber.icerik}
                  </p>
                  <Link
                    href={`/haberler/${haber.id}`}
                    className="text-[#1B365D] hover:text-[#D4AF37] font-medium inline-flex items-center"
                  >
                    Devamını Oku
                    <i className="ri-arrow-right-line ml-2"></i>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
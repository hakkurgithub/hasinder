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

export default function NewsSection() {
  const [haberler, setHaberler] = useState<Haber[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchHaberler();
  }, []);

  const fetchHaberler = async () => {
    try {
      const res = await fetch('/api/haberler');
      const data = await res.json();
      
      // Eğer data bir array ise kullan, değilse boş array
      if (Array.isArray(data)) {
        setHaberler(data.slice(0, 3)); // Sadece son 3 haberi göster
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

  if (loading) {
    return (
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="animate-pulse">Haberler yükleniyor...</div>
          </div>
        </div>
      </section>
    );
  }

  if (haberler.length === 0) {
    return null; // Haber yoksa bölümü gösterme
  }

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Son Haberler
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Platform ve iş dünyası ile ilgili en güncel haberler
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
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

        <div className="text-center mt-12">
          <Link
            href="/haberler"
            className="inline-block bg-[#1B365D] text-white px-8 py-3 rounded-lg hover:bg-[#D4AF37] transition-colors duration-300 font-medium"
          >
            Tüm Haberleri Gör
          </Link>
        </div>
      </div>
    </section>
  );
}

// Header içindeki nav menüsüne ekleyin:
<Link href="/haberler" className="text-white hover:text-[#D4AF37] px-3 py-2">
  Haberler
</Link>
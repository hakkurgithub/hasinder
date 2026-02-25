'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';

interface Haber {
  id: string;
  baslik: string;
  icerik: string;
  resim?: string;
  createdAt: string;
}

export default function HaberDetay() {
  const params = useParams();
  const router = useRouter();
  const [haber, setHaber] = useState<Haber | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (params.id) {
      fetchHaber(params.id as string);
    }
  }, [params.id]);

  const fetchHaber = async (id: string) => {
    try {
      const res = await fetch('/api/haberler');
      const data = await res.json();
      const foundHaber = data.find((h: Haber) => h.id === id);
      setHaber(foundHaber || null);
      setLoading(false);
    } catch (err) {
      console.error('Haber yüklenemedi:', err);
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('tr-TR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 pt-24 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center py-12">
            <div className="animate-pulse text-gray-600">Haber yükleniyor...</div>
          </div>
        </div>
      </div>
    );
  }

  if (!haber) {
    return (
      <div className="min-h-screen bg-gray-50 pt-24 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center py-12">
            <p className="text-gray-600 mb-4">Haber bulunamadı.</p>
            <Link
              href="/haberler"
              className="text-[#1B365D] hover:text-[#D4AF37] font-medium"
            >
              ← Haberlere Dön
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link
          href="/haberler"
          className="inline-flex items-center text-[#1B365D] hover:text-[#D4AF37] font-medium mb-6"
        >
          <i className="ri-arrow-left-line mr-2"></i>
          Haberlere Dön
        </Link>

        <article className="bg-white rounded-xl shadow-lg overflow-hidden">
          {haber.resim && (
            <div className="h-96 overflow-hidden">
              <img
                src={haber.resim}
                alt={haber.baslik}
                className="w-full h-full object-cover"
              />
            </div>
          )}
          
          <div className="p-8">
            <div className="text-sm text-gray-500 mb-4">
              {formatDate(haber.createdAt)}
            </div>
            
            <h1 className="text-4xl font-bold text-gray-900 mb-6">
              {haber.baslik}
            </h1>
            
            <div className="prose prose-lg max-w-none text-gray-700 whitespace-pre-wrap">
              {haber.icerik}
            </div>
          </div>
        </article>
      </div>
    </div>
  );
}
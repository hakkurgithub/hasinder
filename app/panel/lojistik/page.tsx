'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function LogisticsPage() {
  const [user, setUser] = useState<any>(null);
  const [routes, setRoutes] = useState<any[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  
  const [newRoute, setNewRoute] = useState({ origin: '', destination: '', vehicleType: '', capacity: '', targetPrice: '' });

  useEffect(() => {
    const storedUser = localStorage.getItem('tib_user');
    if (!storedUser) {
      window.location.href = '/giris';
    } else {
      setUser(JSON.parse(storedUser));
      fetchRoutes();
    }
  }, []);

  const fetchRoutes = async () => {
    try {
      const res = await fetch('/api/logistics');
      const data = await res.json();
      if (res.ok) setRoutes(data);
    } catch (error) {
      console.error("Rotalar çekilemedi", error);
    }
  };

  const handleCreateRoute = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch('/api/logistics', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newRoute)
      });
      if (res.ok) {
        setIsModalOpen(false);
        setNewRoute({ origin: '', destination: '', vehicleType: '', capacity: '', targetPrice: '' });
        fetchRoutes();
      } else {
        alert("Rota eklenirken hata oluştu. Lütfen bilgileri kontrol edin.");
      }
    } catch (error) {
      alert("Sistemsel bir hata oluştu.");
    }
    setLoading(false);
  };

  if (!user) return <div className="min-h-screen flex items-center justify-center bg-gray-50 text-[#1B365D] font-bold">Yükleniyor...</div>;

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col md:flex-row pt-16 relative">
      <aside className="w-full md:w-64 bg-[#1B365D] text-white flex flex-col shadow-2xl z-10">
        <div className="p-6 border-b border-blue-800">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-12 h-12 bg-[#D4AF37] rounded-full flex items-center justify-center text-xl font-bold">
              {user.name.charAt(0)}
            </div>
            <div>
              <h2 className="font-bold text-sm truncate">{user.name}</h2>
              <span className="text-xs text-blue-300 bg-blue-900 px-2 py-1 rounded-full">{user.role} | {user.sector}</span>
            </div>
          </div>
        </div>
        <nav className="flex-1 p-4 space-y-2">
          <Link href="/panel" className="flex items-center space-x-3 hover:bg-blue-800 p-3 rounded-lg transition-colors"><i className="ri-dashboard-line text-xl"></i> <span>Genel Durum</span></Link>
          <a href="#" className="flex items-center space-x-3 bg-blue-900 p-3 rounded-lg text-[#D4AF37] font-bold transition-colors"><i className="ri-truck-line text-xl"></i> <span>Lojistik Ağı</span></a>
        </nav>
        <div className="p-4 border-t border-blue-800">
          <button onClick={() => { localStorage.removeItem('tib_user'); window.location.href = '/giris'; }} className="flex items-center space-x-3 text-red-400 hover:text-red-300 w-full p-2 transition-colors">
            <i className="ri-logout-box-r-line text-xl"></i> <span>Güvenli Çıkış</span>
          </button>
        </div>
      </aside>

      <main className="flex-1 p-6 md:p-10 overflow-y-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-2xl md:text-3xl font-extrabold text-[#1B365D]">Canlı Lojistik Radarı</h1>
            <p className="text-gray-500 mt-1">Platform içi boş kamyon ve yük eşleştirme merkezi.</p>
          </div>
          <button onClick={() => setIsModalOpen(true)} className="bg-[#D4AF37] text-white px-6 py-3 rounded-lg font-bold hover:bg-[#B8941F] shadow-md transition-colors flex items-center">
            <i className="ri-truck-fill mr-2"></i> Boş Araç / Yük Bildir
          </button>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="bg-[#1B365D] px-6 py-4 flex justify-between items-center text-white">
            <h3 className="font-bold text-lg">Mevcut Lojistik Kapasiteleri</h3>
            <span className="text-xs bg-red-500 text-white px-3 py-1 rounded-full font-bold animate-pulse"><i className="ri-broadcast-line mr-1"></i> CANLI TAKİP</span>
          </div>
          
          <div className="divide-y divide-gray-100">
            {routes.length === 0 ? (
              <div className="p-10 text-center">
                <i className="ri-map-pin-time-line text-4xl text-gray-300 mb-3 block"></i>
                <p className="text-gray-500 font-medium">Şu an sistemde aktif bir lojistik kaydı bulunmuyor.</p>
              </div>
            ) : (
              routes.map((route) => (
                <div key={route.id} className="p-6 hover:bg-blue-50 transition-colors flex flex-col md:flex-row md:items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-4 mb-2">
                      <span className="font-bold text-[#1B365D] text-lg">{route.origin}</span>
                      <i className="ri-arrow-right-line text-[#D4AF37] text-xl"></i>
                      <span className="font-bold text-[#1B365D] text-lg">{route.destination}</span>
                    </div>
                    <div className="flex items-center space-x-3 text-sm text-gray-600">
                      <span className="bg-gray-100 px-2 py-1 rounded font-medium"><i className="ri-truck-line mr-1"></i> {route.vehicleType}</span>
                      <span className="bg-gray-100 px-2 py-1 rounded font-medium"><i className="ri-weight-line mr-1"></i> Boş Kapasite: {route.capacity}</span>
                      {route.targetPrice && <span className="bg-green-100 text-green-800 px-2 py-1 rounded font-bold">Hedef Fiyat: ₺{route.targetPrice}</span>}
                    </div>
                  </div>
                  <button className="mt-4 md:mt-0 bg-white border-2 border-[#1B365D] text-[#1B365D] px-6 py-2 rounded-lg font-bold hover:bg-[#1B365D] hover:text-white transition-colors whitespace-nowrap">
                    Aracı Kirala / Eşleştir
                  </button>
                </div>
              ))
            )}
          </div>
        </div>
      </main>

      {/* Yeni Rota Ekleme Modalı */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-60 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-lg overflow-hidden border border-gray-200">
            <div className="bg-[#1B365D] px-6 py-4 flex justify-between items-center text-white">
              <h3 className="font-bold text-lg">Lojistik Kapasite Bildirimi</h3>
              <button onClick={() => setIsModalOpen(false)} className="text-gray-300 hover:text-white"><i className="ri-close-line text-2xl"></i></button>
            </div>
            <form onSubmit={handleCreateRoute} className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Kalkış Yeri (İl/İlçe)</label>
                  <input type="text" required value={newRoute.origin} onChange={e => setNewRoute({...newRoute, origin: e.target.value})} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-[#D4AF37]" placeholder="Örn: Hatay / Antakya" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Varış Yeri (İl/İlçe)</label>
                  <input type="text" required value={newRoute.destination} onChange={e => setNewRoute({...newRoute, destination: e.target.value})} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-[#D4AF37]" placeholder="Örn: İstanbul / Esenyurt" />
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Araç Tipi</label>
                  <select required value={newRoute.vehicleType} onChange={e => setNewRoute({...newRoute, vehicleType: e.target.value})} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-[#D4AF37] bg-white">
                    <option value="">Seçiniz...</option>
                    <option value="Tır (Tenteli)">Tır (Tenteli)</option>
                    <option value="Frigofirik (Soğutuculu)">Frigofirik (Soğutuculu)</option>
                    <option value="Kamyon (10 Teker)">Kamyon (10 Teker)</option>
                    <option value="Kamyonet">Kamyonet</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Boş Kapasite</label>
                  <input type="text" required value={newRoute.capacity} onChange={e => setNewRoute({...newRoute, capacity: e.target.value})} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-[#D4AF37]" placeholder="Örn: 15 Ton / Komple" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Hedeflenen Taşıma Fiyatı (₺) - Opsiyonel</label>
                <input type="number" value={newRoute.targetPrice} onChange={e => setNewRoute({...newRoute, targetPrice: e.target.value})} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-[#D4AF37]" placeholder="Sadece rakam giriniz" />
              </div>

              <div className="pt-4 flex justify-end space-x-3">
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors">Vazgeç</button>
                <button type="submit" disabled={loading} className="px-6 py-2 bg-[#D4AF37] text-white rounded-lg font-bold hover:bg-[#B8941F] shadow-md transition-colors disabled:bg-gray-400">
                  {loading ? 'Sisteme İşleniyor...' : 'Ağa Ekle'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

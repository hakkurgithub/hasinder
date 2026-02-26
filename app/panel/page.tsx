'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function DashboardPage() {
  const [user, setUser] = useState<any>(null);
  const [demands, setDemands] = useState<any[]>([]);
  
  // Modals
  const [isDemandModalOpen, setIsDemandModalOpen] = useState(false);
  const [isMediationModalOpen, setIsMediationModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  
  // States
  const [newDemand, setNewDemand] = useState({ title: '', amount: '', sector: '' });
  const [selectedDemand, setSelectedDemand] = useState<any>(null);
  const [mediationData, setMediationData] = useState({ sellerTaxNo: '', proposedPrice: '' });

  useEffect(() => {
    const storedUser = localStorage.getItem('tib_user');
    if (!storedUser) {
      window.location.href = '/giris';
    } else {
      setUser(JSON.parse(storedUser));
      fetchDemands();
    }
  }, []);

  const fetchDemands = async () => {
    try {
      const res = await fetch('/api/demands');
      const data = await res.json();
      if (res.ok) setDemands(data);
    } catch (error) {
      console.error("Talepler çekilemedi", error);
    }
  };

  const handleCreateDemand = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch('/api/demands', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...newDemand, creatorId: user.id })
      });
      if (res.ok) {
        setIsDemandModalOpen(false);
        setNewDemand({ title: '', amount: '', sector: '' });
        fetchDemands();
      } else {
        alert("Talep oluşturulurken bir hata oluştu.");
      }
    } catch (error) {
      alert("Sistemsel bir hata oluştu.");
    }
    setLoading(false);
  };

  const handleCreateMediation = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch('/api/mediations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          demandId: selectedDemand.id,
          mediatorId: user.id,
          sellerTaxNo: mediationData.sellerTaxNo,
          proposedPrice: mediationData.proposedPrice
        })
      });
      const data = await res.json();
      if (res.ok) {
        alert(data.message);
        setIsMediationModalOpen(false);
        setMediationData({ sellerTaxNo: '', proposedPrice: '' });
        fetchDemands(); // Talebin durumunu 'ESLESTI' olarak güncellemek için listeyi yenile
      } else {
        alert("❌ " + data.error);
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
          <a href="#" className="flex items-center space-x-3 bg-blue-900 p-3 rounded-lg text-[#D4AF37] font-bold transition-colors"><i className="ri-dashboard-line text-xl"></i> <span>Genel Durum</span></a>
          <a href="#" className="flex items-center space-x-3 hover:bg-blue-800 p-3 rounded-lg transition-colors"><i className="ri-briefcase-line text-xl"></i> <span>Aktif Talepler</span></a>
          <a href="#" className="flex items-center space-x-3 hover:bg-blue-800 p-3 rounded-lg transition-colors"><i className="ri-truck-line text-xl"></i> <span>Lojistik Ağı</span></a>
        </nav>
        <div className="p-4 border-t border-blue-800">
          <button onClick={() => { localStorage.removeItem('tib_user'); window.location.href = '/giris'; }} className="flex items-center space-x-3 text-red-400 hover:text-red-300 w-full p-2 transition-colors">
            <i className="ri-logout-box-r-line text-xl"></i> <span>Güvenli Çıkış</span>
          </button>
        </div>
      </aside>

      <main className="flex-1 p-6 md:p-10 overflow-y-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl md:text-3xl font-extrabold text-[#1B365D]">TİB İşlem Merkezi</h1>
          <button onClick={() => setIsDemandModalOpen(true)} className="bg-[#D4AF37] text-white px-4 py-2 rounded-lg font-bold hover:bg-[#B8941F] shadow-md transition-colors flex items-center">
            <i className="ri-add-line mr-1"></i> Yeni Talep Aç
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center justify-between border-l-4 border-[#1B365D]">
            <div><p className="text-sm font-medium text-gray-500">Cüzdan Bakiyem</p><p className="text-3xl font-extrabold text-[#1B365D]">₺{user.balance}</p></div>
            <div className="w-12 h-12 bg-blue-50 text-[#1B365D] rounded-full flex items-center justify-center text-2xl"><i className="ri-wallet-3-line"></i></div>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center justify-between border-l-4 border-green-500">
            <div><p className="text-sm font-medium text-gray-500">Açık Fırsatlar</p><p className="text-3xl font-extrabold text-green-600">{demands.filter(d => d.status === 'ACIK').length}</p></div>
            <div className="w-12 h-12 bg-green-50 text-green-600 rounded-full flex items-center justify-center text-2xl"><i className="ri-radar-line"></i></div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="bg-gray-50 px-6 py-4 border-b border-gray-200 flex justify-between items-center">
            <h3 className="font-bold text-[#1B365D] text-lg">Platformdaki Son Ticari Talepler</h3>
          </div>
          <div className="divide-y divide-gray-100">
            {demands.length === 0 ? (
              <div className="p-8 text-center text-gray-500 font-medium">Sistemde aktif talep bulunmuyor.</div>
            ) : (
              demands.map((demand) => (
                <div key={demand.id} className={`p-6 flex flex-col md:flex-row md:items-center justify-between transition-colors ${demand.status === 'ESLESTI' ? 'bg-gray-50 opacity-75' : 'hover:bg-blue-50'}`}>
                  <div className="mb-4 md:mb-0">
                    <div className="flex items-center space-x-2 mb-1">
                      <span className={`text-xs font-bold px-2 py-1 rounded ${demand.sector === 'INSAAT' ? 'bg-orange-100 text-orange-800' : demand.sector === 'GIDA' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'}`}>
                        {demand.sector}
                      </span>
                      <span className="text-xs text-gray-500"><i className="ri-building-line"></i> {demand.creator?.name || 'Firma'}</span>
                      {demand.status === 'ESLESTI' && <span className="text-xs font-bold bg-yellow-100 text-yellow-800 px-2 py-1 rounded"><i className="ri-shake-hands-fill"></i> EŞLEŞME BEKLEMEDE</span>}
                    </div>
                    <h4 className="font-bold text-[#1B365D] text-lg">{demand.title}</h4>
                    <p className="text-sm text-gray-600 mt-1">Talep Edilen Miktar: <span className="font-bold">{demand.amount}</span></p>
                  </div>
                  {demand.status === 'ACIK' && (
                    <button onClick={() => { setSelectedDemand(demand); setIsMediationModalOpen(true); }} className="bg-[#1B365D] text-white px-6 py-2 rounded-lg font-bold hover:bg-blue-900 transition-colors whitespace-nowrap shadow-md">
                      <i className="ri-links-line mr-1"></i> Satıcı Bul & Kazan
                    </button>
                  )}
                </div>
              ))
            )}
          </div>
        </div>
      </main>

      {/* Yeni Talep Modal */}
      {isDemandModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-lg overflow-hidden">
            <div className="bg-[#1B365D] px-6 py-4 flex justify-between items-center text-white">
              <h3 className="font-bold text-lg">Yeni Ticari Talep Aç</h3>
              <button onClick={() => setIsDemandModalOpen(false)} className="text-gray-300 hover:text-white"><i className="ri-close-line text-2xl"></i></button>
            </div>
            <form onSubmit={handleCreateDemand} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Talep Başlığı</label>
                <input type="text" required value={newDemand.title} onChange={e => setNewDemand({...newDemand, title: e.target.value})} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-[#D4AF37] focus:border-[#D4AF37]" placeholder="Örn: Hatay Merkez İçin İnşaat Demiri" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Miktar / Hacim</label>
                <input type="text" required value={newDemand.amount} onChange={e => setNewDemand({...newDemand, amount: e.target.value})} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-[#D4AF37] focus:border-[#D4AF37]" placeholder="Örn: 20 Ton" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">İlgili Sektör</label>
                <select required value={newDemand.sector} onChange={e => setNewDemand({...newDemand, sector: e.target.value})} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-[#D4AF37] focus:border-[#D4AF37] bg-white">
                  <option value="">Seçiniz...</option>
                  <option value="GIDA">Gıda & Tarım</option>
                  <option value="INSAAT">İnşaat & Yapı</option>
                  <option value="LOJISTIK">Lojistik</option>
                </select>
              </div>
              <div className="pt-4 flex justify-end space-x-3">
                <button type="button" onClick={() => setIsDemandModalOpen(false)} className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50">İptal</button>
                <button type="submit" disabled={loading} className="px-4 py-2 bg-[#D4AF37] text-white rounded-lg font-bold hover:bg-[#B8941F] disabled:bg-gray-400">{loading ? 'Kaydediliyor...' : 'Talebi Yayınla'}</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Eşleştirme (Komisyon) Modal */}
      {isMediationModalOpen && selectedDemand && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-lg overflow-hidden border-2 border-[#D4AF37]">
            <div className="bg-[#D4AF37] px-6 py-4 flex justify-between items-center text-white">
              <h3 className="font-extrabold text-lg"><i className="ri-shake-hands-fill mr-2"></i>TİB Eşleştirme & Komisyon</h3>
              <button onClick={() => setIsMediationModalOpen(false)} className="text-[#1B365D] hover:text-white"><i className="ri-close-line text-2xl"></i></button>
            </div>
            <form onSubmit={handleCreateMediation} className="p-6 space-y-4">
              <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200 mb-4 text-sm text-yellow-800">
                <span className="font-bold">Talep:</span> {selectedDemand.title} ({selectedDemand.amount})
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Satıcı / Tedarikçi Vergi Numarası</label>
                <input type="text" required value={mediationData.sellerTaxNo} onChange={e => setMediationData({...mediationData, sellerTaxNo: e.target.value})} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-[#D4AF37] focus:border-[#D4AF37]" placeholder="Sistemde kayıtlı satıcının 10 haneli Vergi No'su" />
                <p className="text-xs text-gray-500 mt-1">* Platforma resmi kaydı olmayan satıcılarla işlem yapılamaz.</p>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Önerilen Toplam Fiyat (₺)</label>
                <input type="number" required value={mediationData.proposedPrice} onChange={e => setMediationData({...mediationData, proposedPrice: e.target.value})} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-[#D4AF37] focus:border-[#D4AF37]" placeholder="Örn: 150000" />
              </div>

              <div className="bg-[#1B365D] text-white p-4 rounded-lg mt-4 flex justify-between items-center">
                <span className="text-sm font-medium">Platform (%2) Komisyonunuz:</span>
                <span className="text-xl font-extrabold text-[#D4AF37]">
                  ₺{mediationData.proposedPrice ? (parseFloat(mediationData.proposedPrice) * 0.02).toFixed(2) : '0.00'}
                </span>
              </div>

              <div className="pt-4 flex justify-end space-x-3">
                <button type="button" onClick={() => setIsMediationModalOpen(false)} className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50">İptal</button>
                <button type="submit" disabled={loading} className="px-6 py-2 bg-[#1B365D] text-white rounded-lg font-bold hover:bg-blue-900 shadow-lg disabled:bg-gray-400">
                  {loading ? 'İşleniyor...' : 'Eşleşmeyi Onayla & Kazan'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

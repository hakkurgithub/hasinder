'use client';

import { useEffect, useState } from 'react';

export default function AdminDashboard() {
  const [adminUser, setAdminUser] = useState<any>(null);
  const [pendingUsers, setPendingUsers] = useState<any[]>([]);
  const [pendingMediations, setPendingMediations] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const storedUser = localStorage.getItem('tib_user');
    if (storedUser) {
      const parsed = JSON.parse(storedUser);
      // Sadece Kurucu Başkan girebilir
      if (parsed.email === 'kurt.hakki@gmail.com' || parsed.isAdmin) {
        setAdminUser(parsed);
        fetchPendingData();
      } else {
        window.location.href = '/panel';
      }
    } else {
      window.location.href = '/giris';
    }
  }, []);

  const fetchPendingData = async () => {
    try {
      const [usersRes, mediationsRes] = await Promise.all([
        fetch('/api/admin/users'),
        fetch('/api/admin/mediations')
      ]);
      if (usersRes.ok) setPendingUsers(await usersRes.json());
      if (mediationsRes.ok) setPendingMediations(await mediationsRes.json());
    } catch (error) {
      console.error("Veriler çekilemedi", error);
    }
  };

  const handleUserAction = async (userId: string, action: 'APPROVE' | 'REJECT') => {
    if (!confirm(action === 'APPROVE' ? 'Firmayı onaylamak istiyor musunuz?' : 'Firmayı reddetmek istiyor musunuz?')) return;
    setLoading(true);
    try {
      const res = await fetch('/api/admin/users', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId, action })
      });
      if (res.ok) fetchPendingData();
    } catch (error) {
      alert("İşlem başarısız.");
    }
    setLoading(false);
  };

  const handleMediationApprove = async (mediationId: string) => {
    if (!confirm('Ticareti onaylayıp komisyonu aracının cüzdanına aktarmak istiyor musunuz?')) return;
    setLoading(true);
    try {
      const res = await fetch('/api/admin/mediations', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ mediationId })
      });
      if (res.ok) fetchPendingData();
    } catch (error) {
      alert("Komisyon aktarımı başarısız.");
    }
    setLoading(false);
  };

  if (!adminUser) return <div className="min-h-screen flex items-center justify-center font-bold text-[#1B365D]">Yönetici Yetkisi Bekleniyor...</div>;

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col pt-16">
      <header className="bg-red-900 text-white p-4 shadow-lg flex justify-between items-center px-8 z-20">
        <h1 className="text-xl font-extrabold"><i className="ri-shield-star-fill text-[#D4AF37] mr-2"></i>TİB Ağı KOMUTA MERKEZİ (Super Admin)</h1>
        <div className="flex items-center space-x-4">
          <span className="font-medium text-sm">Başkan: Hakkı Kurt</span>
          <button onClick={() => { localStorage.removeItem('tib_user'); window.location.href = '/giris'; }} className="bg-white text-red-900 px-4 py-1 rounded font-bold text-sm">Çıkış</button>
        </div>
      </header>

      <main className="flex-1 p-8 grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Üye Onay Modülü */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-200">
          <div className="bg-[#1B365D] text-white p-4 font-bold flex justify-between items-center">
            <span>Bekleyen Üyelik Başvuruları</span>
            <span className="bg-red-500 px-2 py-1 rounded-full text-xs">{pendingUsers.length} Yeni Başvuru</span>
          </div>
          <div className="p-4 divide-y divide-gray-100">
            {pendingUsers.length === 0 ? (
              <p className="text-gray-500 text-center py-4">Onay bekleyen yeni firma yok.</p>
            ) : (
              pendingUsers.map(u => (
                <div key={u.id} className="py-4 flex flex-col sm:flex-row justify-between sm:items-center gap-4">
                  <div>
                    <h4 className="font-bold text-gray-800">{u.name}</h4>
                    <p className="text-sm text-gray-500">Vergi No: {u.taxNo} | Sektör: {u.sector} | Rol: {u.role}</p>
                    <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded font-bold mt-1 inline-block">ONAY BEKLİYOR</span>
                  </div>
                  <div className="flex space-x-2">
                    <button disabled={loading} onClick={() => handleUserAction(u.id, 'APPROVE')} className="bg-green-500 text-white px-3 py-2 rounded shadow hover:bg-green-600 disabled:bg-gray-400"><i className="ri-check-line"></i> Onayla</button>
                    <button disabled={loading} onClick={() => handleUserAction(u.id, 'REJECT')} className="bg-red-500 text-white px-3 py-2 rounded shadow hover:bg-red-600 disabled:bg-gray-400"><i className="ri-close-line"></i> Reddet</button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Komisyon ve Hakediş Merkezi */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-200">
          <div className="bg-[#D4AF37] text-white p-4 font-bold flex justify-between items-center">
            <span>Komisyon ve Hakediş Onayları</span>
            <span className="bg-red-500 px-2 py-1 rounded-full text-xs">{pendingMediations.length} İşlem Bekliyor</span>
          </div>
          <div className="p-4 divide-y divide-gray-100">
            {pendingMediations.length === 0 ? (
              <p className="text-gray-500 text-center py-4">Onay bekleyen ticaret ve komisyon yok.</p>
            ) : (
              pendingMediations.map(m => (
                <div key={m.id} className="py-4">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-bold text-gray-800">{m.demand?.title}</h4>
                    <span className="font-extrabold text-green-600">Komisyon: ₺{m.commissionAmount.toFixed(2)}</span>
                  </div>
                  <p className="text-sm text-gray-500">Aracı: {m.mediator?.name} | Satıcı: {m.seller?.name}</p>
                  <div className="mt-3 flex space-x-2">
                    <button disabled={loading} onClick={() => handleMediationApprove(m.id)} className="bg-[#1B365D] text-white text-sm px-4 py-2 rounded shadow hover:bg-blue-900 w-full font-bold disabled:bg-gray-400">
                      Ticareti Onayla & Komisyonu Dağıt
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

      </main>
    </div>
  );
}

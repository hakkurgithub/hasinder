'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function ProfilePage() {
  const [user, setUser] = useState<any>(null);
  const [profileData, setProfileData] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<{type: string, text: string} | null>(null);

  // Form States
  const [iban, setIban] = useState('');
  const [phone, setPhone] = useState('');
  const [newPassword, setNewPassword] = useState('');

  useEffect(() => {
    const storedUser = localStorage.getItem('tib_user');
    if (!storedUser) {
      window.location.href = '/giris';
    } else {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);
      fetchProfile(parsedUser.id);
    }
  }, []);

  const fetchProfile = async (userId: string) => {
    try {
      const res = await fetch('/api/profile', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId })
      });
      if (res.ok) {
        const data = await res.json();
        setProfileData(data);
        setIban(data.iban || '');
        setPhone(data.phone || '');
      }
    } catch (error) {
      console.error("Profil çekilemedi", error);
    }
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setStatus(null);
    try {
      const res = await fetch('/api/profile', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: user.id, iban, phone, newPassword })
      });
      const data = await res.json();
      if (res.ok) {
        setStatus({ type: 'success', text: data.message });
        setNewPassword(''); // Şifre alanını temizle
        fetchProfile(user.id); // Verileri yenile
      } else {
        setStatus({ type: 'error', text: '❌ ' + data.error });
      }
    } catch (error) {
      setStatus({ type: 'error', text: 'Sistemsel bir hata oluştu.' });
    }
    setLoading(false);
  };

  if (!profileData) return <div className="min-h-screen flex items-center justify-center bg-gray-50 text-[#1B365D] font-bold">Yükleniyor...</div>;

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col md:flex-row pt-16 relative">
      <aside className="w-full md:w-64 bg-[#1B365D] text-white flex flex-col shadow-2xl z-10">
        <div className="p-6 border-b border-blue-800">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-12 h-12 bg-[#D4AF37] rounded-full flex items-center justify-center text-xl font-bold">
              {profileData.name.charAt(0)}
            </div>
            <div>
              <h2 className="font-bold text-sm truncate">{profileData.name}</h2>
              <span className="text-xs text-blue-300 bg-blue-900 px-2 py-1 rounded-full">{profileData.role}</span>
            </div>
          </div>
        </div>
        <nav className="flex-1 p-4 space-y-2">
          <Link href="/panel" className="flex items-center space-x-3 hover:bg-blue-800 p-3 rounded-lg transition-colors"><i className="ri-dashboard-line text-xl"></i> <span>Genel Durum</span></Link>
          <a href="#" className="flex items-center space-x-3 bg-blue-900 p-3 rounded-lg text-[#D4AF37] font-bold transition-colors"><i className="ri-user-settings-line text-xl"></i> <span>Profil & Ayarlar</span></a>
        </nav>
      </aside>

      <main className="flex-1 p-6 md:p-10 overflow-y-auto">
        <div className="mb-8">
          <h1 className="text-2xl md:text-3xl font-extrabold text-[#1B365D]">Kurumsal Profil</h1>
          <p className="text-gray-500 mt-1">Ticari sicil, iletişim ve banka (hakediş) bilgilerinizi yönetin.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Sol Kolon: Sabit Ticari Sicil Bilgileri */}
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <div className="w-20 h-20 bg-blue-50 text-[#1B365D] rounded-full flex items-center justify-center text-4xl mb-4 border-2 border-[#D4AF37]">
                <i className="ri-building-4-fill"></i>
              </div>
              <h3 className="font-bold text-xl text-gray-900 mb-1">{profileData.name}</h3>
              <p className="text-sm text-gray-500 mb-6">{profileData.email}</p>
              
              <div className="space-y-3 pt-4 border-t border-gray-100">
                <div>
                  <p className="text-xs text-gray-400 font-bold uppercase">Vergi Numarası</p>
                  <p className="font-medium text-gray-800">{profileData.taxNo}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-400 font-bold uppercase">Faaliyet Sektörü</p>
                  <p className="font-medium text-gray-800">{profileData.sector}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-400 font-bold uppercase">Sistemdeki Rolü</p>
                  <p className="font-medium text-gray-800">{profileData.role}</p>
                </div>
              </div>
              <div className="mt-6 bg-yellow-50 text-yellow-800 text-xs p-3 rounded-lg border border-yellow-200">
                <i className="ri-information-line mr-1"></i> Resmi ticari sicil bilgilerinizi değiştirmek için Yönetim ile iletişime geçiniz.
              </div>
            </div>
          </div>

          {/* Sağ Kolon: Güncellenebilir Ayarlar */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 md:p-8">
              <h3 className="text-xl font-bold text-[#1B365D] mb-6 border-b border-gray-100 pb-4">Finans ve Güvenlik Ayarları</h3>
              
              {status && (
                <div className={`p-4 rounded-lg text-sm font-bold mb-6 ${status.type === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                  {status.text}
                </div>
              )}

              <form onSubmit={handleUpdate} className="space-y-6">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2"><i className="ri-phone-fill text-[#D4AF37] mr-1"></i> Kurumsal İletişim Numarası</label>
                  <input type="text" value={phone} onChange={e => setPhone(e.target.value)} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-[#D4AF37] focus:border-[#D4AF37]" placeholder="Örn: 0555 123 45 67" />
                </div>
                
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2"><i className="ri-bank-card-fill text-[#D4AF37] mr-1"></i> Hakediş (IBAN) Numarası</label>
                  <input type="text" value={iban} onChange={e => setIban(e.target.value)} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-[#D4AF37] focus:border-[#D4AF37] font-mono" placeholder="TR..." />
                  <p className="text-xs text-gray-500 mt-2">* Komisyon ödemeleriniz, firma/şahıs adınıza kayıtlı bu resmi IBAN numarasına yapılacaktır.</p>
                </div>

                <div className="pt-6 border-t border-gray-100">
                  <label className="block text-sm font-bold text-gray-700 mb-2"><i className="ri-lock-password-fill text-[#D4AF37] mr-1"></i> Güvenlik Şifresini Güncelle</label>
                  <input type="password" value={newPassword} onChange={e => setNewPassword(e.target.value)} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-[#D4AF37] focus:border-[#D4AF37]" placeholder="Yeni şifrenizi girin (Değiştirmek istemiyorsanız boş bırakın)" />
                </div>

                <div className="pt-4 flex justify-end">
                  <button type="submit" disabled={loading} className="px-8 py-3 bg-[#1B365D] text-white rounded-lg font-bold hover:bg-blue-900 shadow-lg disabled:bg-gray-400 transition-colors">
                    {loading ? 'Güncelleniyor...' : 'Ayarları Kaydet'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

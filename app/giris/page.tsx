'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function AuthPage() {
  const [activeTab, setActiveTab] = useState<'login' | 'register'>('login');
  
  // Form State'leri
  const [formData, setFormData] = useState({ name: '', taxNo: '', sector: '', role: '', email: '', password: '' });
  const [status, setStatus] = useState<{type: string, text: string} | null>(null);
  const [loading, setLoading] = useState(false);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true); setStatus(null);
    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const data = await res.json();
      if (res.ok) {
        setStatus({ type: 'success', text: data.message });
        setFormData({ name: '', taxNo: '', sector: '', role: '', email: '', password: '' }); // Formu temizle
      } else {
        setStatus({ type: 'error', text: '❌ ' + data.error });
      }
    } catch (err) {
      setStatus({ type: 'error', text: '❌ Sistemsel bir hata oluştu.' });
    }
    setLoading(false);
  };

  return (
    <main className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8 pt-24">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center">
          <div className="w-16 h-16 bg-[#1B365D] rounded-full flex items-center justify-center shadow-lg border-2 border-[#D4AF37]">
            <i className="ri-shield-user-fill text-3xl text-[#D4AF37]"></i>
          </div>
        </div>
        <h2 className="mt-6 text-center text-3xl font-extrabold text-[#1B365D]">TİB Ağı Yetkilendirme</h2>
        <p className="mt-2 text-center text-sm text-gray-600">Kapalı Devre Ticaret ve İşbirliği Platformu</p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-xl">
        <div className="bg-white py-8 px-4 shadow-2xl sm:rounded-xl sm:px-10 border border-gray-100">
          
          <div className="flex border-b border-gray-200 mb-8">
            <button onClick={() => setActiveTab('login')} className={`flex-1 py-4 text-center font-bold text-sm transition-colors duration-200 ${activeTab === 'login' ? 'border-b-4 border-[#D4AF37] text-[#1B365D]' : 'text-gray-400 hover:text-gray-700'}`}>SİSTEME GİRİŞ</button>
            <button onClick={() => setActiveTab('register')} className={`flex-1 py-4 text-center font-bold text-sm transition-colors duration-200 ${activeTab === 'register' ? 'border-b-4 border-[#D4AF37] text-[#1B365D]' : 'text-gray-400 hover:text-gray-700'}`}>KURUMSAL KAYIT</button>
          </div>

          {activeTab === 'login' && (
            <form className="space-y-6" onSubmit={async (e) => { e.preventDefault(); setLoading(true); setStatus(null); try { const res = await fetch('/api/auth/login', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ email: formData.email, password: formData.password }) }); const data = await res.json(); if (res.ok) { localStorage.setItem('tib_user', JSON.stringify(data.user)); window.location.href = '/panel'; } else { setStatus({ type: 'error', text: '❌ ' + data.error }); } } catch (err) { setStatus({ type: 'error', text: '❌ Giriş yapılamadı.' }); } setLoading(false); }}>
              {status && activeTab === 'login' && <div className="p-4 rounded-lg text-sm font-bold bg-red-100 text-red-800 border border-red-200 mb-4">{status.text}</div>}
              <div>
                <label className="block text-sm font-medium text-gray-700">Resmi E-posta Adresi</label>
                <input type="email" required className="mt-1 block w-full py-3 px-3 border border-gray-300 rounded-lg shadow-sm focus:ring-[#D4AF37] focus:border-[#D4AF37] sm:text-sm" placeholder="sirket@domain.com" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Güvenlik Şifresi</label>
                <input type="password" required className="mt-1 block w-full py-3 px-3 border border-gray-300 rounded-lg shadow-sm focus:ring-[#D4AF37] focus:border-[#D4AF37] sm:text-sm" placeholder="••••••••" value={formData.password} onChange={e => setFormData({...formData, password: e.target.value})} />
              </div>
              <button type="submit" className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-bold text-white bg-[#1B365D] hover:bg-blue-900 transition-colors">{loading ? 'GİRİŞ YAPILIYOR...' : 'GÜVENLİ GİRİŞ YAP'}</button>
            </form>
          )}

          {activeTab === 'register' && (
            <form className="space-y-5" onSubmit={handleRegister}>
              <div className="bg-blue-50 p-4 rounded-lg border border-blue-100 mb-6 text-sm text-blue-800">Sisteme sadece vergi levhası olan işletmeler ve onaylı aracılar kabul edilmektedir.</div>
              
              {status && (
                <div className={`p-4 rounded-lg text-sm font-bold ${status.type === 'success' ? 'bg-green-100 text-green-800 border border-green-200' : 'bg-red-100 text-red-800 border border-red-200'}`}>
                  {status.text}
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700">Firma veya Şahıs Adı (Resmi)</label>
                  <input type="text" required value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="mt-1 block w-full py-3 px-3 border border-gray-300 rounded-lg shadow-sm sm:text-sm" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Vergi Numarası</label>
                  <input type="text" required value={formData.taxNo} onChange={e => setFormData({...formData, taxNo: e.target.value})} className="mt-1 block w-full py-3 px-3 border border-gray-300 rounded-lg shadow-sm sm:text-sm" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Faaliyet Sektörü</label>
                  <select required value={formData.sector} onChange={e => setFormData({...formData, sector: e.target.value})} className="mt-1 block w-full py-3 px-3 border border-gray-300 rounded-lg shadow-sm sm:text-sm">
                    <option value="">Seçiniz...</option>
                    <option value="GIDA">Toptan Gıda & Tarım</option>
                    <option value="INSAAT">İnşaat & Yapı Malzemeleri</option>
                    <option value="LOJISTIK">Lojistik & Taşımacılık</option>
                  </select>
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700">TİB Ağındaki Rolünüz</label>
                  <select required value={formData.role} onChange={e => setFormData({...formData, role: e.target.value})} className="mt-1 block w-full py-3 px-3 border border-gray-300 rounded-lg shadow-sm sm:text-sm">
                    <option value="">Platformda ne yapmak istiyorsunuz?</option>
                    <option value="SATICI">Ürün/Hizmet Satmak İstiyorum (Tedarikçi)</option>
                    <option value="ALICI">Toptan Ürün/Hizmet Almak İstiyorum (Alıcı)</option>
                    <option value="ARACI">Alıcı/Satıcı Buluşturup Komisyon İstiyorum (Aracı)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Kurumsal E-posta</label>
                  <input type="email" required value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} className="mt-1 block w-full py-3 px-3 border border-gray-300 rounded-lg shadow-sm sm:text-sm" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Şifre Belirleyin</label>
                  <input type="password" required value={formData.password} onChange={e => setFormData({...formData, password: e.target.value})} className="mt-1 block w-full py-3 px-3 border border-gray-300 rounded-lg shadow-sm sm:text-sm" />
                </div>
              </div>
              <button type="submit" disabled={loading} className={`w-full flex justify-center py-4 px-4 border border-transparent rounded-lg shadow-md text-sm font-bold text-white transition-all mt-6 ${loading ? 'bg-gray-400' : 'bg-[#D4AF37] hover:bg-[#B8941F]'}`}>
                {loading ? 'KAYDEDİLİYOR...' : 'YETKİLENDİRME TALEBİ GÖNDER'}
              </button>
            </form>
          )}
        </div>
        <div className="text-center mt-6">
          <Link href="/" className="text-sm font-medium text-gray-500 hover:text-[#1B365D] transition-colors"><i className="ri-arrow-left-line mr-1"></i> Ana Ekrana Dön</Link>
        </div>
      </div>
    </main>
  );
}
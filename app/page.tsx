'use client';

import Link from 'next/link';

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50 pt-16">
      {/* 1. CANLI TİB AĞI RADARI (Kayan Bant) */}
      <div className="bg-[#1B365D] text-white py-2 border-b-2 border-[#D4AF37] relative z-10 overflow-hidden">
        <div className="flex animate-pulse space-x-8 px-4 text-sm font-semibold max-w-7xl mx-auto whitespace-nowrap overflow-x-auto custom-scrollbar">
          <span className="text-[#D4AF37] flex-shrink-0">��� CANLI B2B AKIŞI:</span>
          <span className="flex-shrink-0">��� Fırsat: Hatay Merkez - 20 Ton İnşaat Demiri Aranıyor</span>
          <span className="flex-shrink-0 text-gray-400">|</span>
          <span className="flex-shrink-0">��� Teklif: İstanbul - Günlük Lojistik Ağı Ortaklığı (%2 Komisyon)</span>
          <span className="flex-shrink-0 text-gray-400">|</span>
          <span className="flex-shrink-0">��� Eşleşme: İskenderun Limanı 2 Üye Arası Anlaşma Sağlandı</span>
        </div>
      </div>

      {/* 2. DİNAMİK KARŞILAMA (HERO) & BAŞKANLIK GÜVEN ENDEKSİ */}
      <section className="relative bg-white py-16 sm:py-24 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-[#1B365D] tracking-tight mb-4" style={{fontFamily: 'var(--font-geist-sans)'}}>
            Hatay İş Dünyası <span className="text-[#D4AF37]">Mega Portalı</span>
          </h1>
          <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500">
            Sıfır risk, maksimum işbirliği. Hatay ve İstanbul arasındaki dev ticaret ağına katılın, günde sadece 2 saat ayırarak komisyon ve kazanç elde edin.
          </p>
          
          {/* Başkanlık İstatistikleri */}
          <div className="mt-10 max-w-4xl mx-auto bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden">
            <div className="bg-[#1B365D] py-4 px-6 text-left border-b-4 border-[#D4AF37]">
              <h3 className="text-white font-bold flex items-center text-lg">
                <i className="ri-bar-chart-box-line mr-2 text-[#D4AF37] text-2xl"></i>
                İstanbul & Hatay Platformu Canlı Ticaret Hacmi
              </h3>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-gray-200">
              <div className="p-6 text-center hover:bg-gray-50 transition-colors">
                <p className="text-sm font-medium text-gray-500 uppercase tracking-wide">Aktif TİB Üyesi</p>
                <p className="mt-2 text-4xl font-extrabold text-[#1B365D]">342</p>
              </div>
              <div className="p-6 text-center hover:bg-gray-50 transition-colors">
                <p className="text-sm font-medium text-gray-500 uppercase tracking-wide">Eşleşen İş Fırsatı</p>
                <p className="mt-2 text-4xl font-extrabold text-[#D4AF37]">1,284</p>
              </div>
              <div className="p-6 text-center hover:bg-gray-50 transition-colors">
                <p className="text-sm font-medium text-gray-500 uppercase tracking-wide">Fonlanan Proje Hacmi</p>
                <p className="mt-2 text-4xl font-extrabold text-[#1B365D]">₺15.4M</p>
              </div>
            </div>
          </div>

          <div className="mt-10 flex flex-col sm:flex-row justify-center gap-4">
            <Link href="/giris" className="px-8 py-4 bg-[#D4AF37] text-white font-bold text-lg rounded-lg hover:bg-[#B8941F] shadow-lg transition-all flex items-center justify-center">
              <i className="ri-rocket-line mr-2"></i> TİB Ağına Katıl
            </Link>
            <Link href="#projeler" className="px-8 py-4 bg-white text-[#1B365D] border-2 border-[#1B365D] font-bold text-lg rounded-lg hover:bg-gray-50 transition-all flex items-center justify-center">
              <i className="ri-briefcase-line mr-2"></i> Yatırım Havuzunu İncele
            </Link>
          </div>
        </div>
      </section>

      {/* 3. ENDÜSTRİHUB YATIRIM HAVUZLARI */}
      <section id="projeler" className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-[#1B365D]">EndüstriHub Sektörel Yatırım Havuzları</h2>
            <p className="mt-4 text-gray-600 max-w-2xl mx-auto">Küçük yatırımlarla dev projelere ortak olun. Güvenli risk dağılımı ve platform güvencesiyle yüksek getiri hedefleyin.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Proje Kartı 1 */}
            <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all border border-gray-100 flex flex-col">
              <div className="h-48 bg-blue-50 flex items-center justify-center relative">
                <i className="ri-truck-line text-6xl text-blue-200"></i>
                <div className="absolute top-4 right-4 bg-green-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-sm">%60 Fonlandı</div>
              </div>
              <div className="p-6 flex flex-col flex-grow">
                <h3 className="text-xl font-bold text-[#1B365D] mb-2">Akıllı Lojistik Merkezi (Hatay)</h3>
                <p className="text-gray-600 text-sm mb-6 flex-grow">Gıda ve tekstil ürünleri için ortak depolama ve sevkiyat merkezi. Üyeler arası indirimli taşıma avantajı.</p>
                <div className="w-full bg-gray-200 rounded-full h-2.5 mb-2">
                  <div className="bg-[#D4AF37] h-2.5 rounded-full" style={{width: '60%'}}></div>
                </div>
                <div className="flex justify-between text-xs text-gray-500 mb-6 font-medium">
                  <span>Toplanan: ₺3.000.000</span>
                  <span>Hedef: ₺5.000.000</span>
                </div>
                <button className="w-full py-3 bg-[#1B365D] text-white rounded-lg font-bold hover:bg-blue-900 transition-colors">Detayları İncele & Ortak Ol</button>
              </div>
            </div>

            {/* Proje Kartı 2 */}
            <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all border border-gray-100 flex flex-col">
              <div className="h-48 bg-green-50 flex items-center justify-center relative">
                <i className="ri-sun-line text-6xl text-green-200"></i>
                <div className="absolute top-4 right-4 bg-green-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-sm">%85 Fonlandı</div>
              </div>
              <div className="p-6 flex flex-col flex-grow">
                <h3 className="text-xl font-bold text-[#1B365D] mb-2">Yeşil Enerji GES Kooperatifi</h3>
                <p className="text-gray-600 text-sm mb-6 flex-grow">Antakya OSB çatı güneş enerjisi kooperatifi. Katılımcılara düzenli ve garantili aylık temettü getirisi.</p>
                <div className="w-full bg-gray-200 rounded-full h-2.5 mb-2">
                  <div className="bg-[#D4AF37] h-2.5 rounded-full" style={{width: '85%'}}></div>
                </div>
                <div className="flex justify-between text-xs text-gray-500 mb-6 font-medium">
                  <span>Toplanan: ₺8.500.000</span>
                  <span>Hedef: ₺10.000.000</span>
                </div>
                <button className="w-full py-3 bg-[#1B365D] text-white rounded-lg font-bold hover:bg-blue-900 transition-colors">Detayları İncele & Ortak Ol</button>
              </div>
            </div>

            {/* Proje Kartı 3 */}
            <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all border border-gray-100 flex flex-col">
              <div className="h-48 bg-orange-50 flex items-center justify-center relative">
                <i className="ri-global-line text-6xl text-orange-200"></i>
                <div className="absolute top-4 right-4 bg-blue-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-sm">Yeni Açıldı</div>
              </div>
              <div className="p-6 flex flex-col flex-grow">
                <h3 className="text-xl font-bold text-[#1B365D] mb-2">B2B E-İhracat Yazılım Ağı</h3>
                <p className="text-gray-600 text-sm mb-6 flex-grow">Hataylı üreticileri Ortadoğu pazarına bağlayacak yapay zeka destekli platform yazılımı yatırımı.</p>
                <div className="w-full bg-gray-200 rounded-full h-2.5 mb-2">
                  <div className="bg-[#D4AF37] h-2.5 rounded-full" style={{width: '15%'}}></div>
                </div>
                <div className="flex justify-between text-xs text-gray-500 mb-6 font-medium">
                  <span>Toplanan: ₺150.000</span>
                  <span>Hedef: ₺1.000.000</span>
                </div>
                <button className="w-full py-3 bg-[#1B365D] text-white rounded-lg font-bold hover:bg-blue-900 transition-colors">Detayları İncele & Ortak Ol</button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. MAHALLEKOOP & ESNAFPAY */}
      <section className="py-20 bg-white border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-[#1B365D] rounded-3xl overflow-hidden shadow-2xl flex flex-col md:flex-row relative">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-5 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none"></div>
            
            <div className="p-10 md:p-16 md:w-3/5 flex flex-col justify-center relative z-10">
              <div className="inline-block bg-[#D4AF37] text-white px-4 py-1 rounded-full text-sm font-bold w-fit mb-6">
                Sıfır Sermaye TİB Ağı
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 leading-tight">Günde 2 Saat Ayırarak<br/>Gelir Ağınızı Kurun</h2>
              <p className="text-blue-100 mb-8 text-lg">
                MahalleKoop ve EsnafPay vizyonuyla iş insanlarını bir araya getirin. Sadece telefon görüşmeleri ve "Bilgi Komisyonu" sistemiyle sıfır yatırımla düzenli gelir elde edin.
              </p>
              <ul className="space-y-4 text-white mb-10">
                <li className="flex items-center"><i className="ri-checkbox-circle-fill text-[#D4AF37] mr-3 text-2xl"></i> <span className="text-lg">Tamamen ücretsiz ağa katılım</span></li>
                <li className="flex items-center"><i className="ri-checkbox-circle-fill text-[#D4AF37] mr-3 text-2xl"></i> <span className="text-lg">Eşleştirmelerden anında %2 komisyon</span></li>
                <li className="flex items-center"><i className="ri-checkbox-circle-fill text-[#D4AF37] mr-3 text-2xl"></i> <span className="text-lg">Ortak alım gücü ile esnaf indirimleri</span></li>
              </ul>
              <button className="w-fit px-10 py-4 bg-white text-[#1B365D] font-extrabold text-lg rounded-xl hover:bg-gray-100 transition-all shadow-lg flex items-center">
                Sisteme Dahil Ol <i className="ri-arrow-right-line ml-2"></i>
              </button>
            </div>
            
            <div className="md:w-2/5 bg-gray-50 flex items-center justify-center p-8 md:p-0 relative z-10">
              <div className="w-full max-w-sm bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
                <div className="flex items-center justify-center w-16 h-16 bg-green-100 text-green-600 rounded-full mb-6 mx-auto">
                  <i className="ri-money-dollar-circle-fill text-3xl"></i>
                </div>
                <h4 className="text-[#1B365D] font-bold text-xl mb-6 text-center border-b pb-4">Canlı Komisyon Panosu</h4>
                <div className="space-y-5">
                  <div className="flex justify-between items-center bg-gray-50 p-3 rounded-lg">
                    <span className="text-sm font-medium text-gray-700">Beton ↔ Nakliye</span>
                    <span className="text-sm font-extrabold text-green-600">+₺12.500</span>
                  </div>
                  <div className="flex justify-between items-center bg-gray-50 p-3 rounded-lg">
                    <span className="text-sm font-medium text-gray-700">Gıda Ortak Alımı</span>
                    <span className="text-sm font-extrabold text-blue-600">%15 Kar</span>
                  </div>
                  <div className="flex justify-between items-center bg-gray-50 p-3 rounded-lg">
                    <span className="text-sm font-medium text-gray-700">Ağa Yeni Üye</span>
                    <span className="text-sm font-extrabold text-[#D4AF37]">Premium</span>
                  </div>
                </div>
                <p className="text-xs text-center text-gray-400 mt-6 mt-4">Tüm veriler şifreli ve anonim olarak işlenmektedir.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

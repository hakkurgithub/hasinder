'use client';

import Link from 'next/link';

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50 pt-16">
      {/* 1. CANLI TİB AĞI RADARI (Gerçekçi Fırsatlar) */}
      <div className="bg-[#1B365D] text-white py-2 border-b-2 border-[#D4AF37] relative z-10 overflow-hidden">
        <div className="flex animate-pulse space-x-8 px-4 text-sm font-semibold max-w-7xl mx-auto whitespace-nowrap overflow-x-auto custom-scrollbar">
          <span className="text-[#D4AF37] flex-shrink-0">��� CANLI B2B AKIŞI:</span>
          <span className="flex-shrink-0">��� Fırsat: İstanbul - Aylık 5 Ton %100 Doğal Sızma Zeytinyağı (1.5 Asit) Aranıyor</span>
          <span className="flex-shrink-0 text-gray-400">|</span>
          <span className="flex-shrink-0">��� Teklif: Hatay-İstanbul Hattı Boş Dönüş Kamyon Kapasitesi (%2 TİB Komisyonu)</span>
          <span className="flex-shrink-0 text-gray-400">|</span>
          <span className="flex-shrink-0">��� Eşleşme: Antakya - Şantiye 20 Ton İnşaat Demiri Tedariği Sağlandı</span>
        </div>
      </div>

      {/* 2. DİNAMİK KARŞILAMA & TİB AĞI SİSTEMİ */}
      <section className="relative bg-white py-16 sm:py-24 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-[#1B365D] tracking-tight mb-4">
            Hatay İş Dünyası <span className="text-[#D4AF37]">Ticaret Portalı</span>
          </h1>
          <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500">
            Sadece resmi kaydı olan iş insanlarının buluştuğu güvenli ticaret ağı. Alıcıyla satıcıyı eşleştirin, gerçekleşen ticaretten platform güvencesiyle komisyon kazanın.
          </p>
          
          <div className="mt-10 flex flex-col sm:flex-row justify-center gap-4">
            <Link href="/giris" className="px-8 py-4 bg-[#D4AF37] text-white font-bold text-lg rounded-lg hover:bg-[#B8941F] shadow-lg transition-all flex items-center justify-center">
              <i className="ri-shield-user-line mr-2"></i> Resmi Üye Girişi
            </Link>
            <Link href="#sektorler" className="px-8 py-4 bg-white text-[#1B365D] border-2 border-[#1B365D] font-bold text-lg rounded-lg hover:bg-gray-50 transition-all flex items-center justify-center">
              <i className="ri-building-4-line mr-2"></i> Aktif Sektörleri İncele
            </Link>
          </div>
        </div>
      </section>

      {/* 3. SOMUT VE GERÇEKÇİ TİCARET SEKTÖRLERİ */}
      <section id="sektorler" className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-[#1B365D]">Aktif Ticaret ve Eşleştirme Sektörleri</h2>
            <p className="mt-4 text-gray-600 max-w-2xl mx-auto">Platformumuz şu an sadece altyapısının ve tedarik zincirinin en güçlü olduğu aşağıdaki 3 ana sektörde B2B eşleştirme yapmaktadır.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Sektör 1: Gıda */}
            <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all border border-gray-100 flex flex-col">
              <div className="h-40 bg-green-50 flex items-center justify-center">
                <i className="ri-plant-line text-6xl text-green-300"></i>
              </div>
              <div className="p-6 flex flex-col flex-grow">
                <div className="bg-green-100 text-green-800 text-xs font-bold px-3 py-1 rounded-full w-fit mb-3">En Yüksek Hacim</div>
                <h3 className="text-xl font-bold text-[#1B365D] mb-2">Toptan Gıda & Yöresel Ürünler</h3>
                <p className="text-gray-600 text-sm mb-6 flex-grow">Hatay'ın %100 doğal yöresel ürünlerinin (zeytinyağı, salça vb.) doğrudan üreticiden alınıp restoran ve market zincirlerine toptan B2B satış ağı.</p>
                <button className="w-full py-3 bg-[#1B365D] text-white rounded-lg font-bold hover:bg-blue-900 transition-colors">Taleplere Göz At</button>
              </div>
            </div>

            {/* Sektör 2: Lojistik */}
            <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all border border-gray-100 flex flex-col">
              <div className="h-40 bg-blue-50 flex items-center justify-center">
                <i className="ri-truck-line text-6xl text-blue-300"></i>
              </div>
              <div className="p-6 flex flex-col flex-grow">
                <div className="bg-blue-100 text-blue-800 text-xs font-bold px-3 py-1 rounded-full w-fit mb-3">Günlük Eşleştirme</div>
                <h3 className="text-xl font-bold text-[#1B365D] mb-2">Lojistik ve Tedarik Zinciri</h3>
                <p className="text-gray-600 text-sm mb-6 flex-grow">Hatay-Marmara hattında boş dönüş yapan kamyon ve tırların, platform üzerinden yük arayan firmalarla hızlı ve güvenilir şekilde eşleştirilmesi.</p>
                <button className="w-full py-3 bg-[#1B365D] text-white rounded-lg font-bold hover:bg-blue-900 transition-colors">Yük/Araç Eşleştir</button>
              </div>
            </div>

            {/* Sektör 3: İnşaat */}
            <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all border border-gray-100 flex flex-col">
              <div className="h-40 bg-orange-50 flex items-center justify-center">
                <i className="ri-building-2-line text-6xl text-orange-300"></i>
              </div>
              <div className="p-6 flex flex-col flex-grow">
                <div className="bg-orange-100 text-orange-800 text-xs font-bold px-3 py-1 rounded-full w-fit mb-3">Sıcak Fırsatlar</div>
                <h3 className="text-xl font-bold text-[#1B365D] mb-2">İnşaat ve Yapı Malzemeleri</h3>
                <p className="text-gray-600 text-sm mb-6 flex-grow">Bölgedeki yeniden yapılanma süreci için gereken demir, çimento, beton ve yalıtım malzemelerinin toptan tedarik eşleştirmeleri.</p>
                <button className="w-full py-3 bg-[#1B365D] text-white rounded-lg font-bold hover:bg-blue-900 transition-colors">İhaleleri İncele</button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. TİB KOMİSYON SİSTEMİ (Gerçek İşleyiş) */}
      <section className="py-20 bg-white border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-[#1B365D] rounded-3xl overflow-hidden shadow-2xl flex flex-col md:flex-row">
            
            <div className="p-10 md:p-16 md:w-1/2 flex flex-col justify-center">
              <div className="inline-block bg-[#D4AF37] text-white px-4 py-1 rounded-full text-sm font-bold w-fit mb-6">
                %100 Yasal & Güvenli
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 leading-tight">Çevrenizi Gelire Dönüştürün</h2>
              <p className="text-blue-100 mb-8 text-lg">
                Sermayeniz olmasına gerek yok. Alıcıyı ve satıcıyı platform üzerinde buluşturun. Ticaret gerçekleştiğinde %2 Bilgi ve Eşleştirme Komisyonu doğrudan hesabınıza yatsın.
              </p>
              <ul className="space-y-4 text-white mb-10">
                <li className="flex items-center"><i className="ri-shield-check-fill text-[#D4AF37] mr-3 text-2xl"></i> <span className="text-lg">Sadece kimlik doğrulamalı resmi üyeler katılabilir</span></li>
                <li className="flex items-center"><i className="ri-bank-card-fill text-[#D4AF37] mr-3 text-2xl"></i> <span className="text-lg">Ödemeler platformun güvenli havuz hesabından geçer</span></li>
                <li className="flex items-center"><i className="ri-hand-coin-fill text-[#D4AF37] mr-3 text-2xl"></i> <span className="text-lg">Aracılar için sözleşmeli ve garantili hakediş sistemi</span></li>
              </ul>
            </div>
            
            <div className="md:w-1/2 bg-gray-50 p-10 flex flex-col justify-center">
               <h3 className="text-2xl font-bold text-[#1B365D] mb-6 text-center border-b pb-4">Sistem Nasıl Çalışır?</h3>
               <div className="space-y-6 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-gray-300 before:to-transparent">
                  
                  <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                     <div className="flex items-center justify-center w-10 h-10 rounded-full border border-white bg-[#D4AF37] text-white shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2">1</div>
                     <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] bg-white p-4 rounded-lg shadow-sm border border-gray-100">
                        <h4 className="font-bold text-[#1B365D]">Talebi Gör</h4>
                        <p className="text-sm text-gray-500">Örn: "20 Ton Demir Lazım"</p>
                     </div>
                  </div>

                  <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                     <div className="flex items-center justify-center w-10 h-10 rounded-full border border-white bg-[#1B365D] text-white shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2">2</div>
                     <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] bg-white p-4 rounded-lg shadow-sm border border-gray-100">
                        <h4 className="font-bold text-[#1B365D]">Satıcıyı Ekle</h4>
                        <p className="text-sm text-gray-500">Tanıdığın tedarikçiyi sisteme bildir.</p>
                     </div>
                  </div>

                  <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                     <div className="flex items-center justify-center w-10 h-10 rounded-full border border-white bg-green-500 text-white shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2">3</div>
                     <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] bg-white p-4 rounded-lg shadow-sm border border-gray-100">
                        <h4 className="font-bold text-[#1B365D]">Komisyonu Al</h4>
                        <p className="text-sm text-gray-500">Ticaret bitince paran hesabına yatsın.</p>
                     </div>
                  </div>
                  
               </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
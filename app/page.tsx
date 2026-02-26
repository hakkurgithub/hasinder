import Link from 'next/link';
import { PrismaClient } from '@prisma/client';

// Prisma istemcisini oluşturuyoruz (Veritabanına canlı bağlantı)
const prisma = new PrismaClient();

// Her ziyarette en güncel veriyi çekmek için (Next.js Revalidation)
export const revalidate = 60; // 60 saniyede bir önbelleği yenile

export default async function Home() {
  // Veritabanından en son açılan 3 aktif talebi çek
  let latestDemands = [];
  try {
    latestDemands = await prisma.demand.findMany({
      where: { status: 'ACIK' },
      orderBy: { createdAt: 'desc' },
      take: 3,
      include: {
        creator: { select: { sector: true } }
      }
    });
  } catch (error) {
    console.error("Ana sayfa talepleri çekilemedi:", error);
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Üst Menü (Navbar) */}
      <header className="bg-[#1B365D] text-white py-4 px-6 md:px-12 flex justify-between items-center shadow-lg sticky top-0 z-50">
        <div className="flex items-center space-x-2">
          <div className="w-10 h-10 bg-[#D4AF37] rounded-full flex items-center justify-center font-bold text-xl">T</div>
          <span className="font-extrabold text-xl tracking-wider">TİB AĞI</span>
        </div>
        <nav className="hidden md:flex space-x-8 font-medium">
          <Link href="/rehber" className="hover:text-[#D4AF37] transition-colors">Nasıl Çalışır?</Link>
          <Link href="/iletisim" className="hover:text-[#D4AF37] transition-colors">İletişim</Link>
        </nav>
        <div className="flex space-x-3">
          <Link href="/giris" className="bg-transparent border border-[#D4AF37] text-[#D4AF37] hover:bg-[#D4AF37] hover:text-[#1B365D] px-5 py-2 rounded-lg font-bold transition-all">Giriş Yap</Link>
          <Link href="/giris" className="bg-[#D4AF37] text-[#1B365D] hover:bg-white px-5 py-2 rounded-lg font-bold shadow-md transition-all hidden sm:block">Ücretsiz Katıl</Link>
        </div>
      </header>

      {/* Hero (Karşılama) Alanı */}
      <main className="flex-1">
        <section className="bg-gradient-to-br from-[#1B365D] to-blue-900 text-white py-24 px-6 text-center relative overflow-hidden">
          <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
          <div className="max-w-4xl mx-auto relative z-10">
            <h1 className="text-4xl md:text-6xl font-extrabold mb-6 leading-tight">
              Hatay İş Dünyasının <span className="text-[#D4AF37]">Dijital Ticaret</span> Köprüsü
            </h1>
            <p className="text-xl text-blue-100 mb-10 max-w-2xl mx-auto">
              Toptan gıda, inşaat ve lojistik sektörlerinde sıfır sermaye ile ticaret ağınıza katılın. Eşleştirin, komisyon kazanın ve işinizi büyütün.
            </p>
            <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-6">
              <Link href="/giris" className="bg-[#D4AF37] text-[#1B365D] px-8 py-4 rounded-xl font-extrabold text-lg hover:bg-white shadow-2xl transition-all transform hover:-translate-y-1">
                Tüccar / Aracı Olarak Katıl
              </Link>
              <Link href="/rehber" className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-white hover:text-[#1B365D] transition-all">
                Sistemi İncele
              </Link>
            </div>
          </div>
        </section>

        {/* Canlı Fırsat Vitrini (Dinamik Veri) */}
        <section className="py-20 px-6 max-w-7xl mx-auto -mt-10 relative z-20">
          <div className="bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden">
            <div className="bg-gray-900 text-white px-8 py-6 flex flex-col sm:flex-row justify-between items-center">
              <div>
                <h2 className="text-2xl font-bold flex items-center"><i className="ri-radar-line text-[#D4AF37] mr-3 text-3xl"></i>Canlı Ticaret Radarı</h2>
                <p className="text-gray-400 text-sm mt-1">Sistemdeki son aktif talepler (Detaylar sadece onaylı üyelere özeldir)</p>
              </div>
              <span className="mt-4 sm:mt-0 flex items-center text-xs font-bold bg-green-500/20 text-green-400 px-3 py-1 rounded-full animate-pulse border border-green-500/30">
                <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span> CANLI
              </span>
            </div>
            
            <div className="p-8 grid grid-cols-1 md:grid-cols-3 gap-6 bg-gray-50">
              {latestDemands.length === 0 ? (
                <div className="col-span-3 text-center py-10 text-gray-500 font-medium">Şu an sistemde aktif bir açık talep bulunmuyor. İlk talebi siz oluşturun!</div>
              ) : (
                latestDemands.map((demand) => (
                  <div key={demand.id} className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-lg transition-shadow relative overflow-hidden group flex flex-col justify-between">
                    <div>
                      <div className="absolute top-0 right-0 bg-[#1B365D] text-white text-xs font-bold px-3 py-1 rounded-bl-lg">
                        {demand.sector}
                      </div>
                      <div className="mt-4 mb-2 flex items-center text-gray-400 text-sm">
                        <i className="ri-shield-check-fill text-green-500 mr-1"></i> Onaylı Üye Talebi
                      </div>
                      <h3 className="font-bold text-lg text-gray-900 mb-2 line-clamp-2">{demand.title}</h3>
                      <p className="text-gray-600 font-medium mb-6">Aranan Hacim: <span className="text-[#1B365D] font-bold">{demand.amount}</span></p>
                    </div>
                    <Link href="/giris" className="block w-full text-center bg-gray-100 text-[#1B365D] font-bold py-3 rounded-lg group-hover:bg-[#D4AF37] group-hover:text-white transition-colors mt-auto">
                      Satıcı Bul & Kazan <i className="ri-arrow-right-line ml-1"></i>
                    </Link>
                  </div>
                ))
              )}
            </div>
            
            <div className="bg-white border-t border-gray-100 p-6 text-center">
              <p className="text-gray-600 mb-4">Bu taleplere tedarikçi bularak anında <strong className="text-[#1B365D]">%2 Komisyon</strong> kazanabilirsiniz.</p>
              <Link href="/giris" className="text-[#D4AF37] font-bold hover:text-[#1B365D] transition-colors">
                Tüm fırsatları görmek için ücretsiz hesap oluşturun <i className="ri-arrow-right-s-line"></i>
              </Link>
            </div>
          </div>
        </section>

        {/* Neden Biz? */}
        <section className="py-16 px-6 max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10 text-center">
          <div>
            <div className="w-20 h-20 mx-auto bg-blue-50 text-[#1B365D] rounded-full flex items-center justify-center text-4xl mb-6"><i className="ri-safe-2-fill"></i></div>
            <h3 className="text-xl font-bold mb-3 text-gray-900">Güvenli Ticaret</h3>
            <p className="text-gray-600">Sadece vergi levhası onaylanmış resmi işletmelerin katılabildiği kapalı devre, güvenilir bir B2B ağı.</p>
          </div>
          <div>
            <div className="w-20 h-20 mx-auto bg-yellow-50 text-[#D4AF37] rounded-full flex items-center justify-center text-4xl mb-6"><i className="ri-coin-fill"></i></div>
            <h3 className="text-xl font-bold mb-3 text-gray-900">Sıfır Sermaye</h3>
            <p className="text-gray-600">Hiçbir ürün alıp satmadan, sadece alıcı ve satıcıyı platform üzerinde eşleştirerek risksiz komisyon kazanın.</p>
          </div>
          <div>
            <div className="w-20 h-20 mx-auto bg-green-50 text-green-600 rounded-full flex items-center justify-center text-4xl mb-6"><i className="ri-truck-fill"></i></div>
            <h3 className="text-xl font-bold mb-3 text-gray-900">Lojistik Ağı</h3>
            <p className="text-gray-600">Hatay - İstanbul hattındaki boş araçlarınızı anında yük ile eşleştirin, boş dönüş maliyetlerini sıfırlayın.</p>
          </div>
        </section>
      </main>

      {/* Alt Bilgi (Footer) */}
      <footer className="bg-gray-900 text-gray-400 py-10 text-center border-t border-gray-800 mt-10">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <span className="font-extrabold text-white text-lg tracking-wider">TİB AĞI</span>
            <p className="text-sm mt-1">© 2026 Hatay İş Dünyası Platformu. Tüm hakları saklıdır.</p>
          </div>
          <div className="flex space-x-6">
            <Link href="/rehber" className="hover:text-white transition-colors">Nasıl Çalışır?</Link>
            <Link href="/iletisim" className="hover:text-white transition-colors">İletişim</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}

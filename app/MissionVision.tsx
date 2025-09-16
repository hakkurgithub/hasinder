
'use client';

export default function MissionVision() {
  return (
    <section className="py-20 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-[#1B365D] mb-4">
            Misyon & Vizyon
          </h2>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto font-medium">
            Hatay'ın ekonomik potansiyelini ortaya çıkarmak ve sürdürülebilir kalkınmaya katkı sağlamak
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 lg:gap-16">
          {/* Misyon */}
          <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow border border-gray-100">
            <div className="flex items-center justify-center w-16 h-16 bg-[#D4AF37]/10 rounded-full mb-6">
              <i className="ri-target-line w-8 h-8 flex items-center justify-center text-[#D4AF37]"></i>
            </div>
            <h3 className="text-2xl font-bold text-[#1B365D] mb-4">
              Misyonumuz
            </h3>
            <p className="text-gray-800 mb-6 leading-relaxed font-medium">
              Hatay'daki girişimcileri, yatırımcıları ve iş dünyasını bir araya getirerek 
              güçlü bir iş birliği ağı oluşturmak. Bölgenin ekonomik potansiyelini ortaya 
              çıkarmak ve sürdürülebilir büyümeye katkı sağlamak.
            </p>
            <ul className="space-y-3">
              <li className="flex items-start">
                <i className="ri-check-line w-5 h-5 flex items-center justify-center text-[#D4AF37] mt-0.5 mr-3"></i>
                <span className="text-gray-800 font-medium">Yenilikçi projelere destek sağlama</span>
              </li>
              <li className="flex items-start">
                <i className="ri-check-line w-5 h-5 flex items-center justify-center text-[#D4AF37] mt-0.5 mr-3"></i>
                <span className="text-gray-800 font-medium">Girişimci ekosistemini güçlendirme</span>
              </li>
              <li className="flex items-start">
                <i className="ri-check-line w-5 h-5 flex items-center justify-center text-[#D4AF37] mt-0.5 mr-3"></i>
                <span className="text-gray-800 font-medium">Sürdürülebilir kalkınmaya odaklanma</span>
              </li>
            </ul>
          </div>

          {/* Vizyon */}
          <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow border border-gray-100">
            <div className="flex items-center justify-center w-16 h-16 bg-[#1B365D]/10 rounded-full mb-6">
              <i className="ri-eye-line w-8 h-8 flex items-center justify-center text-[#1B365D]"></i>
            </div>
            <h3 className="text-2xl font-bold text-[#1B365D] mb-4">
              Vizyonumuz
            </h3>
            <p className="text-gray-800 mb-6 leading-relaxed font-medium">
              Hatay'ı Türkiye'nin önde gelen iş birliği merkezi haline getirmek. 
              Teknoloji, tarım, turizm ve sanayi sektörlerinde bölgesel ve 
              uluslararası düzeyde tanınır bir platform olmak.
            </p>
            <ul className="space-y-3">
              <li className="flex items-start">
                <i className="ri-check-line w-5 h-5 flex items-center justify-center text-[#1B365D] mt-0.5 mr-3"></i>
                <span className="text-gray-800 font-medium">Bölgesel iş birliği merkezi olma</span>
              </li>
              <li className="flex items-start">
                <i className="ri-check-line w-5 h-5 flex items-center justify-center text-[#1B365D] mt-0.5 mr-3"></i>
                <span className="text-gray-800 font-medium">Uluslararası ağlarla bağlantı kurma</span>
              </li>
              <li className="flex items-start">
                <i className="ri-check-line w-5 h-5 flex items-center justify-center text-[#1B365D] mt-0.5 mr-3"></i>
                <span className="text-gray-800 font-medium">Dijital dönüşüme öncülük etme</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
